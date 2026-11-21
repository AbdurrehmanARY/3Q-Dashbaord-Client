# Node Description Batch 37 of 38

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

- "ui_progress_progressvalue": "ProgressValue()" | kind=code-symbol | source=src/components/ui/progress.tsx:L62 | neighbors=[progress.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L6 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L29 | neighbors=[scroll-area.tsx]
- "ui_select_selectgroup": "SelectGroup()" | kind=code-symbol | source=src/components/ui/select.tsx:L11 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel()" | kind=code-symbol | source=src/components/ui/select.tsx:L98 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=src/components/ui/select.tsx:L171 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=src/components/ui/select.tsx:L152 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=src/components/ui/select.tsx:L139 | neighbors=[select.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L16 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L85 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L24 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L20 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L12 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L45 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontextprops": "SidebarContextProps" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L35 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupaction": "SidebarGroupAction()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L420 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L444 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargrouplabel": "SidebarGroupLabel()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L396 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinput": "SidebarInput()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L321 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuaction": "SidebarMenuAction()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L558 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubadge": "SidebarMenuBadge()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L588 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuskeleton": "SidebarMenuSkeleton()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L605 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarseparator": "SidebarSeparator()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L357 | neighbors=[sidebar.tsx]
- "ui_table_tablecaption": "TableCaption()" | kind=code-symbol | source=src/components/ui/table.tsx:L94 | neighbors=[table.tsx]
- "ui_toggle_group_togglegroupcontext": "ToggleGroupContext" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L9 | neighbors=[toggle-group.tsx]
- "utils_batch_edit_test_src": "src()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.test.ts:L49 | neighbors=[batch-edit.test.ts]
- "utils_line_draft_completionpct": "completionPct()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.ts:L142 | neighbors=[line-draft.ts]
- "utils_line_draft_test_makedraft": "makeDraft()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.test.ts:L5 | neighbors=[line-draft.test.ts]
- "utils_line_draft_test_makeoverview": "makeOverview()" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.test.ts:L116 | neighbors=[line-draft.test.ts]
- "utils_line_draft_test_planning": "planning" | kind=code-symbol | source=src/features/production-orders/utils/line-draft.test.ts:L22 | neighbors=[line-draft.test.ts]
- "utils_planning_dialog_planningsubmittarget": "PlanningSubmitTarget" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.ts:L9 | neighbors=[planning-dialog.ts]
- "utils_planning_dialog_test_makeprintedediting": "makePrintedEditing()" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.test.ts:L12 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_makewovenediting": "makeWovenEditing()" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.test.ts:L33 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_printedbody": "printedBody" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.test.ts:L52 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_wovenbody": "wovenBody" | kind=code-symbol | source=src/features/production-orders/utils/planning-dialog.test.ts:L59 | neighbors=[planning-dialog.test.ts]
- "utils_planning_rows_planrowlike": "PlanRowLike" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L4 | neighbors=[planning-rows.ts]
- "utils_planning_rows_test_sum": "sum()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.test.ts:L21 | neighbors=[planning-rows.test.ts]
- "utils_planning_rows_test_thread": "thread()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.test.ts:L13 | neighbors=[planning-rows.test.ts]
- "vite_config_d": "vite.config.d.ts" | kind=code-symbol | source=vite.config.d.ts:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "vite_config_proxyagent": "proxyAgent" | kind=code-symbol | source=vite.config.ts:L7 | neighbors=[vite.config.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-036.json

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
