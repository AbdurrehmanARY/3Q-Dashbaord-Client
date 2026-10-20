# Node Description Batch 54 of 74

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

- "ink_ink_controller_inkcontroller": "InkController" | kind=code-symbol | source=server/src/modules/ink/ink.controller.ts:L10 | neighbors=[ink.controller.ts]
- "ink_ink_repository_inkrepository_balanceweight": ".balanceWeight()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L97 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_consumptionbyoperator": ".consumptionByOperator()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L108 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_createconsumption": ".createConsumption()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L48 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_createpurchase": ".createPurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L19 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_findpurchasebyid": ".findPurchaseById()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L15 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_listconsumptions": ".listConsumptions()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L33 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_listpurchases": ".listPurchases()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L12 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_removeconsumption": ".removeConsumption()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L52 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_removepurchase": ".removePurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L27 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_stocklevels": ".stockLevels()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L62 | neighbors=[InkRepository]
- "ink_ink_repository_inkrepository_updatepurchase": ".updatePurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L23 | neighbors=[InkRepository]
- "ink_ink_routes_router": "router" | kind=code-symbol | source=server/src/modules/ink/ink.routes.ts:L12 | neighbors=[ink.routes.ts]
- "ink_ink_schema_createinkconsumptiondto": "CreateInkConsumptionDTO" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L42 | neighbors=[ink.schema.ts]
- "ink_ink_schema_createinkconsumptionschema": "createInkConsumptionSchema" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L29 | neighbors=[ink.schema.ts]
- "ink_ink_schema_createinkpurchasedto": "CreateInkPurchaseDTO" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L40 | neighbors=[ink.schema.ts]
- "ink_ink_schema_createinkpurchaseschema": "createInkPurchaseSchema" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L7 | neighbors=[ink.schema.ts]
- "ink_ink_schema_updateinkpurchasedto": "UpdateInkPurchaseDTO" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L41 | neighbors=[ink.schema.ts]
- "ink_ink_schema_updateinkpurchaseschema": "updateInkPurchaseSchema" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L18 | neighbors=[ink.schema.ts]
- "ink_ink_service_inkservice_consumptionbyoperator": ".consumptionByOperator()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L82 | neighbors=[InkService]
- "ink_ink_service_inkservice_listconsumptions": ".listConsumptions()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L78 | neighbors=[InkService]
- "ink_ink_service_inkservice_listpurchases": ".listPurchases()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L16 | neighbors=[InkService]
- "ink_ink_service_inkservice_removeconsumption": ".removeConsumption()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L114 | neighbors=[InkService]
- "ink_ink_service_inkservice_removepurchase": ".removePurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L51 | neighbors=[InkService]
- "ink_ink_service_inkservice_stock": ".stock()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L58 | neighbors=[InkService]
- "inventory_inventory_controller_inventorycontroller": "InventoryController" | kind=code-symbol | source=server/src/modules/inventory/inventory.controller.ts:L7 | neighbors=[inventory.controller.ts]
- "inventory_inventory_repository_inventoryrepository_applystockdeltatx": ".applyStockDeltaTx()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L44 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_createinventoryroll": ".createInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L187 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_createpurchasewithstock": ".createPurchaseWithStock()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L111 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_deletepurchasewithstock": ".deletePurchaseWithStock()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L141 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findallpurchases": ".findAllPurchases()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L156 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findinventoryrollbymaterialcode": ".findInventoryRollByMaterialCode()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L173 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findinventoryrolls": ".findInventoryRolls()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L166 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findpurchasebyid": ".findPurchaseById()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L151 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_updateinventoryroll": ".updateInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L182 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_updatepurchasewithstock": ".updatePurchaseWithStock()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L123 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_purchaseinsert": "PurchaseInsert" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L8 | neighbors=[inventory.repository.ts]
- "inventory_inventory_repository_stockadjustment": "StockAdjustment" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L28 | neighbors=[inventory.repository.ts]
- "inventory_inventory_roll_controller_inventoryrollcontroller": "InventoryRollController" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.controller.ts:L6 | neighbors=[inventory-roll.controller.ts]
- "inventory_inventory_roll_repository_inventoryrollrepository_countall": ".countAll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L170 | neighbors=[InventoryRollRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-053.json

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
