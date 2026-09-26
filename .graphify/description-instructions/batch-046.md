# Node Description Batch 47 of 53

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

- "tables_inventory_roll_movements_table_inventoryrollmovements": "inventoryRollMovements" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L27 | neighbors=[inventory-roll-movements.table.ts]
- "tables_inventory_roll_movements_table_rollmovementtypeenum": "rollMovementTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L9 | neighbors=[inventory-roll-movements.table.ts]
- "tables_inventory_rolls_table_inventoryrolls": "inventoryRolls" | kind=code-symbol | source=server/src/shared/db/tables/inventory-rolls.table.ts:L4 | neighbors=[inventory-rolls.table.ts]
- "tables_label_sheets_table_labelsheets": "labelSheets" | kind=code-symbol | source=server/src/shared/db/tables/label-sheets.table.ts:L7 | neighbors=[label-sheets.table.ts]
- "tables_local_sheets_table_localsheets": "localSheets" | kind=code-symbol | source=server/src/shared/db/tables/local-sheets.table.ts:L7 | neighbors=[local-sheets.table.ts]
- "tables_machines_table_machines": "machines" | kind=code-symbol | source=server/src/shared/db/tables/machines.table.ts:L5 | neighbors=[machines.table.ts]
- "tables_materials_table_materials": "materials" | kind=code-symbol | source=server/src/shared/db/tables/materials.table.ts:L3 | neighbors=[materials.table.ts]
- "tables_operator_type_enum_operatortypeenum": "operatorTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/operator-type.enum.ts:L10 | neighbors=[operator-type.enum.ts]
- "tables_operators_table_operators": "operators" | kind=code-symbol | source=server/src/shared/db/tables/operators.table.ts:L5 | neighbors=[operators.table.ts]
- "tables_product_type_enum_producttypeenum": "productTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/product-type.enum.ts:L12 | neighbors=[product-type.enum.ts]
- "tables_production_batches_table_productionbatches": "productionBatches" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L63 | neighbors=[production-batches.table.ts]
- "tables_production_batches_table_productionbatchstageenum": "productionBatchStageEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L24 | neighbors=[production-batches.table.ts]
- "tables_production_batches_table_productionbatchstatusenum": "productionBatchStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L38 | neighbors=[production-batches.table.ts]
- "tables_production_order_lines_table_productionorderlines": "productionOrderLines" | kind=code-symbol | source=server/src/shared/db/tables/production-order-lines.table.ts:L21 | neighbors=[production-order-lines.table.ts]
- "tables_production_orders_table_productionorders": "productionOrders" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L28 | neighbors=[production-orders.table.ts]
- "tables_production_orders_table_productionorderstatusenum": "productionOrderStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L11 | neighbors=[production-orders.table.ts]
- "tables_production_roll_issuances_table_productionrollissuances": "productionRollIssuances" | kind=code-symbol | source=server/src/shared/db/tables/production-roll-issuances.table.ts:L13 | neighbors=[production-roll-issuances.table.ts]
- "tables_production_run_reason_enum_productionrunreasonenum": "productionRunReasonEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-run-reason.enum.ts:L8 | neighbors=[production-run-reason.enum.ts]
- "tables_production_runs_table_productionruns": "productionRuns" | kind=code-symbol | source=server/src/shared/db/tables/production-runs.table.ts:L18 | neighbors=[production-runs.table.ts]
- "tables_production_stage_events_table_productioneventtypeenum": "productionEventTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-events.table.ts:L5 | neighbors=[production-stage-events.table.ts]
- "tables_production_stage_events_table_productionstageevents": "productionStageEvents" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-events.table.ts:L20 | neighbors=[production-stage-events.table.ts]
- "tables_production_stage_transactions_table_productionstagetransactions": "productionStageTransactions" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-transactions.table.ts:L34 | neighbors=[production-stage-transactions.table.ts]
- "tables_production_stage_transactions_table_productionstagetxtypeenum": "productionStageTxTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-transactions.table.ts:L11 | neighbors=[production-stage-transactions.table.ts]
- "tables_production_status_enum_productionstatusenum": "productionStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-status.enum.ts:L7 | neighbors=[production-status.enum.ts]
- "tables_purchase_record_table_purchaserecords": "purchaseRecords" | kind=code-symbol | source=server/src/shared/db/tables/purchase-record.table.ts:L4 | neighbors=[purchase-record.table.ts]
- "tables_sticker_materials_table_stickermaterials": "stickerMaterials" | kind=code-symbol | source=server/src/shared/db/tables/sticker-materials.table.ts:L7 | neighbors=[sticker-materials.table.ts]
- "tables_thread_dye_batches_table_threaddyebatches": "threadDyeBatches" | kind=code-symbol | source=server/src/shared/db/tables/thread-dye-batches.table.ts:L16 | neighbors=[thread-dye-batches.table.ts]
- "tables_thread_dyeing_workflow_table_threaddyeingallocations": "threadDyeingAllocations" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L44 | neighbors=[thread-dyeing-workflow.table.ts]
- "tables_thread_dyeing_workflow_table_threaddyeingreceives": "threadDyeingReceives" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L70 | neighbors=[thread-dyeing-workflow.table.ts]
- "tables_thread_dyeing_workflow_table_threaddyeingsends": "threadDyeingSends" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L17 | neighbors=[thread-dyeing-workflow.table.ts]
- "tables_thread_dyeing_workflow_table_threaddyeingsendstatusenum": "threadDyeingSendStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L6 | neighbors=[thread-dyeing-workflow.table.ts]
- "tables_thread_enums_threadbasecolorenum": "threadBaseColorEnum" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L7 | neighbors=[thread.enums.ts]
- "tables_thread_enums_threaddenierenum": "threadDenierEnum" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L4 | neighbors=[thread.enums.ts]
- "tables_thread_enums_threadmovementtypeenum": "threadMovementTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L20 | neighbors=[thread.enums.ts]
- "tables_thread_enums_threadstocktypeenum": "threadStockTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L14 | neighbors=[thread.enums.ts]
- "tables_thread_purchases_table_threadpurchases": "threadPurchases" | kind=code-symbol | source=server/src/shared/db/tables/thread-purchases.table.ts:L12 | neighbors=[thread-purchases.table.ts]
- "tables_thread_service_providers_table_threadserviceproviders": "threadServiceProviders" | kind=code-symbol | source=server/src/shared/db/tables/thread-service-providers.table.ts:L7 | neighbors=[thread-service-providers.table.ts]
- "tables_thread_stock_movements_table_threadstockmovements": "threadStockMovements" | kind=code-symbol | source=server/src/shared/db/tables/thread-stock-movements.table.ts:L19 | neighbors=[thread-stock-movements.table.ts]
- "tables_thread_stocks_table_threadstocks": "threadStocks" | kind=code-symbol | source=server/src/shared/db/tables/thread-stocks.table.ts:L17 | neighbors=[thread-stocks.table.ts]
- "tables_users_table_userroleenum": "userRoleEnum" | kind=code-symbol | source=server/src/shared/db/tables/users.table.ts:L7 | neighbors=[users.table.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-046.json

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
