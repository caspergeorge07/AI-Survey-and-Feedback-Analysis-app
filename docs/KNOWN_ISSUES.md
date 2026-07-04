# SurveyIQ Known Issues

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document tracks known product, UX, and technical issues that should be considered during planning and development.

## Table of Contents

1. Issue Format
2. Active Known Issues
3. Watchlist
4. Resolved Issues
5. Related Documents

## 1. Issue Format

Each issue should use:

- ID
- Severity
- Area
- Description
- Impact
- Workaround
- Proposed resolution
- Owner
- Status

## 2. Active Known Issues

### KI-001: Long Analysis Runs for Larger Files

**Severity:** Medium  
**Area:** AI analysis  
**Status:** Active

**Description:** Larger files require multiple OpenAI calls and can take several minutes.  
**Impact:** Users may need clearer progress feedback.  
**Workaround:** Use smaller batches or wait for the request to complete.  
**Proposed resolution:** Add background jobs and progress reporting in a future release.

### KI-002: PDF Report Download Not Yet Exposed in Frontend UI

**Severity:** Low  
**Area:** Frontend  
**Status:** Active

**Description:** The backend returns `report_download_url`, but the frontend may not yet show a dedicated PDF download action.  
**Impact:** Users may need to access the PDF through the API response until the UI is updated.  
**Workaround:** Use the returned `report_download_url`.  
**Proposed resolution:** Add a report download button when frontend updates are prioritized.

### KI-003: Local Storage Only

**Severity:** Medium  
**Area:** Platform architecture  
**Status:** Active

**Description:** Uploaded files, analysed CSVs, and PDF reports are stored locally.  
**Impact:** Not suitable for multi-user SaaS deployment yet.  
**Workaround:** Use local MVP mode for development and validation.  
**Proposed resolution:** Introduce persistent storage in the SaaS foundation phase.

## 3. Watchlist

- AI output consistency for unusual survey formats.
- PDF layout with very large theme lists.
- Upload size guidance.
- Error recovery for failed batch analysis.

## 4. Resolved Issues

None yet.

## 5. Related Documents

- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [CHANGELOG.md](CHANGELOG.md)
