# Node Description Batch 12 of 74

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_empty_emptycontent": "EmptyContent()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L84 | neighbors=[BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, purchase-table.tsx]
- "baseline_live_schema_public_operators": "public.operators" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L661 | neighbors=[live-schema.sql, public.ink_consumptions, public.machines, public.users, public.production_batches, public.production_order_lines]
- "baseline_live_schema_public_production_orders": "public.production_orders" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L822 | neighbors=[live-schema.sql, public.batch_consumptions, public.production_batches, public.production_order_lines, public.users, public.work_orders]
- "batch_and_runs_batch_flow_service_batchflowservice_assertbatchstage": ".assertBatchStage()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L500 | neighbors=[BatchFlowService, .cancelBatch(), .completeBatch(), .deleteBatch(), .recordOutput(), .startBatch()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@748f587970f6315a237d3ebbec33be6dbc1f2282": "748f587 chore: migration reconciliation and diagnostic scripts, root tox runner" | kind=Commit | source=git | neighbors=[19ed10f chore(server): rebuild committe…, chore/ci, 0a3ef12 fix(production): order-scoped c…, reconcile-migrations.mjs, tree-src.mjs, verify-batch-constraints.mjs]
- "companies_company_repository_companyrepository": "CompanyRepository" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L6 | neighbors=[company.repository.ts, .create(), .findAll(), .findByCompanyName(), .findById(), .softDelete()]
- "companies_company_service_brandservice": "BrandService" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L42 | neighbors=[company.service.ts, .createBrand(), .deleteBrand(), .getBrand(), .getBrands(), .getBrandsByCompany()]
- "companies_company_service_companyservice": "CompanyService" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L6 | neighbors=[company.service.ts, .createCompany(), .deleteCompany(), .getCompanies(), .getCompanyById(), .getCompanyByName()]
- "components_orderinfo": "OrderInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/OrderInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, OrderInfo(), AppInput.tsx, AppInput, work-order-schemas.ts, WorkOrderSchemaInput]
- "constants_labels_validatesizeplan": "validateSizePlan()" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L13 | neighbors=[batch-flow.helpers.test.ts, labels.ts, normalizeSizePlan(), production-order.service.ts, woven-production.service.ts, production-order-service.ts]
- "db_copy_from_local_main": "main()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L67 | neighbors=[copy-from-local.ts, dest, fkEdges(), IGNORE(), publicTables(), src]
- "db_index_tx": "Tx" | kind=code-symbol | source=server/src/shared/db/index.ts:L12 | neighbors=[batch-flow.repository.ts, index.ts, inventory.repository.ts, inventory-roll.repository.ts, production-order.repository.ts, thread-inventory.repository.ts]
- "formulas_purchase_formula": "purchase-formula.ts" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, seed.ts, seed-master.ts, calculateInvoiceWeight(), calculateTotalRollPer200m(), purchase-formula.test.ts]
- "hooks_use_completion_celebration": "use-completion-celebration.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-completion-celebration.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useCompletionCelebration(), celebrate.ts, celebrateCompletion(), types.ts, ProductionOrderStatus]
- "ink_ink_repository": "ink.repository.ts" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewInkConsumption, NewInkPurchase]
- "ink_ink_schema": "ink.schema.ts" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateInkConsumptionDTO, createInkConsumptionSchema, CreateInkPurchaseDTO, createInkPurchaseSchema, UpdateInkPurchaseDTO]
- "inventory_inventory_roll_service_inventoryrollservice": "InventoryRollService" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L39 | neighbors=[inventory-roll.service.ts, .createInventoryRoll(), .deleteInventoryRoll(), .getInventoryRollByMaterialCode(), .getInventoryRolls(), .getMovements()]
- "inventory_inventory_service_inventoryservice": "InventoryService" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L39 | neighbors=[inventory.service.ts, .createPurchase(), .deletePurchase(), .getPurchase(), .getPurchases(), .getStock()]
- "inventory_material_repository": "material.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Material, index.ts]
- "inventory_material_repository_materialrepository": "MaterialRepository" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L7 | neighbors=[material.repository.ts, .create(), .findAll(), .findByCode(), .findById(), .softDelete()]
- "inventory_material_service_materialservice": "MaterialService" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L7 | neighbors=[material.service.ts, .createMaterial(), .deleteMaterial(), .getMaterialByCode(), .getMaterialById(), .getMaterials()]
- "label_types_label_types_repository": "label-types.repository.ts" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, index.ts, db, schema.ts, LabelType, NewLabelType]
- "label_types_label_types_repository_labeltypesrepository": "LabelTypesRepository" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L6 | neighbors=[label-types.repository.ts, .create(), .delete(), .findAll(), .findById(), .findByNameAndCategory()]
- "lib_format_formatdatetime": "formatDateTime()" | kind=code-symbol | source=client/src/lib/format.ts:L27 | neighbors=[ink-consumption-columns.tsx, ProductionSummary.tsx, roll-stock-row-actions.tsx, StockReconciliationCard.tsx, WovenProductionPanel.tsx, format.ts]
- "lib_format_test": "format.test.ts" | kind=code-symbol | source=client/src/lib/format.test.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, format.ts, calculateRequiredRolls(), calculateTotalRolls(), formatDate(), formatNumber()]
- "machines_machine_repository": "machine.repository.ts" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Machine, MachineProductType]
- "material_receipts_material_receipts_routes": "material-receipts.routes.ts" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, labelSheetsRouter, localSheetsRouter, stickerMaterialsRouter, validateRequest.ts, validateParams()]
- "material_receipts_material_receipts_service_money": "money()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L18 | neighbors=[material-receipts.service.ts, .create(), .update(), .create(), .update(), .create()]
- "materials_types_material": "Material" | kind=code-symbol | source=client/src/features/materials/types.ts:L1 | neighbors=[material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, index.ts, types.ts]
- "middleware_index": "index.ts" | kind=code-symbol | source=server/src/shared/middleware/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, rateLimiter.ts, apiRateLimiter, authRateLimiter, validateRequest.ts, validateRequest()]
- "operators_operator_schema": "operator.schema.ts" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, avatarUrlSchema, CreateOperatorDTO, createOperatorSchema, operatorTypeEnum, UpdateOperatorDTO]
- "pages_machinespage": "MachinesPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesPage.tsx:L1 | neighbors=[routes.tsx, c27dc7d feat(server): stock CRUD histor…, machine-table.tsx, MachineTable(), PageHeader.tsx, PageHeader()]
- "pages_operatorspage": "OperatorsPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/OperatorsPage.tsx:L1 | neighbors=[routes.tsx, c27dc7d feat(server): stock CRUD histor…, operator-table.tsx, OperatorTable(), PageHeader.tsx, PageHeader()]
- "pages_rollstockpage": "RollStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/RollStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, inventory-stock-table.tsx, InventoryStockTable(), PageHeader.tsx, PageHeader()]
- "production_orders_types_planlineinput": "PlanLineInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L341 | neighbors=[PlanLabelTypeForm.tsx, use-production-orders.ts, types.ts, production-order-service.ts, planning-dialog.ts, planning-dialog.test.ts]
- "production_orders_types_productionorder": "ProductionOrder" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L40 | neighbors=[production-order-columns.tsx, production-order-row-actions.tsx, production-order-table.tsx, index.ts, types.ts, ProductionOrderDetail]
- "production_orders_types_productionorderoverview": "ProductionOrderOverview" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L299 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, index.ts, types.ts, production-order-service.ts, line-draft.ts]
- "schemas_ink_schemas": "ink-schemas.ts" | kind=code-symbol | source=client/src/features/ink/schemas/ink-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog.tsx, InkPurchaseDialog.tsx, inkConsumptionSchema, InkConsumptionSchemaInput, inkPurchaseSchema]
- "segmented_tabs_segmentedtabs": "SegmentedTabs.tsx" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/SegmentedTabs.tsx:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, index.ts, utils.ts, cn(), SegmentedOption, SegmentedTabs()]
- "services_dashboard_service": "dashboard-service.ts" | kind=code-symbol | source=client/src/features/dashboard/services/dashboard-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-dashboard.ts, types.ts, KpiResponse, api.ts, api]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-011.json

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
