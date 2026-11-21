# Node Description Batch 12 of 38

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

- "production_orders_batch_types_lineflow": "LineFlow" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L149 | neighbors=[BatchStageBoard.tsx, StageProgressBars.tsx, batch-types.ts, index.ts]
- "production_orders_batch_types_stagemachine": "StageMachine" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L127 | neighbors=[CreateBatchDialog.tsx, EditBatchDialog.tsx, batch-types.ts, StageResource]
- "production_orders_label_types_issizelabel": "isSizeLabel()" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L26 | neighbors=[CreateBatchDialog.tsx, EditBatchDialog.tsx, PlanLabelTypeForm.tsx, label-types.ts]
- "production_orders_types_completionreport": "CompletionReport" | kind=code-symbol | source=src/features/production-orders/types.ts:L476 | neighbors=[use-production-orders.ts, index.ts, types.ts, production-order-service.ts]
- "production_orders_types_updatelinefullinput": "UpdateLineFullInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L419 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts, line-draft.ts]
- "production_orders_woven_types_threadplaninput": "ThreadPlanInput" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L118 | neighbors=[SharedThreadAllocation.tsx, woven-types.ts, planning-rows.ts, planning-rows.test.ts]
- "schemas_material_schemas_material_types": "MATERIAL_TYPES" | kind=code-symbol | source=src/features/materials/schemas/material-schemas.ts:L13 | neighbors=[material-table.tsx, MaterialForm.tsx, index.ts, material-schemas.ts]
- "store_table_visibility_store_usetablecolumnvisibility": "useTableColumnVisibility()" | kind=code-symbol | source=src/store/table-visibility-store.ts:L106 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts, useTableVisibilityStore]
- "store_table_visibility_store_usetablevisibilitystore": "useTableVisibilityStore" | kind=code-symbol | source=src/store/table-visibility-store.ts:L65 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts, useTableColumnVisibility()]
- "store_ui_store_useuistore": "useUiStore" | kind=code-symbol | source=src/store/ui-store.ts:L11 | neighbors=[use-theme.ts, ThemeProvider.tsx, ui-store.ts, sonner.tsx]
- "thread_dyeing_types_dyeingsend": "DyeingSend" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L42 | neighbors=[ReceiveDyeingDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_serviceprovider": "ServiceProvider" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L14 | neighbors=[ServiceProviderDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=src/components/ui/badge.tsx:L30 | neighbors=[BatchStageBoard.tsx, label-type-columns.tsx, badge.tsx, badgeVariants]
- "ui_input_group_inputgroupaddon": "InputGroupAddon()" | kind=code-symbol | source=src/components/ui/input-group.tsx:L46 | neighbors=[combobox.tsx, command.tsx, input-group.tsx, inputGroupAddonVariants]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=src/components/ui/separator.tsx:L5 | neighbors=[data-table-toolbar.tsx, AppHeader.tsx, separator.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L458 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L502 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenuitem": "SidebarMenuItem()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L469 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L50 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx, tabsListVariants]
- "ui_tooltip_tooltip": "Tooltip()" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L20 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent()" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L28 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltiptrigger": "TooltipTrigger()" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L24 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "utils_batch_edit_ownedgesof": "ownEdgesOf()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L53 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, batch-edit.test.ts, validateBatchEdit()]
- "utils_line_draft_linedraft": "LineDraft" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L10 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, line-draft.ts, line-draft.test.ts]
- "utils_planning_rows_labeltypetaken": "labelTypeTaken()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L47 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, labelKey(), planning-rows.test.ts]
- "utils_planning_rows_tonumber": "toNumber()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L12 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, allocateSharedThreads(), planning-rows.test.ts]
- "utils_weaving_time_estimateweavinghours": "estimateWeavingHours()" | kind=code-symbol | source=src/features/work-orders/utils/weaving-time.ts:L8 | neighbors=[work-order-columns.tsx, WovenSpecification.tsx, weaving-time.ts, weaving-time.test.ts]
- "utils_weaving_time_test": "weaving-time.test.ts" | kind=code-symbol | source=src/features/work-orders/utils/weaving-time.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, weaving-time.ts, estimateWeavingHours()]
- "work_orders_types_work_order_priority_meta": "WORK_ORDER_PRIORITY_META" | kind=code-symbol | source=src/features/work-orders/types.ts:L29 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_type_meta": "WORK_ORDER_TYPE_META" | kind=code-symbol | source=src/features/work-orders/types.ts:L41 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "breadcrumb_appbreadcrumb_appbreadcrumb": "AppBreadcrumb()" | kind=code-symbol | source=src/shared/components/breadcrumb/AppBreadcrumb.tsx:L29 | neighbors=[AppBreadcrumb.tsx, pathToSegments(), AppHeader.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@c2dc30dab55a1566dfe022967fd74bdedf3c6653": "c2dc30d feat: restrict weaving machine and operator pickers in woven production…" | kind=Commit | source=git | neighbors=[567656d feat: add max length validation…, main, 9ff35ed feat: add speed (RPM) to Work O…]
- "components_availabilitybadge_availabilitybadge": "AvailabilityBadge()" | kind=code-symbol | source=src/features/machines-operators/components/AvailabilityBadge.tsx:L27 | neighbors=[AvailabilityBadge.tsx, machine-columns.tsx, operator-columns.tsx]
- "components_branddialog_branddialog": "BrandDialog()" | kind=code-symbol | source=src/features/companies/components/BrandDialog.tsx:L23 | neighbors=[brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]
- "components_companydialog_companydialog": "CompanyDialog()" | kind=code-symbol | source=src/features/companies/components/CompanyDialog.tsx:L17 | neighbors=[company-row-actions.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "components_dyethreaddialog_dyethreaddialog": "DyeThreadDialog()" | kind=code-symbol | source=src/features/thread/components/DyeThreadDialog.tsx:L25 | neighbors=[DyeThreadDialog.tsx, ThreadStockPanel.tsx, index.ts]
- "components_inventory_stock_table_inventorystocktable": "InventoryStockTable()" | kind=code-symbol | source=src/features/inventory/components/inventory-stock-table.tsx:L30 | neighbors=[inventory-stock-table.tsx, InventoryStockPage.tsx, RollStockPage.tsx]
- "components_machine_table_machinetable": "MachineTable()" | kind=code-symbol | source=src/features/machines-operators/components/machine-table.tsx:L18 | neighbors=[machine-table.tsx, MachinesOperatorsPage.tsx, MachinesPage.tsx]
- "components_machinedialog_machinedialog": "MachineDialog()" | kind=code-symbol | source=src/features/machines-operators/components/MachineDialog.tsx:L38 | neighbors=[machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx]
- "components_machineselect_machineselect": "MachineSelect()" | kind=code-symbol | source=src/features/machines-operators/components/MachineSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, MachineSelect.tsx, index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-011.json

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
