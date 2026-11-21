# Node Description Batch 38 of 38

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "vitest_config": "vitest.config.ts" | kind=code-symbol | source=vitest.config.ts:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "work_orders_types_linkedproductionorder": "LinkedProductionOrder" | kind=code-symbol | source=src/features/work-orders/types.ts:L102 | neighbors=[types.ts]
- "work_orders_types_workorderpriority": "WorkOrderPriority" | kind=code-symbol | source=src/features/work-orders/types.ts:L27 | neighbors=[types.ts]
- "work_orders_types_workordertype": "WorkOrderType" | kind=code-symbol | source=src/features/work-orders/types.ts:L39 | neighbors=[types.ts]
- "work_orders_types_wovendetailinput": "WovenDetailInput" | kind=code-symbol | source=src/features/work-orders/types.ts:L114 | neighbors=[types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-037.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
