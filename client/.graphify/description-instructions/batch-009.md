# Node Description Batch 10 of 38

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

- "purchases_types_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=src/features/purchases/types.ts:L1 | neighbors=[purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, types.ts, purchase-service.ts]
- "schemas_company_schemas": "company-schemas.ts" | kind=code-symbol | source=src/features/companies/schemas/company-schemas.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, CompanyDialog.tsx, brandSchema, BrandSchemaInput, companySchema, CompanySchemaInput]
- "segmented_tabs_index": "index.ts" | kind=code-symbol | source=src/shared/components/segmented-tabs/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, InventoryStockPage.tsx, PurchaseRecordPage.tsx, SegmentedTabs.tsx, SegmentedOption, SegmentedTabs()]
- "thread_types_thread_deniers": "THREAD_DENIERS" | kind=code-symbol | source=src/features/thread/types.ts:L2 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, thread-schemas.ts, index.ts, types.ts]
- "ui_card_card": "Card()" | kind=code-symbol | source=src/components/ui/card.tsx:L5 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=src/components/ui/card.tsx:L72 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, label-type-columns.tsx, data-table.tsx, utils.ts, cn(), Checkbox()]
- "ui_input_input": "Input" | kind=code-symbol | source=src/components/ui/input.tsx:L13 | neighbors=[data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, input.tsx, input-group.tsx, sidebar.tsx]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=src/components/ui/sidebar.tsx:L47 | neighbors=[nav-main.tsx, nav-user.tsx, sidebar.tsx, Sidebar(), SidebarRail(), SidebarTrigger()]
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=src/components/ui/toggle.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), Toggle(), toggleVariants, toggle-group.tsx]
- "utils_planning_rows_allocatesharedthreads": "allocateSharedThreads()" | kind=code-symbol | source=src/features/production-orders/utils/planning-rows.ts:L101 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, planning-rows.ts, round3(), toNumber(), planning-rows.test.ts]
- "utils_weaving_time": "weaving-time.ts" | kind=code-symbol | source=src/features/work-orders/utils/weaving-time.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, work-order-columns.tsx, WovenSpecification.tsx, estimateWeavingHours(), weaving-time.test.ts]
- "work_orders_types_work_order_status_meta": "WORK_ORDER_STATUS_META" | kind=code-symbol | source=src/features/work-orders/types.ts:L49 | neighbors=[RecentWorkOrders.tsx, work-order-columns.tsx, work-order-table.tsx, WorkOrderDialog.tsx, WorkOrderDetailPage.tsx, types.ts]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@0cdf79fc9acdaced2431ea15102ee44a140e586e": "0cdf79f fix: fallback speed to 600 RPM in WorkOrderDetailPage calculation" | kind=Commit | source=git | neighbors=[main, 12acd8e Sync client from 3Q-facility-Da…, 25e9a18 feat(client): summary-only comp…, WorkOrderDetailPage.tsx, 84328c7 feat: show Est. Weaving Time in…]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@25e9a187ea3b69510e6bd50b2c6d9720138a763f": "25e9a18 feat(client): summary-only completed production view with button-trigge…" | kind=Commit | source=git | neighbors=[0cdf79f fix: fallback speed to 600 RPM …, main, 9947228 feat(client): summary-only comp…, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@84328c76dc04c71950daedb91fd74a72846e96f1": "84328c7 feat: show Est. Weaving Time in Work Order details & Work Order list ta…" | kind=Commit | source=git | neighbors=[main, 0cdf79f fix: fallback speed to 600 RPM …, work-order-columns.tsx, WorkOrderDetailPage.tsx, cf620b4 feat: add Estimated Weaving Tim…]
- "components_combobox": "combobox.tsx" | kind=code-symbol | source=src/shared/components/combobox.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, combobox.tsx, ComboboxOption, ComboboxSelect(), ComboboxSelectProps]
- "components_planlabeltypedialog_unifiedplanningdialog": "UnifiedPlanningDialog()" | kind=code-symbol | source=src/features/production-orders/components/PlanLabelTypeDialog.tsx:L27 | neighbors=[PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]
- "components_stageprogressbars_stageprogressbars": "StageProgressBars()" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L71 | neighbors=[StageProgressBars.tsx, stageRowsOf(), WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "data_table_data_table_export_exportrowstoexcel": "exportRowsToExcel()" | kind=code-symbol | source=src/shared/components/data-table/data-table-export.tsx:L34 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, toRecords(), index.ts]
- "data_table_sticky_columns": "sticky-columns.ts" | kind=code-symbol | source=src/shared/components/data-table/sticky-columns.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, stickyCellClass(), utils.ts, cn()]
- "feedback_operatoravatar_operatoravatar": "OperatorAvatar()" | kind=code-symbol | source=src/components/feedback/OperatorAvatar.tsx:L31 | neighbors=[OperatorDialog.tsx, ProductionSummary.tsx, WovenProductionPanel.tsx, OperatorAvatar.tsx, initialsOf()]
- "hooks_use_batches_usebatchsources": "useBatchSources()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L65 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, EditBatchDialog.tsx, use-batches.ts, index.ts]
- "hooks_use_theme": "use-theme.ts" | kind=code-symbol | source=src/shared/hooks/use-theme.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, useTheme(), ui-store.ts, useUiStore, ThemeToggle.tsx]
- "ink_types_inkpurchase": "InkPurchase" | kind=code-symbol | source=src/features/ink/types.ts:L3 | neighbors=[ink-purchase-columns.tsx, InkPurchaseDialog.tsx, types.ts, InkPurchasesPage.tsx, ink-service.ts]
- "machines_operators_types_operator_type_meta": "OPERATOR_TYPE_META" | kind=code-symbol | source=src/features/machines-operators/types.ts:L37 | neighbors=[machine-columns.tsx, operator-columns.tsx, operator-table.tsx, OperatorDialog.tsx, types.ts]
- "pages_labelsheetspage": "LabelSheetsPage.tsx" | kind=code-symbol | source=src/features/materials/pages/LabelSheetsPage.tsx:L1 | neighbors=[routes.tsx, 815ad75 feat: complete frontend updates…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LabelSheetsPage()]
- "pages_localsheetspage": "LocalSheetsPage.tsx" | kind=code-symbol | source=src/features/materials/pages/LocalSheetsPage.tsx:L1 | neighbors=[routes.tsx, 815ad75 feat: complete frontend updates…, MaterialReceiptPage.tsx, MaterialReceiptPage(), LocalSheetsPage()]
- "pages_stickermaterialspage": "StickerMaterialsPage.tsx" | kind=code-symbol | source=src/features/materials/pages/StickerMaterialsPage.tsx:L1 | neighbors=[routes.tsx, 815ad75 feat: complete frontend updates…, MaterialReceiptPage.tsx, MaterialReceiptPage(), StickerMaterialsPage()]
- "production_orders_batch_types_unit_label": "UNIT_LABEL" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L20 | neighbors=[BatchOutputDialog.tsx, CreateBatchDialog.tsx, EditBatchDialog.tsx, batch-types.ts, batch-edit.ts]
- "production_orders_batch_types_updatebatchinput": "UpdateBatchInput" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L234 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts, batch-edit.ts, batch-edit.test.ts]
- "production_orders_label_types_sizeplan": "SizePlan" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L17 | neighbors=[PlanLabelTypeForm.tsx, SizePlanEditor.tsx, label-types.ts, types.ts, woven-types.ts]
- "production_orders_types_producttype": "ProductType" | kind=code-symbol | source=src/features/production-orders/types.ts:L4 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, ProductionOrderPlanningPage.tsx, types.ts, planning-dialog.ts]
- "providers_layoutprovider": "LayoutProvider.tsx" | kind=code-symbol | source=src/app/providers/LayoutProvider.tsx:L1 | neighbors=[AppProviders.tsx, ee6dbbe feat: production order completi…, LayoutProvider(), tooltip.tsx, TooltipProvider()]
- "providers_queryprovider": "QueryProvider.tsx" | kind=code-symbol | source=src/app/providers/QueryProvider.tsx:L1 | neighbors=[AppProviders.tsx, ee6dbbe feat: production order completi…, query-client.ts, queryClient, QueryProvider()]
- "providers_themeprovider": "ThemeProvider.tsx" | kind=code-symbol | source=src/app/providers/ThemeProvider.tsx:L1 | neighbors=[AppProviders.tsx, ee6dbbe feat: production order completi…, ThemeProvider(), ui-store.ts, useUiStore]
- "providers_toastprovider": "ToastProvider.tsx" | kind=code-symbol | source=src/app/providers/ToastProvider.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ToastProvider(), sonner.tsx, Toaster(), App.tsx]
- "schemas_purchase_schemas": "purchase-schemas.ts" | kind=code-symbol | source=src/features/purchases/schemas/purchase-schemas.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, PurchaseForm.tsx, purchaseSchema, PurchaseSchemaInput]
- "thread_types_thread_base_colors": "THREAD_BASE_COLORS" | kind=code-symbol | source=src/features/thread/types.ts:L6 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, thread-schemas.ts, index.ts, types.ts]
- "thread_types_threadstock": "ThreadStock" | kind=code-symbol | source=src/features/thread/types.ts:L16 | neighbors=[ThreadStockDialog.tsx, ThreadStockPanel.tsx, thread-service.ts, index.ts, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-009.json

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
