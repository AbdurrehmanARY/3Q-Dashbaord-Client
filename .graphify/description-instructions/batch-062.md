# Node Description Batch 63 of 74

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

- "schemas_production_order_schemas_sizeplanschema": "sizePlanSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L17 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_stageprogressschema": "stageProgressSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L51 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_stageprogressschemainput": "StageProgressSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L73 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_transferrollsschema": "transferRollsSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L57 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_transferrollsschemainput": "TransferRollsSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L74 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanforminput": "WovenPlanFormInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L132 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanrowschema": "wovenPlanRowSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L86 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanrowschemainput": "WovenPlanRowSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L130 | neighbors=[production-order-schemas.ts]
- "schemas_work_order_schemas_workorderschema": "workOrderSchema" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L12 | neighbors=[work-order-schemas.ts]
- "scripts_dump_baseline_counts": "counts" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L121 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_describe": "describe()" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L55 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_directurlfromenvfile": "directUrlFromEnvFile()" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L44 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_envfileurl": "envFileUrl" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L56 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_findpgdump": "findPgDump()" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L68 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_outarg": "outArg" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L32 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_patched": "patched" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L114 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_pgdump": "pgDump" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L89 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_pgversion": "[pgVersion]" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L96 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_raw": "raw" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L113 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_serverdir": "serverDir" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L25 | neighbors=[dump-baseline.mjs]
- "scripts_dump_baseline_target": "target" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L99 | neighbors=[dump-baseline.mjs]
- "scripts_migrate_modules_all": "ALL" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L3 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_argv": "argv" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L1 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_dry": "DRY" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L2 | neighbors=[migrate-modules.mjs]
- "scripts_migrate_modules_requested": "requested" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L4 | neighbors=[migrate-modules.mjs]
- "scripts_reconcile_migrations_force": "force" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L50 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_journal": "journal" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L41 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_missing": "missing" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L91 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_newestidx": "newestIdx" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L92 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_recordedwhen": "recordedWhen" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L90 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_serverdir": "serverDir" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L28 | neighbors=[reconcile-migrations.mjs]
- "scripts_reconcile_migrations_sql": "sql" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L39 | neighbors=[reconcile-migrations.mjs]
- "scripts_reorganize_modules_cr": "CR" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L83 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_files": "files" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L182 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_kw": "KW" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L87 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_lf": "LF" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L84 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_move": "MOVE" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L20 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_quote": "QUOTE" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L86 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_skip_dirs": "SKIP_DIRS" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L19 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_src": "SRC" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L17 | neighbors=[reorganize-modules.mjs]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-062.json

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
