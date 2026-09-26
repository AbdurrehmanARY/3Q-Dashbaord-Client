# Node Description Batch 41 of 53

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

- "inventory_inventory_repository_inventoryrepository_findinventoryrollbymaterialcode": ".findInventoryRollByMaterialCode()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L173 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findinventoryrolls": ".findInventoryRolls()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L166 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_findpurchasebyid": ".findPurchaseById()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L151 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_updateinventoryroll": ".updateInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L182 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_inventoryrepository_updatepurchasewithstock": ".updatePurchaseWithStock()" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L123 | neighbors=[InventoryRepository]
- "inventory_inventory_repository_purchaseinsert": "PurchaseInsert" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L8 | neighbors=[inventory.repository.ts]
- "inventory_inventory_repository_stockadjustment": "StockAdjustment" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L28 | neighbors=[inventory.repository.ts]
- "inventory_inventory_roll_controller_inventoryrollcontroller": "InventoryRollController" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.controller.ts:L6 | neighbors=[inventory-roll.controller.ts]
- "inventory_inventory_roll_repository_inventoryrollrepository_countall": ".countAll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L170 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_createwithhistory": ".createWithHistory()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L268 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L342 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L125 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_findmovements": ".findMovements()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L207 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_movetx": ".moveTx()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L221 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_inventoryrollrepository_updatewithhistory": ".updateWithHistory()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L299 | neighbors=[InventoryRollRepository]
- "inventory_inventory_roll_repository_rolllistfilters": "RollListFilters" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L15 | neighbors=[inventory-roll.repository.ts]
- "inventory_inventory_roll_repository_rollmovementtype": "RollMovementType" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L7 | neighbors=[inventory-roll.repository.ts]
- "inventory_inventory_roll_routes_router": "router" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.routes.ts:L12 | neighbors=[inventory-roll.routes.ts]
- "inventory_inventory_roll_schema_createinventoryrolldto": "CreateInventoryRollDTO" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L58 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_createinventoryrollschema": "createInventoryRollSchema" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L11 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_inventoryrollparamsschema": "inventoryRollParamsSchema" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L35 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_listinventoryrollsqueryschema": "listInventoryRollsQuerySchema" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L40 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_listrollmovementsqueryschema": "listRollMovementsQuerySchema" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L53 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_updateinventoryrolldto": "UpdateInventoryRollDTO" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L59 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_schema_updateinventoryrollschema": "updateInventoryRollSchema" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L22 | neighbors=[inventory-roll.schema.ts]
- "inventory_inventory_roll_service_inventoryrollservice_deleteinventoryroll": ".deleteInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L171 | neighbors=[InventoryRollService]
- "inventory_inventory_roll_service_inventoryrollservice_getinventoryrolls": ".getInventoryRolls()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L45 | neighbors=[InventoryRollService]
- "inventory_inventory_roll_service_inventoryrollservice_getmovements": ".getMovements()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L61 | neighbors=[InventoryRollService]
- "inventory_inventory_roll_service_inventoryrollwithcomputed": "InventoryRollWithComputed" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L11 | neighbors=[inventory-roll.service.ts]
- "inventory_inventory_routes_router": "router" | kind=code-symbol | source=server/src/modules/inventory/inventory.routes.ts:L9 | neighbors=[inventory.routes.ts]
- "inventory_inventory_schema_createpurchasedto": "CreatePurchaseDTO" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L24 | neighbors=[inventory.schema.ts]
- "inventory_inventory_schema_createpurchaseschema": "createPurchaseSchema" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L8 | neighbors=[inventory.schema.ts]
- "inventory_inventory_schema_updatepurchasedto": "UpdatePurchaseDTO" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L42 | neighbors=[inventory.schema.ts]
- "inventory_inventory_schema_updatepurchaseschema": "updatePurchaseSchema" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L26 | neighbors=[inventory.schema.ts]
- "inventory_inventory_service_derivedinputs": "DerivedInputs" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L8 | neighbors=[inventory.service.ts]
- "inventory_inventory_service_inventoryservice_deletepurchase": ".deletePurchase()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L149 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_getpurchase": ".getPurchase()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L83 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_getpurchases": ".getPurchases()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L79 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_getstock": ".getStock()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L156 | neighbors=[InventoryService]
- "inventory_material_controller_materialcontroller": "MaterialController" | kind=code-symbol | source=server/src/modules/inventory/material.controller.ts:L7 | neighbors=[material.controller.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-040.json

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
