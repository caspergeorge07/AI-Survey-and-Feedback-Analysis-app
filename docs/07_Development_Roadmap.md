# SurveyIQ Development Roadmap

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document translates the product roadmap into technical development phases. It should guide engineering sequencing while preserving the working MVP.

## Table of Contents

1. Development Principles
2. Current Architecture
3. Phase 1: MVP Stabilization
4. Phase 2: Analysis Reliability
5. Phase 3: Reporting Experience
6. Phase 4: SaaS Foundation
7. Technical Risks
8. Related Documents

## 1. Development Principles

- Preserve existing API compatibility where possible.
- Avoid premature enterprise architecture.
- Keep backend analysis testable.
- Keep file handling explicit and safe.
- Do not expose secrets.

## 2. Current Architecture

Current MVP:

- Next.js frontend.
- FastAPI backend.
- pandas file parsing.
- OpenAI API analysis.
- Local file storage.
- CSV export.
- PDF report export.

## 3. Phase 1: MVP Stabilization

Placeholder tasks:

- Add backend tests for upload, analysis, download, and report generation.
- Add frontend smoke test for upload-to-analysis flow.
- Add clearer developer setup validation.
- Document environment variables.

## 4. Phase 2: Analysis Reliability

Placeholder tasks:

- Improve batching observability.
- Add retry policy for transient OpenAI failures.
- Add configurable limits for file size and response count.
- Add structured failure reporting by batch and stage.

## 5. Phase 3: Reporting Experience

Placeholder tasks:

- Display PDF report download in the frontend.
- Add report preview page.
- Improve report template structure.
- Add report visual QA checks to test process.

## 6. Phase 4: SaaS Foundation

Placeholder tasks:

- Add database design.
- Add authentication.
- Add workspace model.
- Add project model.
- Add background job processing.
- Add persistent report library.

## 7. Technical Risks

- Long-running analysis requests may time out in production.
- Large files may require background processing.
- AI output validation must remain strict enough to protect exports.
- PDF layout can regress as report content grows.

## 8. Related Documents

- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
- [09_API_Standards.md](09_API_Standards.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
