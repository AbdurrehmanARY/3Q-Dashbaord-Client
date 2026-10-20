# Node Description Batch 62 of 74

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

- "production_runs_types_machinebreakdown": "MachineBreakdown" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L47 | neighbors=[types.ts]
- "production_runs_types_operatorbreakdown": "OperatorBreakdown" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L54 | neighbors=[types.ts]
- "relations_index_batchconsumptionsrelations": "batchConsumptionsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L148 | neighbors=[index.ts]
- "relations_index_brandsrelations": "brandsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L36 | neighbors=[index.ts]
- "relations_index_companiesrelations": "companiesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L32 | neighbors=[index.ts]
- "relations_index_inventoryrollsrelations": "inventoryRollsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L221 | neighbors=[index.ts]
- "relations_index_machinesrelations": "machinesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L228 | neighbors=[index.ts]
- "relations_index_materialsrelations": "materialsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L207 | neighbors=[index.ts]
- "relations_index_operatorsrelations": "operatorsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L360 | neighbors=[index.ts]
- "relations_index_productionbatchesrelations": "productionBatchesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L119 | neighbors=[index.ts]
- "relations_index_productionorderlinesrelations": "productionOrderLinesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L78 | neighbors=[index.ts]
- "relations_index_productionordersrelations": "productionOrdersRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L64 | neighbors=[index.ts]
- "relations_index_productionrollissuancesrelations": "productionRollIssuancesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L192 | neighbors=[index.ts]
- "relations_index_productionrunsrelations": "productionRunsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L312 | neighbors=[index.ts]
- "relations_index_productionstageeventsrelations": "productionStageEventsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L181 | neighbors=[index.ts]
- "relations_index_productionstagetransactionsrelations": "productionStageTransactionsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L166 | neighbors=[index.ts]
- "relations_index_purchaserecordsrelations": "purchaseRecordsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L214 | neighbors=[index.ts]
- "relations_index_threaddyebatchesrelations": "threadDyeBatchesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L293 | neighbors=[index.ts]
- "relations_index_threaddyeingallocationsrelations": "threadDyeingAllocationsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L346 | neighbors=[index.ts]
- "relations_index_threaddyeingreceivesrelations": "threadDyeingReceivesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L353 | neighbors=[index.ts]
- "relations_index_threaddyeingsendsrelations": "threadDyeingSendsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L337 | neighbors=[index.ts]
- "relations_index_threadserviceprovidersrelations": "threadServiceProvidersRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L333 | neighbors=[index.ts]
- "relations_index_threadstockmovementsrelations": "threadStockMovementsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L282 | neighbors=[index.ts]
- "relations_index_threadstocksrelations": "threadStocksRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L275 | neighbors=[index.ts]
- "relations_index_usersrelations": "usersRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L57 | neighbors=[index.ts]
- "relations_index_workordersrelations": "workOrdersRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L44 | neighbors=[index.ts]
- "relations_index_wovenproductionlinesrelations": "wovenProductionLinesRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L251 | neighbors=[index.ts]
- "relations_index_woventhreadplanitemsrelations": "wovenThreadPlanItemsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L262 | neighbors=[index.ts]
- "relations_index_wovenworkorderdetailsrelations": "wovenWorkOrderDetailsRelations" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L244 | neighbors=[index.ts]
- "schemas_company_schemas_brandschema": "brandSchema" | kind=code-symbol | source=client/src/features/companies/schemas/company-schemas.ts:L17 | neighbors=[company-schemas.ts]
- "schemas_company_schemas_brandschemainput": "BrandSchemaInput" | kind=code-symbol | source=client/src/features/companies/schemas/company-schemas.ts:L22 | neighbors=[company-schemas.ts]
- "schemas_production_order_schemas_assignresourcesschema": "assignResourcesSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L62 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_assignresourcesschemainput": "AssignResourcesSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L75 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_createproductionorderschema": "createProductionOrderSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L3 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_createproductionorderschemainput": "CreateProductionOrderSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L49 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_issuerollsschema": "issueRollsSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L67 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_issuerollsschemainput": "IssueRollsSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L72 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_printedplanforminput": "PrintedPlanFormInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L131 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_printedplanrowschemainput": "PrintedPlanRowSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L129 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_requireuniquerows": "requireUniqueRows()" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L99 | neighbors=[production-order-schemas.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-061.json

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
