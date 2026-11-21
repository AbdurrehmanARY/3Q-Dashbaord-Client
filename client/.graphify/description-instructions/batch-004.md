# Node Description Batch 5 of 38

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

- "pages_purchaserecordpage": "PurchaseRecordPage.tsx" | kind=code-symbol | source=src/features/purchases/pages/PurchaseRecordPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, purchase-table.tsx, PurchaseTable(), PurchaseForm.tsx, PurchaseForm()]
- "ui_button_button": "Button" | kind=code-symbol | source=src/components/ui/button.tsx:L46 | neighbors=[LowStockAlert.tsx, RecentWorkOrders.tsx, data-table-toolbar.tsx, AppButton.tsx, DashboardPage.tsx, ProductionOrderDashboardPage.tsx]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=src/components/ui/chart.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ProductionTrendChart.tsx, utils.ts, cn(), ChartConfig, ChartContainer()]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), button.tsx, buttonVariants, Sheet()]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[StatCard.tsx, EditableLabelTypeTable.tsx, LowStockAlert.tsx, ProductionCompletionReport.tsx, ProductionRunsSection.tsx, ProductionTrendChart.tsx]
- "utils_line_draft_test": "line-draft.test.ts" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, types.ts, LinePlanning]
- "components_date_picker": "date-picker.tsx" | kind=code-symbol | source=src/shared/components/date-picker.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, DatePicker(), DatePickerProps, toISODate(), utils.ts, cn()]
- "components_operator_columns": "operator-columns.tsx" | kind=code-symbol | source=src/features/machines-operators/components/operator-columns.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AvailabilityBadge.tsx, AvailabilityBadge(), operatorColumns, operator-row-actions.tsx, OperatorRowActions()]
- "components_plannedlabeltypestable": "PlannedLabelTypesTable.tsx" | kind=code-symbol | source=src/features/production-orders/components/PlannedLabelTypesTable.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, AppCard.tsx, AppCard, PlannedLabelTypesTable(), PlannedLabelTypesTableProps]
- "components_sizeplaneditor": "SizePlanEditor.tsx" | kind=code-symbol | source=src/features/production-orders/components/SizePlanEditor.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, PlanLabelTypeForm.tsx, SizePlanEditor(), SizePlanEditorProps, AppButton.tsx]
- "data_table_data_table_column_header": "data-table-column-header.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-column-header.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, DataTableColumnHeader(), DataTableColumnHeaderProps, utils.ts, cn()]
- "feedback_operatoravatar": "OperatorAvatar.tsx" | kind=code-symbol | source=src/components/feedback/OperatorAvatar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, operator-columns.tsx, OperatorDialog.tsx, ProductionSummary.tsx, WovenProductionPanel.tsx, initialsOf()]
- "healthcheck_client_healthcheck": "client_healthcheck.tsx" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ClientHealthcheck(), HealthcheckProps, HealthChip(), HealthDetailCard()]
- "hooks_use_materials": "use-materials.ts" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, material-row-actions.tsx, material-table.tsx, MaterialForm.tsx, MaterialSelect.tsx, MATERIAL_KEYS]
- "label_types_index": "index.ts" | kind=code-symbol | source=src/features/label-types/index.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, use-label-types.ts, LABEL_TYPE_KEYS, useCreateLabelType(), useDeleteLabelType()]
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[AppCard.tsx, StatCard.tsx, ee6dbbe feat: production order completi…, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx]
- "ui_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L19 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L15 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx]
- "utils_planning_dialog_test": "planning-dialog.test.ts" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, types.ts, PlanLineInput, ProductionLineOverview, woven-types.ts]
- "components_ink_purchase_columns": "ink-purchase-columns.tsx" | kind=code-symbol | source=src/features/ink/components/ink-purchase-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ColumnCallbacks, inkPurchaseColumns(), index.ts, ConfirmDialog.tsx, ConfirmDialog()]
- "components_inkoperatorbreakdown": "InkOperatorBreakdown.tsx" | kind=code-symbol | source=src/features/ink/components/InkOperatorBreakdown.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkOperatorBreakdown(), use-ink.ts, useInkConsumptionByOperator(), format.ts, formatNumber()]
- "components_machine_columns": "machine-columns.tsx" | kind=code-symbol | source=src/features/machines-operators/components/machine-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AvailabilityBadge.tsx, AvailabilityBadge(), machineColumns, machine-row-actions.tsx]
- "data_table_data_table_skeleton": "data-table-skeleton.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-skeleton.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table.tsx, DataTableSkeleton(), DataTableSkeletonProps, skeleton.tsx, Skeleton()]
- "data_table_editable_cell": "editable-cell.tsx" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, EditableCell(), editableCellClass, EditableCellInput(), EditableCellInputProps, useEditableCell()]
- "header_appheader": "AppHeader.tsx" | kind=code-symbol | source=src/shared/components/header/AppHeader.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppBreadcrumb.tsx, AppBreadcrumb(), CommandPalette.tsx, CommandPalette(), CommandPaletteTrigger()]
- "ink_types": "types.ts" | kind=code-symbol | source=src/features/ink/types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, InkPurchaseDialog.tsx, use-ink.ts, InkConsumption]
- "production_runs_types": "types.ts" | kind=code-symbol | source=src/features/production-runs/types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, ProductionSummaryCard.tsx, use-production-runs.ts, LogProductionRunInput]
- "schemas_entity_schemas": "entity-schemas.ts" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, machine-table.tsx, MachineDialog.tsx, operator-table.tsx, OperatorDialog.tsx]
- "services_thread_service": "thread-service.ts" | kind=code-symbol | source=src/features/thread/services/thread-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-thread.ts, api.ts, api, threadService, types.ts]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L74 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, production-order-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L221 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=src/components/ui/pagination.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table-pagination.tsx, utils.ts, cn(), button.tsx, Button]
- "utils_planning_dialog": "planning-dialog.ts" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, PlanLabelTypeDialog.tsx, types.ts, PlanLineInput, ProductionLineOverview]
- "utils_planning_rows_test": "planning-rows.test.ts" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, woven-types.ts, ThreadPlanInput, planning-rows.ts, allocateSharedThreads()]
- "branch:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client#main": "main" | kind=Branch | source=git | neighbors=[0cdf79f fix: fallback speed to 600 RPM …, 12acd8e Sync client from 3Q-facility-Da…, 25e9a18 feat(client): summary-only comp…, 567656d feat: add max length validation…, 6341954 Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…]
- "components_ink_consumption_columns": "ink-consumption-columns.tsx" | kind=code-symbol | source=src/features/ink/components/ink-consumption-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, inkConsumptionColumns(), index.ts, ConfirmDialog.tsx, ConfirmDialog(), AppButton.tsx]
- "components_inventory_columns": "inventory-columns.tsx" | kind=code-symbol | source=src/features/inventory/components/inventory-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, inventoryColumns, roll-stock-row-actions.tsx, RollStockRowActions(), index.ts]
- "components_materialselect": "MaterialSelect.tsx" | kind=code-symbol | source=src/features/materials/components/MaterialSelect.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, MaterialSelect(), MaterialSelectProps, AppCombobox.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-004.json

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
