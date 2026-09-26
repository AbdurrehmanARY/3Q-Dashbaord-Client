# Node Description Batch 2 of 53

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

- "relations_index": "index.ts" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, schema.ts, batchConsumptionsRelations, brandsRelations, companiesRelations, inventoryRollsRelations]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "work_orders_types": "types.ts" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, DispatchDialog.tsx]
- "cards_appcard": "AppCard.tsx" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L1 | neighbors=[AppCard, AppCardProps, utils.ts, cn(), card.tsx, Card()]
- "components_brand_row_actions": "brand-row-actions.tsx" | kind=code-symbol | source=client/src/features/companies/components/brand-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-columns.tsx, types.ts, Brand, Company, BrandRowActions()]
- "components_operator_table": "operator-table.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard]
- "components_purchase_row_actions": "purchase-row-actions.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-columns.tsx, PurchaseRowActions(), PurchaseForm.tsx, PurchaseForm(), AppButton.tsx]
- "db_seed_master": "seed-master.ts" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, seed-data.ts, COMPANIES]
- "pages_productionorderplanningpage": "ProductionOrderPlanningPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard, PlanLabelTypeDialog.tsx]
- "components_company_row_actions": "company-row-actions.tsx" | kind=code-symbol | source=client/src/features/companies/components/company-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, company-columns.tsx, types.ts, Company, CompanyRowActions(), CompanyDialog.tsx]
- "components_labeltyperow": "LabelTypeRow.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable.tsx, EMPTY_ERRORS, LabelTypeRow]
- "components_machine_row_actions": "machine-row-actions.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, machine-columns.tsx, MachineRowActions(), MachineDialog.tsx, MachineDialog(), AppButton.tsx]
- "components_material_row_actions": "material-row-actions.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-columns.tsx, MaterialRowActions(), MaterialForm.tsx, MaterialForm(), AppButton.tsx]
- "components_materialreceiptpage": "MaterialReceiptPage.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialReceiptPage.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage(), ReceiptFormDialog(), index.ts, AppDialog.tsx, AppDialog()]
- "components_operator_row_actions": "operator-row-actions.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, operator-columns.tsx, OperatorRowActions(), OperatorDialog.tsx, OperatorDialog(), AppButton.tsx]
- "components_production_order_row_actions": "production-order-row-actions.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-row-actions.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, production-order-columns.tsx, ProductionOrderRowActions(), AppButton.tsx]
- "components_logproductionrundialog": "LogProductionRunDialog.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/LogProductionRunDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, FormValues, LogProductionRunDialog(), LogProductionRunDialogProps, MachineSelect.tsx, MachineSelect()]
- "components_machinedialog": "MachineDialog.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, machine-row-actions.tsx, machine-table.tsx, MachineDialog(), MachineDialogProps]
- "components_planlabeltypedialog": "PlanLabelTypeDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, UnifiedPlanningDialog(), UnifiedPlanningDialogProps, PlanLabelTypeForm.tsx, PlanLabelTypeForm(), WovenPlanningForm.tsx]
- "layout_pageheader": "PageHeader.tsx" | kind=code-symbol | source=client/src/components/layout/PageHeader.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, MaterialReceiptPage.tsx, index.ts, PageHeader(), PageHeaderProps]
- "thread_index": "index.ts" | kind=code-symbol | source=client/src/features/thread/index.ts:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, 9b99ce1 feat: complete production workf…, WovenPlanningForm.tsx, DyedThreadStockPage.tsx, InventoryStockPage.tsx, PurchaseRecordPage.tsx]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "components_materialform": "MaterialForm.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, material-row-actions.tsx, descriptionOptions, MaterialForm(), MaterialFormProps]
- "components_wovenplanningform": "WovenPlanningForm.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenPlanningForm.tsx:L1 | neighbors=[3e6a631 feat: woven production client U…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, PlanLabelTypeDialog.tsx, AppCard.tsx, AppCard]
- "forms_appinput_appinput": "AppInput" | kind=code-symbol | source=client/src/components/forms/AppInput.tsx:L12 | neighbors=[BrandDialog.tsx, CompanyDialog.tsx, DispatchDialog.tsx, DispatchInfo.tsx, DyeThreadDialog.tsx, InkConsumptionDialog.tsx]
- "components_dispatchdialog": "DispatchDialog.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchDialog.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, DispatchDialog(), DispatchDialogProps, AppDialog.tsx]
- "components_dyethreaddialog": "DyeThreadDialog.tsx" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, BASE_COLOR_OPTIONS, DENIER_OPTIONS, DyeThreadDialog(), AppDialog.tsx, AppDialog()]
- "components_inkconsumptiondialog": "InkConsumptionDialog.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkConsumptionDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_senddyeingdialog": "SendDyeingDialog.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/components/SendDyeingDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, SendDyeingDialog(), SendForm, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "feedback_statusbadge_statusbadge": "StatusBadge()" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L84 | neighbors=[AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx, inventory-columns.tsx, LowStockAlert.tsx, machine-columns.tsx]
- "sidebar_nav_main": "nav-main.tsx" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppSidebar.tsx, utils.ts, cn(), navigation.ts, NavItem]
- "components_threadstockdialog": "ThreadStockDialog.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, DENIER_OPTIONS, ThreadStockDialog(), ThreadStockDialogProps, threadStockSchema, ThreadStockSchemaInput]
- "db_index": "index.ts" | kind=code-symbol | source=server/src/shared/db/index.ts:L1 | neighbors=[analytics.repository.ts, ee6d4dd refactor(server): vertical-slic…, company.repository.ts, clear-all-tables.ts, drizzle.ts, getDb()]
- "components_inventory_stock_table": "inventory-stock-table.tsx" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, cc50221 feat: dispatched status + FBR i…, inventory-columns.tsx]
- "components_machine_table": "machine-table.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-table.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard, machine-columns.tsx]
- "components_purchase_table": "purchase-table.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, date-picker.tsx, DatePicker(), purchase-columns.tsx]
- "forms_appcombobox": "AppCombobox.tsx" | kind=code-symbol | source=client/src/components/forms/AppCombobox.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx]
- "hooks_use_thread": "use-thread.ts" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx]
- "thread_types": "types.ts" | kind=code-symbol | source=client/src/features/thread/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx]
- "constants_messages": "messages.ts" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, company.service.ts, Entity, Messages, ink.service.ts, inventory-roll.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-001.json

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
