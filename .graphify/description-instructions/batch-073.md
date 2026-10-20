# Node Description Batch 74 of 74

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

- "woven_production_woven_production_repository_wovenproductionrepository_findlines": ".findLines()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L41 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_findordercontext": ".findOrderContext()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L66 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_findresourcenames": ".findResourceNames()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L89 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_findthreadplan": ".findThreadPlan()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L57 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_reconcileremainingthreadstransaction": ".reconcileRemainingThreadsTransaction()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L232 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_resyncordertx": ".resyncOrderTx()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L302 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_saveplantransaction": ".savePlanTransaction()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L102 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_routes_orderlineparamsschema": "orderLineParamsSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.routes.ts:L17 | neighbors=[woven-production.routes.ts]
- "woven_production_woven_production_routes_router": "router" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.routes.ts:L14 | neighbors=[woven-production.routes.ts]
- "woven_production_woven_production_schema_denierenum": "denierEnum" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L3 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_planwovenlinedto": "PlanWovenLineDTO" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L86 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_planwovenlineschema": "planWovenLineSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L34 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_reconcileremainingthreadsdto": "ReconcileRemainingThreadsDTO" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L90 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_reconcileremainingthreadsschema": "reconcileRemainingThreadsSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L74 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_sizeplanitemschema": "sizePlanItemSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L16 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_threadplanitemschema": "threadPlanItemSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L6 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updateweavingdto": "UpdateWeavingDTO" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L87 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updateweavingschema": "updateWeavingSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L48 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updatewovencuttingdto": "UpdateWovenCuttingDTO" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L88 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updatewovencuttingschema": "updateWovenCuttingSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L57 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updatewovenpackagingdto": "UpdateWovenPackagingDTO" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L89 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_schema_updatewovenpackagingschema": "updateWovenPackagingSchema" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L65 | neighbors=[woven-production.schema.ts]
- "woven_production_woven_production_service_planwoveninput": "PlanWovenInput" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L21 | neighbors=[woven-production.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-073.json

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
