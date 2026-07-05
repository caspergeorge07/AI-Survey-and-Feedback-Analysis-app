# SurveyIQ Design System

**Version:** 0.2  
**Status:** Draft  
**Owner:** Product Design  
**Last Updated:** 2026-07-05

## Purpose

This document defines the SurveyIQ design system for product, marketing, reporting, and future SaaS experiences. It translates the approved product vision, sitemap, user journey, and wireframes into reusable visual, interaction, accessibility, and component standards.

SurveyIQ should feel like a professional enterprise analytics product: clear, trustworthy, efficient, and executive-ready. The system should support the current local MVP while giving future product and engineering teams a consistent foundation for dashboards, analysis workflows, reports, settings, admin pages, and enterprise capabilities.

## Table of Contents

1. Design Philosophy
2. Visual Identity
3. Colour Palette
4. Typography
5. Spacing System
6. Grid System
7. Breakpoints
8. Border Radius
9. Elevation / Shadows
10. Icons
11. Illustrations
12. Core Components
13. Data and Analysis Components
14. Navigation Components
15. Feedback Components
16. Accessibility Standards
17. Responsive Behaviour
18. Animation Principles
19. Component Naming Convention
20. Component IDs
21. Design Tokens
22. CSS Variable Naming Convention
23. Future Component Library
24. Related Documents
25. Revision History

## 1. Design Philosophy

SurveyIQ is designed for business users who need to convert qualitative feedback into trusted decisions. The experience should be:

- **Professional:** appropriate for analysts, managers, executives, IT buyers, and administrators.
- **Insight-first:** summaries, charts, risks, and actions should be easier to find than raw mechanics.
- **Evidence-led:** AI outputs should always connect back to response-level evidence, confidence, and reasons.
- **Calm and structured:** avoid visual noise, novelty UI, or decorative distractions.
- **Desktop-first analytics:** optimize dense dashboards and tables for desktop while keeping all workflows responsive.

The approved inspiration mix is 40% Microsoft Fabric/Power BI, 30% Stripe, 20% Linear, and 10% Notion. In practical terms, use enterprise analytics structure, clean form design, efficient workflow density, and document-like clarity for reports.

## 2. Visual Identity

SurveyIQ should be visually recognizable through:

- A professional blue-led palette with white and neutral grey surfaces.
- Restrained accent colors for success, warning, risk, and AI-assisted features.
- Crisp tables, clear charts, and strong information hierarchy.
- Minimal decoration. Use whitespace, alignment, and content structure rather than illustration-heavy layouts.
- A consistent app shell with left sidebar navigation and top bar.

The product should not feel like a generic AI chat tool. AI should appear as a trusted analysis capability inside the workflow, not as the entire interface.

## 3. Colour Palette

### Core Palette

| Token | Suggested Value | Usage |
|---|---:|---|
| `blue-700` | `#175CD3` | Primary actions, selected navigation, links |
| `blue-600` | `#2563EB` | Hover state, active controls |
| `blue-100` | `#DBEAFE` | Subtle selected backgrounds |
| `neutral-950` | `#111827` | Primary text |
| `neutral-700` | `#374151` | Secondary headings and labels |
| `neutral-500` | `#6B7280` | Supporting copy and metadata |
| `neutral-200` | `#E5E7EB` | Borders and separators |
| `neutral-100` | `#F3F4F6` | App background and page bands |
| `white` | `#FFFFFF` | Cards, forms, report pages |

### Semantic Palette

| Token | Suggested Value | Usage |
|---|---:|---|
| `success-600` | `#16A34A` | Positive sentiment, completed states |
| `warning-600` | `#D97706` | Warnings, partial confidence, needs review |
| `risk-600` | `#DC2626` | Negative sentiment, risk, destructive actions |
| `ai-600` | `#7C3AED` | AI Assistant, generated insight indicators |
| `info-600` | `#0284C7` | Informational notices |

### Colour Usage Rules

- Primary actions use blue.
- AI-specific affordances may use restrained purple accents, but never dominate the page.
- Sentiment cannot rely on color alone; always include text labels and accessible legends.
- Risk and destructive colors must be reserved for meaningful warnings or irreversible actions.
- Dashboards should use neutral backgrounds with color reserved for insight emphasis.

## 4. Typography

Use a modern system font stack for speed, readability, and enterprise familiarity.

| Style | Size | Weight | Use |
|---|---:|---:|---|
| Display | 40-48px | 700 | Public-site hero only |
| Page title | 28-32px | 650-700 | Authenticated page headers |
| Section heading | 20-24px | 650 | Dashboard/report sections |
| Card heading | 16-18px | 600 | Cards and panels |
| Body | 14-16px | 400 | Main content |
| Metadata | 12-13px | 400-500 | Labels, timestamps, table metadata |
| Button | 14px | 600 | Actions |

Rules:

- Do not scale font size with viewport width.
- Letter spacing should remain `0`.
- Use sentence case for labels and headings unless a proper noun requires title case.
- Reports may use stronger typographic hierarchy but should remain restrained.

## 5. Spacing System

Use a 4px-based spacing scale.

| Token | Value | Typical Use |
|---|---:|---|
| `space-1` | 4px | Tight icon/text gaps |
| `space-2` | 8px | Form label gaps, compact rows |
| `space-3` | 12px | Button padding, small card gaps |
| `space-4` | 16px | Default component padding |
| `space-6` | 24px | Section spacing |
| `space-8` | 32px | Page header spacing |
| `space-12` | 48px | Large page bands |
| `space-16` | 64px | Public-site section spacing |

Rules:

- Dashboard and table pages should be compact but readable.
- Public-site pages can use larger vertical spacing.
- Wizard pages should keep controls close to the user decision point.

## 6. Grid System

### Public Site

- Use a centered max-width container of 1120-1200px.
- Use 12-column layouts on desktop.
- Stack to 6 columns on tablet and 1 column on mobile.

### Authenticated App

- Use full-width content areas with a max readable width only where content is document-like.
- Dashboard cards should use 12-column responsive grids.
- Tables should use available width and avoid unnecessary card framing.
- Report pages may use a document-width column for narrative sections and full-width sections for charts.

## 7. Breakpoints

| Name | Width | Behaviour |
|---|---:|---|
| Mobile | `< 640px` | Single column, drawer navigation, card summaries |
| Large mobile | `640px+` | Larger cards, compact table alternatives |
| Tablet | `768px+` | Two-column layouts where useful, sidebar as icon rail/drawer |
| Desktop | `1024px+` | Full sidebar, full dashboard/table experience |
| Wide desktop | `1280px+` | Multi-column analytics, wider charts |

## 8. Border Radius

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 4px | Inputs, badges, table filters |
| `radius-md` | 6px | Buttons, menus |
| `radius-lg` | 8px | Cards, panels, dialogs |

Cards should generally stay at 8px or less. Avoid overly rounded SaaS styling that makes the app feel consumer-oriented.

## 9. Elevation / Shadows

Use elevation sparingly.

| Token | Usage |
|---|---|
| `shadow-xs` | Menu boundaries and small popovers |
| `shadow-sm` | Dialogs and drawers |
| `shadow-md` | Modals that must separate from the app shell |

Prefer borders and subtle background changes over heavy shadows. Dashboards should feel grounded and analytical.

## 10. Icons

- Use a single icon library consistently.
- Use icons for navigation, upload, download, report, settings, search, filters, and status.
- Pair unfamiliar icons with labels or tooltips.
- Do not use icons as the only indicator for sentiment, risk, or status.
- Keep icon stroke weight visually consistent with typography.

## 11. Illustrations

Illustrations should be limited and purposeful.

- Public-site illustrations may show workflow, report previews, and product screenshots.
- Empty states can include subtle line illustrations only when they reinforce the next action.
- Authenticated app pages should avoid decorative illustrations in analytics-heavy views.
- Reports should prioritize charts, tables, and narrative summaries over illustration.

## 12. Core Components

### Buttons

Types:

- **Primary:** one dominant action per page region, such as Start analysis or Generate report.
- **Secondary:** alternative actions such as Back, Preview, or View examples.
- **Tertiary:** low-emphasis actions such as Cancel or Clear filters.
- **Destructive:** archive, revoke, delete, or remove actions.

States:

- Default, hover, active, focus, loading, disabled, success where appropriate.
- Loading buttons should preserve width to prevent layout shift.

### Cards

Use cards for repeated items, metric summaries, theme review, report lists, and empty-state prompts. Do not nest cards inside cards. Each card should have a clear title, context, body, and action area when actionable.

### Tables

Tables are primary for response-level analysis, projects, reports, members, API keys, audit logs, and admin operations.

Rules:

- Support sorting where comparisons matter.
- Support filtering for long lists.
- Use sticky headers for long datasets where feasible.
- Provide empty, loading, and error states.
- Preserve CSV export compatibility for analysis results.

### Forms

Forms should use clear labels, helper text, validation messages, and explicit required indicators. Do not rely on placeholder text as the only label.

### Inputs

Inputs use 14px body text, 40px minimum height, visible focus ring, and inline validation. Long values should wrap or truncate with tooltip depending on context.

### Dropdowns

Dropdowns should support keyboard navigation, clear selected state, and search when option counts are large. Feedback column selection must show the selected column and allow easy correction.

### Checkboxes

Use checkboxes for multi-select options, report section toggles, and settings that can be enabled independently.

### Radio Buttons

Use radio buttons for mutually exclusive settings, such as a single analysis mode or report template choice.

### Switches

Use switches only for immediate on/off settings. Avoid switches for actions that require review or confirmation.

### Badges

Badges communicate status, sentiment, confidence, plan, role, and job state. Include text labels, not color-only indicators.

### Progress Bars

Use progress bars for upload, analysis processing, report generation, and usage limits. For AI analysis, pair progress with a stage label such as "Consolidating themes".

## 13. Data and Analysis Components

### Charts

- Theme counts: horizontal or vertical bar charts.
- Sentiment counts: donut or pie chart with adjacent numeric legend.
- Trends: line charts.
- Heatmaps: future segmentation and benchmarking.

Chart requirements:

- Include title, date/source context, legend, and accessible text summary.
- Do not use chart colors without labels.
- Provide exact values in tooltip or adjacent table.

### File Upload Components

Upload zones must include:

- Drag-and-drop target.
- Browse button.
- Supported file guidance: CSV and Excel.
- Sample template link.
- Upload progress.
- Validation messages.

### Wizard Components

The analysis workflow uses a step-by-step wizard:

1. New Analysis
2. Upload Data
3. Data Preview
4. Configure Analysis
5. Processing
6. Analysis Results
7. Report Builder / PDF Preview

Rules:

- Show the current step.
- Preserve back navigation where safe.
- Validate before moving forward.
- Keep primary action visible near the decision area.

## 14. Navigation Components

### Left Sidebar

Primary authenticated navigation:

- Dashboard
- Projects
- Analyses
- Reports
- AI Assistant
- Data Sources
- Team
- Settings

The sidebar remains visible on desktop, becomes an icon rail or drawer on tablet, and becomes a menu drawer on mobile.

### Top Bar

The top bar contains workspace context, global search, New Analysis, Help, and user menu. Avoid overloading it with page-specific controls.

### Breadcrumbs

Use breadcrumbs for nested areas:

- Projects > Project Detail > Analysis Results
- Reports > Report Detail > PDF Preview
- Settings > API Keys

### Search

Global search should eventually search projects, analyses, reports, and help content. Local search should be used for tables and lists.

### Pagination

Use pagination for large lists and response tables. Prefer stable page sizes and visible item counts.

### Tabs

Use tabs for related views within a context, such as project detail or analysis results. Do not use tabs to hide unrelated workflows.

### Accordions

Use accordions for FAQs, mobile feature comparisons, and advanced settings. Keep important workflow decisions visible by default.

## 15. Feedback Components

### Notifications

Use persistent in-page notifications for important warnings, upload errors, and analysis failures.

### Toast Messages

Use toast messages for transient confirmations such as saved settings, copied link, or download started. Toasts should not be the only place critical errors appear.

### Dialogs

Use dialogs for confirmation and focused decisions. Keep copy concise and explicit.

### Modals

Use modals sparingly for interrupts such as destructive confirmation. Complex workflows should use pages or drawers rather than modals.

### Drawers

Use drawers for contextual details and the AI Assistant. The AI Assistant is a right-side slide-out panel, not a separate primary workspace.

### Loading Components

Loading states must explain what is happening. AI operations should name the stage, such as "Analysing responses" or "Generating recommendations".

### Skeleton Loaders

Use skeletons for dashboards, tables, cards, and report previews. Match final layout dimensions to reduce layout shift.

### Empty States

Empty states should be action-first. The Empty Dashboard prioritizes starting the first analysis or using sample data.

### Error States

Errors must state what failed, why it may have failed, whether work was saved, and the next recovery action.

### Success States

Success states should confirm completion and guide the user to the next best action, such as Review results, Generate report, or Download CSV/PDF.

## 16. Accessibility Standards

SurveyIQ must meet WCAG 2.2 AA as the target standard.

Requirements:

- Keyboard access for all controls.
- Visible focus states.
- Semantic headings and landmarks.
- Labels for all form fields.
- Text alternatives for images, charts, and report previews.
- Color contrast of at least 4.5:1 for normal text.
- Status and loading messages announced to assistive technology where practical.
- No color-only meaning for sentiment, confidence, risk, or status.
- Drag-and-drop upload must always have a browse alternative.

## 17. Responsive Behaviour

Desktop is the primary experience for analysis and reporting. Tablet and mobile must remain usable but may simplify dense views.

- Tables become horizontal scroll regions or card lists on mobile.
- Dashboards stack charts and cards.
- Wizards become single-column flows.
- The sidebar becomes a drawer.
- PDF preview may defer to a native viewer on small screens.

## 18. Animation Principles

Use subtle animation to clarify state changes, not to entertain.

- Duration: 120-200ms for simple transitions.
- Use easing that feels responsive and calm.
- Animate drawers, menus, progress, and focus transitions.
- Avoid animated charts that delay comprehension.
- Respect reduced-motion preferences.

## 19. Component Naming Convention

Use descriptive, domain-aware component names.

Examples:

- `AnalysisResultsTable`
- `ThemeDistributionChart`
- `SentimentSummaryCard`
- `FileUploadDropzone`
- `ReportSectionToggle`
- `AiAssistantDrawer`

Avoid vague names such as `Box`, `Thing`, `Panel2`, or `NewComponent`.

## 20. Component IDs

Use stable IDs for testing, analytics, and accessibility hooks.

Pattern:

`surveyiq-[area]-[component]-[purpose]`

Examples:

- `surveyiq-upload-dropzone-main`
- `surveyiq-analysis-button-run`
- `surveyiq-results-table-responses`
- `surveyiq-report-button-download-pdf`

IDs must not include user data, file names, response text, or secrets.

## 21. Design Tokens

Design tokens should eventually cover:

- Color
- Typography
- Spacing
- Radius
- Shadow
- Z-index
- Breakpoints
- Motion
- Chart colors
- Semantic status colors

Token naming should be stable and platform-agnostic.

## 22. CSS Variable Naming Convention

Use lowercase kebab-case CSS variables.

Pattern:

`--si-[category]-[role]-[state]`

Examples:

- `--si-color-primary`
- `--si-color-text-muted`
- `--si-space-4`
- `--si-radius-card`
- `--si-shadow-modal`
- `--si-chart-sentiment-positive`

## 23. Future Component Library

Future component library goals:

- Shared React component package.
- Storybook or equivalent component documentation.
- Visual regression checks for core components.
- Accessibility tests for forms, menus, dialogs, and charts.
- Design token source of truth shared between design and engineering.
- Report-specific components for PDF and in-app preview consistency.

## 24. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [10_Brand_Guidelines.md](10_Brand_Guidelines.md)

## 25. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter document. |
| 0.2 | 2026-07-05 | Codex | Expanded into production-quality design system aligned with approved SurveyIQ documentation. |
