# Node Description Batch 43 of 53

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

- "operators_operator_controller_operatorcontroller": "OperatorController" | kind=code-symbol | source=server/src/modules/operators/operator.controller.ts:L6 | neighbors=[operator.controller.ts]
- "operators_operator_repository_operatorfilters": "OperatorFilters" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L8 | neighbors=[operator.repository.ts]
- "operators_operator_repository_operatorrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L48 | neighbors=[OperatorRepository]
- "operators_operator_repository_operatorrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L22 | neighbors=[OperatorRepository]
- "operators_operator_repository_operatorrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L43 | neighbors=[OperatorRepository]
- "operators_operator_repository_operatortype": "OperatorType" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L6 | neighbors=[operator.repository.ts]
- "operators_operator_routes_router": "router" | kind=code-symbol | source=server/src/modules/operators/operator.routes.ts:L8 | neighbors=[operator.routes.ts]
- "operators_operator_schema_avatarurlschema": "avatarUrlSchema" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L14 | neighbors=[operator.schema.ts]
- "operators_operator_schema_createoperatordto": "CreateOperatorDTO" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L46 | neighbors=[operator.schema.ts]
- "operators_operator_schema_createoperatorschema": "createOperatorSchema" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L21 | neighbors=[operator.schema.ts]
- "operators_operator_schema_operatortypeenum": "operatorTypeEnum" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L13 | neighbors=[operator.schema.ts]
- "operators_operator_schema_updateoperatordto": "UpdateOperatorDTO" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L47 | neighbors=[operator.schema.ts]
- "operators_operator_schema_updateoperatorschema": "updateOperatorSchema" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L33 | neighbors=[operator.schema.ts]
- "operators_operator_service_operatorservice_deleteoperator": ".deleteOperator()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L77 | neighbors=[OperatorService]
- "operators_operator_service_operatorservice_getoperator": ".getOperator()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L26 | neighbors=[OperatorService]
- "operators_operator_service_operatorservice_getoperators": ".getOperators()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L20 | neighbors=[OperatorService]
- "pages_companybrandpage_companybrandpage": "CompanyBrandPage()" | kind=code-symbol | source=client/src/features/companies/pages/CompanyBrandPage.tsx:L7 | neighbors=[CompanyBrandPage.tsx]
- "pages_dashboardpage_dashboardpage": "DashboardPage()" | kind=code-symbol | source=client/src/features/dashboard/pages/DashboardPage.tsx:L24 | neighbors=[DashboardPage.tsx]
- "pages_dyedthreadstockpage_dyedthreadstockpage": "DyedThreadStockPage()" | kind=code-symbol | source=client/src/features/inventory/pages/DyedThreadStockPage.tsx:L7 | neighbors=[DyedThreadStockPage.tsx]
- "pages_inkconsumptionpage_exportcolumns": "exportColumns" | kind=code-symbol | source=client/src/features/ink/pages/InkConsumptionPage.tsx:L22 | neighbors=[InkConsumptionPage.tsx]
- "pages_inkconsumptionpage_inkconsumptionpage": "InkConsumptionPage()" | kind=code-symbol | source=client/src/features/ink/pages/InkConsumptionPage.tsx:L32 | neighbors=[InkConsumptionPage.tsx]
- "pages_inkpurchasespage_exportcolumns": "exportColumns" | kind=code-symbol | source=client/src/features/ink/pages/InkPurchasesPage.tsx:L18 | neighbors=[InkPurchasesPage.tsx]
- "pages_inkpurchasespage_inkpurchasespage": "InkPurchasesPage()" | kind=code-symbol | source=client/src/features/ink/pages/InkPurchasesPage.tsx:L29 | neighbors=[InkPurchasesPage.tsx]
- "pages_inventorystockpage_inventorystockpage": "InventoryStockPage()" | kind=code-symbol | source=client/src/features/inventory/pages/InventoryStockPage.tsx:L19 | neighbors=[InventoryStockPage.tsx]
- "pages_inventorystockpage_stocktab": "StockTab" | kind=code-symbol | source=client/src/features/inventory/pages/InventoryStockPage.tsx:L7 | neighbors=[InventoryStockPage.tsx]
- "pages_inventorystockpage_tabs": "TABS" | kind=code-symbol | source=client/src/features/inventory/pages/InventoryStockPage.tsx:L9 | neighbors=[InventoryStockPage.tsx]
- "pages_labelsheetspage_labelsheetspage": "LabelSheetsPage()" | kind=code-symbol | source=client/src/features/materials/pages/LabelSheetsPage.tsx:L3 | neighbors=[LabelSheetsPage.tsx]
- "pages_localsheetspage_localsheetspage": "LocalSheetsPage()" | kind=code-symbol | source=client/src/features/materials/pages/LocalSheetsPage.tsx:L3 | neighbors=[LocalSheetsPage.tsx]
- "pages_machinesoperatorspage_machinesoperatorspage": "MachinesOperatorsPage()" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesOperatorsPage.tsx:L5 | neighbors=[MachinesOperatorsPage.tsx]
- "pages_machinespage_machinespage": "MachinesPage()" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesPage.tsx:L4 | neighbors=[MachinesPage.tsx]
- "pages_materialmasterpage_materialmasterpage": "MaterialMasterPage()" | kind=code-symbol | source=client/src/features/materials/pages/MaterialMasterPage.tsx:L8 | neighbors=[MaterialMasterPage.tsx]
- "pages_operatorspage_operatorspage": "OperatorsPage()" | kind=code-symbol | source=client/src/features/machines-operators/pages/OperatorsPage.tsx:L4 | neighbors=[OperatorsPage.tsx]
- "pages_productionorderdashboardpage_batchflowsection": "BatchFlowSection()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L359 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_field": "Field()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L396 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_printedproductionbody": "PrintedProductionBody()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L241 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_productionorderdashboardpage": "ProductionOrderDashboardPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L40 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderlistpage_productionorderlistpage": "ProductionOrderListPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderListPage.tsx:L9 | neighbors=[ProductionOrderListPage.tsx]
- "pages_productionorderplanningpage_field": "Field()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L142 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_productionorderplanningpage_productionorderplanningpage": "ProductionOrderPlanningPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L17 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_purchaserecordpage_purchaserecordpage": "PurchaseRecordPage()" | kind=code-symbol | source=client/src/features/purchases/pages/PurchaseRecordPage.tsx:L23 | neighbors=[PurchaseRecordPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-042.json

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
