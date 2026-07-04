from __future__ import annotations

import json
import logging
import os
import textwrap
from collections import Counter
from typing import Literal, Sequence, TypeVar

import pandas as pd
from fastapi import HTTPException
from openai import OpenAI
from pydantic import BaseModel, Field, ValidationError


Sentiment = Literal["positive", "neutral", "negative"]
logger = logging.getLogger(__name__)


class AnalysedResponse(BaseModel):
    original_response: str
    theme: str
    sentiment: Sentiment
    confidence: float = Field(ge=0, le=1)
    reason: str


class IndividualResponseAnalysis(BaseModel):
    response_index: int = Field(ge=0)
    concise_summary: str
    candidate_theme: str


class IndividualAnalysisPayload(BaseModel):
    results: list[IndividualResponseAnalysis]


class ThemeCandidate(BaseModel):
    name: str
    description: str


class CandidateThemesPayload(BaseModel):
    themes: list[ThemeCandidate]


class CanonicalTheme(BaseModel):
    name: str
    description: str


class CanonicalThemesPayload(BaseModel):
    themes: list[CanonicalTheme]


class ResponseThemeAssignment(BaseModel):
    response_index: int = Field(ge=0)
    theme: str
    sentiment: Sentiment
    confidence: float = Field(ge=0, le=1)
    reason: str


class ReassignedResponsesPayload(BaseModel):
    results: list[ResponseThemeAssignment]


class ExecutiveInsightsPayload(BaseModel):
    summary_of_main_themes: str
    executive_summary: str
    recommended_actions: list[str] = Field(default_factory=list)


class OpenAIAnalysisPayload(BaseModel):
    results: list[AnalysedResponse]
    summary_of_main_themes: str
    executive_summary: str
    recommended_actions: list[str] = Field(default_factory=list)


class OverallResults(BaseModel):
    summary_of_main_themes: str
    counts_by_theme: dict[str, int]
    counts_by_sentiment: dict[str, int]
    executive_summary: str
    recommended_actions: list[str] = Field(default_factory=list)


class AnalysisResult(BaseModel):
    analysis_id: str
    results: list[AnalysedResponse]
    overall: OverallResults
    download_url: str


PayloadT = TypeVar("PayloadT", bound=BaseModel)


def clean_feedback_values(series: pd.Series) -> list[str]:
    values: list[str] = []
    for value in series.dropna().astype(str).tolist():
        stripped = value.strip()
        if stripped:
            values.append(stripped)
    return values


def analyse_feedback_with_openai(feedback_values: list[str]) -> OpenAIAnalysisPayload:
    if not feedback_values:
        raise HTTPException(
            status_code=400,
            detail="The selected feedback column does not contain any text responses.",
        )

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY is not set. Add it to backend/.env before analysing feedback.",
        )

    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    client = OpenAI(api_key=api_key)

    individual = _analyse_individual_responses(client, model, feedback_values)
    candidates = _identify_candidate_themes(client, model, individual)
    canonical = _merge_similar_themes(client, model, candidates)
    assignments = _reassign_to_canonical_themes(
        client,
        model,
        feedback_values,
        individual,
        canonical,
    )
    insights = _generate_executive_insights(
        client,
        model,
        feedback_values,
        assignments,
        canonical,
    )

    canonical_names = {theme.name.casefold(): theme.name for theme in canonical.themes}
    results = [
        AnalysedResponse(
            original_response=feedback_values[item.response_index],
            theme=canonical_names.get(item.theme.casefold(), item.theme),
            sentiment=item.sentiment,
            confidence=item.confidence,
            reason=item.reason,
        )
        for item in assignments.results
    ]

    return OpenAIAnalysisPayload(
        results=results,
        summary_of_main_themes=insights.summary_of_main_themes,
        executive_summary=insights.executive_summary,
        recommended_actions=insights.recommended_actions,
    )


def _request_structured_payload(
    client: OpenAI,
    model: str,
    stage_name: str,
    prompt: str,
    payload: dict,
    response_model: type[PayloadT],
) -> PayloadT:
    try:
        completion = client.chat.completions.create(
            model=model,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": "You are a careful survey feedback analyst. Return strict JSON only.",
                },
                {"role": "user", "content": prompt},
                {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
            ],
            temperature=0.2,
        )
    except Exception as exc:
        logger.exception("OpenAI analysis request failed", extra={"stage": stage_name})
        raise HTTPException(status_code=502, detail=f"OpenAI analysis failed: {exc}") from exc

    content = completion.choices[0].message.content
    if not content:
        raise HTTPException(status_code=502, detail=f"OpenAI returned an empty response in {stage_name}.")

    try:
        return response_model.model_validate_json(content)
    except ValidationError as exc:
        logger.exception(
            "OpenAI returned an unexpected analysis payload shape",
            extra={"stage": stage_name},
        )
        raise HTTPException(
            status_code=502,
            detail=f"OpenAI returned JSON in an unexpected shape during {stage_name}: {exc}",
        ) from exc


def _validate_indexed_results(
    stage_name: str,
    results: Sequence[IndividualResponseAnalysis | ResponseThemeAssignment],
    expected_count: int,
) -> None:
    indexes = [item.response_index for item in results]
    expected_indexes = set(range(expected_count))
    if len(indexes) != expected_count or set(indexes) != expected_indexes:
        logger.error(
            "OpenAI returned mismatched indexed analysis results",
            extra={"stage": stage_name, "expected": expected_count, "actual": len(indexes)},
        )
        raise HTTPException(
            status_code=502,
            detail=f"OpenAI returned incomplete or mismatched results during {stage_name}.",
        )


def _analyse_individual_responses(
    client: OpenAI,
    model: str,
    feedback_values: list[str],
) -> IndividualAnalysisPayload:
    prompt = textwrap.dedent(
        """
        Stage 1: Analyse each individual survey feedback response.

        Return strict JSON only with this shape:
        {
          "results": [
            {
              "response_index": 0,
              "concise_summary": "short factual summary of this response",
              "candidate_theme": "specific draft theme for this response"
            }
          ]
        }

        Rules:
        - Use zero-based response_index values exactly as provided.
        - Include one result for every response in the input list.
        - Do not invent facts beyond the response text.
        - Candidate themes should be specific enough to preserve useful nuance.
        """
    ).strip()

    payload = _request_structured_payload(
        client,
        model,
        "stage 1 individual response analysis",
        prompt,
        {"responses": _indexed_responses(feedback_values)},
        IndividualAnalysisPayload,
    )
    _validate_indexed_results("stage 1 individual response analysis", payload.results, len(feedback_values))
    payload.results.sort(key=lambda item: item.response_index)
    return payload


def _identify_candidate_themes(
    client: OpenAI,
    model: str,
    individual: IndividualAnalysisPayload,
) -> CandidateThemesPayload:
    prompt = textwrap.dedent(
        """
        Stage 2: Identify candidate themes from the individual response analyses.

        Return strict JSON only with this shape:
        {
          "themes": [
            {"name": "candidate theme name", "description": "what this theme includes"}
          ]
        }

        Rules:
        - Preserve meaningful distinctions; do not over-merge yet.
        - Use concise, business-friendly theme names.
        - Base the themes only on the provided individual analyses.
        """
    ).strip()

    payload = _request_structured_payload(
        client,
        model,
        "stage 2 candidate theme identification",
        prompt,
        {"individual_analyses": [item.model_dump() for item in individual.results]},
        CandidateThemesPayload,
    )
    if not payload.themes:
        raise HTTPException(status_code=502, detail="OpenAI returned no candidate themes.")
    return payload


def _merge_similar_themes(
    client: OpenAI,
    model: str,
    candidates: CandidateThemesPayload,
) -> CanonicalThemesPayload:
    prompt = textwrap.dedent(
        """
        Stage 3: Merge similar candidate themes into a canonical theme list.

        Return strict JSON only with this shape:
        {
          "themes": [
            {"name": "canonical theme name", "description": "what this canonical theme includes"}
          ]
        }

        Rules:
        - Merge duplicate or highly similar themes.
        - Keep themes specific enough to be actionable.
        - Prefer 3 to 8 canonical themes unless the data clearly needs fewer.
        - Use stable, business-friendly names that can be reused in reporting.
        """
    ).strip()

    payload = _request_structured_payload(
        client,
        model,
        "stage 3 canonical theme merging",
        prompt,
        {"candidate_themes": [item.model_dump() for item in candidates.themes]},
        CanonicalThemesPayload,
    )
    if not payload.themes:
        raise HTTPException(status_code=502, detail="OpenAI returned no canonical themes.")
    return payload


def _reassign_to_canonical_themes(
    client: OpenAI,
    model: str,
    feedback_values: list[str],
    individual: IndividualAnalysisPayload,
    canonical: CanonicalThemesPayload,
) -> ReassignedResponsesPayload:
    prompt = textwrap.dedent(
        """
        Stage 4: Reassign every response to exactly one canonical theme.
        Stage 5: Generate sentiment for every response.
        Stage 6: Generate confidence scores for every response.

        Return strict JSON only with this shape:
        {
          "results": [
            {
              "response_index": 0,
              "theme": "one exact canonical theme name",
              "sentiment": "positive | neutral | negative",
              "confidence": 0.0,
              "reason": "short reason"
            }
          ]
        }

        Rules:
        - Use zero-based response_index values exactly as provided.
        - Include one result for every response.
        - Theme must exactly match one canonical theme name.
        - Confidence must be between 0 and 1 and reflect certainty in theme and sentiment.
        - Reason should briefly explain the assigned theme and sentiment.
        - Do not change or paraphrase the original response in your output.
        """
    ).strip()

    payload = _request_structured_payload(
        client,
        model,
        "stages 4-6 canonical reassignment sentiment confidence",
        prompt,
        {
            "responses": _indexed_responses(feedback_values),
            "individual_analyses": [item.model_dump() for item in individual.results],
            "canonical_themes": [item.model_dump() for item in canonical.themes],
        },
        ReassignedResponsesPayload,
    )
    _validate_indexed_results(
        "stages 4-6 canonical reassignment sentiment confidence",
        payload.results,
        len(feedback_values),
    )

    canonical_names = {theme.name.casefold() for theme in canonical.themes}
    unexpected_themes = [
        item.theme
        for item in payload.results
        if item.theme.casefold() not in canonical_names
    ]
    if unexpected_themes:
        logger.error(
            "OpenAI assigned responses to non-canonical themes",
            extra={"unexpected_theme_count": len(unexpected_themes)},
        )
        raise HTTPException(
            status_code=502,
            detail="OpenAI assigned one or more responses to a non-canonical theme.",
        )

    payload.results.sort(key=lambda item: item.response_index)
    return payload


def _generate_executive_insights(
    client: OpenAI,
    model: str,
    feedback_values: list[str],
    assignments: ReassignedResponsesPayload,
    canonical: CanonicalThemesPayload,
) -> ExecutiveInsightsPayload:
    prompt = textwrap.dedent(
        """
        Stage 7: Generate executive insights.
        Stage 8: Generate recommended actions.

        Return strict JSON only with this shape:
        {
          "summary_of_main_themes": "short paragraph summarising the main themes",
          "executive_summary": "brief executive summary for a business audience",
          "recommended_actions": ["clear recommended action", "clear recommended action"]
        }

        Rules:
        - Base insights only on the provided responses, canonical themes, sentiment, and confidence.
        - Recommended actions should be practical, specific, and derived from the patterns in the data.
        - Avoid overstating certainty when the sample is small.
        - Keep the executive summary brief.
        """
    ).strip()

    return _request_structured_payload(
        client,
        model,
        "stages 7-8 executive insights recommended actions",
        prompt,
        {
            "responses": _indexed_responses(feedback_values),
            "canonical_themes": [item.model_dump() for item in canonical.themes],
            "assignments": [item.model_dump() for item in assignments.results],
            "theme_counts": dict(Counter(item.theme for item in assignments.results).most_common()),
            "sentiment_counts": dict(Counter(item.sentiment for item in assignments.results).most_common()),
        },
        ExecutiveInsightsPayload,
    )


def _indexed_responses(feedback_values: list[str]) -> list[dict[str, str | int]]:
    return [
        {"response_index": index, "response": response}
        for index, response in enumerate(feedback_values)
    ]


def build_overall_results(payload: OpenAIAnalysisPayload) -> OverallResults:
    theme_counts = Counter(item.theme for item in payload.results)
    sentiment_counts = Counter(item.sentiment for item in payload.results)

    return OverallResults(
        summary_of_main_themes=payload.summary_of_main_themes,
        counts_by_theme=dict(theme_counts.most_common()),
        counts_by_sentiment={
            "positive": sentiment_counts.get("positive", 0),
            "neutral": sentiment_counts.get("neutral", 0),
            "negative": sentiment_counts.get("negative", 0),
        },
        executive_summary=payload.executive_summary,
        recommended_actions=payload.recommended_actions,
    )
