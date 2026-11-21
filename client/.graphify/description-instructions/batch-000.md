# Node Description Batch 1 of 38

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

- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@ee6dbbe5ab846034f01ccd0095094b2adb8f821d": "ee6dbbe feat: production order completion workflow, live progress cards, thread…" | kind=Commit | source=git | neighbors=[AppProviders.tsx, AppRoutes.tsx, routes.tsx, main, AppBreadcrumb.tsx, AppCard.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@815ad75e66fa2fc03aa6432a940a3af1e30e3802": "815ad75 feat: complete frontend updates, responsive layout, stock reconciliatio…" | kind=Commit | source=git | neighbors=[routes.tsx, main, 567656d feat: add max length validation…, ArtworkAndComment.tsx, brand-columns.tsx, BrandTable.tsx]
- "lib_utils": "utils.ts" | kind=code-symbol | source=src/lib/utils.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, ee6dbbe feat: production order completi…, brand-row-actions.tsx, company-row-actions.tsx, CreateBatchDialog.tsx]
- "forms_appbutton": "AppButton.tsx" | kind=code-symbol | source=src/components/forms/AppButton.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, brand-row-actions.tsx, BrandDialog.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=src/lib/utils.ts:L4 | neighbors=[AppCard.tsx, StatCard.tsx, brand-row-actions.tsx, company-row-actions.tsx, CreateBatchDialog.tsx, CreateProductionOrderDialog.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@12acd8ee7def28470ed4577372c007ac1ded2129": "12acd8e Sync client from 3Q-facility-Dashboard monorepo @ 1a9098e (chore/ci) - …" | kind=Commit | source=git | neighbors=[0cdf79f fix: fallback speed to 600 RPM …, routes.tsx, main, 6341954 Sync client from 3Q-facility-Da…, BatchOutputDialog.tsx, BatchStageBoard.tsx]
- "production_orders_types": "types.ts" | kind=code-symbol | source=src/features/production-orders/types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, cf620b4 feat: add Estimated Weaving Tim…, ee6dbbe feat: production order completi…, EditableLabelTypeTable.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@9947228d262c6c79b023f1e95a0b9c2bbcea6a70": "9947228 feat(client): summary-only completed production view with button-trigge…" | kind=Commit | source=git | neighbors=[25e9a18 feat(client): summary-only comp…, routes.tsx, main, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx]
- "forms_appbutton_appbutton": "AppButton" | kind=code-symbol | source=src/components/forms/AppButton.tsx:L14 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx]
- "lib_format": "format.ts" | kind=code-symbol | source=src/lib/format.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx]
- "pages_productionorderdashboardpage": "ProductionOrderDashboardPage.tsx" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L1 | neighbors=[routes.tsx, 12acd8e Sync client from 3Q-facility-Da…, 25e9a18 feat(client): summary-only comp…, 815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, AppCard.tsx]
- "components_planlabeltypeform": "PlanLabelTypeForm.tsx" | kind=code-symbol | source=src/features/production-orders/components/PlanLabelTypeForm.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, PlanLabelTypeDialog.tsx, AppCard.tsx]
- "data_table_index": "index.ts" | kind=code-symbol | source=src/shared/components/data-table/index.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, brand-columns.tsx, BrandTable.tsx, company-columns.tsx, CompanyTable.tsx]
- "lib_format_formatnumber": "formatNumber()" | kind=code-symbol | source=src/lib/format.ts:L3 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx]
- "components_batchstageboard": "BatchStageBoard.tsx" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, AppCard.tsx, AppCard, BatchOutputDialog.tsx, BatchOutputDialog()]
- "hooks_use_production_orders": "use-production-orders.ts" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppHeader.tsx, AppLayout.tsx, AppSidebar.tsx, nav-main.tsx, nav-user.tsx]
- "components_editablelabeltypetable": "EditableLabelTypeTable.tsx" | kind=code-symbol | source=src/features/production-orders/components/EditableLabelTypeTable.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, EditableLabelTypeTable(), EditableLabelTypeTableProps]
- "pages_workorderdetailpage": "WorkOrderDetailPage.tsx" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L1 | neighbors=[routes.tsx, 0cdf79f fix: fallback speed to 600 RPM …, 12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 84328c7 feat: show Est. Weaving Time in…, 9947228 feat(client): summary-only comp…]
- "components_workorderdialog": "WorkOrderDialog.tsx" | kind=code-symbol | source=src/features/work-orders/components/WorkOrderDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 567656d feat: add max length validation…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, 9ff35ed feat: add speed (RPM) to Work O…, ee6dbbe feat: production order completi…]
- "data_table_data_table": "data-table.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, alignClass(), DataTable()]
- "production_orders_batch_types": "batch-types.ts" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx]
- "forms_appinput": "AppInput.tsx" | kind=code-symbol | source=src/components/forms/AppInput.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BatchOutputDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, CreateLabelTypeDialog.tsx]
- "components_editbatchdialog": "EditBatchDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/EditBatchDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchStageBoard.tsx, CreateBatchDialog.tsx, SourcePicker(), EditBatchDialog()]
- "components_threadpurchasepanel": "ThreadPurchasePanel.tsx" | kind=code-symbol | source=src/features/thread/components/ThreadPurchasePanel.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, COLOR_OPTIONS, DENIER_OPTIONS, ThreadPurchasePanel()]
- "components_wovenproductionpanel": "WovenProductionPanel.tsx" | kind=code-symbol | source=src/features/production-orders/components/WovenProductionPanel.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 25e9a18 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, StatCard.tsx]
- "dialogs_appdialog": "AppDialog.tsx" | kind=code-symbol | source=src/components/dialogs/AppDialog.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, BatchOutputDialog.tsx, BatchTraceDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx]
- "components_roll_stock_row_actions": "roll-stock-row-actions.tsx" | kind=code-symbol | source=src/features/inventory/components/roll-stock-row-actions.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, inventory-columns.tsx, HistoryDialog(), MOVEMENT_LABELS, RollStockRowActions(), RollStockDialog.tsx]
- "production_orders_index": "index.ts" | kind=code-symbol | source=src/features/production-orders/index.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, ProductionTrendChart.tsx, WorkOrderDetailPage.tsx, BatchStageBoard.tsx]
- "ui_combobox": "combobox.tsx" | kind=code-symbol | source=src/components/ui/combobox.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, combobox.tsx, inventory-stock-table.tsx, LabelTypeTable.tsx, machine-table.tsx]
- "pages_threaddyeingpage": "ThreadDyeingPage.tsx" | kind=code-symbol | source=src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L1 | neighbors=[routes.tsx, 815ad75 feat: complete frontend updates…, ReceiveDyeingDialog.tsx, ReceiveDyeingDialog(), SendDyeingDialog.tsx, SendDyeingDialog()]
- "components_createproductionorderdialog": "CreateProductionOrderDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/CreateProductionOrderDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, CreateProductionOrderDialog(), CreateProductionOrderDialogProps, NotesForm, AppDialog.tsx]
- "components_threadstockpanel": "ThreadStockPanel.tsx" | kind=code-symbol | source=src/features/thread/components/ThreadStockPanel.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, AppCard.tsx, AppCard, StatCard.tsx, StatCard(), DyeThreadDialog.tsx]
- "feedback_statusbadge": "StatusBadge.tsx" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx]
- "components_createbatchdialog": "CreateBatchDialog.tsx" | kind=code-symbol | source=src/features/production-orders/components/CreateBatchDialog.tsx:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, BatchStageBoard.tsx, CreateBatchDialog(), CreateBatchDialogProps, SourcePicker()]
- "pages_inkconsumptionpage": "InkConsumptionPage.tsx" | kind=code-symbol | source=src/features/ink/pages/InkConsumptionPage.tsx:L1 | neighbors=[routes.tsx, 12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ink-consumption-columns.tsx, inkConsumptionColumns()]
- "app_routes": "routes.tsx" | kind=code-symbol | source=src/app/routes.tsx:L1 | neighbors=[AppRoutes.tsx, AppRoute, page(), RedirectRoute, redirects, routes]
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, LowStockAlert.tsx]
- "components_operatordialog": "OperatorDialog.tsx" | kind=code-symbol | source=src/features/machines-operators/components/OperatorDialog.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, operator-row-actions.tsx, operator-table.tsx, DESIGNATION_OPTIONS, OPERATOR_TYPE_OPTIONS]
- "components_purchaseform": "PurchaseForm.tsx" | kind=code-symbol | source=src/features/purchases/components/PurchaseForm.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, purchase-row-actions.tsx, PurchaseForm(), PurchaseFormProps, AppDialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-000.json

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
