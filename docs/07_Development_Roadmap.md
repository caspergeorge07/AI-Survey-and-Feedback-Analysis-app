# SurveyIQ Development Roadmap

**Version:** 0.2  
**Status:** Draft  
**Owner:** Engineering  
**Last Updated:** 2026-07-05

## Purpose

This document translates the SurveyIQ product roadmap into an engineering delivery roadmap. It breaks development into logical phases across project setup, backend, frontend, AI pipeline, database, authentication, billing, reports, dashboard, projects, analysis wizard, AI Assistant, API, testing, CI/CD, deployment, monitoring, performance, security, documentation, refactoring, and production release.

The roadmap should preserve the working MVP while creating a clear path toward a commercial SaaS platform.

## Table of Contents

1. Engineering Principles
2. Current Technical Baseline
3. Phase Summary
4. Phase 1: Project Setup
5. Phase 2: Backend
6. Phase 3: Frontend
7. Phase 4: AI Pipeline
8. Phase 5: Database
9. Phase 6: Authentication
10. Phase 7: Billing
11. Phase 8: Subscriptions
12. Phase 9: Reports
13. Phase 10: Dashboard
14. Phase 11: Projects
15. Phase 12: Analysis Wizard
16. Phase 13: AI Assistant
17. Phase 14: API
18. Phase 15: Testing
19. Phase 16: CI/CD
20. Phase 17: Deployment
21. Phase 18: Monitoring
22. Phase 19: Performance
23. Phase 20: Security
24. Phase 21: Documentation
25. Phase 22: Refactoring
26. Phase 23: Production Release
27. Related Documents
28. Revision History

## 1. Engineering Principles

- Preserve current upload, preview, analysis, CSV download, and PDF report behaviour.
- Keep API changes backwards compatible unless correcting a clear bug.
- Avoid premature enterprise complexity.
- Separate orchestration, business logic, file handling, AI calls, and presentation concerns.
- Do not hardcode secrets or expose API keys.
- Use structured errors that are useful to users and support teams.
- Build test coverage around user-critical flows before broadening the product surface.

## 2. Current Technical Baseline

Current MVP architecture:

- Next.js frontend.
- FastAPI backend.
- pandas for CSV and Excel processing.
- OpenAI API for text analysis.
- Local file handling for uploads, analysed CSVs, and generated reports.
- Multi-stage AI analysis pipeline with batching and canonical theme consolidation.
- PDF management report generation.

Explicit current limitations:

- No authentication.
- No database.
- No billing or subscriptions.
- No team model.
- No production hosting design.
- No enterprise governance features.

## 3. Phase Summary

| Phase | Area | Timing Intent |
|---|---|---|
| 1 | Project Setup | Stabilize local development |
| 2 | Backend | Harden MVP API and file handling |
| 3 | Frontend | Align UI with workflow and wireframes |
| 4 | AI Pipeline | Improve quality, reliability, and cost control |
| 5 | Database | Introduce persistence after MVP validation |
| 6 | Authentication | Enable SaaS access |
| 7 | Billing | Prepare commercial plans |
| 8 | Subscriptions | Enforce plan and usage boundaries |
| 9 | Reports | Mature report library and builder |
| 10 | Dashboard | Add insight-first workspace overview |
| 11 | Projects | Organize analyses and reports |
| 12 | Analysis Wizard | Formalize guided upload-to-analysis flow |
| 13 | AI Assistant | Add contextual assistant drawer |
| 14 | API | Standardize public/internal API behaviour |
| 15 | Testing | Protect core flows |
| 16 | CI/CD | Automate quality gates |
| 17 | Deployment | Move toward hosted environments |
| 18 | Monitoring | Observe reliability and AI costs |
| 19 | Performance | Improve large-file and dashboard speed |
| 20 | Security | Protect data and access |
| 21 | Documentation | Keep product and engineering docs current |
| 22 | Refactoring | Pay down structural debt |
| 23 | Production Release | Launch SaaS-ready version |

## 4. Phase 1: Project Setup

**Objective:** Make local development repeatable for new engineers.  
**Deliverables:** Environment setup docs, dependency installation validation, `.env` instructions, local run scripts or documented commands, sample data verification.  
**Dependencies:** Existing backend, frontend, README, sample data.  
**Estimated Difficulty:** Low.  
**Estimated Duration:** 1-3 days.  
**Definition of Done:** A new engineer can clone the project, configure `OPENAI_API_KEY`, run backend and frontend locally, upload sample data, run analysis, and download outputs without undocumented steps.

## 5. Phase 2: Backend

**Objective:** Harden the FastAPI backend around upload, preview, analysis, reporting, and downloads.  
**Deliverables:** Clear route structure, typed request/response schemas, safer file validation, structured errors, logging without secrets or raw feedback overexposure, explicit local storage paths, baseline health check.  
**Dependencies:** Current MVP backend and API standards.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 1-2 weeks.  
**Definition of Done:** Upload, preview, analysis, CSV download, and PDF report generation work reliably with sample files and larger test files; errors are actionable; no secrets are printed.

## 6. Phase 3: Frontend

**Objective:** Align the Next.js frontend with the approved user journey and wireframes.  
**Deliverables:** Upload experience, data preview, feedback column selection, analysis execution, processing state, results view, theme/sentiment summaries, CSV/PDF download controls, responsive behaviour.  
**Dependencies:** Stable backend API, design system, wireframes.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** A user can complete the full upload-to-report flow from the browser; desktop is polished; tablet/mobile are usable; frontend handles backend errors gracefully.

## 7. Phase 4: AI Pipeline

**Objective:** Improve AI quality, reliability, and scalability while preserving frontend-compatible output.  
**Deliverables:** Multi-stage pipeline, batching, candidate theme extraction, canonical theme consolidation, response reassignment, sentiment, confidence scoring, executive insights, recommended actions, quality checks, retry policy.  
**Dependencies:** OpenAI API access, AI architecture, backend orchestration.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 2-4 weeks.  
**Definition of Done:** Sample and 200+ response files complete successfully; batch outputs merge correctly; partial failures are reported clearly; results include response-level and overall insights.

## 8. Phase 5: Database

**Objective:** Introduce persistence for SaaS workflows after local MVP validation.  
**Deliverables:** Data model for users, workspaces, projects, uploads, analyses, reports, jobs, usage, and audit events; migrations; local development database setup.  
**Dependencies:** Product roadmap Phase 2, authentication design, storage decisions.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 2-4 weeks.  
**Definition of Done:** Projects, analyses, and reports can be saved and retrieved; local file handling evolves into durable storage references; migrations are repeatable.

## 9. Phase 6: Authentication

**Objective:** Allow users to securely access workspaces.  
**Deliverables:** Signup, login, forgot password, session management, onboarding entry, protected routes, user profile foundation.  
**Dependencies:** Database, security roadmap, auth provider decision.  
**Estimated Difficulty:** Medium to High.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** Users can create accounts, log in, reset passwords, and access only permitted workspace resources.

## 10. Phase 7: Billing

**Objective:** Prepare commercial payment and invoicing workflows.  
**Deliverables:** Billing page, plan metadata, payment provider integration, invoice visibility, payment status handling.  
**Dependencies:** Authentication, workspace model, product pricing decisions.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** Workspace owners can view plan and billing state; payment events update account status safely; failed payment states are clear.

## 11. Phase 8: Subscriptions

**Objective:** Enforce plan-based access and usage boundaries.  
**Deliverables:** Subscription model, usage counters, plan limits, upgrade/downgrade states, usage page, backend enforcement.  
**Dependencies:** Billing, usage tracking, product packaging.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** Plan limits are visible and consistently enforced; users receive clear guidance before hitting limits.

## 12. Phase 9: Reports

**Objective:** Mature reporting into a professional management-report workflow.  
**Deliverables:** Reports library, report detail, report builder wizard, PDF preview, CSV/PDF download persistence, report metadata, section configuration.  
**Dependencies:** Current PDF generator, database, projects, design system.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 3-5 weeks.  
**Definition of Done:** Users can generate, preview, revisit, and download reports; report content matches approved sections and remains linked to source analysis.

## 13. Phase 10: Dashboard

**Objective:** Create an insight-first dashboard for returning users and action-first empty state for new users.  
**Deliverables:** Main dashboard, empty dashboard, recent analyses, recent reports, top themes, sentiment summary, next actions.  
**Dependencies:** Projects, reports, stored analyses.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** New users are guided to first analysis; returning users can quickly understand workspace activity and open recent work.

## 14. Phase 11: Projects

**Objective:** Organize survey analyses and reports by initiative.  
**Deliverables:** Projects list, project detail, project creation, project metadata, linked uploads, analyses, and reports.  
**Dependencies:** Database, auth, dashboard.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** Users can create projects, start analyses inside projects, and find related reports later.

## 15. Phase 12: Analysis Wizard

**Objective:** Formalize the guided analysis workflow.  
**Deliverables:** New Analysis, Upload Data, Data Preview, Configure Analysis, Processing, Results, Theme Review, Sentiment Review.  
**Dependencies:** Frontend, backend, AI pipeline, design system.  
**Estimated Difficulty:** Medium to High.  
**Estimated Duration:** 3-4 weeks.  
**Definition of Done:** The wizard validates each step, supports back navigation where safe, shows clear processing state, and preserves output compatibility.

## 16. Phase 13: AI Assistant

**Objective:** Add a contextual right-side AI Assistant drawer without making chat the primary experience.  
**Deliverables:** Assistant drawer, context-aware prompts, project/report Q&A, safe response boundaries, citations to source insights where possible.  
**Dependencies:** Stored analyses, reports, AI architecture, security review.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 3-5 weeks.  
**Definition of Done:** Users can ask contextual questions about current analysis or report; assistant does not expose data outside the current permission scope.

## 17. Phase 14: API

**Objective:** Standardize REST API design for current and future clients.  
**Deliverables:** Endpoint naming standards, versioning strategy, request/response patterns, error schema, OpenAPI documentation, validation, pagination/filtering/sorting conventions.  
**Dependencies:** API standards, backend phase.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 1-2 weeks.  
**Definition of Done:** Core endpoints follow documented conventions; OpenAPI docs are accurate; breaking changes are avoided or versioned.

## 18. Phase 15: Testing

**Objective:** Protect critical user and business flows.  
**Deliverables:** Backend unit tests, API integration tests, frontend smoke tests, file parsing tests, AI response schema tests, PDF generation tests, baseline sample-data tests.  
**Dependencies:** Stable backend/frontend architecture.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-4 weeks, then ongoing.  
**Definition of Done:** CI can verify upload, preview, analysis, downloads, and report generation with deterministic or mocked AI responses.

## 19. Phase 16: CI/CD

**Objective:** Automate quality gates and repeatable releases.  
**Deliverables:** Linting, formatting, type checks, tests, build checks, dependency audit, release workflow.  
**Dependencies:** Testing phase, deployment target.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 1-2 weeks.  
**Definition of Done:** Pull requests run automated checks; release builds are reproducible; failed checks block release.

## 20. Phase 17: Deployment

**Objective:** Move from local MVP to hosted environments.  
**Deliverables:** Development, staging, and production environments; environment variable management; build/deploy scripts; storage and database configuration.  
**Dependencies:** Database, auth, CI/CD, infrastructure decisions.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 3-5 weeks.  
**Definition of Done:** Staging and production deploys are repeatable; secrets are managed outside code; smoke tests pass after deploy.

## 21. Phase 18: Monitoring

**Objective:** Observe system health, job reliability, and AI usage.  
**Deliverables:** Application logs, error tracking, request metrics, job metrics, model usage, cost dashboards, alerting.  
**Dependencies:** Deployment, backend structured logging, job queue.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** 2-3 weeks.  
**Definition of Done:** Engineering can diagnose failed uploads, analysis errors, report failures, latency, and cost anomalies.

## 22. Phase 19: Performance

**Objective:** Improve speed and reliability for larger survey files and analytics views.  
**Deliverables:** File size limits, streaming or chunked processing decisions, background jobs, pagination, optimized tables, caching where safe.  
**Dependencies:** AI pipeline, database, monitoring.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 3-5 weeks.  
**Definition of Done:** Large supported files process within documented limits; UI remains responsive; performance regressions are measurable.

## 23. Phase 20: Security

**Objective:** Protect customer data, secrets, and workspace boundaries.  
**Deliverables:** Secret management, authorization, file scanning/validation, secure storage, audit events, secure logging, dependency review, security headers.  
**Dependencies:** Auth, database, deployment.  
**Estimated Difficulty:** High.  
**Estimated Duration:** Ongoing, with 2-4 week foundation.  
**Definition of Done:** No secrets in code or logs; users cannot access other workspaces; uploaded files are validated; security-critical events are auditable.

## 24. Phase 21: Documentation

**Objective:** Keep product, design, engineering, and operations documentation current.  
**Deliverables:** README, setup guides, API docs, architecture docs, design system, release notes, known issues, decisions log.  
**Dependencies:** All active development phases.  
**Estimated Difficulty:** Low to Medium.  
**Estimated Duration:** Ongoing.  
**Definition of Done:** New engineers and stakeholders can understand current architecture, run the app, and find product decisions without relying on undocumented knowledge.

## 25. Phase 22: Refactoring

**Objective:** Improve maintainability without changing user-facing behaviour unnecessarily.  
**Deliverables:** Modular backend services, clear frontend state boundaries, shared types where practical, removal of duplication, stronger error boundaries, prompt/schema organization.  
**Dependencies:** Test coverage.  
**Estimated Difficulty:** Medium.  
**Estimated Duration:** Ongoing, scheduled in focused cycles.  
**Definition of Done:** Refactors are covered by tests, preserve current contracts, reduce complexity, and improve readability.

## 26. Phase 23: Production Release

**Objective:** Launch a production-ready SaaS version of SurveyIQ.  
**Deliverables:** Production environment, auth, persistence, billing, core workflows, monitoring, support process, security review, release notes, rollback plan.  
**Dependencies:** Previous phases complete enough for public availability.  
**Estimated Difficulty:** High.  
**Estimated Duration:** 4-8 weeks after SaaS foundation completion.  
**Definition of Done:** The product can safely support real customer workspaces, paid usage, support diagnostics, and reliable upload-to-report workflows.

## 27. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)

## 28. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter document. |
| 0.2 | 2026-07-05 | Codex | Expanded into phase-based engineering roadmap with objectives, deliverables, dependencies, effort, duration, and definitions of done. |
