# Node Description Batch 9 of 38

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

- "cards_statcard_statcard": "StatCard()" | kind=code-symbol | source=src/components/cards/StatCard.tsx:L22 | neighbors=[StatCard.tsx, ProductionCompletionReport.tsx, ProductionSummaryCard.tsx, ThreadStockPanel.tsx, WovenProductionPanel.tsx, DashboardPage.tsx]
- "components_orderinfo": "OrderInfo.tsx" | kind=code-symbol | source=src/features/work-orders/components/OrderInfo.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, OrderInfo(), AppInput.tsx, AppInput, work-order-schemas.ts, WorkOrderSchemaInput]
- "hooks_use_completion_celebration": "use-completion-celebration.ts" | kind=code-symbol | source=src/features/production-orders/hooks/use-completion-celebration.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, useCompletionCelebration(), celebrate.ts, celebrateCompletion(), types.ts, ProductionOrderStatus]
- "label_types_types_labeltype": "LabelType" | kind=code-symbol | source=src/features/label-types/types.ts:L1 | neighbors=[CreateLabelTypeDialog.tsx, label-type-columns.tsx, use-label-types.ts, index.ts, types.ts, LabelTypeMasterPage.tsx]
- "lib_format_formatdatetime": "formatDateTime()" | kind=code-symbol | source=src/lib/format.ts:L27 | neighbors=[ink-consumption-columns.tsx, ProductionSummary.tsx, roll-stock-row-actions.tsx, StockReconciliationCard.tsx, WovenProductionPanel.tsx, format.ts]
- "lib_format_test": "format.test.ts" | kind=code-symbol | source=src/lib/format.test.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, format.ts, calculateRequiredRolls(), calculateTotalRolls(), formatDate(), formatNumber()]
- "materials_types_material": "Material" | kind=code-symbol | source=src/features/materials/types.ts:L1 | neighbors=[material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, index.ts, types.ts]
- "pages_machinespage": "MachinesPage.tsx" | kind=code-symbol | source=src/features/machines-operators/pages/MachinesPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, machine-table.tsx, MachineTable(), PageHeader.tsx, PageHeader()]
- "pages_operatorspage": "OperatorsPage.tsx" | kind=code-symbol | source=src/features/machines-operators/pages/OperatorsPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, operator-table.tsx, OperatorTable(), PageHeader.tsx, PageHeader()]
- "pages_rollstockpage": "RollStockPage.tsx" | kind=code-symbol | source=src/features/inventory/pages/RollStockPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, inventory-stock-table.tsx, InventoryStockTable(), PageHeader.tsx, PageHeader()]
- "production_orders_batch_types_stage_label": "STAGE_LABEL" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L253 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx, EditBatchDialog.tsx, StageProgressBars.tsx]
- "production_orders_types_productionorder": "ProductionOrder" | kind=code-symbol | source=src/features/production-orders/types.ts:L40 | neighbors=[production-order-columns.tsx, production-order-row-actions.tsx, production-order-table.tsx, index.ts, types.ts, ProductionOrderDetail]
- "schemas_ink_schemas": "ink-schemas.ts" | kind=code-symbol | source=src/features/ink/schemas/ink-schemas.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkConsumptionDialog.tsx, InkPurchaseDialog.tsx, inkConsumptionSchema, InkConsumptionSchemaInput, inkPurchaseSchema]
- "segmented_tabs_segmentedtabs": "SegmentedTabs.tsx" | kind=code-symbol | source=src/shared/components/segmented-tabs/SegmentedTabs.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, utils.ts, cn(), SegmentedOption, SegmentedTabs()]
- "services_dashboard_service": "dashboard-service.ts" | kind=code-symbol | source=src/features/dashboard/services/dashboard-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-dashboard.ts, types.ts, KpiResponse, api.ts, api]
- "store_ui_store": "ui-store.ts" | kind=code-symbol | source=src/store/ui-store.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-theme.ts, ThemeProvider.tsx, Theme, UiState, useUiStore]
- "theme_toggle_themetoggle": "ThemeToggle.tsx" | kind=code-symbol | source=src/shared/components/theme-toggle/ThemeToggle.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppHeader.tsx, use-theme.ts, useTheme(), ThemeToggle(), button.tsx]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=src/components/ui/accordion.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), Accordion(), AccordionContent(), AccordionItem()]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BatchStageBoard.tsx, label-type-columns.tsx, utils.ts, cn(), Badge()]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table-toolbar.tsx, AppHeader.tsx, utils.ts, cn(), Separator()]
- "ui_textarea_textarea": "Textarea" | kind=code-symbol | source=src/components/ui/textarea.tsx:L9 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, input-group.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@cf620b4998d9c2421d83c82ea597fdbd343e5fca": "cf620b4 feat: add Estimated Weaving Time column to production tables" | kind=Commit | source=git | neighbors=[9ff35ed feat: add speed (RPM) to Work O…, main, 84328c7 feat: show Est. Weaving Time in…, production-order-columns.tsx, woven-columns.tsx, types.ts]
- "companies_types_brand": "Brand" | kind=code-symbol | source=src/features/companies/types.ts:L13 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, company-service.ts]
- "components_workorderdialog_workorderdialog": "WorkOrderDialog()" | kind=code-symbol | source=src/features/work-orders/components/WorkOrderDialog.tsx:L115 | neighbors=[work-order-row-actions.tsx, WorkOrderDialog.tsx, defaultsFor(), WorkOrderDetailPage.tsx, WorkOrderListPage.tsx, index.ts]
- "data_table_editable_cell_number": "editable-cell-number.tsx" | kind=code-symbol | source=src/shared/components/data-table/editable-cell-number.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, editable-cell.tsx, EditableCellInput(), EditableCellNumber(), useEditableCell(), index.ts]
- "data_table_types": "types.ts" | kind=code-symbol | source=src/shared/components/data-table/types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, data-table.tsx, index.ts, ColumnMeta, TableMeta]
- "error_boundary_errorboundary": "ErrorBoundary.tsx" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ErrorBoundary, Props, State, AppLayout.tsx, App.tsx]
- "feedback_imagepreview": "ImagePreview.tsx" | kind=code-symbol | source=src/components/feedback/ImagePreview.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ImagePreview(), ImagePreviewProps, utils.ts, cn(), ImageUploadField.tsx]
- "forms_index": "index.ts" | kind=code-symbol | source=src/components/forms/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, AppButton.tsx, AppCombobox.tsx, AppInput.tsx, AppSelect.tsx]
- "healthcheck_health_check_shell": "health-check-shell.tsx" | kind=code-symbol | source=src/lib/healthcheck/health-check-shell.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, HealthCheckShell(), HealthCheckShellProps, utils.ts, cn()]
- "hooks_use_dashboard": "use-dashboard.ts" | kind=code-symbol | source=src/features/dashboard/hooks/use-dashboard.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DASHBOARD_KEYS, useDashboardKpis(), dashboard-service.ts, dashboardService, DashboardPage.tsx]
- "lib_celebrate": "celebrate.ts" | kind=code-symbol | source=src/lib/celebrate.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-completion-celebration.ts, celebrateCompletion(), fireConfetti(), playSuccessChime(), prefersReducedMotion()]
- "machines_operators_types_machine": "Machine" | kind=code-symbol | source=src/features/machines-operators/types.ts:L9 | neighbors=[machine-columns.tsx, machine-row-actions.tsx, MachineDialog.tsx, index.ts, types.ts, entity-service.ts]
- "machines_operators_types_operator": "Operator" | kind=code-symbol | source=src/features/machines-operators/types.ts:L46 | neighbors=[operator-columns.tsx, operator-row-actions.tsx, OperatorDialog.tsx, index.ts, types.ts, entity-service.ts]
- "pages_dyedthreadstockpage": "DyedThreadStockPage.tsx" | kind=code-symbol | source=src/features/inventory/pages/DyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, PageHeader.tsx, PageHeader(), DyedThreadStockPage(), index.ts]
- "pages_threadpurchasespage": "ThreadPurchasesPage.tsx" | kind=code-symbol | source=src/features/purchases/pages/ThreadPurchasesPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, PageHeader.tsx, PageHeader(), ThreadPurchasesPage(), index.ts]
- "pages_undyedthreadstockpage": "UndyedThreadStockPage.tsx" | kind=code-symbol | source=src/features/inventory/pages/UndyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, PageHeader.tsx, PageHeader(), UndyedThreadStockPage(), index.ts]
- "production_orders_batch_types_linekind": "LineKind" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L12 | neighbors=[BatchOutputDialog.tsx, CreateBatchDialog.tsx, EditBatchDialog.tsx, StageProgressBars.tsx, batch-types.ts, batch-edit.ts]
- "production_orders_types_planlineinput": "PlanLineInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L341 | neighbors=[PlanLabelTypeForm.tsx, use-production-orders.ts, types.ts, production-order-service.ts, planning-dialog.ts, planning-dialog.test.ts]
- "production_orders_woven_types_planwoveninput": "PlanWovenInput" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L126 | neighbors=[PlanLabelTypeForm.tsx, use-woven-production.ts, woven-types.ts, woven-production-service.ts, planning-dialog.ts, planning-dialog.test.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-008.json

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
