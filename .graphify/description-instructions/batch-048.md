# Node Description Batch 49 of 53

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

- "ui_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L84 | neighbors=[chart.tsx]
- "ui_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L330 | neighbors=[chart.tsx]
- "ui_chart_initial_dimension": "INITIAL_DIMENSION" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L12 | neighbors=[chart.tsx]
- "ui_chart_themes": "THEMES" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L10 | neighbors=[chart.tsx]
- "ui_chart_tooltipnametype": "TooltipNameType" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L13 | neighbors=[chart.tsx]
- "ui_combobox_comboboxchip": "ComboboxChip()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L233 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchips": "ComboboxChips()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L216 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchipsinput": "ComboboxChipsInput()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L264 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxclear": "ComboboxClear()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L39 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcollection": "ComboboxCollection()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L184 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcontent": "ComboboxContent()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L87 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxempty": "ComboboxEmpty()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L190 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxgroup": "ComboboxGroup()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L161 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxinput": "ComboboxInput()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L52 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxitem": "ComboboxItem()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L135 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxlabel": "ComboboxLabel()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L171 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxlist": "ComboboxList()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L121 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxseparator": "ComboboxSeparator()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L203 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxtrigger": "ComboboxTrigger" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L22 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxvalue": "ComboboxValue()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L18 | neighbors=[combobox.tsx]
- "ui_combobox_usecomboboxanchor": "useComboboxAnchor()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L277 | neighbors=[combobox.tsx]
- "ui_command_command": "Command()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L18 | neighbors=[command.tsx]
- "ui_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=client/src/components/ui/command.tsx:L168 | neighbors=[command.tsx]
- "ui_dialog_dialogclose": "DialogClose()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L20 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L24 | neighbors=[dialog.tsx]
- "ui_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L16 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L12 | neighbors=[dialog.tsx]
- "ui_drawer_drawer": "Drawer()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L27 | neighbors=[drawer.tsx]
- "ui_drawer_drawerclose": "DrawerClose()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L63 | neighbors=[drawer.tsx]
- "ui_drawer_drawercontext": "DrawerContext" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L15 | neighbors=[drawer.tsx]
- "ui_drawer_drawercontextprops": "DrawerContextProps" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L8 | neighbors=[drawer.tsx]
- "ui_drawer_drawerdescription": "DrawerDescription()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L203 | neighbors=[drawer.tsx]
- "ui_drawer_drawerfooter": "DrawerFooter()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L180 | neighbors=[drawer.tsx]
- "ui_drawer_drawerheader": "DrawerHeader()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L167 | neighbors=[drawer.tsx]
- "ui_drawer_draweroverlay": "DrawerOverlay()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L67 | neighbors=[drawer.tsx]
- "ui_drawer_drawerportal": "DrawerPortal()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L59 | neighbors=[drawer.tsx]
- "ui_drawer_drawerswipehandle": "DrawerSwipeHandle()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L83 | neighbors=[drawer.tsx]
- "ui_drawer_drawertitle": "DrawerTitle()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L190 | neighbors=[drawer.tsx]
- "ui_drawer_drawertrigger": "DrawerTrigger()" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L55 | neighbors=[drawer.tsx]
- "ui_dropdown_menu_dropdownmenuportal": "DropdownMenuPortal()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L11 | neighbors=[dropdown-menu.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-048.json

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
