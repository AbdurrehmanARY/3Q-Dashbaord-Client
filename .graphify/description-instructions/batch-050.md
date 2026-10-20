# Node Description Batch 51 of 74

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

- "db_schema_newworkorder": "NewWorkOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L100 | neighbors=[schema.ts]
- "db_schema_newwoventhreadplanitem": "NewWovenThreadPlanItem" | kind=code-symbol | source=server/src/shared/db/schema.ts:L132 | neighbors=[schema.ts]
- "db_schema_productionbatch": "ProductionBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L107 | neighbors=[schema.ts]
- "db_schema_productionrollissuance": "ProductionRollIssuance" | kind=code-symbol | source=server/src/shared/db/schema.ts:L113 | neighbors=[schema.ts]
- "db_schema_productionrun": "ProductionRun" | kind=code-symbol | source=server/src/shared/db/schema.ts:L145 | neighbors=[schema.ts]
- "db_schema_productionstageevent": "ProductionStageEvent" | kind=code-symbol | source=server/src/shared/db/schema.ts:L105 | neighbors=[schema.ts]
- "db_schema_productionstagetransaction": "ProductionStageTransaction" | kind=code-symbol | source=server/src/shared/db/schema.ts:L111 | neighbors=[schema.ts]
- "db_schema_stickermaterial": "StickerMaterial" | kind=code-symbol | source=server/src/shared/db/schema.ts:L149 | neighbors=[schema.ts]
- "db_schema_threaddyebatch": "ThreadDyeBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L139 | neighbors=[schema.ts]
- "db_schema_threaddyeingallocation": "ThreadDyeingAllocation" | kind=code-symbol | source=server/src/shared/db/schema.ts:L161 | neighbors=[schema.ts]
- "db_schema_threaddyeingreceive": "ThreadDyeingReceive" | kind=code-symbol | source=server/src/shared/db/schema.ts:L163 | neighbors=[schema.ts]
- "db_schema_threaddyeingsend": "ThreadDyeingSend" | kind=code-symbol | source=server/src/shared/db/schema.ts:L159 | neighbors=[schema.ts]
- "db_schema_threadpurchase": "ThreadPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L137 | neighbors=[schema.ts]
- "db_schema_threadserviceprovider": "ThreadServiceProvider" | kind=code-symbol | source=server/src/shared/db/schema.ts:L157 | neighbors=[schema.ts]
- "db_schema_threadstockmovement": "ThreadStockMovement" | kind=code-symbol | source=server/src/shared/db/schema.ts:L141 | neighbors=[schema.ts]
- "db_schema_woventhreadplanitem": "WovenThreadPlanItem" | kind=code-symbol | source=server/src/shared/db/schema.ts:L131 | neighbors=[schema.ts]
- "db_schema_wovenworkorderdetail": "WovenWorkOrderDetail" | kind=code-symbol | source=server/src/shared/db/schema.ts:L127 | neighbors=[schema.ts]
- "db_seed_all": "seed-all.ts" | kind=code-symbol | source=server/src/shared/db/seed-all.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…]
- "db_seed_data_companyseed": "CompanySeed" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L284 | neighbors=[seed-data.ts]
- "db_seed_data_machineseed": "MachineSeed" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L232 | neighbors=[seed-data.ts]
- "db_seed_data_materialseed": "MaterialSeed" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L13 | neighbors=[seed-data.ts]
- "db_seed_data_operatorseed": "OperatorSeed" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L201 | neighbors=[seed-data.ts]
- "db_seed_data_purchaseseed": "PurchaseSeed" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L466 | neighbors=[seed-data.ts]
- "db_seed_master_machine_takeovers": "MACHINE_TAKEOVERS" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L125 | neighbors=[seed-master.ts]
- "db_seed_master_stocked": "STOCKED" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L263 | neighbors=[seed-master.ts]
- "db_seed_seed": "seed()" | kind=code-symbol | source=server/src/shared/db/seed.ts:L18 | neighbors=[seed.ts]
- "db_test_mail_main": "main()" | kind=code-symbol | source=server/src/shared/db/test-mail.ts:L3 | neighbors=[test-mail.ts]
- "dialogs_appdialog_appdialogprops": "AppDialogProps" | kind=code-symbol | source=client/src/components/dialogs/AppDialog.tsx:L12 | neighbors=[AppDialog.tsx]
- "dialogs_confirmdialog_confirmdialogprops": "ConfirmDialogProps" | kind=code-symbol | source=client/src/components/dialogs/ConfirmDialog.tsx:L15 | neighbors=[ConfirmDialog.tsx]
- "drizzle_0000_lovely_imperial_guard_companies": "companies" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L2 | neighbors=[0000_lovely_imperial_guard.sql]
- "drizzle_0000_lovely_imperial_guard_materials": "materials" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L22 | neighbors=[0000_lovely_imperial_guard.sql]
- "drizzle_0000_lovely_imperial_guard_operators": "operators" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L48 | neighbors=[0000_lovely_imperial_guard.sql]
- "drizzle_0001_master_data_fields": "0001_master_data_fields.sql" | kind=code-symbol | source=server/drizzle/0001_master_data_fields.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0002_production_orders_and_users_users": "users" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L4 | neighbors=[0002_production_orders_and_users.sql]
- "drizzle_0005_purchase_total_roll_per_200m": "0005_purchase_total_roll_per_200m.sql" | kind=code-symbol | source=server/drizzle/0005_purchase_total_roll_per_200m.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0006_widen_weight_precision": "0006_widen_weight_precision.sql" | kind=code-symbol | source=server/drizzle/0006_widen_weight_precision.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0007_row_update_event_type": "0007_row_update_event_type.sql" | kind=code-symbol | source=server/drizzle/0007_row_update_event_type.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0008_modules_refactor_add": "0008_modules_refactor_add.sql" | kind=code-symbol | source=server/drizzle/0008_modules_refactor_add.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0009_drop_is_submitted": "0009_drop_is_submitted.sql" | kind=code-symbol | source=server/drizzle/0009_drop_is_submitted.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0010_easy_killer_shrike": "0010_easy_killer_shrike.sql" | kind=code-symbol | source=server/drizzle/0010_easy_killer_shrike.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-050.json

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
