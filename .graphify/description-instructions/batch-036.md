# Node Description Batch 37 of 53

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

- "db_schema_newlocalsheet": "NewLocalSheet" | kind=code-symbol | source=server/src/shared/db/schema.ts:L149 | neighbors=[schema.ts]
- "db_schema_newmachine": "NewMachine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L91 | neighbors=[schema.ts]
- "db_schema_newmaterial": "NewMaterial" | kind=code-symbol | source=server/src/shared/db/schema.ts:L89 | neighbors=[schema.ts]
- "db_schema_newoperator": "NewOperator" | kind=code-symbol | source=server/src/shared/db/schema.ts:L93 | neighbors=[schema.ts]
- "db_schema_newproductionbatch": "NewProductionBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L105 | neighbors=[schema.ts]
- "db_schema_newproductionorder": "NewProductionOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L99 | neighbors=[schema.ts]
- "db_schema_newproductionorderline": "NewProductionOrderLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L101 | neighbors=[schema.ts]
- "db_schema_newproductionrollissuance": "NewProductionRollIssuance" | kind=code-symbol | source=server/src/shared/db/schema.ts:L111 | neighbors=[schema.ts]
- "db_schema_newproductionrun": "NewProductionRun" | kind=code-symbol | source=server/src/shared/db/schema.ts:L143 | neighbors=[schema.ts]
- "db_schema_newproductionstageevent": "NewProductionStageEvent" | kind=code-symbol | source=server/src/shared/db/schema.ts:L103 | neighbors=[schema.ts]
- "db_schema_newproductionstagetransaction": "NewProductionStageTransaction" | kind=code-symbol | source=server/src/shared/db/schema.ts:L109 | neighbors=[schema.ts]
- "db_schema_newpurchaserecord": "NewPurchaseRecord" | kind=code-symbol | source=server/src/shared/db/schema.ts:L113 | neighbors=[schema.ts]
- "db_schema_newstickermaterial": "NewStickerMaterial" | kind=code-symbol | source=server/src/shared/db/schema.ts:L147 | neighbors=[schema.ts]
- "db_schema_newthreaddyebatch": "NewThreadDyeBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L137 | neighbors=[schema.ts]
- "db_schema_newthreaddyeingallocation": "NewThreadDyeingAllocation" | kind=code-symbol | source=server/src/shared/db/schema.ts:L159 | neighbors=[schema.ts]
- "db_schema_newthreaddyeingreceive": "NewThreadDyeingReceive" | kind=code-symbol | source=server/src/shared/db/schema.ts:L161 | neighbors=[schema.ts]
- "db_schema_newthreaddyeingsend": "NewThreadDyeingSend" | kind=code-symbol | source=server/src/shared/db/schema.ts:L157 | neighbors=[schema.ts]
- "db_schema_newthreadpurchase": "NewThreadPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L135 | neighbors=[schema.ts]
- "db_schema_newthreadserviceprovider": "NewThreadServiceProvider" | kind=code-symbol | source=server/src/shared/db/schema.ts:L155 | neighbors=[schema.ts]
- "db_schema_newthreadstock": "NewThreadStock" | kind=code-symbol | source=server/src/shared/db/schema.ts:L133 | neighbors=[schema.ts]
- "db_schema_newthreadstockmovement": "NewThreadStockMovement" | kind=code-symbol | source=server/src/shared/db/schema.ts:L139 | neighbors=[schema.ts]
- "db_schema_newworkorder": "NewWorkOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L97 | neighbors=[schema.ts]
- "db_schema_newwovenproductionline": "NewWovenProductionLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L127 | neighbors=[schema.ts]
- "db_schema_newwoventhreadplanitem": "NewWovenThreadPlanItem" | kind=code-symbol | source=server/src/shared/db/schema.ts:L129 | neighbors=[schema.ts]
- "db_schema_productionbatch": "ProductionBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L104 | neighbors=[schema.ts]
- "db_schema_productionrollissuance": "ProductionRollIssuance" | kind=code-symbol | source=server/src/shared/db/schema.ts:L110 | neighbors=[schema.ts]
- "db_schema_productionrun": "ProductionRun" | kind=code-symbol | source=server/src/shared/db/schema.ts:L142 | neighbors=[schema.ts]
- "db_schema_productionstageevent": "ProductionStageEvent" | kind=code-symbol | source=server/src/shared/db/schema.ts:L102 | neighbors=[schema.ts]
- "db_schema_productionstagetransaction": "ProductionStageTransaction" | kind=code-symbol | source=server/src/shared/db/schema.ts:L108 | neighbors=[schema.ts]
- "db_schema_stickermaterial": "StickerMaterial" | kind=code-symbol | source=server/src/shared/db/schema.ts:L146 | neighbors=[schema.ts]
- "db_schema_threaddyebatch": "ThreadDyeBatch" | kind=code-symbol | source=server/src/shared/db/schema.ts:L136 | neighbors=[schema.ts]
- "db_schema_threaddyeingallocation": "ThreadDyeingAllocation" | kind=code-symbol | source=server/src/shared/db/schema.ts:L158 | neighbors=[schema.ts]
- "db_schema_threaddyeingreceive": "ThreadDyeingReceive" | kind=code-symbol | source=server/src/shared/db/schema.ts:L160 | neighbors=[schema.ts]
- "db_schema_threaddyeingsend": "ThreadDyeingSend" | kind=code-symbol | source=server/src/shared/db/schema.ts:L156 | neighbors=[schema.ts]
- "db_schema_threadpurchase": "ThreadPurchase" | kind=code-symbol | source=server/src/shared/db/schema.ts:L134 | neighbors=[schema.ts]
- "db_schema_threadserviceprovider": "ThreadServiceProvider" | kind=code-symbol | source=server/src/shared/db/schema.ts:L154 | neighbors=[schema.ts]
- "db_schema_threadstock": "ThreadStock" | kind=code-symbol | source=server/src/shared/db/schema.ts:L132 | neighbors=[schema.ts]
- "db_schema_threadstockmovement": "ThreadStockMovement" | kind=code-symbol | source=server/src/shared/db/schema.ts:L138 | neighbors=[schema.ts]
- "db_schema_woventhreadplanitem": "WovenThreadPlanItem" | kind=code-symbol | source=server/src/shared/db/schema.ts:L128 | neighbors=[schema.ts]
- "db_schema_wovenworkorderdetail": "WovenWorkOrderDetail" | kind=code-symbol | source=server/src/shared/db/schema.ts:L124 | neighbors=[schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-036.json

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
