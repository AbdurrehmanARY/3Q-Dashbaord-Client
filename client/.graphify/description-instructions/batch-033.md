# Node Description Batch 34 of 38

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

- "schemas_production_order_schemas_issuerollsschema": "issueRollsSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L67 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_issuerollsschemainput": "IssueRollsSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L72 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_planlineschema": "planLineSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L26 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_planlineschemainput": "PlanLineSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L45 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_printedplanforminput": "PrintedPlanFormInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L131 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_printedplanrowschemainput": "PrintedPlanRowSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L129 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_requireuniquerows": "requireUniqueRows()" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L99 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_sizeplanschema": "sizePlanSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L17 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_stageprogressschema": "stageProgressSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L51 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_stageprogressschemainput": "StageProgressSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L73 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_transferrollsschema": "transferRollsSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L57 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_transferrollsschemainput": "TransferRollsSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L74 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanforminput": "WovenPlanFormInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L132 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanrowschema": "wovenPlanRowSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L86 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanrowschemainput": "WovenPlanRowSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L130 | neighbors=[production-order-schemas.ts]
- "schemas_work_order_schemas_workorderschema": "workOrderSchema" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L12 | neighbors=[work-order-schemas.ts]
- "segmented_tabs_segmentedtabs_segmentedtabsprops": "SegmentedTabsProps" | kind=code-symbol | source=src/shared/components/segmented-tabs/SegmentedTabs.tsx:L10 | neighbors=[SegmentedTabs.tsx]
- "services_batch_service_base": "base()" | kind=code-symbol | source=src/features/production-orders/services/batch-service.ts:L20 | neighbors=[batch-service.ts]
- "services_batch_service_test_mockcalls": "mockCalls" | kind=code-symbol | source=src/features/production-orders/services/batch-service.test.ts:L9 | neighbors=[batch-service.test.ts]
- "services_batch_service_test_pathof": "pathOf()" | kind=code-symbol | source=src/features/production-orders/services/batch-service.test.ts:L28 | neighbors=[batch-service.test.ts]
- "services_batch_service_test_stages": "STAGES" | kind=code-symbol | source=src/features/production-orders/services/batch-service.test.ts:L27 | neighbors=[batch-service.test.ts]
- "services_inventory_service_rollmovement": "RollMovement" | kind=code-symbol | source=src/features/inventory/services/inventory-service.ts:L6 | neighbors=[inventory-service.ts]
- "services_material_receipts_service_base": "base()" | kind=code-symbol | source=src/features/materials/services/material-receipts-service.ts:L4 | neighbors=[material-receipts-service.ts]
- "sidebar_nav_main_isrouteactive": "isRouteActive()" | kind=code-symbol | source=src/shared/components/sidebar/nav-main.tsx:L24 | neighbors=[nav-main.tsx]
- "sidebar_nav_main_navgroupitem": "NavGroupItem()" | kind=code-symbol | source=src/shared/components/sidebar/nav-main.tsx:L61 | neighbors=[nav-main.tsx]
- "src_app_app": "App()" | kind=code-symbol | source=src/App.tsx:L7 | neighbors=[App.tsx]
- "src_vite_env_d_importmeta": "ImportMeta" | kind=code-symbol | source=src/vite-env.d.ts:L9 | neighbors=[vite-env.d.ts]
- "src_vite_env_d_importmetaenv": "ImportMetaEnv" | kind=code-symbol | source=src/vite-env.d.ts:L3 | neighbors=[vite-env.d.ts]
- "store_table_visibility_store_tablevisibilitymap": "TableVisibilityMap" | kind=code-symbol | source=src/store/table-visibility-store.ts:L12 | neighbors=[table-visibility-store.ts]
- "store_table_visibility_store_tablevisibilitystate": "TableVisibilityState" | kind=code-symbol | source=src/store/table-visibility-store.ts:L14 | neighbors=[table-visibility-store.ts]
- "store_table_visibility_store_test_resetstore": "resetStore()" | kind=code-symbol | source=src/store/table-visibility-store.test.ts:L18 | neighbors=[table-visibility-store.test.ts]
- "store_ui_store_theme": "Theme" | kind=code-symbol | source=src/store/ui-store.ts:L3 | neighbors=[ui-store.ts]
- "store_ui_store_uistate": "UiState" | kind=code-symbol | source=src/store/ui-store.ts:L5 | neighbors=[ui-store.ts]
- "tailwind_config": "tailwind.config.js" | kind=code-symbol | source=tailwind.config.js:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "test_setup": "setup.ts" | kind=code-symbol | source=src/test/setup.ts:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "thread_dyeing_types_allocationinput": "AllocationInput" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L57 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingallocation": "DyeingAllocation" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L22 | neighbors=[types.ts]
- "thread_dyeing_types_dyeingreceive": "DyeingReceive" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L34 | neighbors=[types.ts]
- "thread_types_movement_labels": "MOVEMENT_LABELS" | kind=code-symbol | source=src/features/thread/types.ts:L62 | neighbors=[types.ts]
- "thread_types_threadbasecolor": "ThreadBaseColor" | kind=code-symbol | source=src/features/thread/types.ts:L7 | neighbors=[types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-033.json

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
