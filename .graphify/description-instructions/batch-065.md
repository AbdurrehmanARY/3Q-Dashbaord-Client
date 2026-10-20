# Node Description Batch 66 of 74

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
- "tables_users_table_users": "users" | kind=code-symbol | source=server/src/shared/db/tables/users.table.ts:L18 | neighbors=[users.table.ts]
- "tables_work_orders_table_workorders": "workOrders" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L28 | neighbors=[work-orders.table.ts]
- "tables_work_orders_table_workorderstatusenum": "workOrderStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L15 | neighbors=[work-orders.table.ts]
- "tables_woven_production_lines_table_wovenproductionlines": "wovenProductionLines" | kind=code-symbol | source=server/src/shared/db/tables/woven-production-lines.table.ts:L22 | neighbors=[woven-production-lines.table.ts]
- "tables_woven_thread_plan_items_table_woventhreadplanitems": "wovenThreadPlanItems" | kind=code-symbol | source=server/src/shared/db/tables/woven-thread-plan-items.table.ts:L19 | neighbors=[woven-thread-plan-items.table.ts]
- "tables_woven_work_order_details_table_wovenworkorderdetails": "wovenWorkOrderDetails" | kind=code-symbol | source=server/src/shared/db/tables/woven-work-order-details.table.ts:L15 | neighbors=[woven-work-order-details.table.ts]
- "test_setup": "setup.ts" | kind=code-symbol | source=client/src/test/setup.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "tests_architecture_test_allowed_cross_module_repo_edges": "ALLOWED_CROSS_MODULE_REPO_EDGES" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L20 | neighbors=[architecture.test.ts]
- "tests_architecture_test_files": "files" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L71 | neighbors=[architecture.test.ts]
- "tests_architecture_test_graph": "graph" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L74 | neighbors=[architecture.test.ts]
- "tests_architecture_test_rel": "rel()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L37 | neighbors=[architecture.test.ts]
- "tests_architecture_test_resolve": "resolve()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L40 | neighbors=[architecture.test.ts]
- "tests_architecture_test_root": "ROOT" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L16 | neighbors=[architecture.test.ts]
- "tests_architecture_test_specifiers": "specifiers()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L59 | neighbors=[architecture.test.ts]
- "tests_architecture_test_src": "SRC" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L17 | neighbors=[architecture.test.ts]
- "tests_architecture_test_walkts": "walkTs()" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L24 | neighbors=[architecture.test.ts]
- "thread_dyeing_thread_dyeing_controller_threaddyeingcontroller": "ThreadDyeingController" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.controller.ts:L5 | neighbors=[thread-dyeing.controller.ts]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_findallocationsforsends": ".findAllocationsForSends()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L33 | neighbors=[ThreadDyeingRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-065.json

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
