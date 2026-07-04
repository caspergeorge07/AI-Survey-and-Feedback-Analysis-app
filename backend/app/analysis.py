from __future__ import annotations

import json
import logging
import os
import textwrap
from collections import Counter
from typing import Literal

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


class OpenAIAnalysisPayload(BaseModel):
    results: list[AnalysedResponse]
    summary_of_main_themes: str
    executive_summary: str


class OverallResults(BaseModel):
    summary_of_main_themes: str
    counts_by_theme: dict[str, int]
    counts_by_sentiment: dict[str, int]
    executive_summary: str


class AnalysisResult(BaseModel):
    analysis_id: str
    results: list[AnalysedResponse]
    overall: OverallResults
    download_url: str


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

    prompt = textwrap.dedent(
        """
        Analyse each survey feedback response.

        Return strict JSON only with this shape:
        {
          "results": [
            {
              "original_response": "exact original response",
              "theme": "short category name",
              "sentiment": "positive | neutral | negative",
              "confidence": 0.0,
              "reason": "short reason"
            }
          ],
          "summary_of_main_themes": "short paragraph",
          "executive_summary": "brief executive summary"
        }

        Rules:
        - Preserve each original response exactly.
        - Use concise, business-friendly theme names.
        - Confidence must be between 0 and 1.
        - Sentiment must be positive, neutral, or negative.
        - Include one result for every response in the input list.
        """
    ).strip()

    try:
        completion = client.chat.completions.create(
            model=model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a careful survey feedback analyst."},
                {"role": "user", "content": prompt},
                {
                    "role": "user",
                    "content": json.dumps(
                        {"responses": feedback_values},
                        ensure_ascii=False,
                    ),
                },
            ],
            temperature=0.2,
        )
    except Exception as exc:
        logger.exception("OpenAI analysis request failed")
        raise HTTPException(status_code=502, detail=f"OpenAI analysis failed: {exc}") from exc

    content = completion.choices[0].message.content
    if not content:
        raise HTTPException(status_code=502, detail="OpenAI returned an empty response.")

    try:
        parsed = OpenAIAnalysisPayload.model_validate_json(content)
    except ValidationError as exc:
        logger.exception("OpenAI returned an unexpected analysis payload shape")
        raise HTTPException(
            status_code=502,
            detail=f"OpenAI returned JSON in an unexpected shape: {exc}",
        ) from exc

    if len(parsed.results) != len(feedback_values):
        logger.error(
            "OpenAI returned mismatched analysis result count",
            extra={"expected": len(feedback_values), "actual": len(parsed.results)},
        )
        raise HTTPException(
            status_code=502,
            detail="OpenAI returned a different number of analysed responses than requested.",
        )

    return parsed


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
    )
