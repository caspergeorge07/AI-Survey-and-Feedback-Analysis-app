from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import dataclass
import re
from typing import Literal

import pandas as pd
from pydantic import BaseModel, Field

ColumnType = Literal[
    "qualitative_text",
    "numeric",
    "rating",
    "categorical",
    "boolean",
    "date",
    "unknown",
]
ColumnRole = Literal[
    "feedback_column",
    "rating_column",
    "segment_column",
    "date_column",
    "identifier_column",
    "ignore",
]

SEGMENT_NAME_HINTS = {
    "department",
    "region",
    "location",
    "team",
    "role",
    "age",
    "age band",
    "age_band",
    "gender",
    "product",
    "service",
    "category",
    "segment",
    "market",
    "country",
    "office",
    "plan",
}
FEEDBACK_NAME_HINTS = {
    "feedback",
    "comment",
    "comments",
    "response",
    "responses",
    "suggestion",
    "suggestions",
    "verbatim",
    "free text",
    "free_text",
    "reason",
}
RATING_NAME_HINTS = {"rating", "score", "nps", "csat", "stars", "satisfaction"}
DATE_NAME_HINTS = {"date", "time", "submitted", "created", "updated"}
IDENTIFIER_NAME_HINTS = {"id", "identifier", "uuid", "email", "respondent", "user"}
BOOLEAN_VALUES = {"true", "false", "yes", "no", "y", "n", "0", "1"}
DATE_VALUE_PATTERN = re.compile(r"^\d{4}[-/]\d{1,2}[-/]\d{1,2}$|^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$")


class ColumnProfile(BaseModel):
    column_name: str
    inferred_type: ColumnType
    non_empty_count: int
    missing_count: int
    unique_count: int
    sample_values: list[str]
    suggested_role: ColumnRole


class QuantitativeColumnSummary(BaseModel):
    column_name: str
    count: int
    mean: float | None = None
    median: float | None = None
    min: float | None = None
    max: float | None = None
    standard_deviation: float | None = None
    distribution: dict[str, int] | None = None


class SegmentColumnSummary(BaseModel):
    column_name: str
    unique_count: int
    top_values: dict[str, int]


class CrossAnalysis(BaseModel):
    sentiment_by_segment: dict[str, dict[str, dict[str, int]]] = Field(default_factory=dict)
    top_themes_by_segment: dict[str, dict[str, dict[str, int]]] = Field(default_factory=dict)
    average_rating_by_segment: dict[str, dict[str, dict[str, float]]] = Field(default_factory=dict)
    notable_differences: list[str] = Field(default_factory=list)


@dataclass(frozen=True)
class FeedbackEntry:
    original_response: str
    source_row_index: int
    source_feedback_column: str


def profile_dataframe_columns(df: pd.DataFrame) -> list[ColumnProfile]:
    return [_profile_column(df[column], str(column), len(df)) for column in df.columns]


def clean_feedback_entries(df: pd.DataFrame, feedback_columns: list[str]) -> list[FeedbackEntry]:
    entries: list[FeedbackEntry] = []
    for column in feedback_columns:
        for row_index, value in df[column].items():
            if pd.isna(value):
                continue
            response = str(value).strip()
            if response:
                entries.append(
                    FeedbackEntry(
                        original_response=response,
                        source_row_index=int(row_index),
                        source_feedback_column=column,
                    )
                )
    return entries


def build_quantitative_summary(
    df: pd.DataFrame,
    profiles: list[ColumnProfile],
) -> dict[str, QuantitativeColumnSummary]:
    summaries: dict[str, QuantitativeColumnSummary] = {}
    profile_by_name = {profile.column_name: profile for profile in profiles}
    for column, profile in profile_by_name.items():
        if profile.inferred_type not in {"numeric", "rating"}:
            continue
        numeric = pd.to_numeric(df[column], errors="coerce").dropna()
        if numeric.empty:
            continue
        distribution = None
        if profile.inferred_type == "rating" or numeric.nunique() <= 15:
            counts = numeric.value_counts().sort_index()
            distribution = {_format_number(key): int(value) for key, value in counts.items()}
        summaries[column] = QuantitativeColumnSummary(
            column_name=column,
            count=int(numeric.count()),
            mean=_round_float(numeric.mean()),
            median=_round_float(numeric.median()),
            min=_round_float(numeric.min()),
            max=_round_float(numeric.max()),
            standard_deviation=_round_float(numeric.std()) if numeric.count() > 1 else None,
            distribution=distribution,
        )
    return summaries


def build_segment_summary(
    df: pd.DataFrame,
    profiles: list[ColumnProfile],
) -> dict[str, SegmentColumnSummary]:
    summaries: dict[str, SegmentColumnSummary] = {}
    for profile in profiles:
        if profile.suggested_role != "segment_column":
            continue
        values = _clean_series(df[profile.column_name])
        if values.empty:
            continue
        summaries[profile.column_name] = SegmentColumnSummary(
            column_name=profile.column_name,
            unique_count=int(values.nunique()),
            top_values={str(key): int(value) for key, value in values.value_counts().head(10).items()},
        )
    return summaries


def build_cross_analysis(
    df: pd.DataFrame,
    profiles: list[ColumnProfile],
    analysed_results,
    quantitative_summary: dict[str, QuantitativeColumnSummary],
) -> CrossAnalysis:
    segment_columns = [
        profile.column_name
        for profile in profiles
        if profile.suggested_role == "segment_column"
    ][:5]
    rating_columns = [
        column
        for column, summary in quantitative_summary.items()
        if summary.distribution is not None
    ][:5]

    sentiment_by_segment: dict[str, dict[str, dict[str, int]]] = {}
    top_themes_by_segment: dict[str, dict[str, dict[str, int]]] = {}
    average_rating_by_segment: dict[str, dict[str, dict[str, float]]] = {}
    notable_differences: list[str] = []

    for segment_column in segment_columns:
        grouped_sentiment: dict[str, Counter] = defaultdict(Counter)
        grouped_themes: dict[str, Counter] = defaultdict(Counter)

        for item in analysed_results:
            row_index = getattr(item, "source_row_index", None)
            if row_index is None or row_index not in df.index:
                continue
            value = df.at[row_index, segment_column]
            if pd.isna(value) or str(value).strip() == "":
                continue
            segment_value = str(value).strip()
            grouped_sentiment[segment_value][item.sentiment] += 1
            grouped_themes[segment_value][item.theme] += 1

        if grouped_sentiment:
            sentiment_by_segment[segment_column] = {
                value: {
                    "positive": counts.get("positive", 0),
                    "neutral": counts.get("neutral", 0),
                    "negative": counts.get("negative", 0),
                }
                for value, counts in sorted(grouped_sentiment.items())
            }
            top_themes_by_segment[segment_column] = {
                value: dict(counts.most_common(5))
                for value, counts in sorted(grouped_themes.items())
            }
            notable_differences.extend(_sentiment_difference_notes(segment_column, grouped_sentiment))

        if rating_columns:
            rating_summary: dict[str, dict[str, float]] = {}
            for segment_value, group in df.groupby(segment_column, dropna=True):
                if pd.isna(segment_value) or str(segment_value).strip() == "":
                    continue
                rating_summary[str(segment_value)] = {}
                for rating_column in rating_columns:
                    numeric = pd.to_numeric(group[rating_column], errors="coerce").dropna()
                    if not numeric.empty:
                        rating_summary[str(segment_value)][rating_column] = _round_float(numeric.mean()) or 0.0
            if rating_summary:
                average_rating_by_segment[segment_column] = rating_summary
                notable_differences.extend(_rating_difference_notes(segment_column, rating_summary))

    return CrossAnalysis(
        sentiment_by_segment=sentiment_by_segment,
        top_themes_by_segment=top_themes_by_segment,
        average_rating_by_segment=average_rating_by_segment,
        notable_differences=notable_differences[:8],
    )


def build_enhanced_executive_summary(
    *,
    base_summary: str,
    quantitative_summary: dict[str, QuantitativeColumnSummary],
    segment_summary: dict[str, SegmentColumnSummary],
    cross_analysis: CrossAnalysis,
) -> str:
    parts = [base_summary.strip()] if base_summary.strip() else []
    if quantitative_summary:
        metric_bits = []
        for name, summary in list(quantitative_summary.items())[:3]:
            if summary.mean is not None:
                metric_bits.append(f"{name} averaged {summary.mean:g}")
        if metric_bits:
            parts.append("Quantitative context: " + "; ".join(metric_bits) + ".")
    if segment_summary:
        segment_names = ", ".join(list(segment_summary.keys())[:4])
        parts.append(f"Segment context is available for {segment_names}.")
    if cross_analysis.notable_differences:
        parts.append("Notable differences: " + " ".join(cross_analysis.notable_differences[:3]))
    return " ".join(parts) if parts else "No enhanced executive summary was generated."


def _profile_column(series: pd.Series, column_name: str, total_rows: int) -> ColumnProfile:
    cleaned = _clean_series(series)
    inferred_type = _infer_column_type(cleaned, column_name)
    suggested_role = _suggest_role(cleaned, column_name, inferred_type)
    return ColumnProfile(
        column_name=column_name,
        inferred_type=inferred_type,
        non_empty_count=int(cleaned.count()),
        missing_count=int(total_rows - cleaned.count()),
        unique_count=int(cleaned.nunique()),
        sample_values=[str(value) for value in cleaned.drop_duplicates().head(5).tolist()],
        suggested_role=suggested_role,
    )


def _clean_series(series: pd.Series) -> pd.Series:
    cleaned = series.dropna()
    if cleaned.empty:
        return cleaned
    as_text = cleaned.astype(str).str.strip()
    return cleaned[as_text != ""]


def _infer_column_type(series: pd.Series, column_name: str) -> ColumnType:
    if series.empty:
        return "unknown"

    lowered_name = column_name.casefold()
    lowered_values = {str(value).strip().casefold() for value in series.dropna().unique()}

    if lowered_values and lowered_values.issubset(BOOLEAN_VALUES):
        return "boolean"

    numeric = pd.to_numeric(series, errors="coerce")
    numeric_ratio = float(numeric.notna().mean())
    if numeric_ratio >= 0.9:
        numeric_values = numeric.dropna()
        if _looks_like_rating(lowered_name, numeric_values):
            return "rating"
        return "numeric"

    if any(hint in lowered_name for hint in DATE_NAME_HINTS) or _values_look_date_like(series):
        dates = pd.to_datetime(series, errors="coerce")
        if float(dates.notna().mean()) >= 0.8:
            return "date"

    text_values = series.astype(str).str.strip()
    average_length = float(text_values.str.len().mean())
    average_words = float(text_values.str.split().str.len().mean())
    unique_ratio = series.nunique() / max(len(series), 1)
    if (
        any(hint in lowered_name for hint in FEEDBACK_NAME_HINTS)
        or average_length >= 35
        or average_words >= 7
    ):
        return "qualitative_text"

    if series.nunique() <= 50 or unique_ratio <= 0.5:
        return "categorical"

    return "unknown"


def _suggest_role(series: pd.Series, column_name: str, inferred_type: ColumnType) -> ColumnRole:
    lowered_name = column_name.casefold()
    if inferred_type == "qualitative_text":
        return "feedback_column"
    if inferred_type == "rating":
        return "rating_column"
    if inferred_type == "date":
        return "date_column"
    if any(hint in lowered_name for hint in IDENTIFIER_NAME_HINTS) and series.nunique() >= max(series.count() * 0.8, 1):
        return "identifier_column"
    if inferred_type in {"categorical", "boolean"} and _looks_like_segment(lowered_name, series):
        return "segment_column"
    return "ignore"


def _looks_like_rating(lowered_name: str, numeric_values: pd.Series) -> bool:
    if numeric_values.empty:
        return False
    if any(hint in lowered_name for hint in RATING_NAME_HINTS):
        return True
    unique_count = numeric_values.nunique()
    min_value = numeric_values.min()
    max_value = numeric_values.max()
    return unique_count <= 11 and min_value >= 0 and max_value <= 10


def _looks_like_segment(lowered_name: str, series: pd.Series) -> bool:
    if any(hint in lowered_name for hint in SEGMENT_NAME_HINTS):
        return True
    unique_count = series.nunique()
    non_empty_count = max(series.count(), 1)
    return 2 <= unique_count <= min(20, non_empty_count * 0.5)


def _values_look_date_like(series: pd.Series) -> bool:
    sample = series.dropna().astype(str).str.strip().head(12)
    if sample.empty:
        return False
    matches = sum(1 for value in sample if DATE_VALUE_PATTERN.match(value))
    return matches / len(sample) >= 0.8


def _sentiment_difference_notes(segment_column: str, grouped_sentiment: dict[str, Counter]) -> list[str]:
    rates: list[tuple[str, float, int]] = []
    for value, counts in grouped_sentiment.items():
        total = sum(counts.values())
        if total >= 2:
            rates.append((value, counts.get("negative", 0) / total, total))
    if len(rates) < 2:
        return []
    lowest = min(rates, key=lambda item: item[1])
    highest = max(rates, key=lambda item: item[1])
    if highest[1] - lowest[1] < 0.2:
        return []
    return [
        (
            f"{segment_column} shows a higher negative sentiment share for {highest[0]} "
            f"({highest[1]:.0%}) than {lowest[0]} ({lowest[1]:.0%})."
        )
    ]


def _rating_difference_notes(segment_column: str, rating_summary: dict[str, dict[str, float]]) -> list[str]:
    notes: list[str] = []
    rating_columns = sorted({column for values in rating_summary.values() for column in values})
    for rating_column in rating_columns:
        values = [
            (segment_value, metrics[rating_column])
            for segment_value, metrics in rating_summary.items()
            if rating_column in metrics
        ]
        if len(values) < 2:
            continue
        lowest = min(values, key=lambda item: item[1])
        highest = max(values, key=lambda item: item[1])
        if highest[1] - lowest[1] >= 0.75:
            notes.append(
                (
                    f"{rating_column} averages higher for {highest[0]} "
                    f"({highest[1]:g}) than {lowest[0]} ({lowest[1]:g}) by {highest[1] - lowest[1]:g}."
                )
            )
    return notes


def _round_float(value) -> float | None:
    if pd.isna(value):
        return None
    return round(float(value), 3)


def _format_number(value) -> str:
    numeric = float(value)
    if numeric.is_integer():
        return str(int(numeric))
    return f"{numeric:g}"
