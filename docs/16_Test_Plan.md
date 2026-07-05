# SurveyIQ Test Plan

**Version:** 1.0  
**Status:** Draft  
**Owner:** Quality Engineering  
**Last Updated:** 2026-07-05

## Purpose

This document defines the SurveyIQ testing strategy. It covers functional testing, regression testing, integration testing, API testing, UI testing, performance testing, security testing, accessibility testing, manual testing, future automated testing, and detailed test cases for major features.

The test plan should protect the core SurveyIQ promise: users can upload survey feedback, preview data, select a feedback column, run AI analysis, review themes and sentiment, generate executive-ready reports, and download CSV/PDF outputs reliably.

## Table of Contents

1. Testing Philosophy
2. Test Environments
3. Test Data
4. Functional Testing
5. Regression Testing
6. Integration Testing
7. API Testing
8. UI Testing
9. Performance Testing
10. Security Testing
11. Accessibility Testing
12. Manual Testing
13. Future Automated Testing
14. Major Feature Test Cases
15. Release Readiness Checklist
16. Related Documents
17. Revision History

## 1. Testing Philosophy

SurveyIQ testing should prioritize user-critical workflows and trust-sensitive outputs.

Testing principles:

- Protect the upload-to-report flow first.
- Test AI output structure even when exact wording varies.
- Use deterministic mocks where appropriate.
- Use real OpenAI calls only for controlled end-to-end validation.
- Never expose or print API keys.
- Validate both happy paths and recovery paths.
- Test documents, exports, and reports because they are core product outputs.
- Treat accessibility and security as product quality, not late-stage polish.

## 2. Test Environments

### Local Development

Used for:

- Fast developer checks.
- Manual MVP validation.
- Sample data tests.
- Mocked AI tests.

### Staging

Future environment used for:

- Pre-release validation.
- Authentication and database integration.
- Payment sandbox testing.
- Hosted file storage tests.
- Monitoring and deployment verification.

### Production

Future environment used for:

- Smoke tests after deployment.
- Monitoring-only validation.
- No destructive test data unless explicitly isolated.

## 3. Test Data

Required datasets:

- Small sample CSV with representative feedback.
- Small Excel file with equivalent structure.
- Generated larger sample file with at least 200 responses.
- File with missing feedback column.
- File with empty feedback responses.
- File with numeric-only column.
- File with unusual characters and encoding.
- File with long comments.
- File with mixed positive, neutral, and negative sentiment.
- Mixed survey dataset with at least 100 rows, multiple qualitative feedback columns, numeric/rating columns, categorical segment columns, and a date column.

Data safety:

- Use synthetic or anonymized data.
- Do not commit real customer feedback.
- Do not include secrets in test files.

## 4. Functional Testing

Functional tests verify user-facing behaviour.

Core functional areas:

- Upload CSV/Excel.
- Preview first 10 rows.
- Detect columns.
- Select feedback column.
- Run AI analysis.
- Show response-level analysis.
- Show theme counts.
- Show sentiment counts.
- Show or return column profiles.
- Support old single `feedback_column` analysis.
- Support new `feedback_columns` multi-column analysis.
- Return quantitative summaries and cross-analysis when relevant.
- Generate analysed CSV.
- Generate PDF report.
- Download outputs.

## 5. Regression Testing

Regression tests ensure existing MVP behaviour remains stable after changes.

Baseline regression flow:

1. Start backend.
2. Start frontend.
3. Confirm backend detects `OPENAI_API_KEY` without printing it.
4. Upload sample CSV.
5. Confirm preview and columns.
6. Select feedback column.
7. Run analysis.
8. Confirm AI response succeeds.
9. Confirm theme counts.
10. Confirm sentiment counts.
11. Confirm additive dataset fields do not break old frontend fields.
12. Download analysed CSV.
13. Generate or download PDF report.
14. Confirm frontend displays analysis correctly.

Regression tests should run before changes to establish baseline and after changes to confirm no breakage.

## 6. Integration Testing

Integration tests verify connections between components:

- Frontend to backend upload.
- Backend to pandas parser.
- Backend to OpenAI API.
- AI pipeline to CSV generation.
- AI pipeline to PDF report generation.
- Download endpoint to generated files.
- Future backend to database.
- Future backend to object storage.
- Future backend to authentication provider.

## 7. API Testing

API tests should validate:

- `GET /health`.
- `POST /upload`.
- `POST /analyse`.
- CSV download endpoint.
- PDF download endpoint.
- Error responses for invalid upload IDs.
- Error responses for missing feedback column.
- Error responses for unsupported file types.
- Error responses for missing OpenAI configuration.

API testing standards:

- Assert status codes.
- Assert response schemas.
- Assert user-safe error messages.
- Assert no API key is included in response or logs.

## 8. UI Testing

UI tests should validate:

- Permanent application shell renders.
- Sidebar navigation renders all approved primary navigation items.
- Sidebar collapses on tablet-sized layouts.
- Mobile drawer opens and closes.
- Top bar controls render without blocking core workflow.
- Theme toggle changes shell theme state.
- Upload controls.
- Browse fallback for drag-and-drop.
- Preview table readability.
- Feedback column selector.
- Processing state.
- Results sections.
- Theme and sentiment charts.
- Download actions.
- Responsive behaviour.
- Error and empty states.

UI tests should be desktop-first but include tablet and mobile checks for core flows.

## 9. Performance Testing

Performance tests should validate:

- Upload parsing time for small and larger files.
- Analysis time for batched larger files.
- PDF generation time.
- Frontend responsiveness during processing.
- Table rendering with larger response counts.

Targets should be defined as the product matures. MVP performance testing should focus on detecting obvious regressions and preventing request failures for supported sample sizes.

## 10. Security Testing

Security tests should validate:

- API key is loaded from environment only.
- API key is never printed in logs or responses.
- Unsupported files are rejected.
- Download endpoints cannot access arbitrary local files.
- Error messages do not expose stack traces, secrets, or internal paths.
- Future authenticated endpoints enforce authorization.
- Future admin endpoints are restricted.

## 11. Accessibility Testing

Accessibility target:

- WCAG 2.2 AA.

Test areas:

- Keyboard navigation.
- Visible focus states.
- Form labels and validation messages.
- Chart text alternatives.
- Drag-and-drop upload browse alternative.
- Color contrast.
- Error announcements.
- Loading state text.
- Sentiment and risk labels not relying on color alone.

## 12. Manual Testing

Manual testing remains important for:

- AI output quality.
- PDF report readability.
- Executive summary usefulness.
- Theme naming quality.
- Recommended action relevance.
- Visual layout review.
- End-to-end smoke testing with real OpenAI calls.

Manual testers should record:

- Test dataset.
- Analysis date.
- Model/provider configuration if relevant.
- Observed issues.
- Whether outputs are suitable for management review.

## 13. Future Automated Testing

Recommended automation roadmap:

- Backend unit tests for file parsing and analysis helpers.
- API integration tests with mocked OpenAI responses.
- Contract tests for upload/analyse/download response schemas.
- Frontend component tests for upload, preview, results, and downloads.
- End-to-end browser smoke tests for core flow.
- PDF generation tests with visual or text extraction checks.
- AI evaluation harness for sample datasets.
- Accessibility checks in CI.
- Security/dependency scanning.

## 14. Major Feature Test Cases

### Upload CSV

| Test Case | Steps | Expected Result |
|---|---|---|
| Upload valid CSV | Select valid CSV file and upload. | Backend returns upload ID, filename, columns, row count, and first 10 preview rows. |
| Upload unsupported file | Select unsupported file type. | User receives clear unsupported file error. |
| Upload empty CSV | Upload empty CSV file. | User receives clear empty/unreadable file error. |
| Upload CSV with unusual characters | Upload CSV containing punctuation, unicode, and line breaks. | File parses without corrupting preview. |

### Frontend Application Shell

| Test Case | Steps | Expected Result |
|---|---|---|
| Render desktop shell | Open the frontend on a desktop viewport. | Permanent sidebar, topbar, content area, and current MVP workflow render without overlap. |
| Verify primary navigation | Inspect sidebar items. | Dashboard, Projects, Analysis, Reports, AI Assistant, Data Sources, Team, and Settings are visible and Analysis is active for the current MVP page. |
| Tablet collapsed navigation | Resize to tablet width. | Sidebar uses compact/collapsed presentation and content remains readable. |
| Mobile drawer navigation | Resize to mobile width and open navigation. | Drawer opens, navigation items are reachable, and drawer can be closed. |
| Topbar controls | Inspect workspace, search, notifications, help, theme toggle, and avatar. | Controls render consistently and do not alter backend behaviour. |
| Theme toggle | Toggle theme control. | Shell switches between light and dark presentation without losing page state. |
| Shared state components | Trigger empty, loading, and error states. | Empty, loading, and error components are readable, accessible, and visually consistent. |
| Existing workflow inside shell | Upload and analyse a sample file from inside the shell. | Upload, preview, analysis, counts, CSV download, and PDF download continue to work. |

### Upload Excel

| Test Case | Steps | Expected Result |
|---|---|---|
| Upload valid Excel file | Select `.xlsx` file and upload. | Backend returns columns and preview rows. |
| Upload malformed Excel file | Upload corrupt spreadsheet. | User receives readable file parsing error. |
| Excel with multiple sheets | Upload workbook with multiple sheets. | MVP behaviour is documented and does not fail silently. |

### Data Preview

| Test Case | Steps | Expected Result |
|---|---|---|
| Preview first 10 rows | Upload file with more than 10 rows. | Preview displays only first 10 rows. |
| Detect columns | Upload file with clear headers. | All headers are listed as detected columns. |
| Missing headers | Upload file without headers. | User receives clear guidance or safe fallback behaviour. |

### Feedback Column Selection

| Test Case | Steps | Expected Result |
|---|---|---|
| Select valid feedback column | Choose text column. | User can continue to analysis. |
| No column selected | Attempt analysis without selecting column. | Validation prevents analysis and explains required selection. |
| Select numeric column | Select numeric-only column if available. | User receives warning or analysis-safe validation. |
| Select empty text column | Select empty column. | User receives no usable responses error. |

### Column Profiling

| Test Case | Steps | Expected Result |
|---|---|---|
| Profile all columns | Upload mixed 100-row dataset. | Response includes one profile per uploaded column. |
| Detect qualitative columns | Inspect `main_feedback` and `improvement_feedback`. | Both are inferred as `qualitative_text` with `feedback_column` role. |
| Detect rating columns | Inspect satisfaction, ease, and NPS columns. | Rating-style columns are inferred as `rating` or numeric with rating role where appropriate. |
| Detect segments | Inspect department, region, role, product, service category. | Likely grouping columns are suggested as `segment_column`. |
| Detect date column | Inspect submitted date. | Column is inferred as `date` with `date_column` role. |

### AI Analysis

| Test Case | Steps | Expected Result |
|---|---|---|
| Analyse sample CSV | Run analysis on sample data. | Response-level results include original response, theme, sentiment, confidence, and reason. |
| Analyse 200+ responses | Run analysis on larger generated file. | Batches complete, results merge, counts are returned. |
| Missing API key | Run analysis without configured key in controlled environment. | Backend returns safe configuration error without exposing secrets. |
| OpenAI transient error | Simulate provider timeout or rate limit. | Retry or user-safe error occurs according to retry policy. |

### Multi-Column Qualitative Analysis

| Test Case | Steps | Expected Result |
|---|---|---|
| Analyse two feedback columns | Send `feedback_columns` with `main_feedback` and `improvement_feedback`. | Analysis succeeds and returns results from both columns. |
| Preserve old request | Send old `feedback_column` request. | Analysis succeeds with backwards-compatible response fields. |
| Preserve source metadata | Download multi-column CSV. | Each row includes `source_row_index` and `source_feedback_column`. |
| Invalid feedback column in list | Include missing column in `feedback_columns`. | API returns safe validation error. |

### Quantitative Summary

| Test Case | Steps | Expected Result |
|---|---|---|
| Summarize ratings | Analyse mixed dataset with rating columns. | Response includes count, mean, median, min, max, standard deviation, and rating distribution. |
| Missing numeric values | Use dataset with blanks in rating column. | Summary ignores missing values and reports correct count. |
| Non-rating numeric column | Upload numeric identifier column. | Identifier is not treated as a rating summary when role detection marks it as identifier. |

### Segment Detection and Cross-Analysis

| Test Case | Steps | Expected Result |
|---|---|---|
| Sentiment by segment | Analyse mixed dataset. | `cross_analysis.sentiment_by_segment` contains segment-level sentiment counts. |
| Themes by segment | Analyse mixed dataset. | `cross_analysis.top_themes_by_segment` contains top themes by segment value. |
| Average rating by segment | Analyse mixed dataset with rating columns. | `cross_analysis.average_rating_by_segment` contains rating averages by segment. |
| Notable differences | Analyse mixed dataset with varied ratings/sentiment. | `cross_analysis.notable_differences` contains concise directional highlights where differences are large enough. |

### Theme Counts

| Test Case | Steps | Expected Result |
|---|---|---|
| Count themes | Analyse dataset with repeated topics. | Theme counts match response-level assigned themes. |
| Consolidate similar themes | Include similar wording across batches. | Similar themes merge into canonical themes. |
| Large number of themes | Use varied dataset. | Theme list remains readable and report-safe. |

### Sentiment Counts

| Test Case | Steps | Expected Result |
|---|---|---|
| Count sentiment | Analyse mixed sentiment dataset. | Counts for positive, neutral, and negative match response-level records. |
| Ambiguous response | Include ambiguous feedback. | Sentiment is neutral or confidence is appropriately lower. |
| Negative response | Include clear complaint. | Sentiment is negative with relevant reason. |

### Analysed CSV Download

| Test Case | Steps | Expected Result |
|---|---|---|
| Download CSV | Complete analysis and download CSV. | CSV file downloads and contains original response plus analysis fields. |
| Missing CSV | Request unavailable CSV. | User receives safe not-found error. |
| CSV encoding | Open downloaded CSV. | Text remains readable. |

### PDF Report

| Test Case | Steps | Expected Result |
|---|---|---|
| Generate report | Complete analysis and generate PDF. | PDF includes required management report sections. |
| Check charts | Open report PDF. | Theme and sentiment charts render clearly. |
| Larger dataset report | Generate report from 200+ response analysis. | Report remains readable and professional. |
| Missing PDF | Request unavailable PDF. | User receives safe not-found error. |
| Dataset sections | Generate PDF from mixed dataset. | PDF includes dataset overview, column profile summary, quantitative summary, segment insights, and cross-analysis highlights when relevant. |

### Dashboard

| Test Case | Steps | Expected Result |
|---|---|---|
| Empty dashboard | Open dashboard with no saved data in future SaaS flow. | Action-first empty state appears. |
| Returning dashboard | Open dashboard with saved analyses in future SaaS flow. | Insight-first summary and recent work appear. |

### Projects

| Test Case | Steps | Expected Result |
|---|---|---|
| Create project | Create project in future SaaS flow. | Project appears in list and can be opened. |
| Link analysis to project | Run analysis inside project. | Analysis appears on project detail page. |

### Authentication

| Test Case | Steps | Expected Result |
|---|---|---|
| Signup | Create new account in future SaaS flow. | User reaches onboarding or dashboard. |
| Login | Log in with valid credentials. | User reaches workspace. |
| Invalid login | Use invalid credentials. | Safe error appears without account enumeration. |
| Forgot password | Request reset. | User sees confirmation state. |

### Database

| Test Case | Steps | Expected Result |
|---|---|---|
| Save analysis | Complete analysis in future SaaS flow. | Analysis persists and can be reopened. |
| Save report | Generate report. | Report persists and is listed in reports library. |
| Migration | Run migrations on clean environment. | Database schema applies successfully. |

### Payments and Subscriptions

| Test Case | Steps | Expected Result |
|---|---|---|
| View billing | Open billing page in future commercial flow. | Plan, usage, and invoices appear. |
| Plan limit | Hit configured future usage limit. | User receives clear upgrade or limit guidance. |
| Payment failure | Simulate failed payment. | Billing state is clear and access rules are enforced safely. |

### AI Assistant

| Test Case | Steps | Expected Result |
|---|---|---|
| Open assistant drawer | Open AI Assistant from authenticated app in future flow. | Right-side drawer opens without replacing primary workflow. |
| Ask about current analysis | Ask contextual question. | Assistant answers using current analysis context only. |
| Permission boundary | Ask about inaccessible project. | Assistant refuses or excludes inaccessible data. |

### API

| Test Case | Steps | Expected Result |
|---|---|---|
| Health endpoint | Call health endpoint. | Backend returns healthy status. |
| Upload endpoint | POST valid file. | Response schema is valid. |
| Analyse endpoint | POST valid upload and column. | Analysis schema is valid. |
| Error schema | Send invalid request. | Error response is safe and structured. |

### Documentation

| Test Case | Steps | Expected Result |
|---|---|---|
| Link review | Open documentation links. | Related documents resolve correctly. |
| Metadata review | Check each Version 1 document. | Title, purpose, version, status, owner, TOC, related docs, and revision history exist where required. |
| Scope review | Review docs against product vision. | Documents do not contradict approved source of truth. |

## 15. Release Readiness Checklist

Before a release:

- Core flow passes: upload, preview, feedback column selection, analysis, counts, CSV download, PDF report.
- API key detection works without exposing the key.
- Known issues are updated.
- Changelog is updated.
- Release notes are updated.
- Documentation index is current.
- New or changed endpoints are documented.
- Security-sensitive logs are reviewed.
- Accessibility-critical flows are checked.
- Sample data and larger dataset tests pass.
- Mixed 100-row dataset test passes.
- Old single-column request and new multi-column request both pass.
- Frontend build passes.
- Backend build or compile check passes.
- Sprint 6 shell regression passes on desktop, tablet, and mobile viewports.
- Sidebar collapse and mobile drawer navigation are verified.

## 16. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)
- [14_Known_Issues.md](14_Known_Issues.md)

## 17. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-05 | Codex | Created Version 1 SurveyIQ testing strategy and feature-level test plan. |
| 1.1 | 2026-07-05 | Codex | Added tests for column profiling, multi-column qualitative analysis, quantitative summaries, segment detection, and cross-analysis. |
