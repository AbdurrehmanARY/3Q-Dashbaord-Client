# Node Description Batch 18 of 53

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

- "production_orders_types_productionorderdetail": "ProductionOrderDetail" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L104 | neighbors=[types.ts, ProductionOrder, production-order-service.ts]
- "production_orders_types_productionorderstatus": "ProductionOrderStatus" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L1 | neighbors=[ProductionStatusBadge.tsx, use-completion-celebration.ts, types.ts]
- "production_orders_types_productionstage": "ProductionStage" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L8 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_producttype": "ProductType" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L4 | neighbors=[PlanLabelTypeDialog.tsx, ProductionOrderPlanningPage.tsx, types.ts]
- "production_orders_types_reconcileinput": "ReconcileInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L206 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_stageprogressinput": "StageProgressInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L400 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_transferrollsinput": "TransferRollsInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L407 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_woven_types_weavinginput": "WeavingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L110 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovencuttinginput": "WovenCuttingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L116 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenoverview": "WovenOverview" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L68 | neighbors=[index.ts, woven-types.ts, woven-production-service.ts]
- "production_orders_woven_types_wovenpackaginginput": "WovenPackagingInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L122 | neighbors=[use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "production_runs_types_logproductionruninput": "LogProductionRunInput" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L72 | neighbors=[use-production-runs.ts, types.ts, production-run-service.ts]
- "production_runs_types_productionrun": "ProductionRun" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L30 | neighbors=[ProductionHistoryTable.tsx, types.ts, production-run-service.ts]
- "production_runs_types_productionsummary": "ProductionSummary" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L61 | neighbors=[ProductionSummaryCard.tsx, types.ts, production-run-service.ts]
- "production_runs_types_run_reason_labels": "RUN_REASON_LABELS" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L20 | neighbors=[LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, types.ts]
- "purchases_types_purchaseinput": "PurchaseInput" | kind=code-symbol | source=client/src/features/purchases/types.ts:L31 | neighbors=[use-purchases.ts, types.ts, purchase-service.ts]
- "schemas_entity_schemas_designations": "DESIGNATIONS" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L4 | neighbors=[operator-table.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_entity_statuses": "ENTITY_STATUSES" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L6 | neighbors=[MachineDialog.tsx, OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_machine_types": "MACHINE_TYPES" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L3 | neighbors=[machine-table.tsx, MachineDialog.tsx, entity-schemas.ts]
- "server_drizzle_config": "drizzle.config.ts" | kind=code-symbol | source=server/drizzle.config.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…]
- "server_seed_master_round4": "round4()" | kind=code-symbol | source=server/seed-master.ts:L28 | neighbors=[seed-master.ts, fillWeights(), seedStock()]
- "server_seed_master_seedmaterials": "seedMaterials()" | kind=code-symbol | source=server/seed-master.ts:L71 | neighbors=[seed-master.ts, main(), fillWeights()]
- "server_seed_master_seedstock": "seedStock()" | kind=code-symbol | source=server/seed-master.ts:L282 | neighbors=[seed-master.ts, main(), round4()]
- "server_vitest_config": "vitest.config.ts" | kind=code-symbol | source=server/vitest.config.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, resolvePath()]
- "shared_navigation_navigation": "navigation" | kind=code-symbol | source=client/src/shared/navigation.ts:L24 | neighbors=[CommandPalette.tsx, navigation.ts, AppSidebar.tsx]
- "src_vite_env_d": "vite-env.d.ts" | kind=code-symbol | source=client/src/vite-env.d.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ImportMeta, ImportMetaEnv]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-017.json

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
