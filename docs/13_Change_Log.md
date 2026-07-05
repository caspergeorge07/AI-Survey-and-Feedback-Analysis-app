# SurveyIQ Change Log

**Version:** 1.0  
**Status:** Draft  
**Owner:** Product and Engineering  
**Last Updated:** 2026-07-05

## Purpose

This document tracks notable product, engineering, AI, reporting, and documentation changes to SurveyIQ. It follows the Keep a Changelog structure so changes are easy to scan by release and category.

## Table of Contents

1. Changelog Format
2. Unreleased
3. Version 1.0 Documentation Library
4. Version 0.4 Reporting MVP
5. Version 0.3 Larger File Analysis
6. Version 0.2 AI Quality Pipeline
7. Version 0.1 Local MVP
8. Related Documents
9. Revision History

## 1. Changelog Format

Each release should use the following sections:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

The changelog is written for internal product and engineering history. Customer-facing summaries belong in [15_Release_Notes.md](15_Release_Notes.md).

## 2. Unreleased

### Added

- Placeholder for future changes.

### Changed

- Placeholder for future changes.

### Deprecated

- Placeholder for future changes.

### Removed

- Placeholder for future changes.

### Fixed

- Placeholder for future changes.

### Security

- Placeholder for future changes.

## 3. Version 1.0 Documentation Library

### Added

- Documentation index at [INDEX.md](INDEX.md).
- Documentation README at [README.md](README.md).
- Master engineering project tracker at [11_Project_Tracker.md](11_Project_Tracker.md).
- Version 1 architecture decision log at [12_Decision_Log.md](12_Decision_Log.md).
- Version 1 changelog at [13_Change_Log.md](13_Change_Log.md).
- Expanded known issues register at [14_Known_Issues.md](14_Known_Issues.md).
- Customer-facing release notes at [15_Release_Notes.md](15_Release_Notes.md).
- Testing strategy and detailed test plan at [16_Test_Plan.md](16_Test_Plan.md).
- Production-quality design system, product roadmap, development roadmap, AI architecture, API standards, and brand guidelines.

### Changed

- Renamed `CHANGELOG.md` to `13_Change_Log.md`.
- Renamed `DECISIONS.md` to `12_Decision_Log.md`.
- Renamed `KNOWN_ISSUES.md` to `14_Known_Issues.md`.
- Renamed `RELEASE_NOTES.md` to `15_Release_Notes.md`.
- Standardized documentation metadata, table of contents, related documents, and revision history sections.
- Organized documentation into numbered product, engineering, architecture, and operations documents.

### Deprecated

- Unnumbered operational documentation file names are deprecated in favor of numbered Version 1 names.

### Removed

- No documentation content was intentionally removed; starter content was migrated and expanded.

### Fixed

- Improved documentation coverage for roadmap, testing, operational issues, decisions, and release communication.

### Security

- Reinforced documentation guidance that secrets must never be exposed or hardcoded.

## 4. Version 0.4 Reporting MVP

### Added

- Professional management report generation.
- PDF export capability while preserving analysed CSV download.
- Report sections for Executive Summary, Overall Sentiment Summary, Top Themes, Theme Distribution, Positive Highlights, Negative Highlights, Key Risks, Recommended Actions, AI-generated Conclusions, theme counts chart, and sentiment counts chart.

### Changed

- Expanded SurveyIQ output from a simple analysed CSV toward executive-ready reporting.

### Deprecated

- CSV-only output is no longer the complete target output for the MVP, although CSV remains supported.

### Removed

- Nothing removed.

### Fixed

- No fixed items recorded for this milestone.

### Security

- Continued requirement not to expose OpenAI API keys or hardcode secrets.

## 5. Version 0.3 Larger File Analysis

### Added

- Batching for AI analysis.
- Per-batch analysis execution.
- Merged batch results.
- Cross-batch theme consolidation.
- Larger sample test requirement of at least 200 responses.
- Partial failure handling guidance.

### Changed

- Analysis workflow became safer for larger survey files.
- Backend analysis orchestration moved beyond a single request-sized model call approach.

### Deprecated

- Single-pass analysis as the preferred approach for larger files.

### Removed

- Nothing removed.

### Fixed

- Reduced risk of oversized AI requests for larger survey files.

### Security

- Maintained no-key-exposure requirement during testing and analysis.

## 6. Version 0.2 AI Quality Pipeline

### Added

- Multi-stage analysis workflow.
- Candidate theme identification.
- Canonical theme consolidation.
- Response reassignment to canonical themes.
- Sentiment generation.
- Confidence scoring.
- Executive insights.
- Recommended actions.

### Changed

- Analysis quality became the primary improvement focus before adding SaaS commercial features.
- Output remained frontend-compatible while backend AI workflow became more sophisticated.

### Deprecated

- Simple one-shot AI analysis as the long-term analysis strategy.

### Removed

- Nothing removed.

### Fixed

- Reduced risk of fragmented or duplicated themes.

### Security

- Continued no-secret logging and no API key exposure requirements.

## 7. Version 0.1 Local MVP

### Added

- Clean project structure with `backend/`, `frontend/`, `sample_data/`, and `README.md`.
- Next.js frontend.
- FastAPI backend.
- pandas-based CSV and Excel processing.
- OpenAI API integration for text analysis.
- Local file handling.
- CSV/Excel upload.
- First 10-row preview.
- Detected column display.
- Feedback column selection.
- Response-level AI analysis with original response, theme/category, sentiment, confidence score, and short reason.
- Overall results with theme summary, theme counts, sentiment counts, and executive summary.
- Analysed CSV download.
- Setup instructions and `OPENAI_API_KEY` environment guidance.

### Changed

- Initial concept became a working local MVP.

### Deprecated

- Nothing deprecated.

### Removed

- Authentication, payment, database, subscriptions, teams, and enterprise features were intentionally excluded from MVP scope.

### Fixed

- Environment variable loading was verified after backend `.env` setup.
- OpenAI API billing readiness was validated during end-to-end testing.

### Security

- `OPENAI_API_KEY` must be configured through environment variables.
- API key must not be printed or exposed.
- Secrets must not be hardcoded.

## 8. Related Documents

- [12_Decision_Log.md](12_Decision_Log.md)
- [14_Known_Issues.md](14_Known_Issues.md)
- [15_Release_Notes.md](15_Release_Notes.md)
- [16_Test_Plan.md](16_Test_Plan.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)

## 9. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter changelog. |
| 1.0 | 2026-07-05 | Codex | Migrated and rewrote changelog using Keep a Changelog structure with major SurveyIQ milestones. |
