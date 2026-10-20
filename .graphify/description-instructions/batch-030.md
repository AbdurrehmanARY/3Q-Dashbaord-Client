# Node Description Batch 31 of 74

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

- "db_schema_newlocalsheet": "NewLocalSheet" | kind=code-symbol | source=server/src/shared/db/schema.ts:L152 | neighbors=[schema.ts, material-receipts.repository.ts]
- "db_schema_newproductionorder": "NewProductionOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L102 | neighbors=[schema.ts, production-order.repository.ts]
- "db_schema_newproductionorderline": "NewProductionOrderLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L104 | neighbors=[schema.ts, production-order.repository.ts]
- "db_schema_newproductionrun": "NewProductionRun" | kind=code-symbol | source=server/src/shared/db/schema.ts:L146 | neighbors=[production-run.repository.ts, schema.ts]
- "db_schema_newproductionstageevent": "NewProductionStageEvent" | kind=code-symbol | source=server/src/shared/db/schema.ts:L106 | neighbors=[schema.ts, production-order.repository.ts]
- "db_schema_newstickermaterial": "NewStickerMaterial" | kind=code-symbol | source=server/src/shared/db/schema.ts:L150 | neighbors=[schema.ts, material-receipts.repository.ts]
- "db_schema_newthreaddyebatch": "NewThreadDyeBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L140 | neighbors=[schema.ts, thread-inventory.repository.ts]
- "db_schema_newthreaddyeingallocation": "NewThreadDyeingAllocation" | kind=code-symbol | source=server/src/shared/db/schema.ts:L162 | neighbors=[schema.ts, thread-dyeing.repository.ts]
- "db_schema_newthreaddyeingreceive": "NewThreadDyeingReceive" | kind=code-symbol | source=server/src/shared/db/schema.ts:L164 | neighbors=[schema.ts, thread-dyeing.repository.ts]
- "db_schema_newthreaddyeingsend": "NewThreadDyeingSend" | kind=code-symbol | source=server/src/shared/db/schema.ts:L160 | neighbors=[schema.ts, thread-dyeing.repository.ts]
- "db_schema_newthreadpurchase": "NewThreadPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L138 | neighbors=[schema.ts, thread-inventory.repository.ts]
- "db_schema_newthreadserviceprovider": "NewThreadServiceProvider" | kind=code-symbol | source=server/src/shared/db/schema.ts:L158 | neighbors=[schema.ts, thread-service-provider.repository.ts]
- "db_schema_newuser": "NewUser" | kind=code-symbol | source=server/src/shared/db/schema.ts:L98 | neighbors=[schema.ts, user.repository.ts]
- "db_schema_newwovenproductionline": "NewWovenProductionLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L130 | neighbors=[schema.ts, woven-production.repository.ts]
- "db_schema_newwovenworkorderdetail": "NewWovenWorkOrderDetail" | kind=code-symbol | source=server/src/shared/db/schema.ts:L128 | neighbors=[schema.ts, work-order.repository.ts]
- "db_schema_threadstock": "ThreadStock" | kind=code-symbol | source=server/src/shared/db/schema.ts:L135 | neighbors=[schema.ts, thread-inventory.repository.ts]
- "db_seed_data_companies": "COMPANIES" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L293 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_machines": "MACHINES" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L243 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_materials": "MATERIALS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L25 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_operators": "OPERATORS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L209 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_purchase_seeds": "PURCHASE_SEEDS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L485 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_users": "USERS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L449 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_data_vendors": "VENDORS" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L459 | neighbors=[seed-data.ts, seed-master.ts]
- "db_seed_master_realignexistinglines": "realignExistingLines()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L189 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedcompanies": "seedCompanies()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L227 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedmachines": "seedMachines()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L131 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedoperators": "seedOperators()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L103 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedusers": "seedUsers()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L216 | neighbors=[seed-master.ts, main()]
- "db_seed_master_seedworkorders": "seedWorkOrders()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L340 | neighbors=[seed-master.ts, main()]
- "db_seed_master_sizemm": "sizeMm()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L31 | neighbors=[seed-master.ts, fillWeights()]
- "db_size_plans_normalizesize": "normalizeSize()" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L30 | neighbors=[batch-flow.helpers.ts, size-plans.ts]
- "drizzle_0000_lovely_imperial_guard_brands": "brands" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L13 | neighbors=[0000_lovely_imperial_guard.sql, public.companies]
- "drizzle_0000_lovely_imperial_guard_inventory_rolls": "inventory_rolls" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L128 | neighbors=[0000_lovely_imperial_guard.sql, public.materials]
- "drizzle_0000_lovely_imperial_guard_machines": "machines" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L34 | neighbors=[0000_lovely_imperial_guard.sql, public.operators]
- "drizzle_0000_lovely_imperial_guard_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L169 | neighbors=[0000_lovely_imperial_guard.sql, production_progress]
- "drizzle_0000_lovely_imperial_guard_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L167 | neighbors=[0000_lovely_imperial_guard.sql, production_progress]
- "drizzle_0000_lovely_imperial_guard_purchase_records": "purchase_records" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L106 | neighbors=[0000_lovely_imperial_guard.sql, public.materials]
- "drizzle_0000_lovely_imperial_guard_work_orders": "work_orders" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L58 | neighbors=[0000_lovely_imperial_guard.sql, public.brands]
- "drizzle_0002_production_orders_and_users_production_orders": "production_orders" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L16 | neighbors=[0002_production_orders_and_users.sql, public.users]
- "drizzle_0002_production_orders_and_users_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L75 | neighbors=[0002_production_orders_and_users.sql, production_order_lines]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-030.json

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
