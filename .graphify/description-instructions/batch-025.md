# Node Description Batch 26 of 74

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

- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice_getone": ".getOne()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L13 | neighbors=[ThreadServiceProviderService, .remove(), .update()]
- "thread_types_dyebatch": "DyeBatch" | kind=code-symbol | source=client/src/features/thread/types.ts:L98 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_dyebatchinput": "DyeBatchInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L112 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadpurchase": "ThreadPurchase" | kind=code-symbol | source=client/src/features/thread/types.ts:L71 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_threadpurchaseinput": "ThreadPurchaseInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L87 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadstockinput": "ThreadStockInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L123 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "tox_runenv": "runEnv()" | kind=code-symbol | source=tox.mjs:L99 | neighbors=[tox.mjs, main(), heading()]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L6 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L39 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=client/src/components/ui/badge.tsx:L30 | neighbors=[BatchStageBoard.tsx, badge.tsx, badgeVariants]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L49 | neighbors=[AppCard.tsx, ProductionTrendChart.tsx, card.tsx]
- "ui_chart_charttooltipcontent": "ChartTooltipContent()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L119 | neighbors=[ProductionTrendChart.tsx, chart.tsx, useChart()]
- "ui_chart_usechart": "useChart()" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L32 | neighbors=[chart.tsx, ChartLegendContent(), ChartTooltipContent()]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L8 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L40 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L125 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L75 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L112 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L146 | neighbors=[EditableLabelTypeTable.tsx, data-table-view-options.tsx, dropdown-menu.tsx]
- "ui_empty_emptymedia": "EmptyMedia()" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L43 | neighbors=[data-table-empty.tsx, empty.tsx, emptyMediaVariants]
- "ui_input_group_inputgroup": "InputGroup()" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L11 | neighbors=[combobox.tsx, command.tsx, input-group.tsx]
- "ui_sidebar_sidebar": "Sidebar()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L152 | neighbors=[AppSidebar.tsx, sidebar.tsx, useSidebar()]
- "ui_sidebar_sidebarrail": "SidebarRail()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L283 | neighbors=[AppSidebar.tsx, sidebar.tsx, useSidebar()]
- "ui_sidebar_sidebartrigger": "SidebarTrigger()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L257 | neighbors=[AppHeader.tsx, sidebar.tsx, useSidebar()]
- "ui_tabs_tabs": "Tabs()" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L17 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_tabs_tabscontent": "TabsContent()" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L81 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger()" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L65 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx]
- "ui_toggle_togglevariants": "toggleVariants" | kind=code-symbol | source=client/src/components/ui/toggle.tsx:L6 | neighbors=[toggle.tsx, toggle-group.tsx, Toggle()]
- "ui_tooltip_tooltipprovider": "TooltipProvider()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L7 | neighbors=[AppLayout.tsx, LayoutProvider.tsx, tooltip.tsx]
- "utils_line_draft_cascadedraft": "cascadeDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L47 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_line_draft_difflinedraft": "diffLineDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L68 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_line_draft_validatelinedraft": "validateLineDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L91 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts, line-draft.test.ts]
- "utils_planning_dialog_resolveplanningdefaultquantity": "resolvePlanningDefaultQuantity()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.ts:L46 | neighbors=[PlanLabelTypeDialog.tsx, planning-dialog.ts, planning-dialog.test.ts]
- "utils_planning_dialog_resolveplanningsubmittarget": "resolvePlanningSubmitTarget()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.ts:L22 | neighbors=[PlanLabelTypeDialog.tsx, planning-dialog.ts, planning-dialog.test.ts]
- "utils_planning_rows_cumulativestockissues": "cumulativeStockIssues()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L63 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_duplicaterowindexes": "duplicateRowIndexes()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L31 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_sizeplantotal": "sizePlanTotal()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L83 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_planning_rows_totalplannedquantity": "totalPlannedQuantity()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L18 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, planning-rows.test.ts]
- "utils_weaving_time_test": "weaving-time.test.ts" | kind=code-symbol | source=client/src/features/work-orders/utils/weaving-time.test.ts:L1 | neighbors=[c401a21 feat(client): weaving-time disp…, weaving-time.ts, estimateWeavingHours()]
- "work_orders_types_dispatchinput": "DispatchInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L151 | neighbors=[use-work-orders.ts, work-order-service.ts, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-025.json

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
