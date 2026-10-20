# Node Description Batch 61 of 74

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

- "production_orders_production_order_schema_createproductionorderschema": "createProductionOrderSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L29 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_issuerollsdto": "IssueRollsDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L164 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_issuerollsschema": "issueRollsSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L84 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_planlinedto": "PlanLineDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L167 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_planlinerequestschema": "planLineRequestSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L48 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_planlineschema": "planLineSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L12 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_reconcilelinedto": "ReconcileLineDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L162 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_reconcilelineschema": "reconcileLineSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L122 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_sizeplanitemschema": "sizePlanItemSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L4 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_transferrollsdto": "TransferRollsDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L170 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_transferrollsschema": "transferRollsSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L74 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatebatchdto": "UpdateBatchDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L160 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatebatchschema": "updateBatchSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L146 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatelinefulldto": "UpdateLineFullDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L163 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatelinefullschema": "updateLineFullSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L99 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updateproductionorderdto": "UpdateProductionOrderDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L166 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updateproductionorderschema": "updateProductionOrderSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L37 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatestageprogressdto": "UpdateStageProgressDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L169 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_updatestageprogressschema": "updateStageProgressSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L64 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_service_productionorderservice_geteligiblesalesorders": ".getEligibleSalesOrders()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L54 | neighbors=[ProductionOrderService]
- "production_orders_production_order_service_productionorderservice_getproductionorder": ".getProductionOrder()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L46 | neighbors=[ProductionOrderService]
- "production_orders_production_order_service_productionorderservice_getproductionorderoverview": ".getProductionOrderOverview()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L1033 | neighbors=[ProductionOrderService]
- "production_orders_production_order_service_productionorderservice_getproductionorders": ".getProductionOrders()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L42 | neighbors=[ProductionOrderService]
- "production_orders_types_linecutting": "LineCutting" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L160 | neighbors=[types.ts]
- "production_orders_types_lineliveprogress": "LineLiveProgress" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L183 | neighbors=[types.ts]
- "production_orders_types_linematerial": "LineMaterial" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L128 | neighbors=[types.ts]
- "production_orders_types_linepackaging": "LinePackaging" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L172 | neighbors=[types.ts]
- "production_orders_types_lineprinting": "LinePrinting" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L147 | neighbors=[types.ts]
- "production_orders_types_linereadiness": "LineReadiness" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L142 | neighbors=[types.ts]
- "production_orders_types_linereconciliation": "LineReconciliation" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L198 | neighbors=[types.ts]
- "production_orders_types_machineavailability": "MachineAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L366 | neighbors=[types.ts]
- "production_orders_types_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L367 | neighbors=[types.ts]
- "production_orders_types_productioneventtype": "ProductionEventType" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L307 | neighbors=[types.ts]
- "production_orders_types_productionorderheader": "ProductionOrderHeader" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L248 | neighbors=[types.ts]
- "production_orders_types_productionordertotals": "ProductionOrderTotals" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L272 | neighbors=[types.ts]
- "production_orders_types_resourceavailability": "ResourceAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L370 | neighbors=[types.ts]
- "production_orders_types_stageinventoryposition": "StageInventoryPosition" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L213 | neighbors=[types.ts]
- "production_orders_types_transfertarget": "TransferTarget" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L9 | neighbors=[types.ts]
- "production_orders_types_user": "User" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L13 | neighbors=[types.ts]
- "production_orders_types_userrole": "UserRole" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L11 | neighbors=[types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-060.json

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
