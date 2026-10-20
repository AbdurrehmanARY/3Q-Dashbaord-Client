# Node Description Batch 16 of 74

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

- "drizzle_0017_glorious_captain_america": "0017_glorious_captain_america.sql" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L1 | neighbors=[9b99ce1 feat: complete production workf…, ink_consumptions, ink_purchases, public.operators, work_orders]
- "drizzle_0018_batch_material_flow": "0018_batch_material_flow.sql" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, production_order_lines, users]
- "formulas_purchase_formula_calculateinvoiceweight": "calculateInvoiceWeight()" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L24 | neighbors=[seed.ts, seed-master.ts, purchase-formula.ts, purchase-formula.test.ts, inventory.service.ts]
- "formulas_purchase_formula_calculatetotalrollper200m": "calculateTotalRollPer200m()" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L14 | neighbors=[seed.ts, seed-master.ts, purchase-formula.ts, purchase-formula.test.ts, inventory.service.ts]
- "healthcheck_health_check_shell": "health-check-shell.tsx" | kind=code-symbol | source=client/src/lib/healthcheck/health-check-shell.tsx:L1 | neighbors=[2c8bd34 feat(client): per-table column …, HealthCheckShell(), HealthCheckShellProps, utils.ts, cn()]
- "hooks_use_theme": "use-theme.ts" | kind=code-symbol | source=client/src/shared/hooks/use-theme.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useTheme(), ui-store.ts, useUiStore, ThemeToggle.tsx]
- "ink_ink_routes": "ink.routes.ts" | kind=code-symbol | source=server/src/modules/ink/ink.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateRequest()]
- "ink_types_inkpurchase": "InkPurchase" | kind=code-symbol | source=client/src/features/ink/types.ts:L3 | neighbors=[ink-purchase-columns.tsx, InkPurchaseDialog.tsx, types.ts, InkPurchasesPage.tsx, ink-service.ts]
- "inventory_inventory_schema": "inventory.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreatePurchaseDTO, createPurchaseSchema, UpdatePurchaseDTO, updatePurchaseSchema]
- "inventory_material_schema": "material.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateMaterialDTO, createMaterialSchema, UpdateMaterialDTO, updateMaterialSchema]
- "machines_machine_schema": "machine.schema.ts" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateMachineDTO, createMachineSchema, UpdateMachineDTO, updateMachineSchema]
- "machines_operators_types_operator_type_meta": "OPERATOR_TYPE_META" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L37 | neighbors=[machine-columns.tsx, operator-columns.tsx, operator-table.tsx, OperatorDialog.tsx, types.ts]
- "material_receipts_material_receipts_service_labelsheetservice": "LabelSheetService" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L89 | neighbors=[material-receipts.service.ts, .create(), .getAll(), .remove(), .update()]
- "material_receipts_material_receipts_service_localsheetservice": "LocalSheetService" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L56 | neighbors=[material-receipts.service.ts, .create(), .getAll(), .remove(), .update()]
- "material_receipts_material_receipts_service_stickermaterialservice": "StickerMaterialService" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L20 | neighbors=[material-receipts.service.ts, .create(), .getAll(), .remove(), .update()]
- "pages_labelsheetspage": "LabelSheetsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/LabelSheetsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LabelSheetsPage()]
- "pages_localsheetspage": "LocalSheetsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/LocalSheetsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LocalSheetsPage()]
- "pages_stickermaterialspage": "StickerMaterialsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/StickerMaterialsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), StickerMaterialsPage()]
- "production_orders_label_types_sizeplan": "SizePlan" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L17 | neighbors=[PlanLabelTypeForm.tsx, SizePlanEditor.tsx, label-types.ts, types.ts, woven-types.ts]
- "production_orders_production_order_service_productionorderservice_assignlineresources": ".assignLineResources()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L443 | neighbors=[ProductionOrderService, .assertResourcesFree(), .getLineOrThrow(), .getOrderOrThrow(), .getResourceLocks()]
- "production_orders_production_order_service_productionorderservice_buildplanrow": ".buildPlanRow()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L339 | neighbors=[ProductionOrderService, .assertResourcesFree(), .getResourceLocks(), .planLine(), .updateLinePlan()]
- "production_orders_production_order_service_productionorderservice_getresourcelocks": ".getResourceLocks()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L76 | neighbors=[ProductionOrderService, .assignLineResources(), .buildPlanRow(), .getAvailableResources(), .updateLineFull()]
- "production_orders_types_producttype": "ProductType" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L4 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, ProductionOrderPlanningPage.tsx, types.ts, planning-dialog.ts]
- "providers_layoutprovider": "LayoutProvider.tsx" | kind=code-symbol | source=client/src/app/providers/LayoutProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, LayoutProvider(), tooltip.tsx, TooltipProvider()]
- "providers_queryprovider": "QueryProvider.tsx" | kind=code-symbol | source=client/src/app/providers/QueryProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, query-client.ts, queryClient, QueryProvider()]
- "providers_themeprovider": "ThemeProvider.tsx" | kind=code-symbol | source=client/src/app/providers/ThemeProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, ThemeProvider(), ui-store.ts, useUiStore]
- "providers_toastprovider": "ToastProvider.tsx" | kind=code-symbol | source=client/src/app/providers/ToastProvider.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ToastProvider(), sonner.tsx, Toaster(), app.ts]
- "schemas_purchase_schemas": "purchase-schemas.ts" | kind=code-symbol | source=client/src/features/purchases/schemas/purchase-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PurchaseForm.tsx, purchaseSchema, PurchaseSchemaInput]
- "scripts_migrate_modules": "migrate-modules.mjs" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ALL, argv, DRY, requested]
- "tables_woven_production_lines_table": "woven-production-lines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-production-lines.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, size-plans.ts, SizePlan, wovenProductionLines, f5f1f47 feat: woven labels foundation —…]
- "tables_woven_work_order_details_table": "woven-work-order-details.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-work-order-details.table.ts:L1 | neighbors=[2e755d6 feat(server): persist estimated…, ee6d4dd refactor(server): vertical-slic…, wovenWorkOrderDetails, 9b99ce1 feat: complete production workf…, f5f1f47 feat: woven labels foundation —…]
- "thread_dyeing_thread_dyeing_routes": "thread-dyeing.routes.ts" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, validateRequest.ts, validateParams(), validateRequest(), router]
- "thread_service_provider_thread_service_provider_routes": "thread-service-provider.routes.ts" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, validateRequest.ts, validateParams(), validateRequest(), router]
- "thread_service_provider_thread_service_provider_schema": "thread-service-provider.schema.ts" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, CreateThreadServiceProviderDTO, createThreadServiceProviderSchema, UpdateThreadServiceProviderDTO, updateThreadServiceProviderSchema]
- "thread_types_thread_base_colors": "THREAD_BASE_COLORS" | kind=code-symbol | source=client/src/features/thread/types.ts:L6 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, thread-schemas.ts, index.ts, types.ts]
- "thread_types_threadstock": "ThreadStock" | kind=code-symbol | source=client/src/features/thread/types.ts:L16 | neighbors=[ThreadStockDialog.tsx, ThreadStockPanel.tsx, thread-service.ts, index.ts, types.ts]
- "tox_main": "main()" | kind=code-symbol | source=tox.mjs:L159 | neighbors=[tox.mjs, fail(), info(), parseArgs(), runEnv()]
- "types_index": "index.ts" | kind=code-symbol | source=server/src/types/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, inferInsert, inferSelect, schema.ts]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L23 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L36 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-015.json

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
