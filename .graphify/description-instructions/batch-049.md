# Node Description Batch 50 of 53

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

- "ui_dropdown_menu_dropdownmenuradiogroup": "DropdownMenuRadioGroup()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L180 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L189 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L234 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusub": "DropdownMenuSub()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L97 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L125 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L101 | neighbors=[dropdown-menu.tsx]
- "ui_input_group_inputgroupbuttonvariants": "inputGroupButtonVariants" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L68 | neighbors=[input-group.tsx]
- "ui_input_group_inputgrouptext": "InputGroupText()" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L106 | neighbors=[input-group.tsx]
- "ui_input_group_inputgrouptextarea": "InputGroupTextarea" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L135 | neighbors=[input-group.tsx]
- "ui_navigation_menu_navigationmenu": "NavigationMenu()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L7 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenucontent": "NavigationMenuContent()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L79 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuindicator": "NavigationMenuIndicator()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L140 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuitem": "NavigationMenuItem()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L45 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenulink": "NavigationMenuLink()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L124 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenulist": "NavigationMenuList()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L29 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenupositioner": "NavigationMenuPositioner()" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L95 | neighbors=[navigation-menu.tsx]
- "ui_pagination_paginationlinkprops": "PaginationLinkProps" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L36 | neighbors=[pagination.tsx]
- "ui_popover_popoverdescription": "PopoverDescription()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L68 | neighbors=[popover.tsx]
- "ui_popover_popoverheader": "PopoverHeader()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L48 | neighbors=[popover.tsx]
- "ui_popover_popovertitle": "PopoverTitle()" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L58 | neighbors=[popover.tsx]
- "ui_progress_progressindicator": "ProgressIndicator()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L39 | neighbors=[progress.tsx]
- "ui_progress_progresslabel": "ProgressLabel()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L52 | neighbors=[progress.tsx]
- "ui_progress_progresstrack": "ProgressTrack()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L26 | neighbors=[progress.tsx]
- "ui_progress_progressvalue": "ProgressValue()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L62 | neighbors=[progress.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L6 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L29 | neighbors=[scroll-area.tsx]
- "ui_select_selectgroup": "SelectGroup()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L11 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L98 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L171 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L152 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L139 | neighbors=[select.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L16 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L85 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L24 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L20 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L12 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L45 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontextprops": "SidebarContextProps" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L35 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupaction": "SidebarGroupAction()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L420 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L444 | neighbors=[sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-049.json

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
