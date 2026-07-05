# SurveyIQ Documentation README

**Version:** 1.0  
**Status:** Draft  
**Owner:** Product and Engineering  
**Last Updated:** 2026-07-05

## Purpose

This README explains how to use, maintain, and contribute to the SurveyIQ documentation library. It defines the document hierarchy, naming conventions, versioning strategy, contribution guidelines, and documentation standards for the Version 1 documentation set.

The documentation library exists to help product, design, engineering, AI, QA, operations, and future commercial teams work from the same source of truth.

## Table of Contents

1. Documentation Purpose
2. How to Use This Documentation
3. Document Hierarchy
4. Naming Conventions
5. Versioning Strategy
6. Contribution Guidelines
7. Documentation Standards
8. Cross-Reference Rules
9. Review and Maintenance
10. Related Documents
11. Revision History

## 1. Documentation Purpose

SurveyIQ documentation should:

- Preserve the approved product vision.
- Explain the complete SaaS application direction.
- Translate product strategy into UX, engineering, AI, API, and testing guidance.
- Help new team members understand the system quickly.
- Keep roadmap, decisions, issues, releases, and tests traceable.
- Distinguish current MVP scope from future SaaS and enterprise capabilities.

Documentation is a product asset. It should be accurate, readable, and useful for real delivery work.

## 2. How to Use This Documentation

Start with [INDEX.md](INDEX.md). It describes every document and recommends reading paths by role.

General guidance:

- Use product documents before designing new workflows.
- Use architecture documents before changing AI or API behaviour.
- Use the project tracker before planning feature work.
- Use the test plan before declaring a release ready.
- Use the decision log before revisiting settled product or architecture choices.
- Use known issues and release notes when communicating product readiness.

## 3. Document Hierarchy

The documentation library is organized into four groups.

### Product

Product documents define what SurveyIQ is, who it serves, how users move through the product, what pages exist, how the product should look and sound, and where the roadmap is heading.

Documents:

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [05_Design_System.md](05_Design_System.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

### Engineering

Engineering documents define delivery phases, project tracking, and testing expectations.

Documents:

- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)
- [16_Test_Plan.md](16_Test_Plan.md)

### Architecture

Architecture documents define AI, API, and decision standards.

Documents:

- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [12_Decision_Log.md](12_Decision_Log.md)

### Operations

Operations documents track change history, known issues, release notes, and documentation navigation.

Documents:

- [13_Change_Log.md](13_Change_Log.md)
- [14_Known_Issues.md](14_Known_Issues.md)
- [15_Release_Notes.md](15_Release_Notes.md)
- [INDEX.md](INDEX.md)
- [README.md](README.md)

## 4. Naming Conventions

Version 1 documentation uses numbered Markdown files for stable ordering.

Rules:

- Use two-digit numeric prefixes for core ordered documents.
- Use title case words separated by underscores after the numeric prefix.
- Use `.md` extension.
- Keep names stable after publication.
- Use `INDEX.md` for the documentation table of contents.
- Use `README.md` for documentation governance and usage instructions.

Examples:

- `01_Product_Vision.md`
- `08_AI_Architecture.md`
- `12_Decision_Log.md`
- `16_Test_Plan.md`

Deprecated names:

- `CHANGELOG.md`
- `DECISIONS.md`
- `KNOWN_ISSUES.md`
- `RELEASE_NOTES.md`

These have been migrated to numbered Version 1 file names.

## 5. Versioning Strategy

Documentation versions should reflect maturity.

Version guidance:

- `0.x`: starter or draft documentation.
- `1.0`: first complete professional documentation baseline.
- `1.x`: compatible updates, expansions, corrections, and refinements.
- `2.0`: major reorganization or strategic rewrite.

Each document should include:

- Version.
- Status.
- Owner.
- Last Updated.
- Revision History.

Document status values:

- Draft.
- In Review.
- Approved.
- Deprecated.

## 6. Contribution Guidelines

When updating documentation:

1. Read the related source-of-truth documents first.
2. Do not contradict the product vision, sitemap, user journey, or wireframes.
3. Keep current MVP scope separate from future SaaS or enterprise scope.
4. Use clear Markdown.
5. Update related document links when file names change.
6. Update revision history.
7. Avoid placeholders unless information genuinely does not exist yet.
8. Do not document features as current if they are only future roadmap items.
9. Keep security guidance explicit where secrets, customer data, or AI providers are involved.

## 7. Documentation Standards

Every major document should include:

- Title.
- Purpose.
- Version.
- Status.
- Owner.
- Last Updated.
- Table of Contents.
- Related Documents.
- Revision History.

Writing standards:

- Use professional software company documentation style.
- Prefer concise sections and scannable tables.
- Use consistent terminology: SurveyIQ, analysis, report, project, workspace, theme, sentiment, confidence, AI Assistant.
- Use "future" or "planned" labels for capabilities not in the current MVP.
- Avoid unnecessary product features that are not in the approved roadmap.
- Avoid implementation promises that have not been decided.

## 8. Cross-Reference Rules

Cross-references should:

- Use relative links.
- Point to numbered Version 1 filenames.
- Be updated when documents are renamed.
- Prefer linking to the most relevant source of truth.

Examples:

- Product scope: [01_Product_Vision.md](01_Product_Vision.md)
- Navigation and pages: [02_Application_Sitemap.md](02_Application_Sitemap.md)
- AI workflow: [08_AI_Architecture.md](08_AI_Architecture.md)
- API behaviour: [09_API_Standards.md](09_API_Standards.md)
- Testing: [16_Test_Plan.md](16_Test_Plan.md)

## 9. Review and Maintenance

Documentation should be reviewed:

- Before major implementation phases.
- Before releases.
- After significant product decisions.
- After API or AI architecture changes.
- When known issues are resolved or newly discovered.
- When files are renamed or reorganized.

Recommended ownership:

- Product owns vision, sitemap, user journey, roadmap, brand, and release notes.
- Design owns wireframes and design system.
- Engineering owns development roadmap, API standards, project tracker, and test plan.
- AI Engineering owns AI architecture and AI evaluation guidance.
- Product and Engineering jointly own decision log, changelog, known issues, index, and documentation README.

## 10. Related Documents

- [INDEX.md](INDEX.md)
- [01_Product_Vision.md](01_Product_Vision.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [11_Project_Tracker.md](11_Project_Tracker.md)
- [12_Decision_Log.md](12_Decision_Log.md)
- [16_Test_Plan.md](16_Test_Plan.md)

## 11. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-07-05 | Codex | Created Version 1 documentation README with hierarchy, naming, versioning, contribution, and maintenance standards. |
