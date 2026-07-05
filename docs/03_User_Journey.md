# SurveyIQ User Journey

**Version:** 0.2  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document defines the primary user journeys for SurveyIQ, an AI-powered survey and qualitative feedback intelligence platform. It describes how users move from first discovery to their first executive-ready report, including key decision points, emotional states, success states, error states, and opportunities to improve the experience.

This document should guide product planning, UX design, onboarding, workflow prioritization, and acceptance criteria for the core SurveyIQ experience.

## Table of Contents

1. Primary User Personas
2. Main Journey Overview
3. Step-by-Step Journey: First Visit to First Report
4. Alternative Journeys
5. Decision Points
6. Error States
7. Success States
8. User Emotions by Stage
9. Opportunities to Improve the Experience
10. Future Journey Enhancements
11. Related Documents

## 1. Primary User Personas

### Analyst

**Role:** Uploads data, configures analysis, reviews AI outputs, and prepares reports.  
**Goals:** Move quickly from raw survey comments to reliable themes, sentiment, and downloadable outputs.  
**Needs:** Clear upload flow, data preview, accurate column selection, transparent analysis state, trustworthy results, and exportable reports.  
**Risks:** May select the wrong column, distrust AI outputs, or struggle with long-running analysis.

### Research Lead

**Role:** Owns research quality and insight communication.  
**Goals:** Ensure analysis is accurate enough for stakeholders and aligns with research objectives.  
**Needs:** Theme review, sentiment review, evidence from source responses, and report-ready summaries.  
**Risks:** May need more control over taxonomy, theme naming, or report framing.

### Manager

**Role:** Consumes analysis to understand team, customer, product, or operational issues.  
**Goals:** Identify what matters, what is improving, what is risky, and what action should be taken.  
**Needs:** Executive summary, top themes, sentiment summary, key risks, and recommended actions.  
**Risks:** May misinterpret small sample sizes or need more context from the original survey.

### Executive

**Role:** Consumes final reports for decision-making.  
**Goals:** Understand the business implications of feedback quickly.  
**Needs:** Concise PDF reports, clear charts, risks, recommended actions, and conclusions.  
**Risks:** May not have time to inspect response-level detail.

### Workspace Admin

**Role:** Future persona responsible for user access, workspace settings, usage, and integrations.  
**Goals:** Keep the workspace organized, secure, and aligned with team needs.  
**Needs:** Member management, workspace settings, usage visibility, and future integration controls.  
**Risks:** May need governance features not yet part of the MVP.

## 2. Main Journey Overview

The primary SurveyIQ journey takes a new user from discovering the product to producing their first management-ready report.

```text
Visit website
  -> Sign up / log in
  -> Complete onboarding
  -> Create project
  -> Upload CSV or Excel file
  -> Preview data
  -> Select feedback column
  -> Configure analysis
  -> Run analysis
  -> View processing state
  -> Review results
  -> Review themes
  -> Review sentiment
  -> Generate report
  -> Preview PDF
  -> Download CSV/PDF
  -> Return to dashboard
```

The journey should feel guided, reliable, and professional. The user should always understand:

- Where they are in the workflow.
- What input is required.
- What SurveyIQ is doing.
- What outputs are available.
- What to do next.

## 3. Step-by-Step Journey: First Visit to First Report

### Step 1: Visit Public Website

**User goal:** Understand what SurveyIQ does and whether it is relevant.  
**Primary users:** Prospects, analysts, research leads, managers.  
**Entry points:** Home page, product page, pricing page, report examples, search, referral.  
**Main components:** Value proposition, product workflow, sample report preview, use cases, call to action.  
**User actions:** Read product overview, view example reports, start signup, log in, or book demo.  
**User emotions:** Curious, evaluative, skeptical.  
**Success state:** User understands that SurveyIQ turns free-text feedback into executive-ready insights.  
**Error or friction states:** Messaging is unclear, product seems too generic, user cannot find examples.  
**Experience opportunities:** Provide a sample management report and a concise "upload to report" workflow explanation.

### Step 2: Sign Up / Log In

**User goal:** Access SurveyIQ.  
**Primary users:** New users, existing users.  
**Main components:** Signup form, login form, password reset, future SSO option.  
**User actions:** Create account, log in, reset password.  
**User emotions:** Motivated but sensitive to friction.  
**Success state:** User reaches onboarding or dashboard.  
**Error or friction states:** Invalid credentials, forgotten password, unclear account state.  
**Experience opportunities:** Keep authentication lightweight until enterprise requirements are introduced.

### Step 3: Complete Onboarding

**User goal:** Understand how to get to first value.  
**Primary users:** New analysts, workspace owners.  
**Main components:** Welcome message, use-case selection, first-analysis checklist, sample data option.  
**User actions:** Select use case, start first upload, optionally review sample workflow.  
**User emotions:** Hopeful, cautious, looking for guidance.  
**Success state:** User knows the next step is to create or choose a project and upload data.  
**Error or friction states:** Too many setup questions, unclear next action.  
**Experience opportunities:** Keep onboarding focused on the first successful analysis.

### Step 4: Create Project

**User goal:** Organize the analysis around a survey, initiative, or research question.  
**Primary users:** Analysts, research leads.  
**Main components:** Project name, optional description, project context, create button.  
**User actions:** Create project, choose existing project, cancel.  
**User emotions:** Organized, task-focused.  
**Success state:** Project is created and user can upload data.  
**Error or friction states:** Project purpose is unclear, user does not know what to name it.  
**Experience opportunities:** Offer simple examples such as "Q3 Customer Feedback" or "Employee Pulse Survey".

### Step 5: Upload CSV/Excel

**User goal:** Provide survey response data.  
**Primary users:** Analysts.  
**Main components:** File upload zone, supported file types, sample file guidance, upload progress.  
**User actions:** Select CSV or Excel file, upload file, replace file if needed.  
**User emotions:** Focused, slightly anxious about file compatibility.  
**Success state:** File uploads successfully and data preview is available.  
**Error or friction states:** Unsupported file type, unreadable spreadsheet, empty file, upload failure.  
**Experience opportunities:** Clearly show supported formats and provide immediate validation feedback.

### Step 6: Preview Data

**User goal:** Confirm the uploaded file is correct.  
**Primary users:** Analysts.  
**Main components:** First 10 rows, detected columns, row count, filename, upload metadata.  
**User actions:** Review rows, confirm columns, go back to upload if wrong file.  
**User emotions:** Reassured if data looks correct; concerned if columns are unclear.  
**Success state:** User confirms the file contains the expected survey data.  
**Error or friction states:** Column names are ambiguous, encoding looks wrong, data appears shifted or malformed.  
**Experience opportunities:** Add future data quality warnings and clearer file diagnostics.

### Step 7: Select Feedback Column

**User goal:** Identify the column containing free-text responses.  
**Primary users:** Analysts.  
**Main components:** Detected column list, feedback column selector, preview of selected column.  
**User actions:** Select feedback column, change selection, continue.  
**User emotions:** Careful, detail-oriented.  
**Success state:** User selects the correct text column.  
**Error or friction states:** User selects a rating or metadata column by mistake.  
**Experience opportunities:** Suggest likely feedback columns based on column names and text density.

### Step 8: Configure Analysis

**User goal:** Confirm analysis settings before running AI analysis.  
**Primary users:** Analysts, research leads.  
**Main components:** Selected feedback column, optional metadata context, language, analysis summary, start button.  
**User actions:** Confirm settings, return to preview, start analysis.  
**User emotions:** Expectant, looking for control.  
**Success state:** User understands what will be analysed and starts the analysis.  
**Error or friction states:** User is unsure what settings mean or whether the analysis will cost time/API usage.  
**Experience opportunities:** Provide concise explanations and clear defaults.

### Step 9: Run Analysis

**User goal:** Start AI-powered analysis.  
**Primary users:** Analysts.  
**Main components:** Start analysis action, validation checks, transition to processing state.  
**User actions:** Click run analysis.  
**User emotions:** Anticipation, impatience if the file is large.  
**Success state:** Analysis begins and user sees progress.  
**Error or friction states:** Missing feedback column, missing API configuration, invalid upload ID, analysis request failure.  
**Experience opportunities:** Validate configuration before starting and provide clear error recovery.

### Step 10: View Processing State

**User goal:** Understand that analysis is running and not stuck.  
**Primary users:** Analysts.  
**Main components:** Processing indicator, stage labels, batch status, estimated duration, safe-to-wait message.  
**User actions:** Wait, leave and return later in future versions, cancel in future versions.  
**User emotions:** Patient if progress is visible; anxious if no feedback is shown.  
**Success state:** User sees that SurveyIQ is analysing responses and generating insights.  
**Error or friction states:** Long wait, timeout, batch failure, unclear progress.  
**Experience opportunities:** Add more granular progress states for upload parsing, theme generation, sentiment analysis, and report creation.

### Step 11: Review Results

**User goal:** Understand what SurveyIQ found.  
**Primary users:** Analysts, research leads.  
**Main components:** Executive summary, theme counts, sentiment counts, response-level results, confidence scores, reasons.  
**User actions:** Scan summary, inspect response cards or table, filter by theme or sentiment in future versions.  
**User emotions:** Curious, validating quality, looking for surprises.  
**Success state:** User understands the main findings and trusts the result enough to continue.  
**Error or friction states:** Themes feel too broad, sentiment seems wrong, confidence is unclear.  
**Experience opportunities:** Add examples under each theme and expose low-confidence responses for review.

### Step 12: Review Themes

**User goal:** Understand the dominant categories in the feedback.  
**Primary users:** Analysts, research leads, managers.  
**Main components:** Top themes, theme distribution, example responses, counts.  
**User actions:** Review theme names, inspect counts, compare theme importance.  
**User emotions:** Analytical, evaluative.  
**Success state:** Themes feel business-relevant and suitable for reporting.  
**Error or friction states:** Similar themes appear duplicated, theme names are unclear.  
**Experience opportunities:** Future theme editing, merging, renaming, and custom taxonomy support.

### Step 13: Review Sentiment

**User goal:** Understand positive, neutral, and negative feedback distribution.  
**Primary users:** Analysts, managers, executives.  
**Main components:** Sentiment counts, sentiment chart, sentiment by response, reasons.  
**User actions:** Review positive/neutral/negative totals, inspect negative drivers.  
**User emotions:** Alert if negative sentiment is high; encouraged if positives are strong.  
**Success state:** User understands the emotional tone of the feedback and key drivers.  
**Error or friction states:** Sentiment seems inconsistent for mixed responses.  
**Experience opportunities:** Add sentiment calibration and low-confidence review.

### Step 14: Generate Report

**User goal:** Turn analysis into a management-ready artifact.  
**Primary users:** Analysts, research leads.  
**Main components:** Generate report action, report sections, report metadata, export options.  
**User actions:** Generate report, regenerate after review in future versions.  
**User emotions:** Productive, preparing to share.  
**Success state:** A PDF management report is generated.  
**Error or friction states:** Report generation fails, report content feels too generic.  
**Experience opportunities:** Add report builder controls for section inclusion and report title.

### Step 15: Preview PDF

**User goal:** Check the report before sharing it.  
**Primary users:** Analysts, managers.  
**Main components:** PDF preview, page navigation, report metadata, download button.  
**User actions:** Preview report, download PDF, return to results.  
**User emotions:** Quality-conscious, looking for confidence.  
**Success state:** User sees a polished report with executive summary, themes, sentiment, highlights, risks, actions, conclusions, and charts.  
**Error or friction states:** PDF content clips, charts are unclear, report is too long or too sparse.  
**Experience opportunities:** Add in-app PDF preview and report QA checks.

### Step 16: Download CSV/PDF

**User goal:** Export analysis for sharing, reporting, or further work.  
**Primary users:** Analysts, managers, executives.  
**Main components:** CSV download, PDF download, file names, export confirmation.  
**User actions:** Download analysed CSV, download PDF report.  
**User emotions:** Accomplished, ready to share.  
**Success state:** User receives valid files.  
**Error or friction states:** Download link expired, file missing, browser blocks download.  
**Experience opportunities:** Add report library and persistent download history.

### Step 17: Return to Dashboard

**User goal:** Continue working or start another analysis.  
**Primary users:** Analysts, managers.  
**Main components:** Dashboard, recent projects, recent reports, next actions.  
**User actions:** Open project, start new analysis, download previous report.  
**User emotions:** Oriented, productive.  
**Success state:** User can find their completed work and knows what to do next.  
**Error or friction states:** User cannot find the project or report later.  
**Experience opportunities:** Add recent analyses, saved reports, and project-level history.

## 4. Alternative Journeys

### Existing User Starts a New Analysis

1. User logs in.
2. User lands on dashboard.
3. User selects "New Analysis".
4. User chooses an existing project or creates a new project.
5. User uploads CSV or Excel file.
6. User previews data and selects feedback column.
7. User runs analysis.
8. User reviews results and downloads CSV/PDF.

**Primary emotion:** Efficient and task-focused.  
**Key UX requirement:** Minimize repeated onboarding and make "New Analysis" easy to find.

### User Opens Previous Project

1. User logs in.
2. User opens Projects.
3. User selects a previous project.
4. User reviews analyses, uploaded files, and generated reports.
5. User opens previous results or starts another analysis within the project.

**Primary emotion:** Returning with context.  
**Key UX requirement:** Project history must be easy to scan.

### User Downloads a Report Later

1. User logs in.
2. User opens Reports Library or Project Detail.
3. User finds the report.
4. User opens Report Detail or PDF Preview.
5. User downloads PDF and optionally CSV.

**Primary emotion:** Goal-oriented, possibly under time pressure.  
**Key UX requirement:** Reports must be searchable, clearly named, and associated with projects.

### Analysis Fails and User Retries

1. User starts analysis.
2. Processing fails due to file issue, AI failure, timeout, or batch error.
3. User sees an Analysis Failed state.
4. User reviews clear failure reason.
5. User retries, changes file, changes feedback column, or contacts support.

**Primary emotion:** Frustrated, anxious about lost time.  
**Key UX requirement:** Explain what failed, whether any output was saved, and what the user can do next.

### User Invites a Teammate

1. User opens Workspace Settings.
2. User opens Members & Roles.
3. User enters teammate email.
4. User selects role.
5. Teammate receives invitation.
6. Teammate joins workspace and accesses permitted projects or reports.

**Primary emotion:** Collaborative, security-conscious.  
**Key UX requirement:** Make permissions understandable and avoid accidental oversharing.

## 5. Decision Points

| Decision Point | User Question | Product Support Needed |
|---|---|---|
| Public website | Is this product relevant to my feedback problem? | Clear positioning, example reports, use cases. |
| Signup vs demo | Should I try it myself or talk to sales? | Clear CTAs and pricing context. |
| Project creation | Is this a new initiative or existing project? | Simple project selection and creation. |
| File upload | Is my file supported? | File type guidance and validation. |
| Data preview | Did I upload the correct file? | First 10 rows, row count, detected columns. |
| Feedback column | Which column should be analysed? | Column selector and future smart suggestions. |
| Analysis configuration | Are these settings correct? | Clear defaults and concise explanations. |
| Analysis processing | Should I wait or come back later? | Progress state and future background jobs. |
| Results review | Do I trust this analysis? | Reasons, confidence scores, examples. |
| Theme review | Are the themes useful? | Theme counts and future editing controls. |
| Sentiment review | Does the sentiment reflect the feedback? | Sentiment examples and low-confidence indicators. |
| Report generation | Is this ready for management? | Preview, sections, export controls. |
| Download | Which output do I need? | Separate CSV and PDF download actions. |

## 6. Error States

### Authentication Errors

- Invalid login credentials.
- Forgotten password.
- Expired invite link.
- Insufficient permission.

### Upload Errors

- Unsupported file type.
- Empty file.
- Corrupt CSV or Excel file.
- File cannot be parsed.
- File exceeds future size limits.

### Preview Errors

- No readable rows.
- Missing column headers.
- Encoding issue.
- Unexpected spreadsheet structure.

### Column Selection Errors

- No feedback column selected.
- Selected column contains no text responses.
- Selected column appears to be numeric or metadata.

### Analysis Errors

- Missing AI API configuration.
- AI provider error.
- Batch analysis failure.
- Model returns incomplete output.
- Timeout or network failure.

### Report Errors

- Report generation failure.
- PDF file missing.
- CSV file missing.
- Download unavailable.

### Recovery Principles

- Tell the user what failed.
- Preserve completed work where safe.
- Avoid exposing secrets or technical stack traces.
- Provide a clear next action.
- Make retry safe and understandable.

## 7. Success States

### First Value Success

The user uploads a file, runs analysis, and sees themes and sentiment counts.

### Insight Success

The user understands what themes matter, what sentiment patterns exist, and what risks or actions should be considered.

### Report Success

The user downloads a professional PDF report suitable for management review.

### Export Success

The user downloads an analysed CSV that can be used for further spreadsheet analysis or audit.

### Return Success

The user can return to dashboard, project, or reports and find previous work.

## 8. User Emotions by Stage

| Stage | Likely Emotion | UX Response |
|---|---|---|
| Public website | Curious, skeptical | Show clear value and examples. |
| Signup / login | Motivated, impatient | Keep friction low. |
| Onboarding | Hopeful, uncertain | Guide toward first analysis. |
| Create project | Organized, focused | Keep project setup lightweight. |
| Upload file | Cautious | Validate quickly and clearly. |
| Preview data | Reassured or concerned | Make data quality visible. |
| Select column | Careful | Help identify likely feedback columns. |
| Configure analysis | Expectant | Explain defaults. |
| Run analysis | Anticipatory | Confirm analysis has started. |
| Processing | Patient or anxious | Show progress and stage context. |
| Review results | Curious, evaluative | Provide evidence and confidence. |
| Review themes | Analytical | Make themes easy to scan and compare. |
| Review sentiment | Alert, interpretive | Show counts and examples. |
| Generate report | Productive | Make report creation feel reliable. |
| Preview PDF | Quality-conscious | Show polished, readable output. |
| Download CSV/PDF | Accomplished | Confirm files are ready. |
| Return dashboard | Oriented | Show recent work and next actions. |

## 9. Opportunities to Improve the Experience

### Improve First-Time Clarity

- Add sample report previews on the public site.
- Explain the upload-to-report workflow in plain language.
- Offer sample data during onboarding.

### Improve Upload Confidence

- Detect likely feedback columns.
- Warn about empty or low-text columns.
- Show row count and file metadata clearly.

### Improve Analysis Trust

- Highlight confidence scores.
- Show examples under each theme.
- Identify low-confidence responses.
- Explain that AI-generated insights should support, not replace, human judgment.

### Improve Large-File Experience

- Show batch progress.
- Provide estimated completion time.
- Move analysis into background processing in a future SaaS version.

### Improve Report Workflow

- Add in-app PDF preview.
- Add report download button to the frontend.
- Allow users to regenerate reports after reviewing themes.
- Add report library for later downloads.

### Improve Collaboration

- Add teammate invitations.
- Add roles and permissions.
- Add project-level sharing in future versions.

## 10. Future Journey Enhancements

Future enhancements should remain aligned with the SurveyIQ sitemap and avoid unnecessary feature expansion.

### Near-Term Enhancements

- PDF download visibility in the frontend.
- Processing progress for batched analysis.
- Report preview page.
- Theme examples and low-confidence review.
- Clearer analysis failure recovery.

### SaaS Foundation Enhancements

- Authentication.
- Workspaces.
- Projects.
- Reports library.
- Members and roles.
- Usage tracking.
- Persistent storage.

### Enterprise Journey Enhancements

- SSO configuration.
- Data governance.
- Custom taxonomy.
- Advanced permissions.
- Audit logs.
- Benchmarking.

## 11. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [04_Wireframes.md](04_Wireframes.md)
- [05_Design_System.md](05_Design_System.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [14_Known_Issues.md](14_Known_Issues.md)
