# Node Description Batch 6 of 53

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

- "services_thread_dyeing_service": "thread-dyeing-service.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/services/thread-dyeing-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-thread-dyeing.ts, api.ts, api, threadDyeingService, types.ts]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L74 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, production-order-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L221 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=client/src/components/ui/pagination.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-pagination.tsx, utils.ts, cn(), button.tsx, Button]
- "work_orders_work_order_schema": "work-order.schema.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, artworkImageSchema, CreateWorkOrderDTO, createWorkOrderSchema, DispatchWorkOrderDTO, dispatchWorkOrderSchema]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@95aebc16dc2b9202d7230b3dccd12c1126bf55ab": "95aebc1 feat: thread receiving, stock and dyeing UI as tabs on existing pages" | kind=Commit | source=git | neighbors=[chore/ci, 3e6a631 feat: woven production client U…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockPanel.tsx, use-thread.ts]
- "companies_company_service": "company.service.ts" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, BrandService, CompanyService, messages.ts, Entity, Messages]
- "components_ink_consumption_columns": "ink-consumption-columns.tsx" | kind=code-symbol | source=client/src/features/ink/components/ink-consumption-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, inkConsumptionColumns(), index.ts, ConfirmDialog.tsx, ConfirmDialog(), AppButton.tsx]
- "components_planned_line_columns": "planned-line-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, createPlannedLineColumns(), planned-line-row-actions.tsx, PlannedLineRowActions(), index.ts]
- "components_productionhistorytable": "ProductionHistoryTable.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionHistoryTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, columns, ProductionHistoryTable(), index.ts, StatusBadge.tsx, StatusBadge()]
- "components_roll_columns": "roll-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/roll-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, progress-bar.tsx, ProgressBar(), rollColumns, index.ts]
- "errors_apierror_notfounderror": "NotFoundError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L22 | neighbors=[company.service.ts, ApiError.ts, ApiError, .constructor(), ink.service.ts, inventory-roll.repository.ts]
- "errors_asynchandler": "asyncHandler.ts" | kind=code-symbol | source=server/src/shared/errors/asyncHandler.ts:L1 | neighbors=[analytics.controller.ts, ee6d4dd refactor(server): vertical-slic…, company.controller.ts, asyncHandler(), index.ts, ink.controller.ts]
- "forms_appcombobox_appcombobox": "AppCombobox()" | kind=code-symbol | source=client/src/components/forms/AppCombobox.tsx:L27 | neighbors=[CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, MachineSelect.tsx, MaterialForm.tsx]
- "hooks_use_purchases": "use-purchases.ts" | kind=code-symbol | source=client/src/features/purchases/hooks/use-purchases.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, PURCHASE_KEYS, useCreatePurchase()]
- "services_material_service": "material-service.ts" | kind=code-symbol | source=client/src/features/materials/services/material-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-materials.ts, api.ts, api, types.ts, Material]
- "ui_select": "select.tsx" | kind=code-symbol | source=client/src/components/ui/select.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-pagination.tsx, utils.ts, cn(), SelectContent(), SelectGroup()]
- "companies_types_company": "Company" | kind=code-symbol | source=client/src/features/companies/types.ts:L1 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]
- "components_purchase_columns": "purchase-columns.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, purchaseColumns, purchase-row-actions.tsx, PurchaseRowActions(), index.ts]
- "components_woven_columns": "woven-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/woven-columns.tsx:L1 | neighbors=[c27dc7d feat(server): stock CRUD histor…, progress-bar.tsx, ProgressBar(), wovenColumns, index.ts, StatusBadge.tsx]
- "db_seed": "seed.ts" | kind=code-symbol | source=server/src/shared/db/seed.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, seed(), production-formula.ts]
- "drizzle_0002_production_orders_and_users": "0002_production_orders_and_users.sql" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, operators, production_order_lines, production_orders, production_stage_events, public.machines]
- "errors_asynchandler_asynchandler": "asyncHandler()" | kind=code-symbol | source=server/src/shared/errors/asyncHandler.ts:L3 | neighbors=[analytics.controller.ts, company.controller.ts, asyncHandler.ts, index.ts, ink.controller.ts, inventory.controller.ts]
- "forms_imageuploadfield": "ImageUploadField.tsx" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, DispatchDialog.tsx, DispatchInfo.tsx, ImagePreview.tsx, ImagePreview(), AppButton.tsx]
- "ink_ink_repository_inkrepository": "InkRepository" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L10 | neighbors=[ink.repository.ts, .balanceWeight(), .consumptionByOperator(), .createConsumption(), .createPurchase(), .findPurchaseById()]
- "inventory_inventory_roll_repository": "inventory-roll.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, Tx, schema.ts, InventoryRoll]
- "inventory_types": "types.ts" | kind=code-symbol | source=client/src/features/inventory/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx]
- "pages_rollpurchasespage": "RollPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/purchases/pages/RollPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, purchase-table.tsx, PurchaseTable(), PurchaseForm.tsx, PurchaseForm()]
- "pages_workorderlistpage": "WorkOrderListPage.tsx" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderListPage.tsx:L1 | neighbors=[routes.tsx, adfafe7 polish: nav + page copy for the…, c0c79ec Initial commit: Label Manufactu…, work-order-table.tsx, WorkOrderTable(), WorkOrderDialog.tsx]
- "services_material_receipts_service": "material-receipts-service.ts" | kind=code-symbol | source=client/src/features/materials/services/material-receipts-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-material-receipts.ts, api.ts, api, receipts-types.ts, MaterialReceipt]
- "services_production_run_service": "production-run-service.ts" | kind=code-symbol | source=client/src/features/production-runs/services/production-run-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-production-runs.ts, api.ts, api, types.ts, LogProductionRunInput]
- "ui_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L142 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L155 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L39 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L126 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L78 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L62 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L110 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, planned-line-row-actions.tsx]
- "ui_label_label": "Label()" | kind=code-symbol | source=client/src/components/ui/label.tsx:L5 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, WorkOrderBasicInfo.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-005.json

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
