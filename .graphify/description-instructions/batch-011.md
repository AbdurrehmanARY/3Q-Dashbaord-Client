# Node Description Batch 12 of 53

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=client/src/components/ui/toggle.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Toggle(), toggleVariants, toggle-group.tsx]
- "users_user_schema": "user.schema.ts" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateUserDTO, createUserSchema, UpdateUserDTO, updateUserSchema, userRoleSchema]
- "users_users_routes": "users.routes.ts" | kind=code-symbol | source=server/src/modules/users/users.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "work_orders_types_work_order_status_meta": "WORK_ORDER_STATUS_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L49 | neighbors=[RecentWorkOrders.tsx, work-order-columns.tsx, work-order-table.tsx, WorkOrderDialog.tsx, WorkOrderDetailPage.tsx, types.ts]
- "work_orders_work_orders_routes": "work-orders.routes.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-orders.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@adfafe75dc3b508c99025b6f29034770a85fdad2": "adfafe7 polish: nav + page copy for the two product lines" | kind=Commit | source=git | neighbors=[3e6a631 feat: woven production client U…, chore/ci, cc50221 feat: dispatched status + FBR i…, WorkOrderListPage.tsx, navigation.ts]
- "companies_company_schema": "company.schema.ts" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateCompanyDTO, createCompanySchema, UpdateCompanyDTO, updateCompanySchema]
- "components_planlabeltypedialog_unifiedplanningdialog": "UnifiedPlanningDialog()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L25 | neighbors=[PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]
- "config_logger_logger_formatmessage": ".formatMessage()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L11 | neighbors=[Logger, .debug(), .error(), .info(), .warn()]
- "data_table_data_table_export_exportrowstoexcel": "exportRowsToExcel()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L34 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, toRecords(), index.ts]
- "data_table_sticky_columns": "sticky-columns.ts" | kind=code-symbol | source=client/src/shared/components/data-table/sticky-columns.ts:L1 | neighbors=[cc50221 feat: dispatched status + FBR i…, index.ts, stickyCellClass(), utils.ts, cn()]
- "db_clear_all_tables": "clear-all-tables.ts" | kind=code-symbol | source=server/src/shared/db/clear-all-tables.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, clearAll(), index.ts, db, 9b99ce1 feat: complete production workf…]
- "db_migrate_speed_column": "migrate-speed-column.ts" | kind=code-symbol | source=server/src/shared/db/migrate-speed-column.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateSpeedColumn(), index.ts]
- "db_test_mail": "test-mail.ts" | kind=code-symbol | source=server/src/shared/db/test-mail.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, main(), mail.service.ts, MailService, 9b99ce1 feat: complete production workf…]
- "drizzle_0000_lovely_imperial_guard_production_progress": "production_progress" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L74 | neighbors=[0000_lovely_imperial_guard.sql, public.machines, public.materials, public.operators, public.work_orders]
- "drizzle_0000_lovely_imperial_guard_public_materials": "public.materials" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L168 | neighbors=[0000_lovely_imperial_guard.sql, inventory_rolls, production_progress, purchase_records, roll_allocations]
- "drizzle_0004_production_roll_issuances": "0004_production_roll_issuances.sql" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, production_roll_issuances, public.materials, public.production_order_lines, public.users]
- "drizzle_0014_last_meteorite": "0014_last_meteorite.sql" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L1 | neighbors=[c27dc7d feat(server): stock CRUD histor…, inventory_roll_movements, operators, public.inventory_rolls, public.users]
- "drizzle_0017_glorious_captain_america": "0017_glorious_captain_america.sql" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L1 | neighbors=[9b99ce1 feat: complete production workf…, ink_consumptions, ink_purchases, public.operators, work_orders]
- "drizzle_0018_batch_material_flow": "0018_batch_material_flow.sql" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, production_order_lines, users]
- "errors_apierror_badrequesterror": "BadRequestError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L16 | neighbors=[ApiError.ts, ApiError, .constructor(), inventory.repository.ts, inventory-roll.repository.ts]
- "formulas_purchase_formula_calculateinvoiceweight": "calculateInvoiceWeight()" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L24 | neighbors=[seed.ts, seed-master.ts, purchase-formula.ts, purchase-formula.test.ts, inventory.service.ts]
- "formulas_purchase_formula_calculatetotalrollper200m": "calculateTotalRollPer200m()" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L14 | neighbors=[seed.ts, seed-master.ts, purchase-formula.ts, purchase-formula.test.ts, inventory.service.ts]
- "hooks_use_theme": "use-theme.ts" | kind=code-symbol | source=client/src/shared/hooks/use-theme.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useTheme(), ui-store.ts, useUiStore, ThemeToggle.tsx]
- "ink_ink_routes": "ink.routes.ts" | kind=code-symbol | source=server/src/modules/ink/ink.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateRequest()]
- "ink_types_inkpurchase": "InkPurchase" | kind=code-symbol | source=client/src/features/ink/types.ts:L3 | neighbors=[ink-purchase-columns.tsx, InkPurchaseDialog.tsx, types.ts, InkPurchasesPage.tsx, ink-service.ts]
- "inventory_inventory_schema": "inventory.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreatePurchaseDTO, createPurchaseSchema, UpdatePurchaseDTO, updatePurchaseSchema]
- "inventory_material_schema": "material.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/material.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateMaterialDTO, createMaterialSchema, UpdateMaterialDTO, updateMaterialSchema]
- "machines_machine_schema": "machine.schema.ts" | kind=code-symbol | source=server/src/modules/machines/machine.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateMachineDTO, createMachineSchema, UpdateMachineDTO, updateMachineSchema]
- "machines_operators_types_operator_type_meta": "OPERATOR_TYPE_META" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L37 | neighbors=[machine-columns.tsx, operator-columns.tsx, operator-table.tsx, OperatorDialog.tsx, types.ts]
- "pages_labelsheetspage": "LabelSheetsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/LabelSheetsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LabelSheetsPage()]
- "pages_localsheetspage": "LocalSheetsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/LocalSheetsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LocalSheetsPage()]
- "pages_stickermaterialspage": "StickerMaterialsPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/StickerMaterialsPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, MaterialReceiptPage(), StickerMaterialsPage()]
- "production_orders_types_planlineinput": "PlanLineInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L341 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, use-production-orders.ts, types.ts, production-order-service.ts]
- "providers_layoutprovider": "LayoutProvider.tsx" | kind=code-symbol | source=client/src/app/providers/LayoutProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, LayoutProvider(), tooltip.tsx, TooltipProvider()]
- "providers_queryprovider": "QueryProvider.tsx" | kind=code-symbol | source=client/src/app/providers/QueryProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, query-client.ts, queryClient, QueryProvider()]
- "providers_themeprovider": "ThemeProvider.tsx" | kind=code-symbol | source=client/src/app/providers/ThemeProvider.tsx:L1 | neighbors=[AppProviders.tsx, c0c79ec Initial commit: Label Manufactu…, ThemeProvider(), ui-store.ts, useUiStore]
- "providers_toastprovider": "ToastProvider.tsx" | kind=code-symbol | source=client/src/app/providers/ToastProvider.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ToastProvider(), sonner.tsx, Toaster(), app.ts]
- "schemas_purchase_schemas": "purchase-schemas.ts" | kind=code-symbol | source=client/src/features/purchases/schemas/purchase-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PurchaseForm.tsx, purchaseSchema, PurchaseSchemaInput]
- "scripts_migrate_modules": "migrate-modules.mjs" | kind=code-symbol | source=server/scripts/migrate-modules.mjs:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ALL, argv, DRY, requested]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-011.json

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
