# Node Description Batch 10 of 74

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

- "ui_table_table": "Table()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L7 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L32 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L68 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L22 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=client/src/components/ui/textarea.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx]
- "work_orders_index": "index.ts" | kind=code-symbol | source=client/src/features/work-orders/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, RecentWorkOrders.tsx, use-dashboard-trends.ts, DashboardPage.tsx, WorkOrderDialog.tsx, WorkOrderDialog()]
- "work_orders_work_order_service": "work-order.service.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.service.ts:L1 | neighbors=[2e755d6 feat(server): persist estimated…, ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, ApiError.ts]
- "woven_production_woven_production_helpers": "woven-production.helpers.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, schema.ts, ProductionOrder, WovenProductionLine, canStartCutting(), canStartPackaging()]
- "app_appproviders": "AppProviders.tsx" | kind=code-symbol | source=client/src/app/AppProviders.tsx:L1 | neighbors=[AppProviders(), LayoutProvider.tsx, LayoutProvider(), QueryProvider.tsx, QueryProvider(), ThemeProvider.tsx]
- "app_approutes": "AppRoutes.tsx" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L1 | neighbors=[AppRoutes(), PageFallback(), routes.tsx, redirects, routes, AppLayout.tsx]
- "baseline_live_schema_public_production_batches": "public.production_batches" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L701 | neighbors=[live-schema.sql, public.batch_consumptions, public.machines, public.operators, public.production_order_lines, public.production_orders]
- "baseline_live_schema_public_production_order_lines": "public.production_order_lines" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L758 | neighbors=[live-schema.sql, public.production_batches, public.machines, public.materials, public.operators, public.production_orders]
- "batch_and_runs_batch_flow_helpers_test": "batch-flow.helpers.test.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.test.ts:L1 | neighbors=[batch(), labels.ts, normalizeSizePlan(), validateSizePlan(), size-plans.ts, isSizeLabel()]
- "batch_and_runs_batch_flow_routes": "batch-flow.routes.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.routes.ts:L1 | neighbors=[router, stageRouter(), validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "batch_and_runs_production_run_repository_productionrunrepository": "ProductionRunRepository" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.repository.ts:L6 | neighbors=[production-run.repository.ts, .create(), .findByIdempotencyKey(), .findBySaleOrderId(), .findRecentDuplicate(), .getMachineBreakdown()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@09c4b95a720994bedbb635c676aefc0181252f3f": "09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page" | kind=Commit | source=git | neighbors=[chore/ci, a7e14be feat: woven planning, weaving/c…, DispatchDialog.tsx, work-order-row-actions.tsx, work-order-table.tsx, use-work-orders.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@b7b6ac90e038c1ea71139e0865a9becdbdd6a1d4": "b7b6ac9 feat: merge woven labels into the existing work-order flow (dispatch DC…" | kind=Commit | source=git | neighbors=[chore/ci, 09c4b95 feat: dispatch dialog, product-…, work-order-columns.tsx, WorkOrderDialog.tsx, work-order-schemas.ts, types.ts]
- "components_machineselect": "MachineSelect.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LogProductionRunDialog.tsx, MachineSelect(), MachineSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_operatorselect": "OperatorSelect.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LogProductionRunDialog.tsx, OperatorSelect(), OperatorSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_productionsummarycard": "ProductionSummaryCard.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionSummaryCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ProductionRunsSection.tsx, StatCard.tsx, StatCard(), ProductionSummaryCard(), format.ts]
- "components_progress_bar": "progress-bar.tsx" | kind=code-symbol | source=client/src/shared/components/progress-bar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProgressBar(), ProgressBarProps, utils.ts, cn(), progress.tsx]
- "components_rolltrackingtable": "RollTrackingTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/RollTrackingTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, roll-columns.tsx, rollColumns, RollTrackingTable(), RollTrackingTableProps]
- "db_copy_from_local": "copy-from-local.ts" | kind=code-symbol | source=server/src/shared/db/copy-from-local.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, dest, fkEdges(), IGNORE(), main(), publicTables()]
- "db_seed_master_main": "main()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L382 | neighbors=[seed-master.ts, realignExistingLines(), seedCompanies(), seedMachines(), seedMaterials(), seedOperators()]
- "db_size_plans_sizeplan": "SizePlan" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L9 | neighbors=[batch-flow.helpers.ts, batch-flow.helpers.test.ts, batch-flow.service.ts, labels.ts, size-plans.ts, production-order.helpers.ts]
- "errors_index": "index.ts" | kind=code-symbol | source=server/src/shared/errors/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ApiError.ts, asyncHandler.ts, asyncHandler(), errorHandler.ts, errorHandler()]
- "formulas_production_formula": "production-formula.ts" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, seed.ts, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct()]
- "ink_ink_service": "ink.service.ts" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, ApiError.ts, ApiError]
- "inventory_index": "index.ts" | kind=code-symbol | source=client/src/features/inventory/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LowStockAlert.tsx, MaterialSelect.tsx, PlanLabelTypeForm.tsx, use-inventory.ts, useInventoryStock()]
- "materials_receipts_types": "receipts-types.ts" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, use-material-receipts.ts, MaterialReceipt, MaterialReceiptConfig, ReceiptField]
- "pages_machinesoperatorspage": "MachinesOperatorsPage.tsx" | kind=code-symbol | source=client/src/features/machines-operators/pages/MachinesOperatorsPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, machine-table.tsx, MachineTable(), operator-table.tsx, OperatorTable()]
- "purchases_types": "types.ts" | kind=code-symbol | source=client/src/features/purchases/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, use-purchases.ts]
- "schemas_material_schemas": "material-schemas.ts" | kind=code-symbol | source=client/src/features/materials/schemas/material-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, material-table.tsx, MaterialForm.tsx, index.ts, MATERIAL_DESCRIPTIONS]
- "scripts_reconcile_migrations": "reconcile-migrations.mjs" | kind=code-symbol | source=server/scripts/reconcile-migrations.mjs:L1 | neighbors=[748f587 chore: migration reconciliation…, efa0e77 chore(db): repair migration jou…, force, journal, missing, newestIdx]
- "services_entity_service": "entity-service.ts" | kind=code-symbol | source=client/src/features/machines-operators/services/entity-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-entities.ts, api.ts, api, types.ts, Machine]
- "shared_navigation": "navigation.ts" | kind=code-symbol | source=client/src/shared/navigation.ts:L1 | neighbors=[CommandPalette.tsx, 9b99ce1 feat: complete production workf…, adfafe7 polish: nav + page copy for the…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, navigation]
- "store_table_visibility_store": "table-visibility-store.ts" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L1 | neighbors=[2c8bd34 feat(client): per-table column …, data-table.tsx, EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), TableVisibilityMap, TableVisibilityState]
- "tox": "tox.mjs" | kind=code-symbol | source=tox.mjs:L1 | neighbors=[748f587 chore: migration reconciliation…, fail(), heading(), info(), main(), parseArgs()]
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=client/src/components/ui/calendar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, date-picker.tsx, utils.ts, cn(), button.tsx, Button]
- "ui_combobox_comboboxoption": "ComboboxOption" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L281 | neighbors=[combobox.tsx, inventory-stock-table.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, work-order-table.tsx]

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
