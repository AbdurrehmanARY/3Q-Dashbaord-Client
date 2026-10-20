# Node Description Batch 55 of 74

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
- "inventory_material_repository_materialrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L29 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L8 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findbycode": ".findByCode()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L19 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L24 | neighbors=[MaterialRepository]
- "inventory_material_routes_router": "router" | kind=code-symbol | source=server/src/modules/inventory/material.routes.ts:L8 | neighbors=[material.routes.ts]
- "inventory_material_schema_creatematerialdto": "CreateMaterialDTO" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L26 | neighbors=[material.schema.ts]
- "inventory_material_schema_creatematerialschema": "createMaterialSchema" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L3 | neighbors=[material.schema.ts]
- "inventory_material_schema_updatematerialdto": "UpdateMaterialDTO" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L27 | neighbors=[material.schema.ts]
- "inventory_material_schema_updatematerialschema": "updateMaterialSchema" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L14 | neighbors=[material.schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-054.json

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
