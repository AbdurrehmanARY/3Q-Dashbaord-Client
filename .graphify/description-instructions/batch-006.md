# Node Description Batch 7 of 74

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

- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L221 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-pagination.tsx, utils.ts, cn(), button.tsx, Button]
- "utils_planning_dialog_test": "planning-dialog.test.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.test.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, types.ts, PlanLineInput, ProductionLineOverview, woven-types.ts, PlanWovenInput]
- "work_orders_work_order_schema": "work-order.schema.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, artworkImageSchema, CreateWorkOrderDTO, createWorkOrderSchema, DispatchWorkOrderDTO, dispatchWorkOrderSchema]
- "woven_production_woven_production_schema": "woven-production.schema.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, denierEnum, PlanWovenLineDTO, planWovenLineSchema, ReconcileRemainingThreadsDTO, reconcileRemainingThreadsSchema]
- "woven_production_woven_production_service": "woven-production.service.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, labels.ts, validateSizePlan(), messages.ts, Entity, Messages]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@95aebc16dc2b9202d7230b3dccd12c1126bf55ab": "95aebc1 feat: thread receiving, stock and dyeing UI as tabs on existing pages" | kind=Commit | source=git | neighbors=[chore/ci, 3e6a631 feat: woven production client U…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx, use-thread.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@cd392dcd4327cccefd005c7a3910536dc47254f0": "cd392dc feat(label-types): add label types master data CRUD" | kind=Commit | source=git | neighbors=[95ce13e feat(production): make cutting …, chore/ci, messages.ts, schema.ts, 0026_label_types.sql, label-types.controller.ts]
- "companies_company_service": "company.service.ts" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, BrandService, CompanyService, messages.ts, Entity, Messages]
- "components_ink_consumption_columns": "ink-consumption-columns.tsx" | kind=code-symbol | source=client/src/features/ink/components/ink-consumption-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, inkConsumptionColumns(), index.ts, ConfirmDialog.tsx, ConfirmDialog(), AppButton.tsx]
- "components_planned_line_columns": "planned-line-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, createPlannedLineColumns(), planned-line-row-actions.tsx, PlannedLineRowActions(), index.ts]
- "components_productionhistorytable": "ProductionHistoryTable.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionHistoryTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, columns, ProductionHistoryTable(), index.ts, StatusBadge.tsx, StatusBadge()]
- "components_roll_columns": "roll-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/roll-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, progress-bar.tsx, ProgressBar(), rollColumns, index.ts]
- "components_woven_columns": "woven-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/woven-columns.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, c27dc7d feat(server): stock CRUD histor…, progress-bar.tsx, ProgressBar(), wovenColumns, index.ts]
- "db_size_plans": "size-plans.ts" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L1 | neighbors=[batch-flow.helpers.ts, batch-flow.helpers.test.ts, batch-flow.service.ts, ee6d4dd refactor(server): vertical-slic…, labels.ts, isSizeLabel()]
- "errors_apierror_badrequesterror": "BadRequestError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L16 | neighbors=[batch-flow.helpers.ts, batch-flow.repository.ts, batch-flow.service.ts, production-run.service.ts, ApiError.ts, ApiError]
- "errors_apierror_conflicterror": "ConflictError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L28 | neighbors=[batch-flow.repository.ts, company.service.ts, ApiError.ts, ApiError, .constructor(), inventory-roll.service.ts]
- "forms_appcombobox_appcombobox": "AppCombobox()" | kind=code-symbol | source=client/src/components/forms/AppCombobox.tsx:L27 | neighbors=[CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, MachineSelect.tsx, MaterialForm.tsx]
- "hooks_use_purchases": "use-purchases.ts" | kind=code-symbol | source=client/src/features/purchases/hooks/use-purchases.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, PURCHASE_KEYS, useCreatePurchase()]
- "machines_operators_index": "index.ts" | kind=code-symbol | source=client/src/features/machines-operators/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, InkConsumptionDialog.tsx, MachineSelect.tsx, MachineSelect(), OperatorSelect.tsx, OperatorSelect()]
- "material_receipts_material_receipts_schema": "material-receipts.schema.ts" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, CreateLabelSheetDTO, createLabelSheetSchema, CreateLocalSheetDTO, createLocalSheetSchema, CreateStickerMaterialDTO]
- "middleware_validaterequest_validatequery": "validateQuery()" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L40 | neighbors=[batch-flow.routes.ts, company.routes.ts, inventory-roll.routes.ts, inventory.routes.ts, material.routes.ts, label-types.routes.ts]
- "production_orders_production_order_overview_builder": "production-order-overview.builder.ts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order-overview.builder.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, schema.ts, Machine, Material, Operator, ProductionOrderLine]
- "production_orders_production_order_service_productionorderservice_getorderorthrow": ".getOrderOrThrow()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L64 | neighbors=[ProductionOrderService, .assignLineResources(), .completeProductionOrder(), .deleteLine(), .deleteProductionOrder(), .getOrderEvents()]
- "scripts_dump_baseline": "dump-baseline.mjs" | kind=code-symbol | source=server/scripts/dump-baseline.mjs:L1 | neighbors=[efa0e77 chore(db): repair migration jou…, counts, describe(), directUrlFromEnvFile(), envFileUrl, findPgDump()]
- "services_material_service": "material-service.ts" | kind=code-symbol | source=client/src/features/materials/services/material-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-materials.ts, api.ts, api, types.ts, Material]
- "thread_inventory_thread_inventory_service_threadinventoryservice": "ThreadInventoryService" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L39 | neighbors=[thread-inventory.service.ts, .createDyeBatch(), .createPurchase(), .createStock(), .deletePurchase(), .deleteStock()]
- "ui_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L7 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L142 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L155 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L39 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L126 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L78 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L62 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L110 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_select": "select.tsx" | kind=code-symbol | source=client/src/components/ui/select.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-pagination.tsx, utils.ts, cn(), SelectContent(), SelectGroup()]
- "utils_planning_dialog": "planning-dialog.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, PlanLabelTypeDialog.tsx, types.ts, PlanLineInput, ProductionLineOverview, ProductType]
- "utils_planning_rows_test": "planning-rows.test.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.test.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, woven-types.ts, ThreadPlanInput, planning-rows.ts, allocateSharedThreads(), cumulativeStockIssues()]
- "baseline_live_schema_public_users": "public.users" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1378 | neighbors=[live-schema.sql, public.batch_consumptions, public.inventory_roll_movements, public.operators, public.production_batches, public.production_orders]
- "companies_types_company": "Company" | kind=code-symbol | source=client/src/features/companies/types.ts:L1 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-006.json

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
