# Node Description Batch 15 of 38

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

- "production_orders_types_reconcileinput": "ReconcileInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L206 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_stageprogressinput": "StageProgressInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L400 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_transferrollsinput": "TransferRollsInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L407 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_woven_types_weavinginput": "WeavingInput" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L135 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovencuttinginput": "WovenCuttingInput" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L141 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenoverview": "WovenOverview" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L91 | neighbors=[index.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenpackaginginput": "WovenPackagingInput" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L147 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_runs_types_logproductionruninput": "LogProductionRunInput" | kind=code-symbol | source=src/features/production-runs/types.ts:L72 | neighbors=[use-production-runs.ts, types.ts, production-run-service.ts]
- "production_runs_types_productionrun": "ProductionRun" | kind=code-symbol | source=src/features/production-runs/types.ts:L30 | neighbors=[ProductionHistoryTable.tsx, types.ts, production-run-service.ts]
- "production_runs_types_productionsummary": "ProductionSummary" | kind=code-symbol | source=src/features/production-runs/types.ts:L61 | neighbors=[ProductionSummaryCard.tsx, types.ts, production-run-service.ts]
- "production_runs_types_run_reason_labels": "RUN_REASON_LABELS" | kind=code-symbol | source=src/features/production-runs/types.ts:L20 | neighbors=[LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, types.ts]
- "purchases_types_purchaseinput": "PurchaseInput" | kind=code-symbol | source=src/features/purchases/types.ts:L31 | neighbors=[use-purchases.ts, types.ts, purchase-service.ts]
- "schemas_entity_schemas_designations": "DESIGNATIONS" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L4 | neighbors=[operator-table.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_entity_statuses": "ENTITY_STATUSES" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L6 | neighbors=[MachineDialog.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_machine_types": "MACHINE_TYPES" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L3 | neighbors=[machine-table.tsx, MachineDialog.tsx, entity-schemas.ts]
- "services_batch_service_batchservice": "batchService" | kind=code-symbol | source=src/features/production-orders/services/batch-service.ts:L22 | neighbors=[use-batches.ts, batch-service.ts, batch-service.test.ts]
- "services_label_type_service_labeltypeservice": "labelTypeService" | kind=code-symbol | source=src/features/label-types/services/label-type-service.ts:L4 | neighbors=[use-label-types.ts, index.ts, label-type-service.ts]
- "shared_navigation_navigation": "navigation" | kind=code-symbol | source=src/shared/navigation.ts:L26 | neighbors=[CommandPalette.tsx, navigation.ts, AppSidebar.tsx]
- "src_vite_env_d": "vite-env.d.ts" | kind=code-symbol | source=src/vite-env.d.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, ImportMeta, ImportMetaEnv]
- "store_table_visibility_store_empty_column_visibility": "EMPTY_COLUMN_VISIBILITY" | kind=code-symbol | source=src/store/table-visibility-store.ts:L29 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts]
- "store_table_visibility_store_sanitizecolumnvisibility": "sanitizeColumnVisibility()" | kind=code-symbol | source=src/store/table-visibility-store.ts:L47 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts]
- "thread_dyeing_types_receivedyeinginput": "ReceiveDyeingInput" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L74 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_senddyeinginput": "SendDyeingInput" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L64 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_serviceproviderinput": "ServiceProviderInput" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L81 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts, types.ts]
- "thread_types_dyebatch": "DyeBatch" | kind=code-symbol | source=src/features/thread/types.ts:L98 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_dyebatchinput": "DyeBatchInput" | kind=code-symbol | source=src/features/thread/types.ts:L112 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadpurchase": "ThreadPurchase" | kind=code-symbol | source=src/features/thread/types.ts:L71 | neighbors=[thread-service.ts, index.ts, types.ts]
- "thread_types_threadpurchaseinput": "ThreadPurchaseInput" | kind=code-symbol | source=src/features/thread/types.ts:L87 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "thread_types_threadstockinput": "ThreadStockInput" | kind=code-symbol | source=src/features/thread/types.ts:L123 | neighbors=[use-thread.ts, thread-service.ts, types.ts]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L6 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L39 | neighbors=[OperatorAvatar.tsx, nav-user.tsx, avatar.tsx]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=src/components/ui/card.tsx:L49 | neighbors=[AppCard.tsx, ProductionTrendChart.tsx, card.tsx]
- "ui_chart_charttooltipcontent": "ChartTooltipContent()" | kind=code-symbol | source=src/components/ui/chart.tsx:L119 | neighbors=[ProductionTrendChart.tsx, chart.tsx, useChart()]
- "ui_chart_usechart": "useChart()" | kind=code-symbol | source=src/components/ui/chart.tsx:L32 | neighbors=[chart.tsx, ChartLegendContent(), ChartTooltipContent()]
- "ui_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L8 | neighbors=[label-type-columns.tsx, data-table.tsx, checkbox.tsx]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L8 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L40 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L125 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L75 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L112 | neighbors=[AppDialog.tsx, command.tsx, dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-014.json

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
