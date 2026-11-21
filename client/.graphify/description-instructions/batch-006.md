# Node Description Batch 7 of 38

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

- "pages_productionorderlistpage": "ProductionOrderListPage.tsx" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderListPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, CreateProductionOrderDialog.tsx, CreateProductionOrderDialog(), production-order-table.tsx, ProductionOrderTable()]
- "pages_workorderlistpage": "WorkOrderListPage.tsx" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderListPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, work-order-table.tsx, WorkOrderTable(), WorkOrderDialog.tsx, WorkOrderDialog()]
- "services_inventory_service": "inventory-service.ts" | kind=code-symbol | source=src/features/inventory/services/inventory-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-inventory.ts, types.ts, PurchaseInput, PurchaseRecord, StockLevel]
- "services_label_type_service": "label-type-service.ts" | kind=code-symbol | source=src/features/label-types/services/label-type-service.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, use-label-types.ts, index.ts, types.ts, CreateLabelTypeInput]
- "services_thread_dyeing_service": "thread-dyeing-service.ts" | kind=code-symbol | source=src/features/thread-dyeing/services/thread-dyeing-service.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, use-thread-dyeing.ts, api.ts, api, threadDyeingService, types.ts]
- "src_app": "App.tsx" | kind=code-symbol | source=src/App.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppProviders.tsx, AppProviders(), AppRoutes.tsx, AppRoutes(), ErrorBoundary.tsx]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, OperatorAvatar.tsx, nav-user.tsx, utils.ts, cn(), Avatar()]
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L1 | neighbors=[AppBreadcrumb.tsx, ee6dbbe feat: production order completi…, utils.ts, cn(), Breadcrumb(), BreadcrumbEllipsis()]
- "ui_table_table": "Table()" | kind=code-symbol | source=src/components/ui/table.tsx:L7 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ProductionCompletionReport.tsx, ThreadPurchasePanel.tsx]
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=src/components/ui/table.tsx:L32 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ProductionCompletionReport.tsx, ThreadPurchasePanel.tsx]
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=src/components/ui/table.tsx:L68 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ProductionCompletionReport.tsx, ThreadPurchasePanel.tsx]
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=src/components/ui/table.tsx:L22 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ProductionCompletionReport.tsx, ThreadPurchasePanel.tsx]
- "breadcrumb_appbreadcrumb": "AppBreadcrumb.tsx" | kind=code-symbol | source=src/shared/components/breadcrumb/AppBreadcrumb.tsx:L1 | neighbors=[AppBreadcrumb(), pathToSegments(), breadcrumb.tsx, Breadcrumb(), BreadcrumbItem(), BreadcrumbList()]
- "companies_index": "index.ts" | kind=code-symbol | source=src/features/companies/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, types.ts, Brand, Company, CompanySelect.tsx, CompanySelect()]
- "components_artworkandcomment": "ArtworkAndComment.tsx" | kind=code-symbol | source=src/features/work-orders/components/ArtworkAndComment.tsx:L1 | neighbors=[567656d feat: add max length validation…, 815ad75 feat: complete frontend updates…, ArtworkAndComment(), work-order-schemas.ts, WorkOrderSchemaInput, label.tsx]
- "components_brand_columns": "brand-columns.tsx" | kind=code-symbol | source=src/features/companies/components/brand-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, types.ts, Brand, Company, createBrandColumns()]
- "components_index": "index.ts" | kind=code-symbol | source=src/features/companies/components/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, BrandDialog.tsx, BrandTable.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "components_label_type_columns": "label-type-columns.tsx" | kind=code-symbol | source=src/features/label-types/components/label-type-columns.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, labelTypeColumns(), types.ts, LabelType, badge.tsx]
- "components_woventrackingtable": "WovenTrackingTable.tsx" | kind=code-symbol | source=src/features/production-orders/components/WovenTrackingTable.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, WovenProductionPanel.tsx, woven-columns.tsx, wovenColumns, WovenTrackingTable()]
- "data_table_data_table_toolbar": "data-table-toolbar.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-toolbar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, DataTableToolbar(), DataTableToolbarProps, button.tsx, Button, input.tsx]
- "hooks_use_production_runs": "use-production-runs.ts" | kind=code-symbol | source=src/features/production-runs/hooks/use-production-runs.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, LogProductionRunDialog.tsx, ProductionRunsSection.tsx, PRODUCTION_RUN_KEYS, useLogProductionRun(), useProductionSummary()]
- "materials_types": "types.ts" | kind=code-symbol | source=src/features/materials/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, use-materials.ts]
- "production_orders_woven_types_wovenlineoverview": "WovenLineOverview" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L17 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, woven-columns.tsx, WovenProductionPanel.tsx, WovenTrackingTable.tsx, index.ts]
- "schemas_thread_schemas": "thread-schemas.ts" | kind=code-symbol | source=src/features/thread/schemas/thread-schemas.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, dyeBatchSchema, DyeBatchSchemaInput, threadPurchaseSchema]
- "services_work_order_service": "work-order-service.ts" | kind=code-symbol | source=src/features/work-orders/services/work-order-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-work-orders.ts, api.ts, api, workOrderService, types.ts]
- "store_table_visibility_store": "table-visibility-store.ts" | kind=code-symbol | source=src/store/table-visibility-store.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, data-table.tsx, EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), TableVisibilityMap]
- "ui_combobox_comboboxoption": "ComboboxOption" | kind=code-symbol | source=src/components/ui/combobox.tsx:L281 | neighbors=[combobox.tsx, inventory-stock-table.tsx, LabelTypeTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx]
- "ui_combobox_comboboxselect": "ComboboxSelect()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L301 | neighbors=[combobox.tsx, inventory-stock-table.tsx, LabelTypeTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=src/components/ui/popover.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, date-picker.tsx, utils.ts, cn(), Popover(), PopoverContent()]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, InkConsumptionPage.tsx, ThreadDyeingPage.tsx, utils.ts, cn(), Tabs()]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=src/components/ui/textarea.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx]
- "utils_production_order_export": "production-order-export.ts" | kind=code-symbol | source=src/features/production-orders/utils/production-order-export.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ProductionOrderDashboardPage.tsx, format.ts, formatDate(), formatNumber()]
- "work_orders_index": "index.ts" | kind=code-symbol | source=src/features/work-orders/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, RecentWorkOrders.tsx, use-dashboard-trends.ts, DashboardPage.tsx, WorkOrderDialog.tsx, WorkOrderDialog()]
- "app_appproviders": "AppProviders.tsx" | kind=code-symbol | source=src/app/AppProviders.tsx:L1 | neighbors=[AppProviders(), LayoutProvider.tsx, LayoutProvider(), QueryProvider.tsx, QueryProvider(), ThemeProvider.tsx]
- "app_approutes": "AppRoutes.tsx" | kind=code-symbol | source=src/app/AppRoutes.tsx:L1 | neighbors=[AppRoutes(), PageFallback(), routes.tsx, redirects, routes, AppLayout.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@9ff35edf3555d24543c1e78a444c8dff889c77d4": "9ff35ed feat: add speed (RPM) to Work Order forms/views and display estimated w…" | kind=Commit | source=git | neighbors=[main, cf620b4 feat: add Estimated Weaving Tim…, WorkOrderDialog.tsx, WovenSpecification.tsx, WorkOrderDetailPage.tsx, woven-types.ts]
- "components_machineselect": "MachineSelect.tsx" | kind=code-symbol | source=src/features/machines-operators/components/MachineSelect.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, LogProductionRunDialog.tsx, MachineSelect(), MachineSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_operatorselect": "OperatorSelect.tsx" | kind=code-symbol | source=src/features/machines-operators/components/OperatorSelect.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, LogProductionRunDialog.tsx, OperatorSelect(), OperatorSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_productionsummarycard": "ProductionSummaryCard.tsx" | kind=code-symbol | source=src/features/production-runs/components/ProductionSummaryCard.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ProductionRunsSection.tsx, StatCard.tsx, StatCard(), ProductionSummaryCard(), format.ts]
- "components_progress_bar": "progress-bar.tsx" | kind=code-symbol | source=src/shared/components/progress-bar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ProgressBar(), ProgressBarProps, utils.ts, cn(), progress.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-006.json

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
