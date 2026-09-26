# Node Description Batch 19 of 53

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

- "tables_production_status_enum": "production-status.enum.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-status.enum.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionStatusEnum, c0c79ec Initial commit: Label Manufactu…]
- "tables_purchase_record_table": "purchase-record.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/purchase-record.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, purchaseRecords, c0c79ec Initial commit: Label Manufactu…]
- "tables_sticker_materials_table": "sticker-materials.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/sticker-materials.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, stickerMaterials, 9b99ce1 feat: complete production workf…]
- "tables_thread_dye_batches_table": "thread-dye-batches.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-dye-batches.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadDyeBatches, f5f1f47 feat: woven labels foundation —…]
- "tables_thread_purchases_table": "thread-purchases.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-purchases.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadPurchases, f5f1f47 feat: woven labels foundation —…]
- "tables_thread_service_providers_table": "thread-service-providers.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-service-providers.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadServiceProviders, 9b99ce1 feat: complete production workf…]
- "tables_thread_stock_movements_table": "thread-stock-movements.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-stock-movements.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadStockMovements, f5f1f47 feat: woven labels foundation —…]
- "tables_thread_stocks_table": "thread-stocks.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-stocks.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadStocks, f5f1f47 feat: woven labels foundation —…]
- "thread_dyeing_types_receivedyeinginput": "ReceiveDyeingInput" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L74 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_senddyeinginput": "SendDyeingInput" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L64 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_serviceproviderinput": "ServiceProviderInput" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L81 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_types_dyebatch": "DyeBatch" | kind=code-symbol | source=client/src/features/thread/types.ts:L98 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_dyebatchinput": "DyeBatchInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L112 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadpurchase": "ThreadPurchase" | kind=code-symbol | source=client/src/features/thread/types.ts:L71 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_threadpurchaseinput": "ThreadPurchaseInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L87 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadstockinput": "ThreadStockInput" | kind=code-symbol | source=client/src/features/thread/types.ts:L123 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L6 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L39 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-018.json

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
