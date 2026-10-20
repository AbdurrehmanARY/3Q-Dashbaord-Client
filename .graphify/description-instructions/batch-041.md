# Node Description Batch 42 of 74

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

- "batch_and_runs_batch_flow_controller_batchoverviewcontroller": "BatchOverviewController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L113 | neighbors=[batch-flow.controller.ts]
- "batch_and_runs_batch_flow_controller_cuttingbatchcontroller": "cuttingBatchController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L134 | neighbors=[batch-flow.controller.ts]
- "batch_and_runs_batch_flow_controller_packagingbatchcontroller": "packagingBatchController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L135 | neighbors=[batch-flow.controller.ts]
- "batch_and_runs_batch_flow_controller_printingbatchcontroller": "printingBatchController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L133 | neighbors=[batch-flow.controller.ts]
- "batch_and_runs_batch_flow_controller_weavingbatchcontroller": "weavingBatchController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L132 | neighbors=[batch-flow.controller.ts]
- "batch_and_runs_batch_flow_helpers_batchcodefor": "batchCodeFor()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L93 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_batchposition": "BatchPosition" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L120 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_batchstage": "BatchStage" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L4 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_batchstatus": "BatchStatus" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L5 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_beamthreadkgof": "beamThreadKgOf()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L419 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_code_prefix": "CODE_PREFIX" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L78 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_downstream_of": "DOWNSTREAM_OF" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L58 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_estimatedminutesfor": "estimatedMinutesFor()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L387 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_formatduration": "formatDuration()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L403 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_inputnoun": "inputNoun()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L103 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_isfirststage": "isFirstStage()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L64 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_isreadyforcompletion": "isReadyForCompletion()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L328 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_kindownsstage": "kindOwnsStage()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L37 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_lineflow": "LineFlow" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L159 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_linekind": "LineKind" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L15 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_lineref": "LineRef" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L25 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_linesizeflow": "LineSizeFlow" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L186 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_operator_product_type": "OPERATOR_PRODUCT_TYPE" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L357 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_requireupstream": "requireUpstream()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L68 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_stage_designation": "STAGE_DESIGNATION" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L349 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_stage_machine_type": "STAGE_MACHINE_TYPE" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L342 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_stage_title": "STAGE_TITLE" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L85 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_stages_of": "STAGES_OF" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L32 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_stagetxtypefor": "stageTxTypeFor()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L98 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_test_batch": "batch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.test.ts:L29 | neighbors=[batch-flow.helpers.test.ts]
- "batch_and_runs_batch_flow_helpers_unit_of": "UNIT_OF" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L42 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_upstream_of": "UPSTREAM_OF" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L53 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_helpers_woventimecontext": "WovenTimeContext" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L365 | neighbors=[batch-flow.helpers.ts]
- "batch_and_runs_batch_flow_repository_batchflowrepository_cancelbatch": ".cancelBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L670 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_completebatch": ".completeBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L624 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_createbatch": ".createBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L387 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_deletebatch": ".deleteBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L698 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_downstreamtakerstx": ".downstreamTakersTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1281 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_findlineflow": ".findLineFlow()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L304 | neighbors=[BatchFlowRepository]
- "batch_and_runs_batch_flow_repository_batchflowrepository_findresourceholds": ".findResourceHolds()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1091 | neighbors=[BatchFlowRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-041.json

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
