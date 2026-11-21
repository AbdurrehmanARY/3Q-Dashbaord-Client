# Node Description Batch 16 of 38

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

- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L146 | neighbors=[EditableLabelTypeTable.tsx, data-table-view-options.tsx, dropdown-menu.tsx]
- "ui_empty_emptymedia": "EmptyMedia()" | kind=code-symbol | source=src/components/ui/empty.tsx:L43 | neighbors=[data-table-empty.tsx, empty.tsx, emptyMediaVariants]
- "ui_input_group_inputgroup": "InputGroup()" | kind=code-symbol | source=src/components/ui/input-group.tsx:L11 | neighbors=[combobox.tsx, command.tsx, input-group.tsx]
- "ui_sidebar_sidebar": "Sidebar()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L152 | neighbors=[AppSidebar.tsx, sidebar.tsx, useSidebar()]
- "ui_sidebar_sidebarrail": "SidebarRail()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L283 | neighbors=[AppSidebar.tsx, sidebar.tsx, useSidebar()]
- "ui_sidebar_sidebartrigger": "SidebarTrigger()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L257 | neighbors=[AppHeader.tsx, sidebar.tsx, useSidebar()]
- "ui_tabs_tabs": "Tabs()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L17 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_tabs_tabscontent": "TabsContent()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L81 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L65 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_toggle_togglevariants": "toggleVariants" | kind=code-symbol | source=src/components/ui/toggle.tsx:L6 | neighbors=[toggle.tsx, toggle-group.tsx, Toggle()]
- "ui_tooltip_tooltipprovider": "TooltipProvider()" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L7 | neighbors=[AppLayout.tsx, LayoutProvider.tsx, tooltip.tsx]
- "utils_batch_edit_batcheditvalues": "BatchEditValues" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L111 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, batch-edit.test.ts]
- "utils_batch_edit_buildbatchupdatebody": "buildBatchUpdateBody()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L213 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, batch-edit.test.ts]
- "utils_batch_edit_editsourcecap": "editSourceCap()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L63 | neighbors=[batch-edit.ts, batch-edit.test.ts, validateBatchEdit()]
- "utils_batch_edit_mergeeditsources": "mergeEditSources()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L82 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, batch-edit.test.ts]
- "utils_batch_edit_round2": "round2()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L36 | neighbors=[batch-edit.ts, editFloor(), firstStageCap()]
- "utils_batch_edit_wholeunitword": "wholeUnitWord()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L39 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, validateBatchEdit()]
- "utils_line_draft_cascadedraft": "cascadeDraft()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L47 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_line_draft_difflinedraft": "diffLineDraft()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L68 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_line_draft_patchoverviewline": "patchOverviewLine()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L153 | neighbors=[use-production-orders.ts, line-draft.ts, line-draft.test.ts]
- "utils_line_draft_validatelinedraft": "validateLineDraft()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L91 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_planning_dialog_resolveplanningdefaultquantity": "resolvePlanningDefaultQuantity()" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.ts:L46 | neighbors=[PlanLabelTypeDialog.tsx, planning-dialog.ts, planning-dialog.test.ts]
- "utils_planning_dialog_resolveplanningsubmittarget": "resolvePlanningSubmitTarget()" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.ts:L22 | neighbors=[PlanLabelTypeDialog.tsx, planning-dialog.ts, planning-dialog.test.ts]
- "utils_planning_rows_cumulativestockissues": "cumulativeStockIssues()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L63 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_duplicaterowindexes": "duplicateRowIndexes()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L31 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_sizeplantotal": "sizePlanTotal()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L83 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_totalplannedquantity": "totalPlannedQuantity()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L18 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "work_orders_types_dispatchinput": "DispatchInput" | kind=code-symbol | source=src/features/work-orders/types.ts:L151 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]
- "work_orders_types_product_type_meta": "PRODUCT_TYPE_META" | kind=code-symbol | source=src/features/work-orders/types.ts:L21 | neighbors=[work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_workorderinput": "WorkOrderInput" | kind=code-symbol | source=src/features/work-orders/types.ts:L124 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]
- "app_appproviders_appproviders": "AppProviders()" | kind=code-symbol | source=src/app/AppProviders.tsx:L14 | neighbors=[AppProviders.tsx, App.tsx]
- "app_approutes_approutes": "AppRoutes()" | kind=code-symbol | source=src/app/AppRoutes.tsx:L15 | neighbors=[AppRoutes.tsx, App.tsx]
- "app_routes_redirects": "redirects" | kind=code-symbol | source=src/app/routes.tsx:L71 | neighbors=[AppRoutes.tsx, routes.tsx]
- "app_routes_routes": "routes" | kind=code-symbol | source=src/app/routes.tsx:L23 | neighbors=[AppRoutes.tsx, routes.tsx]
- "breadcrumb_appbreadcrumb_pathtosegments": "pathToSegments()" | kind=code-symbol | source=src/shared/components/breadcrumb/AppBreadcrumb.tsx:L14 | neighbors=[AppBreadcrumb.tsx, AppBreadcrumb()]
- "command_palette_commandpalette_commandpalette": "CommandPalette()" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L43 | neighbors=[CommandPalette.tsx, AppHeader.tsx]
- "command_palette_commandpalette_commandpalettetrigger": "CommandPaletteTrigger()" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L110 | neighbors=[CommandPalette.tsx, AppHeader.tsx]
- "components_artworkandcomment_artworkandcomment": "ArtworkAndComment()" | kind=code-symbol | source=src/features/work-orders/components/ArtworkAndComment.tsx:L6 | neighbors=[ArtworkAndComment.tsx, WorkOrderDialog.tsx]
- "components_batchoutputdialog_batchoutputdialog": "BatchOutputDialog()" | kind=code-symbol | source=src/features/production-orders/components/BatchOutputDialog.tsx:L32 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx]
- "components_batchtracedialog_batchtracedialog": "BatchTraceDialog()" | kind=code-symbol | source=src/features/production-orders/components/BatchTraceDialog.tsx:L18 | neighbors=[BatchStageBoard.tsx, BatchTraceDialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-015.json

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
