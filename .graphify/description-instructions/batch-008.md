# Node Description Batch 9 of 53

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

- "purchases_types": "types.ts" | kind=code-symbol | source=client/src/features/purchases/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, use-purchases.ts]
- "schemas_material_schemas": "material-schemas.ts" | kind=code-symbol | source=client/src/features/materials/schemas/material-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, material-table.tsx, MaterialForm.tsx, index.ts, MATERIAL_DESCRIPTIONS]
- "server_seed_master_main": "main()" | kind=code-symbol | source=server/seed-master.ts:L382 | neighbors=[seed-master.ts, realignExistingLines(), seedCompanies(), seedMachines(), seedMaterials(), seedOperators()]
- "services_entity_service": "entity-service.ts" | kind=code-symbol | source=client/src/features/machines-operators/services/entity-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-entities.ts, api.ts, api, types.ts, Machine]
- "shared_navigation": "navigation.ts" | kind=code-symbol | source=client/src/shared/navigation.ts:L1 | neighbors=[CommandPalette.tsx, 9b99ce1 feat: complete production workf…, adfafe7 polish: nav + page copy for the…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, navigation]
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=client/src/components/ui/calendar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, date-picker.tsx, utils.ts, cn(), button.tsx, Button]
- "ui_combobox_comboboxoption": "ComboboxOption" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L281 | neighbors=[combobox.tsx, inventory-stock-table.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, work-order-table.tsx]
- "ui_combobox_comboboxselect": "ComboboxSelect()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L301 | neighbors=[combobox.tsx, inventory-stock-table.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, work-order-table.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=client/src/components/ui/input.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, utils.ts, cn()]
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=client/src/components/ui/toggle-group.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProductionTrendChart.tsx, utils.ts, cn(), toggle.tsx, ToggleGroup()]
- "work_orders_types_workorder": "WorkOrder" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L60 | neighbors=[DispatchDialog.tsx, work-order-columns.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx, work-order-service.ts]
- "work_orders_work_order_service": "work-order.service.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, ApiError.ts, ApiError]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@ab23f28056f804cacf08f052370c19d06240c0f3": "ab23f28 fix: tab switcher rendered unstyled and collapsed the page layout" | kind=Commit | source=git | neighbors=[chore/ci, c27dc7d feat(server): stock CRUD histor…, InventoryStockPage.tsx, PurchaseRecordPage.tsx, index.ts, SegmentedTabs.tsx]
- "companies_company_repository": "company.repository.ts" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, BrandRepository, CompanyRepository, index.ts, db, schema.ts]
- "companies_company_repository_brandrepository": "BrandRepository" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L49 | neighbors=[company.repository.ts, .create(), .delete(), .findAll(), .findByCompanyId(), .findById()]
- "components_company_columns": "company-columns.tsx" | kind=code-symbol | source=client/src/features/companies/components/company-columns.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, types.ts, Company, companyColumns, company-row-actions.tsx, CompanyRowActions()]
- "components_companyinfo": "CompanyInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/CompanyInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, index.ts, CompanyInfo(), AppCombobox.tsx, AppCombobox(), work-order-schemas.ts]
- "components_companyselect": "CompanySelect.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanySelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, CompanySelect(), CompanySelectProps, AppCombobox.tsx, AppCombobox()]
- "data_table_data_table_export": "data-table-export.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, EditableLabelTypeTable.tsx, data-table.tsx, DataTableExportColumn, exportRowsToExcel(), PrintTable()]
- "db_size_plans": "size-plans.ts" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, labels.ts, isSizeLabel(), LABEL_TYPES, normalizeSize(), SizePlan]
- "dialogs_confirmdialog_confirmdialog": "ConfirmDialog()" | kind=code-symbol | source=client/src/components/dialogs/ConfirmDialog.tsx:L26 | neighbors=[ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog.tsx, ProductionOrderDashboardPage.tsx]
- "error_boundary_errorboundary_errorboundary": "ErrorBoundary" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L15 | neighbors=[ErrorBoundary.tsx, Component, .componentDidCatch(), .constructor(), .getDerivedStateFromError(), .render()]
- "inventory_inventory_roll_schema": "inventory-roll.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateInventoryRollDTO, createInventoryRollSchema, inventoryRollParamsSchema, listInventoryRollsQuerySchema, listRollMovementsQuerySchema]
- "inventory_types_stocklevel": "StockLevel" | kind=code-symbol | source=client/src/features/inventory/types.ts:L1 | neighbors=[inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx, use-inventory.ts, index.ts]
- "layout_pagecontainer": "PageContainer.tsx" | kind=code-symbol | source=client/src/components/layout/PageContainer.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PageContainer(), PageContainerProps, SIZES, utils.ts]
- "lib_format_todayiso": "todayISO()" | kind=code-symbol | source=client/src/lib/format.ts:L35 | neighbors=[DispatchDialog.tsx, InkPurchaseDialog.tsx, PurchaseForm.tsx, SendDyeingDialog.tsx, ThreadPurchasePanel.tsx, WorkOrderDialog.tsx]
- "operators_operator_repository": "operator.repository.ts" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Operator, OperatorFilters]
- "production_orders_woven_types_wovenlineoverview": "WovenLineOverview" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L17 | neighbors=[PlanLabelTypeDialog.tsx, woven-columns.tsx, WovenPlanningForm.tsx, WovenProductionPanel.tsx, WovenTrackingTable.tsx, index.ts]
- "schemas_work_order_schemas_workorderschemainput": "WorkOrderSchemaInput" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L81 | neighbors=[ArtworkAndComment.tsx, CompanyInfo.tsx, DispatchInfo.tsx, OrderInfo.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx]
- "services_purchase_service": "purchase-service.ts" | kind=code-symbol | source=client/src/features/purchases/services/purchase-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-purchases.ts, api.ts, api, types.ts, PurchaseInput]
- "tables_work_orders_table": "work-orders.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, workOrders, workOrderStatusEnum, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "ui_empty_emptycontent": "EmptyContent()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L84 | neighbors=[BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, purchase-table.tsx]
- "work_orders_work_order_repository": "work-order.repository.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewWovenWorkOrderDetail, WorkOrder]
- "companies_company_repository_companyrepository": "CompanyRepository" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L6 | neighbors=[company.repository.ts, .create(), .findAll(), .findByCompanyName(), .findById(), .softDelete()]
- "companies_company_service_brandservice": "BrandService" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L42 | neighbors=[company.service.ts, .createBrand(), .deleteBrand(), .getBrand(), .getBrands(), .getBrandsByCompany()]
- "companies_company_service_companyservice": "CompanyService" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L6 | neighbors=[company.service.ts, .createCompany(), .deleteCompany(), .getCompanies(), .getCompanyById(), .getCompanyByName()]
- "components_orderinfo": "OrderInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/OrderInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, OrderInfo(), AppInput.tsx, AppInput, work-order-schemas.ts, WorkOrderSchemaInput]
- "db_copy_from_local_main": "main()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L67 | neighbors=[copy-from-local.ts, dest, fkEdges(), IGNORE(), publicTables(), src]
- "db_schema_material": "Material" | kind=code-symbol | source=server/src/shared/db/schema.ts:L88 | neighbors=[analytics.repository.ts, schema.ts, inventory.service.ts, material.repository.ts, material.service.ts, inventory-service.ts]
- "formulas_production_formula": "production-formula.ts" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, seed.ts, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-008.json

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
