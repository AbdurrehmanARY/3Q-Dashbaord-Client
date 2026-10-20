# Node Description Batch 25 of 74

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

- "production_runs_types_run_reason_labels": "RUN_REASON_LABELS" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L20 | neighbors=[LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, types.ts]
- "purchases_types_purchaseinput": "PurchaseInput" | kind=code-symbol | source=client/src/features/purchases/types.ts:L31 | neighbors=[use-purchases.ts, types.ts, purchase-service.ts]
- "schemas_entity_schemas_designations": "DESIGNATIONS" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L4 | neighbors=[operator-table.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_entity_statuses": "ENTITY_STATUSES" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L6 | neighbors=[MachineDialog.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_machine_types": "MACHINE_TYPES" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L3 | neighbors=[machine-table.tsx, MachineDialog.tsx, entity-schemas.ts]
- "scripts_reorganize_modules_isimportspec": "isImportSpec()" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L95 | neighbors=[reorganize-modules.mjs, stripTrailingWs(), rewritten()]
- "scripts_reorganize_modules_rewritten": "rewritten()" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L133 | neighbors=[reorganize-modules.mjs, isImportSpec(), resolveTarget()]
- "scripts_verify_estimated_weaving": "verify-estimated-weaving.mjs" | kind=code-symbol | source=server/scripts/verify-estimated-weaving.mjs:L1 | neighbors=[2e755d6 feat(server): persist estimated…, serverDir, sql]
- "server_drizzle_config": "drizzle.config.ts" | kind=code-symbol | source=server/drizzle.config.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…]
- "services_batch_service_batchservice": "batchService" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.ts:L22 | neighbors=[use-batches.ts, batch-service.ts, batch-service.test.ts]
- "shared_navigation_navigation": "navigation" | kind=code-symbol | source=client/src/shared/navigation.ts:L25 | neighbors=[CommandPalette.tsx, navigation.ts, AppSidebar.tsx]
- "src_vite_env_d": "vite-env.d.ts" | kind=code-symbol | source=client/src/vite-env.d.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ImportMeta, ImportMetaEnv]
- "store_table_visibility_store_empty_column_visibility": "EMPTY_COLUMN_VISIBILITY" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L29 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts]
- "store_table_visibility_store_sanitizecolumnvisibility": "sanitizeColumnVisibility()" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L47 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts]
- "tables_brands_table": "brands.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/brands.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, brands, c0c79ec Initial commit: Label Manufactu…]
- "tables_companies_table": "companies.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/companies.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, companies, c0c79ec Initial commit: Label Manufactu…]
- "tables_ink_consumptions_table": "ink-consumptions.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/ink-consumptions.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, inkConsumptions, 9b99ce1 feat: complete production workf…]
- "tables_ink_purchases_table": "ink-purchases.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/ink-purchases.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, inkPurchases, 9b99ce1 feat: complete production workf…]
- "tables_inventory_rolls_table": "inventory-rolls.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/inventory-rolls.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, inventoryRolls, c0c79ec Initial commit: Label Manufactu…]
- "tables_label_sheets_table": "label-sheets.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/label-sheets.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, labelSheets, 9b99ce1 feat: complete production workf…]
- "tables_local_sheets_table": "local-sheets.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/local-sheets.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, localSheets, 9b99ce1 feat: complete production workf…]
- "tables_materials_table": "materials.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/materials.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, materials, c0c79ec Initial commit: Label Manufactu…]
- "tables_operator_type_enum": "operator-type.enum.ts" | kind=code-symbol | source=server/src/shared/db/tables/operator-type.enum.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, operatorTypeEnum, c27dc7d feat(server): stock CRUD histor…]
- "tables_product_type_enum": "product-type.enum.ts" | kind=code-symbol | source=server/src/shared/db/tables/product-type.enum.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productTypeEnum, f5f1f47 feat: woven labels foundation —…]
- "tables_production_roll_issuances_table": "production-roll-issuances.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-roll-issuances.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionRollIssuances, c0c79ec Initial commit: Label Manufactu…]
- "tables_production_run_reason_enum": "production-run-reason.enum.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-run-reason.enum.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionRunReasonEnum, 9b99ce1 feat: complete production workf…]
- "tables_production_runs_table": "production-runs.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-runs.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionRuns, 9b99ce1 feat: complete production workf…]
- "tables_production_stage_transactions_table": "production-stage-transactions.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-transactions.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionStageTransactions, productionStageTxTypeEnum]
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
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_movestocktx": ".moveStockTx()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L229 | neighbors=[ThreadInventoryRepository, .consumeForPlanTx(), .releaseForPlanTx()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-024.json

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
