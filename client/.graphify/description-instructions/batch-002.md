# Node Description Batch 3 of 38

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

- "components_inventory_stock_table": "inventory-stock-table.tsx" | kind=code-symbol | source=src/features/inventory/components/inventory-stock-table.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, inventory-columns.tsx, inventoryColumns]
- "components_machine_table": "machine-table.tsx" | kind=code-symbol | source=src/features/machines-operators/components/machine-table.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, machine-columns.tsx, machineColumns]
- "forms_appcombobox": "AppCombobox.tsx" | kind=code-symbol | source=src/components/forms/AppCombobox.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx]
- "hooks_use_ink": "use-ink.ts" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkConsumptionDialog.tsx, InkOperatorBreakdown.tsx, InkPurchaseDialog.tsx, InkStockPanel.tsx, INK_KEYS]
- "hooks_use_thread": "use-thread.ts" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx, THREAD_KEYS]
- "layout_pageheader_pageheader": "PageHeader()" | kind=code-symbol | source=src/components/layout/PageHeader.tsx:L11 | neighbors=[MaterialReceiptPage.tsx, PageHeader.tsx, CompanyBrandPage.tsx, DashboardPage.tsx, DyedThreadStockPage.tsx, InkConsumptionPage.tsx]
- "pages_inkpurchasespage": "InkPurchasesPage.tsx" | kind=code-symbol | source=src/features/ink/pages/InkPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ink-purchase-columns.tsx, inkPurchaseColumns()]
- "thread_types": "types.ts" | kind=code-symbol | source=src/features/thread/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx, use-thread.ts]
- "utils_batch_edit": "batch-edit.ts" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, EditBatchDialog.tsx, format.ts, formatNumber(), batch-types.ts]
- "components_createlabeltypedialog": "CreateLabelTypeDialog.tsx" | kind=code-symbol | source=src/features/label-types/components/CreateLabelTypeDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateFormData, CreateLabelTypeDialog(), CreateLabelTypeDialogProps, UpdateFormData]
- "components_inkpurchasedialog": "InkPurchaseDialog.tsx" | kind=code-symbol | source=src/features/ink/components/InkPurchaseDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, InkPurchaseDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_rollstockdialog": "RollStockDialog.tsx" | kind=code-symbol | source=src/features/inventory/components/RollStockDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog(), RollStockDialogProps, rollStockSchema]
- "dialogs_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=src/components/dialogs/ConfirmDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog()]
- "hooks_use_entities": "use-entities.ts" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx, MachineSelect.tsx, operator-row-actions.tsx]
- "components_branddialog": "BrandDialog.tsx" | kind=code-symbol | source=src/features/companies/components/BrandDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, brand-row-actions.tsx, types.ts, Brand, Company, BrandDialog()]
- "components_companydialog": "CompanyDialog.tsx" | kind=code-symbol | source=src/features/companies/components/CompanyDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, company-row-actions.tsx, types.ts, Company, CompanyDialog(), CompanyDialogProps]
- "components_productiontrendchart": "ProductionTrendChart.tsx" | kind=code-symbol | source=src/features/dashboard/components/ProductionTrendChart.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, dayKey(), ProductionTrendChart(), RANGE_OPTIONS, index.ts, card.tsx]
- "components_work_order_columns": "work-order-columns.tsx" | kind=code-symbol | source=src/features/work-orders/components/work-order-columns.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 84328c7 feat: show Est. Weaving Time in…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, workOrderColumns]
- "forms_submitonenter": "SubmitOnEnter.tsx" | kind=code-symbol | source=src/components/forms/SubmitOnEnter.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx]
- "hooks_use_label_types": "use-label-types.ts" | kind=code-symbol | source=src/features/production-orders/hooks/use-label-types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateLabelTypeDialog.tsx, LabelTypeTable.tsx, LABEL_TYPE_KEYS, productionOrderLabelTypeKeys]
- "ui_command": "command.tsx" | kind=code-symbol | source=src/components/ui/command.tsx:L1 | neighbors=[CommandPalette.tsx, ee6dbbe feat: production order completi…, utils.ts, cn(), Command(), CommandDialog()]
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx]
- "components_brandtable": "BrandTable.tsx" | kind=code-symbol | source=src/features/companies/components/BrandTable.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, types.ts, Company]
- "components_companytable": "CompanyTable.tsx" | kind=code-symbol | source=src/features/companies/components/CompanyTable.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, types.ts, Company]
- "components_serviceproviderdialog": "ServiceProviderDialog.tsx" | kind=code-symbol | source=src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ProviderForm, ServiceProviderDialog(), AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_stageprogressbars": "StageProgressBars.tsx" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, STAGE_STYLE, StageBar(), StageProgressBars(), StageProgressBarsProps]
- "components_workorderbasicinfo": "WorkOrderBasicInfo.tsx" | kind=code-symbol | source=src/features/work-orders/components/WorkOrderBasicInfo.tsx:L1 | neighbors=[567656d feat: add max length validation…, 815ad75 feat: complete frontend updates…, WorkOrderBasicInfo(), AppCombobox.tsx, AppCombobox(), AppInput.tsx]
- "components_wovenspecification": "WovenSpecification.tsx" | kind=code-symbol | source=src/features/work-orders/components/WovenSpecification.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 567656d feat: add max length validation…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, 9ff35ed feat: add speed (RPM) to Work O…, WorkOrderDialog.tsx]
- "forms_appselect": "AppSelect.tsx" | kind=code-symbol | source=src/components/forms/AppSelect.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, CreateBatchDialog.tsx, CreateLabelTypeDialog.tsx, DyeThreadDialog.tsx, EditBatchDialog.tsx, LogProductionRunDialog.tsx]
- "forms_submitonenter_submitonenter": "SubmitOnEnter()" | kind=code-symbol | source=src/components/forms/SubmitOnEnter.tsx:L10 | neighbors=[BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx, InkConsumptionDialog.tsx]
- "hooks_use_woven_production": "use-woven-production.ts" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, WovenThreadReconciliationCard.tsx, invalidateWoven(), useDeleteWovenLine()]
- "lib_api_api": "api" | kind=code-symbol | source=src/lib/api.ts:L51 | neighbors=[client_healthcheck.tsx, materials-health.ts, production-health.ts, use-label-types.ts, api.ts, batch-service.ts]
- "thread_dyeing_types": "types.ts" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "cards_appcard_appcard": "AppCard" | kind=code-symbol | source=src/components/cards/AppCard.tsx:L22 | neighbors=[AppCard.tsx, BatchStageBoard.tsx, BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, operator-table.tsx]
- "components_batchoutputdialog": "BatchOutputDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/BatchOutputDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchOutputDialog(), BatchOutputDialogProps, AppDialog.tsx, AppDialog()]
- "components_production_order_columns": "production-order-columns.tsx" | kind=code-symbol | source=src/features/production-orders/components/production-order-columns.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, cf620b4 feat: add Estimated Weaving Tim…, ee6dbbe feat: production order completi…, PRIORITY_META, productionOrderColumns, production-order-row-actions.tsx]
- "components_recentworkorders": "RecentWorkOrders.tsx" | kind=code-symbol | source=src/features/dashboard/components/RecentWorkOrders.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, RecentWorkOrders(), StatusBadge.tsx, StatusBadge(), format.ts, formatDate()]
- "components_stockreconciliationcard": "StockReconciliationCard.tsx" | kind=code-symbol | source=src/features/production-orders/components/StockReconciliationCard.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, AppCard.tsx, AppCard, LineReconciliationRow(), StockReconciliationCard(), StockReconciliationCardProps]
- "hooks_use_companies": "use-companies.ts" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx, company-row-actions.tsx]
- "lib_format_formatdate": "formatDate()" | kind=code-symbol | source=src/lib/format.ts:L12 | neighbors=[CreateProductionOrderDialog.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, production-order-columns.tsx, production-order-table.tsx, ProductionHistoryTable.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-002.json

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
