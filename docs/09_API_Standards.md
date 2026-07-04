# SurveyIQ API Standards

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document defines API standards for SurveyIQ. It should guide future endpoint design while preserving the current MVP API contract.

## Table of Contents

1. API Principles
2. Current MVP Endpoints
3. Response Conventions
4. Error Conventions
5. File Handling
6. Security Standards
7. Future API Areas
8. Related Documents

## 1. API Principles

- Preserve backwards compatibility where possible.
- Prefer additive response fields over breaking changes.
- Validate inputs before file access.
- Keep errors clear and actionable.
- Do not expose secrets.
- Avoid logging raw feedback content.

## 2. Current MVP Endpoints

### `GET /health`

Purpose:

- Confirm the backend is running.

### `POST /upload`

Purpose:

- Upload CSV or Excel data.
- Return detected columns and first 10 rows.

Response includes:

- `upload_id`
- `filename`
- `columns`
- `preview`
- `row_count`

### `POST /analyse`

Purpose:

- Analyse the selected feedback column.

Request includes:

- `upload_id`
- `feedback_column`

Response includes:

- `analysis_id`
- `results`
- `overall`
- `download_url`
- `report_download_url`

### `GET /download/{analysis_id}`

Purpose:

- Download analysed CSV.

### `GET /download-report/{analysis_id}`

Purpose:

- Download management PDF report.

## 3. Response Conventions

Response-level analysis should include:

- `original_response`
- `theme`
- `sentiment`
- `confidence`
- `reason`

Overall analysis should include:

- `summary_of_main_themes`
- `counts_by_theme`
- `counts_by_sentiment`
- `executive_summary`
- `recommended_actions`

Additional insight fields may be added when backward-compatible.

## 4. Error Conventions

Errors should:

- Use appropriate HTTP status codes.
- Include a concise `detail` message.
- Avoid exposing API keys, stack traces, or raw sensitive data.
- Identify failed analysis batch or stage when useful.

## 5. File Handling

Current standards:

- Support `.csv`, `.xls`, and `.xlsx`.
- Store uploaded files locally for MVP.
- Store analysed CSVs locally.
- Store generated PDF reports locally.
- Validate storage IDs before resolving file paths.

## 6. Security Standards

Baseline standards:

- Do not hardcode secrets.
- Use environment variables for API keys.
- Do not print API keys.
- Do not trust user-provided file IDs.
- Avoid broad CORS origins in production.

## 7. Future API Areas

Structured placeholders:

- Projects API.
- Reports API.
- Users and workspace API.
- Authentication API.
- Billing and usage API.
- Integrations API.

## 8. Related Documents

- [08_AI_Architecture.md](08_AI_Architecture.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
- [DECISIONS.md](DECISIONS.md)
