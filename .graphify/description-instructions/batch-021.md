# Node Description Batch 22 of 74

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

- "constants_labels_normalizesizeplan": "normalizeSizePlan()" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L39 | neighbors=[batch-flow.helpers.test.ts, labels.ts, validateSizePlan()]
- "data_table_data_table_datatable": "DataTable()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L176 | neighbors=[data-table.tsx, visibleExportColumns(), index.ts]
- "data_table_data_table_empty_datatableempty": "DataTableEmpty()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-empty.tsx:L23 | neighbors=[data-table.tsx, data-table-empty.tsx, index.ts]
- "data_table_data_table_export_printtable": "PrintTable()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L52 | neighbors=[data-table.tsx, data-table-export.tsx, index.ts]
- "data_table_data_table_skeleton_datatableskeleton": "DataTableSkeleton()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-skeleton.tsx:L13 | neighbors=[data-table.tsx, data-table-skeleton.tsx, index.ts]
- "data_table_data_table_view_options_datatableviewoptions": "DataTableViewOptions()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-view-options.tsx:L32 | neighbors=[data-table.tsx, data-table-view-options.tsx, index.ts]
- "data_table_editable_cell_editablecell": "EditableCell()" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L141 | neighbors=[editable-cell.tsx, useEditableCell(), index.ts]
- "data_table_editable_cell_editablecellinput": "EditableCellInput()" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L97 | neighbors=[editable-cell.tsx, editable-cell-number.tsx, index.ts]
- "db_drizzle_getdb": "getDb()" | kind=code-symbol | source=server/src/shared/db/drizzle.ts:L25 | neighbors=[drizzle.ts, getPgPool(), index.ts]
- "db_schema_user": "User" | kind=code-symbol | source=server/src/shared/db/schema.ts:L97 | neighbors=[schema.ts, user.repository.ts, user.service.ts]
- "db_seed_master_round4": "round4()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L28 | neighbors=[seed-master.ts, fillWeights(), seedStock()]
- "db_seed_master_seedmaterials": "seedMaterials()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L71 | neighbors=[seed-master.ts, main(), fillWeights()]
- "db_seed_master_seedstock": "seedStock()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L282 | neighbors=[seed-master.ts, main(), round4()]
- "db_size_plans_issizelabel": "isSizeLabel()" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L21 | neighbors=[batch-flow.helpers.test.ts, labels.ts, size-plans.ts]
- "db_size_plans_label_types": "LABEL_TYPES" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L15 | neighbors=[batch-flow.helpers.test.ts, labels.ts, size-plans.ts]
- "drizzle_0000_lovely_imperial_guard_public_brands": "public.brands" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L166 | neighbors=[0000_lovely_imperial_guard.sql, production_info, work_orders]
- "drizzle_0000_lovely_imperial_guard_public_companies": "public.companies" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L164 | neighbors=[0000_lovely_imperial_guard.sql, brands, production_info]
- "drizzle_0000_lovely_imperial_guard_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L165 | neighbors=[0000_lovely_imperial_guard.sql, machines, production_progress]
- "drizzle_0000_lovely_imperial_guard_public_production_progress": "public.production_progress" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L176 | neighbors=[0000_lovely_imperial_guard.sql, production_info, roll_allocations]
- "drizzle_0000_lovely_imperial_guard_roll_allocations": "roll_allocations" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L155 | neighbors=[0000_lovely_imperial_guard.sql, public.materials, public.production_progress]
- "drizzle_0002_production_orders_and_users_operators": "operators" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L71 | neighbors=[0002_production_orders_and_users.sql, public.users, public.work_orders]
- "drizzle_0002_production_orders_and_users_production_stage_events": "production_stage_events" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L59 | neighbors=[0002_production_orders_and_users.sql, public.production_order_lines, public.users]
- "drizzle_0003_drop_legacy_production_tables": "0003_drop_legacy_production_tables.sql" | kind=code-symbol | source=server/drizzle/0003_drop_legacy_production_tables.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, production_progress, public.materials]
- "drizzle_0012_flawless_master_chief_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L130 | neighbors=[0012_flawless_master_chief.sql, thread_dye_batches, thread_stock_movements]
- "drizzle_0012_flawless_master_chief_thread_dye_batches": "thread_dye_batches" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L88 | neighbors=[0012_flawless_master_chief.sql, public.thread_stocks, public.users]
- "drizzle_0012_flawless_master_chief_thread_stock_movements": "thread_stock_movements" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L104 | neighbors=[0012_flawless_master_chief.sql, public.thread_stocks, public.users]
- "drizzle_0012_flawless_master_chief_woven_thread_plan_items": "woven_thread_plan_items" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L44 | neighbors=[0012_flawless_master_chief.sql, public.thread_stocks, public.woven_production_lines]
- "drizzle_0015_mature_captain_britain_public_thread_dyeing_sends": "public.thread_dyeing_sends" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L104 | neighbors=[0015_mature_captain_britain.sql, thread_dyeing_allocations, thread_dyeing_receives]
- "drizzle_0018_batch_material_flow_batch_consumptions": "batch_consumptions" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L72 | neighbors=[0018_batch_material_flow.sql, production_batches, users]
- "drizzle_0018_batch_material_flow_production_batches": "production_batches" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L29 | neighbors=[0018_batch_material_flow.sql, batch_consumptions, production_order_lines]
- "drizzle_0019_batch_flow_sync_public_production_batches": "public.production_batches" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L86 | neighbors=[0019_batch_flow_sync.sql, batch_consumptions, production_stage_transactions]
- "drizzle_0021_woven_batch_flow_production_batches": "production_batches" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L32 | neighbors=[0021_woven_batch_flow.sql, batch_consumptions, woven_production_lines]
- "errors_apierror_internalservererror": "InternalServerError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L34 | neighbors=[ApiError.ts, ApiError, .constructor()]
- "errors_errorhandler_errorhandler": "errorHandler()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L42 | neighbors=[errorHandler.ts, handlePgError(), index.ts]
- "errors_errorhandler_handlepgerror": "handlePgError()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L23 | neighbors=[errorHandler.ts, errorHandler(), asPgError()]
- "feedback_index": "index.ts" | kind=code-symbol | source=client/src/components/feedback/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, StatusBadge.tsx]
- "forms_imageuploadfield_imageuploadfield": "ImageUploadField()" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L38 | neighbors=[DispatchDialog.tsx, DispatchInfo.tsx, ImageUploadField.tsx]
- "formulas_production_formula_calculatetotalweight": "calculateTotalWeight()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L42 | neighbors=[production-formula.ts, production-formula.test.ts, production-order.service.ts]
- "formulas_production_formula_completionpct": "completionPct()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L48 | neighbors=[production-formula.ts, production-formula.test.ts, production-order-overview.builder.ts]
- "healthcheck_client_healthcheck_healthproberesult": "HealthprobeResult" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L12 | neighbors=[client_healthcheck.tsx, materials-health.ts, production-health.ts]

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
