---
title: LLM Serving Latency Notes
description: A compact note on the latency budget behind practical LLM serving.
publishedAt: 2026-04-29
updatedAt: 2026-04-29
draft: false
tags:
  - llm-serving
  - latency
  - evaluation
  - study-note
  - diagram
series: practical-ai-systems
relatedProjects:
  - inference-notes-build
language: mixed
featured: true
primaryLabel: LLM serving
---

## Question

Where does latency hide in a practical LLM request path?

## Current understanding

Latency is not one number. It is a chain: request validation, queueing, prefill, decode, post-processing, and delivery back to the user.

```mermaid
flowchart LR
  A[Request] --> B[Queue]
  B --> C[Prefill]
  C --> D[Decode]
  D --> E[Response]
```

## Next learning step

Compare the latency profile of a tiny local model with a hosted API request.
