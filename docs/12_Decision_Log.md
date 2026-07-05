# SurveyIQ Decision Log

**Version:** 1.0  
**Status:** Draft  
**Owner:** Product and Engineering Leadership  
**Last Updated:** 2026-07-05

## Purpose

This document records significant product, UX, architecture, AI, and documentation decisions for SurveyIQ. It is the architecture decision log for the project and should explain what was decided, why it was decided, which alternatives were considered, and what consequences the team accepted.

## Table of Contents

1. Decision Log Format
2. Active Decisions
3. Pending Decisions
4. Superseded Decisions
5. Related Documents
6. Revision History

## 1. Decision Log Format

Each decision must use the following format:

- Decision ID
- Title
- Date
- Status
- Owner
- Context
- Decision
- Alternatives Considered
- Consequences
- Related Documents

Decision statuses:

- **Proposed:** decision is under discussion.
- **Accepted:** decision is current source of truth.
- **Superseded:** decision has been replaced.
- **Deprecated:** decision is still visible for history but should not guide new work.

## 2. Active Decisions

### Decision ID: DEC-001

**Title:** Preserve MVP API Compatibility  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Engineering

**Context:** The MVP already supports upload, preview, analysis, analysed CSV download, and PDF report generation. The frontend depends on the existing backend response structure.

**Decision:** Backend changes should preserve existing API contracts wherever possible. New response fields should be additive unless a breaking change fixes a clear bug.

**Alternatives Considered:**

- Redesign the API immediately around future SaaS resources.
- Replace the MVP response shape with a new envelope format.
- Defer all backend improvements until versioned APIs exist.

**Consequences:**

- The working MVP remains stable.
- Future API improvements must be staged carefully.
- Some MVP endpoint names may remain until a versioned production API is introduced.

**Related Documents:**

- [09_API_Standards.md](09_API_Standards.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)

### Decision ID: DEC-002

**Title:** Keep the Current MVP Local-First  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product and Engineering

**Context:** The current product goal is to validate the upload-to-insight-to-report workflow before adding SaaS complexity.

**Decision:** SurveyIQ will continue using local file handling for the MVP. Authentication, databases, billing, teams, and enterprise governance remain future roadmap items.

**Alternatives Considered:**

- Add database persistence immediately.
- Add authentication before improving analysis quality.
- Build multi-tenant SaaS infrastructure before validating core workflow.

**Consequences:**

- MVP development stays focused and faster.
- Local storage is not suitable for multi-user production deployment.
- SaaS readiness requires future persistence, authorization, and storage work.

**Related Documents:**

- [01_Product_Vision.md](01_Product_Vision.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [14_Known_Issues.md](14_Known_Issues.md)

### Decision ID: DEC-003

**Title:** Use a Multi-Stage AI Analysis Pipeline  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** AI Engineering

**Context:** A single prompt can produce inconsistent qualitative analysis, duplicated themes, weak summaries, and less trustworthy recommendations.

**Decision:** SurveyIQ uses a staged AI pipeline: individual response analysis, candidate theme identification, canonical theme consolidation, response reassignment, sentiment generation, confidence scoring, executive insights, and recommended actions.

**Alternatives Considered:**

- Single prompt for all analysis.
- Rule-based keyword analysis.
- Manual-only theme coding.
- Separate unrelated prompts without consolidation.

**Consequences:**

- Analysis quality improves.
- Processing time and implementation complexity increase.
- Batching, retries, validation, and partial failure handling become important.

**Related Documents:**

- [08_AI_Architecture.md](08_AI_Architecture.md)
- [16_Test_Plan.md](16_Test_Plan.md)

### Decision ID: DEC-004

**Title:** Improve AI Quality Before Adding Commercial Complexity  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Management

**Context:** SurveyIQ's differentiator is executive-ready qualitative intelligence. Authentication, billing, subscriptions, and enterprise features are valuable only if the analysis and reporting workflow is strong.

**Decision:** Prioritize analysis quality, batching, report generation, and documentation before adding authentication, payments, subscriptions, teams, or enterprise governance.

**Alternatives Considered:**

- Build SaaS shell first.
- Add billing and subscriptions immediately.
- Prioritize enterprise features before improving insight quality.

**Consequences:**

- Core value proposition receives attention first.
- Commercial launch timing moves after MVP validation.
- Roadmap must clearly distinguish current MVP from future SaaS.

**Related Documents:**

- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)

### Decision ID: DEC-005

**Title:** Adopt Professional Enterprise SaaS Design Philosophy  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Design

**Context:** SurveyIQ serves analysts, managers, executives, and future enterprise buyers. The product needs credibility, clarity, and trust.

**Decision:** SurveyIQ will use a professional enterprise SaaS design style inspired by 40% Microsoft Fabric/Power BI, 30% Stripe, 20% Linear, and 10% Notion. The product should feel like "If Microsoft built an AI-powered survey intelligence platform."

**Alternatives Considered:**

- Consumer-style playful AI interface.
- Spreadsheet-first utility design.
- Chat-first AI product design.
- Marketing-heavy SaaS aesthetic inside the authenticated app.

**Consequences:**

- Dashboards and reports feel credible for management use.
- The UI prioritizes structure, hierarchy, and data clarity.
- Design system must remain restrained and accessibility-focused.

**Related Documents:**

- [04_Wireframes.md](04_Wireframes.md)
- [05_Design_System.md](05_Design_System.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

### Decision ID: DEC-006

**Title:** Use Left Sidebar Navigation with Top Bar  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Design

**Context:** SurveyIQ will include dashboards, projects, analyses, reports, AI Assistant, data sources, team, and settings. Users need stable navigation across dense workflows.

**Decision:** Authenticated app pages use a left sidebar for primary navigation and a top bar for workspace context, search, New Analysis, help, and user menu.

**Alternatives Considered:**

- Top navigation only.
- Command-center dashboard without persistent navigation.
- Chat-first navigation.
- Separate navigation per workflow.

**Consequences:**

- App structure is predictable for business users.
- Desktop analytics experience is prioritized.
- Responsive design must collapse sidebar to drawer/icon rail on smaller screens.

**Related Documents:**

- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [04_Wireframes.md](04_Wireframes.md)
- [05_Design_System.md](05_Design_System.md)

### Decision ID: DEC-007

**Title:** Use Hybrid Dashboard Philosophy  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Management and Product Design

**Context:** New users need a clear path to first value, while returning users need immediate insight from previous analyses and reports.

**Decision:** The dashboard will be hybrid. Empty-state dashboard is action-first. Returning-user dashboard is insight-first.

**Alternatives Considered:**

- Always show a generic analytics dashboard.
- Always show a start-analysis launcher.
- Use separate dashboard products for different user types.

**Consequences:**

- First-time activation remains clear.
- Returning users see useful summaries and recent work.
- Dashboard implementation depends on future persistence.

**Related Documents:**

- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)

### Decision ID: DEC-008

**Title:** Define Analysis Workflow as a Step-by-Step Wizard  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Design

**Context:** Uploading survey data, previewing rows, selecting the feedback column, configuring analysis, running AI, and reviewing results are sequential decisions.

**Decision:** The analysis workflow should be implemented as a step-by-step wizard.

**Alternatives Considered:**

- Single long form.
- Dashboard card flow.
- Chat-guided upload.
- Hidden automatic processing after upload.

**Consequences:**

- Users understand where they are in the process.
- Validation can happen at each step.
- The frontend must preserve state between wizard steps.

**Related Documents:**

- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)

### Decision ID: DEC-009

**Title:** Results Page Begins with Executive Summary  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Management

**Context:** SurveyIQ is designed to produce management-ready insight, not just row-level classification.

**Decision:** Analysis Results pages should present executive summary first, followed by charts, top themes, risks, recommendations, response table, and downloads.

**Alternatives Considered:**

- Start with raw response table.
- Start with chart-only dashboard.
- Split executive reporting into a separate product area only.

**Consequences:**

- The product reinforces executive-ready positioning.
- Analysts still retain access to response-level evidence.
- Report generation naturally extends from the results page.

**Related Documents:**

- [01_Product_Vision.md](01_Product_Vision.md)
- [04_Wireframes.md](04_Wireframes.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

### Decision ID: DEC-010

**Title:** Use Professional Blue and Neutral Colour Palette  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Design

**Context:** The product must feel trustworthy, analytical, and suitable for enterprise users.

**Decision:** SurveyIQ uses professional blue, white, and neutral greys with restrained accents for success, warning, risk, and AI features.

**Alternatives Considered:**

- Purple-heavy AI branding.
- Dark-only dashboard interface.
- Warm beige or consumer startup palette.
- Multi-color decorative palette.

**Consequences:**

- Product feels familiar for enterprise analytics users.
- Semantic colors remain meaningful.
- Charts and accessibility requirements must drive final token choices.

**Related Documents:**

- [05_Design_System.md](05_Design_System.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

### Decision ID: DEC-011

**Title:** AI Assistant Is a Slide-Out Panel  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product Design and AI Engineering

**Context:** SurveyIQ should not become a generic AI chat product. The primary workflow is upload, analysis, review, and report.

**Decision:** AI Assistant is available as a right-side slide-out panel and contextual helper, not as a separate primary experience.

**Alternatives Considered:**

- AI chat as the home page.
- AI Assistant as a standalone main product area.
- No assistant capability.

**Consequences:**

- The main analytics workflow remains primary.
- Assistant responses can use current page/project/report context.
- Future assistant work must respect permissions and data boundaries.

**Related Documents:**

- [04_Wireframes.md](04_Wireframes.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)

### Decision ID: DEC-012

**Title:** Use Documentation Version 1 Numbered Library  
**Date:** 2026-07-05  
**Status:** Accepted  
**Owner:** Product and Engineering Leadership

**Context:** SurveyIQ documentation has expanded across product, design, engineering, architecture, operations, and testing. The library needs navigation and stable naming.

**Decision:** Move the documentation library to Version 1 with numbered documents, an index, documentation README, project tracker, decision log, changelog, known issues, release notes, and test plan.

**Alternatives Considered:**

- Keep unnumbered operational docs.
- Store documentation only in README files.
- Move planning content into issue tracker only.

**Consequences:**

- Documentation becomes easier to navigate.
- Cross-references must be kept current when file names change.
- New documents should follow the Version 1 formatting standard.

**Related Documents:**

- [INDEX.md](INDEX.md)
- [README.md](README.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)

## 3. Pending Decisions

- Which database should support the first SaaS version.
- Which authentication provider or framework should be used.
- Which payment provider should support billing and subscriptions.
- Whether users can edit AI-generated themes before report generation in the first SaaS version.
- Which production hosting platform should be selected.
- Whether report generation should be synchronous or fully job-based in the first hosted release.

## 4. Superseded Decisions

No superseded decisions have been recorded yet.

## 5. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [05_Design_System.md](05_Design_System.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

## 6. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial decisions starter document. |
| 1.0 | 2026-07-05 | Codex | Migrated and expanded into Version 1 architecture decision log. |
