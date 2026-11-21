# Node Description Batch 6 of 38

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

- "components_planned_line_columns": "planned-line-columns.tsx" | kind=code-symbol | source=src/features/production-orders/components/planned-line-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, createPlannedLineColumns(), planned-line-row-actions.tsx, PlannedLineRowActions(), index.ts]
- "components_productionhistorytable": "ProductionHistoryTable.tsx" | kind=code-symbol | source=src/features/production-runs/components/ProductionHistoryTable.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, columns, ProductionHistoryTable(), index.ts, StatusBadge.tsx, StatusBadge()]
- "components_woven_columns": "woven-columns.tsx" | kind=code-symbol | source=src/features/production-orders/components/woven-columns.tsx:L1 | neighbors=[cf620b4 feat: add Estimated Weaving Tim…, ee6dbbe feat: production order completi…, progress-bar.tsx, ProgressBar(), wovenColumns, index.ts]
- "forms_appcombobox_appcombobox": "AppCombobox()" | kind=code-symbol | source=src/components/forms/AppCombobox.tsx:L27 | neighbors=[CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, MachineSelect.tsx, MaterialForm.tsx]
- "forms_appselect_appselect": "AppSelect" | kind=code-symbol | source=src/components/forms/AppSelect.tsx:L18 | neighbors=[CreateBatchDialog.tsx, CreateLabelTypeDialog.tsx, DyeThreadDialog.tsx, EditBatchDialog.tsx, LogProductionRunDialog.tsx, MachineDialog.tsx]
- "hooks_use_purchases": "use-purchases.ts" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, PURCHASE_KEYS, useCreatePurchase()]
- "machines_operators_index": "index.ts" | kind=code-symbol | source=src/features/machines-operators/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, InkConsumptionDialog.tsx, MachineSelect.tsx, MachineSelect(), OperatorSelect.tsx, OperatorSelect()]
- "production_orders_label_types": "label-types.ts" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateBatchDialog.tsx, EditBatchDialog.tsx, PlanLabelTypeForm.tsx, SizePlanEditor.tsx]
- "ui_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L7 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L142 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L155 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L39 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L126 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L78 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L62 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L110 | neighbors=[BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table-pagination.tsx, utils.ts, cn(), SelectContent(), SelectGroup()]
- "companies_types_company": "Company" | kind=code-symbol | source=src/features/companies/types.ts:L1 | neighbors=[index.ts, types.ts, brand-columns.tsx, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]
- "components_dispatchinfo": "DispatchInfo.tsx" | kind=code-symbol | source=src/features/work-orders/components/DispatchInfo.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 567656d feat: add max length validation…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, DispatchInfo(), AppInput.tsx]
- "components_purchase_columns": "purchase-columns.tsx" | kind=code-symbol | source=src/features/purchases/components/purchase-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, purchaseColumns, purchase-row-actions.tsx, PurchaseRowActions(), index.ts]
- "forms_imageuploadfield": "ImageUploadField.tsx" | kind=code-symbol | source=src/components/forms/ImageUploadField.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, DispatchDialog.tsx, DispatchInfo.tsx, ImagePreview.tsx, ImagePreview(), AppButton.tsx]
- "inventory_types": "types.ts" | kind=code-symbol | source=src/features/inventory/types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx]
- "pages_rollpurchasespage": "RollPurchasesPage.tsx" | kind=code-symbol | source=src/features/purchases/pages/RollPurchasesPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, purchase-table.tsx, PurchaseTable(), PurchaseForm.tsx, PurchaseForm()]
- "services_ink_service": "ink-service.ts" | kind=code-symbol | source=src/features/ink/services/ink-service.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, use-ink.ts, types.ts, InkConsumption, InkConsumptionInput, InkOperatorSummary]
- "services_woven_production_service": "woven-production-service.ts" | kind=code-symbol | source=src/features/production-orders/services/woven-production-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-woven-production.ts, api.ts, api, woven-types.ts, PlanWovenInput]
- "ui_label_label": "Label()" | kind=code-symbol | source=src/components/ui/label.tsx:L5 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, WorkOrderBasicInfo.tsx]
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=src/components/ui/navigation-menu.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator()]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=src/components/ui/progress.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, LabelTypeRow.tsx, progress-bar.tsx, StageProgressBars.tsx, WorkOrderDetailPage.tsx, utils.ts]
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=src/components/ui/table.tsx:L81 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ProductionCompletionReport.tsx]
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=src/components/ui/table.tsx:L55 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ProductionCompletionReport.tsx]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=src/components/ui/tooltip.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, editable-cell.tsx, AppLayout.tsx, LayoutProvider.tsx, nav-main.tsx, sidebar.tsx]
- "components_availabilitybadge": "AvailabilityBadge.tsx" | kind=code-symbol | source=src/features/machines-operators/components/AvailabilityBadge.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AvailabilityBadge(), AvailabilityBadgeProps, VARIANTS, StatusBadge.tsx, StatusBadge()]
- "components_material_columns": "material-columns.tsx" | kind=code-symbol | source=src/features/materials/components/material-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, materialColumns, material-row-actions.tsx, MaterialRowActions(), index.ts]
- "components_stagedeductionflowcard": "StageDeductionFlowCard.tsx" | kind=code-symbol | source=src/features/production-orders/components/StageDeductionFlowCard.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, AppCard.tsx, AppCard, StageDeductionFlowCard()]
- "data_table_data_table_empty": "data-table-empty.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-empty.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table.tsx, DataTableEmpty(), DataTableEmptyProps, empty.tsx, Empty()]
- "hooks_use_material_receipts": "use-material-receipts.ts" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, MaterialReceiptPage.tsx, RECEIPT_KEYS, useCreateReceipt(), useDeleteReceipt(), useReceipts()]
- "label_types_types": "types.ts" | kind=code-symbol | source=src/features/label-types/types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateLabelTypeDialog.tsx, label-type-columns.tsx, use-label-types.ts, index.ts]
- "pages_companybrandpage": "CompanyBrandPage.tsx" | kind=code-symbol | source=src/features/companies/pages/CompanyBrandPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, types.ts, Company, BrandTable.tsx, BrandTable()]
- "pages_inventorystockpage": "InventoryStockPage.tsx" | kind=code-symbol | source=src/features/inventory/pages/InventoryStockPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, inventory-stock-table.tsx, InventoryStockTable(), PageHeader.tsx, PageHeader()]
- "pages_materialmasterpage": "MaterialMasterPage.tsx" | kind=code-symbol | source=src/features/materials/pages/MaterialMasterPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, material-table.tsx, MaterialTable(), MaterialForm.tsx, MaterialForm()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-005.json

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
