# SurveyIQ Release Notes

**Version:** 1.0  
**Status:** Draft  
**Owner:** Product Marketing and Product Management  
**Last Updated:** 2026-07-05

## Purpose

This document provides customer-facing release notes for SurveyIQ. It describes major features, improvements, bug fixes, performance improvements, known limitations, and upcoming capabilities in clear product language.

For internal engineering history, use [13_Change_Log.md](13_Change_Log.md).

## Table of Contents

1. Version History
2. SurveyIQ MVP Release
3. Major Features
4. Improvements
5. Bug Fixes
6. Performance Improvements
7. Known Limitations
8. Upcoming Features
9. Related Documents
10. Revision History

## 1. Version History

| Version | Release Name | Status | Summary |
|---|---|---|---|
| 1.0 | Documentation Library Version 1 | Draft | Complete professional documentation set for product, engineering, AI, API, brand, testing, and operations. |
| 0.10 | Reports Library and Report Viewer | Draft | Added local report records, searchable Reports Library, report viewer, and dashboard/project report integrations. |
| 0.9 | Project and Workspace Management | Draft | Added local project management, project detail tabs, project assignment, and project-linked analysis/report records. |
| 0.8 | Live Executive Dashboard Integration | Draft | Replaced dashboard demo data with the latest completed analysis output for the current local session. |
| 0.7 | Executive Dashboard | Draft | Added the primary dashboard landing experience with KPIs, recent work, themes, sentiment, actions, activity, and quick actions. |
| 0.6 | Dataset Intelligence Upload Wizard | Draft | Replaced the simple upload flow with a guided wizard for upload, profiling, column intelligence, options, review, processing, and results. |
| 0.5 | Frontend Foundation | Draft | Added the permanent SurveyIQ application shell, responsive navigation, top bar, and shared UI components. |
| 0.4 | Management Report MVP | Draft | Added professional PDF management report generation. |
| 0.3 | Larger File Analysis | Draft | Added batched AI analysis for larger survey files. |
| 0.2 | Improved AI Analysis Workflow | Draft | Added multi-stage analysis for better themes and insights. |
| 0.1 | Local MVP | Draft | Initial upload, preview, analysis, and CSV export workflow. |

## 2. SurveyIQ MVP Release

**Release Date:** TBD  
**Status:** Draft  
**Audience:** Early local MVP users and internal stakeholders

SurveyIQ MVP helps users upload survey feedback files, preview their data, select a free-text feedback column, run AI-powered analysis, and export results as both analysed CSV files and professional management PDF reports.

The MVP is designed for local validation of the core workflow, not production multi-user SaaS deployment.

## 3. Major Features

### Executive Dashboard

SurveyIQ now opens to an executive dashboard designed for fast review of feedback intelligence activity. The dashboard includes:

- Welcome section.
- KPI summary cards.
- Recent analyses.
- Recent reports.
- Top themes visualisation.
- Sentiment visualisation.
- Recommended actions.
- Recent activity.
- Quick actions.

The dashboard now uses the latest completed analysis from the current local session. After users complete analysis, dashboard KPIs, top themes, sentiment, recommended actions, recent analysis, recent reports, recent activity, and CSV/PDF quick links update from real backend output.

### Project and Workspace Management

SurveyIQ now includes local project management for organising analysis work before backend persistence exists. Users can:

- Create projects with name, description, category, owner, colour, and icon.
- Search, filter, sort, and open project cards.
- Review project statistics.
- Open a project detail view with Overview, Analyses, Reports, Activity, and Settings tabs.
- Assign a new analysis to an existing project before upload.
- See completed analyses, generated PDF reports, export links, and activity captured under the selected project.

Project data is stored in browser localStorage for MVP validation and is not yet shared across users, browsers, or devices.

### Reports Library and Report Viewer

Generated management reports are now treated as first-class local records in SurveyIQ. After an analysis generates a PDF report, SurveyIQ stores a report record in the local workspace so users can:

- Search generated reports.
- Filter reports by project or status.
- Sort reports by newest, oldest, project, or report type.
- Open a report detail viewer.
- Review executive summary, themes, sentiment, recommended actions, and dataset overview.
- Download the report PDF and analysed CSV where available.

Reports generated for a selected project also appear in that project's Reports tab, and recent generated reports appear on the Executive Dashboard.

### Dataset Intelligence Upload Wizard

SurveyIQ now guides users through a professional multi-step analysis workflow:

- Upload dataset.
- Review dataset profile.
- Review and adjust column intelligence.
- Choose analysis outputs.
- Review the setup.
- Run analysis.
- View results and download CSV/PDF outputs.

The wizard exposes backend capabilities that already exist, including dataset profiling, multi-column qualitative analysis, quantitative summaries, cross-analysis, executive summaries, analysed CSV export, and PDF report generation.

### Column Intelligence Review

Uploaded columns are grouped into qualitative, rating, numeric, categorical, date, identifier, and other categories. SurveyIQ preselects recommended roles, while users can enable, disable, reassign, or ignore columns before analysis.

### Permanent Application Shell

SurveyIQ now has a reusable application shell that will support future dashboards, projects, reports, analysis workflows, and settings pages. The shell includes a left navigation sidebar, top bar, workspace context, search UI, notification/help controls, theme toggle, and user avatar placeholder.

The existing MVP upload, preview, analysis, CSV, and PDF download flow remains available inside the new shell.

### Responsive Navigation Foundation

The shell adapts across desktop, tablet, and mobile:

- Desktop uses a permanent sidebar.
- Tablet uses a compact/collapsed sidebar pattern.
- Mobile uses drawer navigation.

### Dataset-Level Feedback Intelligence

SurveyIQ can now understand more of the uploaded dataset, not just one free-text column. The backend profiles columns, identifies likely feedback, rating, segment, date, and identifier columns, and adds dataset context to analysis outputs.

### Multi-Column Feedback Analysis

Users and API clients can analyse one or more qualitative feedback columns in a single run. Existing single-column analysis remains supported.

### CSV and Excel Upload

Users can upload survey data in CSV or Excel format. SurveyIQ reads the file and prepares it for analysis.

### Data Preview

Users can preview the first 10 rows and view detected column names before selecting the feedback column.

### Feedback Column Selection

Users can choose the column containing free-text survey responses, helping avoid accidental analysis of rating or metadata columns.

### AI-Powered Response Analysis

SurveyIQ analyses each response and returns:

- Original response.
- Theme or category.
- Sentiment: positive, neutral, or negative.
- Confidence score.
- Short reason.

### Theme and Sentiment Summaries

SurveyIQ generates overall counts by theme and sentiment so users can quickly understand the major patterns in the feedback.

### Executive Insights

SurveyIQ produces management-oriented summaries, including main themes, risks, recommended actions, and conclusions.

### Analysed CSV Download

Users can download a CSV containing the original responses and AI-generated analysis fields.

When multiple feedback columns are analysed, each exported response includes the source row index and source feedback column.

### Professional PDF Report

SurveyIQ can generate a management-ready PDF report with:

- Executive Summary.
- Overall Sentiment Summary.
- Top Themes.
- Theme Distribution.
- Positive Highlights.
- Negative Highlights.
- Key Risks.
- Recommended Actions.
- AI-generated Conclusions.
- Theme and sentiment charts.

## 4. Improvements

- Improved AI analysis quality through a multi-stage workflow.
- Added canonical theme consolidation to reduce duplicate or overlapping themes.
- Added batching so larger survey files can be analysed more safely.
- Added quantitative summaries for rating and numeric columns.
- Added segment-level summaries and lightweight cross-analysis.
- Added optional report sections for dataset overview, column profiles, quantitative summary, segment insights, and cross-analysis highlights.
- Added a professional Microsoft-inspired frontend shell based on the approved design system and wireframes.
- Added reusable frontend components for layout, cards, buttons, badges, loading states, empty states, and error states.
- Added a visible PDF report download action when a PDF report is available.
- Added a premium upload dropzone with browse fallback, sample dataset download, and supported file guidance.
- Added review and processing screens that make the current analysis state clearer without pretending live backend progress exists.
- Added an executive dashboard landing experience that keeps the Dataset Intelligence Wizard available from the same application surface.
- Replaced executive dashboard demo data with latest-analysis output from the current frontend session.
- Added live dashboard empty states for sessions where no analysis has been completed yet.
- Added project management with localStorage-backed workspace state, project assignment, project detail tabs, and project-linked analyses/reports.
- Added local report records so generated PDF/CSV outputs can be revisited from the Reports Library, Project Detail, and Executive Dashboard.
- Added searchable, filterable, sortable report cards and a report viewer while preserving the existing PDF and CSV download endpoints.
- Added responsive dashboard layouts for desktop, tablet, and mobile.
- Preserved frontend-compatible output while improving backend analysis quality.
- Expanded documentation for product vision, sitemap, user journey, wireframes, design system, roadmap, engineering, AI, API, brand, testing, and operations.

## 5. Bug Fixes

- Verified backend environment loading for `OPENAI_API_KEY`.
- Verified that the backend can detect the OpenAI API key without exposing it.
- Verified upload and OpenAI analysis flow after API billing was enabled.
- Improved documentation around troubleshooting and environment configuration.

## 6. Performance Improvements

- Added batched processing for larger survey files.
- Reduced risk of oversized single AI requests.
- Improved analysis workflow structure to support future background job processing.
- Added larger-file testing requirement using at least 200 generated responses.

## 7. Known Limitations

Current MVP limitations:

- Local file storage only.
- No authentication.
- No backend database-backed project library; projects are stored in browser localStorage for the local MVP.
- No backend database-backed reports library; generated report records are stored in browser localStorage for the local MVP.
- Browser-local project, report, and latest-analysis state can be cleared by browser settings and is not available across devices.
- No billing or subscription management.
- No team collaboration.
- No enterprise governance.
- Larger analyses can still take several minutes.
- Full SaaS report library, AI Assistant, Settings, and other application pages are not yet fully built.
- Report records are local metadata around existing generated files; durable multi-user report persistence is planned for the database phase.
- Analysis option toggles are frontend workflow controls in the local MVP; the backend still generates the currently supported analysis outputs.
- AI results should be reviewed for important business decisions, especially low-confidence responses.
- Cross-analysis is intentionally lightweight in the MVP and should be treated as directional.
- Segment detection uses only supplied column names and values; it does not infer sensitive attributes beyond the dataset.

See [14_Known_Issues.md](14_Known_Issues.md) for the full known issues register.

## 8. Upcoming Features

Planned or future capabilities:

- Project organization.
- AI Assistant as a right-side contextual drawer.
- Authentication and onboarding.
- Workspace settings.
- Usage tracking.
- Backend-connected dashboard summaries.
- Theme review and sentiment review.
- Richer frontend exposure of column profiles, quantitative summaries, and cross-analysis.
- Database-backed persistence.
- Future enterprise capabilities such as SSO, custom taxonomy, data governance, benchmarking, and advanced permissions.

Upcoming features are subject to roadmap prioritization and should be checked against [06_Product_Roadmap.md](06_Product_Roadmap.md).

## 9. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [13_Change_Log.md](13_Change_Log.md)
- [14_Known_Issues.md](14_Known_Issues.md)
- [16_Test_Plan.md](16_Test_Plan.md)

## 10. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial release notes starter document. |
| 1.0 | 2026-07-05 | Codex | Rewritten as Version 1 customer-facing release notes with feature, improvement, limitation, and upcoming-feature sections. |
| 1.1 | 2026-07-05 | Codex | Added release notes for dataset-level feedback intelligence and multi-column analysis. |
| 1.2 | 2026-07-05 | Codex | Added Sprint 6 frontend foundation release notes for the permanent SurveyIQ application shell. |
| 1.3 | 2026-07-05 | Codex | Added Sprint 7 release notes for the Dataset Intelligence Upload Wizard. |
| 1.4 | 2026-07-05 | Codex | Added Sprint 8 release notes for the Executive Dashboard landing experience. |
| 1.5 | 2026-07-05 | Codex | Added Sprint 9 release notes for live dashboard integration with latest completed analysis output. |
| 1.6 | 2026-07-05 | Codex | Added Sprint 10 release notes for Project and Workspace Management. |
| 1.7 | 2026-07-05 | Codex | Added Sprint 11 release notes for Reports Library, Report Viewer, and local report record integrations. |
