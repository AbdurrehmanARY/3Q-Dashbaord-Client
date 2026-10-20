# Node Description Batch 64 of 74

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

- "scripts_reorganize_modules_tab": "TAB" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L82 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_walkts": "walkTs()" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L72 | neighbors=[reorganize-modules.mjs]
- "scripts_reorganize_modules_ws": "WS" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L85 | neighbors=[reorganize-modules.mjs]
- "scripts_tree_src_skip": "SKIP" | kind=code-symbol | source=server/scripts/tree-src.mjs:L5 | neighbors=[tree-src.mjs]
- "scripts_tree_src_tree": "tree()" | kind=code-symbol | source=server/scripts/tree-src.mjs:L24 | neighbors=[tree-src.mjs]
- "scripts_tree_src_walk": "walk()" | kind=code-symbol | source=server/scripts/tree-src.mjs:L6 | neighbors=[tree-src.mjs]
- "scripts_verify_0025_line_scoped_admin": "admin" | kind=code-symbol | source=server/scripts/verify-0025-line-scoped.mjs:L44 | neighbors=[verify-0025-line-scoped.mjs]
- "scripts_verify_0025_line_scoped_env": "env" | kind=code-symbol | source=server/scripts/verify-0025-line-scoped.mjs:L24 | neighbors=[verify-0025-line-scoped.mjs]
- "scripts_verify_0025_line_scoped_origin": "origin" | kind=code-symbol | source=server/scripts/verify-0025-line-scoped.mjs:L43 | neighbors=[verify-0025-line-scoped.mjs]
- "scripts_verify_batch_constraints_env": "env" | kind=code-symbol | source=server/scripts/verify-batch-constraints.mjs:L32 | neighbors=[verify-batch-constraints.mjs]
- "scripts_verify_batch_constraints_envpath": "envPath" | kind=code-symbol | source=server/scripts/verify-batch-constraints.mjs:L25 | neighbors=[verify-batch-constraints.mjs]
- "scripts_verify_batch_constraints_here": "here" | kind=code-symbol | source=server/scripts/verify-batch-constraints.mjs:L24 | neighbors=[verify-batch-constraints.mjs]
- "scripts_verify_batch_constraints_sql": "sql" | kind=code-symbol | source=server/scripts/verify-batch-constraints.mjs:L49 | neighbors=[verify-batch-constraints.mjs]
- "scripts_verify_batch_visibility_env": "env" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L36 | neighbors=[verify-batch-visibility.mjs]
- "scripts_verify_batch_visibility_envpath": "envPath" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L29 | neighbors=[verify-batch-visibility.mjs]
- "scripts_verify_batch_visibility_here": "here" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L28 | neighbors=[verify-batch-visibility.mjs]
- "scripts_verify_batch_visibility_report": "report()" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L69 | neighbors=[verify-batch-visibility.mjs]
- "scripts_verify_batch_visibility_sql": "sql" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L53 | neighbors=[verify-batch-visibility.mjs]
- "scripts_verify_estimated_weaving_serverdir": "serverDir" | kind=code-symbol | source=server/scripts/verify-estimated-weaving.mjs:L7 | neighbors=[verify-estimated-weaving.mjs]
- "scripts_verify_estimated_weaving_sql": "sql" | kind=code-symbol | source=server/scripts/verify-estimated-weaving.mjs:L11 | neighbors=[verify-estimated-weaving.mjs]
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
- "server_tsup_config": "tsup.config.ts" | kind=code-symbol | source=server/tsup.config.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "server_vitest_config_resolvepath": "resolvePath()" | kind=code-symbol | source=server/vitest.config.ts:L4 | neighbors=[vitest.config.ts]
- "services_batch_service_base": "base()" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.ts:L20 | neighbors=[batch-service.ts]
- "services_batch_service_test_mockcalls": "mockCalls" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.test.ts:L9 | neighbors=[batch-service.test.ts]
- "services_batch_service_test_pathof": "pathOf()" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.test.ts:L28 | neighbors=[batch-service.test.ts]
- "services_batch_service_test_stages": "STAGES" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.test.ts:L27 | neighbors=[batch-service.test.ts]
- "services_inventory_service_rollmovement": "RollMovement" | kind=code-symbol | source=client/src/features/inventory/services/inventory-service.ts:L6 | neighbors=[inventory-service.ts]
- "services_mail_service_productionorderemaildata": "ProductionOrderEmailData" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L4 | neighbors=[mail.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-063.json

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
