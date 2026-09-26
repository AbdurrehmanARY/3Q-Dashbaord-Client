# Node Description Batch 11 of 53

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

- "data_table_editable_cell_number": "editable-cell-number.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell-number.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, editable-cell.tsx, EditableCellInput(), EditableCellNumber(), useEditableCell(), index.ts]
- "data_table_types": "types.ts" | kind=code-symbol | source=client/src/shared/components/data-table/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, data-table.tsx, index.ts, ColumnMeta, TableMeta]
- "db_migrate_machines": "migrate-machines.ts" | kind=code-symbol | source=server/src/shared/db/migrate-machines.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateMachinesTable(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_migrate_production_runs": "migrate-production-runs.ts" | kind=code-symbol | source=server/src/shared/db/migrate-production-runs.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateProductionRuns(), schema.ts, 9b99ce1 feat: complete production workf…]
- "db_migrate_reconciliation_columns": "migrate-reconciliation-columns.ts" | kind=code-symbol | source=server/src/shared/db/migrate-reconciliation-columns.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateReconciliationColumns(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_migrate_remaining_weight": "migrate-remaining-weight.ts" | kind=code-symbol | source=server/src/shared/db/migrate-remaining-weight.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateRemainingWeightColumns(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_reset_production": "reset-production.ts" | kind=code-symbol | source=server/src/shared/db/reset-production.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, reset(), schema.ts, c0c79ec Initial commit: Label Manufactu…]
- "error_boundary_errorboundary": "ErrorBoundary.tsx" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ErrorBoundary, Props, State, AppLayout.tsx, app.ts]
- "feedback_imagepreview": "ImagePreview.tsx" | kind=code-symbol | source=client/src/components/feedback/ImagePreview.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, ImagePreview(), ImagePreviewProps, utils.ts, cn(), ImageUploadField.tsx]
- "forms_index": "index.ts" | kind=code-symbol | source=client/src/components/forms/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, AppButton.tsx, AppCombobox.tsx, AppInput.tsx, AppSelect.tsx]
- "formulas_production_formula_test": "production-formula.test.ts" | kind=code-symbol | source=server/src/shared/formulas/production-formula.test.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, production-formula.ts, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct()]
- "hooks_use_dashboard": "use-dashboard.ts" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DASHBOARD_KEYS, useDashboardKpis(), dashboard-service.ts, dashboardService, DashboardPage.tsx]
- "inventory_inventory_roll_routes": "inventory-roll.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "inventory_inventory_routes": "inventory.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "inventory_material_routes": "material.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/material.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "lib_celebrate": "celebrate.ts" | kind=code-symbol | source=client/src/lib/celebrate.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-completion-celebration.ts, celebrateCompletion(), fireConfetti(), playSuccessChime(), prefersReducedMotion()]
- "machines_machine_repository_machinerepository": "MachineRepository" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L8 | neighbors=[machine.repository.ts, .create(), .findAll(), .findById(), .softDelete(), .update()]
- "machines_machine_routes": "machine.routes.ts" | kind=code-symbol | source=server/src/modules/machines/machine.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "machines_machine_service_machineservice": "MachineService" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L7 | neighbors=[machine.service.ts, .createMachine(), .deleteMachine(), .getMachine(), .getMachines(), .updateMachine()]
- "machines_operators_types_machine": "Machine" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L9 | neighbors=[machine-columns.tsx, machine-row-actions.tsx, MachineDialog.tsx, index.ts, types.ts, entity-service.ts]
- "machines_operators_types_operator": "Operator" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L46 | neighbors=[operator-columns.tsx, operator-row-actions.tsx, OperatorDialog.tsx, index.ts, types.ts, entity-service.ts]
- "middleware_ratelimiter": "rateLimiter.ts" | kind=code-symbol | source=server/src/shared/middleware/rateLimiter.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, apiRateLimiter, authRateLimiter, app.ts, c0c79ec Initial commit: Label Manufactu…]
- "operators_operator_repository_operatorrepository": "OperatorRepository" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L21 | neighbors=[operator.repository.ts, .create(), .findAll(), .findById(), .softDelete(), .update()]
- "operators_operator_routes": "operator.routes.ts" | kind=code-symbol | source=server/src/modules/operators/operator.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "operators_operator_service_operatorservice": "OperatorService" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L14 | neighbors=[operator.service.ts, .createOperator(), .deleteOperator(), .getOperator(), .getOperators(), .updateOperator()]
- "pages_dyedthreadstockpage": "DyedThreadStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/DyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), DyedThreadStockPage(), index.ts]
- "pages_threadpurchasespage": "ThreadPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/purchases/pages/ThreadPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), ThreadPurchasesPage(), index.ts]
- "pages_undyedthreadstockpage": "UndyedThreadStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/UndyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), UndyedThreadStockPage(), index.ts]
- "production_orders_types_productionorderoverview": "ProductionOrderOverview" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L299 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, index.ts, types.ts, production-order-service.ts, line-draft.ts]
- "production_orders_woven_types_planwoveninput": "PlanWovenInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L101 | neighbors=[PlanLabelTypeDialog.tsx, WovenPlanningForm.tsx, WovenProductionPanel.tsx, use-woven-production.ts, woven-types.ts, woven-production-service.ts]
- "purchases_types_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=client/src/features/purchases/types.ts:L1 | neighbors=[purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, types.ts, purchase-service.ts]
- "schemas_company_schemas": "company-schemas.ts" | kind=code-symbol | source=client/src/features/companies/schemas/company-schemas.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, CompanyDialog.tsx, brandSchema, BrandSchemaInput, companySchema, CompanySchemaInput]
- "segmented_tabs_index": "index.ts" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/index.ts:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, InventoryStockPage.tsx, PurchaseRecordPage.tsx, SegmentedTabs.tsx, SegmentedOption, SegmentedTabs()]
- "tables_thread_dyeing_workflow_table": "thread-dyeing-workflow.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadDyeingAllocations, threadDyeingReceives, threadDyeingSends, threadDyeingSendStatusEnum, 9b99ce1 feat: complete production workf…]
- "tables_thread_enums": "thread.enums.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadBaseColorEnum, threadDenierEnum, threadMovementTypeEnum, threadStockTypeEnum, f5f1f47 feat: woven labels foundation —…]
- "thread_types_thread_deniers": "THREAD_DENIERS" | kind=code-symbol | source=client/src/features/thread/types.ts:L2 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, thread-schemas.ts, index.ts, types.ts]
- "ui_card_card": "Card()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L5 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L72 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_input_input": "Input" | kind=code-symbol | source=client/src/components/ui/input.tsx:L13 | neighbors=[data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, input.tsx, input-group.tsx, sidebar.tsx]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L47 | neighbors=[nav-main.tsx, nav-user.tsx, sidebar.tsx, Sidebar(), SidebarRail(), SidebarTrigger()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-010.json

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
