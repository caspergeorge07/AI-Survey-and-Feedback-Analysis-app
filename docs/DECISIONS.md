# SurveyIQ Product and Technical Decisions

**Version:** 0.1  
**Owner:** TBD  
**Last Updated:** TBD  
**Status:** Draft

## Purpose

This document records significant product, UX, and technical decisions for SurveyIQ. It should explain what was decided, why, and what trade-offs were accepted.

## Table of Contents

1. Decision Log Format
2. Active Decisions
3. Pending Decisions
4. Superseded Decisions
5. Related Documents

## 1. Decision Log Format

Each decision should use:

- ID
- Date
- Owner
- Status
- Context
- Decision
- Rationale
- Consequences
- Related documents

## 2. Active Decisions

### DEC-001: Preserve MVP API Compatibility

**Date:** TBD  
**Owner:** TBD  
**Status:** Active

**Context:** The MVP already supports upload, preview, analysis, CSV download, and PDF report generation.  
**Decision:** New backend response fields should be additive where possible.  
**Rationale:** Preserves frontend compatibility while allowing the platform to evolve.  
**Consequences:** Existing clients should continue to work when report fields are added.

### DEC-002: Keep Current MVP Local-First

**Date:** TBD  
**Owner:** TBD  
**Status:** Active

**Context:** The current MVP uses local file handling rather than authentication, database storage, or subscriptions.  
**Decision:** Continue using local file handling until the core analysis and reporting workflow is validated.  
**Rationale:** Reduces complexity while product-market assumptions are tested.  
**Consequences:** SaaS capabilities will require future architecture work.

### DEC-003: Use Multi-Stage AI Analysis

**Date:** TBD  
**Owner:** TBD  
**Status:** Active

**Context:** A single prompt is less reliable for high-quality qualitative analysis.  
**Decision:** Use a staged pipeline for individual response analysis, candidate themes, canonical theme consolidation, reassignment, sentiment, confidence, insights, and actions.  
**Rationale:** Improves consistency and insight quality.  
**Consequences:** Analysis takes longer and requires stronger error handling.

## 3. Pending Decisions

- When to introduce authentication.
- Whether PDF report links should be exposed in the frontend immediately.
- Whether users should be able to edit themes before generating reports.
- Which database should support the first SaaS version.

## 4. Superseded Decisions

None yet.

## 5. Related Documents

- [01_Product_Vision.md](01_Product_Vision.md)
- [06_Product_Roadmap.md](06_Product_Roadmap.md)
- [07_Development_Roadmap.md](07_Development_Roadmap.md)
- [08_AI_Architecture.md](08_AI_Architecture.md)
