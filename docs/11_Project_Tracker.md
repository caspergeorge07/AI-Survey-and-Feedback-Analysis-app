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
4. Master Development Tracker
5. Frontend
6. Backend
7. AI
8. API
9. Authentication
10. Database
11. Payments
12. Reports
13. Dashboard
14. Projects
15. Analysis
16. AI Assistant
17. Testing
18. Deployment
19. Documentation
20. Future Features
21. Related Documents
22. Revision History

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

## 4. Master Development Tracker

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Upload and data preview | P0 | Done | MVP | pandas file parsing | M | Backend/Frontend | CSV/Excel upload returns columns, row count, first 10 rows, and clear errors. | [03_User_Journey.md](03_User_Journey.md), [09_API_Standards.md](09_API_Standards.md) | TBD | Functional, API, regression |
| Feedback column selection | P0 | Done | MVP | Upload preview | S | Frontend | User can select valid free-text column before analysis. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, functional |
| AI analysis pipeline | P0 | Done | MVP | OpenAI API, selected column | L | AI/Backend | Responses return theme, sentiment, confidence, and reason with overall summaries. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI schema, integration, regression |
| Batched analysis | P0 | Done | MVP | AI analysis pipeline | L | AI/Backend | Larger files split into batches, merge results, and handle partial failure clearly. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Large-file, integration |
| Analysed CSV download | P0 | Done | MVP | Analysis output | M | Backend | User can download response-level analysed CSV. | [09_API_Standards.md](09_API_Standards.md) | TBD | Functional, file download |
| PDF management report | P0 | Done | MVP | Analysis output, report generation | L | Backend | PDF includes executive summary, sentiment, themes, highlights, risks, actions, conclusions, and charts. | [04_Wireframes.md](04_Wireframes.md) | TBD | Report, visual QA |
| Documentation Version 1 | P0 | In Progress | Docs V1 | Approved docs 01-10 | M | Product/Engineering | Index, README, tracker, logs, test plan, and operational docs complete. | [INDEX.md](INDEX.md) | TBD | Documentation review |
| Projects and persistence | P1 | Planned | SaaS Foundation | Database, auth | L | Full Stack | Users can save and revisit projects, analyses, and reports. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Integration, regression |
| Authentication | P1 | Planned | SaaS Foundation | User model, auth provider decision | L | Backend/Frontend | Users can sign up, log in, reset password, and access protected routes. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Security, functional |
| Billing and subscriptions | P2 | Future | Commercial | Auth, workspace, pricing | L | Product/Engineering | Workspace owners can manage plan, billing, and usage limits. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, security |
| Enterprise governance | P3 | Future | Enterprise | Auth, roles, audit, storage | XL | Platform | SSO, governance, taxonomy, benchmarking, and advanced permissions are supported. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security, admin, integration |

## 5. Frontend

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Upload UI | P0 | Done | MVP | Backend upload endpoint | M | Frontend | Drag-and-drop and browse upload support CSV/Excel guidance. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, accessibility |
| Data preview UI | P0 | Done | MVP | Upload response | M | Frontend | First 10 rows and detected columns are visible. | [03_User_Journey.md](03_User_Journey.md) | TBD | UI regression |
| Analysis results UI | P0 | Done | MVP | Analysis endpoint | M | Frontend | Executive summary, counts, response data, and downloads are visible where supported. | [04_Wireframes.md](04_Wireframes.md) | TBD | Functional, regression |
| PDF download visibility | P1 | Planned | MVP Polish | Report URL from backend | S | Frontend | User can access generated PDF from the results/report flow. | [14_Known_Issues.md](14_Known_Issues.md) | TBD | UI, download |
| Responsive app shell | P1 | Planned | SaaS Foundation | Design system | L | Frontend | Left sidebar/top bar pattern works across desktop, tablet, and mobile. | [05_Design_System.md](05_Design_System.md) | TBD | Responsive, accessibility |

## 6. Backend

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| File parsing service | P0 | Done | MVP | pandas | M | Backend | CSV/Excel files parse safely and return preview metadata. | [09_API_Standards.md](09_API_Standards.md) | TBD | Unit, integration |
| Local file storage | P0 | Done | MVP | Workspace filesystem | M | Backend | Uploads, analysed CSVs, and reports are stored locally for MVP. | [12_Decision_Log.md](12_Decision_Log.md) | TBD | File safety |
| Analysis orchestration | P0 | Done | MVP | AI pipeline | L | Backend | Backend coordinates batch analysis, merge, output, CSV, and PDF. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Integration |
| Structured backend errors | P1 | Planned | Reliability | API standards | M | Backend | User-safe error messages and stable error codes are returned. | [09_API_Standards.md](09_API_Standards.md) | TBD | API, regression |

## 7. AI

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Multi-stage pipeline | P0 | Done | MVP | OpenAI API | L | AI Engineering | Stages cover response analysis, themes, consolidation, reassignment, sentiment, confidence, insights, and actions. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI evaluation |
| Canonical theme consolidation | P0 | Done | MVP | Candidate themes | L | AI Engineering | Similar themes merge into report-ready canonical themes. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Sample-data review |
| AI quality evaluation | P1 | Planned | Reliability | Test datasets | M | AI Engineering | Theme, sentiment, confidence, and summary outputs are assessed against sample cases. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | Evaluation |
| Prompt versioning | P1 | Planned | Reliability | Prompt registry decision | M | AI Engineering | Prompt changes are traceable and linked to evaluation results. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | Regression |

## 8. API

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| MVP API compatibility | P0 | Done | MVP | Existing frontend | M | Backend | Current upload, analyse, and download contracts remain stable. | [09_API_Standards.md](09_API_Standards.md) | TBD | API regression |
| API versioning | P1 | Planned | SaaS Foundation | Auth/persistence | M | Backend | Production APIs use versioned paths and documented schemas. | [09_API_Standards.md](09_API_Standards.md) | TBD | Contract tests |
| OpenAPI accuracy | P1 | Planned | SaaS Foundation | Typed schemas | M | Backend | OpenAPI docs match implemented endpoints. | [09_API_Standards.md](09_API_Standards.md) | TBD | Documentation, API |

## 9. Authentication

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Signup/login | P1 | Planned | SaaS Foundation | Database, auth decision | L | Full Stack | Users can create accounts and access protected app pages. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Security, UI |
| Password recovery | P1 | Planned | SaaS Foundation | Email/provider | M | Full Stack | Users can request a reset safely without account enumeration. | [09_API_Standards.md](09_API_Standards.md) | TBD | Security |
| SSO | P3 | Future | Enterprise | Enterprise auth | XL | Platform | Enterprise workspaces can configure SAML/OIDC. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security, integration |

## 10. Database

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Core data model | P1 | Planned | SaaS Foundation | Product data model | L | Backend | Users, workspaces, projects, uploads, analyses, reports, jobs, and usage are modeled. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Migration, integration |
| Migrations | P1 | Planned | SaaS Foundation | Database selection | M | Backend | Schema changes are versioned and repeatable. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Migration |
| Audit events | P2 | Future | Admin | Auth, database | M | Platform | Important actions are recorded for admin and security review. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security |

## 11. Payments

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Billing page | P2 | Future | Commercial | Auth, workspace, pricing | M | Full Stack | Owners can view plan, invoices, and payment state. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, UI |
| Subscription enforcement | P2 | Future | Commercial | Usage tracking | L | Backend | Plan limits are visible and enforced consistently. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Payment, API |

## 12. Reports

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| PDF report generation | P0 | Done | MVP | Analysis output | L | Backend | Professional PDF includes required management sections and charts. | [04_Wireframes.md](04_Wireframes.md) | TBD | Report QA |
| Reports library | P1 | Planned | SaaS Foundation | Database, projects | L | Full Stack | Users can revisit generated reports. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Functional |
| Report builder | P2 | Planned | Reporting | Reports library | L | Frontend/Backend | Users can configure report sections before export. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, report |

## 13. Dashboard

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Empty dashboard | P1 | Planned | SaaS Foundation | App shell | M | Frontend | New users see action-first dashboard and first-analysis CTA. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI |
| Returning dashboard | P1 | Planned | SaaS Foundation | Stored analyses/reports | L | Frontend | Returning users see recent work, top themes, and sentiment summaries. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, integration |

## 14. Projects

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Projects list | P1 | Planned | SaaS Foundation | Database, auth | M | Full Stack | Users can list, create, and open projects. | [02_Application_Sitemap.md](02_Application_Sitemap.md) | TBD | Functional |
| Project detail | P1 | Planned | SaaS Foundation | Projects list | L | Full Stack | Project pages show analyses, uploads, reports, and context. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, integration |

## 15. Analysis

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Analysis wizard | P1 | Planned | UX Foundation | Existing MVP flow | L | Frontend | Workflow is step-by-step from upload through results. | [03_User_Journey.md](03_User_Journey.md) | TBD | UI, regression |
| Theme review | P2 | Planned | Insight Quality | Analysis output | L | Frontend/AI | Users can inspect themes in card-based review. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI, AI review |
| Sentiment review | P2 | Planned | Insight Quality | Analysis output | M | Frontend/AI | Users can inspect sentiment distribution and examples. | [04_Wireframes.md](04_Wireframes.md) | TBD | UI |

## 16. AI Assistant

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Assistant drawer | P2 | Future | Assistant | Stored analysis context | L | Full Stack/AI | Assistant opens as right-side drawer and answers within current context. | [04_Wireframes.md](04_Wireframes.md) | TBD | AI, security, UI |
| Prompt suggestions | P2 | Future | Assistant | Assistant drawer | M | AI/Product | Users can ask common questions about themes, sentiment, risks, and actions. | [08_AI_Architecture.md](08_AI_Architecture.md) | TBD | AI evaluation |

## 17. Testing

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| MVP regression suite | P0 | Planned | Quality | Stable MVP endpoints | M | QA/Engineering | Upload, preview, analysis, CSV, and PDF flows are covered. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | Regression |
| AI evaluation suite | P1 | Planned | Quality | Sample data | L | AI Engineering | AI outputs are evaluated against expected quality criteria. | [16_Test_Plan.md](16_Test_Plan.md) | TBD | AI evaluation |
| Accessibility testing | P1 | Planned | Quality | Frontend polish | M | Frontend/QA | Core workflows meet WCAG 2.2 AA target. | [05_Design_System.md](05_Design_System.md) | TBD | Accessibility |

## 18. Deployment

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Local developer environment | P0 | Done | MVP | README | S | Engineering | Backend and frontend run locally with documented commands. | [README.md](README.md) | TBD | Smoke |
| Staging environment | P1 | Planned | SaaS Foundation | CI/CD, database, auth | L | Platform | Staging deploys repeatably with separate secrets. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Smoke, integration |
| Production environment | P1 | Future | Production | Staging hardening | XL | Platform | Production is monitored, secured, and release-ready. | [07_Development_Roadmap.md](07_Development_Roadmap.md) | TBD | Release testing |

## 19. Documentation

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Documentation index | P0 | In Progress | Docs V1 | Docs 01-16 | S | Product/Engineering | `INDEX.md` describes every document and navigation path. | [INDEX.md](INDEX.md) | TBD | Documentation review |
| Documentation README | P0 | In Progress | Docs V1 | Documentation strategy | S | Product/Engineering | `README.md` explains hierarchy, naming, versioning, and contribution rules. | [README.md](README.md) | TBD | Documentation review |
| Operational logs | P0 | In Progress | Docs V1 | Existing changelog/decisions/issues/release notes | M | Product/Engineering | Decision, changelog, known issues, and release notes are expanded and renamed. | [12_Decision_Log.md](12_Decision_Log.md) | TBD | Documentation review |

## 20. Future Features

| Feature Name | Priority | Status | Sprint | Dependencies | Estimated Effort | Owner | Definition of Done | Related Documentation | Related GitHub Issue | Testing Required |
|---|---|---|---|---|---|---|---|---|---|---|
| Data sources | P2 | Future | Integrations | Auth, projects | L | Full Stack | Users can connect supported external data sources. | [06_Product_Roadmap.md](06_Product_Roadmap.md) | TBD | Integration |
| Custom taxonomy | P3 | Future | Enterprise | Theme review, admin | XL | AI/Platform | Enterprise users can define approved theme taxonomies. | [04_Wireframes.md](04_Wireframes.md) | TBD | AI, security |
| Benchmarking | P3 | Future | Enterprise | Historical data | XL | Product/AI | Users can compare results against historical or industry benchmarks. | [04_Wireframes.md](04_Wireframes.md) | TBD | Data, AI |
| Advanced permissions | P3 | Future | Enterprise | Auth, roles, audit | XL | Platform | Granular access controls are available for enterprise workspaces. | [04_Wireframes.md](04_Wireframes.md) | TBD | Security |

## 21. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [16_Test_Plan.md](16_Test_Plan.md)

## 22. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-05 | Codex | Created Version 1 engineering project tracker for SurveyIQ documentation library. |
