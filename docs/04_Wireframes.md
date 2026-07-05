# SurveyIQ Wireframes & Page Specifications

**Version:** 0.2  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document defines the professional wireframes and page specifications for SurveyIQ, an AI-powered survey and qualitative feedback intelligence platform. It translates the product vision, sitemap, and user journey into a consistent page-level UX blueprint suitable for frontend implementation planning.

SurveyIQ helps users upload CSV/Excel survey feedback, analyse free-text responses with AI, identify themes, sentiment, risks, recommendations, and generate executive-ready reports.

## Table of Contents

1. Design Philosophy
2. Global Layout Rules
3. Navigation Structure
4. Responsive Behaviour
5. Accessibility Principles
6. Component Rules
7. Interaction Rules
8. Shared States
9. Page-by-Page Wireframes
10. Future Enhancements
11. Related Documents

## 1. Design Philosophy

### Product Feel

SurveyIQ should feel like: **"If Microsoft built an AI-powered survey intelligence platform."**

The product should be:

- Professional enterprise SaaS.
- Calm, structured, and trustworthy.
- Analytics-first, but approachable.
- Insight-led rather than decorative.
- Suitable for analysts and executives.

### Design Inspiration Mix

- 40% Microsoft Fabric / Power BI: enterprise analytics structure, dashboard clarity, report credibility.
- 30% Stripe: clean spacing, crisp forms, confident hierarchy.
- 20% Linear: efficient workflows, tight information density, polished interactions.
- 10% Notion: approachable document-like clarity for reports and summaries.

### Visual Direction

- Professional blue, white, and neutral greys.
- Restrained accents for success, warning, risk, and AI features.
- Charts should be readable before they are decorative.
- Desktop-first analytics layout with responsive adaptation for tablet and mobile.

## 2. Global Layout Rules

### Authenticated App Shell

Authenticated SurveyIQ pages use a persistent left sidebar and top bar.

```text
+--------------------------------------------------------------------------------+
| Top Bar: Workspace | Search | New Analysis | Help | User Menu                  |
+------------------+-------------------------------------------------------------+
| Left Sidebar     | Page Header: Title, context, primary action                  |
|                  |-------------------------------------------------------------|
| Dashboard        | Main content region                                          |
| Projects         |                                                             |
| Analyses         |                                                             |
| Reports          |                                                             |
| AI Assistant     |                                                             |
| Data Sources     |                                                             |
| Team             |                                                             |
| Settings         |                                                             |
+------------------+-------------------------------------------------------------+
```

### Layout Rules

- Use a left sidebar for primary navigation.
- Use the top bar for workspace context, search, global actions, help, and profile.
- Keep primary page action in the page header or top-right action area.
- Keep analysis workflows in step-by-step wizard pages.
- Keep dashboards dense but scannable.
- Do not nest cards inside cards.
- Avoid marketing-style hero sections inside the authenticated app.
- Use full-width working areas for tables, charts, and dashboards.

## 3. Navigation Structure

### Primary Authenticated Navigation

1. Dashboard
2. Projects
3. Analyses
4. Reports
5. AI Assistant
6. Data Sources
7. Team
8. Settings

### Secondary Navigation Patterns

- Project detail pages use tabs: Overview, Analyses, Reports, Files, Settings.
- Analysis result pages use anchors/tabs: Summary, Themes, Sentiment, Responses, Downloads.
- Settings pages use grouped navigation: Workspace, Billing, Usage, Integrations, API Keys, Notifications, Profile.
- Admin pages use a separate admin section and should not appear to normal users.

### AI Assistant Rule

AI Assistant is available as a slide-out right-side panel. It is not a separate primary workspace experience in the main flow, even though it appears in primary navigation as an access point.

## 4. Responsive Behaviour

### Desktop

- Primary target experience.
- Sidebar remains visible.
- Top bar remains fixed.
- Use multi-column layouts for dashboards, project pages, and report pages.
- Tables remain primary for dense data.

### Tablet

- Sidebar collapses to icon rail or drawer.
- Main content uses one or two columns depending on width.
- Charts stack before tables when space is constrained.
- Wizard steps remain visible but can compress into a horizontal stepper.

### Mobile

- Fully responsive, but not the primary analytics experience.
- Sidebar becomes a menu drawer.
- Top bar simplifies to workspace, menu, and profile.
- Tables become horizontally scrollable or card summaries.
- Analysis workflows become single-column.
- PDF preview may open in native browser viewer if embedded preview is too constrained.

## 5. Accessibility Principles

- All controls must be keyboard accessible.
- Every page must have a clear heading hierarchy.
- Interactive elements require visible focus states.
- Charts must have text equivalents or summary tables.
- Sentiment must not rely on color alone.
- Form fields require labels and validation messages.
- Drag-and-drop upload must also support browse action.
- Loading states must be announced with clear text.
- Error states must explain the problem and recovery path.

## 6. Component Rules

### Buttons

- Primary button: one per main page region where possible.
- Secondary buttons: for alternative actions.
- Destructive actions: reserved for archive, delete, revoke, or remove.

### Cards

- Use cards for repeated items, metric summaries, and theme review.
- Avoid card-heavy decorative layouts.
- Cards should have clear labels, status, and action affordances.

### Tables

- Use tables for analyses, reports, members, API keys, audit logs, response-level output.
- Include sorting and filtering where useful.
- Preserve readable row height and clear column labels.

### Charts

- Theme counts: bar charts.
- Sentiment counts: donut or pie charts, with accessible labels.
- Trends: line charts.
- Heatmaps: future segmentation or benchmarking use only.

### Upload

- Drag-and-drop zone with browse option.
- Supported file guidance.
- Sample template link.
- Clear upload success and failure states.

### Wizard

- Step indicator.
- Back and Continue actions.
- Save progress where future backend supports it.
- Clear validation before continuing.

## 7. Interaction Rules

- Clicking "New Analysis" starts the analysis wizard.
- Upload must transition to preview only after file validation.
- Selecting a feedback column is required before analysis configuration can continue.
- Running analysis moves user into processing state.
- Results page begins with executive summary, then charts, top themes, risks, recommendations, response table, and downloads.
- Theme Review uses card-based review.
- Report Builder uses wizard-based flow.
- AI Assistant opens as a right-side slide-out panel from any authenticated page.

## 8. Shared States

### Empty States

Empty states should be action-first and explain the next best step.

Example:

```text
+--------------------------------------------------+
| No analyses yet                                  |
| Upload your first survey export to generate      |
| themes, sentiment, and an executive report.      |
|                                                  |
| [Start New Analysis] [Use Sample File]           |
+--------------------------------------------------+
```

### Loading States

Loading states should include:

- Action being performed.
- Progress indicator.
- Expected next state.
- Safe reassurance for long-running AI analysis.

### Error States

Error states should include:

- What failed.
- Why it may have failed.
- Whether work was saved.
- Primary recovery action.
- Secondary support action.

### Success States

Success states should include:

- Confirmation of completed task.
- Summary of generated outputs.
- Next recommended action.

## 9. Page-by-Page Wireframes

## PUBLIC SITE

### Home

**Page purpose:** Introduce SurveyIQ and convert visitors into trial users or demo requests.  
**Primary users:** Prospects, executives, analysts, research leads.  
**Business objective:** Communicate value quickly and drive qualified conversion.

**Desktop wireframe:**

```text
+--------------------------------------------------------------------------------+
| Logo | Product | Solutions | Pricing | Resources | Security        Login | CTA |
+--------------------------------------------------------------------------------+
| Hero: AI-powered survey intelligence                                           |
| Subcopy: free-text feedback -> themes, sentiment, risks, reports               |
| [Start Free Trial] [Book Demo]                                                  |
|                         Product/report preview                                  |
+--------------------------------------------------------------------------------+
| Workflow: Upload -> Analyse -> Review -> Report                                |
+--------------------------------------------------------------------------------+
| Use cases | Customer feedback | Employee feedback | Product research           |
+--------------------------------------------------------------------------------+
| Example report preview | Executive summary | Charts | Recommendations          |
+--------------------------------------------------------------------------------+
| Footer                                                                           |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Stack hero copy above report preview; navigation compresses.  
**Mobile behaviour:** Hamburger navigation; CTA stays near top; report preview becomes simplified image/card.  
**Main components:** Header, hero, workflow strip, use-case cards, report preview, CTA, footer.  
**Primary action:** Start free trial.  
**Secondary actions:** Book demo, view report examples, login.  
**User interactions:** Navigate public pages, open example report, select CTA.  
**Loading state:** Skeleton for report preview and social proof if dynamic.  
**Empty state:** Not applicable.  
**Error state:** Form or demo booking errors shown inline.  
**Success state:** CTA submission or navigation to signup/demo confirmation.  
**Accessibility notes:** Hero CTA must be keyboard reachable; preview needs descriptive alt text.  
**Future enhancements:** Interactive demo, ROI calculator, industry-specific home variants.

### Product

**Page purpose:** Explain the product workflow and core capabilities.  
**Primary users:** Buyers, analysts, product leaders.  
**Business objective:** Build product understanding and confidence.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Product overview: From survey comments to executive-ready insight              |
| [CTA]                                                                          |
+--------------------------------------------------------------------------------+
| Workflow diagram: Upload | Preview | Analyse | Review | Report                 |
+--------------------------------------------------------------------------------+
| Feature rows: AI themes | Sentiment | Risks | Reports | CSV/PDF exports        |
+--------------------------------------------------------------------------------+
| Screenshots / report examples                                                   |
+--------------------------------------------------------------------------------+
| Final CTA                                                                        |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Feature rows become stacked sections.  
**Mobile behaviour:** One-column layout; workflow becomes vertical timeline.  
**Main components:** Workflow overview, feature sections, screenshots, CTA.  
**Primary action:** Start free trial.  
**Secondary actions:** View report examples, book demo.  
**User interactions:** Scroll, expand feature details, click CTA.  
**Loading state:** Image placeholders.  
**Empty state:** Not applicable.  
**Error state:** Broken media fallback with text summary.  
**Success state:** User proceeds to signup or demo.  
**Accessibility notes:** Workflow must be readable without relying only on icons.  
**Future enhancements:** Interactive workflow simulation.

### Solutions

**Page purpose:** Show how SurveyIQ applies to different teams.  
**Primary users:** CX, HR, Product, Marketing, Research, Operations.  
**Business objective:** Help buyers see fit for their use case.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Solutions headline                                                              |
+--------------------------------------------------------------------------------+
| [Customer Experience] [Employee Feedback] [Product Research] [Market Research] |
+--------------------------------------------------------------------------------+
| Selected solution detail                                                        |
| Outcomes | Example insights | Report preview                                    |
+--------------------------------------------------------------------------------+
| CTA                                                                              |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Solution tabs wrap into two columns.  
**Mobile behaviour:** Solution cards stack vertically.  
**Main components:** Solution selector, outcome cards, report snippet, CTA.  
**Primary action:** Book demo.  
**Secondary actions:** Start free trial, view report examples.  
**User interactions:** Select solution card, scroll details.  
**Loading state:** Card skeletons if dynamic.  
**Empty state:** Not applicable.  
**Error state:** Fallback to general solution content.  
**Success state:** User selects CTA or understands relevant use case.  
**Accessibility notes:** Selected solution state must be announced visually and semantically.  
**Future enhancements:** Industry-specific solution pages.

### Pricing

**Page purpose:** Present plan options and conversion paths.  
**Primary users:** Buyers, finance, team leads.  
**Business objective:** Convert self-serve users and route larger accounts to sales.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Pricing headline                                                                |
+--------------------------------------------------------------------------------+
| Plan Card        | Plan Card        | Enterprise Card                           |
| Starter          | Growth           | Custom                                    |
| [Start]          | [Start]          | [Contact Sales]                           |
+--------------------------------------------------------------------------------+
| Feature comparison table                                                        |
+--------------------------------------------------------------------------------+
| FAQ                                                                             |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Plan cards stack two then one.  
**Mobile behaviour:** One plan card per row; comparison becomes accordion.  
**Main components:** Plan cards, feature matrix, FAQ, CTA.  
**Primary action:** Start selected plan.  
**Secondary actions:** Contact sales, view security.  
**User interactions:** Compare plans, expand FAQ, choose plan.  
**Loading state:** Pricing table skeleton if dynamic.  
**Empty state:** Not applicable.  
**Error state:** Pricing unavailable message with contact sales CTA.  
**Success state:** User proceeds to signup or contact form.  
**Accessibility notes:** Feature matrix must be navigable by keyboard and screen reader.  
**Future enhancements:** Usage estimator.

### Report Examples

**Page purpose:** Demonstrate quality of executive-ready outputs.  
**Primary users:** Executives, analysts, prospective buyers.  
**Business objective:** Build trust through concrete output examples.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Report examples headline                                                        |
+--------------------------------------------------------------------------------+
| Filter: Customer | Employee | Product                                           |
+--------------------------------------------------------------------------------+
| Report preview large | Summary snippets | Chart thumbnails                      |
| [View Sample] [Download Example]                                                |
+--------------------------------------------------------------------------------+
| Additional report cards                                                         |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Preview and summary stack.  
**Mobile behaviour:** Report cards stack; previews simplified.  
**Main components:** Report gallery, filters, preview panel, CTAs.  
**Primary action:** View sample report.  
**Secondary actions:** Download example, book demo.  
**User interactions:** Filter examples, open preview, download sample.  
**Loading state:** Preview skeleton.  
**Empty state:** No examples for selected filter.  
**Error state:** Preview unavailable with retry.  
**Success state:** Report preview opens or download starts.  
**Accessibility notes:** PDF previews need text summaries.  
**Future enhancements:** Interactive anonymized report viewer.

### Resources

**Page purpose:** Provide educational content and templates.  
**Primary users:** Prospects, customers, analysts.  
**Business objective:** Support acquisition and product education.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Resources headline                                                              |
+--------------------------------------------------------------------------------+
| Featured guide                                                                  |
+--------------------------------------------------------------------------------+
| Filters: Blog | Guides | Templates | Webinars                                   |
+--------------------------------------------------------------------------------+
| Resource card grid                                                              |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Card grid becomes two columns.  
**Mobile behaviour:** One-column card list.  
**Main components:** Featured resource, filters, resource cards, newsletter CTA.  
**Primary action:** Open resource.  
**Secondary actions:** Subscribe, download template.  
**User interactions:** Filter, search, open resource.  
**Loading state:** Resource card skeletons.  
**Empty state:** No resources match filter.  
**Error state:** Resource loading error.  
**Success state:** Resource page opens or download begins.  
**Accessibility notes:** Resource cards require clear titles and type labels.  
**Future enhancements:** Benchmark reports.

### Security

**Page purpose:** Build confidence around data handling.  
**Primary users:** IT, security, procurement, enterprise buyers.  
**Business objective:** Reduce security objections and support enterprise sales.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Security headline                                                               |
+--------------------------------------------------------------------------------+
| Data handling | Privacy | Retention | Compliance roadmap                        |
+--------------------------------------------------------------------------------+
| Security details sections                                                       |
+--------------------------------------------------------------------------------+
| Contact security CTA                                                            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Security tiles stack two columns.  
**Mobile behaviour:** Accordion sections.  
**Main components:** Security overview, policy sections, subprocessors placeholder, CTA.  
**Primary action:** Contact security.  
**Secondary actions:** View privacy, book demo.  
**User interactions:** Expand sections, contact team.  
**Loading state:** Not expected.  
**Empty state:** Placeholder for future compliance documents.  
**Error state:** Contact form failure.  
**Success state:** Inquiry submitted.  
**Accessibility notes:** Avoid icon-only trust badges; include text.  
**Future enhancements:** Trust center, SOC 2 artifacts.

### Contact / Book Demo

**Page purpose:** Capture qualified sales interest.  
**Primary users:** Buyers, enterprise prospects.  
**Business objective:** Generate demo requests.

**Desktop wireframe:**

```text
+ Header ------------------------------------------------------------------------+
| Contact sales / book demo                                                       |
+--------------------------------------------------------------------------------+
| Form: Name | Email | Company | Role | Use case | Message                        |
| Calendar / next steps panel                                                     |
| [Submit]                                                                        |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Form and side panel stack.  
**Mobile behaviour:** Single-column form.  
**Main components:** Contact form, optional calendar, trust notes.  
**Primary action:** Submit request.  
**Secondary actions:** Return to pricing, email support.  
**User interactions:** Complete form, submit, select meeting time in future.  
**Loading state:** Submit button loading.  
**Empty state:** Not applicable.  
**Error state:** Required field validation or submission failure.  
**Success state:** Confirmation message and next steps.  
**Accessibility notes:** Every field needs label and error text.  
**Future enhancements:** Lead routing by company size.

## AUTHENTICATION

### Login

**Page purpose:** Authenticate existing users.  
**Primary users:** Existing users.  
**Business objective:** Provide secure, low-friction access.

**Desktop wireframe:**

```text
+---------------------------+-------------------------------+
| Brand panel               | Login form                    |
| SurveyIQ value statement  | Email                         |
|                           | Password                      |
|                           | [Log In]                      |
|                           | Forgot password | Sign up     |
+---------------------------+-------------------------------+
```

**Tablet behaviour:** Brand panel reduces; form centered.  
**Mobile behaviour:** Form only with compact brand header.  
**Main components:** Email, password, login button, forgot password, signup link.  
**Primary action:** Log in.  
**Secondary actions:** Forgot password, sign up.  
**User interactions:** Enter credentials, submit.  
**Loading state:** Button loading and form disabled.  
**Empty state:** Empty form.  
**Error state:** Invalid credentials, locked account in future.  
**Success state:** User lands on dashboard or onboarding.  
**Accessibility notes:** Labels, autocomplete, visible errors.  
**Future enhancements:** SSO, magic link.

### Signup

**Page purpose:** Create a new user account and workspace.  
**Primary users:** New users.  
**Business objective:** Convert interested users into active accounts.

**Desktop wireframe:**

```text
+---------------------------+-------------------------------+
| Brand / trust panel       | Signup form                   |
| What you can do first     | Name | Email | Password       |
|                           | Workspace name                |
|                           | [Create Account]              |
+---------------------------+-------------------------------+
```

**Tablet behaviour:** Two-column becomes stacked.  
**Mobile behaviour:** Single-column form.  
**Main components:** Account fields, workspace field, terms note, login link.  
**Primary action:** Create account.  
**Secondary actions:** Log in, book demo.  
**User interactions:** Complete form, submit.  
**Loading state:** Account creation loading.  
**Empty state:** Empty form.  
**Error state:** Email exists, weak password, missing required fields.  
**Success state:** User enters onboarding.  
**Accessibility notes:** Clear required fields and validation messages.  
**Future enhancements:** Invite-based signup, SSO.

### Forgot Password

**Page purpose:** Help users recover account access.  
**Primary users:** Existing users.  
**Business objective:** Reduce login abandonment.

**Desktop wireframe:**

```text
+--------------------------------------------------+
| Forgot password                                  |
| Enter your email to receive reset instructions.  |
| Email                                            |
| [Send Reset Link]                                |
| Back to login                                    |
+--------------------------------------------------+
```

**Tablet behaviour:** Centered panel.  
**Mobile behaviour:** Full-width form with comfortable spacing.  
**Main components:** Email field, send button, back link.  
**Primary action:** Send reset link.  
**Secondary actions:** Back to login.  
**User interactions:** Enter email, submit.  
**Loading state:** Sending state.  
**Empty state:** Empty email field.  
**Error state:** Invalid email format, submission failure.  
**Success state:** Confirmation that instructions were sent if account exists.  
**Accessibility notes:** Avoid revealing whether account exists.  
**Future enhancements:** Magic link login.

### Onboarding

**Page purpose:** Guide new users to first successful analysis.  
**Primary users:** New analysts, workspace owners.  
**Business objective:** Improve activation.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Welcome to SurveyIQ                                                            |
| Stepper: Role -> Use case -> First analysis                                     |
| [Role options]                                                                  |
| [Use sample file] [Upload your data]                                            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Stepper remains; content stacks.  
**Mobile behaviour:** One step per screen.  
**Main components:** Welcome, role/use-case selector, checklist, upload CTA.  
**Primary action:** Start first analysis.  
**Secondary actions:** Use sample file, skip to dashboard.  
**User interactions:** Select role, choose use case, begin upload.  
**Loading state:** Setup saving state.  
**Empty state:** No selections yet.  
**Error state:** Setup save failure.  
**Success state:** User enters New Analysis flow.  
**Accessibility notes:** Stepper state must be readable by assistive tech.  
**Future enhancements:** Personalized onboarding.

## AUTHENTICATED APP

### Main Dashboard

**Page purpose:** Provide insight-first overview for returning users.  
**Primary users:** Analysts, managers, executives.  
**Business objective:** Increase repeat usage and surface high-value insights.

**Desktop wireframe:**

```text
+ Top Bar -----------------------------------------------------------------------+
| Sidebar | Dashboard                                      [New Analysis]        |
|         | KPI cards: Responses | Reports | Avg sentiment | Open risks          |
|         | Theme trend line chart        | Sentiment donut                       |
|         | Recent analyses table         | Recommended actions                   |
|         | Latest reports                | AI Assistant drawer trigger            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** KPI cards wrap; charts stack.  
**Mobile behaviour:** Summary cards first, then recent analyses, then reports.  
**Main components:** KPI cards, trend chart, sentiment chart, recent analyses, latest reports.  
**Primary action:** New Analysis.  
**Secondary actions:** Open project, open report, launch AI Assistant.  
**User interactions:** Filter date range, open analysis, download report.  
**Loading state:** Dashboard skeleton cards and chart placeholders.  
**Empty state:** Use Empty Dashboard.  
**Error state:** Partial dashboard load error with retry.  
**Success state:** User sees current insight snapshot.  
**Accessibility notes:** Chart summaries must be text-readable.  
**Future enhancements:** Cross-project trends and alerts.

### Empty Dashboard

**Page purpose:** Guide first-time or empty workspace users to first action.  
**Primary users:** New users.  
**Business objective:** Drive first successful analysis.

**Desktop wireframe:**

```text
+ Top Bar -----------------------------------------------------------------------+
| Sidebar | Start analysing survey feedback                                      |
|         | Empty-state panel                                                    |
|         | Upload CSV/Excel to generate themes, sentiment, and reports.             |
|         | [Start New Analysis] [Use Sample Template]                              |
|         | Getting started checklist                                               |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Empty-state panel centered.  
**Mobile behaviour:** Single CTA card; checklist below.  
**Main components:** Empty-state message, primary CTA, sample template link, checklist.  
**Primary action:** Start New Analysis.  
**Secondary actions:** Use sample template, read guide.  
**User interactions:** Click CTA, open template.  
**Loading state:** Not expected.  
**Empty state:** This is the empty state.  
**Error state:** Template unavailable.  
**Success state:** User starts upload flow.  
**Accessibility notes:** CTA order must be clear and keyboard reachable.  
**Future enhancements:** Guided demo analysis.

### Projects List

**Page purpose:** Organize survey initiatives.  
**Primary users:** Analysts, research leads, managers.  
**Business objective:** Support repeat workflows and project-level organization.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Projects                                           [Create Project]             |
| Search | Filters: Owner Status Date                                             |
| Project table: Name | Analyses | Reports | Owner | Updated | Status            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Filters collapse into panel.  
**Mobile behaviour:** Project table becomes project cards.  
**Main components:** Search, filters, project table, create button.  
**Primary action:** Create Project.  
**Secondary actions:** Open project, archive project.  
**User interactions:** Search, sort, filter, open row.  
**Loading state:** Table skeleton.  
**Empty state:** No projects yet with create CTA.  
**Error state:** Unable to load projects.  
**Success state:** Project list loads or project is created.  
**Accessibility notes:** Table headers and row actions must be screen-reader friendly.  
**Future enhancements:** Project templates and tags.

### Project Detail

**Page purpose:** Central workspace for a survey initiative.  
**Primary users:** Analysts, research leads, managers.  
**Business objective:** Keep analyses, reports, and files tied to business context.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Project: Q3 Customer Feedback                         [New Analysis]           |
| Tabs: Overview | Analyses | Reports | Files | Settings                         |
| Overview metrics                                                                |
| Recent analyses table                 Latest reports                            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Two-column regions stack.  
**Mobile behaviour:** Tabs become dropdown; tables become cards.  
**Main components:** Project header, tabs, metrics, analyses, reports, files.  
**Primary action:** New Analysis.  
**Secondary actions:** Open report, upload file, edit project.  
**User interactions:** Switch tabs, open analysis, download report.  
**Loading state:** Project skeleton.  
**Empty state:** No analyses in project with CTA.  
**Error state:** Project not found or access denied.  
**Success state:** Project context loads.  
**Accessibility notes:** Tabs require clear selected state.  
**Future enhancements:** Project notes and collaborators.

### New Analysis

**Page purpose:** Start the analysis wizard.  
**Primary users:** Analysts.  
**Business objective:** Reduce friction from intention to upload.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| New Analysis                                                                    |
| Wizard stepper: Project -> Upload -> Preview -> Configure -> Run                |
| Select project or create project                                                |
| [Continue]                                                                      |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Stepper compresses.  
**Mobile behaviour:** One-column wizard; stepper becomes progress text.  
**Main components:** Wizard stepper, project selector, create project shortcut.  
**Primary action:** Continue.  
**Secondary actions:** Back to dashboard, create project.  
**User interactions:** Select project, continue.  
**Loading state:** Project list loading.  
**Empty state:** No projects with create project CTA.  
**Error state:** Project load failure.  
**Success state:** User advances to upload.  
**Accessibility notes:** Current wizard step must be announced.  
**Future enhancements:** Analysis templates.

### Upload Data

**Page purpose:** Upload CSV or Excel survey feedback.  
**Primary users:** Analysts.  
**Business objective:** Collect source data for analysis.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| New Analysis / Upload Data                                                      |
| Stepper                                                                         |
| +--------------------------------------------------------------------------+   |
| | Drag and drop CSV/XLSX here                                               |   |
| | or [Browse files]                                                         |   |
| | Supported: .csv, .xls, .xlsx | [Download sample template]                 |   |
| +--------------------------------------------------------------------------+   |
| [Back] [Continue disabled until upload succeeds]                                |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Upload zone remains full width.  
**Mobile behaviour:** Drag copy remains, browse button emphasized.  
**Main components:** Drop zone, browse option, supported file guidance, template link.  
**Primary action:** Browse files / upload.  
**Secondary actions:** Download sample template, back.  
**User interactions:** Drag file, browse file, remove file, replace file.  
**Loading state:** Upload progress and file validation message.  
**Empty state:** Drop zone with guidance.  
**Error state:** Unsupported file, unreadable file, upload failed.  
**Success state:** File accepted and continue enabled.  
**Accessibility notes:** Drop zone must be operable without drag-and-drop.  
**Future enhancements:** Direct integrations.

### Data Preview

**Page purpose:** Validate uploaded data before analysis.  
**Primary users:** Analysts.  
**Business objective:** Prevent wrong-file and wrong-column analysis.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Data Preview                                                                    |
| File summary: filename | rows | columns                                         |
| Detected columns panel        | First 10 rows table                             |
| Feedback column selector      |                                                 |
| [Back] [Continue]                                                               |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Column panel stacks above table.  
**Mobile behaviour:** Columns list first; table scrolls horizontally.  
**Main components:** File metadata, detected columns, preview table, feedback selector.  
**Primary action:** Continue.  
**Secondary actions:** Back, replace file.  
**User interactions:** Select feedback column, inspect table.  
**Loading state:** Preview table skeleton.  
**Empty state:** No rows detected.  
**Error state:** Missing headers, malformed file.  
**Success state:** Feedback column selected.  
**Accessibility notes:** Table requires proper headers; selector requires label.  
**Future enhancements:** Smart feedback column recommendation.

### Configure Analysis

**Page purpose:** Confirm analysis settings.  
**Primary users:** Analysts, research leads.  
**Business objective:** Increase user confidence before running AI analysis.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Configure Analysis                                                              |
| Selected feedback column                                                        |
| Optional context fields                                                         |
| Analysis summary: rows, language, output types                                  |
| [Back] [Run Analysis]                                                           |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Settings groups stack.  
**Mobile behaviour:** One setting group per section.  
**Main components:** Selected column, context summary, output summary, run button.  
**Primary action:** Run Analysis.  
**Secondary actions:** Back, edit selected column.  
**User interactions:** Confirm or adjust settings.  
**Loading state:** Validation loading.  
**Empty state:** Missing required column selection.  
**Error state:** Invalid configuration.  
**Success state:** Analysis starts.  
**Accessibility notes:** Summaries must not rely on color alone.  
**Future enhancements:** Custom taxonomy and segmentation fields.

### Processing

**Page purpose:** Show analysis progress.  
**Primary users:** Analysts.  
**Business objective:** Maintain trust during longer AI operations.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Analysing feedback                                                              |
| Progress indicator                                                              |
| Stage list: Parsing | Batching | Themes | Sentiment | Report                   |
| Current batch status                                                            |
| Message: You can safely wait while SurveyIQ generates insights.                 |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Stage list stacks.  
**Mobile behaviour:** Compact progress and current stage only.  
**Main components:** Progress indicator, stage status, batch status, reassurance copy.  
**Primary action:** None during processing.  
**Secondary actions:** Cancel in future, return later in future.  
**User interactions:** Wait, possibly navigate away in future.  
**Loading state:** This is the loading state.  
**Empty state:** Not applicable.  
**Error state:** Analysis Failed page/state.  
**Success state:** Redirect to Analysis Results.  
**Accessibility notes:** Progress updates should be announced politely.  
**Future enhancements:** Background jobs and notifications.

### Analysis Results

**Page purpose:** Present analysis findings and exports.  
**Primary users:** Analysts, managers, research leads.  
**Business objective:** Deliver insight and drive report usage.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Analysis Results                            [Download CSV] [Generate Report]   |
| Executive summary                                                               |
| Theme bar chart                         Sentiment donut                         |
| Top themes                              Key risks                               |
| Recommended actions                                                              |
| Response table: response | theme | sentiment | confidence | reason             |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Charts stack; response table remains scrollable.  
**Mobile behaviour:** Summary cards first; table becomes cards or horizontal scroll.  
**Main components:** Executive summary, charts, themes, risks, recommendations, response table, downloads.  
**Primary action:** Generate Report.  
**Secondary actions:** Download CSV, review themes, review sentiment.  
**User interactions:** Sort/filter table, open theme review, download outputs.  
**Loading state:** Results skeleton after processing.  
**Empty state:** No results generated.  
**Error state:** Results unavailable or analysis failed.  
**Success state:** Results render with exports available.  
**Accessibility notes:** Charts need text summaries; table needs sortable labels.  
**Future enhancements:** Editable themes and low-confidence review.

### Theme Review

**Page purpose:** Review generated themes in a card-based interface.  
**Primary users:** Analysts, research leads.  
**Business objective:** Improve trust and prepare report-ready theme interpretation.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Theme Review                                                    [Apply Changes] |
| Theme cards grid:                                                               |
| [Theme name | count | sentiment mix | examples | actions]                       |
| [Theme name | count | sentiment mix | examples | actions]                       |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards become two columns.  
**Mobile behaviour:** Cards stack.  
**Main components:** Theme cards, counts, examples, merge/rename placeholders.  
**Primary action:** Apply Changes in future.  
**Secondary actions:** Back to results, inspect examples.  
**User interactions:** Expand card, review examples, future merge/rename.  
**Loading state:** Card skeletons.  
**Empty state:** No themes found.  
**Error state:** Theme load failure.  
**Success state:** Themes reviewed or updated in future.  
**Accessibility notes:** Cards need clear headings and button labels.  
**Future enhancements:** Theme editing, merging, taxonomy mapping.

### Sentiment Review

**Page purpose:** Inspect sentiment distribution and drivers.  
**Primary users:** Analysts, managers.  
**Business objective:** Help users understand emotional tone and negative drivers.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Sentiment Review                                                                |
| Donut chart | Sentiment count cards                                             |
| Negative drivers table                                                          |
| Positive highlights table                                                       |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Chart and cards stack.  
**Mobile behaviour:** Sentiment cards before chart.  
**Main components:** Donut chart, sentiment counts, drivers, response examples.  
**Primary action:** Return to Results.  
**Secondary actions:** Filter responses, download CSV.  
**User interactions:** Filter by sentiment, inspect examples.  
**Loading state:** Chart skeleton.  
**Empty state:** No sentiment results.  
**Error state:** Sentiment data unavailable.  
**Success state:** Sentiment breakdown is clear.  
**Accessibility notes:** Include exact counts and percentages in text.  
**Future enhancements:** Sentiment calibration.

### Reports Library

**Page purpose:** Store and find generated reports.  
**Primary users:** Analysts, executives, managers.  
**Business objective:** Make generated outputs reusable.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Reports                                             [New Analysis]              |
| Search | Filters: Project Date Owner                                           |
| Reports table: Name | Project | Created | Type | Downloads | Actions           |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Filters collapse.  
**Mobile behaviour:** Report cards.  
**Main components:** Search, filters, reports table, download actions.  
**Primary action:** Open report.  
**Secondary actions:** Download PDF, download CSV, archive.  
**User interactions:** Search, filter, open, download.  
**Loading state:** Table skeleton.  
**Empty state:** No reports with new analysis CTA.  
**Error state:** Reports failed to load.  
**Success state:** Report list loads.  
**Accessibility notes:** Download buttons must identify file type.  
**Future enhancements:** Scheduled reports.

### Report Detail

**Page purpose:** Present one management report in app.  
**Primary users:** Executives, managers, analysts.  
**Business objective:** Make insights consumable without opening raw data.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Report Detail                              [Download PDF] [Download CSV]        |
| Executive summary                                                               |
| Sentiment summary | Theme distribution                                          |
| Positive highlights | Negative highlights                                      |
| Key risks | Recommended actions                                                |
| AI conclusions                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Two-column sections stack.  
**Mobile behaviour:** Report sections become document-style stack.  
**Main components:** Report sections, charts, source metadata, download actions.  
**Primary action:** Download PDF.  
**Secondary actions:** Download CSV, preview PDF, open source analysis.  
**User interactions:** Scroll sections, download, open PDF preview.  
**Loading state:** Report skeleton.  
**Empty state:** Report has no content due to failed generation.  
**Error state:** Report not found.  
**Success state:** Report renders and exports are available.  
**Accessibility notes:** Report structure needs semantic heading order.  
**Future enhancements:** Comments and approvals.

### Report Builder

**Page purpose:** Configure report content before export.  
**Primary users:** Analysts, research leads.  
**Business objective:** Give users controlled report generation without overcomplicating MVP.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Report Builder                                                                  |
| Stepper: Sections -> Charts -> Review -> Generate                               |
| Section checklist                                                               |
| Preview summary panel                                                           |
| [Back] [Continue]                                                               |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Preview panel moves below settings.  
**Mobile behaviour:** One wizard step per screen.  
**Main components:** Wizard, section toggles, chart options, preview summary.  
**Primary action:** Generate Report.  
**Secondary actions:** Back, save draft in future.  
**User interactions:** Select sections, configure chart inclusion, generate.  
**Loading state:** Generating report state.  
**Empty state:** No analysis selected.  
**Error state:** Report generation failed.  
**Success state:** Report generated and opens preview.  
**Accessibility notes:** Checkboxes require clear labels.  
**Future enhancements:** Brand templates and custom report title.

### PDF Preview

**Page purpose:** Let users review a generated PDF before sharing.  
**Primary users:** Analysts, executives.  
**Business objective:** Increase confidence in report quality.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| PDF Preview                                  [Download PDF] [Back to Report]    |
| PDF viewer large                                                                  |
| Metadata panel: project, date, analysis, pages                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Metadata panel moves below viewer.  
**Mobile behaviour:** PDF opens in native viewer or simplified preview.  
**Main components:** PDF viewer, metadata, download button.  
**Primary action:** Download PDF.  
**Secondary actions:** Back to report, regenerate in future.  
**User interactions:** Scroll pages, download, return.  
**Loading state:** PDF loading indicator.  
**Empty state:** PDF not generated.  
**Error state:** PDF unavailable.  
**Success state:** PDF preview loads.  
**Accessibility notes:** Provide report text sections outside PDF where possible.  
**Future enhancements:** Inline annotations.

### AI Assistant Slide-Out Panel

**Page purpose:** Provide contextual assistance without replacing the primary workflow.  
**Primary users:** Analysts, managers.  
**Business objective:** Help users interpret results and navigate workflows.

**Desktop wireframe:**

```text
+ App Shell ----------------------------------------------------+----------------+
| Current page content                                          | AI Assistant   |
|                                                               | Context summary|
|                                                               | Suggested Qs   |
|                                                               | Conversation   |
|                                                               | Input          |
+---------------------------------------------------------------+----------------+
```

**Tablet behaviour:** Panel overlays from right.  
**Mobile behaviour:** Full-screen drawer.  
**Main components:** Context summary, suggested prompts, conversation, input.  
**Primary action:** Ask question.  
**Secondary actions:** Close panel, insert suggestion in future.  
**User interactions:** Open panel, ask about current analysis/report, close.  
**Loading state:** Assistant thinking state.  
**Empty state:** Suggested questions.  
**Error state:** Assistant unavailable.  
**Success state:** Helpful contextual response appears.  
**Accessibility notes:** Focus should move into drawer and return on close.  
**Future enhancements:** Report drafting support.

### Data Sources

**Page purpose:** Manage future data import sources.  
**Primary users:** Analysts, admins.  
**Business objective:** Prepare for repeatable imports beyond manual upload.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Data Sources                                      [Add Data Source]             |
| Manual upload card | Future connector cards                                     |
| Source table: Name | Type | Status | Last sync | Actions                        |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Source cards stack two columns.  
**Mobile behaviour:** Source cards stack one column.  
**Main components:** Manual upload source, connector placeholders, source table.  
**Primary action:** Add Data Source.  
**Secondary actions:** Upload file, disconnect in future.  
**User interactions:** Open source, add connector in future.  
**Loading state:** Source list skeleton.  
**Empty state:** Manual upload only with upload CTA.  
**Error state:** Source list unavailable.  
**Success state:** Sources visible.  
**Accessibility notes:** Connector status must include text.  
**Future enhancements:** Qualtrics, Typeform, SurveyMonkey, Google Sheets.

### Team / Members

**Page purpose:** Manage workspace users.  
**Primary users:** Workspace admins, team leads.  
**Business objective:** Enable collaboration when SaaS team features are introduced.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Team                                                [Invite Member]             |
| Members table: Name | Email | Role | Status | Last active | Actions            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Filters and actions stack.  
**Mobile behaviour:** Member cards.  
**Main components:** Members table, invite action, role selector.  
**Primary action:** Invite Member.  
**Secondary actions:** Change role, remove member.  
**User interactions:** Invite, edit role, revoke invite.  
**Loading state:** Member skeleton.  
**Empty state:** No teammates invited.  
**Error state:** Invite failed or permission denied.  
**Success state:** Invite sent.  
**Accessibility notes:** Role changes require confirmation text.  
**Future enhancements:** Groups and project permissions.

### Workspace Settings

**Page purpose:** Configure workspace details.  
**Primary users:** Workspace admins.  
**Business objective:** Establish workspace identity and defaults.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Settings / Workspace                                                            |
| Workspace name                                                                  |
| Logo placeholder                                                                |
| Locale and defaults                                                             |
| [Save Changes]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Form remains single column.  
**Mobile behaviour:** Single-column form.  
**Main components:** Workspace name, logo placeholder, default settings, save button.  
**Primary action:** Save Changes.  
**Secondary actions:** Cancel.  
**User interactions:** Edit fields, save.  
**Loading state:** Save loading.  
**Empty state:** Default workspace settings.  
**Error state:** Save failed.  
**Success state:** Settings saved.  
**Accessibility notes:** Form labels and validation required.  
**Future enhancements:** Custom domains and brand kit.

### Billing

**Page purpose:** Manage subscription and billing.  
**Primary users:** Owners, finance users.  
**Business objective:** Support commercial SaaS monetization.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Billing                                                                         |
| Current plan card | Usage summary                                               |
| Payment method | Invoices table                                                |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards stack.  
**Mobile behaviour:** Single-column billing cards.  
**Main components:** Plan card, usage, payment method, invoices.  
**Primary action:** Manage Plan.  
**Secondary actions:** Update payment, download invoice.  
**User interactions:** Open billing portal, view invoice.  
**Loading state:** Billing data loading.  
**Empty state:** No billing data for trial.  
**Error state:** Billing unavailable.  
**Success state:** Billing action completed.  
**Accessibility notes:** Invoice links identify date and amount.  
**Future enhancements:** Enterprise contract management.

### Usage

**Page purpose:** Show usage against limits.  
**Primary users:** Admins, owners.  
**Business objective:** Help users understand consumption and plan fit.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Usage                                                                           |
| Usage cards: responses analysed | reports | storage | API usage                |
| Usage trend chart                                                               |
| Usage table by project                                                          |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards wrap.  
**Mobile behaviour:** Cards stack; chart simplified.  
**Main components:** Usage cards, trend chart, project usage table.  
**Primary action:** View Billing.  
**Secondary actions:** Export usage in future.  
**User interactions:** Filter date range, inspect project usage.  
**Loading state:** Usage skeleton.  
**Empty state:** No usage yet.  
**Error state:** Usage unavailable.  
**Success state:** Usage displayed.  
**Accessibility notes:** Usage charts need table equivalents.  
**Future enhancements:** Usage alerts.

### Integrations

**Page purpose:** Manage third-party integrations.  
**Primary users:** Admins, analysts.  
**Business objective:** Enable scalable data ingestion in future.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Integrations                                                                    |
| Integration cards: CSV Upload | Google Sheets | Survey tools                    |
| Connected integrations table                                                    |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards two columns.  
**Mobile behaviour:** Cards stack.  
**Main components:** Integration cards, connection status, connect buttons.  
**Primary action:** Connect Integration.  
**Secondary actions:** Disconnect, configure.  
**User interactions:** Connect, disconnect, view status.  
**Loading state:** Integration status loading.  
**Empty state:** No integrations connected.  
**Error state:** Connection failed.  
**Success state:** Integration connected.  
**Accessibility notes:** Status badges require text.  
**Future enhancements:** Qualtrics, Typeform, SurveyMonkey, Salesforce.

### API Keys

**Page purpose:** Manage developer API access.  
**Primary users:** Developers, admins.  
**Business objective:** Support future programmatic access.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| API Keys                                             [Create API Key]           |
| Keys table: Name | Prefix | Scopes | Created | Last used | Actions             |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Table scrolls horizontally.  
**Mobile behaviour:** Key cards with actions.  
**Main components:** API key table, create modal, revoke action.  
**Primary action:** Create API Key.  
**Secondary actions:** Revoke, copy once.  
**User interactions:** Create, copy, revoke.  
**Loading state:** Key list skeleton.  
**Empty state:** No API keys.  
**Error state:** Create/revoke failed.  
**Success state:** Key created and shown once.  
**Accessibility notes:** Secret values must be handled carefully and not repeated.  
**Future enhancements:** Webhooks and scoped keys.

### Notifications

**Page purpose:** Manage notification preferences.  
**Primary users:** Analysts, managers.  
**Business objective:** Support timely awareness without noise.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Notifications                                                                   |
| Email preferences                                                               |
| Report completion alerts                                                        |
| Risk alert placeholders                                                         |
| [Save Changes]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Form remains single column.  
**Mobile behaviour:** Single-column toggles.  
**Main components:** Toggles, email settings, save action.  
**Primary action:** Save Changes.  
**Secondary actions:** Reset defaults.  
**User interactions:** Toggle preferences, save.  
**Loading state:** Save loading.  
**Empty state:** Default preferences.  
**Error state:** Save failed.  
**Success state:** Preferences saved.  
**Accessibility notes:** Toggles need clear on/off labels.  
**Future enhancements:** Slack and Teams alerts.

### Profile

**Page purpose:** Let users manage personal settings.  
**Primary users:** All authenticated users.  
**Business objective:** Support account self-service.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Profile                                                                         |
| Name | Email | Password management                                             |
| Preferences                                                                     |
| [Save Changes]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Single-column form.  
**Mobile behaviour:** Single-column form.  
**Main components:** Profile fields, password action, preferences.  
**Primary action:** Save Changes.  
**Secondary actions:** Change password, log out.  
**User interactions:** Edit profile, save.  
**Loading state:** Save loading.  
**Empty state:** Current profile data.  
**Error state:** Save failed.  
**Success state:** Profile updated.  
**Accessibility notes:** Required fields and validation messages.  
**Future enhancements:** Avatar and locale preferences.

## ADMIN

### Admin Overview

**Page purpose:** Internal operational overview.  
**Primary users:** SurveyIQ internal admins.  
**Business objective:** Monitor SaaS health and customer usage.

**Desktop wireframe:**

```text
+ Admin Shell -------------------------------------------------------------------+
| Admin Overview                                                                  |
| KPI cards: tenants | analyses | failures | model cost                           |
| System health | Recent incidents | High-usage tenants                          |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards and panels stack.  
**Mobile behaviour:** Limited admin view, cards first.  
**Main components:** KPI cards, health panels, tenant list.  
**Primary action:** Open Tenant Management.  
**Secondary actions:** View jobs, view logs.  
**User interactions:** Filter, drill into tenant.  
**Loading state:** Admin dashboard skeleton.  
**Empty state:** No tenants in development.  
**Error state:** Admin data unavailable.  
**Success state:** Operational status visible.  
**Accessibility notes:** Admin charts need text values.  
**Future enhancements:** Revenue and churn dashboards.

### Tenant Management

**Page purpose:** Manage customer workspaces.  
**Primary users:** Internal admins, support.  
**Business objective:** Support operations and customer management.

**Desktop wireframe:**

```text
+ Admin Shell -------------------------------------------------------------------+
| Tenant Management                                                               |
| Search | Filters                                                                |
| Tenant table: Workspace | Plan | Owner | Status | Usage | Actions              |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Table scrolls.  
**Mobile behaviour:** Admin cards.  
**Main components:** Tenant table, filters, actions.  
**Primary action:** Open tenant.  
**Secondary actions:** Suspend, update plan in future.  
**User interactions:** Search, filter, open tenant.  
**Loading state:** Table skeleton.  
**Empty state:** No tenants.  
**Error state:** Tenant load failure.  
**Success state:** Tenant list displayed.  
**Accessibility notes:** High-risk actions require confirmation.  
**Future enhancements:** Tenant health score.

### Job Queue

**Page purpose:** Monitor analysis and report jobs.  
**Primary users:** Internal admins, engineers.  
**Business objective:** Diagnose processing failures.

**Desktop wireframe:**

```text
+ Admin Shell -------------------------------------------------------------------+
| Job Queue                                                                       |
| Filters: Status Type Tenant Date                                                |
| Job table: ID | Type | Status | Duration | Tenant | Error | Actions            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Filters collapse.  
**Mobile behaviour:** Job cards.  
**Main components:** Job filters, job table, retry action.  
**Primary action:** Inspect job.  
**Secondary actions:** Retry failed job in future.  
**User interactions:** Filter, inspect, retry.  
**Loading state:** Job table skeleton.  
**Empty state:** No jobs.  
**Error state:** Queue unavailable.  
**Success state:** Jobs visible.  
**Accessibility notes:** Status labels must include text.  
**Future enhancements:** Queue scaling controls.

### Model Usage

**Page purpose:** Track AI usage and cost.  
**Primary users:** Internal admins, finance, engineering.  
**Business objective:** Manage AI cost and reliability.

**Desktop wireframe:**

```text
+ Admin Shell -------------------------------------------------------------------+
| Model Usage                                                                     |
| Cost cards | Token usage | Failure rate | Latency                               |
| Usage charts                                                                    |
| Usage by tenant table                                                           |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Cards wrap; charts stack.  
**Mobile behaviour:** Summary cards and simplified tables.  
**Main components:** Cost cards, charts, tenant usage table.  
**Primary action:** Filter usage.  
**Secondary actions:** Export usage.  
**User interactions:** Filter by date/model/tenant.  
**Loading state:** Chart skeletons.  
**Empty state:** No usage data.  
**Error state:** Usage unavailable.  
**Success state:** Usage visible.  
**Accessibility notes:** Provide exact values alongside charts.  
**Future enhancements:** Model routing controls.

### Audit Log

**Page purpose:** Track important actions.  
**Primary users:** Admins, security teams.  
**Business objective:** Support accountability and compliance.

**Desktop wireframe:**

```text
+ Admin Shell -------------------------------------------------------------------+
| Audit Log                                                                       |
| Filters: Actor Action Resource Date                                             |
| Log table: Time | Actor | Action | Resource | IP | Details                      |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Table scrolls.  
**Mobile behaviour:** Log cards.  
**Main components:** Filters, log table, detail drawer.  
**Primary action:** Filter log.  
**Secondary actions:** Export log.  
**User interactions:** Filter, open detail, export.  
**Loading state:** Log skeleton.  
**Empty state:** No audit events.  
**Error state:** Audit log unavailable.  
**Success state:** Logs visible.  
**Accessibility notes:** Time and action labels must be clear.  
**Future enhancements:** SIEM export.

## ERROR / SYSTEM PAGES

### 404 Not Found

**Page purpose:** Handle missing pages.  
**Primary users:** All users.  
**Business objective:** Recover navigation gracefully.

**Desktop wireframe:**

```text
+ Centered State ----------------------------------------------------------------+
| Page not found                                                                  |
| The page may have moved or no longer exists.                                    |
| [Go to Dashboard] [Go Home]                                                     |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Same centered state.  
**Mobile behaviour:** Full-width centered message.  
**Main components:** Error title, explanation, recovery actions.  
**Primary action:** Go to Dashboard.  
**Secondary actions:** Go Home.  
**User interactions:** Navigate away.  
**Loading state:** Not applicable.  
**Empty state:** Not applicable.  
**Error state:** This is the error state.  
**Success state:** User reaches valid page.  
**Accessibility notes:** Page title must announce error.  
**Future enhancements:** Contextual suggestions.

### 403 Access Denied

**Page purpose:** Explain permission restrictions.  
**Primary users:** Authenticated users.  
**Business objective:** Prevent confusion and support access recovery.

**Desktop wireframe:**

```text
+ Centered State ----------------------------------------------------------------+
| Access denied                                                                   |
| You do not have permission to view this resource.                               |
| [Request Access] [Return to Dashboard]                                          |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Same centered state.  
**Mobile behaviour:** Single-column actions.  
**Main components:** Permission message, request access CTA.  
**Primary action:** Return to Dashboard.  
**Secondary actions:** Request Access in future.  
**User interactions:** Navigate or request access.  
**Loading state:** Request loading.  
**Empty state:** Not applicable.  
**Error state:** Access denied.  
**Success state:** User returns to permitted area.  
**Accessibility notes:** Avoid ambiguous permission language.  
**Future enhancements:** Access request workflow.

### 500 Server Error

**Page purpose:** Handle unexpected system errors.  
**Primary users:** All users.  
**Business objective:** Preserve trust during failures.

**Desktop wireframe:**

```text
+ Centered State ----------------------------------------------------------------+
| Something went wrong                                                            |
| We could not complete the request.                                              |
| Error reference: optional                                                       |
| [Retry] [Go to Dashboard] [Contact Support]                                     |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Same centered state.  
**Mobile behaviour:** Actions stack.  
**Main components:** Error message, retry, support link.  
**Primary action:** Retry.  
**Secondary actions:** Dashboard, support.  
**User interactions:** Retry, navigate.  
**Loading state:** Retry loading.  
**Empty state:** Not applicable.  
**Error state:** Server error.  
**Success state:** Retry succeeds or user exits.  
**Accessibility notes:** Error must be announced and focus moved to message.  
**Future enhancements:** Error reference IDs.

### Analysis Failed

**Page purpose:** Explain failed AI or file analysis.  
**Primary users:** Analysts.  
**Business objective:** Help users recover without losing trust.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Analysis failed                                                                 |
| Reason panel: failed stage / batch / file issue                                 |
| What was saved?                                                                 |
| [Retry Analysis] [Change Settings] [Upload New File]                            |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Action buttons stack below reason.  
**Mobile behaviour:** Single-column recovery steps.  
**Main components:** Failure reason, saved-state note, retry actions.  
**Primary action:** Retry Analysis.  
**Secondary actions:** Change settings, upload new file, contact support.  
**User interactions:** Retry or adjust workflow.  
**Loading state:** Retry loading.  
**Empty state:** Not applicable.  
**Error state:** Analysis failure details.  
**Success state:** Retry enters processing.  
**Accessibility notes:** Keep language clear and non-technical where possible.  
**Future enhancements:** Partial recovery.

### Maintenance

**Page purpose:** Communicate planned or emergency downtime.  
**Primary users:** All users.  
**Business objective:** Preserve trust during unavailable periods.

**Desktop wireframe:**

```text
+ Centered State ----------------------------------------------------------------+
| SurveyIQ is temporarily unavailable                                             |
| Maintenance message and estimated return time                                   |
| [View Status] [Contact Support]                                                 |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Same centered state.  
**Mobile behaviour:** Single-column actions.  
**Main components:** Maintenance message, ETA, status link.  
**Primary action:** View Status.  
**Secondary actions:** Contact Support.  
**User interactions:** Open status page.  
**Loading state:** Not applicable.  
**Empty state:** Not applicable.  
**Error state:** Maintenance page.  
**Success state:** Service restored.  
**Accessibility notes:** Use clear time and status wording.  
**Future enhancements:** Regional status messaging.

## FUTURE ENTERPRISE

### Enterprise Overview (Future)

**Page purpose:** Present enterprise capabilities.  
**Primary users:** Enterprise buyers, IT, procurement.  
**Business objective:** Support enterprise sales.

**Desktop wireframe:**

```text
+ Public/Header -----------------------------------------------------------------+
| Enterprise SurveyIQ                                                             |
| Security | Governance | Scale | Integrations                                    |
| [Contact Sales]                                                                 |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Feature tiles stack.  
**Mobile behaviour:** One-column enterprise story.  
**Main components:** Enterprise value props, security/governance sections, CTA.  
**Primary action:** Contact Sales.  
**Secondary actions:** View Security.  
**User interactions:** Contact sales, explore sections.  
**Loading state:** Not expected.  
**Empty state:** Not applicable.  
**Error state:** Contact form failure.  
**Success state:** Sales inquiry submitted.  
**Accessibility notes:** Avoid vague compliance claims.  
**Future enhancements:** Procurement package.

### SSO Configuration (Future)

**Page purpose:** Configure enterprise SSO.  
**Primary users:** IT admins.  
**Business objective:** Enable secure enterprise access.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| SSO Configuration                                                               |
| Provider settings | Metadata | Test connection                                  |
| [Save] [Test SSO] [Enforce SSO]                                                 |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Form sections stack.  
**Mobile behaviour:** Admin-only compact form.  
**Main components:** Provider fields, metadata, test action.  
**Primary action:** Test SSO.  
**Secondary actions:** Save, enforce.  
**User interactions:** Configure, test, save.  
**Loading state:** Testing connection.  
**Empty state:** No SSO configured.  
**Error state:** Test failed.  
**Success state:** SSO verified.  
**Accessibility notes:** Technical fields need help text.  
**Future enhancements:** SCIM provisioning.

### Data Governance (Future)

**Page purpose:** Manage retention and compliance settings.  
**Primary users:** IT, legal, admins.  
**Business objective:** Support enterprise governance.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Data Governance                                                                 |
| Retention rules | Deletion policy | Data export                                 |
| [Save Changes]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Policy cards stack.  
**Mobile behaviour:** Single-column governance sections.  
**Main components:** Retention settings, deletion settings, export action.  
**Primary action:** Save Changes.  
**Secondary actions:** Export data.  
**User interactions:** Configure policy, save.  
**Loading state:** Saving policy.  
**Empty state:** Default retention policy.  
**Error state:** Save failed.  
**Success state:** Governance settings saved.  
**Accessibility notes:** Explain consequences before destructive settings.  
**Future enhancements:** Legal hold and data residency.

### Custom Taxonomy (Future)

**Page purpose:** Manage approved theme taxonomy.  
**Primary users:** Research leads, admins.  
**Business objective:** Standardize theme naming and reporting.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Custom Taxonomy                                      [Add Theme]                |
| Theme tree/list                                                                  |
| Mapping rules panel                                                              |
| [Save Taxonomy]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Theme list and rules stack.  
**Mobile behaviour:** Theme list first, editor opens full screen.  
**Main components:** Theme list, add/edit theme, mapping rules.  
**Primary action:** Save Taxonomy.  
**Secondary actions:** Add theme, import taxonomy.  
**User interactions:** Add, edit, reorder, map themes.  
**Loading state:** Taxonomy loading.  
**Empty state:** No custom taxonomy.  
**Error state:** Save conflict or validation error.  
**Success state:** Taxonomy saved.  
**Accessibility notes:** Reordering must have keyboard alternative.  
**Future enhancements:** Taxonomy versioning.

### Benchmarking (Future)

**Page purpose:** Compare results against historical or industry benchmarks.  
**Primary users:** Executives, strategy teams.  
**Business objective:** Add strategic context to insights.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Benchmarking                                                                    |
| Benchmark selector | Date range                                                 |
| Comparison charts: sentiment trend | theme rank | percentile                    |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Charts stack.  
**Mobile behaviour:** Summary cards before charts.  
**Main components:** Benchmark selector, comparison charts, summary cards.  
**Primary action:** Select Benchmark.  
**Secondary actions:** Export comparison.  
**User interactions:** Select benchmark, filter date, inspect chart.  
**Loading state:** Benchmark loading.  
**Empty state:** No benchmark available.  
**Error state:** Benchmark unavailable.  
**Success state:** Comparison displays.  
**Accessibility notes:** Benchmark charts require text summaries.  
**Future enhancements:** Industry benchmark marketplace.

### Advanced Permissions (Future)

**Page purpose:** Configure granular access control.  
**Primary users:** Admins, IT.  
**Business objective:** Support enterprise security requirements.

**Desktop wireframe:**

```text
+ App Shell ---------------------------------------------------------------------+
| Advanced Permissions                                                            |
| Groups list | Permission matrix                                                 |
| Resource access rules                                                           |
| [Save Changes]                                                                  |
+--------------------------------------------------------------------------------+
```

**Tablet behaviour:** Matrix scrolls horizontally.  
**Mobile behaviour:** Group cards and permission detail screens.  
**Main components:** Groups, permission matrix, resource rules.  
**Primary action:** Save Changes.  
**Secondary actions:** Add group, duplicate role.  
**User interactions:** Edit permissions, save, confirm risky changes.  
**Loading state:** Permission loading.  
**Empty state:** Default roles only.  
**Error state:** Save failed or conflict.  
**Success state:** Permissions updated.  
**Accessibility notes:** Matrix must be navigable and labeled.  
**Future enhancements:** Attribute-based access control.

## 10. Future Enhancements

- Add high-fidelity visual mockups after page specifications are approved.
- Add component-level acceptance criteria.
- Add dashboard-specific chart interaction specs.
- Add detailed report builder step definitions.
- Add mobile-specific wireframes for the analysis wizard.
- Add AI Assistant prompt library and safety behaviour.
- Add enterprise admin workflows when roadmap timing is confirmed.

## 11. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [03_User_Journey.md](03_User_Journey.md)
- [05_Design_System.md](05_Design_System.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
