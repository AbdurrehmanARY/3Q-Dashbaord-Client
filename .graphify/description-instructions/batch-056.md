# Node Description Batch 57 of 74

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

- "machines_machine_service_machineservice_createmachine": ".createMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L21 | neighbors=[MachineService]
- "machines_machine_service_machineservice_deletemachine": ".deleteMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L37 | neighbors=[MachineService]
- "machines_machine_service_machineservice_getmachine": ".getMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L15 | neighbors=[MachineService]
- "machines_machine_service_machineservice_getmachines": ".getMachines()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L9 | neighbors=[MachineService]
- "machines_machine_service_machineservice_updatemachine": ".updateMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L29 | neighbors=[MachineService]
- "material_receipts_material_receipts_controller_labelsheetcontroller": "LabelSheetController" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.controller.ts:L49 | neighbors=[material-receipts.controller.ts]
- "material_receipts_material_receipts_controller_localsheetcontroller": "LocalSheetController" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.controller.ts:L29 | neighbors=[material-receipts.controller.ts]
- "material_receipts_material_receipts_controller_stickermaterialcontroller": "StickerMaterialController" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.controller.ts:L9 | neighbors=[material-receipts.controller.ts]
- "material_receipts_material_receipts_repository_labelsheetrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L72 | neighbors=[LabelSheetRepository]
- "material_receipts_material_receipts_repository_labelsheetrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L65 | neighbors=[LabelSheetRepository]
- "material_receipts_material_receipts_repository_labelsheetrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L68 | neighbors=[LabelSheetRepository]
- "material_receipts_material_receipts_repository_labelsheetrepository_remove": ".remove()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L84 | neighbors=[LabelSheetRepository]
- "material_receipts_material_receipts_repository_labelsheetrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L76 | neighbors=[LabelSheetRepository]
- "material_receipts_material_receipts_repository_localsheetrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L46 | neighbors=[LocalSheetRepository]
- "material_receipts_material_receipts_repository_localsheetrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L39 | neighbors=[LocalSheetRepository]
- "material_receipts_material_receipts_repository_localsheetrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L42 | neighbors=[LocalSheetRepository]
- "material_receipts_material_receipts_repository_localsheetrepository_remove": ".remove()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L58 | neighbors=[LocalSheetRepository]
- "material_receipts_material_receipts_repository_localsheetrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L50 | neighbors=[LocalSheetRepository]
- "material_receipts_material_receipts_repository_stickermaterialrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L20 | neighbors=[StickerMaterialRepository]
- "material_receipts_material_receipts_repository_stickermaterialrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L13 | neighbors=[StickerMaterialRepository]
- "material_receipts_material_receipts_repository_stickermaterialrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L16 | neighbors=[StickerMaterialRepository]
- "material_receipts_material_receipts_repository_stickermaterialrepository_remove": ".remove()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L32 | neighbors=[StickerMaterialRepository]
- "material_receipts_material_receipts_repository_stickermaterialrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L24 | neighbors=[StickerMaterialRepository]
- "material_receipts_material_receipts_routes_labelsheetsrouter": "labelSheetsRouter" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.routes.ts:L42 | neighbors=[material-receipts.routes.ts]
- "material_receipts_material_receipts_routes_localsheetsrouter": "localSheetsRouter" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.routes.ts:L31 | neighbors=[material-receipts.routes.ts]
- "material_receipts_material_receipts_routes_stickermaterialsrouter": "stickerMaterialsRouter" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.routes.ts:L20 | neighbors=[material-receipts.routes.ts]
- "material_receipts_material_receipts_schema_createlabelsheetdto": "CreateLabelSheetDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L50 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_createlabelsheetschema": "createLabelSheetSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L34 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_createlocalsheetdto": "CreateLocalSheetDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L48 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_createlocalsheetschema": "createLocalSheetSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L20 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_createstickermaterialdto": "CreateStickerMaterialDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L46 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_createstickermaterialschema": "createStickerMaterialSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L5 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatelabelsheetdto": "UpdateLabelSheetDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L51 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatelabelsheetschema": "updateLabelSheetSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L42 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatelocalsheetdto": "UpdateLocalSheetDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L49 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatelocalsheetschema": "updateLocalSheetSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L28 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatestickermaterialdto": "UpdateStickerMaterialDTO" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L47 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_schema_updatestickermaterialschema": "updateStickerMaterialSchema" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L14 | neighbors=[material-receipts.schema.ts]
- "material_receipts_material_receipts_service_labelsheetservice_getall": ".getAll()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L90 | neighbors=[LabelSheetService]
- "material_receipts_material_receipts_service_labelsheetservice_remove": ".remove()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L115 | neighbors=[LabelSheetService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-056.json

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
