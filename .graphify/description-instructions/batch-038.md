# Node Description Batch 39 of 74

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

- "tox_fail": "fail()" | kind=code-symbol | source=tox.mjs:L86 | neighbors=[tox.mjs, main()]
- "tox_heading": "heading()" | kind=code-symbol | source=tox.mjs:L92 | neighbors=[tox.mjs, runEnv()]
- "tox_info": "info()" | kind=code-symbol | source=tox.mjs:L89 | neighbors=[tox.mjs, main()]
- "tox_parseargs": "parseArgs()" | kind=code-symbol | source=tox.mjs:L136 | neighbors=[tox.mjs, main()]
- "ui_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L11 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L26 | neighbors=[OperatorAvatar.tsx, avatar.tsx]
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
- "ui_command_commandlist": "CommandList()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L90 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_command_commandseparator": "CommandSeparator()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L135 | neighbors=[CommandPalette.tsx, command.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L85 | neighbors=[AppDialog.tsx, dialog.tsx]
- "ui_drawer_drawercontent": "DrawerContent()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L100 | neighbors=[drawer.tsx, useDrawer()]
- "ui_drawer_usedrawer": "useDrawer()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L17 | neighbors=[drawer.tsx, DrawerContent()]
- "ui_dropdown_menu_dropdownmenugroup": "DropdownMenuGroup()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L50 | neighbors=[nav-user.tsx, dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L54 | neighbors=[nav-user.tsx, dropdown-menu.tsx]
- "ui_empty_empty": "Empty()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L5 | neighbors=[data-table-empty.tsx, empty.tsx]
- "ui_empty_emptydescription": "EmptyDescription()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L71 | neighbors=[data-table-empty.tsx, empty.tsx]
- "ui_empty_emptyheader": "EmptyHeader()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L18 | neighbors=[data-table-empty.tsx, empty.tsx]
- "ui_empty_emptymediavariants": "emptyMediaVariants" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L28 | neighbors=[empty.tsx, EmptyMedia()]
- "ui_empty_emptytitle": "EmptyTitle()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L58 | neighbors=[data-table-empty.tsx, empty.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-038.json

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
