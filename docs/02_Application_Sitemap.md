# SurveyIQ Application Sitemap

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document defines the complete application sitemap for SurveyIQ as a commercial SaaS platform. It includes public pages, authenticated app pages, analysis workflow pages, dashboards, reports, settings, admin areas, error states, and future enterprise pages.

## Table of Contents

1. Product Structure
2. Public Pages
3. Authentication Pages
4. Authenticated Core App
5. Analysis Workflow Pages
6. Dashboard Pages
7. Report Pages
8. Settings Pages
9. Admin Pages
10. Error and System Pages
11. Future Enterprise Pages
12. Commercial SaaS Hierarchy
13. Related Documents

## 1. Product Structure

SurveyIQ should be organized around five major zones:

1. Public marketing site.
2. Authentication and onboarding.
3. Core authenticated application.
4. Admin and workspace management.
5. Future enterprise capabilities.

## 2. Public Pages

### Home Page

**Purpose:** Explain SurveyIQ's value proposition and drive signups or demos.  
**Primary users:** Prospects, executives, research teams, CX leaders.  
**Main components:** Hero, product screenshots, use cases, benefits, social proof, CTA.  
**User actions:** Start free trial, book demo, view examples.  
**Navigation links:** Product, Solutions, Pricing, Resources, Login.  
**Future enhancements:** Interactive demo, ROI calculator, industry-specific landing variants.

### Product Overview

**Purpose:** Explain how SurveyIQ turns raw feedback into insights.  
**Primary users:** Buyers, analysts, product leaders.  
**Main components:** Workflow overview, AI analysis features, report examples.  
**User actions:** Explore features, request demo.  
**Navigation links:** Features, Reports, Integrations, Pricing.  
**Future enhancements:** Feature comparison by plan.

### Solutions

**Purpose:** Position SurveyIQ for different business teams.  
**Primary users:** CX, HR, Product, Marketing, Research, Operations.  
**Main components:** Use-case cards, outcomes, sample reports.  
**User actions:** Select solution, book demo.  
**Navigation links:** Customer Experience, Employee Feedback, Product Research.  
**Future enhancements:** Industry vertical pages.

### Pricing

**Purpose:** Explain plans and conversion paths.  
**Primary users:** Buyers, finance, team leads.  
**Main components:** Plan cards, usage limits, feature matrix, FAQ.  
**User actions:** Start trial, contact sales.  
**Navigation links:** Compare plans, Enterprise, FAQ.  
**Future enhancements:** Usage estimator.

### Report Examples

**Purpose:** Showcase executive-ready outputs.  
**Primary users:** Executives, analysts, potential buyers.  
**Main components:** Sample PDF previews, dashboard screenshots, insight examples.  
**User actions:** View sample report, download gated example.  
**Navigation links:** Product, Pricing, Demo.  
**Future enhancements:** Interactive anonymized report viewer.

### Resources

**Purpose:** Host education and content marketing.  
**Primary users:** Prospects, customers.  
**Main components:** Blog, guides, templates, webinars.  
**User actions:** Read, download, subscribe.  
**Navigation links:** Blog, Guides, Templates, Webinars.  
**Future enhancements:** Research benchmark reports.

### Security

**Purpose:** Build trust for data-sensitive buyers.  
**Primary users:** IT, security, procurement.  
**Main components:** Data handling, encryption, retention, subprocessors, compliance roadmap.  
**User actions:** Contact security, request documentation.  
**Navigation links:** Privacy, Terms, Contact Sales.  
**Future enhancements:** SOC 2 portal, trust center.

### Contact / Book Demo

**Purpose:** Capture high-intent leads.  
**Primary users:** Buyers, enterprise prospects.  
**Main components:** Form, calendar embed, qualification fields.  
**User actions:** Submit inquiry, book meeting.  
**Navigation links:** Pricing, Product, Security.  
**Future enhancements:** Routing by company size.

## 3. Authentication Pages

### Login

**Purpose:** Let users access their workspace.  
**Primary users:** Existing users.  
**Main components:** Email/password, SSO option, forgot password.  
**User actions:** Login, reset password.  
**Navigation links:** Signup, Forgot Password.  
**Future enhancements:** SAML/OIDC SSO.

### Signup

**Purpose:** Create a new account or workspace.  
**Primary users:** New users.  
**Main components:** Account form, workspace name, plan selection.  
**User actions:** Create account, accept terms.  
**Navigation links:** Login, Pricing.  
**Future enhancements:** Invite-based signup.

### Forgot Password

**Purpose:** Password recovery.  
**Primary users:** Existing users.  
**Main components:** Email input, confirmation state.  
**User actions:** Request reset link.  
**Navigation links:** Login.  
**Future enhancements:** Magic link login.

### Onboarding

**Purpose:** Guide new users to first successful analysis.  
**Primary users:** New workspace owners, analysts.  
**Main components:** Role selection, sample data option, upload prompt, guided checklist.  
**User actions:** Upload first file, invite teammate, configure workspace.  
**Navigation links:** Dashboard, New Analysis.  
**Future enhancements:** Personalized onboarding by use case.

## 4. Authenticated Core App

### Main App Dashboard

**Purpose:** Give users a workspace overview.  
**Primary users:** Analysts, managers, executives.  
**Main components:** Recent analyses, key sentiment trends, top themes, report shortcuts.  
**User actions:** Start analysis, open report, download outputs.  
**Navigation links:** Projects, Analyses, Reports, Upload.  
**Future enhancements:** Cross-project trend monitoring.

### Projects

**Purpose:** Organize survey work by initiative.  
**Primary users:** Analysts, research leads, CX teams.  
**Main components:** Project list, status, owner, last updated, tags.  
**User actions:** Create project, open project, archive project.  
**Navigation links:** Dashboard, New Project, Reports.  
**Future enhancements:** Project templates.

### Project Detail

**Purpose:** Central workspace for one survey or research initiative.  
**Primary users:** Analysts, managers.  
**Main components:** Analyses, uploaded files, reports, collaborators, project notes.  
**User actions:** Upload data, rerun analysis, generate report.  
**Navigation links:** Analyses, Reports, Settings.  
**Future enhancements:** Longitudinal tracking across waves.

## 5. Analysis Workflow Pages

### New Analysis

**Purpose:** Start a new feedback analysis.  
**Primary users:** Analysts, operators, researchers.  
**Main components:** Upload zone, file type guidance, sample file link.  
**User actions:** Upload CSV/Excel, choose project.  
**Navigation links:** Dashboard, Projects, Help.  
**Future enhancements:** Connector imports.

### Data Preview

**Purpose:** Let users validate uploaded data before analysis.  
**Primary users:** Analysts.  
**Main components:** First rows preview, detected columns, row count, file metadata.  
**User actions:** Select feedback column, select metadata columns, continue.  
**Navigation links:** Back to Upload, Continue to Configure.  
**Future enhancements:** Data quality warnings.

### Configure Analysis

**Purpose:** Set analysis parameters.  
**Primary users:** Analysts, research leads.  
**Main components:** Feedback column, optional segment columns, language, analysis type.  
**User actions:** Confirm settings, start analysis.  
**Navigation links:** Data Preview, Run Analysis.  
**Future enhancements:** Custom taxonomy, sentiment model options.

### Analysis Processing

**Purpose:** Show progress while AI analysis runs.  
**Primary users:** Analysts.  
**Main components:** Progress indicator, batch status, estimated time, safe-exit message.  
**User actions:** Wait, cancel, return later.  
**Navigation links:** Dashboard, Project.  
**Future enhancements:** Background jobs and email notification.

### Analysis Results

**Purpose:** Show detailed per-response analysis.  
**Primary users:** Analysts, researchers.  
**Main components:** Results table, themes, sentiment, confidence, reason, filters.  
**User actions:** Filter, sort, inspect response, download CSV, generate report.  
**Navigation links:** Summary, Themes, Reports.  
**Future enhancements:** Edit theme assignment, approve AI labels.

### Theme Review

**Purpose:** Review and refine generated themes.  
**Primary users:** Analysts, research leads.  
**Main components:** Theme list, counts, example responses, merge/split suggestions.  
**User actions:** Rename theme, merge themes, exclude theme.  
**Navigation links:** Analysis Results, Report Builder.  
**Future enhancements:** Human-in-the-loop taxonomy approval.

### Sentiment Review

**Purpose:** Inspect sentiment distribution and edge cases.  
**Primary users:** Analysts, CX leads.  
**Main components:** Sentiment charts, confidence filters, example responses.  
**User actions:** Filter low confidence, inspect negative feedback.  
**Navigation links:** Results, Themes, Reports.  
**Future enhancements:** Sentiment calibration.

## 6. Dashboard Pages

### Executive Dashboard

**Purpose:** Present high-level business insight.  
**Primary users:** Executives, department heads.  
**Main components:** Sentiment summary, top risks, top themes, recommended actions.  
**User actions:** Open report, download PDF, compare periods.  
**Navigation links:** Reports, Projects, Trends.  
**Future enhancements:** Board-ready dashboard mode.

### Theme Dashboard

**Purpose:** Explore themes across one or more analyses.  
**Primary users:** Analysts, managers.  
**Main components:** Theme counts, trend chart, examples, segment breakdown.  
**User actions:** Filter by project, time, segment.  
**Navigation links:** Analysis Results, Trends.  
**Future enhancements:** Theme drift detection.

### Sentiment Dashboard

**Purpose:** Track sentiment patterns.  
**Primary users:** CX, HR, product teams.  
**Main components:** Positive/neutral/negative trends, drivers, segment splits.  
**User actions:** Filter, compare, export chart.  
**Navigation links:** Executive Dashboard, Reports.  
**Future enhancements:** Alerting on sentiment drops.

### Trends Dashboard

**Purpose:** Compare feedback over time.  
**Primary users:** Managers, executives.  
**Main components:** Time-series charts, recurring themes, emerging risks.  
**User actions:** Select date range, compare surveys.  
**Navigation links:** Projects, Reports.  
**Future enhancements:** Predictive trend alerts.

## 7. Report Pages

### Reports Library

**Purpose:** Store generated reports.  
**Primary users:** Analysts, executives.  
**Main components:** Report list, project, date, author, download links.  
**User actions:** Open, download PDF, duplicate, archive.  
**Navigation links:** Dashboard, Projects, Analysis.  
**Future enhancements:** Scheduled reports.

### Report Detail

**Purpose:** View one management report in app.  
**Primary users:** Executives, managers, analysts.  
**Main components:** Executive summary, charts, insights, recommendations, source metadata.  
**User actions:** Download PDF, download CSV, share report.  
**Navigation links:** Reports Library, Analysis Results.  
**Future enhancements:** Commenting and approvals.

### Report Builder

**Purpose:** Configure report contents before export.  
**Primary users:** Analysts, research leads.  
**Main components:** Section toggles, chart options, branding, report title.  
**User actions:** Preview report, generate PDF.  
**Navigation links:** Analysis Results, Reports.  
**Future enhancements:** Custom templates and brand kits.

### PDF Preview

**Purpose:** Review generated report before downloading.  
**Primary users:** Analysts, executives.  
**Main components:** Embedded PDF viewer, metadata, download button.  
**User actions:** Download PDF, regenerate.  
**Navigation links:** Report Detail, Report Builder.  
**Future enhancements:** Inline annotations.

## 8. Settings Pages

### Workspace Settings

**Purpose:** Manage workspace-level configuration.  
**Primary users:** Workspace owners, admins.  
**Main components:** Workspace name, logo, default locale, retention settings.  
**User actions:** Update workspace details.  
**Navigation links:** Members, Billing, Integrations.  
**Future enhancements:** Custom domains.

### Members & Roles

**Purpose:** Manage access.  
**Primary users:** Admins, team leads.  
**Main components:** Member list, roles, invites.  
**User actions:** Invite user, change role, remove user.  
**Navigation links:** Workspace Settings, Audit Log.  
**Future enhancements:** Granular permissions.

### Billing

**Purpose:** Manage subscription and usage.  
**Primary users:** Owners, finance.  
**Main components:** Current plan, usage, invoices, payment method.  
**User actions:** Upgrade, update payment, view invoice.  
**Navigation links:** Pricing, Usage.  
**Future enhancements:** Enterprise contract management.

### Usage

**Purpose:** Show analysis usage and limits.  
**Primary users:** Admins, owners.  
**Main components:** Responses analysed, reports generated, API usage.  
**User actions:** Monitor usage, upgrade plan.  
**Navigation links:** Billing, Settings.  
**Future enhancements:** Usage alerts.

### Integrations

**Purpose:** Connect external data sources.  
**Primary users:** Admins, analysts.  
**Main components:** Survey tools, CSV import, Google Sheets, Slack, CRM.  
**User actions:** Connect, disconnect, sync.  
**Navigation links:** Workspace Settings, API Keys.  
**Future enhancements:** Qualtrics, Typeform, SurveyMonkey, Salesforce.

### API Keys

**Purpose:** Manage developer access.  
**Primary users:** Developers, admins.  
**Main components:** API keys, scopes, creation dates.  
**User actions:** Create key, revoke key.  
**Navigation links:** Integrations, Developer Docs.  
**Future enhancements:** Webhooks.

### Notification Settings

**Purpose:** Configure alerts and email summaries.  
**Primary users:** Analysts, managers.  
**Main components:** Email preferences, report notifications, risk alerts.  
**User actions:** Enable/disable notifications.  
**Navigation links:** Workspace Settings.  
**Future enhancements:** Slack and Teams alerts.

## 9. Admin Pages

### Admin Overview

**Purpose:** Internal operational dashboard.  
**Primary users:** SurveyIQ internal admins.  
**Main components:** Customers, usage, errors, system health.  
**User actions:** Inspect tenant, view usage.  
**Navigation links:** Tenants, Jobs, Logs.  
**Future enhancements:** Revenue and churn dashboards.

### Tenant Management

**Purpose:** Manage customer workspaces.  
**Primary users:** Internal admins, support.  
**Main components:** Workspace list, plan, status, owner, usage.  
**User actions:** Suspend, impersonate safely, update plan.  
**Navigation links:** Admin Overview, Audit Log.  
**Future enhancements:** Automated health scoring.

### Job Queue

**Purpose:** Monitor background analysis/report jobs.  
**Primary users:** Internal admins, engineers.  
**Main components:** Job status, failures, retries, duration.  
**User actions:** Retry job, inspect error.  
**Navigation links:** Logs, Tenant Management.  
**Future enhancements:** Queue scaling controls.

### Model Usage

**Purpose:** Track AI costs and model performance.  
**Primary users:** Internal admins, finance, engineering.  
**Main components:** Token usage, cost estimates, failure rates, latency.  
**User actions:** Filter by tenant, export usage.  
**Navigation links:** Admin Overview, Billing.  
**Future enhancements:** Model routing controls.

### Audit Log

**Purpose:** Track important actions.  
**Primary users:** Admins, security teams.  
**Main components:** User action log, timestamps, IP/device metadata.  
**User actions:** Filter, export.  
**Navigation links:** Members, Tenant Management.  
**Future enhancements:** SIEM export.

## 10. Error and System Pages

### 404 Not Found

**Purpose:** Handle missing pages.  
**Primary users:** All users.  
**Main components:** Message, return link.  
**User actions:** Go dashboard, go home.  
**Navigation links:** Dashboard, Home.  
**Future enhancements:** Contextual suggestions.

### 403 Access Denied

**Purpose:** Explain permission restrictions.  
**Primary users:** Authenticated users.  
**Main components:** Permission message, role guidance.  
**User actions:** Request access, return.  
**Navigation links:** Dashboard, Help.  
**Future enhancements:** Access request workflow.

### 500 Server Error

**Purpose:** Handle system failures gracefully.  
**Primary users:** All users.  
**Main components:** Error message, support link, status page link.  
**User actions:** Retry, contact support.  
**Navigation links:** Dashboard, Status.  
**Future enhancements:** Error reference IDs.

### Analysis Failed

**Purpose:** Explain failed AI/file analysis.  
**Primary users:** Analysts.  
**Main components:** Failure reason, retry option, troubleshooting tips.  
**User actions:** Retry, adjust file, contact support.  
**Navigation links:** Upload, Help.  
**Future enhancements:** Partial recovery.

### Maintenance

**Purpose:** Communicate downtime.  
**Primary users:** All users.  
**Main components:** Status message, ETA, status link.  
**User actions:** Check status.  
**Navigation links:** Status Page.  
**Future enhancements:** Regional status.

## 11. Future Enterprise Pages

### Enterprise Overview

**Purpose:** Dedicated enterprise landing inside sales flow.  
**Primary users:** Enterprise buyers.  
**Main components:** Security, governance, scale, integrations.  
**User actions:** Contact sales.  
**Navigation links:** Security, Pricing, Contact.  
**Future enhancements:** Procurement package.

### SSO Configuration

**Purpose:** Configure SAML/OIDC login.  
**Primary users:** IT admins.  
**Main components:** Identity provider settings, metadata, test login.  
**User actions:** Configure SSO, test, enforce.  
**Navigation links:** Security, Members.  
**Future enhancements:** SCIM provisioning.

### Data Governance

**Purpose:** Control retention and compliance settings.  
**Primary users:** IT, legal, admins.  
**Main components:** Retention rules, deletion policies, data residency.  
**User actions:** Set retention, export data, delete data.  
**Navigation links:** Security, Audit Log.  
**Future enhancements:** Legal hold.

### Custom Taxonomy

**Purpose:** Let enterprises enforce approved theme frameworks.  
**Primary users:** Research leaders, admins.  
**Main components:** Taxonomy editor, approved themes, mapping rules.  
**User actions:** Create taxonomy, apply to analysis.  
**Navigation links:** Analysis Settings, Reports.  
**Future enhancements:** Taxonomy versioning.

### Benchmarking

**Purpose:** Compare results against historical or industry benchmarks.  
**Primary users:** Executives, strategy teams.  
**Main components:** Benchmark charts, percentile views, trend comparisons.  
**User actions:** Select benchmark, export.  
**Navigation links:** Trends, Executive Dashboard.  
**Future enhancements:** Industry benchmark marketplace.

### Advanced Permissions

**Purpose:** Enterprise-grade access control.  
**Primary users:** Admins, IT.  
**Main components:** Permission groups, project-level access, report-level sharing.  
**User actions:** Create group, assign permissions.  
**Navigation links:** Members, Security.  
**Future enhancements:** Attribute-based access control.

## 12. Commercial SaaS Hierarchy

```text
Public Site
  Home
  Product
  Solutions
    Customer Experience
    Employee Feedback
    Product Research
    Market Research
  Pricing
  Report Examples
  Resources
    Blog
    Guides
    Templates
    Webinars
  Security
  Contact / Book Demo

Authentication
  Login
  Signup
  Forgot Password
  Onboarding

Authenticated App
  Dashboard
    Executive Dashboard
    Theme Dashboard
    Sentiment Dashboard
    Trends Dashboard

  Projects
    Projects List
    Project Detail

  Analysis
    New Analysis
    Upload Data
    Data Preview
    Configure Analysis
    Processing
    Analysis Results
    Theme Review
    Sentiment Review

  Reports
    Reports Library
    Report Detail
    Report Builder
    PDF Preview

  Settings
    Workspace Settings
    Members & Roles
    Billing
    Usage
    Integrations
    API Keys
    Notifications

Admin
  Admin Overview
  Tenant Management
  Job Queue
  Model Usage
  Audit Log

Error Pages
  404 Not Found
  403 Access Denied
  500 Server Error
  Analysis Failed
  Maintenance

Future Enterprise
  Enterprise Overview
  SSO Configuration
  Data Governance
  Custom Taxonomy
  Benchmarking
  Advanced Permissions
```

## 13. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
