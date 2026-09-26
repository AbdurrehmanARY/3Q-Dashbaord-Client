# Node Description Batch 29 of 53

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

- "sidebar_nav_main_navmain": "NavMain()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L34 | neighbors=[AppSidebar.tsx, nav-main.tsx]
- "sidebar_nav_user_navuser": "NavUser()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-user.tsx:L19 | neighbors=[AppSidebar.tsx, nav-user.tsx]
- "src_api_entry": "api-entry.ts" | kind=code-symbol | source=server/src/api-entry.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, app.ts]
- "src_main": "main.tsx" | kind=code-symbol | source=client/src/main.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, app.ts]
- "tables_batch_consumptions_table": "batch-consumptions.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/batch-consumptions.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batchConsumptions]
- "theme_toggle_themetoggle_themetoggle": "ThemeToggle()" | kind=code-symbol | source=client/src/shared/components/theme-toggle/ThemeToggle.tsx:L5 | neighbors=[AppHeader.tsx, ThemeToggle.tsx]
- "thread_dyeing_types_base_colors": "BASE_COLORS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L6 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_basecolor": "BaseColor" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L2 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_denier": "Denier" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L1 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_deniers": "DENIERS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L5 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_dyeing_status_labels": "DYEING_STATUS_LABELS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L8 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_dyeing_types_dyeingstatus": "DyeingStatus" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L3 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_types_threaddenier": "ThreadDenier" | kind=code-symbol | source=client/src/features/thread/types.ts:L3 | neighbors=[index.ts, types.ts]
- "thread_types_threadmovement": "ThreadMovement" | kind=code-symbol | source=client/src/features/thread/types.ts:L49 | neighbors=[thread-service.ts, types.ts]
- "thread_types_threadstocksummary": "ThreadStockSummary" | kind=code-symbol | source=client/src/features/thread/types.ts:L30 | neighbors=[thread-service.ts, types.ts]
- "ui_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L11 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L26 | neighbors=[OperatorAvatar.tsx, avatar.tsx]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=client/src/components/ui/badge.tsx:L30 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=client/src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_breadcrumb_breadcrumb": "Breadcrumb()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L8 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L32 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblist": "BreadcrumbList()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L19 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbpage": "BreadcrumbPage()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L62 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L75 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_calendar_calendar": "Calendar()" | kind=code-symbol | source=client/src/components/ui/calendar.tsx:L13 | neighbors=[date-picker.tsx, calendar.tsx]
- "ui_card_cardaction": "CardAction()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L59 | neighbors=[ProductionTrendChart.tsx, card.tsx]
- "ui_card_cardfooter": "CardFooter()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L82 | neighbors=[AppCard.tsx, card.tsx]
- "ui_chart_chartconfig": "ChartConfig" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L15 | neighbors=[ProductionTrendChart.tsx, chart.tsx]
- "ui_chart_chartcontainer": "ChartContainer()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L42 | neighbors=[ProductionTrendChart.tsx, chart.tsx]
- "ui_chart_chartlegendcontent": "ChartLegendContent()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L275 | neighbors=[chart.tsx, useChart()]
- "ui_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=client/src/components/ui/checkbox.tsx:L8 | neighbors=[data-table.tsx, checkbox.tsx]
- "ui_collapsible_collapsible": "Collapsible()" | kind=code-symbol | source=client/src/components/ui/collapsible.tsx:L4 | neighbors=[nav-main.tsx, collapsible.tsx]
- "ui_collapsible_collapsiblecontent": "CollapsibleContent()" | kind=code-symbol | source=client/src/components/ui/collapsible.tsx:L17 | neighbors=[nav-main.tsx, collapsible.tsx]
- "ui_collapsible_collapsibletrigger": "CollapsibleTrigger" | kind=code-symbol | source=client/src/components/ui/collapsible.tsx:L10 | neighbors=[nav-main.tsx, collapsible.tsx]
- "ui_combobox_comboboxselectprops": "ComboboxSelectProps" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L288 | neighbors=[combobox.tsx, combobox.tsx]
- "ui_command_commanddialog": "CommandDialog()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L34 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_command_commandempty": "CommandEmpty()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L106 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_command_commandgroup": "CommandGroup()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L119 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_command_commandinput": "CommandInput()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L67 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_command_commanditem": "CommandItem()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L148 | neighbors=[CommandPalette.tsx, command.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-028.json

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
