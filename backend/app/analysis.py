from __future__ import annotations

import json
import logging
import os
import textwrap
from collections import Counter
from dataclasses import dataclass
from difflib import get_close_matches
from typing import Literal, Sequence, TypeVar

import pandas as pd
from fastapi import HTTPException
from openai import OpenAI
from pydantic import BaseModel, Field, ValidationError

from .dataset_intelligence import (
    ColumnProfile,
    CrossAnalysis,
    QuantitativeColumnSummary,
    SegmentColumnSummary,
)


Sentiment = Literal["positive", "neutral", "negative"]
logger = logging.getLogger(__name__)
DEFAULT_BATCH_SIZE = 50
MIN_BATCH_SIZE = 1
MAX_BATCH_SIZE = 200


class AnalysedResponse(BaseModel):
    original_response: str
    theme: str
    sentiment: Sentiment
    confidence: float = Field(ge=0, le=1)
    reason: str
    source_row_index: int | None = None
    source_feedback_column: str | None = None


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
    positive_highlights: list[str] = Field(default_factory=list)
    negative_highlights: list[str] = Field(default_factory=list)
    key_risks: list[str] = Field(default_factory=list)
    recommended_actions: list[str] = Field(default_factory=list)
    ai_generated_conclusions: str = ""


class OpenAIAnalysisPayload(BaseModel):
    results: list[AnalysedResponse]
    summary_of_main_themes: str
    executive_summary: str
    positive_highlights: list[str] = Field(default_factory=list)
    negative_highlights: list[str] = Field(default_factory=list)
    key_risks: list[str] = Field(default_factory=list)
    recommended_actions: list[str] = Field(default_factory=list)
    ai_generated_conclusions: str = ""


class OverallResults(BaseModel):
    summary_of_main_themes: str
    counts_by_theme: dict[str, int]
    counts_by_sentiment: dict[str, int]
    executive_summary: str
    positive_highlights: list[str] = Field(default_factory=list)
    negative_highlights: list[str] = Field(default_factory=list)
    key_risks: list[str] = Field(default_factory=list)
    recommended_actions: list[str] = Field(default_factory=list)
    ai_generated_conclusions: str = ""


class AnalysisResult(BaseModel):
    analysis_id: str
    results: list[AnalysedResponse]
    overall: OverallResults
    download_url: str
    report_download_url: str | None = None
    column_profiles: list[ColumnProfile] = Field(default_factory=list)
    selected_feedback_columns: list[str] = Field(default_factory=list)
    quantitative_summary: dict[str, QuantitativeColumnSummary] = Field(default_factory=dict)
    segment_summary: dict[str, SegmentColumnSummary] = Field(default_factory=dict)
    cross_analysis: CrossAnalysis | None = None
    enhanced_executive_summary: str | None = None


PayloadT = TypeVar("PayloadT", bound=BaseModel)


@dataclass(frozen=True)
class FeedbackBatch:
    batch_number: int
    start_index: int
    responses: list[str]


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
    batch_size = _analysis_batch_size()
    client = OpenAI(api_key=api_key)

    batches = list(_feedback_batches(feedback_values, batch_size))
    batch_individuals: list[IndividualAnalysisPayload] = []
    candidate_theme_sets: list[CandidateThemesPayload] = []

    for batch in batches:
        try:
            individual = _analyse_individual_responses(
                client,
                model,
                batch.responses,
                start_index=batch.start_index,
                batch_number=batch.batch_number,
            )
            candidates = _identify_candidate_themes(
                client,
                model,
                individual,
                batch_number=batch.batch_number,
            )
        except HTTPException as exc:
            _raise_batch_failure(batch, "batch analysis and theme discovery", exc)

        batch_individuals.append(individual)
        candidate_theme_sets.append(candidates)

    individual = IndividualAnalysisPayload(
        results=sorted(
            [
                item
                for batch_payload in batch_individuals
                for item in batch_payload.results
            ],
            key=lambda item: item.response_index,
        )
    )
    candidates = CandidateThemesPayload(
        themes=[
            theme
            for batch_payload in candidate_theme_sets
            for theme in batch_payload.themes
        ]
    )
    canonical = _merge_similar_themes(client, model, candidates)

    batch_assignments: list[ResponseThemeAssignment] = []
    for batch, batch_individual in zip(batches, batch_individuals, strict=True):
        try:
            assignments = _reassign_to_canonical_themes(
                client,
                model,
                batch.responses,
                batch_individual,
                canonical,
                start_index=batch.start_index,
                batch_number=batch.batch_number,
            )
        except HTTPException as exc:
            _raise_batch_failure(batch, "canonical reassignment, sentiment, and confidence", exc)

        batch_assignments.extend(assignments.results)

    assignments = ReassignedResponsesPayload(
        results=sorted(batch_assignments, key=lambda item: item.response_index)
    )
    _validate_indexed_results(
        "merged batch reassignment",
        assignments.results,
        expected_indexes=set(range(len(feedback_values))),
    )

    insights = _generate_executive_insights(
        client,
        model,
        individual,
        assignments,
        canonical,
    )

    canonical_names = _canonical_theme_name_lookup(canonical)
    results = [
        AnalysedResponse(
            original_response=feedback_values[item.response_index],
            theme=canonical_names.get(_normalise_theme_name(item.theme), item.theme),
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
        positive_highlights=insights.positive_highlights,
        negative_highlights=insights.negative_highlights,
        key_risks=insights.key_risks,
        recommended_actions=insights.recommended_actions,
        ai_generated_conclusions=insights.ai_generated_conclusions,
    )


def _analysis_batch_size() -> int:
    configured = os.getenv("OPENAI_ANALYSIS_BATCH_SIZE")
    if not configured:
        return DEFAULT_BATCH_SIZE

    try:
        batch_size = int(configured)
    except ValueError:
        logger.warning("Invalid OPENAI_ANALYSIS_BATCH_SIZE; using default")
        return DEFAULT_BATCH_SIZE

    if batch_size < MIN_BATCH_SIZE or batch_size > MAX_BATCH_SIZE:
        logger.warning("OPENAI_ANALYSIS_BATCH_SIZE out of range; using default")
        return DEFAULT_BATCH_SIZE

    return batch_size


def _feedback_batches(feedback_values: list[str], batch_size: int) -> Sequence[FeedbackBatch]:
    return [
        FeedbackBatch(
            batch_number=(start // batch_size) + 1,
            start_index=start,
            responses=feedback_values[start : start + batch_size],
        )
        for start in range(0, len(feedback_values), batch_size)
    ]


def _raise_batch_failure(batch: FeedbackBatch, stage: str, exc: HTTPException) -> None:
    logger.exception(
        "Batch analysis stage failed",
        extra={"batch": batch.batch_number, "stage": stage, "responses": len(batch.responses)},
    )
    raise HTTPException(
        status_code=exc.status_code,
        detail=(
            f"Analysis failed for batch {batch.batch_number} during {stage}. "
            "No partial analysis CSV was saved. "
            f"Cause: {exc.detail}"
        ),
    ) from exc


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
    expected_indexes: set[int],
) -> None:
    indexes = [item.response_index for item in results]
    if len(indexes) != len(expected_indexes) or set(indexes) != expected_indexes:
        logger.error(
            "OpenAI returned mismatched indexed analysis results",
            extra={"stage": stage_name, "expected": len(expected_indexes), "actual": len(indexes)},
        )
        raise HTTPException(
            status_code=502,
            detail=f"OpenAI returned incomplete or mismatched results during {stage_name}.",
        )


def _analyse_individual_responses(
    client: OpenAI,
    model: str,
    feedback_values: list[str],
    *,
    start_index: int,
    batch_number: int,
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
        - Use response_index values exactly as provided.
        - Include one result for every response in the input list.
        - Do not invent facts beyond the response text.
        - Candidate themes should be specific enough to preserve useful nuance.
        """
    ).strip()

    stage_name = f"stage 1 individual response analysis batch {batch_number}"
    payload = _request_structured_payload(
        client,
        model,
        stage_name,
        prompt,
        {"responses": _indexed_responses(feedback_values, start_index=0)},
        IndividualAnalysisPayload,
    )
    _validate_indexed_results(
        stage_name,
        payload.results,
        expected_indexes=set(range(len(feedback_values))),
    )
    for item in payload.results:
        item.response_index += start_index
    payload.results.sort(key=lambda item: item.response_index)
    return payload


def _identify_candidate_themes(
    client: OpenAI,
    model: str,
    individual: IndividualAnalysisPayload,
    *,
    batch_number: int,
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
        f"stage 2 candidate theme identification batch {batch_number}",
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
    *,
    start_index: int,
    batch_number: int,
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
        - Use response_index values exactly as provided.
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
        f"stages 4-6 canonical reassignment sentiment confidence batch {batch_number}",
        prompt,
        {
            "responses": _indexed_responses(feedback_values, start_index=0),
            "individual_analyses": [
                {
                    **item.model_dump(),
                    "response_index": item.response_index - start_index,
                }
                for item in individual.results
            ],
            "canonical_themes": [item.model_dump() for item in canonical.themes],
        },
        ReassignedResponsesPayload,
    )
    _validate_indexed_results(
        f"stages 4-6 canonical reassignment sentiment confidence batch {batch_number}",
        payload.results,
        expected_indexes=set(range(len(feedback_values))),
    )
    for item in payload.results:
        item.response_index += start_index

    _coerce_assignment_themes(payload.results, canonical)

    payload.results.sort(key=lambda item: item.response_index)
    return payload


def _generate_executive_insights(
    client: OpenAI,
    model: str,
    individual: IndividualAnalysisPayload,
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
          "positive_highlights": ["specific positive highlight"],
          "negative_highlights": ["specific negative highlight"],
          "key_risks": ["specific business or operational risk"],
          "recommended_actions": ["clear recommended action", "clear recommended action"],
          "ai_generated_conclusions": "short concluding interpretation"
        }

        Rules:
        - Base insights only on the provided responses, canonical themes, sentiment, and confidence.
        - Positive highlights should reflect strengths customers or respondents mention.
        - Negative highlights should reflect pain points or dissatisfaction.
        - Key risks should be framed as management risks, not generic complaints.
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
            "individual_analyses": [item.model_dump() for item in individual.results],
            "canonical_themes": [item.model_dump() for item in canonical.themes],
            "assignments": [item.model_dump() for item in assignments.results],
            "theme_counts": dict(Counter(item.theme for item in assignments.results).most_common()),
            "sentiment_counts": dict(Counter(item.sentiment for item in assignments.results).most_common()),
        },
        ExecutiveInsightsPayload,
    )


def _canonical_theme_name_lookup(canonical: CanonicalThemesPayload) -> dict[str, str]:
    return {
        _normalise_theme_name(theme.name): theme.name
        for theme in canonical.themes
    }


def _coerce_assignment_themes(
    assignments: list[ResponseThemeAssignment],
    canonical: CanonicalThemesPayload,
) -> None:
    canonical_lookup = _canonical_theme_name_lookup(canonical)
    normalised_names = list(canonical_lookup.keys())

    for item in assignments:
        normalised_theme = _normalise_theme_name(item.theme)
        exact_match = canonical_lookup.get(normalised_theme)
        if exact_match:
            item.theme = exact_match
            continue

        close_matches = get_close_matches(normalised_theme, normalised_names, n=1, cutoff=0.72)
        if close_matches:
            item.theme = canonical_lookup[close_matches[0]]
            continue

        logger.warning(
            "OpenAI assigned a non-canonical theme; using closest available fallback",
            extra={"response_index": item.response_index},
        )
        item.theme = canonical.themes[0].name
        item.confidence = min(item.confidence, 0.5)
        item.reason = f"{item.reason} Assigned to the closest available canonical theme."


def _normalise_theme_name(value: str) -> str:
    return "".join(character for character in value.casefold() if character.isalnum())


def _indexed_responses(feedback_values: list[str], *, start_index: int) -> list[dict[str, str | int]]:
    return [
        {"response_index": start_index + index, "response": response}
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
        positive_highlights=payload.positive_highlights,
        negative_highlights=payload.negative_highlights,
        key_risks=payload.key_risks,
        recommended_actions=payload.recommended_actions,
        ai_generated_conclusions=payload.ai_generated_conclusions,
    )
