# Node Description Batch 22 of 53

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

- "components_woventrackingtable_woventrackingtable": "WovenTrackingTable()" | kind=code-symbol | source=client/src/features/production-orders/components/WovenTrackingTable.tsx:L14 | neighbors=[WovenProductionPanel.tsx, WovenTrackingTable.tsx]
- "config_database_databaseconfig": "databaseConfig" | kind=code-symbol | source=server/src/shared/config/database.ts:L3 | neighbors=[database.ts, drizzle.ts]
- "config_logger_logger_debug": ".debug()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L16 | neighbors=[Logger, .formatMessage()]
- "config_logger_logger_error": ".error()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L28 | neighbors=[Logger, .formatMessage()]
- "config_logger_logger_info": ".info()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L20 | neighbors=[Logger, .formatMessage()]
- "config_logger_logger_warn": ".warn()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L24 | neighbors=[Logger, .formatMessage()]
- "constants_labels_normalizesizeplan": "normalizeSizePlan()" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L39 | neighbors=[labels.ts, validateSizePlan()]
- "dashboard_types_kpiresponse": "KpiResponse" | kind=code-symbol | source=client/src/features/dashboard/types.ts:L17 | neighbors=[types.ts, dashboard-service.ts]
- "data_table_data_table_column_header_datatablecolumnheader": "DataTableColumnHeader()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-column-header.tsx:L30 | neighbors=[data-table-column-header.tsx, index.ts]
- "data_table_data_table_datatableprops": "DataTableProps" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L123 | neighbors=[data-table.tsx, index.ts]
- "data_table_data_table_export_torecords": "toRecords()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L19 | neighbors=[data-table-export.tsx, exportRowsToExcel()]
- "data_table_data_table_pagination_pagewindow": "pageWindow()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L30 | neighbors=[data-table-pagination.tsx, DataTablePagination()]
- "data_table_data_table_toolbar_datatabletoolbar": "DataTableToolbar()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-toolbar.tsx:L23 | neighbors=[data-table-toolbar.tsx, index.ts]
- "data_table_data_table_visibleexportcolumns": "visibleExportColumns()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L112 | neighbors=[data-table.tsx, DataTable()]
- "data_table_editable_cell_number_editablecellnumber": "EditableCellNumber()" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell-number.tsx:L13 | neighbors=[editable-cell-number.tsx, index.ts]
- "data_table_sticky_columns_stickycellclass": "stickyCellClass()" | kind=code-symbol | source=client/src/shared/components/data-table/sticky-columns.ts:L15 | neighbors=[index.ts, sticky-columns.ts]
- "db_check_columns": "check-columns.ts" | kind=code-symbol | source=server/src/shared/db/check-columns.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, sql]
- "db_copy_from_local_dest": "dest" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L25 | neighbors=[copy-from-local.ts, main()]
- "db_copy_from_local_fkedges": "fkEdges()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L37 | neighbors=[copy-from-local.ts, main()]
- "db_copy_from_local_ignore": "IGNORE()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L27 | neighbors=[copy-from-local.ts, main()]
- "db_copy_from_local_publictables": "publicTables()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L29 | neighbors=[copy-from-local.ts, main()]
- "db_copy_from_local_src": "src" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L24 | neighbors=[copy-from-local.ts, main()]
- "db_copy_from_local_toposort": "topoSort()" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L46 | neighbors=[copy-from-local.ts, main()]
- "db_drizzle_getpgpool": "getPgPool()" | kind=code-symbol | source=server/src/shared/db/drizzle.ts:L12 | neighbors=[drizzle.ts, getDb()]
- "db_drizzle_setupgracefulshutdown": "setupGracefulShutdown()" | kind=code-symbol | source=server/src/shared/db/drizzle.ts:L35 | neighbors=[drizzle.ts, index.ts]
- "db_migrate_machines_migratemachinestable": "migrateMachinesTable()" | kind=code-symbol | source=server/src/shared/db/migrate-machines.ts:L4 | neighbors=[migrate-machines.ts, index.ts]
- "db_migrate_reconciliation_columns_migratereconciliationcolumns": "migrateReconciliationColumns()" | kind=code-symbol | source=server/src/shared/db/migrate-reconciliation-columns.ts:L4 | neighbors=[migrate-reconciliation-columns.ts, index.ts]
- "db_migrate_remaining_weight_migrateremainingweightcolumns": "migrateRemainingWeightColumns()" | kind=code-symbol | source=server/src/shared/db/migrate-remaining-weight.ts:L4 | neighbors=[migrate-remaining-weight.ts, index.ts]
- "db_migrate_speed_column_migratespeedcolumn": "migrateSpeedColumn()" | kind=code-symbol | source=server/src/shared/db/migrate-speed-column.ts:L4 | neighbors=[migrate-speed-column.ts, index.ts]
- "db_schema_newinkconsumption": "NewInkConsumption" | kind=code-symbol | source=server/src/shared/db/schema.ts:L121 | neighbors=[schema.ts, ink.repository.ts]
- "db_schema_newinkpurchase": "NewInkPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L119 | neighbors=[schema.ts, ink.repository.ts]
- "db_schema_newuser": "NewUser" | kind=code-symbol | source=server/src/shared/db/schema.ts:L95 | neighbors=[schema.ts, user.repository.ts]
- "db_schema_newwovenworkorderdetail": "NewWovenWorkOrderDetail" | kind=code-symbol | source=server/src/shared/db/schema.ts:L125 | neighbors=[schema.ts, work-order.repository.ts]
- "db_schema_wovenproductionline": "WovenProductionLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L126 | neighbors=[schema.ts, woven-production-service.ts]
- "db_seed_data_companies": "COMPANIES" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L293 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_machines": "MACHINES" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L243 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_materials": "MATERIALS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L25 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_operators": "OPERATORS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L209 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_purchase_seeds": "PURCHASE_SEEDS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L485 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_users": "USERS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L449 | neighbors=[seed-data.ts, seed-master.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-021.json

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
