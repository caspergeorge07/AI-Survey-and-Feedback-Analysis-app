# SurveyIQ Documentation Index

**Version:** 1.0  
**Status:** Draft  
**Owner:** Product and Engineering  
**Last Updated:** 2026-07-05

## Purpose

This index is the primary navigation page for the SurveyIQ documentation library. It describes every document, groups documents by product, engineering, architecture, and operations, and helps new team members find the right source of truth quickly.

## Table of Contents

1. How to Use This Index
2. Product Documentation
3. Engineering Documentation
4. Architecture Documentation
5. Operations Documentation
6. Recommended Reading Paths
7. Complete Document List
8. Related Documents
9. Revision History

## 1. How to Use This Index

Start here when you need to understand the SurveyIQ product, roadmap, architecture, delivery plan, or operational status.

Guidance:

- Use product documents to understand what SurveyIQ is and who it serves.
- Use engineering documents to understand how the product should be built and tested.
- Use architecture documents to understand AI and API decisions.
- Use operations documents to understand project status, decisions, changes, issues, and releases.
- Use [README.md](README.md) for documentation contribution rules and naming standards.

## 2. Product Documentation

### [01_Product_Vision.md](01_Product_Vision.md)

Defines the SurveyIQ product vision, mission, target users, core problem, product promise, differentiation, guiding principles, success measures, and scope boundaries.

Use this when:

- Making product decisions.
- Prioritizing roadmap items.
- Checking whether a feature supports the core product promise.

### [02_Application_Sitemap.md](02_Application_Sitemap.md)

Defines the complete commercial SaaS sitemap, including public pages, authentication pages, authenticated app pages, dashboards, reports, settings, admin pages, error pages, and future enterprise pages.

Use this when:

- Planning navigation.
- Designing page coverage.
- Understanding future SaaS structure.

### [03_User_Journey.md](03_User_Journey.md)

Defines primary personas, the first-visit-to-first-report journey, alternative journeys, decision points, error states, success states, emotions, and improvement opportunities.

Use this when:

- Designing workflows.
- Writing acceptance criteria.
- Evaluating user experience risks.

### [04_Wireframes.md](04_Wireframes.md)

Defines wireframes and page specifications for public pages, authentication, authenticated app pages, admin pages, error/system pages, and future enterprise pages.

Use this when:

- Implementing UI.
- Reviewing page-level components.
- Checking responsive and accessibility expectations.

### [05_Design_System.md](05_Design_System.md)

Defines SurveyIQ design philosophy, visual identity, colours, typography, spacing, grids, breakpoints, components, accessibility standards, responsive behaviour, animation, naming, and tokens.

Use this when:

- Designing or implementing UI components.
- Reviewing visual consistency.
- Defining future component library standards.

### [06_Product_Roadmap.md](06_Product_Roadmap.md)

Defines the product roadmap across MVP, SaaS foundation, reporting, collaboration, integrations, admin, security, infrastructure, technical debt, success metrics, KPIs, releases, and versioning.

Use this when:

- Prioritizing work.
- Planning releases.
- Distinguishing current scope from future scope.

### [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

Defines SurveyIQ mission, vision, brand personality, tone, writing style, logo guidance, color usage, typography, UI writing, AI messaging, marketing voice, and documentation voice.

Use this when:

- Writing product copy.
- Creating release notes or marketing pages.
- Reviewing AI-generated messaging.

## 3. Engineering Documentation

### [07_Development_Roadmap.md](07_Development_Roadmap.md)

Breaks engineering delivery into phases covering project setup, backend, frontend, AI pipeline, database, authentication, billing, subscriptions, reports, dashboard, projects, analysis wizard, AI Assistant, API, testing, CI/CD, deployment, monitoring, performance, security, documentation, refactoring, and production release.

Use this when:

- Planning engineering phases.
- Estimating delivery.
- Understanding dependencies and definitions of done.

### [11_Project_Tracker.md](11_Project_Tracker.md)

Provides the master engineering project tracker for major SurveyIQ workstreams, priorities, statuses, dependencies, effort, owners, definitions of done, documentation links, issue placeholders, and required testing.

Use this when:

- Coordinating work across product and engineering.
- Preparing sprint planning.
- Checking feature readiness.

### [16_Test_Plan.md](16_Test_Plan.md)

Defines SurveyIQ testing philosophy, functional testing, regression testing, integration testing, API testing, UI testing, performance testing, security testing, accessibility testing, manual testing, future automation, and detailed feature-level test cases.

Use this when:

- Testing MVP changes.
- Preparing release readiness checks.
- Designing automated test coverage.

## 4. Architecture Documentation

### [08_AI_Architecture.md](08_AI_Architecture.md)

Defines the SurveyIQ AI workflow, prompt strategy, analysis pipeline, theme generation, theme consolidation, canonical themes, sentiment analysis, confidence scoring, executive summaries, recommendations, risk identification, quality checks, token/cost optimization, caching, rate limiting, retry strategy, OpenAI integration, future multi-model support, human review, and evaluation metrics.

Use this when:

- Modifying AI analysis.
- Reviewing model output quality.
- Planning future AI capabilities.

### [09_API_Standards.md](09_API_Standards.md)

Defines REST standards, endpoint naming, versioning, HTTP methods, request and response formats, error responses, status codes, authentication, pagination, filtering, sorting, validation, rate limiting, logging, monitoring, security, API documentation, OpenAPI, naming conventions, and future GraphQL considerations.

Use this when:

- Adding or changing backend endpoints.
- Reviewing API contracts.
- Planning production API versioning.

### [12_Decision_Log.md](12_Decision_Log.md)

Records accepted, pending, superseded, and deprecated architecture and product decisions using a consistent decision format.

Use this when:

- Understanding why a decision was made.
- Proposing a change to product or architecture direction.
- Avoiding repeated debates.

## 5. Operations Documentation

### [13_Change_Log.md](13_Change_Log.md)

Tracks notable product, engineering, AI, reporting, and documentation changes using Keep a Changelog categories.

Use this when:

- Reviewing internal change history.
- Preparing release notes.
- Understanding completed milestones.

### [14_Known_Issues.md](14_Known_Issues.md)

Tracks known product, UX, AI, technical, and operational issues with priority, behaviour, workaround, planned fix, status, and related component.

Use this when:

- Planning bug fixes.
- Communicating limitations.
- Preparing release readiness checks.

### [15_Release_Notes.md](15_Release_Notes.md)

Provides customer-facing release notes, including version history, major features, improvements, bug fixes, performance improvements, known limitations, and upcoming features.

Use this when:

- Communicating changes externally.
- Preparing stakeholder updates.
- Summarizing release value.

### [README.md](README.md)

Explains the purpose, hierarchy, naming conventions, versioning strategy, contribution guidelines, and standards for the documentation library.

Use this when:

- Creating or updating documentation.
- Checking formatting expectations.
- Understanding how the library is organized.

## 6. Recommended Reading Paths

### New Product Manager

1. [01_Product_Vision.md](01_Product_Vision.md)
2. [03_User_Journey.md](03_User_Journey.md)
3. [04_Wireframes.md](04_Wireframes.md)
4. [06_Product_Roadmap.md](06_Product_Roadmap.md)
5. [12_Decision_Log.md](12_Decision_Log.md)

### New Engineer

1. [01_Product_Vision.md](01_Product_Vision.md)
2. [07_Development_Roadmap.md](07_Development_Roadmap.md)
3. [08_AI_Architecture.md](08_AI_Architecture.md)
4. [09_API_Standards.md](09_API_Standards.md)
5. [11_Project_Tracker.md](11_Project_Tracker.md)
6. [16_Test_Plan.md](16_Test_Plan.md)

### New Designer

1. [01_Product_Vision.md](01_Product_Vision.md)
2. [03_User_Journey.md](03_User_Journey.md)
3. [04_Wireframes.md](04_Wireframes.md)
4. [05_Design_System.md](05_Design_System.md)
5. [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

### Release Owner

1. [11_Project_Tracker.md](11_Project_Tracker.md)
2. [13_Change_Log.md](13_Change_Log.md)
3. [14_Known_Issues.md](14_Known_Issues.md)
4. [15_Release_Notes.md](15_Release_Notes.md)
5. [16_Test_Plan.md](16_Test_Plan.md)

## 7. Complete Document List

| Document | Group | Purpose |
|---|---|---|
| [01_Product_Vision.md](01_Product_Vision.md) | Product | Product vision and scope boundaries. |
| [02_Application_Sitemap.md](02_Application_Sitemap.md) | Product | Complete SaaS sitemap. |
| [03_User_Journey.md](03_User_Journey.md) | Product | Personas and user journeys. |
| [04_Wireframes.md](04_Wireframes.md) | Product | Wireframes and page specifications. |
| [05_Design_System.md](05_Design_System.md) | Product | Visual and component system. |
| [06_Product_Roadmap.md](06_Product_Roadmap.md) | Product | Product roadmap and KPIs. |
| [07_Development_Roadmap.md](07_Development_Roadmap.md) | Engineering | Engineering phases and delivery plan. |
| [08_AI_Architecture.md](08_AI_Architecture.md) | Architecture | AI pipeline and quality strategy. |
| [09_API_Standards.md](09_API_Standards.md) | Architecture | API conventions and standards. |
| [10_Brand_Guidelines.md](10_Brand_Guidelines.md) | Product | Brand, voice, and messaging. |
| [11_Project_Tracker.md](11_Project_Tracker.md) | Engineering | Master development tracker. |
| [12_Decision_Log.md](12_Decision_Log.md) | Architecture | Architecture and product decision log. |
| [13_Change_Log.md](13_Change_Log.md) | Operations | Internal change history. |
| [14_Known_Issues.md](14_Known_Issues.md) | Operations | Known issue register. |
| [15_Release_Notes.md](15_Release_Notes.md) | Operations | Customer-facing release notes. |
| [16_Test_Plan.md](16_Test_Plan.md) | Engineering | Testing strategy and test cases. |
| [README.md](README.md) | Operations | Documentation library guide. |

## 8. Related Documents

- [README.md](README.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)
- [12_Decision_Log.md](12_Decision_Log.md)
- [13_Change_Log.md](13_Change_Log.md)

## 9. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-05 | Codex | Created Version 1 documentation index with grouped navigation and document descriptions. |
