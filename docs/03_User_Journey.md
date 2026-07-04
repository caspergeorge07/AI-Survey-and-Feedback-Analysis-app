# SurveyIQ User Journey

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document describes the primary user journeys for SurveyIQ. It should guide UX design, onboarding, workflow prioritization, and acceptance criteria for the analysis experience.

## Table of Contents

1. Primary Personas
2. Core Journey: Analyse Survey Feedback
3. Executive Consumption Journey
4. Admin Setup Journey
5. Journey Risks
6. Open Questions
7. Related Documents

## 1. Primary Personas

### Analyst

Responsible for uploading survey exports, validating columns, running analysis, reviewing outputs, and preparing reports.

### Manager

Reviews themes, sentiment, risks, and recommended actions to decide what needs attention.

### Executive

Consumes concise management reports and dashboards. Needs clarity, confidence, and business relevance.

### Workspace Admin

Future role responsible for access, workspace settings, usage, and integrations.

## 2. Core Journey: Analyse Survey Feedback

### Step 1: Arrive at Dashboard

**User goal:** Start a new analysis or continue recent work.  
**Key UI needs:** Recent analyses, clear "New Analysis" action, project context.  
**Success criteria:** User understands how to begin.

### Step 2: Upload CSV or Excel File

**User goal:** Provide survey response data.  
**Key UI needs:** File upload control, supported file guidance, error messaging.  
**Success criteria:** File is accepted and stored for local processing.

### Step 3: Preview Data

**User goal:** Confirm the correct file was uploaded.  
**Key UI needs:** First 10 rows, detected columns, row count.  
**Success criteria:** User can identify the free-text feedback column.

### Step 4: Select Feedback Column

**User goal:** Tell SurveyIQ which column contains free-text responses.  
**Key UI needs:** Column selector, visible detected column names.  
**Success criteria:** User selects the correct column and can start analysis.

### Step 5: Run AI Analysis

**User goal:** Generate themes, sentiment, confidence, reasons, insights, and report outputs.  
**Key UI needs:** Clear processing state, failure messaging, no secret exposure.  
**Success criteria:** Analysis completes and returns results.

### Step 6: Review Results

**User goal:** Understand response-level and aggregate findings.  
**Key UI needs:** Results table, theme counts, sentiment counts, executive summary.  
**Success criteria:** User can trust and interpret the output.

### Step 7: Export Outputs

**User goal:** Share or continue working with the analysis.  
**Key UI needs:** CSV download, PDF report download.  
**Success criteria:** User downloads a valid analysed CSV or management PDF.

## 3. Executive Consumption Journey

1. Open generated report.
2. Read executive summary.
3. Review sentiment summary and top themes.
4. Scan positive highlights, negative highlights, and key risks.
5. Review recommended actions.
6. Use the report in a decision-making meeting.

## 4. Admin Setup Journey

Future placeholder:

1. Create workspace.
2. Invite users.
3. Configure workspace settings.
4. Configure data retention.
5. Connect integrations.
6. Monitor usage.

## 5. Journey Risks

- Users upload the wrong file or wrong sheet.
- Users select the wrong feedback column.
- Large analyses take longer than expected.
- AI output may require human review before executive use.
- Report readers may overinterpret small sample sizes.

## 6. Open Questions

- Should users be able to edit generated themes before report export?
- Should report generation be automatic after every analysis or user-triggered?
- What metadata columns should be supported first for segmentation?
- How should progress be shown for large batched analyses?

## 7. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [04_Wireframes.md](04_Wireframes.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
