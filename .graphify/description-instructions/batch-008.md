# Node Description Batch 9 of 74

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

- "scripts_verify_migration": "verify-migration.mjs" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, files, findings, GONE_ALIASES, GONE_DIR_RE, GONE_LAYER_DIRS]
- "tests_architecture_test": "architecture.test.ts" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, ee6d4dd refactor(server): vertical-slic…, ALLOWED_CROSS_MODULE_REPO_EDGES, files, graph, rel()]
- "thread_dyeing_thread_dyeing_repository": "thread-dyeing.repository.ts" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.repository.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, index.ts, db, schema.ts, NewThreadDyeingAllocation, NewThreadDyeingReceive]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, OperatorAvatar.tsx, nav-user.tsx, utils.ts, cn(), Avatar()]
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L1 | neighbors=[AppBreadcrumb.tsx, c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Breadcrumb(), BreadcrumbEllipsis()]
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L81 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ThreadPurchasePanel.tsx]
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L55 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ThreadPurchasePanel.tsx]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, c0c79ec Initial commit: Label Manufactu…, InkConsumptionPage.tsx, ThreadDyeingPage.tsx, utils.ts, cn()]
- "users_user_service": "user.service.ts" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, User]
- "work_orders_work_order_repository_workorderrepository": "WorkOrderRepository" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L46 | neighbors=[work-order.repository.ts, .create(), .createWithWovenDetail(), .delete(), .findAll(), .findByDesignCode()]
- "woven_production_woven_production_repository_wovenproductionrepository": "WovenProductionRepository" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L40 | neighbors=[woven-production.repository.ts, .applyStageChangeTransaction(), .deleteLineTransaction(), .findLineById(), .findLines(), .findOrderContext()]
- "analytics_analytics_repository": "analytics.repository.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L1 | neighbors=[AnalyticsRepository, index.ts, db, schema.ts, InventoryRoll, Material]
- "analytics_analytics_repository_analyticsrepository": "AnalyticsRepository" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L6 | neighbors=[analytics.repository.ts, .countActiveProductionProgress(), .countCompletedProductionProgress(), .countLowStock(), .countMaterials(), .countProductionProgress()]
- "batch_and_runs_resource_availability_service": "resource-availability.service.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L1 | neighbors=[Classification, classify(), MachineAvailability, MachineWithAvailability, OperatorAvailability, OperatorWithAvailability]
- "breadcrumb_appbreadcrumb": "AppBreadcrumb.tsx" | kind=code-symbol | source=client/src/shared/components/breadcrumb/AppBreadcrumb.tsx:L1 | neighbors=[AppBreadcrumb(), pathToSegments(), breadcrumb.tsx, Breadcrumb(), BreadcrumbItem(), BreadcrumbList()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@2e755d6c9a8f03f8c7e822945b96a6845be34b54": "2e755d6 feat(server): persist estimated weaving hours for woven work orders" | kind=Commit | source=git | neighbors=[chore/ci, 7d4a38d feat(client): batch planning an…, 0024_woven_estimated_weaving_hours.sql, verify-estimated-weaving.mjs, woven-work-order-details.table.ts, work-order.helpers.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@3e6a631cfbebe35cb199e8f0c6066ca93eaa6c56": "3e6a631 feat: woven production client UI, branching off the shared dashboard" | kind=Commit | source=git | neighbors=[chore/ci, adfafe7 polish: nav + page copy for the…, WovenProductionPanel.tsx, use-woven-production.ts, ProductionOrderDashboardPage.tsx, types.ts]
- "companies_index": "index.ts" | kind=code-symbol | source=client/src/features/companies/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, types.ts, Brand, Company, CompanySelect.tsx, CompanySelect()]
- "components_artworkandcomment": "ArtworkAndComment.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/ArtworkAndComment.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c401a21 feat(client): weaving-time disp…, ArtworkAndComment(), work-order-schemas.ts, WorkOrderSchemaInput, label.tsx]
- "components_brand_columns": "brand-columns.tsx" | kind=code-symbol | source=client/src/features/companies/components/brand-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, types.ts, Brand, Company, createBrandColumns()]
- "components_dispatchinfo": "DispatchInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c401a21 feat(client): weaving-time disp…, DispatchInfo(), AppInput.tsx, AppInput, ImageUploadField.tsx]
- "components_index": "index.ts" | kind=code-symbol | source=client/src/features/companies/components/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, BrandDialog.tsx, BrandTable.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "components_progress_table_styles": "progress-table-styles.ts" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx, alignClass()]
- "components_stagedeductionflowcard": "StageDeductionFlowCard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/StageDeductionFlowCard.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, AppCard.tsx, AppCard, StageDeductionFlowCard(), StageDeductionFlowCardProps]
- "components_woventrackingtable": "WovenTrackingTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenTrackingTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c27dc7d feat(server): stock CRUD histor…, WovenProductionPanel.tsx, woven-columns.tsx, wovenColumns, WovenTrackingTable()]
- "config_env": "env.ts" | kind=code-symbol | source=server/src/shared/config/env.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, database.ts, env, envSchema, drizzle.ts, mail.service.ts]
- "config_logger": "logger.ts" | kind=code-symbol | source=server/src/shared/config/logger.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, colors, Logger, LogLevel, drizzle.ts, ApiError.ts]
- "data_table_data_table_toolbar": "data-table-toolbar.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-toolbar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DataTableToolbar(), DataTableToolbarProps, button.tsx, Button, input.tsx]
- "db_apply_migration": "apply-migration.ts" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, client, __dirname, __filename, files, maskedUrl]
- "drizzle_0019_batch_flow_sync": "0019_batch_flow_sync.sql" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, production_order_lines, production_stage_transactions, public.machines]
- "errors_errorhandler": "errorHandler.ts" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, logger.ts, Logger, ApiError.ts, ApiError, asPgError()]
- "hooks_use_production_runs": "use-production-runs.ts" | kind=code-symbol | source=client/src/features/production-runs/hooks/use-production-runs.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, LogProductionRunDialog.tsx, ProductionRunsSection.tsx, PRODUCTION_RUN_KEYS, useLogProductionRun(), useProductionSummary()]
- "ink_ink_service_inkservice": "InkService" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L14 | neighbors=[ink.service.ts, .consumptionByOperator(), .createConsumption(), .createPurchase(), .listConsumptions(), .listPurchases()]
- "inventory_inventory_roll_repository_inventoryrollrepository": "InventoryRollRepository" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L39 | neighbors=[inventory-roll.repository.ts, .countAll(), .createWithHistory(), .delete(), .findAll(), .findByMaterialCode()]
- "material_receipts_material_receipts_repository": "material-receipts.repository.ts" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, index.ts, db, schema.ts, NewLabelSheet, NewLocalSheet]
- "material_receipts_material_receipts_service": "material-receipts.service.ts" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, messages.ts, Entity, Messages, ApiError.ts, NotFoundError]
- "materials_types": "types.ts" | kind=code-symbol | source=client/src/features/materials/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, use-materials.ts]
- "production_orders_woven_types_wovenlineoverview": "WovenLineOverview" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L17 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, woven-columns.tsx, WovenProductionPanel.tsx, WovenTrackingTable.tsx, index.ts]
- "schemas_thread_schemas": "thread-schemas.ts" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, dyeBatchSchema, DyeBatchSchemaInput, threadPurchaseSchema]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, date-picker.tsx, utils.ts, cn(), Popover(), PopoverContent()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-008.json

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
