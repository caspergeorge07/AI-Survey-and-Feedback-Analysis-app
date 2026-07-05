# SurveyIQ Known Issues

**Version:** 1.0  
**Status:** Draft  
**Owner:** Engineering and Product  
**Last Updated:** 2026-07-05

## Purpose

This document tracks known SurveyIQ product, UX, AI, technical, documentation, and operational issues. It should help the team plan fixes, communicate limitations, and avoid rediscovering the same risks during development.

## Table of Contents

1. Issue Management Guidelines
2. Active Known Issues
3. Watchlist
4. Resolved Issues
5. Related Documents
6. Revision History

## 1. Issue Management Guidelines

Each issue should include:

- Issue ID
- Priority
- Description
- Current Behaviour
- Expected Behaviour
- Workaround
- Planned Fix
- Status
- Related Component

Priority definitions:

- **P0:** Critical, blocks core workflow or creates serious security/data risk.
- **P1:** Important, affects core MVP reliability or trust.
- **P2:** Medium, affects usability or future readiness.
- **P3:** Low, minor polish or future improvement.

Status definitions:

- **Open:** Known and not yet fixed.
- **Planned:** Fix is planned but not implemented.
- **In Progress:** Work has started.
- **Resolved:** Fix is complete and verified.
- **Won't Fix:** Issue is accepted or no longer relevant.

## 2. Active Known Issues

### Issue ID: KI-001

**Priority:** P1  
**Description:** Long analysis runs for larger files.  
**Current Behaviour:** Larger files require multiple OpenAI calls and may take several minutes to complete.  
**Expected Behaviour:** Users should receive clear progress feedback and eventually be able to leave and return while processing continues.  
**Workaround:** Use smaller files or wait for the request to complete.  
**Planned Fix:** Introduce background jobs, progress reporting, and job status endpoints in a future SaaS foundation phase.  
**Status:** Open  
**Related Component:** AI analysis, backend orchestration, frontend processing state

### Issue ID: KI-002

**Priority:** P2  
**Description:** PDF report download may not be fully surfaced in the frontend.  
**Current Behaviour:** Backend report generation exists and may return a report download URL, but the frontend experience may not yet provide a polished report download action everywhere it is needed.  
**Expected Behaviour:** Users should clearly see both analysed CSV and PDF report download actions from the results/report flow.  
**Workaround:** Use the returned report download URL if visible in the response or access the report endpoint directly during development.  
**Planned Fix:** Add a dedicated PDF download action to the results/report interface when frontend work is prioritized.  
**Status:** Open  
**Related Component:** Frontend, reports, downloads

### Issue ID: KI-003

**Priority:** P1  
**Description:** Local storage only.  
**Current Behaviour:** Uploaded files, analysed CSVs, and generated PDFs are stored locally.  
**Expected Behaviour:** A production SaaS version should use durable, tenant-aware storage and persistent database records.  
**Workaround:** Use local MVP mode for development and validation only.  
**Planned Fix:** Introduce database persistence and object storage during SaaS foundation work.  
**Status:** Open  
**Related Component:** Backend, storage, database, deployment

### Issue ID: KI-004

**Priority:** P1  
**Description:** No authentication or authorization in current MVP.  
**Current Behaviour:** The local MVP does not include user accounts, protected routes, workspaces, or permissions.  
**Expected Behaviour:** SaaS users should authenticate and access only their permitted workspace resources.  
**Workaround:** Run the MVP only in trusted local development environments.  
**Planned Fix:** Add authentication, workspace model, and authorization checks in the SaaS foundation phase.  
**Status:** Planned  
**Related Component:** Authentication, API, frontend app shell

### Issue ID: KI-005

**Priority:** P2  
**Description:** No persistent project or report library.  
**Current Behaviour:** The MVP focuses on immediate upload, analysis, CSV download, and PDF generation. Previous work is not organized into database-backed projects or reports.  
**Expected Behaviour:** Users should be able to return to projects, analyses, and reports later.  
**Workaround:** Save downloaded CSV/PDF outputs locally.  
**Planned Fix:** Add Projects List, Project Detail, Reports Library, and Report Detail after persistence exists.  
**Status:** Planned  
**Related Component:** Projects, reports, database, dashboard

### Issue ID: KI-006

**Priority:** P1  
**Description:** AI output quality needs formal evaluation.  
**Current Behaviour:** The AI pipeline produces themes, sentiment, confidence, reasons, insights, and actions, but quality is not yet measured with a formal evaluation suite.  
**Expected Behaviour:** AI changes should be assessed against sample datasets, schema checks, sentiment agreement, theme usefulness, and report quality criteria.  
**Workaround:** Manually review outputs for sample CSVs and larger generated datasets.  
**Planned Fix:** Implement AI evaluation test cases defined in [16_Test_Plan.md](16_Test_Plan.md).  
**Status:** Open  
**Related Component:** AI pipeline, testing, quality assurance

### Issue ID: KI-007

**Priority:** P2  
**Description:** Upload size and row count limits are not yet formally documented in-product.  
**Current Behaviour:** The MVP can process sample and larger generated files, but users may not know practical limits before uploading.  
**Expected Behaviour:** Upload UI and backend validation should communicate supported file types, recommended row counts, maximum size, and recovery guidance.  
**Workaround:** Use sample files or moderate file sizes during local development.  
**Planned Fix:** Define limits, enforce them in backend validation, and show guidance in the upload UI.  
**Status:** Open  
**Related Component:** File upload, backend validation, frontend copy

### Issue ID: KI-008

**Priority:** P2  
**Description:** Analysis failures need richer partial recovery behaviour.  
**Current Behaviour:** Partial batch failures can be handled more clearly than a single all-or-nothing failure, but the product does not yet provide a full recovery workflow.  
**Expected Behaviour:** Users should know which stage failed, whether any results were saved, and whether retry is safe.  
**Workaround:** Retry the analysis or reduce file size if a batch fails.  
**Planned Fix:** Add structured job status, partial result reporting, and retry controls.  
**Status:** Open  
**Related Component:** AI pipeline, backend errors, processing UI

### Issue ID: KI-009

**Priority:** P2  
**Description:** PDF layout may need validation with very large theme lists.  
**Current Behaviour:** Reports include theme and sentiment sections, but very large or unusually fragmented theme lists may affect layout readability.  
**Expected Behaviour:** PDF reports should remain readable and professional across supported datasets.  
**Workaround:** Review generated PDFs manually for larger files.  
**Planned Fix:** Add PDF layout regression tests and theme list summarization rules.  
**Status:** Open  
**Related Component:** Report generation, PDF layout, AI theme consolidation

### Issue ID: KI-010

**Priority:** P3  
**Description:** Documentation links may need periodic maintenance as the library evolves.  
**Current Behaviour:** The documentation library is being reorganized into numbered Version 1 files. Cross-references may become stale when documents are renamed or expanded.  
**Expected Behaviour:** Documentation links should remain current and navigable.  
**Workaround:** Use [INDEX.md](INDEX.md) as the primary entry point.  
**Planned Fix:** Review links during every documentation update and release.  
**Status:** Open  
**Related Component:** Documentation

### Issue ID: KI-011

**Priority:** P2  
**Description:** Cross-analysis is lightweight and directional in the MVP.  
**Current Behaviour:** SurveyIQ returns sentiment by segment, top themes by segment, average ratings by segment, and notable differences using deterministic grouping over the uploaded dataset. It does not yet provide statistical significance testing, configurable thresholds, longitudinal trends, or full dashboard exploration.  
**Expected Behaviour:** Future SaaS versions may provide richer analytics with saved datasets, filters, trend comparisons, and stronger statistical context.  
**Workaround:** Treat cross-analysis highlights as directional management signals and review the exported CSV for deeper analysis.  
**Planned Fix:** Add richer dashboard and analytics capabilities after persistence, projects, and reporting workflows are established.  
**Status:** Open  
**Related Component:** Cross-analysis, reporting, dashboard

### Issue ID: KI-012

**Priority:** P2  
**Description:** Column role detection is heuristic.  
**Current Behaviour:** Column profiles infer type and suggested role from column names, values, cardinality, and simple patterns. Edge-case datasets may classify columns imperfectly.  
**Expected Behaviour:** Users should eventually be able to confirm or override suggested column roles in the frontend.  
**Workaround:** Use the existing feedback column selector or API `feedback_columns` list to explicitly choose the qualitative columns to analyse.  
**Planned Fix:** Add frontend controls for reviewing column profiles and confirming roles in a future workflow iteration.  
**Status:** Open  
**Related Component:** Column profiling, upload, analysis configuration

## 3. Watchlist

- AI consistency for unusual survey formats.
- Sentiment classification for mixed or sarcastic responses.
- Theme duplication for highly varied feedback.
- OpenAI API latency and cost.
- CSV encoding edge cases.
- Excel files with multiple sheets or unusual formatting.
- Frontend handling of long-running requests.
- Accessibility of charts and report previews.
- Security implications of uploaded customer feedback in future SaaS environments.
- Segment detection accuracy for unusual internal naming conventions.
- Cross-analysis readability when many segment columns are present.

## 4. Resolved Issues

### Issue ID: KI-013

**Priority:** P1  
**Description:** Dataset Intelligence Wizard could show zero selected qualitative columns after upload.  
**Previous Behaviour:** The frontend depended on one exact `column_profiles` response shape. If profile metadata was missing, incomplete, stale, or returned under alternate field names, recommended feedback columns such as `main_feedback` and `improvement_feedback` could fail to preselect.  
**Expected Behaviour:** Qualitative text columns and suggested role `feedback_column` should be shown under Qualitative Columns and preselected for analysis.  
**Resolution:** Frontend upload response mapping now normalizes profile metadata, supports singular/plural feedback column hints, treats `feedback_column` and `qualitative_text` as recommended feedback selections, and falls back to column-name/preview-value inference when profile metadata is incomplete.  
**Status:** Resolved  
**Related Component:** Dataset Intelligence Wizard, column profiling, frontend upload flow

### Issue ID: KI-014

**Priority:** P1  
**Description:** Dataset Intelligence Wizard rendered structured API errors as `[object Object]`.  
**Previous Behaviour:** The frontend converted non-string API `detail` payloads directly to strings. FastAPI validation arrays, nested provider errors, or object-shaped error responses could appear to users as `[object Object]`, especially during the Analysis Options and Review flow.  
**Expected Behaviour:** All upload and analysis errors should be readable, actionable, and safe for users, including `{ detail: "message" }`, `{ detail: [{ msg: "...", loc: [...] }] }`, `{ error: { message: "..." } }`, and plain text responses.  
**Resolution:** The wizard now normalizes API errors through a safe user-facing formatter, extracts useful messages from known FastAPI/provider shapes, redacts internal or sensitive details, and logs unreadable payload shapes only in development.  
**Status:** Resolved  
**Related Component:** Dataset Intelligence Wizard, API error handling, frontend validation

## 5. Related Documents

- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)
- [13_Change_Log.md](13_Change_Log.md)
- [16_Test_Plan.md](16_Test_Plan.md)

## 6. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial known issues starter document. |
| 1.0 | 2026-07-05 | Codex | Migrated and expanded known issues into Version 1 operational issue register. |
| 1.1 | 2026-07-05 | Codex | Added known issues for lightweight cross-analysis and heuristic column role detection. |
| 1.2 | 2026-07-05 | Codex | Added resolved issue for Sprint 7 Dataset Intelligence Wizard qualitative column preselection bug. |
| 1.3 | 2026-07-05 | Codex | Added resolved issue for Sprint 7 structured API error rendering bug. |
