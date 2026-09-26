# Node Description Batch 36 of 53

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

- "data_table_data_table_datatableactionbar": "DataTableActionBar()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L499 | neighbors=[data-table.tsx]
- "data_table_data_table_empty_datatableemptyprops": "DataTableEmptyProps" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-empty.tsx:L10 | neighbors=[data-table-empty.tsx]
- "data_table_data_table_pagination_datatablepaginationprops": "DataTablePaginationProps" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L19 | neighbors=[data-table-pagination.tsx]
- "data_table_data_table_pinclass": "pinClass()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L81 | neighbors=[data-table.tsx]
- "data_table_data_table_pinstyle": "pinStyle()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L72 | neighbors=[data-table.tsx]
- "data_table_data_table_resolvecolumnid": "resolveColumnId()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L93 | neighbors=[data-table.tsx]
- "data_table_data_table_skeleton_datatableskeletonprops": "DataTableSkeletonProps" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-skeleton.tsx:L4 | neighbors=[data-table-skeleton.tsx]
- "data_table_data_table_tanstackcolumnid": "tanstackColumnId()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L104 | neighbors=[data-table.tsx]
- "data_table_data_table_toolbar_datatabletoolbarprops": "DataTableToolbarProps" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-toolbar.tsx:L7 | neighbors=[data-table-toolbar.tsx]
- "data_table_data_table_view_options_columnlabel": "columnLabel()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-view-options.tsx:L15 | neighbors=[data-table-view-options.tsx]
- "data_table_editable_cell_editablecellclass": "editableCellClass" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L78 | neighbors=[editable-cell.tsx]
- "data_table_editable_cell_editablecellinputprops": "EditableCellInputProps" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L85 | neighbors=[editable-cell.tsx]
- "data_table_types_columnmeta": "ColumnMeta" | kind=code-symbol | source=client/src/shared/components/data-table/types.ts:L30 | neighbors=[types.ts]
- "data_table_types_tablemeta": "TableMeta" | kind=code-symbol | source=client/src/shared/components/data-table/types.ts:L15 | neighbors=[types.ts]
- "db_apply_migration_client": "client" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L73 | neighbors=[apply-migration.ts]
- "db_apply_migration_dirname": "__dirname" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L21 | neighbors=[apply-migration.ts]
- "db_apply_migration_filename": "__filename" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L20 | neighbors=[apply-migration.ts]
- "db_apply_migration_files": "files" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L45 | neighbors=[apply-migration.ts]
- "db_apply_migration_maskedurl": "maskedUrl" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L58 | neighbors=[apply-migration.ts]
- "db_apply_migration_migrationdir": "migrationDir" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L38 | neighbors=[apply-migration.ts]
- "db_apply_migration_raw": "raw" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L62 | neighbors=[apply-migration.ts]
- "db_apply_migration_sqlpath": "sqlPath" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L56 | neighbors=[apply-migration.ts]
- "db_apply_migration_statements": "statements" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L66 | neighbors=[apply-migration.ts]
- "db_check_columns_sql": "sql" | kind=code-symbol | source=server/src/shared/db/check-columns.ts:L4 | neighbors=[check-columns.ts]
- "db_clear_all_tables_clearall": "clearAll()" | kind=code-symbol | source=server/src/shared/db/clear-all-tables.ts:L4 | neighbors=[clear-all-tables.ts]
- "db_index_database": "Database" | kind=code-symbol | source=server/src/shared/db/index.ts:L5 | neighbors=[index.ts]
- "db_migrate_production_runs_migrateproductionruns": "migrateProductionRuns()" | kind=code-symbol | source=server/src/shared/db/migrate-production-runs.ts:L15 | neighbors=[migrate-production-runs.ts]
- "db_reset_production_reset": "reset()" | kind=code-symbol | source=server/src/shared/db/reset-production.ts:L25 | neighbors=[reset-production.ts]
- "db_schema_batchconsumption": "BatchConsumption" | kind=code-symbol | source=server/src/shared/db/schema.ts:L106 | neighbors=[schema.ts]
- "db_schema_inkconsumption": "InkConsumption" | kind=code-symbol | source=server/src/shared/db/schema.ts:L120 | neighbors=[schema.ts]
- "db_schema_inkpurchase": "InkPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L118 | neighbors=[schema.ts]
- "db_schema_inventoryrollmovement": "InventoryRollMovement" | kind=code-symbol | source=server/src/shared/db/schema.ts:L116 | neighbors=[schema.ts]
- "db_schema_labelsheet": "LabelSheet" | kind=code-symbol | source=server/src/shared/db/schema.ts:L150 | neighbors=[schema.ts]
- "db_schema_localsheet": "LocalSheet" | kind=code-symbol | source=server/src/shared/db/schema.ts:L148 | neighbors=[schema.ts]
- "db_schema_newbatchconsumption": "NewBatchConsumption" | kind=code-symbol | source=server/src/shared/db/schema.ts:L107 | neighbors=[schema.ts]
- "db_schema_newbrand": "NewBrand" | kind=code-symbol | source=server/src/shared/db/schema.ts:L87 | neighbors=[schema.ts]
- "db_schema_newcompany": "NewCompany" | kind=code-symbol | source=server/src/shared/db/schema.ts:L85 | neighbors=[schema.ts]
- "db_schema_newinventoryroll": "NewInventoryRoll" | kind=code-symbol | source=server/src/shared/db/schema.ts:L115 | neighbors=[schema.ts]
- "db_schema_newinventoryrollmovement": "NewInventoryRollMovement" | kind=code-symbol | source=server/src/shared/db/schema.ts:L117 | neighbors=[schema.ts]
- "db_schema_newlabelsheet": "NewLabelSheet" | kind=code-symbol | source=server/src/shared/db/schema.ts:L151 | neighbors=[schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-035.json

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
