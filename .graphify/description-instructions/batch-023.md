# Node Description Batch 24 of 74

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

- "materials_receipts_types_receiptkind": "ReceiptKind" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L1 | neighbors=[use-material-receipts.ts, receipts-types.ts, material-receipts-service.ts]
- "materials_types_materialinput": "MaterialInput" | kind=code-symbol | source=client/src/features/materials/types.ts:L14 | neighbors=[use-materials.ts, types.ts, material-service.ts]
- "middleware_ratelimiter_apiratelimiter": "apiRateLimiter" | kind=code-symbol | source=server/src/shared/middleware/rateLimiter.ts:L8 | neighbors=[index.ts, rateLimiter.ts, app.ts]
- "operators_operator_service_normaliseavatar": "normaliseAvatar()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L8 | neighbors=[operator.service.ts, .createOperator(), .updateOperator()]
- "production_orders_batch_types_createconsumingbatchinput": "CreateConsumingBatchInput" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L222 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_createprintingbatchinput": "CreatePrintingBatchInput" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L213 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_orderflow": "OrderFlow" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L177 | neighbors=[batch-types.ts, index.ts, batch-service.ts]
- "production_orders_batch_types_recordoutputinput": "RecordOutputInput" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L239 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_stagemachine": "StageMachine" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L127 | neighbors=[CreateBatchDialog.tsx, batch-types.ts, StageResource]
- "production_orders_batch_types_stageoperator": "StageOperator" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L131 | neighbors=[CreateBatchDialog.tsx, batch-types.ts, StageResource]
- "production_orders_batch_types_stageresource": "StageResource" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L119 | neighbors=[batch-types.ts, StageMachine, StageOperator]
- "production_orders_batch_types_unit_label": "UNIT_LABEL" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L20 | neighbors=[BatchOutputDialog.tsx, CreateBatchDialog.tsx, batch-types.ts]
- "production_orders_batch_types_updatebatchinput": "UpdateBatchInput" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L229 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_label_types_issizelabel": "isSizeLabel()" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L26 | neighbors=[CreateBatchDialog.tsx, PlanLabelTypeForm.tsx, label-types.ts]
- "production_orders_production_order_helpers_derivelinestatus": "deriveLineStatus()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L140 | neighbors=[production-order.helpers.ts, hasAnyProgress(), toNumbers()]
- "production_orders_production_order_helpers_hasanyprogress": "hasAnyProgress()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L125 | neighbors=[production-order.helpers.ts, deriveLineStatus(), toNumbers()]
- "production_orders_production_order_repository_productionorderrepository_releaselinestocktx": ".releaseLineStockTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L360 | neighbors=[ProductionOrderRepository, .delete(), .update()]
- "production_orders_production_order_repository_productionorderrepository_resyncordertx": ".resyncOrderTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L390 | neighbors=[ProductionOrderRepository, .update(), syncWorkOrderStatusTx()]
- "production_orders_production_order_service_productionorderservice_completeproductionorder": ".completeProductionOrder()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L1013 | neighbors=[ProductionOrderService, .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "production_orders_production_order_service_productionorderservice_deleteline": ".deleteLine()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L284 | neighbors=[ProductionOrderService, .getLineOrThrow(), .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_issuerolls": ".issueRolls()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L930 | neighbors=[ProductionOrderService, .getLineOrThrow(), .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_planline": ".planLine()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L239 | neighbors=[ProductionOrderService, .buildPlanRow(), .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_updateproductionorder": ".updateProductionOrder()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L193 | neighbors=[ProductionOrderService, .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "production_orders_types_assignresourcesinput": "AssignResourcesInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L393 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_createproductionorderinput": "CreateProductionOrderInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L331 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_issuerollsinput": "IssueRollsInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L386 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_lineplanning": "LinePlanning" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L110 | neighbors=[types.ts, line-draft.ts, line-draft.test.ts]
- "production_orders_types_productionorderdetail": "ProductionOrderDetail" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L104 | neighbors=[types.ts, ProductionOrder, production-order-service.ts]
- "production_orders_types_productionorderstatus": "ProductionOrderStatus" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L1 | neighbors=[ProductionStatusBadge.tsx, use-completion-celebration.ts, types.ts]
- "production_orders_types_productionstage": "ProductionStage" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L8 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_reconcileinput": "ReconcileInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L206 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_stageprogressinput": "StageProgressInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L400 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_transferrollsinput": "TransferRollsInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L407 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_woven_types_weavinginput": "WeavingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L110 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovencuttinginput": "WovenCuttingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L116 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenoverview": "WovenOverview" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L68 | neighbors=[index.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenpackaginginput": "WovenPackagingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L122 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_runs_types_logproductionruninput": "LogProductionRunInput" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L72 | neighbors=[use-production-runs.ts, types.ts, production-run-service.ts]
- "production_runs_types_productionrun": "ProductionRun" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L30 | neighbors=[ProductionHistoryTable.tsx, types.ts, production-run-service.ts]
- "production_runs_types_productionsummary": "ProductionSummary" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L61 | neighbors=[ProductionSummaryCard.tsx, types.ts, production-run-service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-023.json

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
