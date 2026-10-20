# Node Description Batch 36 of 74

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

- "materials_receipts_types_materialreceiptconfig": "MaterialReceiptConfig" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L22 | neighbors=[MaterialReceiptPage.tsx, receipts-types.ts]
- "middleware_ratelimiter_authratelimiter": "authRateLimiter" | kind=code-symbol | source=server/src/shared/middleware/rateLimiter.ts:L20 | neighbors=[index.ts, rateLimiter.ts]
- "operators_operator_repository_operatorrepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L85 | neighbors=[OperatorRepository, .update()]
- "operators_operator_repository_operatorrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L61 | neighbors=[OperatorRepository, .softDelete()]
- "operators_operator_service_operatorservice_createoperator": ".createOperator()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L32 | neighbors=[OperatorService, normaliseAvatar()]
- "operators_operator_service_operatorservice_updateoperator": ".updateOperator()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L52 | neighbors=[OperatorService, normaliseAvatar()]
- "production_orders_batch_types_availablesources": "AvailableSources" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L96 | neighbors=[batch-types.ts, batch-service.ts]
- "production_orders_batch_types_batchstatus": "BatchStatus" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L22 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_batchtrace": "BatchTrace" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L200 | neighbors=[batch-types.ts, batch-service.ts]
- "production_orders_batch_types_batchtracerow": "BatchTraceRow" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L190 | neighbors=[BatchTraceDialog.tsx, batch-types.ts]
- "production_orders_batch_types_formatduration": "formatDuration()" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L80 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_isbatchopen": "isBatchOpen()" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L274 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_sizeassignment": "SizeAssignment" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L110 | neighbors=[CreateBatchDialog.tsx, batch-types.ts]
- "production_orders_batch_types_stageinputlabel": "stageInputLabel()" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L256 | neighbors=[CreateBatchDialog.tsx, batch-types.ts]
- "production_orders_batch_types_stageresources": "StageResources" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L137 | neighbors=[batch-types.ts, batch-service.ts]
- "production_orders_batch_types_stages_of": "STAGES_OF" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L14 | neighbors=[StageProgressBars.tsx, batch-types.ts]
- "production_orders_batch_types_upstream_stage": "UPSTREAM_STAGE" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L264 | neighbors=[CreateBatchDialog.tsx, batch-types.ts]
- "production_orders_label_types_label_types": "LABEL_TYPES" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L13 | neighbors=[PlanLabelTypeForm.tsx, label-types.ts]
- "production_orders_production_order_helpers_stagecompletionpatch": "stageCompletionPatch()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L110 | neighbors=[production-order.helpers.ts, toNumbers()]
- "production_orders_production_order_repository_productionorderrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L281 | neighbors=[ProductionOrderRepository, .releaseLineStockTx()]
- "production_orders_production_order_repository_productionorderrepository_drawstocktx": ".drawStockTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L319 | neighbors=[ProductionOrderRepository, .update()]
- "production_orders_production_order_repository_productionorderrepository_updateline": ".updateLine()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L303 | neighbors=[ProductionOrderRepository, .update()]
- "production_orders_production_order_repository_workorderstatusfor": "workOrderStatusFor()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L40 | neighbors=[production-order.repository.ts, syncWorkOrderStatusTx()]
- "production_orders_production_order_service_productionorderservice_createproductionorder": ".createProductionOrder()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L143 | neighbors=[ProductionOrderService, .nextProductionNumber()]
- "production_orders_production_order_service_productionorderservice_deleteproductionorder": ".deleteProductionOrder()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L224 | neighbors=[ProductionOrderService, .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_getavailableresources": ".getAvailableResources()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L114 | neighbors=[ProductionOrderService, .getResourceLocks()]
- "production_orders_production_order_service_productionorderservice_getlineevents": ".getLineEvents()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L998 | neighbors=[ProductionOrderService, .getLineOrThrow()]
- "production_orders_production_order_service_productionorderservice_getlineissuances": ".getLineIssuances()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L991 | neighbors=[ProductionOrderService, .getLineOrThrow()]
- "production_orders_production_order_service_productionorderservice_getorderevents": ".getOrderEvents()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L1003 | neighbors=[ProductionOrderService, .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_nextproductionnumber": ".nextProductionNumber()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L186 | neighbors=[ProductionOrderService, .createProductionOrder()]
- "production_orders_production_order_service_productionorderservice_reconcileline": ".reconcileLine()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L300 | neighbors=[ProductionOrderService, .getLineOrThrow()]
- "production_orders_types_availableresources": "AvailableResources" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L359 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_eligiblesalesorder": "EligibleSalesOrder" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L25 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionlinestatus": "ProductionLineStatus" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L6 | neighbors=[ProductionStatusBadge.tsx, types.ts]
- "production_orders_types_productionorderline": "ProductionOrderLine" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L70 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionrollissuance": "ProductionRollIssuance" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L376 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionstageevent": "ProductionStageEvent" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L316 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_woven_types_woventhread": "WovenThread" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L5 | neighbors=[WovenThreadReconciliationCard.tsx, woven-types.ts]
- "production_runs_types_run_reasons": "RUN_REASONS" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L10 | neighbors=[LogProductionRunDialog.tsx, types.ts]
- "production_runs_types_runreason": "RunReason" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L1 | neighbors=[LogProductionRunDialog.tsx, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-035.json

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
