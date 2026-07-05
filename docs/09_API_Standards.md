# SurveyIQ API Standards

**Version:** 0.2  
**Status:** Draft  
**Owner:** Engineering  
**Last Updated:** 2026-07-05

## Purpose

This document defines API standards for SurveyIQ. It should guide FastAPI endpoint design, request and response schemas, error handling, documentation, security, versioning, monitoring, and future public API decisions.

The current MVP API must remain compatible with the existing frontend unless a change fixes a clear bug. Future API design should be additive, predictable, and safe for a commercial SaaS platform.

## Table of Contents

1. API Principles
2. REST Standards
3. Endpoint Naming
4. Versioning
5. HTTP Methods
6. Request Format
7. Response Format
8. Error Responses
9. Status Codes
10. Authentication
11. Pagination
12. Filtering
13. Sorting
14. Validation
15. Rate Limiting
16. Logging
17. Monitoring
18. Security
19. API Documentation Standards
20. OpenAPI Guidelines
21. Naming Conventions
22. Current MVP Endpoints
23. Future GraphQL Considerations
24. Related Documents
25. Revision History

## 1. API Principles

- Preserve compatibility with the working MVP.
- Use clear resource-oriented endpoints.
- Prefer additive changes over breaking changes.
- Validate all inputs before processing files or invoking AI.
- Return structured, actionable errors.
- Never expose secrets.
- Avoid logging raw feedback content unless explicitly required for controlled debugging.
- Keep response schemas stable enough for frontend and export workflows.

## 2. REST Standards

SurveyIQ APIs should follow REST conventions:

- Resources are nouns.
- Actions are represented through resource state changes where practical.
- Use HTTP methods consistently.
- Use standard status codes.
- Use JSON for request and response bodies except file upload/download endpoints.
- Keep endpoint behaviour predictable and idempotent where possible.

Examples:

- `/uploads`
- `/analyses`
- `/reports`
- `/projects`
- `/workspaces`

## 3. Endpoint Naming

Endpoint naming rules:

- Use lowercase plural nouns.
- Use kebab-case only if a multi-word path segment is unavoidable.
- Avoid verbs in resource paths unless representing a workflow action that does not map cleanly to CRUD.
- Use nested resources only when ownership is clear.

Preferred:

- `POST /uploads`
- `GET /uploads/{upload_id}`
- `POST /analyses`
- `GET /analyses/{analysis_id}/download-csv`
- `GET /reports/{report_id}/download-pdf`

Avoid:

- `POST /doUpload`
- `GET /getAnalysis`
- `POST /analyseFileNow`

## 4. Versioning

MVP endpoints may remain unversioned during local development, but production APIs should use explicit versioning.

Recommended production pattern:

- `/api/v1/uploads`
- `/api/v1/analyses`
- `/api/v1/reports`

Versioning rules:

- Additive fields do not require a new major API version.
- Removing fields, renaming fields, or changing meaning requires a versioned migration.
- Deprecated endpoints should remain available for a defined migration period.
- API version changes must be documented in release notes.

## 5. HTTP Methods

| Method | Use |
|---|---|
| `GET` | Read resource or download output |
| `POST` | Create resource or start non-idempotent workflow |
| `PUT` | Replace a full resource |
| `PATCH` | Partially update a resource |
| `DELETE` | Delete or archive a resource |

Long-running analysis and report generation should eventually create jobs rather than blocking a single request.

## 6. Request Format

JSON requests:

- Use `application/json`.
- Use snake_case field names for backend API consistency.
- Validate required fields explicitly.
- Reject unknown or unsupported values when they may cause incorrect behaviour.

File upload requests:

- Use `multipart/form-data`.
- Accept documented file types only.
- Validate extension and parseability.
- Enforce future size and row limits.

Example analysis request shape:

```json
{
  "upload_id": "local-or-persistent-id",
  "feedback_column": "feedback"
}
```

Multi-column analysis request shape:

```json
{
  "upload_id": "local-or-persistent-id",
  "feedback_columns": ["main_feedback", "improvement_feedback"]
}
```

`feedback_column` remains supported for backwards compatibility. If `feedback_columns` is provided, the backend analyses every selected qualitative column and preserves source metadata in the response and analysed CSV.

## 7. Response Format

Successful responses should be JSON unless returning a file.

Recommended envelope for future APIs:

```json
{
  "data": {},
  "meta": {}
}
```

MVP responses may remain flat for compatibility. Future changes should avoid breaking the frontend without coordination.

Analysis response should preserve:

- Response-level results.
- Original response.
- Theme/category.
- Sentiment.
- Confidence score.
- Short reason.
- Source row index.
- Source feedback column.
- Theme counts.
- Sentiment counts.
- Executive summary.
- Download references where available.
- Additive dataset-level fields: `column_profiles`, `selected_feedback_columns`, `quantitative_summary`, `segment_summary`, `cross_analysis`, and `enhanced_executive_summary`.

## 8. Error Responses

Error responses should be structured and safe.

Recommended future shape:

```json
{
  "error": {
    "code": "analysis_failed",
    "message": "The analysis could not be completed.",
    "details": "One batch failed after retrying.",
    "retryable": true,
    "request_id": "optional-request-id"
  }
}
```

Rules:

- Do not expose API keys, stack traces, raw provider payloads, or internal file paths.
- Include a user-actionable message.
- Include a stable error code.
- Identify whether retry is reasonable where possible.
- Preserve partial results only when clearly marked.

## 9. Status Codes

| Status | Use |
|---:|---|
| `200` | Successful read, analysis completion, or download metadata |
| `201` | Resource created |
| `202` | Long-running job accepted |
| `204` | Successful delete/archive with no body |
| `400` | Invalid request or validation error |
| `401` | Not authenticated |
| `403` | Authenticated but not authorized |
| `404` | Resource not found |
| `409` | Conflict, duplicate state, or unsafe concurrent update |
| `413` | File too large |
| `415` | Unsupported media/file type |
| `422` | Semantically invalid input |
| `429` | Rate limit exceeded |
| `500` | Unexpected server error |
| `502` | Upstream AI provider error |
| `503` | Service unavailable |
| `504` | Timeout |

## 10. Authentication

Current MVP:

- No authentication.
- Local development only.

Future SaaS:

- Require authentication for all workspace, project, analysis, report, and settings endpoints.
- Use secure session or token strategy.
- Enforce workspace authorization on every resource.
- Support SSO in future enterprise scope.

Authentication errors should not reveal whether an account exists unless intentionally part of a safe flow.

## 11. Pagination

Use pagination for lists that may grow:

- Projects.
- Analyses.
- Reports.
- Members.
- Audit logs.
- Response-level analysis records.

Recommended request parameters:

- `page`
- `page_size`

Recommended response metadata:

```json
{
  "meta": {
    "page": 1,
    "page_size": 50,
    "total_items": 248,
    "total_pages": 5
  }
}
```

Cursor pagination may be introduced later for audit logs or large event streams.

## 12. Filtering

Use query parameters for filtering.

Examples:

- `?status=completed`
- `?project_id=...`
- `?sentiment=negative`
- `?theme=Pricing%20Concerns`
- `?date_from=2026-01-01&date_to=2026-03-31`

Rules:

- Document supported filters.
- Ignore unsupported filters only if explicitly documented; otherwise return validation errors.
- Validate values before applying them.

## 13. Sorting

Use `sort` query parameter.

Examples:

- `?sort=created_at`
- `?sort=-created_at`
- `?sort=theme`

Rules:

- Leading minus means descending order.
- Document sortable fields.
- Use stable default sorting.

## 14. Validation

Validation requirements:

- Validate file type before parsing.
- Validate upload ID exists.
- Validate selected feedback column exists.
- Validate feedback column contains usable text.
- Validate request body schema.
- Validate enum values such as sentiment or status.
- Validate download requests reference generated files.

Validation errors should return `400` or `422` with field-level detail when useful.

## 15. Rate Limiting

Current MVP:

- No application-level rate limiting.

Future SaaS:

- Apply rate limits by user, workspace, and endpoint type.
- Use stricter limits for AI analysis and report generation.
- Return `429` with retry guidance.
- Track plan-based usage separately from abuse prevention.

Rate limit responses should include a friendly explanation and a next step.

## 16. Logging

Logging requirements:

- Log request method, path, status, duration, and request ID.
- Log analysis stage, batch count, and failure category.
- Log provider errors safely.
- Never log `OPENAI_API_KEY`.
- Avoid logging raw feedback text.
- Avoid logging full uploaded file contents.

Use structured logs in future hosted environments.

## 17. Monitoring

Monitoring should cover:

- Upload success/failure rate.
- File parsing failures.
- Analysis completion rate.
- AI provider latency.
- Token usage and cost.
- PDF generation failures.
- Download failures.
- Error rates by endpoint.

Future admin pages should use this telemetry for Job Queue and Model Usage views.

## 18. Security

Security standards:

- Store secrets in environment variables or managed secret stores.
- Never hardcode API keys.
- Validate and sanitize file uploads.
- Restrict file access by upload/report ownership in future SaaS.
- Use least-privilege access for storage and database.
- Apply CORS restrictions appropriate to environment.
- Return safe errors without stack traces in production.
- Protect admin endpoints behind stronger authorization.

## 19. API Documentation Standards

Every endpoint should document:

- Purpose.
- Authentication requirement.
- HTTP method and path.
- Request body or parameters.
- Response body.
- Error codes.
- Side effects.
- Example request.
- Example response.

Documentation must be updated when endpoint behaviour changes.

## 20. OpenAPI Guidelines

FastAPI should generate OpenAPI documentation from typed schemas.

Guidelines:

- Use explicit request and response models.
- Add descriptions for fields that affect workflow.
- Mark deprecated endpoints.
- Document file upload fields.
- Document download response media types.
- Keep examples free of real customer data.

## 21. Naming Conventions

API field names:

- Use `snake_case`.
- Use clear domain names: `feedback_column`, `theme_counts`, `sentiment_counts`, `executive_summary`.
- Use `id` suffix consistently: `upload_id`, `analysis_id`, `report_id`.
- Use ISO 8601 strings for timestamps.
- Use stable enum values in lowercase.

Avoid ambiguous fields such as `data1`, `result`, `thing`, or `info` without context.

## 22. Current MVP Endpoints

The current MVP endpoints are intentionally simple and should remain compatible until a versioned API is introduced.

### `GET /health`

Purpose:

- Confirm backend health.

Expected response:

- Basic status.
- Environment readiness indicators may be included if they do not expose secrets.

### `POST /upload`

Purpose:

- Upload CSV or Excel data.
- Return upload ID, detected columns, preview rows, and row count.
- Return column profiles for every uploaded column.

Important behaviour:

- Preview should show the first 10 rows.
- File parsing should use pandas.
- Errors should clearly indicate unsupported or unreadable files.
- Column profiles infer type, missing/non-empty counts, unique count, sample values, and suggested role.

### `POST /analyse`

Purpose:

- Analyse the selected feedback column.
- Analyse one or more selected feedback columns when `feedback_columns` is provided.
- Return frontend-compatible response-level and overall results.

Important behaviour:

- Requires valid `upload_id`.
- Requires valid `feedback_column` or non-empty `feedback_columns`.
- Uses OpenAI API when configured.
- Does not expose API key.
- Preserves analysed CSV download.
- Preserves existing old fields while adding dataset intelligence fields.
- Multi-column CSV exports include `source_row_index` and `source_feedback_column`.

Additive response fields:

- `column_profiles`
- `selected_feedback_columns`
- `quantitative_summary`
- `segment_summary`
- `cross_analysis`
- `enhanced_executive_summary`

### Download Endpoints

Purpose:

- Download analysed CSV and generated PDF report where available.

Important behaviour:

- Return correct file media type.
- Do not allow access to files outside the configured storage area.
- Return clear errors when output is missing.

## 23. Future GraphQL Considerations

GraphQL is not required for the MVP. REST is sufficient for upload, analysis, reports, settings, admin, and downloads.

GraphQL may be considered later if:

- Dashboard views require complex nested queries.
- The frontend needs flexible cross-project insight exploration.
- Mobile or embedded clients need fine-grained data selection.

GraphQL should not be introduced until REST API contracts, authentication, authorization, and persistence are stable.

## 24. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [02_Application_Sitemap.md](02_Application_Sitemap.md)
- [04_Wireframes.md](04_Wireframes.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)

## 25. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter document. |
| 0.2 | 2026-07-05 | Codex | Expanded API standards with REST conventions, versioning, errors, security, OpenAPI guidance, and MVP endpoint expectations. |
| 1.1 | 2026-07-05 | Codex | Documented additive dataset-level analysis fields, multi-column qualitative analysis request support, and source metadata export. |
