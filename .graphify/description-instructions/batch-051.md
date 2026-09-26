# Node Description Batch 52 of 53

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

- "validation_query_schema_listoperatorsqueryschema": "listOperatorsQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L13 | neighbors=[query.schema.ts]
- "validation_query_schema_listproductionordersquerydto": "ListProductionOrdersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L73 | neighbors=[query.schema.ts]
- "validation_query_schema_listproductionordersqueryschema": "listProductionOrdersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L46 | neighbors=[query.schema.ts]
- "validation_query_schema_listpurchasesquerydto": "ListPurchasesQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L74 | neighbors=[query.schema.ts]
- "validation_query_schema_listpurchasesqueryschema": "listPurchasesQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L59 | neighbors=[query.schema.ts]
- "validation_query_schema_liststockquerydto": "ListStockQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L75 | neighbors=[query.schema.ts]
- "validation_query_schema_liststockqueryschema": "listStockQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L66 | neighbors=[query.schema.ts]
- "validation_query_schema_listusersquerydto": "ListUsersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L57 | neighbors=[query.schema.ts]
- "validation_query_schema_listusersqueryschema": "listUsersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L52 | neighbors=[query.schema.ts]
- "validation_query_schema_listworkordersquerydto": "ListWorkOrdersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L72 | neighbors=[query.schema.ts]
- "validation_query_schema_listworkordersqueryschema": "listWorkOrdersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L31 | neighbors=[query.schema.ts]
- "work_orders_types_linkedproductionorder": "LinkedProductionOrder" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L100 | neighbors=[types.ts]
- "work_orders_types_workorderpriority": "WorkOrderPriority" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L27 | neighbors=[types.ts]
- "work_orders_types_workordertype": "WorkOrderType" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L39 | neighbors=[types.ts]
- "work_orders_types_wovendetailinput": "WovenDetailInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L112 | neighbors=[types.ts]
- "work_orders_work_order_controller_workordercontroller": "WorkOrderController" | kind=code-symbol | source=server/src/modules/work-orders/work-order.controller.ts:L11 | neighbors=[work-order.controller.ts]
- "work_orders_work_order_repository_workorderrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L116 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_createwithwovendetail": ".createWithWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L135 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L186 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L46 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findbydesigncode": ".findByDesignCode()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L103 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L83 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findrawbyid": ".findRawById()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L111 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderrepository_findwovendetail": ".findWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L95 | neighbors=[WorkOrderRepository]
- "work_orders_work_order_repository_workorderwithbrandselect": "workOrderWithBrandSelect" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L11 | neighbors=[work-order.repository.ts]
- "work_orders_work_order_schema_artworkimageschema": "artworkImageSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L8 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_createworkorderdto": "CreateWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L102 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_createworkorderschema": "createWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L41 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_dispatchworkorderdto": "DispatchWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L104 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_dispatchworkorderschema": "dispatchWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L91 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_ordertypeschema": "orderTypeSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L39 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_priorityschema": "prioritySchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L38 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_updateworkorderdto": "UpdateWorkOrderDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L103 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_updateworkorderschema": "updateWorkOrderSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L65 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_work_order_priorities": "WORK_ORDER_PRIORITIES" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L36 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_work_order_types": "WORK_ORDER_TYPES" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L37 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_wovendetaildto": "WovenDetailDTO" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L105 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_schema_wovendetailschema": "wovenDetailSchema" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L24 | neighbors=[work-order.schema.ts]
- "work_orders_work_order_service_workorderservice_createworkorder": ".createWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L41 | neighbors=[WorkOrderService]
- "work_orders_work_order_service_workorderservice_deleteworkorder": ".deleteWorkOrder()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L289 | neighbors=[WorkOrderService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-051.json

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
