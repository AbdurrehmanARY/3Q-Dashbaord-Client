# Node Description Batch 3 of 53

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

- "hooks_use_ink": "use-ink.ts" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog.tsx, InkOperatorBreakdown.tsx, InkPurchaseDialog.tsx, InkStockPanel.tsx, INK_KEYS]
- "components_inkpurchasedialog": "InkPurchaseDialog.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkPurchaseDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkPurchaseDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_rollstockdialog": "RollStockDialog.tsx" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog(), RollStockDialogProps, rollStockSchema]
- "dialogs_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=client/src/components/dialogs/ConfirmDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog()]
- "errors_apierror": "ApiError.ts" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, company.service.ts, labels.ts, logger.ts, Logger, ApiError]
- "hooks_use_entities": "use-entities.ts" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx, MachineSelect.tsx, operator-row-actions.tsx]
- "layout_pageheader_pageheader": "PageHeader()" | kind=code-symbol | source=client/src/components/layout/PageHeader.tsx:L11 | neighbors=[MaterialReceiptPage.tsx, PageHeader.tsx, CompanyBrandPage.tsx, DashboardPage.tsx, DyedThreadStockPage.tsx, InkConsumptionPage.tsx]
- "src_app": "app.ts" | kind=code-symbol | source=server/src/app.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, api-entry.ts, AppProviders.tsx, AppProviders(), AppRoutes.tsx]
- "components_branddialog": "BrandDialog.tsx" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, types.ts, Brand, Company, BrandDialog()]
- "components_companydialog": "CompanyDialog.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanyDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, company-row-actions.tsx, types.ts, Company, CompanyDialog(), CompanyDialogProps]
- "components_productiontrendchart": "ProductionTrendChart.tsx" | kind=code-symbol | source=client/src/features/dashboard/components/ProductionTrendChart.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, dayKey(), ProductionTrendChart(), RANGE_OPTIONS, index.ts, card.tsx]
- "dialogs_appdialog_appdialog": "AppDialog()" | kind=code-symbol | source=client/src/components/dialogs/AppDialog.tsx:L22 | neighbors=[BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx, InkConsumptionDialog.tsx]
- "forms_submitonenter": "SubmitOnEnter.tsx" | kind=code-symbol | source=client/src/components/forms/SubmitOnEnter.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx]
- "hooks_use_woven_production": "use-woven-production.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, WovenThreadReconciliationCard.tsx, invalidateWoven()]
- "pages_inkpurchasespage": "InkPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/ink/pages/InkPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, ink-purchase-columns.tsx, inkPurchaseColumns(), InkPurchaseDialog.tsx, InkPurchaseDialog()]
- "services_woven_production_service": "woven-production-service.ts" | kind=code-symbol | source=client/src/features/production-orders/services/woven-production-service.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, use-woven-production.ts, api.ts, api, woven-types.ts]
- "ui_command": "command.tsx" | kind=code-symbol | source=client/src/components/ui/command.tsx:L1 | neighbors=[CommandPalette.tsx, c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Command(), CommandDialog()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@cc50221eb2e4d6dcb1c1f912a2aa9faf7bd27763": "cc50221 feat: dispatched status + FBR invoice; tabs on top; sticky table columns" | kind=Commit | source=git | neighbors=[adfafe7 polish: nav + page copy for the…, chore/ci, ab23f28 fix: tab switcher rendered unst…, DispatchDialog.tsx, inventory-stock-table.tsx, progress-table-styles.ts]
- "components_brandtable": "BrandTable.tsx" | kind=code-symbol | source=client/src/features/companies/components/BrandTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard, types.ts, Company]
- "components_companytable": "CompanyTable.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanyTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard, types.ts, Company]
- "components_serviceproviderdialog": "ServiceProviderDialog.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ProviderForm, ServiceProviderDialog(), AppDialog.tsx, AppDialog(), AppButton.tsx]
- "forms_submitonenter_submitonenter": "SubmitOnEnter()" | kind=code-symbol | source=client/src/components/forms/SubmitOnEnter.tsx:L10 | neighbors=[BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx, InkConsumptionDialog.tsx]
- "lib_api": "api.ts" | kind=code-symbol | source=client/src/lib/api.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, api, ApiError, axiosInstance, Paginated]
- "pages_dashboardpage": "DashboardPage.tsx" | kind=code-symbol | source=client/src/features/dashboard/pages/DashboardPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, StatCard.tsx, StatCard(), LowStockAlert.tsx]
- "production_orders_index": "index.ts" | kind=code-symbol | source=client/src/features/production-orders/index.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, ProductionTrendChart.tsx, WorkOrderDetailPage.tsx, PlanLabelTypeDialog.tsx]
- "thread_dyeing_types": "types.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "ui_table": "table.tsx" | kind=code-symbol | source=client/src/components/ui/table.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx]
- "components_material_table": "material-table.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-table.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, material-columns.tsx, materialColumns, MaterialTable(), MaterialTableProps]
- "components_recentworkorders": "RecentWorkOrders.tsx" | kind=code-symbol | source=client/src/features/dashboard/components/RecentWorkOrders.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, RecentWorkOrders(), StatusBadge.tsx, StatusBadge(), format.ts, formatDate()]
- "components_stockreconciliationcard": "StockReconciliationCard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/StockReconciliationCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, AppCard.tsx, AppCard, LineReconciliationRow(), StockReconciliationCard(), StockReconciliationCardProps]
- "components_workorderbasicinfo": "WorkOrderBasicInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderBasicInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, WorkOrderBasicInfo(), AppCombobox.tsx, AppCombobox(), AppInput.tsx, AppInput]
- "constants_messages_messages": "Messages" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L1 | neighbors=[company.service.ts, messages.ts, ink.service.ts, inventory-roll.service.ts, inventory.service.ts, material.service.ts]
- "db_index_db": "db" | kind=code-symbol | source=server/src/shared/db/index.ts:L3 | neighbors=[analytics.repository.ts, company.repository.ts, clear-all-tables.ts, index.ts, migrate-machines.ts, migrate-production-runs.ts]
- "hooks_use_companies": "use-companies.ts" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx, company-row-actions.tsx]
- "hooks_use_work_orders": "use-work-orders.ts" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, c0c79ec Initial commit: Label Manufactu…, DispatchDialog.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx]
- "machines_operators_types": "types.ts" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge.tsx, machine-columns.tsx, machine-row-actions.tsx]
- "production_orders_woven_types": "woven-types.ts" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, PlanLabelTypeDialog.tsx, woven-columns.tsx, WovenPlanningForm.tsx, WovenProductionPanel.tsx]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=client/src/components/ui/button.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "components_planned_line_row_actions": "planned-line-row-actions.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, planned-line-columns.tsx, PlannedLineRowActions(), PlannedLineRowActionsProps, AppButton.tsx, AppButton]
- "components_production_order_columns": "production-order-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PRIORITY_META, productionOrderColumns, production-order-row-actions.tsx, ProductionOrderRowActions()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-002.json

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
