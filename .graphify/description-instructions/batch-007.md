# Node Description Batch 8 of 53

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

- "config_logger": "logger.ts" | kind=code-symbol | source=server/src/shared/config/logger.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, colors, Logger, LogLevel, drizzle.ts, ApiError.ts]
- "data_table_data_table_toolbar": "data-table-toolbar.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-toolbar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DataTableToolbar(), DataTableToolbarProps, button.tsx, Button, input.tsx]
- "db_apply_migration": "apply-migration.ts" | kind=code-symbol | source=server/src/shared/db/apply-migration.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, client, __dirname, __filename, files, maskedUrl]
- "drizzle_0019_batch_flow_sync": "0019_batch_flow_sync.sql" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, production_order_lines, production_stage_transactions, public.machines]
- "errors_apierror_conflicterror": "ConflictError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L28 | neighbors=[company.service.ts, ApiError.ts, ApiError, .constructor(), inventory-roll.service.ts, material.service.ts]
- "errors_errorhandler": "errorHandler.ts" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, logger.ts, Logger, ApiError.ts, ApiError, asPgError()]
- "hooks_use_production_runs": "use-production-runs.ts" | kind=code-symbol | source=client/src/features/production-runs/hooks/use-production-runs.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, LogProductionRunDialog.tsx, ProductionRunsSection.tsx, PRODUCTION_RUN_KEYS, useLogProductionRun(), useProductionSummary()]
- "ink_ink_service_inkservice": "InkService" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L14 | neighbors=[ink.service.ts, .consumptionByOperator(), .createConsumption(), .createPurchase(), .listConsumptions(), .listPurchases()]
- "inventory_inventory_roll_repository_inventoryrollrepository": "InventoryRollRepository" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L39 | neighbors=[inventory-roll.repository.ts, .countAll(), .createWithHistory(), .delete(), .findAll(), .findByMaterialCode()]
- "materials_types": "types.ts" | kind=code-symbol | source=client/src/features/materials/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-columns.tsx, material-row-actions.tsx, MaterialForm.tsx, PurchaseForm.tsx, use-materials.ts]
- "middleware_validaterequest_validateparams": "validateParams()" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L56 | neighbors=[company.routes.ts, ink.routes.ts, inventory-roll.routes.ts, inventory.routes.ts, material.routes.ts, machine.routes.ts]
- "schemas_thread_schemas": "thread-schemas.ts" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, dyeBatchSchema, DyeBatchSchemaInput, threadPurchaseSchema]
- "tests_architecture_test": "architecture.test.ts" | kind=code-symbol | source=server/src/shared/__tests__/architecture.test.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ALLOWED_CROSS_MODULE_REPO_EDGES, files, graph, rel(), resolve()]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=client/src/components/ui/popover.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, date-picker.tsx, utils.ts, cn(), Popover(), PopoverContent()]
- "ui_table_table": "Table()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L7 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L32 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L68 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L22 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=client/src/components/ui/textarea.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx]
- "work_orders_index": "index.ts" | kind=code-symbol | source=client/src/features/work-orders/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, RecentWorkOrders.tsx, use-dashboard-trends.ts, DashboardPage.tsx, WorkOrderDialog.tsx, WorkOrderDialog()]
- "app_appproviders": "AppProviders.tsx" | kind=code-symbol | source=client/src/app/AppProviders.tsx:L1 | neighbors=[AppProviders(), LayoutProvider.tsx, LayoutProvider(), QueryProvider.tsx, QueryProvider(), ThemeProvider.tsx]
- "app_approutes": "AppRoutes.tsx" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L1 | neighbors=[AppRoutes(), PageFallback(), routes.tsx, redirects, routes, AppLayout.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@09c4b95a720994bedbb635c676aefc0181252f3f": "09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page" | kind=Commit | source=git | neighbors=[chore/ci, a7e14be feat: woven planning, weaving/c…, DispatchDialog.tsx, work-order-row-actions.tsx, work-order-table.tsx, use-work-orders.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@b7b6ac90e038c1ea71139e0865a9becdbdd6a1d4": "b7b6ac9 feat: merge woven labels into the existing work-order flow (dispatch DC…" | kind=Commit | source=git | neighbors=[chore/ci, 09c4b95 feat: dispatch dialog, product-…, work-order-columns.tsx, WorkOrderDialog.tsx, work-order-schemas.ts, types.ts]
- "components_artworkandcomment": "ArtworkAndComment.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/ArtworkAndComment.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ArtworkAndComment(), work-order-schemas.ts, WorkOrderSchemaInput, label.tsx, Label()]
- "components_dispatchinfo": "DispatchInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, DispatchInfo(), AppInput.tsx, AppInput, ImageUploadField.tsx, ImageUploadField()]
- "components_machineselect": "MachineSelect.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LogProductionRunDialog.tsx, MachineSelect(), MachineSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_operatorselect": "OperatorSelect.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LogProductionRunDialog.tsx, OperatorSelect(), OperatorSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_productionsummarycard": "ProductionSummaryCard.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionSummaryCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ProductionRunsSection.tsx, StatCard.tsx, StatCard(), ProductionSummaryCard(), format.ts]
- "components_progress_bar": "progress-bar.tsx" | kind=code-symbol | source=client/src/shared/components/progress-bar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProgressBar(), ProgressBarProps, utils.ts, cn(), progress.tsx]
- "components_rolltrackingtable": "RollTrackingTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/RollTrackingTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, roll-columns.tsx, rollColumns, RollTrackingTable(), RollTrackingTableProps]
- "components_stagedeductionflowcard": "StageDeductionFlowCard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/StageDeductionFlowCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, AppCard.tsx, AppCard, StageDeductionFlowCard(), StageDeductionFlowCardProps, format.ts]
- "db_copy_from_local": "copy-from-local.ts" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, dest, fkEdges(), IGNORE(), main(), publicTables()]
- "db_seed_master_main": "main()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L382 | neighbors=[seed-master.ts, realignExistingLines(), seedCompanies(), seedMachines(), seedMaterials(), seedOperators()]
- "errors_index": "index.ts" | kind=code-symbol | source=server/src/shared/errors/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ApiError.ts, asyncHandler.ts, asyncHandler(), errorHandler.ts, errorHandler()]
- "ink_ink_service": "ink.service.ts" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, ApiError.ts, ApiError]
- "inventory_index": "index.ts" | kind=code-symbol | source=client/src/features/inventory/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LowStockAlert.tsx, MaterialSelect.tsx, PlanLabelTypeForm.tsx, use-inventory.ts, useInventoryStock()]
- "materials_receipts_types": "receipts-types.ts" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, use-material-receipts.ts, MaterialReceipt, MaterialReceiptConfig, ReceiptField]
- "middleware_validaterequest_validatequery": "validateQuery()" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L40 | neighbors=[company.routes.ts, inventory-roll.routes.ts, inventory.routes.ts, material.routes.ts, machine.routes.ts, validateRequest.ts]
- "pages_machinesoperatorspage": "MachinesOperatorsPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesOperatorsPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, machine-table.tsx, MachineTable(), operator-table.tsx, OperatorTable()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-007.json

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
