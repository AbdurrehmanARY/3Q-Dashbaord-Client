# Node Description Batch 73 of 74

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

- "work_orders_work_order_controller_workordercontroller": "WorkOrderController" | kind=code-symbol | source=server/src/modules/work-orders/work-order.controller.ts:L11 | neighbors=[work-order.controller.ts]
- "work_orders_work_order_helpers_estimateweavinghours": "estimateWeavingHours()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.helpers.ts:L13 | neighbors=[work-order.helpers.ts]
- "work_orders_work_order_helpers_test": "work-order.helpers.test.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.helpers.test.ts:L1 | neighbors=[2e755d6 feat(server): persist estimated…]
- "work_orders_work_order_repository_workorderrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L117 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_createwithwovendetail": ".createWithWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L137 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L189 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L47 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findbydesigncode": ".findByDesignCode()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L104 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L84 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findrawbyid": ".findRawById()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L112 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findwovendetail": ".findWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L96 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderwithbrandselect": "workOrderWithBrandSelect" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L11 | neighbors=[work-order.repository.ts]
- "work_orders_work_order_schema_artworkimageschema": "artworkImageSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L8 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_createworkorderdto": "CreateWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L106 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_createworkorderschema": "createWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L41 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_dispatchworkorderdto": "DispatchWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L108 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_dispatchworkorderschema": "dispatchWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L94 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_ordertypeschema": "orderTypeSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L39 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_priorityschema": "prioritySchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L38 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_updateworkorderdto": "UpdateWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L107 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_updateworkorderschema": "updateWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L67 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_work_order_priorities": "WORK_ORDER_PRIORITIES" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L36 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_work_order_types": "WORK_ORDER_TYPES" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L37 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_wovendetaildto": "WovenDetailDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L109 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_wovendetailschema": "wovenDetailSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L24 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_service_workorderservice_createworkorder": ".createWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L41 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_deleteworkorder": ".deleteWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L292 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_dispatchworkorder": ".dispatchWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L127 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_getworkorder": ".getWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L28 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_getworkorders": ".getWorkOrders()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L14 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_updateworkorder": ".updateWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L191 | neighbors=[WorkOrderService]
- "work_orders_work_orders_routes_router": "router" | kind=code-symbol | source=server/src/modules/work-orders/work-orders.routes.ts:L17 | neighbors=[work-orders.routes.ts]
- "woven_production_woven_production_controller_wovenproductioncontroller": "WovenProductionController" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.controller.ts:L12 | neighbors=[woven-production.controller.ts]
- "woven_production_woven_production_helpers_derivewovenorderpatch": "deriveWovenOrderPatch()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L41 | neighbors=[woven-production.helpers.ts]
- "woven_production_woven_production_helpers_test_makeline": "makeLine()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.test.ts:L11 | neighbors=[woven-production.helpers.test.ts]
- "woven_production_woven_production_helpers_test_order": "order" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.test.ts:L38 | neighbors=[woven-production.helpers.test.ts]
- "woven_production_woven_production_repository_threadplaninput": "ThreadPlanInput" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L21 | neighbors=[woven-production.repository.ts]
- "woven_production_woven_production_repository_wovenproductionrepository_applystagechangetransaction": ".applyStageChangeTransaction()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L203 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_deletelinetransaction": ".deleteLineTransaction()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L185 | neighbors=[WovenProductionRepository]
- "woven_production_woven_production_repository_wovenproductionrepository_findlinebyid": ".findLineById()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L49 | neighbors=[WovenProductionRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-072.json

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
