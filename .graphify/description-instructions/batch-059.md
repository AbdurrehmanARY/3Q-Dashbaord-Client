# Node Description Batch 60 of 74

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

- "production_orders_production_order_helpers_resource_slots": "RESOURCE_SLOTS" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L25 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_test_makeline": "makeLine()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.test.ts:L6 | neighbors=[production-order.helpers.test.ts]
- "production_orders_production_order_helpers_test_order": "order" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.test.ts:L39 | neighbors=[production-order.helpers.test.ts]
- "production_orders_production_order_helpers_transfertarget": "TransferTarget" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L5 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_overview_builder_avatarof": "avatarOf()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order-overview.builder.ts:L11 | neighbors=[production-order-overview.builder.ts]
- "production_orders_production_order_overview_builder_buildproductionoverviewbody": "buildProductionOverviewBody()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order-overview.builder.ts:L21 | neighbors=[production-order-overview.builder.ts]
- "production_orders_production_order_overview_builder_nameof": "nameOf()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order-overview.builder.ts:L6 | neighbors=[production-order-overview.builder.ts]
- "production_orders_production_order_repository_pageopts": "PageOpts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L23 | neighbors=[production-order.repository.ts]
- "production_orders_production_order_repository_productionorderrepository_applylinechangetransaction": ".applyLineChangeTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L623 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L250 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_createlineplantransaction": ".createLinePlanTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L495 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_createwithworkorderstatustx": ".createWithWorkOrderStatusTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L261 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_deletelinetransaction": ".deleteLineTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L555 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L111 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L184 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findbyworkorderid": ".findByWorkOrderId()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L233 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findeligibleworkorders": ".findEligibleWorkOrders()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L841 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findlastproductionnumber": ".findLastProductionNumber()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L241 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findlinebyid": ".findLineById()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L295 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findlineevents": ".findLineEvents()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L727 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findlineissuances": ".findLineIssuances()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L717 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findlines": ".findLines()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L287 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findorderevents": ".findOrderEvents()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L737 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findorderissuancetotals": ".findOrderIssuanceTotals()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L825 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findrawbyid": ".findRawById()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L228 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findresourceassignments": ".findResourceAssignments()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L770 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_findresourceusage": ".findResourceUsage()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L803 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_issuerollstransaction": ".issueRollsTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L677 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_lockresourcestx": ".lockResourcesTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L417 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_reconcilelinestocktransaction": ".reconcileLineStockTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L874 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_releaseorderinventorytransaction": ".releaseOrderInventoryTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L568 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_resourceidsfrompatch": ".resourceIdsFromPatch()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L475 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderrepository_updatelineplantransaction": ".updateLinePlanTransaction()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L524 | neighbors=[ProductionOrderRepository]
- "production_orders_production_order_repository_productionorderselect": "productionOrderSelect" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L72 | neighbors=[production-order.repository.ts]
- "production_orders_production_order_routes_router": "router" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.routes.ts:L18 | neighbors=[production-order.routes.ts]
- "production_orders_production_order_schema_assignlineresourcesdto": "AssignLineResourcesDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L168 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_assignlineresourcesschema": "assignLineResourcesSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L54 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_createbatchdto": "CreateBatchDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L161 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_createbatchschema": "createBatchSchema" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L132 | neighbors=[production-order.schema.ts]
- "production_orders_production_order_schema_createproductionorderdto": "CreateProductionOrderDTO" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L165 | neighbors=[production-order.schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-059.json

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
