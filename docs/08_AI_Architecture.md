# SurveyIQ AI Architecture

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document describes the AI analysis architecture for SurveyIQ, including inputs, processing stages, outputs, validation, and safety principles.

## Table of Contents

1. AI Architecture Goals
2. Inputs
3. Analysis Pipeline
4. Output Schema
5. Batching
6. Error Handling
7. Safety and Privacy
8. Future Improvements
9. Related Documents

## 1. AI Architecture Goals

- Produce consistent response-level analysis.
- Consolidate similar themes into canonical themes.
- Generate sentiment and confidence scores.
- Produce executive-ready insights.
- Preserve frontend-compatible outputs.
- Support larger files through batching.

## 2. Inputs

Primary input:

- Free-text feedback responses selected from an uploaded CSV or Excel file.

Supporting context:

- Row index.
- Candidate theme analysis.
- Canonical theme list.
- Batch metadata.

## 3. Analysis Pipeline

Current pipeline:

1. Analyse each individual response.
2. Identify candidate themes per batch.
3. Merge similar themes into a global canonical theme list.
4. Reassign every response to canonical themes.
5. Generate sentiment.
6. Generate confidence scores.
7. Generate executive insights.
8. Generate recommended actions.

## 4. Output Schema

Response-level output:

- Original response.
- Theme/category.
- Sentiment: positive, neutral, or negative.
- Confidence score.
- Short reason.

Overall output:

- Summary of main themes.
- Counts by theme.
- Counts by sentiment.
- Executive summary.
- Positive highlights.
- Negative highlights.
- Key risks.
- Recommended actions.
- AI-generated conclusions.

Exports:

- Analysed CSV.
- Management PDF report.

## 5. Batching

Current approach:

- Split feedback into batches.
- Run individual analysis and candidate theme generation per batch.
- Consolidate candidate themes globally.
- Reassign every batch to the global canonical theme list.
- Merge results.

Default batch size:

- `OPENAI_ANALYSIS_BATCH_SIZE=50`

## 6. Error Handling

Current principles:

- Do not save partial CSV outputs when a batch fails.
- Return clear stage and batch failure details.
- Validate model output shape before accepting it.
- Validate response indexes.
- Coerce near-match theme names to canonical themes when safe.

## 7. Safety and Privacy

Guidelines:

- Never expose API keys.
- Avoid logging raw feedback content.
- Keep error messages useful but not secret-bearing.
- Treat uploaded survey responses as sensitive business data.

## 8. Future Improvements

Structured placeholders:

- Add model retry policy.
- Add background job processing.
- Add evaluation datasets for analysis quality.
- Add human review for low-confidence responses.
- Add configurable taxonomies.
- Add segmentation analysis.

## 9. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [03_User_Journey.md](03_User_Journey.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [09_API_Standards.md](09_API_Standards.md)
