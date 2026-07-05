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
- No database-backed project library.
- No billing or subscription management.
- No team collaboration.
- No enterprise governance.
- Larger analyses can still take several minutes.
- Dashboard, Projects, Reports, AI Assistant, Settings, and other application pages are not yet built; Sprint 6 provides only the shared shell they will use.
- AI results should be reviewed for important business decisions, especially low-confidence responses.
- Cross-analysis is intentionally lightweight in the MVP and should be treated as directional.
- Segment detection uses only supplied column names and values; it does not infer sensitive attributes beyond the dataset.

See [14_Known_Issues.md](14_Known_Issues.md) for the full known issues register.

## 8. Upcoming Features

Planned or future capabilities:

- Executive dashboard.
- Project organization.
- Reports library.
- Authentication and onboarding.
- Workspace settings.
- Usage tracking.
- Dashboard summaries.
- Theme review and sentiment review.
- Richer frontend exposure of column profiles, quantitative summaries, and cross-analysis.
- AI Assistant as a right-side contextual drawer.
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
