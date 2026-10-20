# Node Description Batch 43 of 74

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

- "batch_and_runs_batch_flow_repository_batchflowrepository_findtrace": ".findTrace()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L337 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_locklinestx": ".lockLinesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L751 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_lockordertx": ".lockOrderTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L738 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_recordoutput": ".recordOutput()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L558 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_startbatch": ".startBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L527 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_updatebatch": ".updateBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L460 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchscope": "BatchScope" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L165 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_batchselect": "batchSelect" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L71 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_createbatchinput": "CreateBatchInput" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L32 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_recordoutputinput": "RecordOutputInput" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L58 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_sourceallocation": "SourceAllocation" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L27 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_sourceedge": "SourceEdge" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1490 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_test_batches": "BATCHES" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L121 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_consumptions": "CONSUMPTIONS" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L122 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_cuttingrow": "cuttingRow" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L161 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_db": "db()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L27 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_fakedb": "fakeDb()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L132 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_fakerow": "FakeRow" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L48 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_faketx": "fakeTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L51 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_hoisted": "hoisted" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L23 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_join": "Join" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L116 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_joinkind": "JoinKind" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L115 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_line_tables": "LINE_TABLES" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L126 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_machines": "MACHINES" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L123 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_operators": "OPERATORS" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L124 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_printed": "PRINTED" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L76 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_remainingplanned": "RemainingPlanned" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L69 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_repo": "repo()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L73 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_test_woven": "WOVEN" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L75 | neighbors=[batch-flow.repository.test.ts]
- "batch_and_runs_batch_flow_repository_tracerow": "TraceRow" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1496 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_repository_updatebatchinput": "UpdateBatchInput" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L46 | neighbors=[batch-flow.repository.ts]
- "batch_and_runs_batch_flow_routes_router": "router" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.routes.ts:L64 | neighbors=[batch-flow.routes.ts]
- "batch_and_runs_batch_flow_routes_stagerouter": "stageRouter()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.routes.ts:L30 | neighbors=[batch-flow.routes.ts]
- "batch_and_runs_batch_flow_schema_actoruserid": "actorUserId" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L39 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_batchactionschema": "batchActionSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L121 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_batchidparamsschema": "batchIdParamsSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L45 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_createconsumingbatchdto": "CreateConsumingBatchDTO" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L137 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_createconsumingbatchschema": "createConsumingBatchSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L77 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_createprintingbatchdto": "CreatePrintingBatchDTO" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L135 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_createprintingbatchschema": "createPrintingBatchSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L64 | neighbors=[batch-flow.schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-042.json

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
