# Node Description Batch 10 of 53

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

- "formulas_purchase_formula": "purchase-formula.ts" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, seed.ts, seed-master.ts, calculateInvoiceWeight(), calculateTotalRollPer200m(), purchase-formula.test.ts]
- "hooks_use_completion_celebration": "use-completion-celebration.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-completion-celebration.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useCompletionCelebration(), celebrate.ts, celebrateCompletion(), types.ts, ProductionOrderStatus]
- "ink_ink_repository": "ink.repository.ts" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewInkConsumption, NewInkPurchase]
- "ink_ink_schema": "ink.schema.ts" | kind=code-symbol | source=server/src/modules/ink/ink.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateInkConsumptionDTO, createInkConsumptionSchema, CreateInkPurchaseDTO, createInkPurchaseSchema, UpdateInkPurchaseDTO]
- "inventory_inventory_roll_service_inventoryrollservice": "InventoryRollService" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L39 | neighbors=[inventory-roll.service.ts, .createInventoryRoll(), .deleteInventoryRoll(), .getInventoryRollByMaterialCode(), .getInventoryRolls(), .getMovements()]
- "inventory_inventory_service_inventoryservice": "InventoryService" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L39 | neighbors=[inventory.service.ts, .createPurchase(), .deletePurchase(), .getPurchase(), .getPurchases(), .getStock()]
- "inventory_material_repository": "material.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Material, index.ts]
- "inventory_material_repository_materialrepository": "MaterialRepository" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L7 | neighbors=[material.repository.ts, .create(), .findAll(), .findByCode(), .findById(), .softDelete()]
- "inventory_material_service_materialservice": "MaterialService" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L7 | neighbors=[material.service.ts, .createMaterial(), .deleteMaterial(), .getMaterialByCode(), .getMaterialById(), .getMaterials()]
- "lib_format_formatdatetime": "formatDateTime()" | kind=code-symbol | source=client/src/lib/format.ts:L27 | neighbors=[ink-consumption-columns.tsx, ProductionSummary.tsx, roll-stock-row-actions.tsx, StockReconciliationCard.tsx, WovenProductionPanel.tsx, format.ts]
- "lib_format_test": "format.test.ts" | kind=code-symbol | source=client/src/lib/format.test.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, format.ts, calculateRequiredRolls(), calculateTotalRolls(), formatDate(), formatNumber()]
- "machines_machine_repository": "machine.repository.ts" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Machine, MachineProductType]
- "materials_types_material": "Material" | kind=code-symbol | source=client/src/features/materials/types.ts:L1 | neighbors=[material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, index.ts, types.ts]
- "middleware_index": "index.ts" | kind=code-symbol | source=server/src/shared/middleware/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, rateLimiter.ts, apiRateLimiter, authRateLimiter, validateRequest.ts, validateRequest()]
- "operators_operator_schema": "operator.schema.ts" | kind=code-symbol | source=server/src/modules/operators/operator.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, avatarUrlSchema, CreateOperatorDTO, createOperatorSchema, operatorTypeEnum, UpdateOperatorDTO]
- "pages_machinespage": "MachinesPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesPage.tsx:L1 | neighbors=[routes.tsx, c27dc7d feat(server): stock CRUD histor…, machine-table.tsx, MachineTable(), PageHeader.tsx, PageHeader()]
- "pages_operatorspage": "OperatorsPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/OperatorsPage.tsx:L1 | neighbors=[routes.tsx, c27dc7d feat(server): stock CRUD histor…, operator-table.tsx, OperatorTable(), PageHeader.tsx, PageHeader()]
- "pages_rollstockpage": "RollStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/RollStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, inventory-stock-table.tsx, InventoryStockTable(), PageHeader.tsx, PageHeader()]
- "production_orders_types_productionorder": "ProductionOrder" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L40 | neighbors=[production-order-columns.tsx, production-order-row-actions.tsx, production-order-table.tsx, index.ts, types.ts, ProductionOrderDetail]
- "schemas_ink_schemas": "ink-schemas.ts" | kind=code-symbol | source=client/src/features/ink/schemas/ink-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog.tsx, InkPurchaseDialog.tsx, inkConsumptionSchema, InkConsumptionSchemaInput, inkPurchaseSchema]
- "segmented_tabs_segmentedtabs": "SegmentedTabs.tsx" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/SegmentedTabs.tsx:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, index.ts, utils.ts, cn(), SegmentedOption, SegmentedTabs()]
- "services_dashboard_service": "dashboard-service.ts" | kind=code-symbol | source=client/src/features/dashboard/services/dashboard-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-dashboard.ts, types.ts, KpiResponse, api.ts, api]
- "services_mail_service": "mail.service.ts" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, test-mail.ts, env.ts, env, MailService, ProductionOrderEmailData]
- "store_ui_store": "ui-store.ts" | kind=code-symbol | source=client/src/store/ui-store.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-theme.ts, ThemeProvider.tsx, Theme, UiState, useUiStore]
- "tables_production_order_lines_table": "production-order-lines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-order-lines.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, size-plans.ts, SizePlan, productionOrderLines, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…]
- "theme_toggle_themetoggle": "ThemeToggle.tsx" | kind=code-symbol | source=client/src/shared/components/theme-toggle/ThemeToggle.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppHeader.tsx, use-theme.ts, useTheme(), ThemeToggle(), button.tsx]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Accordion(), AccordionContent(), AccordionItem()]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=client/src/components/ui/separator.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-toolbar.tsx, AppHeader.tsx, utils.ts, cn(), Separator()]
- "ui_textarea_textarea": "Textarea" | kind=code-symbol | source=client/src/components/ui/textarea.tsx:L9 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, input-group.tsx]
- "users_user_repository": "user.repository.ts" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewUser, User]
- "users_user_repository_userrepository": "UserRepository" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L6 | neighbors=[user.repository.ts, .create(), .findAll(), .findByEmail(), .findById(), .softDelete()]
- "users_user_service_userservice": "UserService" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L8 | neighbors=[user.service.ts, .assertActor(), .createUser(), .deleteUser(), .getUser(), .getUsers()]
- "work_orders_work_order_service_workorderservice": "WorkOrderService" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L13 | neighbors=[work-order.service.ts, .createWorkOrder(), .deleteWorkOrder(), .dispatchWorkOrder(), .getWorkOrder(), .getWorkOrders()]
- "cards_statcard_statcard": "StatCard()" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L22 | neighbors=[StatCard.tsx, ProductionSummaryCard.tsx, ThreadStockPanel.tsx, WovenProductionPanel.tsx, DashboardPage.tsx, ProductionOrderDashboardPage.tsx]
- "companies_company_routes": "company.routes.ts" | kind=code-symbol | source=server/src/modules/companies/company.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "companies_types_brand": "Brand" | kind=code-symbol | source=client/src/features/companies/types.ts:L13 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, company-service.ts]
- "components_combobox": "combobox.tsx" | kind=code-symbol | source=client/src/shared/components/combobox.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, combobox.tsx, ComboboxOption, ComboboxSelect(), ComboboxSelectProps]
- "components_workorderdialog_workorderdialog": "WorkOrderDialog()" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderDialog.tsx:L113 | neighbors=[work-order-row-actions.tsx, WorkOrderDialog.tsx, defaultsFor(), WorkOrderDetailPage.tsx, WorkOrderListPage.tsx, index.ts]
- "config_database": "database.ts" | kind=code-symbol | source=server/src/shared/config/database.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, databaseConfig, env.ts, env, drizzle.ts, c0c79ec Initial commit: Label Manufactu…]
- "config_env_env": "env" | kind=code-symbol | source=server/src/shared/config/env.ts:L18 | neighbors=[database.ts, env.ts, drizzle.ts, mail.service.ts, app.ts, index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-009.json

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
