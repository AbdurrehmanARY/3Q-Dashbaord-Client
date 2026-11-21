# Node Description Batch 2 of 38

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

- "components_work_order_row_actions": "work-order-row-actions.tsx" | kind=code-symbol | source=src/features/work-orders/components/work-order-row-actions.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, work-order-columns.tsx, DispatchDialog.tsx, DispatchDialog(), RowPinControls]
- "components_work_order_table": "work-order-table.tsx" | kind=code-symbol | source=src/features/work-orders/components/work-order-table.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, work-order-columns.tsx, workOrderColumns]
- "forms_appinput_appinput": "AppInput" | kind=code-symbol | source=src/components/forms/AppInput.tsx:L12 | neighbors=[BatchOutputDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, CreateLabelTypeDialog.tsx, DispatchDialog.tsx]
- "work_orders_types": "types.ts" | kind=code-symbol | source=src/features/work-orders/types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, 9ff35ed feat: add speed (RPM) to Work O…, ee6dbbe feat: production order completi…, CreateProductionOrderDialog.tsx]
- "cards_appcard": "AppCard.tsx" | kind=code-symbol | source=src/components/cards/AppCard.tsx:L1 | neighbors=[AppCard, AppCardProps, utils.ts, cn(), card.tsx, Card()]
- "hooks_use_batches": "use-batches.ts" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx]
- "pages_productionorderplanningpage": "ProductionOrderPlanningPage.tsx" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L1 | neighbors=[routes.tsx, 12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, AppCard.tsx]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "components_brand_row_actions": "brand-row-actions.tsx" | kind=code-symbol | source=src/features/companies/components/brand-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, brand-columns.tsx, types.ts, Brand, Company, BrandRowActions()]
- "components_labeltyperow": "LabelTypeRow.tsx" | kind=code-symbol | source=src/features/production-orders/components/LabelTypeRow.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, EditableLabelTypeTable.tsx, EMPTY_ERRORS]
- "components_purchase_row_actions": "purchase-row-actions.tsx" | kind=code-symbol | source=src/features/purchases/components/purchase-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, purchase-columns.tsx, PurchaseRowActions(), PurchaseForm.tsx, PurchaseForm(), AppButton.tsx]
- "components_company_row_actions": "company-row-actions.tsx" | kind=code-symbol | source=src/features/companies/components/company-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, company-columns.tsx, types.ts, Company, CompanyRowActions(), CompanyDialog.tsx]
- "components_machine_row_actions": "machine-row-actions.tsx" | kind=code-symbol | source=src/features/machines-operators/components/machine-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, machine-columns.tsx, MachineRowActions(), MachineDialog.tsx, MachineDialog(), AppButton.tsx]
- "components_material_row_actions": "material-row-actions.tsx" | kind=code-symbol | source=src/features/materials/components/material-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, material-columns.tsx, MaterialRowActions(), MaterialForm.tsx, MaterialForm(), AppButton.tsx]
- "components_materialreceiptpage": "MaterialReceiptPage.tsx" | kind=code-symbol | source=src/features/materials/components/MaterialReceiptPage.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, MaterialReceiptPage(), ReceiptFormDialog(), index.ts, AppDialog.tsx, AppDialog()]
- "components_operator_row_actions": "operator-row-actions.tsx" | kind=code-symbol | source=src/features/machines-operators/components/operator-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, operator-columns.tsx, OperatorRowActions(), OperatorDialog.tsx, OperatorDialog(), AppButton.tsx]
- "layout_pageheader": "PageHeader.tsx" | kind=code-symbol | source=src/components/layout/PageHeader.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, MaterialReceiptPage.tsx, index.ts, PageHeader(), PageHeaderProps]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "components_logproductionrundialog": "LogProductionRunDialog.tsx" | kind=code-symbol | source=src/features/production-runs/components/LogProductionRunDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, FormValues, LogProductionRunDialog(), LogProductionRunDialogProps, MachineSelect.tsx, MachineSelect()]
- "components_machinedialog": "MachineDialog.tsx" | kind=code-symbol | source=src/features/machines-operators/components/MachineDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, machine-row-actions.tsx, machine-table.tsx, MachineDialog(), MachineDialogProps]
- "components_operator_table": "operator-table.tsx" | kind=code-symbol | source=src/features/machines-operators/components/operator-table.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, operator-columns.tsx, operatorColumns]
- "components_planlabeltypedialog": "PlanLabelTypeDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/PlanLabelTypeDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, UnifiedPlanningDialog(), UnifiedPlanningDialogProps, PlanLabelTypeForm.tsx]
- "components_production_order_row_actions": "production-order-row-actions.tsx" | kind=code-symbol | source=src/features/production-orders/components/production-order-row-actions.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, production-order-columns.tsx, ProductionOrderRowActions(), AppButton.tsx, AppButton]
- "dialogs_appdialog_appdialog": "AppDialog()" | kind=code-symbol | source=src/components/dialogs/AppDialog.tsx:L22 | neighbors=[BatchOutputDialog.tsx, BatchTraceDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, CreateLabelTypeDialog.tsx]
- "production_orders_woven_types": "woven-types.ts" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, 9ff35ed feat: add speed (RPM) to Work O…, ee6dbbe feat: production order completi…, PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx]
- "thread_index": "index.ts" | kind=code-symbol | source=src/features/thread/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, DyedThreadStockPage.tsx, InventoryStockPage.tsx, PurchaseRecordPage.tsx]
- "components_dispatchdialog": "DispatchDialog.tsx" | kind=code-symbol | source=src/features/work-orders/components/DispatchDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, DispatchDialog(), DispatchDialogProps]
- "components_materialform": "MaterialForm.tsx" | kind=code-symbol | source=src/features/materials/components/MaterialForm.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, material-row-actions.tsx, descriptionOptions, MaterialForm(), MaterialFormProps]
- "feedback_statusbadge_statusbadge": "StatusBadge()" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L84 | neighbors=[AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx, inventory-columns.tsx, LowStockAlert.tsx, machine-columns.tsx]
- "components_dyethreaddialog": "DyeThreadDialog.tsx" | kind=code-symbol | source=src/features/thread/components/DyeThreadDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BASE_COLOR_OPTIONS, DENIER_OPTIONS, DyeThreadDialog(), AppDialog.tsx, AppDialog()]
- "components_inkconsumptiondialog": "InkConsumptionDialog.tsx" | kind=code-symbol | source=src/features/ink/components/InkConsumptionDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkConsumptionDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_senddyeingdialog": "SendDyeingDialog.tsx" | kind=code-symbol | source=src/features/thread-dyeing/components/SendDyeingDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, SendDyeingDialog(), SendForm, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_sharedthreadallocation": "SharedThreadAllocation.tsx" | kind=code-symbol | source=src/features/production-orders/components/SharedThreadAllocation.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, PlanLabelTypeForm.tsx, emptyThreadAllocationRow(), SharedThreadAllocation(), SharedThreadAllocationProps]
- "services_production_order_service": "production-order-service.ts" | kind=code-symbol | source=src/features/production-orders/services/production-order-service.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, use-production-orders.ts, api.ts]
- "sidebar_nav_main": "nav-main.tsx" | kind=code-symbol | source=src/shared/components/sidebar/nav-main.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppSidebar.tsx, utils.ts, cn(), navigation.ts, NavItem]
- "components_purchase_table": "purchase-table.tsx" | kind=code-symbol | source=src/features/purchases/components/purchase-table.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, date-picker.tsx, DatePicker()]
- "components_threadstockdialog": "ThreadStockDialog.tsx" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, DENIER_OPTIONS, ThreadStockDialog(), ThreadStockDialogProps, threadStockSchema, ThreadStockSchemaInput]
- "lib_api": "api.ts" | kind=code-symbol | source=src/lib/api.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, client_healthcheck.tsx, materials-health.ts, production-health.ts, use-label-types.ts, api]
- "schemas_production_order_schemas": "production-order-schemas.ts" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, PlanLabelTypeForm.tsx, assignResourcesSchema]
- "components_productioncompletionreport": "ProductionCompletionReport.tsx" | kind=code-symbol | source=src/features/production-orders/components/ProductionCompletionReport.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, AppCard.tsx, AppCard, StatCard.tsx, StatCard()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-001.json

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
