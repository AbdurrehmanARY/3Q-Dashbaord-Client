# Node Description Batch 25 of 38

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

- "ui_pagination_paginationnext": "PaginationNext()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L83 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationprevious": "PaginationPrevious()" | kind=code-symbol | source=src/components/ui/pagination.tsx:L65 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_popover_popover": "Popover()" | kind=code-symbol | source=src/components/ui/popover.tsx:L6 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_popover_popovercontent": "PopoverContent()" | kind=code-symbol | source=src/components/ui/popover.tsx:L14 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_popover_popovertrigger": "PopoverTrigger()" | kind=code-symbol | source=src/components/ui/popover.tsx:L10 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_select_selectcontent": "SelectContent()" | kind=code-symbol | source=src/components/ui/select.tsx:L59 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selectitem": "SelectItem()" | kind=code-symbol | source=src/components/ui/select.tsx:L111 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selecttrigger": "SelectTrigger()" | kind=code-symbol | source=src/components/ui/select.tsx:L31 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selectvalue": "SelectValue()" | kind=code-symbol | source=src/components/ui/select.tsx:L21 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L8 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L37 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L108 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L75 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L95 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sidebar_sidebarcontent": "SidebarContent()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L371 | neighbors=[AppSidebar.tsx, sidebar.tsx]
- "ui_sidebar_sidebarfooter": "SidebarFooter()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L346 | neighbors=[AppSidebar.tsx, sidebar.tsx]
- "ui_sidebar_sidebargroup": "SidebarGroup()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L385 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarheader": "SidebarHeader()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L335 | neighbors=[AppSidebar.tsx, sidebar.tsx]
- "ui_sidebar_sidebarinset": "SidebarInset()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L308 | neighbors=[AppLayout.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenubuttonvariants": "sidebarMenuButtonVariants" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L480 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusub": "SidebarMenuSub()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L643 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusubbutton": "SidebarMenuSubButton" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L671 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusubitem": "SidebarMenuSubItem()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L657 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarprovider": "SidebarProvider()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L56 | neighbors=[AppLayout.tsx, sidebar.tsx]
- "ui_sonner_toaster": "Toaster()" | kind=code-symbol | source=src/components/ui/sonner.tsx:L10 | neighbors=[ToastProvider.tsx, sonner.tsx]
- "ui_table_tablefooter": "TableFooter()" | kind=code-symbol | source=src/components/ui/table.tsx:L42 | neighbors=[EditableLabelTypeTable.tsx, table.tsx]
- "ui_tabs_tabslistvariants": "tabsListVariants" | kind=code-symbol | source=src/components/ui/tabs.tsx:L35 | neighbors=[tabs.tsx, TabsList()]
- "ui_toggle_group_togglegroup": "ToggleGroup()" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L21 | neighbors=[ProductionTrendChart.tsx, toggle-group.tsx]
- "ui_toggle_group_togglegroupitem": "ToggleGroupItem()" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L57 | neighbors=[ProductionTrendChart.tsx, toggle-group.tsx]
- "ui_toggle_toggle": "Toggle()" | kind=code-symbol | source=src/components/ui/toggle.tsx:L28 | neighbors=[toggle.tsx, toggleVariants]
- "utils_batch_edit_floorphrase": "floorPhrase()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L199 | neighbors=[batch-edit.ts, validateBatchEdit()]
- "utils_batch_edit_test_basevalues": "baseValues()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.test.ts:L62 | neighbors=[batch-edit.test.ts, makeBatch()]
- "utils_batch_edit_test_makebatch": "makeBatch()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.test.ts:L15 | neighbors=[batch-edit.test.ts, baseValues()]
- "utils_line_draft_linetodraft": "lineToDraft()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L24 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts]
- "utils_planning_rows_labelkey": "labelKey()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L23 | neighbors=[planning-rows.ts, labelTypeTaken()]
- "utils_planning_rows_round3": "round3()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L87 | neighbors=[planning-rows.ts, allocateSharedThreads()]
- "utils_production_order_export_exportproductionordertoexcel": "exportProductionOrderToExcel()" | kind=code-symbol | source=src/features/production-orders/utils/production-order-export.ts:L8 | neighbors=[ProductionOrderDashboardPage.tsx, production-order-export.ts]
- "utils_production_order_export_printproductionorderjobticket": "printProductionOrderJobTicket()" | kind=code-symbol | source=src/features/production-orders/utils/production-order-export.ts:L77 | neighbors=[ProductionOrderDashboardPage.tsx, production-order-export.ts]
- "work_orders_types_work_order_priorities": "WORK_ORDER_PRIORITIES" | kind=code-symbol | source=src/features/work-orders/types.ts:L28 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_types": "WORK_ORDER_TYPES" | kind=code-symbol | source=src/features/work-orders/types.ts:L40 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-024.json

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
