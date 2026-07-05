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
3. Agreed Sprint Plan
4. Version 1.0 Documentation Library
5. Version 0.4 Reporting MVP
6. Version 0.3 Larger File Analysis
7. Version 0.2 AI Quality Pipeline
8. Version 0.1 Local MVP
9. Related Documents
10. Revision History

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

- Sprint 6 frontend foundation and permanent application shell.
- Reusable frontend layout components: `AppLayout`, `Sidebar`, `Topbar`, `ContentArea`, `PageHeader`, and `SectionHeader`.
- Reusable frontend UI primitives: `Card`, `Button`, `Badge`, `LoadingState`, `EmptyState`, and `ErrorState`.
- Microsoft-inspired enterprise SaaS layout with desktop sidebar, tablet collapsed sidebar, and mobile drawer navigation.
- Top navigation shell with workspace name, search UI, notifications control, help control, theme toggle, and user avatar placeholder.
- Frontend PDF report download link when the backend returns `report_download_url`.
- Column profiling for every uploaded CSV/Excel column.
- Additive upload response field: `column_profiles`.
- Optional multi-column qualitative analysis through `feedback_columns`.
- Source metadata on analysed responses: `source_row_index` and `source_feedback_column`.
- Quantitative summaries for numeric and rating-style columns.
- Segment detection for grouping columns such as department, region, location, team, role, product, service, and category.
- Lightweight cross-analysis for sentiment by segment, top themes by segment, average rating by segment, and notable differences.
- Additive analysis response fields: `selected_feedback_columns`, `quantitative_summary`, `segment_summary`, `cross_analysis`, and `enhanced_executive_summary`.
- Optional PDF sections for Dataset Overview, Column Profile Summary, Quantitative Summary, Segment Insights, and Cross-Analysis Highlights.
- New mixed survey sample dataset with 100 rows, multiple qualitative columns, ratings, segments, and dates.

### Changed

- Existing local MVP upload, preview, analysis, results, CSV, and PDF workflow now sits inside the permanent SurveyIQ application shell.
- Enhanced executive summary now combines qualitative themes with available quantitative and segment context.
- Analysed CSV export now includes source row and source feedback column metadata.
- PDF reports include dataset intelligence sections only when relevant data exists.

### Deprecated

- Placeholder for future changes.

### Removed

- Placeholder for future changes.

### Fixed

- Preserved backwards compatibility for the old single `feedback_column` analysis request while adding `feedback_columns`.

### Security

- Continued requirement that OpenAI API keys are read from environment variables only and never exposed in responses, exports, or logs.

## 3. Agreed Sprint Plan

### Added

- Agreed Sprint 1-15 delivery plan documented across [07_Development_Roadmap.md](07_Development_Roadmap.md) and [11_Project_Tracker.md](11_Project_Tracker.md).

### Completed Sprints

| Sprint | Scope | Status |
|---|---|---|
| Sprint 1 | Project setup and initial MVP | Completed |
| Sprint 2 | Upload, preview, and feedback column selection | Completed |
| Sprint 3 | OpenAI analysis and CSV export | Completed |
| Sprint 4 | Multi-stage AI analysis pipeline | Completed |
| Sprint 5 | Dataset-level feedback intelligence, including column profiling, multiple qualitative columns, quantitative summaries, segment detection, cross-analysis, enhanced executive summary, PDF report updates, and mixed survey test dataset | Completed |
| Sprint 6 | Frontend foundation and application shell | Completed |

### Upcoming Sprints

| Sprint | Objective | Key Deliverables | Dependencies | Definition of Done | Testing Required |
|---|---|---|---|---|---|
| Sprint 7: Executive dashboard | Create first dashboard experience. | Empty dashboard, returning dashboard, summary cards, recent work areas. | Sprint 6, existing outputs. | Empty and returning-user dashboard states are usable. | Empty/populated state tests, UI regression. |
| Sprint 8: Projects and analysis wizard | Organize the current flow into a guided wizard. | New Analysis, upload, preview, configure, processing, results transition. | Sprint 6, current APIs. | Upload-to-results flow works through the wizard. | Wizard regression, validation, error-state tests. |
| Sprint 9: Results dashboard and interactive charts | Improve results presentation. | Executive summary layout, theme/sentiment charts, quantitative and segment panels. | Sprint 8, Sprint 5 dataset fields. | Results dashboard preserves CSV/PDF downloads. | Chart accessibility, single/multi-column compatibility. |
| Sprint 10: Reports and PDF builder UI | Add UI for report workflow. | Reports entry, builder UI, PDF preview/download controls. | Sprint 9, PDF endpoint. | Users can access and download reports from UI. | PDF download regression, report UI smoke tests. |
| Sprint 11: AI Assistant interface | Add contextual assistant drawer. | Drawer UI, prompt input, suggestions, context display, states. | Sprint 6, Sprint 9 context. | Assistant drawer works without disrupting core workflow. | Drawer, focus, keyboard, and context-boundary tests. |
| Sprint 12: Authentication and user accounts | Add SaaS account access. | Signup, login, forgot password, sessions, protected routes. | Auth decision, security standards. | Users can create accounts and access protected pages. | Auth, protected route, and security tests. |
| Sprint 13: Database and persistent projects | Persist product work. | Schema, migrations, projects, analyses, reports. | Sprint 12, database decision. | Users can reopen saved work across sessions. | Migration, CRUD, persistence, authorization tests. |
| Sprint 14: Team workspaces and permissions | Add collaboration foundation. | Workspaces, members, invites, basic roles, permissions. | Sprint 12, Sprint 13. | Workspace access and basic permissions are enforced. | Invite, role, isolation, access-denied tests. |
| Sprint 15: Billing, subscriptions, and private beta preparation | Prepare commercial beta foundation. | Billing page, subscriptions, plan/usage display, payment integration, beta checklist. | Sprint 12, Sprint 13, Sprint 14, pricing decisions. | Private beta can operate with accounts, persistence, workspaces, and billing foundation. | Billing sandbox, subscription, usage-limit, beta smoke tests. |

### Changed

- Development planning now has a clear completed sprint history and sequenced upcoming delivery plan.

### Deprecated

- No sprint scope was deprecated.

### Removed

- No sprint scope was removed.

### Fixed

- Reduced ambiguity around the order of frontend, dashboard, projects, reports, AI Assistant, authentication, database, team, and billing work.

### Security

- Authentication, permissions, and billing are explicitly sequenced after frontend/product foundations rather than being introduced prematurely.

## 4. Version 1.0 Documentation Library

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

## 5. Version 0.4 Reporting MVP

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

## 6. Version 0.3 Larger File Analysis

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

## 7. Version 0.2 AI Quality Pipeline

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

## 8. Version 0.1 Local MVP

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

## 9. Related Documents

- [12_Decision_Log.md](12_Decision_Log.md)
- [14_Known_Issues.md](14_Known_Issues.md)
- [15_Release_Notes.md](15_Release_Notes.md)
- [16_Test_Plan.md](16_Test_Plan.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)

## 10. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter changelog. |
| 1.0 | 2026-07-05 | Codex | Migrated and rewrote changelog using Keep a Changelog structure with major SurveyIQ milestones. |
| 1.1 | 2026-07-05 | Codex | Added agreed Sprint 1-15 plan with completed sprint history and upcoming sprint sequence. |
| 1.2 | 2026-07-05 | Codex | Recorded Sprint 6 frontend foundation, reusable shell components, responsive navigation, and MVP shell integration. |
