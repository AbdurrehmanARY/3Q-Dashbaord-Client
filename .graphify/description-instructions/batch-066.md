# Node Description Batch 67 of 74

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

- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_findreceivesforsends": ".findReceivesForSends()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L41 | neighbors=[ThreadDyeingRepository]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_findsendbyid": ".findSendById()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L49 | neighbors=[ThreadDyeingRepository]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_findsends": ".findSends()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L14 | neighbors=[ThreadDyeingRepository]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_receivedyedtransaction": ".receiveDyedTransaction()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L99 | neighbors=[ThreadDyeingRepository]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository_sendfordyeingtransaction": ".sendForDyeingTransaction()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L59 | neighbors=[ThreadDyeingRepository]
- "thread_dyeing_thread_dyeing_routes_router": "router" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.routes.ts:L10 | neighbors=[thread-dyeing.routes.ts]
- "thread_dyeing_thread_dyeing_schema_basecolorenum": "baseColorEnum" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L4 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_schema_createdyeingsenddto": "CreateDyeingSendDTO" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L56 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_schema_createdyeingsendschema": "createDyeingSendSchema" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L11 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_schema_denierenum": "denierEnum" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L3 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_schema_receivedyeingdto": "ReceiveDyeingDTO" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L57 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_schema_receivedyeingschema": "receiveDyeingSchema" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L38 | neighbors=[thread-dyeing.schema.ts]
- "thread_dyeing_thread_dyeing_service_threaddyeingservice_listsends": ".listSends()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.service.ts:L9 | neighbors=[ThreadDyeingService]
- "thread_dyeing_thread_dyeing_service_threaddyeingservice_receivedyed": ".receiveDyed()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.service.ts:L62 | neighbors=[ThreadDyeingService]
- "thread_dyeing_thread_dyeing_service_threaddyeingservice_sendfordyeing": ".sendForDyeing()" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.service.ts:L30 | neighbors=[ThreadDyeingService]
- "thread_dyeing_types_allocationinput": "AllocationInput" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L57 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingallocation": "DyeingAllocation" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L22 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingreceive": "DyeingReceive" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L34 | neighbors=[types.ts]
- "thread_inventory_thread_inventory_controller_threadinventorycontroller": "ThreadInventoryController" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.controller.ts:L9 | neighbors=[thread-inventory.controller.ts]
- "thread_inventory_thread_inventory_repository_consumptionslice": "ConsumptionSlice" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L23 | neighbors=[thread-inventory.repository.ts]
- "thread_inventory_thread_inventory_repository_denier": "Denier" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L12 | neighbors=[thread-inventory.repository.ts]
- "thread_inventory_thread_inventory_repository_movementtype": "MovementType" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L14 | neighbors=[thread-inventory.repository.ts]
- "thread_inventory_thread_inventory_repository_stocktype": "StockType" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L13 | neighbors=[thread-inventory.repository.ts]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_countstocks": ".countStocks()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L59 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_createdyebatchtransaction": ".createDyeBatchTransaction()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L332 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_createpurchasewithstock": ".createPurchaseWithStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L279 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_createstockwithhistory": ".createStockWithHistory()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L74 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_deletepurchasewithstock": ".deletePurchaseWithStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L303 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_deletestock": ".deleteStock()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L153 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findconsumedbyprocesskg": ".findConsumedByProcessKg()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L140 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_finddyebatches": ".findDyeBatches()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L182 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findlastbatchnumber": ".findLastBatchNumber()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L186 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findmovements": ".findMovements()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L157 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findpurchasebyid": ".findPurchaseById()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L177 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findpurchases": ".findPurchases()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L166 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findstockbyid": ".findStockById()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L54 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_findstocks": ".findStocks()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L40 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_getorcreatestocktx": ".getOrCreateStockTx()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L201 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_updatestockwithhistory": ".updateStockWithHistory()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L97 | neighbors=[ThreadInventoryRepository]
- "thread_inventory_thread_inventory_routes_router": "router" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.routes.ts:L15 | neighbors=[thread-inventory.routes.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-066.json

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
