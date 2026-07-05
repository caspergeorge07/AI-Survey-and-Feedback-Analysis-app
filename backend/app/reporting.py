from __future__ import annotations

from collections import Counter
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from .analysis import AnalysedResponse, OverallResults


BRAND = colors.HexColor("#186A83")
INK = colors.HexColor("#17202A")
MUTED = colors.HexColor("#617080")
LINE = colors.HexColor("#DBE2EA")
SOFT = colors.HexColor("#EEF3F6")
POSITIVE = colors.HexColor("#247A4D")
NEUTRAL = colors.HexColor("#8A641C")
NEGATIVE = colors.HexColor("#A63D40")


def generate_management_report_pdf(
    output_path: Path,
    *,
    analysis_id: str,
    results: list[AnalysedResponse],
    overall: OverallResults,
) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.55 * inch,
        title="AI Survey Feedback Management Report",
        author="AI Survey Feedback Analysis MVP",
    )
    styles = _styles()
    story: list = []

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M")
    story.extend(
        [
            Paragraph("AI Survey Feedback Management Report", styles["Title"]),
            Paragraph(f"Analysis ID: {analysis_id}", styles["MutedCentered"]),
            Paragraph(f"Generated: {generated_at}", styles["MutedCentered"]),
            Spacer(1, 0.22 * inch),
            _metric_table(results, overall),
            Spacer(1, 0.18 * inch),
        ]
    )

    _add_section(story, styles, "1. Executive Summary", [overall.executive_summary])
    _add_section(
        story,
        styles,
        "2. Overall Sentiment Summary",
        [_sentiment_summary(overall.counts_by_sentiment, len(results))],
    )
    _add_section(story, styles, "3. Top Themes", _top_theme_lines(overall.counts_by_theme))

    story.extend(
        [
            Paragraph("4. Theme Distribution", styles["Heading2"]),
            _bar_chart_table(overall.counts_by_theme, "Theme", BRAND),
            Spacer(1, 0.16 * inch),
            Paragraph("Sentiment Counts", styles["Heading3"]),
            _bar_chart_table(overall.counts_by_sentiment, "Sentiment", _sentiment_color),
            Spacer(1, 0.16 * inch),
        ]
    )

    _add_section(
        story,
        styles,
        "5. Positive Highlights",
        _fallback_list(overall.positive_highlights, _highlight_examples(results, "positive")),
    )
    _add_section(
        story,
        styles,
        "6. Negative Highlights",
        _fallback_list(overall.negative_highlights, _highlight_examples(results, "negative")),
    )
    _add_section(story, styles, "7. Key Risks", _fallback_list(overall.key_risks, _risk_examples(results)))
    _add_section(story, styles, "8. Recommended Actions", overall.recommended_actions)
    _add_section(
        story,
        styles,
        "9. AI-generated Conclusions",
        [overall.ai_generated_conclusions or overall.summary_of_main_themes],
    )

    story.extend(
        [
            PageBreak(),
            Paragraph("10. Charts", styles["Heading2"]),
            Paragraph("Theme Counts", styles["Heading3"]),
            _bar_chart_table(overall.counts_by_theme, "Theme", BRAND),
            Spacer(1, 0.2 * inch),
            Paragraph("Sentiment Counts", styles["Heading3"]),
            _bar_chart_table(overall.counts_by_sentiment, "Sentiment", _sentiment_color),
        ]
    )

    doc.build(story, onFirstPage=_page_footer, onLaterPages=_page_footer)
    return output_path


def _styles() -> dict[str, ParagraphStyle]:
    sample = getSampleStyleSheet()
    return {
        "Title": ParagraphStyle(
            "ReportTitle",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=27,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "Heading2": ParagraphStyle(
            "ReportHeading2",
            parent=sample["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=BRAND,
            spaceBefore=10,
            spaceAfter=6,
        ),
        "Heading3": ParagraphStyle(
            "ReportHeading3",
            parent=sample["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=INK,
            spaceBefore=6,
            spaceAfter=4,
        ),
        "Body": ParagraphStyle(
            "ReportBody",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=INK,
            spaceAfter=5,
        ),
        "Bullet": ParagraphStyle(
            "ReportBullet",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=12.5,
            leftIndent=12,
            bulletIndent=3,
            textColor=INK,
            spaceAfter=3,
        ),
        "MutedCentered": ParagraphStyle(
            "MutedCentered",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }


def _add_section(story: list, styles: dict[str, ParagraphStyle], title: str, lines: list[str]) -> None:
    story.append(Paragraph(title, styles["Heading2"]))
    clean_lines = [line for line in lines if line]
    if not clean_lines:
        clean_lines = ["No specific items were identified for this section."]

    if len(clean_lines) == 1:
        story.append(Paragraph(_escape(clean_lines[0]), styles["Body"]))
        return

    for line in clean_lines:
        story.append(Paragraph(_escape(line), styles["Bullet"], bulletText="-"))


def _metric_table(results: list[AnalysedResponse], overall: OverallResults) -> Table:
    rows = [
        ["Responses", str(len(results))],
        ["Themes", str(len(overall.counts_by_theme))],
        ["Positive", str(overall.counts_by_sentiment.get("positive", 0))],
        ["Neutral", str(overall.counts_by_sentiment.get("neutral", 0))],
        ["Negative", str(overall.counts_by_sentiment.get("negative", 0))],
    ]
    table = Table(rows, colWidths=[1.45 * inch, 0.9 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("ALIGN", (1, 0), (1, -1), "RIGHT"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def _bar_chart_table(counts: dict[str, int], label_heading: str, color_source) -> Table:
    if not counts:
        return Table([["No data available"]])

    max_count = max(counts.values()) or 1
    rows = [[label_heading, "Count", "Distribution"]]
    for label, count in counts.items():
        color = color_source(label) if callable(color_source) else color_source
        rows.append([_shorten(label, 32), str(count), _bar_cell(count, max_count, color)])

    table = Table(rows, colWidths=[2.0 * inch, 0.55 * inch, 3.3 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (1, 1), (1, -1), "RIGHT"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def _bar_cell(count: int, max_count: int, color) -> Table:
    width = max(0.18 * inch, (count / max_count) * 2.8 * inch)
    table = Table([["", ""]], colWidths=[width, 2.9 * inch - width], rowHeights=[0.13 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), color),
                ("BACKGROUND", (1, 0), (1, 0), SOFT),
                ("BOX", (0, 0), (-1, -1), 0.2, LINE),
            ]
        )
    )
    return table


def _sentiment_color(label: str):
    sentiment = label.lower()
    if sentiment == "positive":
        return POSITIVE
    if sentiment == "negative":
        return NEGATIVE
    return NEUTRAL


def _sentiment_summary(counts: dict[str, int], total: int) -> str:
    if total == 0:
        return "No responses were available for sentiment analysis."
    positive = counts.get("positive", 0)
    neutral = counts.get("neutral", 0)
    negative = counts.get("negative", 0)
    return (
        f"Sentiment across {total} analysed responses is "
        f"{positive} positive ({positive / total:.0%}), "
        f"{neutral} neutral ({neutral / total:.0%}), and "
        f"{negative} negative ({negative / total:.0%})."
    )


def _top_theme_lines(counts: dict[str, int], limit: int = 5) -> list[str]:
    return [f"{theme}: {count} response(s)" for theme, count in list(counts.items())[:limit]]


def _fallback_list(primary: list[str], fallback: list[str]) -> list[str]:
    return primary if primary else fallback


def _highlight_examples(results: list[AnalysedResponse], sentiment: str, limit: int = 5) -> list[str]:
    return [
        f"{item.theme}: {item.reason}"
        for item in results
        if item.sentiment == sentiment
    ][:limit]


def _risk_examples(results: list[AnalysedResponse], limit: int = 5) -> list[str]:
    negative_by_theme = Counter(item.theme for item in results if item.sentiment == "negative")
    return [
        f"{theme}: repeated negative feedback may indicate a management risk."
        for theme, _ in negative_by_theme.most_common(limit)
    ]


def _shorten(value: str, max_length: int) -> str:
    return value if len(value) <= max_length else f"{value[: max_length - 3]}..."


def _escape(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _page_footer(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.35 * inch, "AI Survey Feedback Analysis")
    canvas.drawRightString(A4[0] - doc.rightMargin, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()
