# Node Description Batch 53 of 53

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

- "work_orders_work_order_service_workorderservice_dispatchworkorder": ".dispatchWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L127 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_getworkorder": ".getWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L28 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_getworkorders": ".getWorkOrders()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L14 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_updateworkorder": ".updateWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L189 | neighbors=[WorkOrderService]
- "work_orders_work_orders_routes_router": "router" | kind=code-symbol | source=server/src/modules/work-orders/work-orders.routes.ts:L17 | neighbors=[work-orders.routes.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-052.json

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
