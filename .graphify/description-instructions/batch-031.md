# Node Description Batch 32 of 74

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

- "drizzle_0002_production_orders_and_users_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L76 | neighbors=[0002_production_orders_and_users.sql, production_order_lines]
- "drizzle_0002_production_orders_and_users_public_production_order_lines": "public.production_order_lines" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L80 | neighbors=[0002_production_orders_and_users.sql, production_stage_events]
- "drizzle_0002_production_orders_and_users_public_production_orders": "public.production_orders" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L74 | neighbors=[0002_production_orders_and_users.sql, production_order_lines]
- "drizzle_0002_production_orders_and_users_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L71 | neighbors=[0002_production_orders_and_users.sql, operators]
- "drizzle_0003_drop_legacy_production_tables_production_progress": "production_progress" | kind=code-symbol | source=server/drizzle/0003_drop_legacy_production_tables.sql:L1 | neighbors=[0003_drop_legacy_production_tables.sql, public.materials]
- "drizzle_0003_drop_legacy_production_tables_public_materials": "public.materials" | kind=code-symbol | source=server/drizzle/0003_drop_legacy_production_tables.sql:L1 | neighbors=[0003_drop_legacy_production_tables.sql, production_progress]
- "drizzle_0004_production_roll_issuances_public_materials": "public.materials" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L12 | neighbors=[0004_production_roll_issuances.sql, production_roll_issuances]
- "drizzle_0004_production_roll_issuances_public_production_order_lines": "public.production_order_lines" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L11 | neighbors=[0004_production_roll_issuances.sql, production_roll_issuances]
- "drizzle_0004_production_roll_issuances_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L13 | neighbors=[0004_production_roll_issuances.sql, production_roll_issuances]
- "drizzle_0012_flawless_master_chief_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L122 | neighbors=[0012_flawless_master_chief.sql, woven_production_lines]
- "drizzle_0012_flawless_master_chief_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L123 | neighbors=[0012_flawless_master_chief.sql, woven_production_lines]
- "drizzle_0012_flawless_master_chief_public_production_orders": "public.production_orders" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L121 | neighbors=[0012_flawless_master_chief.sql, woven_production_lines]
- "drizzle_0012_flawless_master_chief_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L117 | neighbors=[0012_flawless_master_chief.sql, work_orders]
- "drizzle_0012_flawless_master_chief_public_woven_production_lines": "public.woven_production_lines" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L126 | neighbors=[0012_flawless_master_chief.sql, woven_thread_plan_items]
- "drizzle_0012_flawless_master_chief_work_orders": "work_orders" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L117 | neighbors=[0012_flawless_master_chief.sql, public.work_orders]
- "drizzle_0014_last_meteorite_inventory_roll_movements": "inventory_roll_movements" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L3 | neighbors=[0014_last_meteorite.sql, public.users]
- "drizzle_0014_last_meteorite_operators": "operators" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L17 | neighbors=[0014_last_meteorite.sql, public.inventory_rolls]
- "drizzle_0014_last_meteorite_public_inventory_rolls": "public.inventory_rolls" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L17 | neighbors=[0014_last_meteorite.sql, operators]
- "drizzle_0014_last_meteorite_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L24 | neighbors=[0014_last_meteorite.sql, inventory_roll_movements]
- "drizzle_0015_mature_captain_britain_machines": "machines" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L96 | neighbors=[0015_mature_captain_britain.sql, public.work_orders]
- "drizzle_0015_mature_captain_britain_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L101 | neighbors=[0015_mature_captain_britain.sql, production_runs]
- "drizzle_0015_mature_captain_britain_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L102 | neighbors=[0015_mature_captain_britain.sql, production_runs]
- "drizzle_0015_mature_captain_britain_public_thread_service_providers": "public.thread_service_providers" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L106 | neighbors=[0015_mature_captain_britain.sql, thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L103 | neighbors=[0015_mature_captain_britain.sql, production_runs]
- "drizzle_0015_mature_captain_britain_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L96 | neighbors=[0015_mature_captain_britain.sql, machines]
- "drizzle_0015_mature_captain_britain_thread_dyeing_allocations": "thread_dyeing_allocations" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L63 | neighbors=[0015_mature_captain_britain.sql, public.thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_thread_dyeing_receives": "thread_dyeing_receives" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L73 | neighbors=[0015_mature_captain_britain.sql, public.thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_thread_dyeing_sends": "thread_dyeing_sends" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L83 | neighbors=[0015_mature_captain_britain.sql, public.thread_service_providers]
- "drizzle_0017_glorious_captain_america_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L24 | neighbors=[0017_glorious_captain_america.sql, work_orders]
- "drizzle_0017_glorious_captain_america_work_orders": "work_orders" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L24 | neighbors=[0017_glorious_captain_america.sql, public.operators]
- "drizzle_0018_batch_material_flow_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L29 | neighbors=[0018_batch_material_flow.sql, production_batches]
- "drizzle_0018_batch_material_flow_users": "users" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L94 | neighbors=[0018_batch_material_flow.sql, batch_consumptions]
- "drizzle_0019_batch_flow_sync_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L75 | neighbors=[0019_batch_flow_sync.sql, public.production_order_lines]
- "drizzle_0019_batch_flow_sync_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L82 | neighbors=[0019_batch_flow_sync.sql, production_batches]
- "drizzle_0019_batch_flow_sync_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L83 | neighbors=[0019_batch_flow_sync.sql, production_batches]
- "drizzle_0021_woven_batch_flow_batch_consumptions": "batch_consumptions" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L58 | neighbors=[0021_woven_batch_flow.sql, production_batches]
- "drizzle_0026_label_types_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0026_label_types.sql:L27 | neighbors=[0026_label_types.sql, public.label_types]
- "drizzle_0026_label_types_public_label_types": "public.label_types" | kind=code-symbol | source=server/drizzle/0026_label_types.sql:L27 | neighbors=[0026_label_types.sql, production_order_lines]
- "errors_errorhandler_aspgerror": "asPgError()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L11 | neighbors=[errorHandler.ts, handlePgError()]
- "errors_errorhandler_notfound": "notFound()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L5 | neighbors=[errorHandler.ts, index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-031.json

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
