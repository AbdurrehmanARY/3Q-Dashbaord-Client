# Node Description Batch 56 of 74

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

- "inventory_material_service_materialservice_creatematerial": ".createMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L25 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_deletematerial": ".deleteMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L76 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterialbycode": ".getMaterialByCode()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L13 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterialbyid": ".getMaterialById()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L19 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_getmaterials": ".getMaterials()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L8 | neighbors=[MaterialService]
- "inventory_material_service_materialservice_updatematerial": ".updateMaterial()" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L56 | neighbors=[MaterialService]
- "label_types_label_types_controller_labeltypescontroller": "LabelTypesController" | kind=code-symbol | source=server/src/modules/label-types/label-types.controller.ts:L5 | neighbors=[label-types.controller.ts]
- "label_types_label_types_repository_labeltypesrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L46 | neighbors=[LabelTypesRepository]
- "label_types_label_types_repository_labeltypesrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L60 | neighbors=[LabelTypesRepository]
- "label_types_label_types_repository_labeltypesrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L7 | neighbors=[LabelTypesRepository]
- "label_types_label_types_repository_labeltypesrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L25 | neighbors=[LabelTypesRepository]
- "label_types_label_types_repository_labeltypesrepository_findbynameandcategory": ".findByNameAndCategory()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L33 | neighbors=[LabelTypesRepository]
- "label_types_label_types_repository_labeltypesrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/label-types/label-types.repository.ts:L51 | neighbors=[LabelTypesRepository]
- "label_types_label_types_routes_router": "router" | kind=code-symbol | source=server/src/modules/label-types/label-types.routes.ts:L11 | neighbors=[label-types.routes.ts]
- "label_types_label_types_schema_createlabeltypedto": "CreateLabelTypeDTO" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L30 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_createlabeltypeschema": "createLabelTypeSchema" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L5 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_labeltypeenum": "labelTypeEnum" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L3 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_labeltypeparamsschema": "labelTypeParamsSchema" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L20 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_labeltypesqueryschema": "labelTypesQuerySchema" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L24 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_updatelabeltypedto": "UpdateLabelTypeDTO" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L31 | neighbors=[label-types.schema.ts]
- "label_types_label_types_schema_updatelabeltypeschema": "updateLabelTypeSchema" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L12 | neighbors=[label-types.schema.ts]
- "label_types_label_types_service_labeltypesservice_create": ".create()" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L17 | neighbors=[LabelTypesService]
- "label_types_label_types_service_labeltypesservice_getall": ".getAll()" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L7 | neighbors=[LabelTypesService]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-055.json

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
