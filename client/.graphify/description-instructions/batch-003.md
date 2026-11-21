# Node Description Batch 4 of 38

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

- "pages_dashboardpage": "DashboardPage.tsx" | kind=code-symbol | source=src/features/dashboard/pages/DashboardPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, StatCard.tsx, StatCard(), LowStockAlert.tsx, LowStockAlert()]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "utils_line_draft": "line-draft.ts" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx]
- "cards_statcard": "StatCard.tsx" | kind=code-symbol | source=src/components/cards/StatCard.tsx:L1 | neighbors=[index.ts, StatCard(), StatCardProps, StatCardSkeleton(), TrendDirection, utils.ts]
- "components_material_table": "material-table.tsx" | kind=code-symbol | source=src/features/materials/components/material-table.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, material-columns.tsx, materialColumns, MaterialTable(), MaterialTableProps, TYPE_OPTIONS]
- "components_planned_line_row_actions": "planned-line-row-actions.tsx" | kind=code-symbol | source=src/features/production-orders/components/planned-line-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, planned-line-columns.tsx, PlannedLineRowActions(), PlannedLineRowActionsProps, AppButton.tsx, AppButton]
- "components_production_order_table": "production-order-table.tsx" | kind=code-symbol | source=src/features/production-orders/components/production-order-table.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, production-order-columns.tsx, productionOrderColumns]
- "components_productionsummary": "ProductionSummary.tsx" | kind=code-symbol | source=src/features/production-orders/components/ProductionSummary.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, ProductionSummary(), StageRow(), StageSummary]
- "data_table_data_table_pagination": "data-table-pagination.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-pagination.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table.tsx, DataTablePagination(), DataTablePaginationProps, pageWindow(), pagination.tsx]
- "hooks_use_thread_dyeing": "use-thread-dyeing.ts" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, DYEING_KEYS, useCreateProvider()]
- "hooks_use_work_orders": "use-work-orders.ts" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DispatchDialog.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx, useCreateWorkOrder()]
- "services_batch_service": "batch-service.ts" | kind=code-symbol | source=src/features/production-orders/services/batch-service.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, use-batches.ts, api.ts, api, batch-types.ts]
- "sidebar_nav_user": "nav-user.tsx" | kind=code-symbol | source=src/shared/components/sidebar/nav-user.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppSidebar.tsx, NavUser(), avatar.tsx, Avatar(), AvatarFallback()]
- "ui_input_group": "input-group.tsx" | kind=code-symbol | source=src/components/ui/input-group.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, combobox.tsx, command.tsx, utils.ts, cn(), button.tsx]
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[StatCard.tsx, ee6dbbe feat: production order completi…, EditableLabelTypeTable.tsx, LowStockAlert.tsx, ProductionCompletionReport.tsx, ProductionRunsSection.tsx]
- "components_batchtracedialog": "BatchTraceDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/BatchTraceDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchStageBoard.tsx, BatchTraceDialog(), BatchTraceDialogProps, TraceList()]
- "components_receivedyeingdialog": "ReceiveDyeingDialog.tsx" | kind=code-symbol | source=src/features/thread-dyeing/components/ReceiveDyeingDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ReceiveDyeingDialog(), ReceiveForm, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_woventhreadreconciliationcard": "WovenThreadReconciliationCard.tsx" | kind=code-symbol | source=src/features/production-orders/components/WovenThreadReconciliationCard.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, WovenProductionPanel.tsx, AppCard.tsx, AppCard, WovenThreadReconciliationCard(), WovenThreadReconciliationCardProps]
- "data_table_data_table_view_options": "data-table-view-options.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-view-options.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, data-table.tsx, columnLabel(), DataTableViewOptions()]
- "machines_operators_types": "types.ts" | kind=code-symbol | source=src/features/machines-operators/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, AvailabilityBadge.tsx, machine-columns.tsx, machine-row-actions.tsx, MachineDialog.tsx, operator-columns.tsx]
- "production_orders_types_productionlineoverview": "ProductionLineOverview" | kind=code-symbol | source=src/features/production-orders/types.ts:L232 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, planned-line-columns.tsx, planned-line-row-actions.tsx]
- "schemas_work_order_schemas": "work-order-schemas.ts" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, 9ff35ed feat: add speed (RPM) to Work O…, ee6dbbe feat: production order completi…, ArtworkAndComment.tsx]
- "sidebar_appsidebar": "AppSidebar.tsx" | kind=code-symbol | source=src/shared/components/sidebar/AppSidebar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppLayout.tsx, navigation.ts, navigation, AppSidebar(), nav-main.tsx]
- "ui_empty": "empty.tsx" | kind=code-symbol | source=src/components/ui/empty.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx]
- "utils_batch_edit_test": "batch-edit.test.ts" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, batch-types.ts, BatchSourceOption, ProductionBatch, UpdateBatchInput]
- "command_palette_commandpalette": "CommandPalette.tsx" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L1 | neighbors=[CommandPalette(), CommandPaletteProps, CommandPaletteTrigger(), CommandPaletteTriggerProps, COMMANDS, navigation.ts]
- "hooks_use_inventory": "use-inventory.ts" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx, INVENTORY_KEYS, useCreateRollStock()]
- "layouts_applayout": "AppLayout.tsx" | kind=code-symbol | source=src/shared/layouts/AppLayout.tsx:L1 | neighbors=[AppRoutes.tsx, ee6dbbe feat: production order completi…, ErrorBoundary.tsx, ErrorBoundary, AppHeader.tsx, AppHeader()]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppDialog.tsx, command.tsx, utils.ts, cn(), button.tsx]
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=src/components/ui/drawer.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), Drawer(), DrawerClose(), DrawerContent()]
- "utils_planning_rows": "planning-rows.ts" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, woven-types.ts, ThreadPlanInput]
- "companies_types": "types.ts" | kind=code-symbol | source=src/features/companies/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, Brand, BrandInput, Company, CompanyInput]
- "components_inkstockpanel": "InkStockPanel.tsx" | kind=code-symbol | source=src/features/ink/components/InkStockPanel.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkStockPanel(), StatusBadge.tsx, StatusBadge(), use-ink.ts, useInkStock()]
- "components_labeltypetable": "LabelTypeTable.tsx" | kind=code-symbol | source=src/features/label-types/components/LabelTypeTable.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, label-type-columns.tsx, labelTypeColumns(), CATEGORY_OPTIONS, LabelTypeTable()]
- "components_lowstockalert": "LowStockAlert.tsx" | kind=code-symbol | source=src/features/dashboard/components/LowStockAlert.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, LowStockAlert(), StatusBadge.tsx, StatusBadge(), index.ts, index.ts]
- "components_productionrunssection": "ProductionRunsSection.tsx" | kind=code-symbol | source=src/features/production-runs/components/ProductionRunsSection.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, AppCard.tsx, AppCard, LogProductionRunDialog.tsx, LogProductionRunDialog(), ProductionHistoryTable.tsx]
- "components_productionstatusbadge": "ProductionStatusBadge.tsx" | kind=code-symbol | source=src/features/production-orders/components/ProductionStatusBadge.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, LabelTypeRow.tsx, PlannedLabelTypesTable.tsx, production-order-columns.tsx, LINE_STATUS, ORDER_STATUS]
- "components_roll_columns": "roll-columns.tsx" | kind=code-symbol | source=src/features/production-orders/components/roll-columns.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, 9fc49fe Sync client from 3Q-facility-Da…, ee6dbbe feat: production order completi…, progress-bar.tsx]
- "materials_index": "index.ts" | kind=code-symbol | source=src/features/materials/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, inventory-stock-table.tsx, LowStockAlert.tsx, PlanLabelTypeForm.tsx, purchase-row-actions.tsx, RollStockDialog.tsx]
- "pages_labeltypemasterpage": "LabelTypeMasterPage.tsx" | kind=code-symbol | source=src/features/label-types/pages/LabelTypeMasterPage.tsx:L1 | neighbors=[routes.tsx, 12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateLabelTypeDialog.tsx, CreateLabelTypeDialog(), LabelTypeTable.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-003.json

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
