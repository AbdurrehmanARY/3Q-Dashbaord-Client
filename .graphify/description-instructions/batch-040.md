# Node Description Batch 41 of 74

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

- "users_user_repository_userrepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L42 | neighbors=[UserRepository, .update()]
- "users_user_repository_userrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L33 | neighbors=[UserRepository, .softDelete()]
- "utils_line_draft_linetodraft": "lineToDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L24 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts]
- "utils_line_draft_patchoverviewline": "patchOverviewLine()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L153 | neighbors=[use-production-orders.ts, line-draft.ts]
- "utils_planning_rows_labelkey": "labelKey()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L23 | neighbors=[planning-rows.ts, labelTypeTaken()]
- "utils_planning_rows_round3": "round3()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L87 | neighbors=[planning-rows.ts, allocateSharedThreads()]
- "utils_production_order_export_exportproductionordertoexcel": "exportProductionOrderToExcel()" | kind=code-symbol | source=client/src/features/production-orders/utils/production-order-export.ts:L8 | neighbors=[ProductionOrderDashboardPage.tsx, production-order-export.ts]
- "utils_production_order_export_printproductionorderjobticket": "printProductionOrderJobTicket()" | kind=code-symbol | source=client/src/features/production-orders/utils/production-order-export.ts:L77 | neighbors=[ProductionOrderDashboardPage.tsx, production-order-export.ts]
- "work_orders_types_work_order_priorities": "WORK_ORDER_PRIORITIES" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L28 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_types": "WORK_ORDER_TYPES" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L40 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_workorderstatus": "WorkOrderStatus" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L10 | neighbors=[work-order-table.tsx, types.ts]
- "work_orders_work_order_helpers": "work-order.helpers.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.helpers.ts:L1 | neighbors=[2e755d6 feat(server): persist estimated…, estimateWeavingHours()]
- "work_orders_work_order_repository_workorderrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L169 | neighbors=[WorkOrderRepository, .upsertWovenDetail()]
- "work_orders_work_order_repository_workorderrepository_upsertwovendetail": ".upsertWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L160 | neighbors=[WorkOrderRepository, .update()]
- "woven_production_woven_production_helpers_canstartcutting": "canStartCutting()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L65 | neighbors=[woven-production.helpers.ts, toNumbers()]
- "woven_production_woven_production_helpers_canstartpackaging": "canStartPackaging()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L71 | neighbors=[woven-production.helpers.ts, toNumbers()]
- "woven_production_woven_production_service_wovenproductionservice_getoverview": ".getOverview()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L58 | neighbors=[WovenProductionService, .assertWoven()]
- "woven_production_woven_production_service_wovenproductionservice_reconcileremainingthreads": ".reconcileRemainingThreads()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L451 | neighbors=[WovenProductionService, .getLineOrThrow()]
- "analytics_analytics_controller_analyticscontroller": "AnalyticsController" | kind=code-symbol | source=server/src/modules/analytics/analytics.controller.ts:L5 | neighbors=[analytics.controller.ts]
- "analytics_analytics_repository_analyticsrepository_countactiveproductionprogress": ".countActiveProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L25 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countcompletedproductionprogress": ".countCompletedProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L33 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countlowstock": ".countLowStock()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L48 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countmaterials": ".countMaterials()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L43 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countproductionprogress": ".countProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L20 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countsubmittedworkorders": ".countSubmittedWorkOrders()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L13 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countworkorders": ".countWorkOrders()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L7 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_sumbalancerolls": ".sumBalanceRolls()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L53 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_sumissuedrolls": ".sumIssuedRolls()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L58 | neighbors=[AnalyticsRepository]
- "analytics_analytics_routes_router": "router" | kind=code-symbol | source=server/src/modules/analytics/analytics.routes.ts:L4 | neighbors=[analytics.routes.ts]
- "analytics_analytics_service_analyticsservice_getkpis": ".getKpis()" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L4 | neighbors=[AnalyticsService]
- "app_approutes_pagefallback": "PageFallback()" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L6 | neighbors=[AppRoutes.tsx]
- "app_routes_approute": "AppRoute" | kind=code-symbol | source=client/src/app/routes.tsx:L7 | neighbors=[routes.tsx]
- "app_routes_page": "page()" | kind=code-symbol | source=client/src/app/routes.tsx:L18 | neighbors=[routes.tsx]
- "app_routes_redirectroute": "RedirectRoute" | kind=code-symbol | source=client/src/app/routes.tsx:L13 | neighbors=[routes.tsx]
- "baseline_live_schema_public_ink_purchases": "public.ink_purchases" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L398 | neighbors=[live-schema.sql]
- "baseline_live_schema_public_label_sheets": "public.label_sheets" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L511 | neighbors=[live-schema.sql]
- "baseline_live_schema_public_local_sheets": "public.local_sheets" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L547 | neighbors=[live-schema.sql]
- "baseline_live_schema_public_sticker_materials": "public.sticker_materials" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1040 | neighbors=[live-schema.sql]
- "baseline_live_schema_public_thread_purchases": "public.thread_purchases" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1226 | neighbors=[live-schema.sql]
- "batch_and_runs_batch_flow_controller_batchflowcontroller_constructor": ".constructor()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L20 | neighbors=[BatchFlowController]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-040.json

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
