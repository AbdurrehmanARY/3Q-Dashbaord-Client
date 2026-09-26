# Node Description Batch 48 of 53

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

- "tables_users_table_users": "users" | kind=code-symbol | source=server/src/shared/db/tables/users.table.ts:L18 | neighbors=[users.table.ts]
- "tables_work_orders_table_workorders": "workOrders" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L28 | neighbors=[work-orders.table.ts]
- "tables_work_orders_table_workorderstatusenum": "workOrderStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L15 | neighbors=[work-orders.table.ts]
- "tables_woven_production_lines_table_wovenproductionlines": "wovenProductionLines" | kind=code-symbol | source=server/src/shared/db/tables/woven-production-lines.table.ts:L22 | neighbors=[woven-production-lines.table.ts]
- "tables_woven_thread_plan_items_table_woventhreadplanitems": "wovenThreadPlanItems" | kind=code-symbol | source=server/src/shared/db/tables/woven-thread-plan-items.table.ts:L19 | neighbors=[woven-thread-plan-items.table.ts]
- "tables_woven_work_order_details_table_wovenworkorderdetails": "wovenWorkOrderDetails" | kind=code-symbol | source=server/src/shared/db/tables/woven-work-order-details.table.ts:L15 | neighbors=[woven-work-order-details.table.ts]
- "test_setup": "setup.ts" | kind=code-symbol | source=client/src/test/setup.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "tests_architecture_test_allowed_cross_module_repo_edges": "ALLOWED_CROSS_MODULE_REPO_EDGES" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L20 | neighbors=[architecture.test.ts]
- "tests_architecture_test_files": "files" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L71 | neighbors=[architecture.test.ts]
- "tests_architecture_test_graph": "graph" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L74 | neighbors=[architecture.test.ts]
- "tests_architecture_test_rel": "rel()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L37 | neighbors=[architecture.test.ts]
- "tests_architecture_test_resolve": "resolve()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L40 | neighbors=[architecture.test.ts]
- "tests_architecture_test_root": "ROOT" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L16 | neighbors=[architecture.test.ts]
- "tests_architecture_test_specifiers": "specifiers()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L59 | neighbors=[architecture.test.ts]
- "tests_architecture_test_src": "SRC" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L17 | neighbors=[architecture.test.ts]
- "tests_architecture_test_walkts": "walkTs()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L24 | neighbors=[architecture.test.ts]
- "thread_dyeing_types_allocationinput": "AllocationInput" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L57 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingallocation": "DyeingAllocation" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L22 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingreceive": "DyeingReceive" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L34 | neighbors=[types.ts]
- "thread_types_movement_labels": "MOVEMENT_LABELS" | kind=code-symbol | source=client/src/features/thread/types.ts:L62 | neighbors=[types.ts]
- "thread_types_threadbasecolor": "ThreadBaseColor" | kind=code-symbol | source=client/src/features/thread/types.ts:L7 | neighbors=[types.ts]
- "thread_types_threadmovementtype": "ThreadMovementType" | kind=code-symbol | source=client/src/features/thread/types.ts:L41 | neighbors=[types.ts]
- "thread_types_threadstocktype": "ThreadStockType" | kind=code-symbol | source=client/src/features/thread/types.ts:L14 | neighbors=[types.ts]
- "types_index_inferinsert": "inferInsert" | kind=code-symbol | source=server/src/shared/db/types/index.ts:L9 | neighbors=[index.ts]
- "types_index_inferselect": "inferSelect" | kind=code-symbol | source=server/src/shared/db/types/index.ts:L3 | neighbors=[index.ts]
- "ui_accordion_accordion": "Accordion()" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L6 | neighbors=[accordion.tsx]
- "ui_accordion_accordioncontent": "AccordionContent()" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L49 | neighbors=[accordion.tsx]
- "ui_accordion_accordionitem": "AccordionItem()" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L16 | neighbors=[accordion.tsx]
- "ui_accordion_accordiontrigger": "AccordionTrigger()" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L26 | neighbors=[accordion.tsx]
- "ui_alert_dialog_alertdialogmedia": "AlertDialogMedia()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L94 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogoverlay": "AlertDialogOverlay()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L23 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogportal": "AlertDialogPortal()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L17 | neighbors=[alert-dialog.tsx]
- "ui_avatar_avatarbadge": "AvatarBadge()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L55 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroup": "AvatarGroup()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L71 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroupcount": "AvatarGroupCount()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L84 | neighbors=[avatar.tsx]
- "ui_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L95 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L42 | neighbors=[breadcrumb.tsx]
- "ui_calendar_calendardaybutton": "CalendarDayButton()" | kind=code-symbol | source=client/src/components/ui/calendar.tsx:L181 | neighbors=[calendar.tsx]
- "ui_chart_chartcontext": "ChartContext" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L30 | neighbors=[chart.tsx]
- "ui_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L26 | neighbors=[chart.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-047.json

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
