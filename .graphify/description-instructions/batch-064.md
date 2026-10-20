# Node Description Batch 65 of 74

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

- "services_material_receipts_service_base": "base()" | kind=code-symbol | source=client/src/features/materials/services/material-receipts-service.ts:L4 | neighbors=[material-receipts-service.ts]
- "sidebar_nav_main_isrouteactive": "isRouteActive()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L24 | neighbors=[nav-main.tsx]
- "sidebar_nav_main_navgroupitem": "NavGroupItem()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L61 | neighbors=[nav-main.tsx]
- "src_app_apirouter": "apiRouter" | kind=code-symbol | source=server/src/app.ts:L67 | neighbors=[app.ts]
- "src_app_app": "app" | kind=code-symbol | source=server/src/app.ts:L34 | neighbors=[app.ts]
- "src_app_indexrouter": "indexRouter" | kind=code-symbol | source=server/src/app.ts:L72 | neighbors=[app.ts]
- "src_index_server": "server" | kind=code-symbol | source=server/src/index.ts:L15 | neighbors=[index.ts]
- "src_vite_env_d_importmeta": "ImportMeta" | kind=code-symbol | source=client/src/vite-env.d.ts:L9 | neighbors=[vite-env.d.ts]
- "src_vite_env_d_importmetaenv": "ImportMetaEnv" | kind=code-symbol | source=client/src/vite-env.d.ts:L3 | neighbors=[vite-env.d.ts]
- "store_table_visibility_store_tablevisibilitymap": "TableVisibilityMap" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L12 | neighbors=[table-visibility-store.ts]
- "store_table_visibility_store_tablevisibilitystate": "TableVisibilityState" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L14 | neighbors=[table-visibility-store.ts]
- "store_table_visibility_store_test_resetstore": "resetStore()" | kind=code-symbol | source=client/src/store/table-visibility-store.test.ts:L18 | neighbors=[table-visibility-store.test.ts]
- "store_ui_store_theme": "Theme" | kind=code-symbol | source=client/src/store/ui-store.ts:L3 | neighbors=[ui-store.ts]
- "store_ui_store_uistate": "UiState" | kind=code-symbol | source=client/src/store/ui-store.ts:L5 | neighbors=[ui-store.ts]
- "tables_batch_consumptions_table_batchconsumptions": "batchConsumptions" | kind=code-symbol | source=server/src/shared/db/tables/batch-consumptions.table.ts:L39 | neighbors=[batch-consumptions.table.ts]
- "tables_brands_table_brands": "brands" | kind=code-symbol | source=server/src/shared/db/tables/brands.table.ts:L4 | neighbors=[brands.table.ts]
- "tables_companies_table_companies": "companies" | kind=code-symbol | source=server/src/shared/db/tables/companies.table.ts:L3 | neighbors=[companies.table.ts]
- "tables_ink_consumptions_table_inkconsumptions": "inkConsumptions" | kind=code-symbol | source=server/src/shared/db/tables/ink-consumptions.table.ts:L9 | neighbors=[ink-consumptions.table.ts]
- "tables_ink_purchases_table_inkpurchases": "inkPurchases" | kind=code-symbol | source=server/src/shared/db/tables/ink-purchases.table.ts:L11 | neighbors=[ink-purchases.table.ts]
- "tables_inventory_roll_movements_table_inventoryrollmovements": "inventoryRollMovements" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L27 | neighbors=[inventory-roll-movements.table.ts]
- "tables_inventory_roll_movements_table_rollmovementtypeenum": "rollMovementTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L9 | neighbors=[inventory-roll-movements.table.ts]
- "tables_inventory_rolls_table_inventoryrolls": "inventoryRolls" | kind=code-symbol | source=server/src/shared/db/tables/inventory-rolls.table.ts:L4 | neighbors=[inventory-rolls.table.ts]
- "tables_label_sheets_table_labelsheets": "labelSheets" | kind=code-symbol | source=server/src/shared/db/tables/label-sheets.table.ts:L7 | neighbors=[label-sheets.table.ts]
- "tables_label_types_table_labeltype": "LabelType" | kind=code-symbol | source=server/src/shared/db/tables/label-types.table.ts:L31 | neighbors=[label-types.table.ts]
- "tables_label_types_table_labeltypes": "labelTypes" | kind=code-symbol | source=server/src/shared/db/tables/label-types.table.ts:L12 | neighbors=[label-types.table.ts]
- "tables_label_types_table_newlabeltype": "NewLabelType" | kind=code-symbol | source=server/src/shared/db/tables/label-types.table.ts:L32 | neighbors=[label-types.table.ts]
- "tables_local_sheets_table_localsheets": "localSheets" | kind=code-symbol | source=server/src/shared/db/tables/local-sheets.table.ts:L7 | neighbors=[local-sheets.table.ts]
- "tables_machines_table_machines": "machines" | kind=code-symbol | source=server/src/shared/db/tables/machines.table.ts:L5 | neighbors=[machines.table.ts]
- "tables_materials_table_materials": "materials" | kind=code-symbol | source=server/src/shared/db/tables/materials.table.ts:L3 | neighbors=[materials.table.ts]
- "tables_operator_type_enum_operatortypeenum": "operatorTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/operator-type.enum.ts:L10 | neighbors=[operator-type.enum.ts]
- "tables_operators_table_operators": "operators" | kind=code-symbol | source=server/src/shared/db/tables/operators.table.ts:L5 | neighbors=[operators.table.ts]
- "tables_product_type_enum_producttypeenum": "productTypeEnum" | kind=code-symbol | source=server/src/shared/db/tables/product-type.enum.ts:L12 | neighbors=[product-type.enum.ts]
- "tables_production_batches_table_productionbatches": "productionBatches" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L63 | neighbors=[production-batches.table.ts]
- "tables_production_batches_table_productionbatchstageenum": "productionBatchStageEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L24 | neighbors=[production-batches.table.ts]
- "tables_production_batches_table_productionbatchstatusenum": "productionBatchStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L38 | neighbors=[production-batches.table.ts]
- "tables_production_order_lines_table_productionorderlines": "productionOrderLines" | kind=code-symbol | source=server/src/shared/db/tables/production-order-lines.table.ts:L22 | neighbors=[production-order-lines.table.ts]
- "tables_production_orders_table_productionorders": "productionOrders" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L28 | neighbors=[production-orders.table.ts]
- "tables_production_orders_table_productionorderstatusenum": "productionOrderStatusEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L11 | neighbors=[production-orders.table.ts]
- "tables_production_roll_issuances_table_productionrollissuances": "productionRollIssuances" | kind=code-symbol | source=server/src/shared/db/tables/production-roll-issuances.table.ts:L13 | neighbors=[production-roll-issuances.table.ts]
- "tables_production_run_reason_enum_productionrunreasonenum": "productionRunReasonEnum" | kind=code-symbol | source=server/src/shared/db/tables/production-run-reason.enum.ts:L8 | neighbors=[production-run-reason.enum.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-064.json

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
