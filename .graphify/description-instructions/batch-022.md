# Node Description Batch 23 of 53

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

- "db_seed_data_vendors": "VENDORS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L459 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_master_realignexistinglines": "realignExistingLines()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L189 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedcompanies": "seedCompanies()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L227 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedmachines": "seedMachines()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L131 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedoperators": "seedOperators()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L103 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedusers": "seedUsers()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L216 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedworkorders": "seedWorkOrders()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L340 | neighbors=[seed-master.ts, main()]
- "db_seed_master_sizemm": "sizeMm()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L31 | neighbors=[seed-master.ts, fillWeights()]
- "db_size_plans_issizelabel": "isSizeLabel()" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L21 | neighbors=[labels.ts, size-plans.ts]
- "db_size_plans_label_types": "LABEL_TYPES" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L15 | neighbors=[labels.ts, size-plans.ts]
- "drizzle_0000_lovely_imperial_guard_brands": "brands" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L13 | neighbors=[0000_lovely_imperial_guard.sql, public.companies]
- "drizzle_0000_lovely_imperial_guard_inventory_rolls": "inventory_rolls" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L128 | neighbors=[0000_lovely_imperial_guard.sql, public.materials]
- "drizzle_0000_lovely_imperial_guard_machines": "machines" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L34 | neighbors=[0000_lovely_imperial_guard.sql, public.operators]
- "drizzle_0000_lovely_imperial_guard_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L169 | neighbors=[0000_lovely_imperial_guard.sql, production_progress]
- "drizzle_0000_lovely_imperial_guard_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L167 | neighbors=[0000_lovely_imperial_guard.sql, production_progress]
- "drizzle_0000_lovely_imperial_guard_purchase_records": "purchase_records" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L106 | neighbors=[0000_lovely_imperial_guard.sql, public.materials]
- "drizzle_0000_lovely_imperial_guard_work_orders": "work_orders" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L58 | neighbors=[0000_lovely_imperial_guard.sql, public.brands]
- "drizzle_0002_production_orders_and_users_production_orders": "production_orders" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L16 | neighbors=[0002_production_orders_and_users.sql, public.users]
- "drizzle_0002_production_orders_and_users_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L75 | neighbors=[0002_production_orders_and_users.sql, production_order_lines]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-022.json

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
