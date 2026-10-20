# Node Description Batch 27 of 74

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

- "work_orders_types_product_type_meta": "PRODUCT_TYPE_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L21 | neighbors=[work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_workorderinput": "WorkOrderInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L124 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]
- "woven_production_woven_production_helpers_derivewovenlinestatus": "deriveWovenLineStatus()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L34 | neighbors=[woven-production.helpers.ts, hasWovenProgress(), toNumbers()]
- "woven_production_woven_production_helpers_haswovenprogress": "hasWovenProgress()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L23 | neighbors=[woven-production.helpers.ts, deriveWovenLineStatus(), toNumbers()]
- "woven_production_woven_production_service_wovenproductionservice_assertwoven": ".assertWoven()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L46 | neighbors=[WovenProductionService, .getOverview(), .planLine()]
- "woven_production_woven_production_service_wovenproductionservice_deleteline": ".deleteLine()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L295 | neighbors=[WovenProductionService, .getLineOrThrow(), .getOrderOrThrow()]
- "analytics_analytics_routes": "analytics.routes.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.routes.ts:L1 | neighbors=[router, ee6d4dd refactor(server): vertical-slic…]
- "analytics_analytics_service": "analytics.service.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L1 | neighbors=[AnalyticsService, ee6d4dd refactor(server): vertical-slic…]
- "analytics_analytics_service_analyticsservice": "AnalyticsService" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L3 | neighbors=[analytics.service.ts, .getKpis()]
- "app_appproviders_appproviders": "AppProviders()" | kind=code-symbol | source=client/src/app/AppProviders.tsx:L14 | neighbors=[AppProviders.tsx, app.ts]
- "app_approutes_approutes": "AppRoutes()" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L15 | neighbors=[AppRoutes.tsx, app.ts]
- "app_routes_redirects": "redirects" | kind=code-symbol | source=client/src/app/routes.tsx:L59 | neighbors=[AppRoutes.tsx, routes.tsx]
- "app_routes_routes": "routes" | kind=code-symbol | source=client/src/app/routes.tsx:L23 | neighbors=[AppRoutes.tsx, routes.tsx]
- "baseline_live_schema_public_companies": "public.companies" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L325 | neighbors=[live-schema.sql, public.brands]
- "baseline_live_schema_public_ink_consumptions": "public.ink_consumptions" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L362 | neighbors=[live-schema.sql, public.operators]
- "baseline_live_schema_public_purchase_records": "public.purchase_records" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L993 | neighbors=[live-schema.sql, public.materials]
- "baseline_live_schema_public_thread_dyeing_allocations": "public.thread_dyeing_allocations" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1117 | neighbors=[live-schema.sql, public.thread_dyeing_sends]
- "baseline_live_schema_public_thread_dyeing_receives": "public.thread_dyeing_receives" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1153 | neighbors=[live-schema.sql, public.thread_dyeing_sends]
- "baseline_live_schema_public_thread_service_providers": "public.thread_service_providers" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1267 | neighbors=[live-schema.sql, public.thread_dyeing_sends]
- "baseline_live_schema_public_woven_work_order_details": "public.woven_work_order_details" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1549 | neighbors=[live-schema.sql, public.work_orders]
- "batch_and_runs_batch_flow_controller_batchflowcontroller": "BatchFlowController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L19 | neighbors=[batch-flow.controller.ts, .constructor()]
- "batch_and_runs_batch_flow_helpers_assertoutputwithininput": "assertOutputWithinInput()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L307 | neighbors=[batch-flow.helpers.ts, round2()]
- "batch_and_runs_batch_flow_helpers_assertwithinplan": "assertWithinPlan()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L272 | neighbors=[batch-flow.helpers.ts, round2()]
- "batch_and_runs_batch_flow_helpers_batchquantities": "BatchQuantities" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L112 | neighbors=[batch-flow.helpers.ts, FlowBatch]
- "batch_and_runs_batch_flow_helpers_flowbatch": "FlowBatch" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L178 | neighbors=[batch-flow.helpers.ts, BatchQuantities]
- "batch_and_runs_batch_flow_helpers_linesizeflows": "lineSizeFlows()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L203 | neighbors=[batch-flow.helpers.ts, lineFlowOf()]
- "batch_and_runs_batch_flow_helpers_n": "n()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L131 | neighbors=[batch-flow.helpers.ts, batchPositionOf()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_assertresourcesfreetx": ".assertResourcesFreeTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1121 | neighbors=[BatchFlowRepository, .insertBatchTx()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_assertstageresources": ".assertStageResources()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1069 | neighbors=[BatchFlowRepository, .insertBatchTx()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L242 | neighbors=[BatchFlowRepository, .attachSources()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_findbyorder": ".findByOrder()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L211 | neighbors=[BatchFlowRepository, .attachSources()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_locklinetx": ".lockLineTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L783 | neighbors=[BatchFlowRepository, .lockBatchAndScopeTx()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_remainingplannedsizetx": ".remainingPlannedSizeTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L907 | neighbors=[BatchFlowRepository, round2()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_remainingplannedtx": ".remainingPlannedTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L854 | neighbors=[BatchFlowRepository, round2()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_resynclinestx": ".resyncLinesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1386 | neighbors=[BatchFlowRepository, .resyncLineTx()]
- "batch_and_runs_batch_flow_repository_linerefofbatch": "lineRefOfBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L137 | neighbors=[batch-flow.repository.ts, .scopeOfTx()]
- "batch_and_runs_batch_flow_repository_linerefofbatchornull": "lineRefOfBatchOrNull()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L149 | neighbors=[batch-flow.repository.ts, .lockSourcesTx()]
- "batch_and_runs_batch_flow_repository_linevalues": "lineValues()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L119 | neighbors=[batch-flow.repository.ts, scopeValues()]
- "batch_and_runs_batch_flow_service_batchflowservice_deletebatch": ".deleteBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L490 | neighbors=[BatchFlowService, .assertBatchStage()]
- "batch_and_runs_batch_flow_service_batchflowservice_getorderbatches": ".getOrderBatches()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L129 | neighbors=[BatchFlowService, .withEstimates()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-026.json

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
