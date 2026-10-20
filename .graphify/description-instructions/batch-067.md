# Node Description Batch 68 of 74

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

- "thread_inventory_thread_inventory_schema_basecolorenum": "baseColorEnum" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L4 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_createdyebatchdto": "CreateDyeBatchDTO" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L79 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_createdyebatchschema": "createDyeBatchSchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L25 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_createthreadpurchasedto": "CreateThreadPurchaseDTO" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L78 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_createthreadpurchaseschema": "createThreadPurchaseSchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L10 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_createthreadstockschema": "createThreadStockSchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L39 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_denierenum": "denierEnum" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L3 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_listthreadmovementsqueryschema": "listThreadMovementsQuerySchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L73 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_listthreadpurchasesqueryschema": "listThreadPurchasesQuerySchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L68 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_listthreadstocksqueryschema": "listThreadStocksQuerySchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L62 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_schema_updatethreadstockschema": "updateThreadStockSchema" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L52 | neighbors=[thread-inventory.schema.ts]
- "thread_inventory_thread_inventory_service_dyebatchinput": "DyeBatchInput" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L21 | neighbors=[thread-inventory.service.ts]
- "thread_inventory_thread_inventory_service_threadinventoryservice_createpurchase": ".createPurchase()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L187 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_createstock": ".createStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L73 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_deletepurchase": ".deletePurchase()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L217 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_deletestock": ".deleteStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L147 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_getdyebatches": ".getDyeBatches()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L235 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_getmovements": ".getMovements()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L163 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_getpurchases": ".getPurchases()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L174 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadinventoryservice_updatestock": ".updateStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L114 | neighbors=[ThreadInventoryService]
- "thread_inventory_thread_inventory_service_threadpurchaseinput": "ThreadPurchaseInput" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L9 | neighbors=[thread-inventory.service.ts]
- "thread_service_provider_thread_service_provider_controller_threadserviceprovidercontroller": "ThreadServiceProviderController" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.controller.ts:L5 | neighbors=[thread-service-provider.controller.ts]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L14 | neighbors=[ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L7 | neighbors=[ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L10 | neighbors=[ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository_remove": ".remove()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L26 | neighbors=[ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L18 | neighbors=[ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_routes_router": "router" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.routes.ts:L10 | neighbors=[thread-service-provider.routes.ts]
- "thread_service_provider_thread_service_provider_schema_createthreadserviceproviderdto": "CreateThreadServiceProviderDTO" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.schema.ts:L16 | neighbors=[thread-service-provider.schema.ts]
- "thread_service_provider_thread_service_provider_schema_createthreadserviceproviderschema": "createThreadServiceProviderSchema" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.schema.ts:L3 | neighbors=[thread-service-provider.schema.ts]
- "thread_service_provider_thread_service_provider_schema_updatethreadserviceproviderdto": "UpdateThreadServiceProviderDTO" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.schema.ts:L17 | neighbors=[thread-service-provider.schema.ts]
- "thread_service_provider_thread_service_provider_schema_updatethreadserviceproviderschema": "updateThreadServiceProviderSchema" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.schema.ts:L12 | neighbors=[thread-service-provider.schema.ts]
- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice_create": ".create()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L18 | neighbors=[ThreadServiceProviderService]
- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice_getall": ".getAll()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L10 | neighbors=[ThreadServiceProviderService]
- "thread_types_movement_labels": "MOVEMENT_LABELS" | kind=code-symbol | source=client/src/features/thread/types.ts:L62 | neighbors=[types.ts]
- "thread_types_threadbasecolor": "ThreadBaseColor" | kind=code-symbol | source=client/src/features/thread/types.ts:L7 | neighbors=[types.ts]
- "thread_types_threadmovementtype": "ThreadMovementType" | kind=code-symbol | source=client/src/features/thread/types.ts:L41 | neighbors=[types.ts]
- "thread_types_threadstocktype": "ThreadStockType" | kind=code-symbol | source=client/src/features/thread/types.ts:L14 | neighbors=[types.ts]
- "tox_pass": "pass()" | kind=code-symbol | source=tox.mjs:L83 | neighbors=[tox.mjs]
- "tox_root": "ROOT" | kind=code-symbol | source=tox.mjs:L26 | neighbors=[tox.mjs]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-067.json

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
