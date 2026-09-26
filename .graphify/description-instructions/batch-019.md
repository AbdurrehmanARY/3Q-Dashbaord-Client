# Node Description Batch 20 of 53

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

- "work_orders_types_dispatchinput": "DispatchInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L148 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]
- "work_orders_types_product_type_meta": "PRODUCT_TYPE_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L21 | neighbors=[work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_workorderinput": "WorkOrderInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L122 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]
- "analytics_analytics_routes": "analytics.routes.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.routes.ts:L1 | neighbors=[router, ee6d4dd refactor(server): vertical-slic…]
- "analytics_analytics_service": "analytics.service.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L1 | neighbors=[AnalyticsService, ee6d4dd refactor(server): vertical-slic…]
- "analytics_analytics_service_analyticsservice": "AnalyticsService" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L3 | neighbors=[analytics.service.ts, .getKpis()]
- "app_appproviders_appproviders": "AppProviders()" | kind=code-symbol | source=client/src/app/AppProviders.tsx:L14 | neighbors=[AppProviders.tsx, app.ts]
- "app_approutes_approutes": "AppRoutes()" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L15 | neighbors=[AppRoutes.tsx, app.ts]
- "app_routes_redirects": "redirects" | kind=code-symbol | source=client/src/app/routes.tsx:L58 | neighbors=[AppRoutes.tsx, routes.tsx]
- "app_routes_routes": "routes" | kind=code-symbol | source=client/src/app/routes.tsx:L23 | neighbors=[AppRoutes.tsx, routes.tsx]
- "breadcrumb_appbreadcrumb_pathtosegments": "pathToSegments()" | kind=code-symbol | source=client/src/shared/components/breadcrumb/AppBreadcrumb.tsx:L14 | neighbors=[AppBreadcrumb.tsx, AppBreadcrumb()]
- "command_palette_commandpalette_commandpalette": "CommandPalette()" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L43 | neighbors=[CommandPalette.tsx, AppHeader.tsx]
- "command_palette_commandpalette_commandpalettetrigger": "CommandPaletteTrigger()" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L110 | neighbors=[CommandPalette.tsx, AppHeader.tsx]
- "components_artworkandcomment_artworkandcomment": "ArtworkAndComment()" | kind=code-symbol | source=client/src/features/work-orders/components/ArtworkAndComment.tsx:L6 | neighbors=[ArtworkAndComment.tsx, WorkOrderDialog.tsx]
- "components_brand_columns_createbrandcolumns": "createBrandColumns()" | kind=code-symbol | source=client/src/features/companies/components/brand-columns.tsx:L11 | neighbors=[brand-columns.tsx, BrandTable.tsx]
- "components_brand_row_actions_brandrowactions": "BrandRowActions()" | kind=code-symbol | source=client/src/features/companies/components/brand-row-actions.tsx:L28 | neighbors=[brand-columns.tsx, brand-row-actions.tsx]
- "components_brandtable_brandtable": "BrandTable()" | kind=code-symbol | source=client/src/features/companies/components/BrandTable.tsx:L16 | neighbors=[BrandTable.tsx, CompanyBrandPage.tsx]
- "components_company_columns_companycolumns": "companyColumns" | kind=code-symbol | source=client/src/features/companies/components/company-columns.tsx:L7 | neighbors=[company-columns.tsx, CompanyTable.tsx]
- "components_company_row_actions_companyrowactions": "CompanyRowActions()" | kind=code-symbol | source=client/src/features/companies/components/company-row-actions.tsx:L32 | neighbors=[company-columns.tsx, company-row-actions.tsx]
- "components_companyinfo_companyinfo": "CompanyInfo()" | kind=code-symbol | source=client/src/features/work-orders/components/CompanyInfo.tsx:L7 | neighbors=[CompanyInfo.tsx, WorkOrderDialog.tsx]
- "components_companyselect_companyselect": "CompanySelect()" | kind=code-symbol | source=client/src/features/companies/components/CompanySelect.tsx:L15 | neighbors=[index.ts, CompanySelect.tsx]
- "components_companytable_companytable": "CompanyTable()" | kind=code-symbol | source=client/src/features/companies/components/CompanyTable.tsx:L18 | neighbors=[CompanyTable.tsx, CompanyBrandPage.tsx]
- "components_createproductionorderdialog_createproductionorderdialog": "CreateProductionOrderDialog()" | kind=code-symbol | source=client/src/features/production-orders/components/CreateProductionOrderDialog.tsx:L29 | neighbors=[CreateProductionOrderDialog.tsx, ProductionOrderListPage.tsx]
- "components_date_picker_datepicker": "DatePicker()" | kind=code-symbol | source=client/src/shared/components/date-picker.tsx:L29 | neighbors=[date-picker.tsx, purchase-table.tsx]
- "components_dispatchdialog_dispatchdialog": "DispatchDialog()" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchDialog.tsx:L28 | neighbors=[DispatchDialog.tsx, work-order-row-actions.tsx]
- "components_dispatchinfo_dispatchinfo": "DispatchInfo()" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchInfo.tsx:L6 | neighbors=[DispatchInfo.tsx, WorkOrderDialog.tsx]
- "components_ink_consumption_columns_inkconsumptioncolumns": "inkConsumptionColumns()" | kind=code-symbol | source=client/src/features/ink/components/ink-consumption-columns.tsx:L9 | neighbors=[ink-consumption-columns.tsx, InkConsumptionPage.tsx]
- "components_ink_purchase_columns_inkpurchasecolumns": "inkPurchaseColumns()" | kind=code-symbol | source=client/src/features/ink/components/ink-purchase-columns.tsx:L14 | neighbors=[ink-purchase-columns.tsx, InkPurchasesPage.tsx]
- "components_inkconsumptiondialog_inkconsumptiondialog": "InkConsumptionDialog()" | kind=code-symbol | source=client/src/features/ink/components/InkConsumptionDialog.tsx:L22 | neighbors=[InkConsumptionDialog.tsx, InkConsumptionPage.tsx]
- "components_inkoperatorbreakdown_inkoperatorbreakdown": "InkOperatorBreakdown()" | kind=code-symbol | source=client/src/features/ink/components/InkOperatorBreakdown.tsx:L6 | neighbors=[InkOperatorBreakdown.tsx, InkConsumptionPage.tsx]
- "components_inkpurchasedialog_inkpurchasedialog": "InkPurchaseDialog()" | kind=code-symbol | source=client/src/features/ink/components/InkPurchaseDialog.tsx:L19 | neighbors=[InkPurchaseDialog.tsx, InkPurchasesPage.tsx]
- "components_inkstockpanel_inkstockpanel": "InkStockPanel()" | kind=code-symbol | source=client/src/features/ink/components/InkStockPanel.tsx:L8 | neighbors=[InkStockPanel.tsx, InkPurchasesPage.tsx]
- "components_inventory_columns_inventorycolumns": "inventoryColumns" | kind=code-symbol | source=client/src/features/inventory/components/inventory-columns.tsx:L12 | neighbors=[inventory-columns.tsx, inventory-stock-table.tsx]
- "components_labeltyperow_labeltyperow": "LabelTypeRow" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L130 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx]
- "components_logproductionrundialog_logproductionrundialog": "LogProductionRunDialog()" | kind=code-symbol | source=client/src/features/production-runs/components/LogProductionRunDialog.tsx:L35 | neighbors=[LogProductionRunDialog.tsx, ProductionRunsSection.tsx]
- "components_lowstockalert_lowstockalert": "LowStockAlert()" | kind=code-symbol | source=client/src/features/dashboard/components/LowStockAlert.tsx:L10 | neighbors=[LowStockAlert.tsx, DashboardPage.tsx]
- "components_machine_columns_machinecolumns": "machineColumns" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-columns.tsx:L9 | neighbors=[machine-columns.tsx, machine-table.tsx]
- "components_machine_row_actions_machinerowactions": "MachineRowActions()" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-row-actions.tsx:L28 | neighbors=[machine-columns.tsx, machine-row-actions.tsx]
- "components_material_columns_materialcolumns": "materialColumns" | kind=code-symbol | source=client/src/features/materials/components/material-columns.tsx:L8 | neighbors=[material-columns.tsx, material-table.tsx]
- "components_material_row_actions_materialrowactions": "MaterialRowActions()" | kind=code-symbol | source=client/src/features/materials/components/material-row-actions.tsx:L28 | neighbors=[material-columns.tsx, material-row-actions.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-019.json

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
