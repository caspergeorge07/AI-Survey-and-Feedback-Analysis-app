# SurveyIQ Product Roadmap

**Version:** 0.2  
**Status:** Draft  
**Owner:** Product Management  
**Last Updated:** 2026-07-05

## Purpose

This document defines the SurveyIQ product roadmap. It separates the current local MVP from future SaaS, reporting, collaboration, integration, admin, security, infrastructure, and enterprise capabilities. It should guide prioritization without contradicting the approved product vision, sitemap, user journey, or wireframes.

SurveyIQ's product direction is to become an AI-powered survey and qualitative feedback intelligence platform that turns free-text survey responses into executive-ready business insights.

## Table of Contents

1. Vision
2. Product Goals
3. Business Goals
4. Roadmap Principles
5. MVP Scope
6. Quarterly Roadmap
7. Phase 2
8. Phase 3
9. Enterprise Roadmap
10. Future AI Features
11. Reporting Roadmap
12. Collaboration Roadmap
13. Integrations Roadmap
14. Admin Roadmap
15. Security Roadmap
16. Infrastructure Roadmap
17. Technical Debt Plan
18. Success Metrics
19. KPIs
20. Release Strategy
21. Versioning Strategy
22. Related Documents
23. Revision History

## 1. Vision

SurveyIQ will help organizations understand what people are saying, why it matters, and what leaders should do next. The long-term product vision is a commercial SaaS platform for qualitative feedback intelligence across customer experience, employee feedback, product research, market research, and operations.

The core experience remains the upload-to-insight journey:

1. Upload CSV or Excel survey data.
2. Preview and select the free-text feedback column.
3. Run AI analysis.
4. Review themes, sentiment, risks, and recommended actions.
5. Export analysed CSV and executive-ready PDF reports.

## 2. Product Goals

- Deliver reliable AI analysis of free-text survey responses.
- Produce management-ready summaries, risks, recommendations, and conclusions.
- Preserve CSV export for auditability and spreadsheet workflows.
- Make PDF reports credible enough for leadership review.
- Keep the MVP focused while building toward a full SaaS platform.
- Support larger files safely through batching, validation, and clear failure recovery.
- Maintain user trust through transparency, confidence scores, and evidence.

## 3. Business Goals

- Validate demand for AI-assisted qualitative feedback analysis.
- Reduce time from raw survey export to usable management report.
- Establish SurveyIQ as a clear, professional alternative to manual spreadsheet coding.
- Create a path from local MVP to paid SaaS without adding commercial complexity too early.
- Build foundations for future team, workspace, billing, admin, and enterprise capabilities.

## 4. Roadmap Principles

- Preserve the working MVP and current API compatibility where possible.
- Improve insight quality before adding commercial packaging.
- Add SaaS capabilities only after the upload, analysis, and reporting workflow is dependable.
- Avoid authentication, billing, teams, and enterprise features in the MVP unless explicitly scheduled.
- Treat executive report quality as a primary product differentiator.
- Keep AI explainability visible through reasons, confidence, and response-level evidence.

## 5. MVP Scope

### In Scope

- CSV and Excel upload.
- First 10-row preview.
- Detected column names.
- Feedback column selection.
- OpenAI-powered multi-stage analysis.
- Batching for larger files.
- Canonical theme consolidation.
- Sentiment classification.
- Confidence scores and short reasons.
- Overall theme and sentiment counts.
- Executive insights, risks, recommended actions, and conclusions.
- Analysed CSV download.
- PDF management report generation.
- Local file handling.
- Setup and troubleshooting documentation.

### Explicitly Out of Current MVP Scope

- Authentication.
- Payment.
- Subscriptions.
- Database persistence.
- Team collaboration.
- Enterprise governance.
- SSO.
- Advanced permissions.
- Production hosting complexity.

## 6. Quarterly Roadmap

Dates should be confirmed by the product and engineering team. The sequencing below is the recommended planning order.

### Q1: MVP Stabilization and Insight Quality

Objectives:

- Preserve the current upload, preview, analysis, CSV, and PDF flows.
- Improve confidence in AI outputs.
- Make local setup and troubleshooting dependable.

Candidate outcomes:

- Baseline regression checks for upload-to-report flow.
- Better analysis failure messages.
- Improved response-level and overall insight quality.
- Clear PDF download path in the product experience.
- Documented limits for file size and response count.

### Q2: SaaS Foundation

Objectives:

- Prepare SurveyIQ for multi-user usage without overbuilding enterprise workflows.
- Introduce durable projects and reports.

Candidate outcomes:

- Authentication and onboarding.
- Workspace model.
- Projects list and project detail.
- Reports library and report detail.
- Basic persistent storage.
- Usage tracking foundation.

### Q3: Collaboration and Reporting Expansion

Objectives:

- Make SurveyIQ useful for teams and repeat reporting.
- Improve review workflows.

Candidate outcomes:

- Members and roles.
- Report builder enhancements.
- Theme review and sentiment review improvements.
- Report templates.
- Notification preferences.
- Initial dashboard trends.

### Q4: Commercial and Enterprise Readiness

Objectives:

- Prepare for paid teams and larger customers.
- Add operational visibility and governance foundations.

Candidate outcomes:

- Billing and subscription management.
- Admin overview.
- Model usage tracking.
- Audit log foundation.
- Security documentation and trust-center content.
- Enterprise discovery for SSO, data governance, and custom taxonomy.

## 7. Phase 2

Phase 2 focuses on turning the MVP into a reliable SaaS-ready product foundation.

Priorities:

- Authentication and onboarding.
- Workspace and project persistence.
- Saved analyses and reports.
- Reports library.
- More robust processing states.
- Better large-file guardrails.
- Basic usage visibility.
- Frontend polish based on the approved wireframes.

Success criteria:

- A returning user can find previous projects, analyses, and reports.
- A new user can reach first report with minimal guidance.
- Reports can be regenerated or downloaded later.
- Analysis failures are recoverable and understandable.

## 8. Phase 3

Phase 3 focuses on team workflows, richer dashboards, and commercial readiness.

Priorities:

- Team member invites and roles.
- Dashboard summaries across projects.
- Theme and sentiment review workflows.
- Report builder controls.
- Billing and subscriptions.
- Integrations discovery and first connector implementation.
- Internal admin tooling.

Success criteria:

- Teams can collaborate around projects and reports.
- Managers can understand trends without opening every analysis.
- Paid-plan boundaries are understandable.
- Internal support can diagnose tenant and job issues.

## 9. Enterprise Roadmap

Enterprise capabilities are future-facing and should not be introduced before the core SaaS product is stable.

Future enterprise areas:

- Enterprise overview.
- SSO configuration.
- Data governance and retention controls.
- Custom taxonomy.
- Benchmarking.
- Advanced permissions.
- Audit log exports.
- Security and procurement documentation.

Enterprise success criteria:

- IT teams can evaluate access, data handling, and governance.
- Research leaders can standardize theme taxonomies.
- Large organizations can enforce permissions and retention requirements.

## 10. Future AI Features

Future AI features should improve analysis quality, trust, and productivity rather than adding novelty.

Candidate roadmap:

- Better candidate theme generation and consolidation.
- Low-confidence response review.
- Human-approved canonical taxonomy support.
- Segment-aware insight generation.
- Trend and theme drift detection.
- AI Assistant drawer for asking questions about a project or report.
- Prompt versioning and evaluation.
- Multi-model routing for cost, speed, or quality.
- AI quality scorecards for internal monitoring.

## 11. Reporting Roadmap

Reporting is a core differentiator.

Current report sections:

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

Future reporting priorities:

- In-app PDF preview.
- Reports library.
- Report detail page.
- Report builder wizard.
- Section toggles.
- Report title and metadata editing.
- Branded report templates.
- Scheduled reports.
- Report annotations and approval workflow.

## 12. Collaboration Roadmap

Collaboration should follow a proven single-user workflow.

Future capabilities:

- Invite teammate.
- Members and roles.
- Project-level sharing.
- Report-level sharing.
- Comments on reports or themes.
- Approval workflow for executive reports.
- Notifications for completed analyses or report readiness.

## 13. Integrations Roadmap

Integrations should begin after local upload and project persistence are reliable.

Candidate integrations:

- Google Sheets import.
- SurveyMonkey import.
- Typeform import.
- Qualtrics import.
- Slack or Microsoft Teams notifications.
- CRM export for selected insight summaries.

Guidelines:

- CSV/Excel upload remains the universal fallback.
- Integrations should not bypass data preview and feedback column selection.
- Imported data should preserve source metadata for auditability.

## 14. Admin Roadmap

Admin features support operations, support, and customer trust.

Future admin capabilities:

- Admin overview.
- Tenant management.
- Job queue.
- Model usage.
- Audit log.
- Support diagnostics.
- Usage and cost monitoring.
- Failure and retry visibility.

## 15. Security Roadmap

Security must evolve with the product maturity stage.

MVP:

- Do not expose secrets.
- Keep API keys in environment variables.
- Avoid logging raw feedback unnecessarily.
- Validate uploaded files.

SaaS foundation:

- Authentication.
- Authorization.
- Workspace isolation.
- Secure file storage.
- Audit-relevant event logging.
- Data retention policy.

Enterprise:

- SSO.
- Advanced permissions.
- Data governance.
- Compliance roadmap.
- Security review materials.
- Audit export.

## 16. Infrastructure Roadmap

MVP:

- Local file handling.
- Local backend and frontend development.
- OpenAI API integration.

SaaS foundation:

- Managed application hosting.
- Managed database.
- Object storage for uploads and reports.
- Background job queue for analysis and report generation.
- Environment-specific configuration.
- Monitoring and logging.

Scale:

- Queue autoscaling.
- Model cost monitoring.
- Tenant-level rate limits.
- Data retention jobs.
- Backup and recovery processes.

## 17. Technical Debt Plan

Technical debt should be managed as a product enabler, not a separate afterthought.

Priority areas:

- Test coverage for upload, preview, analysis, CSV download, and PDF generation.
- Explicit file validation and limits.
- Structured backend errors.
- Prompt and schema versioning.
- Separation between analysis orchestration and API route handlers.
- Documentation accuracy.
- Frontend state handling for long-running operations.

Debt should be addressed before adding features that depend on the affected area.

## 18. Success Metrics

Product success:

- Time from upload to first insight.
- Time from upload to downloaded PDF.
- Analysis completion rate.
- Report download rate.
- CSV download rate.
- Retry success rate after analysis failure.
- Returning user project/report retrieval rate.

Quality success:

- Theme usefulness score from users.
- Sentiment agreement rate from sampled human review.
- Executive summary usefulness score.
- Low-confidence response rate.

## 19. KPIs

Commercial SaaS KPIs:

- Activation rate: users who complete first analysis.
- First report completion rate.
- Weekly active workspaces.
- Reports generated per workspace.
- Paid conversion rate after SaaS launch.
- Expansion by team or department.
- Churn risk indicators.

Operational KPIs:

- Analysis latency.
- PDF generation latency.
- OpenAI cost per response.
- Failure rate by analysis stage.
- Upload parse failure rate.

## 20. Release Strategy

Recommended release approach:

- Local MVP releases for core workflow validation.
- Internal alpha once persistence and authentication exist.
- Private beta for selected teams.
- Public SaaS launch after billing, reliability, and support readiness.

Each release should include:

- Release notes.
- Known issues.
- Baseline flow verification.
- Documentation updates.
- Rollback or mitigation plan for critical failures.

## 21. Versioning Strategy

Product versioning should use semantic intent even before strict semantic versioning is adopted.

- `0.x`: MVP and early SaaS foundation.
- `1.0`: production SaaS release with stable upload, analysis, reports, auth, projects, and billing.
- Minor versions: additive workflow and reporting improvements.
- Patch versions: bug fixes, copy updates, reliability improvements.

API changes should remain backwards compatible whenever possible. Breaking API changes require migration notes and versioned endpoints.

## 22. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)

## 23. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter document. |
| 0.2 | 2026-07-05 | Codex | Expanded roadmap with MVP, SaaS, reporting, collaboration, enterprise, security, infrastructure, and metrics guidance. |
