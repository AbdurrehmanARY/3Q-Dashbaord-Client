# Node Description Batch 42 of 53

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

- "inventory_material_repository_materialrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L29 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L8 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findbycode": ".findByCode()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L19 | neighbors=[MaterialRepository]
- "inventory_material_repository_materialrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L24 | neighbors=[MaterialRepository]
- "inventory_material_routes_router": "router" | kind=code-symbol | source=server/src/modules/inventory/material.routes.ts:L8 | neighbors=[material.routes.ts]
- "inventory_material_schema_creatematerialdto": "CreateMaterialDTO" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L26 | neighbors=[material.schema.ts]
- "inventory_material_schema_creatematerialschema": "createMaterialSchema" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L3 | neighbors=[material.schema.ts]
- "inventory_material_schema_updatematerialdto": "UpdateMaterialDTO" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L27 | neighbors=[material.schema.ts]
- "inventory_material_schema_updatematerialschema": "updateMaterialSchema" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L14 | neighbors=[material.schema.ts]
- "inventory_material_service_materialservice_creatematerial": ".createMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L25 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_deletematerial": ".deleteMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L76 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterialbycode": ".getMaterialByCode()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L13 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterialbyid": ".getMaterialById()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L19 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterials": ".getMaterials()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L8 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_updatematerial": ".updateMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L56 | neighbors=[MaterialService]
- "layout_pagecontainer_pagecontainerprops": "PageContainerProps" | kind=code-symbol | source=client/src/components/layout/PageContainer.tsx:L16 | neighbors=[PageContainer.tsx]
- "layout_pagecontainer_sizes": "SIZES" | kind=code-symbol | source=client/src/components/layout/PageContainer.tsx:L9 | neighbors=[PageContainer.tsx]
- "layout_pageheader_pageheaderprops": "PageHeaderProps" | kind=code-symbol | source=client/src/components/layout/PageHeader.tsx:L4 | neighbors=[PageHeader.tsx]
- "lib_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=client/src/lib/api.ts:L5 | neighbors=[ApiError]
- "lib_api_axiosinstance": "axiosInstance" | kind=code-symbol | source=client/src/lib/api.ts:L16 | neighbors=[api.ts]
- "lib_api_paginated": "Paginated" | kind=code-symbol | source=client/src/lib/api.ts:L60 | neighbors=[api.ts]
- "lib_format_exporttocsv": "exportToCsv()" | kind=code-symbol | source=client/src/lib/format.ts:L94 | neighbors=[format.ts]
- "machines_machine_controller_machinecontroller": "MachineController" | kind=code-symbol | source=server/src/modules/machines/machine.controller.ts:L6 | neighbors=[machine.controller.ts]
- "machines_machine_repository_machineproducttype": "MachineProductType" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L6 | neighbors=[machine.repository.ts]
- "machines_machine_repository_machinerepository_create": ".create()" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L28 | neighbors=[MachineRepository]
- "machines_machine_repository_machinerepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L9 | neighbors=[MachineRepository]
- "machines_machine_repository_machinerepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L23 | neighbors=[MachineRepository]
- "machines_machine_routes_router": "router" | kind=code-symbol | source=server/src/modules/machines/machine.routes.ts:L8 | neighbors=[machine.routes.ts]
- "machines_machine_schema_createmachinedto": "CreateMachineDTO" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L30 | neighbors=[machine.schema.ts]
- "machines_machine_schema_createmachineschema": "createMachineSchema" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L3 | neighbors=[machine.schema.ts]
- "machines_machine_schema_updatemachinedto": "UpdateMachineDTO" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L31 | neighbors=[machine.schema.ts]
- "machines_machine_schema_updatemachineschema": "updateMachineSchema" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L16 | neighbors=[machine.schema.ts]
- "machines_machine_service_machineservice_createmachine": ".createMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L21 | neighbors=[MachineService]
- "machines_machine_service_machineservice_deletemachine": ".deleteMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L37 | neighbors=[MachineService]
- "machines_machine_service_machineservice_getmachine": ".getMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L15 | neighbors=[MachineService]
- "machines_machine_service_machineservice_getmachines": ".getMachines()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L9 | neighbors=[MachineService]
- "machines_machine_service_machineservice_updatemachine": ".updateMachine()" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L29 | neighbors=[MachineService]
- "materials_receipts_types_receiptfield": "ReceiptField" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L15 | neighbors=[receipts-types.ts]
- "materials_receipts_types_receiptfieldtype": "ReceiptFieldType" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L13 | neighbors=[receipts-types.ts]
- "middleware_validaterequest_request": "Request" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L7 | neighbors=[validateRequest.ts]

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
