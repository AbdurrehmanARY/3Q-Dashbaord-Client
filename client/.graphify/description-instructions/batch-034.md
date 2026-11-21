# Node Description Batch 35 of 38

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

- "thread_types_threadmovementtype": "ThreadMovementType" | kind=code-symbol | source=src/features/thread/types.ts:L41 | neighbors=[types.ts]
- "thread_types_threadstocktype": "ThreadStockType" | kind=code-symbol | source=src/features/thread/types.ts:L14 | neighbors=[types.ts]
- "ui_accordion_accordion": "Accordion()" | kind=code-symbol | source=src/components/ui/accordion.tsx:L6 | neighbors=[accordion.tsx]
- "ui_accordion_accordioncontent": "AccordionContent()" | kind=code-symbol | source=src/components/ui/accordion.tsx:L49 | neighbors=[accordion.tsx]
- "ui_accordion_accordionitem": "AccordionItem()" | kind=code-symbol | source=src/components/ui/accordion.tsx:L16 | neighbors=[accordion.tsx]
- "ui_accordion_accordiontrigger": "AccordionTrigger()" | kind=code-symbol | source=src/components/ui/accordion.tsx:L26 | neighbors=[accordion.tsx]
- "ui_alert_dialog_alertdialogmedia": "AlertDialogMedia()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L94 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogoverlay": "AlertDialogOverlay()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L23 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogportal": "AlertDialogPortal()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L17 | neighbors=[alert-dialog.tsx]
- "ui_avatar_avatarbadge": "AvatarBadge()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L55 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroup": "AvatarGroup()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L71 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroupcount": "AvatarGroupCount()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L84 | neighbors=[avatar.tsx]
- "ui_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L95 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L42 | neighbors=[breadcrumb.tsx]
- "ui_calendar_calendardaybutton": "CalendarDayButton()" | kind=code-symbol | source=src/components/ui/calendar.tsx:L181 | neighbors=[calendar.tsx]
- "ui_chart_chartcontext": "ChartContext" | kind=code-symbol | source=src/components/ui/chart.tsx:L30 | neighbors=[chart.tsx]
- "ui_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=src/components/ui/chart.tsx:L26 | neighbors=[chart.tsx]
- "ui_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=src/components/ui/chart.tsx:L84 | neighbors=[chart.tsx]
- "ui_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=src/components/ui/chart.tsx:L330 | neighbors=[chart.tsx]
- "ui_chart_initial_dimension": "INITIAL_DIMENSION" | kind=code-symbol | source=src/components/ui/chart.tsx:L12 | neighbors=[chart.tsx]
- "ui_chart_themes": "THEMES" | kind=code-symbol | source=src/components/ui/chart.tsx:L10 | neighbors=[chart.tsx]
- "ui_chart_tooltipnametype": "TooltipNameType" | kind=code-symbol | source=src/components/ui/chart.tsx:L13 | neighbors=[chart.tsx]
- "ui_combobox_comboboxchip": "ComboboxChip()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L233 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchips": "ComboboxChips()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L216 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchipsinput": "ComboboxChipsInput()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L264 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxclear": "ComboboxClear()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L39 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcollection": "ComboboxCollection()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L184 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcontent": "ComboboxContent()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L87 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxempty": "ComboboxEmpty()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L190 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxgroup": "ComboboxGroup()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L161 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxinput": "ComboboxInput()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L52 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxitem": "ComboboxItem()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L135 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxlabel": "ComboboxLabel()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L171 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxlist": "ComboboxList()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L121 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxseparator": "ComboboxSeparator()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L203 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxtrigger": "ComboboxTrigger" | kind=code-symbol | source=src/components/ui/combobox.tsx:L22 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxvalue": "ComboboxValue()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L18 | neighbors=[combobox.tsx]
- "ui_combobox_usecomboboxanchor": "useComboboxAnchor()" | kind=code-symbol | source=src/components/ui/combobox.tsx:L277 | neighbors=[combobox.tsx]
- "ui_command_command": "Command()" | kind=code-symbol | source=src/components/ui/command.tsx:L18 | neighbors=[command.tsx]
- "ui_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=src/components/ui/command.tsx:L168 | neighbors=[command.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-034.json

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
