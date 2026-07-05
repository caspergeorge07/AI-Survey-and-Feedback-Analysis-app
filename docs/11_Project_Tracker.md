# SurveyIQ Project Tracker

**Version:** 1.0  
**Status:** Draft  
**Owner:** Engineering Program Management  
**Last Updated:** 2026-07-05

## Purpose

This document is the master engineering project tracker for SurveyIQ. It provides a structured view of major product and platform work across frontend, backend, AI, API, authentication, database, payments, reports, dashboard, projects, analysis, AI Assistant, testing, deployment, documentation, and future features.

The tracker is intended for planning and delivery coordination. It does not replace issue tracking, sprint planning, or release notes, but it gives the team a single documentation-level view of scope, priority, dependencies, ownership, and readiness.

## Table of Contents

1. Project Summary
2. Status Definitions
3. Priority Definitions
4. Agreed Sprint Plan
5. Master Development Tracker
6. Frontend
7. Backend
8. AI
9. API
10. Authentication
11. Database
12. Payments
13. Reports
14. Dashboard
15. Projects
16. Analysis
17. AI Assistant
18. Testing
19. Deployment
20. Documentation
21. Future Features
22. Related Documents
23. Revision History

## 1. Project Summary

SurveyIQ is an AI-powered survey and qualitative feedback intelligence platform that transforms free-text survey responses into executive-ready business insights.

Current baseline:

- Local MVP exists.
- Users can upload CSV/Excel files.
- Users can preview rows and select a feedback column.
- Backend can analyse responses with OpenAI.
- Analysis supports batching and canonical theme consolidation.
- Outputs include response-level analysis, theme counts, sentiment counts, analysed CSV, and PDF management report generation.
- Documentation is moving to Version 1.

Current product boundary:

- Authentication, database persistence, billing, subscriptions, teams, and enterprise governance are roadmap items, not current MVP features.

## 2. Status Definitions

| Status | Meaning |
|---|---|
| Not Started | Work has not begun. |
| Planned | Scope is documented and ready for sprint planning. |
| In Progress | Work is actively being implemented. |
| Blocked | Work cannot proceed without a decision, dependency, or external input. |
| In Review | Implementation exists and is under review or validation. |
| Done | Meets definition of done and is documented. |
| Future | Not scheduled for current delivery cycle. |

## 3. Priority Definitions

| Priority | Meaning |
|---|---|
| P0 | Critical for MVP or production readiness. |
| P1 | Important for near-term SaaS foundation. |
| P2 | Valuable after core flows are stable. |
| P3 | Future or enterprise enhancement. |

## 4. Agreed Sprint Plan

This is the agreed sprint plan for the current SurveyIQ delivery sequence. It captures completed work and the exact upcoming sprint order. Do not add extra sprints to this sequence without an approved roadmap update.

### Completed Sprints

| Sprint | Scope | Status |
|---|---|---|
| Sprint 1 | Project setup and initial MVP | Completed |
| Sprint 2 | Upload, preview, and feedback column selection | Completed |
| Sprint 3 | OpenAI analysis and CSV export | Completed |
| Sprint 4 | Multi-stage AI analysis pipeline | Completed |
| Sprint 5 | Dataset-level feedback intelligence, including column profiling, multiple qualitative columns, quantitative summaries, segment detection, cross-analysis, enhanced executive summary, PDF report updates, and mixed survey test dataset | Completed |
| Sprint 6 | Frontend foundation and application shell | Completed |
| Sprint 7 | Dataset Intelligence Upload Wizard exposing upload, dataset profile, column intelligence, analysis options, review, processing, and results | Completed |
| Sprint 8 | Executive dashboard with KPI cards, recent analyses, recent reports, theme and sentiment visualisations, recommended actions, activity feed, and quick actions | Completed |
| Sprint 9 | Live Executive Dashboard Integration replacing mock dashboard data with latest completed analysis output | Completed |
| Sprint 10 | Project and Workspace Management with local project persistence, project cards, create modal, project detail tabs, project assignment, and project-linked analyses/reports | Completed |

### Upcoming Sprints

| Sprint | Objective | Key Deliverables | Dependencies | Definition of Done | Testing Required |
|---|---|---|---|---|---|
| Sprint 11: AI Assistant interface | Introduce the AI Assistant as a contextual right-side drawer. | Assistant drawer, prompt input, prompt suggestions, context display, loading/error states. | Sprint 6, Sprint 9 context, AI architecture. | Users can open, use, and close the drawer without disrupting core workflows. | Drawer interaction tests, focus/keyboard tests, context-boundary review. |
| Sprint 12: Authentication and user accounts | Add user account access for SaaS foundation. | Signup, login, forgot password, sessions, protected routes, profile foundation. | Auth provider decision, security standards, app shell. | Users can create accounts, log in, recover access, and reach protected app pages. | Auth functional tests, protected route tests, security review. |
| Sprint 13: Database and persistent projects | Persist projects, uploads, analyses, and reports. | Database schema, migrations, project records, analysis records, report metadata. | Sprint 12, database decision, storage strategy. | Users can reopen projects, analyses, and reports across sessions. | Migration tests, CRUD tests, persistence regression, authorization checks. |
| Sprint 14: Team workspaces and permissions | Add workspace collaboration foundations. | Workspace model, member list, invites, basic roles, permission checks, workspace settings foundation. | Sprint 12, Sprint 13, security standards. | Workspace owners can invite members and basic permissions are enforced. | Invite tests, role tests, workspace isolation tests, access-denied tests. |
| Sprint 15: Billing, subscriptions, and private beta preparation | Prepare for controlled private beta and commercial foundations. | Billing page, subscription model, plan/usage display, payment provider integration, beta readiness checklist. | Sprint 12, Sprint 13, Sprint 14, pricing decisions. | Private beta can run with accounts, persisted work, workspaces, and initial billing/subscription infrastructure. | Billing sandbox tests, subscription tests, usage-limit tests, private beta smoke regression. |

## 5. Master Development Tracker

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Upload and data preview | P0 | Done | MVP | pandas file parsing | M | Backend/Frontend | CSV/Excel upload returns columns, row count, first 10 rows, and clear errors. | [03_User_Journey.md](03_User_Journey.md), [09_API_Standards.md](09_API_Standards.md) | TBD | Functional, API, regression |
| Feedback column selection | P0 | Done | MVP | Upload preview | S | Frontend | User can select valid free-text column before analysis. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, functional |
| AI analysis pipeline | P0 | Done | MVP | OpenAI API, selected column | L | AI/Backend | Responses return theme, sentiment, confidence, and reason with overall summaries. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI schema, integration, regression |
| Batched analysis | P0 | Done | MVP | AI analysis pipeline | L | AI/Backend | Larger files split into batches, merge results, and handle partial failure clearly. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Large-file, integration |
| Analysed CSV download | P0 | Done | MVP | Analysis output | M | Backend | User can download response-level analysed CSV. | [09_API_Standards.md](09_API_Standards.md) | TBD | Functional, file download |
| PDF management report | P0 | Done | MVP | Analysis output, report generation | L | Backend | PDF includes executive summary, sentiment, themes, highlights, risks, actions, conclusions, and charts. | [04_Wireframes.md](04_Wireframes.md) | TBD | Report, visual QA |
| Dataset-level feedback intelligence | P1 | Done | MVP Expansion | Existing upload and analysis workflow | L | Backend/AI | Backend profiles all columns, supports multi-column qualitative analysis, summarizes ratings, detects segments, and returns cross-analysis fields without breaking old workflow. | [08_AI_Architecture.md](08_AI_Architecture.md), [09_API_Standards.md](09_API_Standards.md) | TBD | API, AI, regression, report |
| Local project workspace | P1 | Done | Sprint 10 | App shell, latest-analysis state, localStorage | L | Frontend | Users can create, search, filter, sort, open, archive, duplicate, and delete local projects; completed analyses can be assigned to projects without backend persistence. | [04_Wireframes.md](04_Wireframes.md), [16_Test_Plan.md](16_Test_Plan.md) | TBD | Frontend build, UI smoke, responsive, MVP regression |
| Documentation Version 1 | P0 | In Progress | Docs V1 | Approved docs 01-10 | M | Product/Engineering | Index, README, tracker, logs, test plan, and operational docs complete. | [INDEX.md](INDEX.md) | TBD | Documentation review |
| Projects and persistence | P1 | Planned | SaaS Foundation | Database, auth | L | Full Stack | Users can save and revisit projects, analyses, and reports. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Integration, regression |
| Authentication | P1 | Planned | SaaS Foundation | User model, auth provider decision | L | Backend/Frontend | Users can sign up, log in, reset password, and access protected routes. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Security, functional |
| Billing and subscriptions | P2 | Future | Commercial | Auth, workspace, pricing | L | Product/Engineering | Workspace owners can manage plan, billing, and usage limits. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, security |
| Enterprise governance | P3 | Future | Enterprise | Auth, roles, audit, storage | XL | Platform | SSO, governance, taxonomy, benchmarking, and advanced permissions are supported. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security, admin, integration |

## 6. Frontend

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Upload UI | P0 | Done | MVP | Backend upload endpoint | M | Frontend | Drag-and-drop and browse upload support CSV/Excel guidance. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, accessibility |
| Data preview UI | P0 | Done | MVP | Upload response | M | Frontend | First 10 rows and detected columns are visible. | [03_User_Journey.md](03_User_Journey.md) | TBD | UI regression |
| Analysis results UI | P0 | Done | MVP | Analysis endpoint | M | Frontend | Executive summary, counts, response data, and downloads are visible where supported. | [04_Wireframes.md](04_Wireframes.md) | TBD | Functional, regression |
| PDF download visibility | P1 | Done | Sprint 6 | Report URL from backend | S | Frontend | User can access generated PDF from the results/report flow. | [14_Known_Issues.md](14_Known_Issues.md) | TBD | UI, download |
| Responsive app shell | P1 | Done | Sprint 6 | Design system | L | Frontend | Left sidebar/top bar pattern works across desktop, tablet, and mobile. | [05_Design_System.md](05_Design_System.md) | TBD | Responsive, accessibility |
| Dataset Intelligence Upload Wizard | P1 | Done | Sprint 7 | App shell, upload/analyse APIs, backend column profiles | L | Frontend | Users can move through upload, dataset profile, column intelligence, analysis options, review, processing, and results without backend behaviour changes. | [03_User_Journey.md](03_User_Journey.md), [04_Wireframes.md](04_Wireframes.md), [05_Design_System.md](05_Design_System.md) | TBD | Frontend build, wizard regression, API compatibility, responsive checks |
| Executive Dashboard | P1 | Done | Sprint 9 | App shell, dashboard wireframes, latest completed analysis state | M | Frontend | Dashboard is the primary landing experience and shows latest-analysis KPIs, recent analysis, recent reports, top themes, sentiment, recommended actions, recent activity, and quick actions using live analysis output from the current session. | [04_Wireframes.md](04_Wireframes.md), [05_Design_System.md](05_Design_System.md) | TBD | Frontend build, UI smoke, responsive checks, MVP regression, CSV/PDF download regression |
| Project Management Module | P1 | Done | Sprint 10 | App shell, local workspace state | L | Frontend | Projects page, create modal, project cards, search, filters, sorting, responsive layout, project statistics, and project detail tabs are available without backend changes. | [04_Wireframes.md](04_Wireframes.md), [16_Test_Plan.md](16_Test_Plan.md) | TBD | Frontend build, UI smoke, responsive checks, localStorage checks |

## 7. Backend

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| File parsing service | P0 | Done | MVP | pandas | M | Backend | CSV/Excel files parse safely and return preview metadata. | [09_API_Standards.md](09_API_Standards.md) | TBD | Unit, integration |
| Local file storage | P0 | Done | MVP | Workspace filesystem | M | Backend | Uploads, analysed CSVs, and reports are stored locally for MVP. | [12_Decision_Log.md](12_Decision_Log.md) | TBD | File safety |
| Analysis orchestration | P0 | Done | MVP | AI pipeline | L | Backend | Backend coordinates batch analysis, merge, output, CSV, and PDF. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Integration |
| Structured backend errors | P1 | Planned | Reliability | API standards | M | Backend | User-safe error messages and stable error codes are returned. | [09_API_Standards.md](09_API_Standards.md) | TBD | API, regression |
| Column profiling | P1 | Done | MVP Expansion | pandas parsing | M | Backend | Every uploaded column returns inferred type, counts, sample values, and suggested role. | [09_API_Standards.md](09_API_Standards.md) | TBD | API, functional |

## 8. AI

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Multi-stage pipeline | P0 | Done | MVP | OpenAI API | L | AI Engineering | Stages cover response analysis, themes, consolidation, reassignment, sentiment, confidence, insights, and actions. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI evaluation |
| Canonical theme consolidation | P0 | Done | MVP | Candidate themes | L | AI Engineering | Similar themes merge into report-ready canonical themes. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Sample-data review |
| AI quality evaluation | P1 | Planned | Reliability | Test datasets | M | AI Engineering | Theme, sentiment, confidence, and summary outputs are assessed against sample cases. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | Evaluation |
| Prompt versioning | P1 | Planned | Reliability | Prompt registry decision | M | AI Engineering | Prompt changes are traceable and linked to evaluation results. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Regression |
| Multi-column qualitative analysis | P1 | Done | MVP Expansion | Existing AI pipeline | M | AI/Backend | One or more feedback columns can be analysed while preserving source row and source column. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI, CSV export |

## 9. API

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| MVP API compatibility | P0 | Done | MVP | Existing frontend | M | Backend | Current upload, analyse, and download contracts remain stable. | [09_API_Standards.md](09_API_Standards.md) | TBD | API regression |
| API versioning | P1 | Planned | SaaS Foundation | Auth/persistence | M | Backend | Production APIs use versioned paths and documented schemas. | [09_API_Standards.md](09_API_Standards.md) | TBD | Contract tests |
| OpenAPI accuracy | P1 | Planned | SaaS Foundation | Typed schemas | M | Backend | OpenAPI docs match implemented endpoints. | [09_API_Standards.md](09_API_Standards.md) | TBD | Documentation, API |
| Additive dataset analysis fields | P1 | Done | MVP Expansion | Column profiling, analysis output | M | Backend | Analysis response includes column profiles, selected feedback columns, quantitative summary, segment summary, cross-analysis, and enhanced executive summary. | [09_API_Standards.md](09_API_Standards.md) | TBD | Contract tests |

## 10. Authentication

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Signup/login | P1 | Planned | SaaS Foundation | Database, auth decision | L | Full Stack | Users can create accounts and access protected app pages. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Security, UI |
| Password recovery | P1 | Planned | SaaS Foundation | Email/provider | M | Full Stack | Users can request a reset safely without account enumeration. | [09_API_Standards.md](09_API_Standards.md) | TBD | Security |
| SSO | P3 | Future | Enterprise | Enterprise auth | XL | Platform | Enterprise workspaces can configure SAML/OIDC. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security, integration |

## 11. Database

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Core data model | P1 | Planned | SaaS Foundation | Product data model | L | Backend | Users, workspaces, projects, uploads, analyses, reports, jobs, and usage are modeled. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Migration, integration |
| Migrations | P1 | Planned | SaaS Foundation | Database selection | M | Backend | Schema changes are versioned and repeatable. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Migration |
| Audit events | P2 | Future | Admin | Auth, database | M | Platform | Important actions are recorded for admin and security review. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security |

## 12. Payments

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Billing page | P2 | Future | Commercial | Auth, workspace, pricing | M | Full Stack | Owners can view plan, invoices, and payment state. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, UI |
| Subscription enforcement | P2 | Future | Commercial | Usage tracking | L | Backend | Plan limits are visible and enforced consistently. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, API |

## 13. Reports

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| PDF report generation | P0 | Done | MVP | Analysis output | L | Backend | Professional PDF includes required management sections and charts. | [04_Wireframes.md](04_Wireframes.md) | TBD | Report QA |
| Reports library | P1 | Planned | SaaS Foundation | Database, projects | L | Full Stack | Users can revisit generated reports. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Functional |
| Report builder | P2 | Planned | Reporting | Reports library | L | Frontend/Backend | Users can configure report sections before export. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, report |
| Dataset report sections | P1 | Done | MVP Expansion | Dataset intelligence output | M | Backend | PDF includes dataset overview, column profiles, quantitative summary, segment insights, and cross-analysis sections only when relevant. | [04_Wireframes.md](04_Wireframes.md) | TBD | PDF QA |

## 14. Dashboard

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Empty dashboard | P1 | Planned | SaaS Foundation | App shell | M | Frontend | New users see action-first dashboard and first-analysis CTA when persistence exists. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI |
| Returning dashboard | P1 | Done | Sprint 9 | Sprint 6 shell, Sprint 7 wizard, latest analysis state | L | Frontend | Dashboard reflects the most recent completed local analysis with response counts, theme counts, sentiment distribution, confidence summary, recommended actions, CSV/PDF links, and recent activity while preserving the analysis wizard. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, responsive, regression, latest-analysis state regression |

## 15. Projects

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Projects list | P1 | Done | Sprint 10 | Local workspace state | M | Frontend | Users can list, create, search, filter, sort, and open local projects. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Functional, responsive |
| Project detail | P1 | Done | Sprint 10 | Projects list, local workspace state | L | Frontend | Project detail tabs show overview, analyses, reports, activity, and settings using local project records. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, integration |

## 16. Analysis

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Analysis wizard | P1 | Done | Sprint 7 | Existing MVP flow, dataset intelligence fields | L | Frontend | Workflow is step-by-step from upload through results and exposes dataset profiling, column intelligence, analysis options, review, processing, and results. | [03_User_Journey.md](03_User_Journey.md) | TBD | UI, regression |
| Theme review | P2 | Planned | Insight Quality | Analysis output | L | Frontend/AI | Users can inspect themes in card-based review. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, AI review |
| Sentiment review | P2 | Planned | Insight Quality | Analysis output | M | Frontend/AI | Users can inspect sentiment distribution and examples. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI |
| Lightweight cross-analysis | P1 | Done | MVP Expansion | Segment and rating detection | M | Backend | Backend returns sentiment by segment, themes by segment, average ratings by segment, and notable difference highlights. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Functional, regression |

## 17. AI Assistant

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Assistant drawer | P2 | Future | Assistant | Stored analysis context | L | Full Stack/AI | Assistant opens as right-side drawer and answers within current context. | [04_Wireframes.md](04_Wireframes.md) | TBD | AI, security, UI |
| Prompt suggestions | P2 | Future | Assistant | Assistant drawer | M | AI/Product | Users can ask common questions about themes, sentiment, risks, and actions. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI evaluation |

## 18. Testing

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| MVP regression suite | P0 | Planned | Quality | Stable MVP endpoints | M | QA/Engineering | Upload, preview, analysis, CSV, and PDF flows are covered. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | Regression |
| Mixed dataset regression | P1 | Done | MVP Expansion | Mixed 100-row sample data | M | QA/Engineering | Tests cover multiple qualitative columns, ratings, segments, date column, cross-analysis, CSV export, and PDF generation. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | API, AI, report |
| AI evaluation suite | P1 | Planned | Quality | Sample data | L | AI Engineering | AI outputs are evaluated against expected quality criteria. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | AI evaluation |
| Accessibility testing | P1 | Planned | Quality | Frontend polish | M | Frontend/QA | Core workflows meet WCAG 2.2 AA target. | [05_Design_System.md](05_Design_System.md) | TBD | Accessibility |

## 19. Deployment

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Local developer environment | P0 | Done | MVP | README | S | Engineering | Backend and frontend run locally with documented commands. | [README.md](README.md) | TBD | Smoke |
| Staging environment | P1 | Planned | SaaS Foundation | CI/CD, database, auth | L | Platform | Staging deploys repeatably with separate secrets. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Smoke, integration |
| Production environment | P1 | Future | Production | Staging hardening | XL | Platform | Production is monitored, secured, and release-ready. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Release testing |

## 20. Documentation

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Documentation index | P0 | In Progress | Docs V1 | Docs 01-16 | S | Product/Engineering | `INDEX.md` describes every document and navigation path. | [INDEX.md](INDEX.md) | TBD | Documentation review |
| Documentation README | P0 | In Progress | Docs V1 | Documentation strategy | S | Product/Engineering | `README.md` explains hierarchy, naming, versioning, and contribution rules. | [README.md](README.md) | TBD | Documentation review |
| Operational logs | P0 | In Progress | Docs V1 | Existing changelog/decisions/issues/release notes | M | Product/Engineering | Decision, changelog, known issues, and release notes are expanded and renamed. | [12_Decision_Log.md](12_Decision_Log.md) | TBD | Documentation review |

## 21. Future Features

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Data sources | P2 | Future | Integrations | Auth, projects | L | Full Stack | Users can connect supported external data sources. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Integration |
| Custom taxonomy | P3 | Future | Enterprise | Theme review, admin | XL | AI/Platform | Enterprise users can define approved theme taxonomies. | [04_Wireframes.md](04_Wireframes.md) | TBD | AI, security |
| Benchmarking | P3 | Future | Enterprise | Historical data | XL | Product/AI | Users can compare results against historical or industry benchmarks. | [04_Wireframes.md](04_Wireframes.md) | TBD | Data, AI |
| Advanced permissions | P3 | Future | Enterprise | Auth, roles, audit | XL | Platform | Granular access controls are available for enterprise workspaces. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security |

## 22. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [16_Test_Plan.md](16_Test_Plan.md)

## 23. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-05 | Codex | Created Version 1 engineering project tracker for SurveyIQ documentation library. |
| 1.1 | 2026-07-05 | Codex | Added agreed Sprint 1-15 plan with completed sprint history and upcoming sprint delivery details. |
| 1.2 | 2026-07-05 | Codex | Recorded Sprint 7 Dataset Intelligence Upload Wizard completion and updated tracker statuses. |
| 1.3 | 2026-07-05 | Codex | Recorded Sprint 8 Executive Dashboard completion and updated frontend/dashboard tracker statuses. |
| 1.4 | 2026-07-05 | Codex | Recorded Sprint 9 Live Executive Dashboard Integration and updated dashboard tracker statuses. |
| 1.5 | 2026-07-05 | Codex | Recorded Sprint 10 Project and Workspace Management completion and local persistence scope. |
