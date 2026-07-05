# SurveyIQ AI Architecture

**Version:** 0.2  
**Status:** Draft  
**Owner:** AI Engineering  
**Last Updated:** 2026-07-05

## Purpose

This document defines the AI architecture for SurveyIQ. It describes the analysis workflow, prompt strategy, theme generation, theme consolidation, canonical themes, sentiment analysis, confidence scoring, executive summaries, recommendations, risk identification, quality checks, cost controls, retry strategy, OpenAI integration, future multi-model support, human review, and evaluation metrics.

SurveyIQ's AI system must transform free-text survey responses into trustworthy response-level analysis and executive-ready business insight while preserving the current frontend-compatible output and export formats.

## Table of Contents

1. AI Goals
2. Overall AI Workflow
3. Prompt Engineering Strategy
4. Analysis Pipeline
5. Theme Generation
6. Theme Consolidation
7. Canonical Themes
8. Sentiment Analysis
9. Confidence Scoring
10. Executive Summary
11. Recommendation Generation
12. Risk Identification
13. Quality Checks
14. Prompt Templates
15. Token Optimisation
16. Cost Optimisation
17. Caching Strategy
18. Rate Limiting
19. Retry Strategy
20. OpenAI Integration
21. Future Multi-model Support
22. Human Review Workflow
23. Evaluation Metrics
24. Related Documents
25. Revision History

## 1. AI Goals

The AI system should:

- Analyse each survey response consistently.
- Identify business-relevant themes.
- Merge similar themes into canonical categories.
- Assign every response to a canonical theme.
- Generate sentiment as positive, neutral, or negative.
- Provide confidence scores and short reasons.
- Produce executive summaries, key risks, recommended actions, and conclusions.
- Support larger files safely through batching.
- Preserve CSV and frontend compatibility.
- Avoid exposing secrets or unnecessary raw data in logs.

## 2. Overall AI Workflow

The approved SurveyIQ workflow is a staged pipeline:

```text
 Uploaded file
   -> Parsed rows and selected feedback column
   -> Clean response list
   -> Batched response analysis
   -> Candidate themes per batch
   -> Global theme consolidation
   -> Canonical theme list
   -> Response reassignment to canonical themes
   -> Sentiment and confidence enrichment
   -> Overall summaries, risks, actions, conclusions
   -> Frontend-compatible JSON
   -> Analysed CSV and PDF report
```

The pipeline should separate response-level analysis from overall insight generation so the product can remain explainable and auditable.

### Dataset-Level Feedback Intelligence

SurveyIQ now treats the uploaded file as a dataset, not only as a container for one free-text column. The MVP-compatible expansion adds deterministic dataset intelligence around the existing AI pipeline:

- Profile every uploaded column.
- Infer whether columns are qualitative text, numeric, rating, categorical, boolean, date, or unknown.
- Suggest roles such as feedback column, rating column, segment column, date column, identifier column, or ignore.
- Allow one or more qualitative feedback columns to be analysed in a single run.
- Preserve `source_row_index` and `source_feedback_column` for each analysed response.
- Generate quantitative summaries for numeric and rating columns.
- Detect likely segment columns from column names and provided values.
- Produce lightweight cross-analysis such as sentiment by segment, top themes by segment, and average rating by segment.

This expansion is intentionally not a full analytics platform. The AI pipeline remains focused on qualitative interpretation, while deterministic pandas-based analysis provides supporting dataset context.

## 3. Prompt Engineering Strategy

Prompting principles:

- Give the model a clear role: expert survey research analyst.
- Define the expected output schema explicitly.
- Keep sentiment labels constrained to `positive`, `neutral`, and `negative`.
- Require concise reasons tied to the original response.
- Ask for business-friendly theme names, not overly abstract labels.
- Avoid making claims unsupported by the response data.
- Keep prompts deterministic where possible by using clear instructions and low-variance settings.
- Version prompts when behaviour changes materially.

Prompt quality requirements:

- Prompts must not include secrets.
- Prompts should include only the feedback text and necessary context.
- Prompts should avoid unnecessary personally identifiable information where feasible.
- Prompts should instruct the model to return valid structured output.

## 4. Analysis Pipeline

### Stage 1: Analyse Each Individual Response

Input:

- Response index.
- Original free-text response.

Output:

- Original response.
- Candidate theme.
- Initial sentiment.
- Confidence estimate.
- Short reason.

Purpose:

- Create a first-pass interpretation for every response.
- Preserve traceability between source text and AI output.

### Stage 2: Identify Candidate Themes

Input:

- Batch-level response analysis.

Output:

- Candidate theme list with descriptions and examples.

Purpose:

- Discover recurring topics without forcing premature taxonomy decisions.

### Stage 3: Merge Similar Themes into Canonical Theme List

Input:

- Candidate themes from all batches.

Output:

- Canonical theme list.
- Theme descriptions.
- Optional merge rationale.

Purpose:

- Prevent duplicated themes such as "Customer Support", "Support Experience", and "Helpdesk Response" from fragmenting the results.

### Stage 4: Reassign Every Response to Canonical Themes

Input:

- Original responses.
- Canonical theme list.
- Initial batch-level analysis.

Output:

- Response-level records with canonical theme.

Purpose:

- Ensure all counts and report summaries use a stable global theme set.

### Stage 5: Generate Sentiment

Input:

- Original response.
- Canonical theme.
- Context from prior analysis.

Output:

- Sentiment: positive, neutral, or negative.

Purpose:

- Standardize emotional tone classification across all responses.

### Stage 6: Generate Confidence Scores

Input:

- Original response.
- Theme assignment.
- Sentiment.
- Reason.

Output:

- Confidence score, preferably 0.0 to 1.0.

Purpose:

- Help users identify outputs that need human review.

### Stage 7: Generate Executive Insights

Input:

- Response-level results.
- Theme counts.
- Sentiment counts.
- Examples and risks.

Output:

- Summary of main themes.
- Brief executive summary.
- Positive and negative highlights.
- Conclusions.

Purpose:

- Translate analysis into management-ready interpretation.

### Stage 8: Generate Recommended Actions

Input:

- Themes, sentiment, risks, and executive insights.

Output:

- Prioritized recommended actions.

Purpose:

- Help managers decide what to do next.

## 5. Theme Generation

Theme generation should produce concise, business-readable categories.

Good theme examples:

- Product Usability.
- Customer Support Responsiveness.
- Pricing Concerns.
- Onboarding Experience.
- Communication Clarity.

Poor theme examples:

- Miscellaneous.
- General Feedback.
- User Thoughts.
- Negative Comments.

Theme generation rules:

- Prefer 3-8 meaningful themes for small to medium files unless data clearly supports more.
- Themes should be mutually understandable even if not perfectly mutually exclusive.
- Theme names should be suitable for charts and reports.
- Candidate themes should include short descriptions for consolidation.

## 6. Theme Consolidation

Theme consolidation merges overlapping candidate themes across batches.

Consolidation criteria:

- Same underlying issue with different wording.
- Parent/child themes where the child is too narrow for report-level use.
- Synonyms or department-specific wording for the same experience.
- Themes with low counts that are better represented under a broader category.

Consolidation should avoid:

- Merging distinct operational issues solely because sentiment is similar.
- Creating themes so broad they lose actionability.
- Hiding important risks under generic categories.

## 7. Canonical Themes

A canonical theme is the final approved theme label used for:

- Response-level records.
- Theme counts.
- Charts.
- Executive summary.
- PDF reports.
- Analysed CSV exports.

Canonical theme object should conceptually include:

- Theme name.
- Description.
- Included candidate themes.
- Example response references.
- Count.

Future custom taxonomy support should allow organizations to define approved canonical themes before analysis.

## 8. Sentiment Analysis

Supported sentiment labels:

- `positive`
- `neutral`
- `negative`

Rules:

- Mixed responses should be classified by dominant business impact.
- Factual or ambiguous statements should usually be neutral.
- Critical comments with constructive language may still be negative.
- Praise with a minor caveat may remain positive if the core message is favorable.
- Sentiment should be assigned per response, not per theme.

The PDF report may aggregate sentiment by count and by theme, but the source classification remains response-level.

## 9. Confidence Scoring

Confidence score should communicate how reliable the AI's classification appears.

Suggested scale:

- `0.80-1.00`: High confidence.
- `0.60-0.79`: Medium confidence.
- `< 0.60`: Low confidence, candidate for human review.

Factors that reduce confidence:

- Very short response.
- Ambiguous or sarcastic wording.
- Multiple unrelated topics in one response.
- Contradictory sentiment.
- Poorly formatted input.
- Non-feedback content.

Confidence should not be presented as mathematical certainty. It is a model-estimated quality signal.

## 10. Executive Summary

The executive summary should:

- State the dominant feedback patterns.
- Mention overall sentiment balance.
- Highlight top risks and opportunities.
- Be concise enough for a manager or executive to read quickly.
- Avoid unsupported claims about causality or business impact.

Recommended length:

- MVP: 1-3 short paragraphs.
- PDF report: 3-6 concise bullets or a short narrative section.

## 11. Recommendation Generation

Recommended actions should be:

- Specific enough to guide a team.
- Linked to themes and risks.
- Prioritized where possible.
- Framed as business actions, not generic advice.
- Feasible for the likely team consuming the report.

Example structure:

- Action.
- Rationale.
- Related theme.
- Expected outcome.

Avoid recommendations that require data not present in the survey unless clearly marked as an assumption.

## 12. Risk Identification

Key risks should identify issues that may affect customers, employees, operations, product adoption, or leadership priorities.

Risk signals:

- High negative sentiment count.
- Repeated negative theme.
- Safety, compliance, or trust language.
- Strong emotional wording.
- Operational blockers.
- High-impact themes even with lower counts.

Risk output should include:

- Risk title.
- Explanation.
- Evidence theme or response examples.
- Suggested mitigation.

## 13. Quality Checks

Quality checks should run after model output is received.

Required checks:

- Output is valid structured data.
- Each response has an original response, theme, sentiment, confidence score, and reason.
- Each multi-column response preserves source row index and source feedback column.
- Sentiment is one of the approved labels.
- Confidence is numeric and within expected range.
- Every response is assigned to a canonical theme.
- Theme and sentiment counts match response-level records.
- Empty or invalid responses are handled safely.
- Column profiles and quantitative summaries must not infer sensitive personal attributes beyond column names and values supplied in the dataset.

If checks fail, the system should retry where safe or return a clear analysis failure message.

## 14. Prompt Templates

Prompt templates should be stored and versioned as product-critical assets.

### Response Analysis Template

Purpose:

- Analyse individual responses in a batch.

Inputs:

- Survey responses with stable indexes.
- Output schema instructions.
- Sentiment labels.

Expected output:

- Response index.
- Original response or stable reference.
- Candidate theme.
- Sentiment.
- Confidence.
- Reason.

### Theme Consolidation Template

Purpose:

- Merge candidate themes into canonical themes.

Inputs:

- Candidate theme names.
- Descriptions.
- Counts.
- Example references.

Expected output:

- Canonical theme name.
- Description.
- Included candidate themes.
- Merge rationale.

### Reassignment Template

Purpose:

- Assign responses to canonical themes.

Inputs:

- Response-level records.
- Canonical theme list.

Expected output:

- Response index.
- Canonical theme.
- Confidence adjustment if needed.

### Executive Insight Template

Purpose:

- Generate management-ready summaries, risks, recommendations, and conclusions.

Inputs:

- Theme counts.
- Sentiment counts.
- Representative examples.
- Response volume.

Expected output:

- Executive summary.
- Main themes.
- Positive highlights.
- Negative highlights.
- Key risks.
- Recommended actions.
- Conclusions.

## 15. Token Optimisation

Token optimization matters for cost, latency, and larger files.

Practices:

- Batch responses by size and estimated token count.
- Remove empty responses before analysis.
- Avoid repeating long instructions unnecessarily where a shorter version is sufficient.
- Use indexes to reference responses across stages.
- Summarize candidate themes before global consolidation.
- Avoid sending the entire raw dataset to every stage.
- Keep output schemas compact.

## 16. Cost Optimisation

Cost controls:

- Use batching to avoid oversized requests.
- Use lower-cost models for simple classification if quality is acceptable.
- Use higher-quality models for consolidation and executive insight generation.
- Track token usage by analysis and tenant in future SaaS versions.
- Set file and response count limits by plan in future subscription phases.
- Avoid unnecessary retries for deterministic validation errors.

## 17. Caching Strategy

Current MVP:

- Local output files act as the practical cache for analysed CSV and PDF reports.

Future SaaS:

- Cache completed analysis results by upload and analysis configuration.
- Cache generated reports by analysis result and report settings.
- Do not cache across tenants.
- Invalidate cache when source data, selected feedback column, prompt version, model version, or analysis configuration changes.

Do not cache sensitive raw feedback in client-side storage.

## 18. Rate Limiting

Current MVP:

- Rate limits are primarily governed by OpenAI API account limits and local execution.

Future SaaS:

- Apply tenant-level and user-level rate limits.
- Limit concurrent analysis jobs per workspace.
- Queue large jobs rather than running all requests synchronously.
- Surface friendly messages when usage limits are reached.

## 19. Retry Strategy

Retries should distinguish transient failures from deterministic failures.

Retry candidates:

- Network timeout.
- OpenAI transient service error.
- Rate limit with backoff.
- Temporary JSON parse failure if prompt/schema can be reattempted.

Do not blindly retry:

- Missing API key.
- Invalid upload ID.
- Unsupported file type.
- Empty feedback column.
- Consistently invalid model output after maximum retry attempts.

Retry policy:

- Use limited attempts.
- Use exponential backoff for provider errors.
- Preserve completed batch results where safe.
- Report partial failure clearly when recovery is not possible.

## 20. OpenAI Integration

OpenAI integration standards:

- Read `OPENAI_API_KEY` from environment variables.
- Never print or expose the API key.
- Keep model configuration centralized.
- Validate model responses before returning to frontend.
- Log provider errors without raw secrets.
- Keep prompts and output parsing maintainable.

The backend should be able to confirm whether an API key is detected without revealing the key.

## 21. Future Multi-model Support

Future multi-model support may include:

- Model routing by task type.
- Lower-cost model for first-pass response classification.
- Higher-quality model for executive summary and theme consolidation.
- Fallback model for provider outage.
- Evaluation framework to compare models before switching.

Model changes should be evaluated against historical sample files and should not silently degrade output quality.

## 22. Human Review Workflow

Human review is a future product capability that should focus on trust and quality.

Future workflow:

1. Highlight low-confidence responses.
2. Allow analyst to review and adjust theme or sentiment.
3. Allow theme rename, merge, or split.
4. Regenerate counts and report sections.
5. Preserve audit trail of human edits.

Human review should never be required for basic MVP completion, but it becomes important for professional and enterprise use.

## 23. Evaluation Metrics

AI quality metrics:

- Theme usefulness rating.
- Human agreement with sentiment.
- Human agreement with theme assignment.
- Duplicate theme rate after consolidation.
- Low-confidence response percentage.
- Executive summary usefulness.
- Recommendation specificity.
- Risk identification relevance.

Operational metrics:

- Analysis completion rate.
- Failure rate by stage.
- Average latency per response and per batch.
- Token cost per response.
- Retry rate.
- Partial failure rate.
- Multi-column response count.
- Cross-analysis availability by dataset.

Evaluation should use both sample datasets and real anonymized customer datasets where permitted.

## 24. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [03_User_Journey.md](03_User_Journey.md)
- [04_Wireframes.md](04_Wireframes.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [09_API_Standards.md](09_API_Standards.md)

## 25. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1 | TBD | TBD | Initial starter document. |
| 0.2 | 2026-07-05 | Codex | Expanded AI architecture with staged pipeline, prompt strategy, batching, quality checks, OpenAI integration, and evaluation guidance. |
| 1.1 | 2026-07-05 | Codex | Added dataset-level feedback intelligence, multi-column qualitative analysis, quantitative context, and cross-analysis guidance. |
