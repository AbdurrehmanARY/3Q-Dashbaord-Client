# Node Description Batch 30 of 53

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
- "ui_input_group_inputgroupaddonvariants": "inputGroupAddonVariants" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L25 | neighbors=[input-group.tsx, InputGroupAddon()]
- "ui_input_group_inputgroupbutton": "InputGroupButton" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L86 | neighbors=[combobox.tsx, input-group.tsx]
- "ui_input_group_inputgroupinput": "InputGroupInput" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L118 | neighbors=[combobox.tsx, input-group.tsx]
- "ui_navigation_menu_navigationmenutrigger": "NavigationMenuTrigger()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L62 | neighbors=[navigation-menu.tsx, navigationMenuTriggerStyle]
- "ui_navigation_menu_navigationmenutriggerstyle": "navigationMenuTriggerStyle" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L58 | neighbors=[navigation-menu.tsx, NavigationMenuTrigger()]
- "ui_pagination_pagination": "Pagination()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L7 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationcontent": "PaginationContent()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L19 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationellipsis": "PaginationEllipsis()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L101 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationitem": "PaginationItem()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L32 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationlink": "PaginationLink()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L41 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationnext": "PaginationNext()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L83 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_pagination_paginationprevious": "PaginationPrevious()" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L65 | neighbors=[data-table-pagination.tsx, pagination.tsx]
- "ui_popover_popover": "Popover()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L6 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_popover_popovercontent": "PopoverContent()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L14 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_popover_popovertrigger": "PopoverTrigger()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L10 | neighbors=[date-picker.tsx, popover.tsx]
- "ui_select_selectcontent": "SelectContent()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L59 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selectitem": "SelectItem()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L111 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selecttrigger": "SelectTrigger()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L31 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_select_selectvalue": "SelectValue()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L21 | neighbors=[data-table-pagination.tsx, select.tsx]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L8 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L37 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L108 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L75 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L95 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_sidebar_sidebarcontent": "SidebarContent()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L371 | neighbors=[AppSidebar.tsx, sidebar.tsx]
- "ui_sidebar_sidebarfooter": "SidebarFooter()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L346 | neighbors=[AppSidebar.tsx, sidebar.tsx]
- "ui_sidebar_sidebargroup": "SidebarGroup()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L385 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarheader": "SidebarHeader()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L335 | neighbors=[AppSidebar.tsx, sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-029.json

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
