# Node Description Batch 13 of 74

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

- "services_mail_service": "mail.service.ts" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, test-mail.ts, env.ts, env, MailService, ProductionOrderEmailData]
- "store_table_visibility_store_test": "table-visibility-store.test.ts" | kind=code-symbol | source=client/src/store/table-visibility-store.test.ts:L1 | neighbors=[2c8bd34 feat(client): per-table column …, table-visibility-store.ts, EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), resetStore(), useTableColumnVisibility()]
- "store_ui_store": "ui-store.ts" | kind=code-symbol | source=client/src/store/ui-store.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-theme.ts, ThemeProvider.tsx, Theme, UiState, useUiStore]
- "theme_toggle_themetoggle": "ThemeToggle.tsx" | kind=code-symbol | source=client/src/shared/components/theme-toggle/ThemeToggle.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppHeader.tsx, use-theme.ts, useTheme(), ThemeToggle(), button.tsx]
- "thread_dyeing_thread_dyeing_repository_threaddyeingrepository": "ThreadDyeingRepository" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L13 | neighbors=[thread-dyeing.repository.ts, .findAllocationsForSends(), .findReceivesForSends(), .findSendById(), .findSends(), .receiveDyedTransaction()]
- "thread_dyeing_thread_dyeing_schema": "thread-dyeing.schema.ts" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, baseColorEnum, CreateDyeingSendDTO, createDyeingSendSchema, denierEnum, ReceiveDyeingDTO]
- "thread_inventory_thread_inventory_service": "thread-inventory.service.ts" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, ApiError.ts, ApiError, NotFoundError, DyeBatchInput, ThreadInventoryService]
- "thread_service_provider_thread_service_provider_service": "thread-service-provider.service.ts" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, messages.ts, Entity, Messages, ApiError.ts, NotFoundError]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=client/src/components/ui/accordion.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Accordion(), AccordionContent(), AccordionItem()]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=client/src/components/ui/separator.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-toolbar.tsx, AppHeader.tsx, utils.ts, cn(), Separator()]
- "ui_textarea_textarea": "Textarea" | kind=code-symbol | source=client/src/components/ui/textarea.tsx:L9 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, input-group.tsx]
- "users_user_repository": "user.repository.ts" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewUser, User]
- "users_user_repository_userrepository": "UserRepository" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L6 | neighbors=[user.repository.ts, .create(), .findAll(), .findByEmail(), .findById(), .softDelete()]
- "users_user_service_userservice": "UserService" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L8 | neighbors=[user.service.ts, .assertActor(), .createUser(), .deleteUser(), .getUser(), .getUsers()]
- "work_orders_work_order_service_workorderservice": "WorkOrderService" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L13 | neighbors=[work-order.service.ts, .createWorkOrder(), .deleteWorkOrder(), .dispatchWorkOrder(), .getWorkOrder(), .getWorkOrders()]
- "work_orders_work_orders_routes": "work-orders.routes.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-orders.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "woven_production_woven_production_service_wovenproductionservice_getlineorthrow": ".getLineOrThrow()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L33 | neighbors=[WovenProductionService, .deleteLine(), .planLine(), .reconcileRemainingThreads(), .updateCutting(), .updatePackaging()]
- "batch_and_runs_batch_flow_helpers_round2": "round2()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L134 | neighbors=[batch-flow.helpers.ts, assertOutputWithinInput(), assertWithinAvailable(), assertWithinPlan(), batchPositionOf(), lineFlowOf()]
- "batch_and_runs_production_run_repository": "production-run.repository.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L1 | neighbors=[ProductionRunRepository, index.ts, db, schema.ts, NewProductionRun, 558dd8a refactor(server): split flat do…]
- "cards_statcard_statcard": "StatCard()" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L22 | neighbors=[StatCard.tsx, ProductionSummaryCard.tsx, ThreadStockPanel.tsx, WovenProductionPanel.tsx, DashboardPage.tsx, ProductionOrderDashboardPage.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@efa0e77cc9f18e887c7b59a2f278a26f7ea11435": "efa0e77 chore(db): repair migration journal; provision fresh DBs from a pg_dump…" | kind=Commit | source=git | neighbors=[8221c40 chore(scripts,docs): default th…, live-schema.sql, chore/ci, 95ce13e feat(production): make cutting …, dump-baseline.mjs, reconcile-migrations.mjs]
- "companies_company_routes": "company.routes.ts" | kind=code-symbol | source=server/src/modules/companies/company.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "companies_types_brand": "Brand" | kind=code-symbol | source=client/src/features/companies/types.ts:L13 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, company-service.ts]
- "components_combobox": "combobox.tsx" | kind=code-symbol | source=client/src/shared/components/combobox.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, combobox.tsx, ComboboxOption, ComboboxSelect(), ComboboxSelectProps]
- "components_workorderdialog_workorderdialog": "WorkOrderDialog()" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderDialog.tsx:L115 | neighbors=[work-order-row-actions.tsx, WorkOrderDialog.tsx, defaultsFor(), WorkOrderDetailPage.tsx, WorkOrderListPage.tsx, index.ts]
- "config_database": "database.ts" | kind=code-symbol | source=server/src/shared/config/database.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, databaseConfig, env.ts, env, drizzle.ts, c0c79ec Initial commit: Label Manufactu…]
- "config_env_env": "env" | kind=code-symbol | source=server/src/shared/config/env.ts:L18 | neighbors=[database.ts, env.ts, drizzle.ts, mail.service.ts, app.ts, index.ts]
- "data_table_editable_cell_number": "editable-cell-number.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell-number.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, editable-cell.tsx, EditableCellInput(), EditableCellNumber(), useEditableCell(), index.ts]
- "data_table_types": "types.ts" | kind=code-symbol | source=client/src/shared/components/data-table/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, data-table.tsx, index.ts, ColumnMeta, TableMeta]
- "db_migrate_machines": "migrate-machines.ts" | kind=code-symbol | source=server/src/shared/db/migrate-machines.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateMachinesTable(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_migrate_production_runs": "migrate-production-runs.ts" | kind=code-symbol | source=server/src/shared/db/migrate-production-runs.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateProductionRuns(), schema.ts, 9b99ce1 feat: complete production workf…]
- "db_migrate_reconciliation_columns": "migrate-reconciliation-columns.ts" | kind=code-symbol | source=server/src/shared/db/migrate-reconciliation-columns.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateReconciliationColumns(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_migrate_remaining_weight": "migrate-remaining-weight.ts" | kind=code-symbol | source=server/src/shared/db/migrate-remaining-weight.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateRemainingWeightColumns(), 9b99ce1 feat: complete production workf…, index.ts]
- "db_reset_production": "reset-production.ts" | kind=code-symbol | source=server/src/shared/db/reset-production.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, reset(), schema.ts, c0c79ec Initial commit: Label Manufactu…]
- "db_schema_wovenproductionline": "WovenProductionLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L129 | neighbors=[schema.ts, woven-production.helpers.ts, woven-production.helpers.test.ts, woven-production.repository.ts, woven-production.service.ts, woven-production-service.ts]
- "error_boundary_errorboundary": "ErrorBoundary.tsx" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ErrorBoundary, Props, State, AppLayout.tsx, app.ts]
- "feedback_imagepreview": "ImagePreview.tsx" | kind=code-symbol | source=client/src/components/feedback/ImagePreview.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, ImagePreview(), ImagePreviewProps, utils.ts, cn(), ImageUploadField.tsx]
- "forms_index": "index.ts" | kind=code-symbol | source=client/src/components/forms/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, AppButton.tsx, AppCombobox.tsx, AppInput.tsx, AppSelect.tsx]
- "formulas_production_formula_test": "production-formula.test.ts" | kind=code-symbol | source=server/src/shared/formulas/production-formula.test.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, production-formula.ts, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct()]
- "hooks_use_dashboard": "use-dashboard.ts" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DASHBOARD_KEYS, useDashboardKpis(), dashboard-service.ts, dashboardService, DashboardPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-012.json

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
