# Node Description Batch 15 of 53

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "tables_woven_work_order_details_table": "woven-work-order-details.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-work-order-details.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, wovenWorkOrderDetails, 9b99ce1 feat: complete production workf…, f5f1f47 feat: woven labels foundation —…]
- "thread_dyeing_types_dyeingsend": "DyeingSend" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L42 | neighbors=[ReceiveDyeingDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_serviceprovider": "ServiceProvider" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L14 | neighbors=[ServiceProviderDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "ui_input_group_inputgroupaddon": "InputGroupAddon()" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L46 | neighbors=[combobox.tsx, command.tsx, input-group.tsx, inputGroupAddonVariants]
- "ui_progress_progress": "Progress()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L5 | neighbors=[LabelTypeRow.tsx, progress-bar.tsx, WorkOrderDetailPage.tsx, progress.tsx]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=client/src/components/ui/separator.tsx:L5 | neighbors=[data-table-toolbar.tsx, AppHeader.tsx, separator.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L458 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L502 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenuitem": "SidebarMenuItem()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L469 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L50 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx, tabsListVariants]
- "ui_tooltip_tooltip": "Tooltip()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L20 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L28 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltiptrigger": "TooltipTrigger()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L24 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "users_user_controller": "user.controller.ts" | kind=code-symbol | source=server/src/modules/users/user.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), UserController]
- "utils_line_draft_linedraft": "LineDraft" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L10 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, line-draft.ts, line-draft.test.ts]
- "work_orders_types_producttype": "ProductType" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L19 | neighbors=[work-order-table.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx, types.ts]
- "work_orders_types_work_order_priority_meta": "WORK_ORDER_PRIORITY_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L29 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_type_meta": "WORK_ORDER_TYPE_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L41 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_work_order_controller": "work-order.controller.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), WorkOrderController]
- "breadcrumb_appbreadcrumb_appbreadcrumb": "AppBreadcrumb()" | kind=code-symbol | source=client/src/shared/components/breadcrumb/AppBreadcrumb.tsx:L29 | neighbors=[AppBreadcrumb.tsx, pathToSegments(), AppHeader.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@25b3e1ab29b3568b77bd363fb9b9a6e155831f07": "25b3e1a ci: add GitHub Actions pipeline (typecheck, lint, test, build)" | kind=Commit | source=git | neighbors=[chore/ci, f5f1f47 feat: woven labels foundation —…, c0c79ec Initial commit: Label Manufactu…]
- "components_availabilitybadge_availabilitybadge": "AvailabilityBadge()" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L27 | neighbors=[AvailabilityBadge.tsx, machine-columns.tsx, operator-columns.tsx]
- "components_branddialog_branddialog": "BrandDialog()" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L23 | neighbors=[brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]
- "components_companydialog_companydialog": "CompanyDialog()" | kind=code-symbol | source=client/src/features/companies/components/CompanyDialog.tsx:L17 | neighbors=[company-row-actions.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "components_dyethreaddialog_dyethreaddialog": "DyeThreadDialog()" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L25 | neighbors=[DyeThreadDialog.tsx, ThreadStockPanel.tsx, index.ts]
- "components_inventory_stock_table_inventorystocktable": "InventoryStockTable()" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L30 | neighbors=[inventory-stock-table.tsx, InventoryStockPage.tsx, RollStockPage.tsx]
- "components_machine_table_machinetable": "MachineTable()" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-table.tsx:L18 | neighbors=[machine-table.tsx, MachinesOperatorsPage.tsx, MachinesPage.tsx]
- "components_machinedialog_machinedialog": "MachineDialog()" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L38 | neighbors=[machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx]
- "components_machineselect_machineselect": "MachineSelect()" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, MachineSelect.tsx, index.ts]
- "components_materialform_materialform": "MaterialForm()" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L26 | neighbors=[material-row-actions.tsx, MaterialForm.tsx, MaterialMasterPage.tsx]
- "components_operator_table_operatortable": "OperatorTable()" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L21 | neighbors=[operator-table.tsx, MachinesOperatorsPage.tsx, OperatorsPage.tsx]
- "components_operatordialog_operatordialog": "OperatorDialog()" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L38 | neighbors=[operator-row-actions.tsx, operator-table.tsx, OperatorDialog.tsx]
- "components_operatorselect_operatorselect": "OperatorSelect()" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, OperatorSelect.tsx, index.ts]
- "components_planlabeltypedialog_planlabeltypedialog": "PlanLabelTypeDialog()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L16 | neighbors=[PlanLabelTypeDialog.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx]
- "components_productionsummary_productionsummary": "ProductionSummary()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L92 | neighbors=[ProductionSummary.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "components_progress_bar_progressbar": "ProgressBar()" | kind=code-symbol | source=client/src/shared/components/progress-bar.tsx:L19 | neighbors=[progress-bar.tsx, roll-columns.tsx, woven-columns.tsx]
- "components_progress_table_styles_stickycellclass": "stickyCellClass()" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L44 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, progress-table-styles.ts]
- "components_purchase_table_purchasetable": "PurchaseTable()" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L46 | neighbors=[purchase-table.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx]
- "components_rollstockdialog_rollstockdialog": "RollStockDialog()" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L36 | neighbors=[inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx]
- "components_wovenplanningform_wovenplanningform": "WovenPlanningForm()" | kind=code-symbol | source=client/src/features/production-orders/components/WovenPlanningForm.tsx:L57 | neighbors=[PlanLabelTypeDialog.tsx, WovenPlanningForm.tsx, WovenProductionPanel.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-014.json

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
