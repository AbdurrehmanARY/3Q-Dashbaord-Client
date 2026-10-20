# Node Description Batch 44 of 74

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

- "batch_and_runs_batch_flow_schema_labelqty": "labelQty" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L27 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_lineidparamsschema": "lineIdParamsSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L41 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_listbatchesqueryschema": "listBatchesQuerySchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L126 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_optionalrolls": "optionalRolls" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L21 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_recordoutputdto": "RecordOutputDTO" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L139 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_recordoutputschema": "recordOutputSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L109 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_requiredresourceid": "requiredResourceId()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L34 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_rolls": "rolls" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L16 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_sourceallocation": "sourceAllocation" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L50 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_stageresourcesqueryschema": "stageResourcesQuerySchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L131 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_updatebatchdto": "UpdateBatchDTO" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L138 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_schema_updatebatchschema": "updateBatchSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L91 | neighbors=[batch-flow.schema.ts]
- "batch_and_runs_batch_flow_service_batchflowservice_getorderflow": ".getOrderFlow()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L162 | neighbors=[BatchFlowService]
- "batch_and_runs_batch_flow_service_batchflowservice_gettrace": ".getTrace()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L147 | neighbors=[BatchFlowService]
- "batch_and_runs_batch_flow_service_test_batchrow": "batchRow()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L179 | neighbors=[batch-flow.service.test.ts]
- "batch_and_runs_batch_flow_service_test_cuttingbatch": "cuttingBatch" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L56 | neighbors=[batch-flow.service.test.ts]
- "batch_and_runs_batch_flow_service_test_mockorder22": "mockOrder22()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L210 | neighbors=[batch-flow.service.test.ts]
- "batch_and_runs_batch_flow_service_test_mocks": "mocks" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L10 | neighbors=[batch-flow.service.test.ts]
- "batch_and_runs_batch_flow_service_test_service": "service()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L53 | neighbors=[batch-flow.service.test.ts]
- "batch_and_runs_production_run_controller_productionruncontroller": "ProductionRunController" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.controller.ts:L6 | neighbors=[production-run.controller.ts]
- "batch_and_runs_production_run_repository_productionrunrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L8 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_findbyidempotencykey": ".findByIdempotencyKey()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L77 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_findbysaleorderid": ".findBySaleOrderId()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L14 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_findrecentduplicate": ".findRecentDuplicate()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L90 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_getmachinebreakdown": ".getMachineBreakdown()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L49 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_getoperatorbreakdown": ".getOperatorBreakdown()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L63 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_gettotalproduced": ".getTotalProduced()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L41 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_repository_productionrunrepository_getworkorder": ".getWorkOrder()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L119 | neighbors=[ProductionRunRepository]
- "batch_and_runs_production_run_schema_createproductionrundto": "CreateProductionRunDTO" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.schema.ts:L35 | neighbors=[production-run.schema.ts]
- "batch_and_runs_production_run_schema_createproductionrunschema": "createProductionRunSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.schema.ts:L18 | neighbors=[production-run.schema.ts]
- "batch_and_runs_production_run_schema_run_reasons": "RUN_REASONS" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.schema.ts:L3 | neighbors=[production-run.schema.ts]
- "batch_and_runs_production_run_schema_saleorderparamsschema": "saleOrderParamsSchema" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.schema.ts:L31 | neighbors=[production-run.schema.ts]
- "batch_and_runs_production_run_service_productionrunservice_getproductionsummary": ".getProductionSummary()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.service.ts:L53 | neighbors=[ProductionRunService]
- "batch_and_runs_production_run_service_productionrunservice_logproductionrun": ".logProductionRun()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.service.ts:L13 | neighbors=[ProductionRunService]
- "batch_and_runs_resource_availability_service_classification": "Classification" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L20 | neighbors=[resource-availability.service.ts]
- "batch_and_runs_resource_availability_service_machineavailability": "MachineAvailability" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L10 | neighbors=[resource-availability.service.ts]
- "batch_and_runs_resource_availability_service_machinewithavailability": "MachineWithAvailability" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L59 | neighbors=[resource-availability.service.ts]
- "batch_and_runs_resource_availability_service_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L13 | neighbors=[resource-availability.service.ts]
- "batch_and_runs_resource_availability_service_operatorwithavailability": "OperatorWithAvailability" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L66 | neighbors=[resource-availability.service.ts]
- "batch_and_runs_resource_availability_service_rank": "RANK" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L26 | neighbors=[resource-availability.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-043.json

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
