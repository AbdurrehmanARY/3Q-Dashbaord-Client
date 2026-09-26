# Node Description Batch 46 of 53

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

- "schemas_production_order_schemas_transferrollsschemainput": "TransferRollsSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L74 | neighbors=[production-order-schemas.ts]
- "schemas_work_order_schemas_workorderschema": "workOrderSchema" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L12 | neighbors=[work-order-schemas.ts]
- "scripts_migrate_modules_all": "ALL" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L3 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_argv": "argv" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L1 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_dry": "DRY" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L2 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_requested": "requested" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L4 | neighbors=[migrate-modules.mjs]
- "scripts_verify_migration_files": "files" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L56 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_findings": "findings" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L57 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_gone_aliases": "GONE_ALIASES" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L26 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_gone_dir_re": "GONE_DIR_RE" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L32 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_gone_layer_dirs": "GONE_LAYER_DIRS" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L19 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_required": "required" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L73 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_specifiers": "specifiers()" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L46 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_src": "SRC" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L16 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_staledirs": "staleDirs" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L79 | neighbors=[verify-migration.mjs]
- "scripts_verify_migration_walk": "walk()" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L36 | neighbors=[verify-migration.mjs]
- "segmented_tabs_segmentedtabs_segmentedtabsprops": "SegmentedTabsProps" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/SegmentedTabs.tsx:L10 | neighbors=[SegmentedTabs.tsx]
- "server_eslint_config": "eslint.config.js" | kind=code-symbol | source=server/eslint.config.js:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "server_seed_master_machine_takeovers": "MACHINE_TAKEOVERS" | kind=code-symbol | source=server/seed-master.ts:L125 | neighbors=[seed-master.ts]
- "server_seed_master_stocked": "STOCKED" | kind=code-symbol | source=server/seed-master.ts:L263 | neighbors=[seed-master.ts]
- "server_tsup_config": "tsup.config.ts" | kind=code-symbol | source=server/tsup.config.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "server_vitest_config_resolvepath": "resolvePath()" | kind=code-symbol | source=server/vitest.config.ts:L4 | neighbors=[vitest.config.ts]
- "services_inventory_service_rollmovement": "RollMovement" | kind=code-symbol | source=client/src/features/inventory/services/inventory-service.ts:L6 | neighbors=[inventory-service.ts]
- "services_mail_service_productionorderemaildata": "ProductionOrderEmailData" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L4 | neighbors=[mail.service.ts]
- "services_material_receipts_service_base": "base()" | kind=code-symbol | source=client/src/features/materials/services/material-receipts-service.ts:L4 | neighbors=[material-receipts-service.ts]
- "sidebar_nav_main_isrouteactive": "isRouteActive()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L24 | neighbors=[nav-main.tsx]
- "sidebar_nav_main_navgroupitem": "NavGroupItem()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L61 | neighbors=[nav-main.tsx]
- "src_app_apirouter": "apiRouter" | kind=code-symbol | source=server/src/app.ts:L66 | neighbors=[app.ts]
- "src_app_app": "app" | kind=code-symbol | source=server/src/app.ts:L33 | neighbors=[app.ts]
- "src_app_indexrouter": "indexRouter" | kind=code-symbol | source=server/src/app.ts:L71 | neighbors=[app.ts]
- "src_index_server": "server" | kind=code-symbol | source=server/src/index.ts:L15 | neighbors=[index.ts]
- "src_vite_env_d_importmeta": "ImportMeta" | kind=code-symbol | source=client/src/vite-env.d.ts:L9 | neighbors=[vite-env.d.ts]
- "src_vite_env_d_importmetaenv": "ImportMetaEnv" | kind=code-symbol | source=client/src/vite-env.d.ts:L3 | neighbors=[vite-env.d.ts]
- "store_ui_store_theme": "Theme" | kind=code-symbol | source=client/src/store/ui-store.ts:L3 | neighbors=[ui-store.ts]
- "store_ui_store_uistate": "UiState" | kind=code-symbol | source=client/src/store/ui-store.ts:L5 | neighbors=[ui-store.ts]
- "tables_batch_consumptions_table_batchconsumptions": "batchConsumptions" | kind=code-symbol | source=server/src/shared/db/tables/batch-consumptions.table.ts:L39 | neighbors=[batch-consumptions.table.ts]
- "tables_brands_table_brands": "brands" | kind=code-symbol | source=server/src/shared/db/tables/brands.table.ts:L4 | neighbors=[brands.table.ts]
- "tables_companies_table_companies": "companies" | kind=code-symbol | source=server/src/shared/db/tables/companies.table.ts:L3 | neighbors=[companies.table.ts]
- "tables_ink_consumptions_table_inkconsumptions": "inkConsumptions" | kind=code-symbol | source=server/src/shared/db/tables/ink-consumptions.table.ts:L9 | neighbors=[ink-consumptions.table.ts]
- "tables_ink_purchases_table_inkpurchases": "inkPurchases" | kind=code-symbol | source=server/src/shared/db/tables/ink-purchases.table.ts:L11 | neighbors=[ink-purchases.table.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-045.json

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
