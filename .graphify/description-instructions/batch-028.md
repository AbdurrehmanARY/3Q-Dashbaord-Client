# Node Description Batch 29 of 74

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

- "components_materialselect_materialselect": "MaterialSelect()" | kind=code-symbol | source=client/src/features/materials/components/MaterialSelect.tsx:L18 | neighbors=[MaterialSelect.tsx, index.ts]
- "components_operator_columns_operatorcolumns": "operatorColumns" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-columns.tsx:L10 | neighbors=[operator-columns.tsx, operator-table.tsx]
- "components_operator_row_actions_operatorrowactions": "OperatorRowActions()" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-row-actions.tsx:L28 | neighbors=[operator-columns.tsx, operator-row-actions.tsx]
- "components_orderinfo_orderinfo": "OrderInfo()" | kind=code-symbol | source=client/src/features/work-orders/components/OrderInfo.tsx:L5 | neighbors=[OrderInfo.tsx, WorkOrderDialog.tsx]
- "components_planlabeltypeform_initialrow": "initialRow()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L106 | neighbors=[PlanLabelTypeForm.tsx, PlanLabelTypeForm()]
- "components_planlabeltypeform_planformsubmitpayload": "PlanFormSubmitPayload" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L49 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx]
- "components_planned_line_columns_createplannedlinecolumns": "createPlannedLineColumns()" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-columns.tsx:L14 | neighbors=[planned-line-columns.tsx, ProductionOrderPlanningPage.tsx]
- "components_planned_line_row_actions_plannedlinerowactions": "PlannedLineRowActions()" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-row-actions.tsx:L26 | neighbors=[planned-line-columns.tsx, planned-line-row-actions.tsx]
- "components_plannedlabeltypestable_plannedlabeltypestable": "PlannedLabelTypesTable()" | kind=code-symbol | source=client/src/features/production-orders/components/PlannedLabelTypesTable.tsx:L14 | neighbors=[PlannedLabelTypesTable.tsx, ProductionOrderDashboardPage.tsx]
- "components_production_order_columns_productionordercolumns": "productionOrderColumns" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-columns.tsx:L19 | neighbors=[production-order-columns.tsx, production-order-table.tsx]
- "components_production_order_row_actions_productionorderrowactions": "ProductionOrderRowActions()" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-row-actions.tsx:L27 | neighbors=[production-order-columns.tsx, production-order-row-actions.tsx]
- "components_production_order_table_productionordertable": "ProductionOrderTable()" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-table.tsx:L36 | neighbors=[production-order-table.tsx, ProductionOrderListPage.tsx]
- "components_productionhistorytable_productionhistorytable": "ProductionHistoryTable()" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionHistoryTable.tsx:L52 | neighbors=[ProductionHistoryTable.tsx, ProductionRunsSection.tsx]
- "components_productionsummarycard_productionsummarycard": "ProductionSummaryCard()" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionSummaryCard.tsx:L7 | neighbors=[ProductionRunsSection.tsx, ProductionSummaryCard.tsx]
- "components_productiontrendchart_productiontrendchart": "ProductionTrendChart()" | kind=code-symbol | source=client/src/features/dashboard/components/ProductionTrendChart.tsx:L49 | neighbors=[ProductionTrendChart.tsx, DashboardPage.tsx]
- "components_progress_table_styles_alignclass": "alignClass()" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L37 | neighbors=[EditableLabelTypeTable.tsx, progress-table-styles.ts]
- "components_progress_table_styles_progress_columns": "PROGRESS_COLUMNS" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L18 | neighbors=[EditableLabelTypeTable.tsx, progress-table-styles.ts]
- "components_purchase_columns_purchasecolumns": "purchaseColumns" | kind=code-symbol | source=client/src/features/purchases/components/purchase-columns.tsx:L8 | neighbors=[purchase-columns.tsx, purchase-table.tsx]
- "components_purchase_row_actions_purchaserowactions": "PurchaseRowActions()" | kind=code-symbol | source=client/src/features/purchases/components/purchase-row-actions.tsx:L29 | neighbors=[purchase-columns.tsx, purchase-row-actions.tsx]
- "components_receivedyeingdialog_receivedyeingdialog": "ReceiveDyeingDialog()" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ReceiveDyeingDialog.tsx:L23 | neighbors=[ReceiveDyeingDialog.tsx, ThreadDyeingPage.tsx]
- "components_recentworkorders_recentworkorders": "RecentWorkOrders()" | kind=code-symbol | source=client/src/features/dashboard/components/RecentWorkOrders.tsx:L16 | neighbors=[RecentWorkOrders.tsx, DashboardPage.tsx]
- "components_roll_columns_rollcolumns": "rollColumns" | kind=code-symbol | source=client/src/features/production-orders/components/roll-columns.tsx:L13 | neighbors=[roll-columns.tsx, RollTrackingTable.tsx]
- "components_roll_stock_row_actions_rollstockrowactions": "RollStockRowActions()" | kind=code-symbol | source=client/src/features/inventory/components/roll-stock-row-actions.tsx:L94 | neighbors=[inventory-columns.tsx, roll-stock-row-actions.tsx]
- "components_senddyeingdialog_senddyeingdialog": "SendDyeingDialog()" | kind=code-symbol | source=client/src/features/thread-dyeing/components/SendDyeingDialog.tsx:L23 | neighbors=[SendDyeingDialog.tsx, ThreadDyeingPage.tsx]
- "components_serviceproviderdialog_serviceproviderdialog": "ServiceProviderDialog()" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L18 | neighbors=[ServiceProviderDialog.tsx, ThreadDyeingPage.tsx]
- "components_sharedthreadallocation_emptythreadallocationrow": "emptyThreadAllocationRow()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L25 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadallocationrow": "ThreadAllocationRow" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L16 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadallocationtothreads": "threadAllocationToThreads()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L35 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadstoallocationrows": "threadsToAllocationRows()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L46 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadstocklike": "ThreadStockLike" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L60 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_sizeplaneditor_sizeplaneditor": "SizePlanEditor()" | kind=code-symbol | source=client/src/features/production-orders/components/SizePlanEditor.tsx:L28 | neighbors=[PlanLabelTypeForm.tsx, SizePlanEditor.tsx]
- "components_stageprogressbars_stagerowsof": "stageRowsOf()" | kind=code-symbol | source=client/src/features/production-orders/components/StageProgressBars.tsx:L90 | neighbors=[StageProgressBars.tsx, StageProgressBars()]
- "components_stockreconciliationcard_stockreconciliationcard": "StockReconciliationCard()" | kind=code-symbol | source=client/src/features/production-orders/components/StockReconciliationCard.tsx:L16 | neighbors=[StockReconciliationCard.tsx, ProductionOrderDashboardPage.tsx]
- "components_threadpurchasepanel_threadpurchasepanel": "ThreadPurchasePanel()" | kind=code-symbol | source=client/src/features/thread/components/ThreadPurchasePanel.tsx:L29 | neighbors=[ThreadPurchasePanel.tsx, index.ts]
- "components_threadstockdialog_threadstockdialog": "ThreadStockDialog()" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockDialog.tsx:L46 | neighbors=[ThreadStockDialog.tsx, ThreadStockPanel.tsx]
- "components_threadstockpanel_dyedthreadstockpanel": "DyedThreadStockPanel()" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockPanel.tsx:L224 | neighbors=[ThreadStockPanel.tsx, index.ts]
- "components_threadstockpanel_threadstockpanel": "ThreadStockPanel()" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockPanel.tsx:L285 | neighbors=[ThreadStockPanel.tsx, index.ts]
- "components_threadstockpanel_undyedthreadstockpanel": "UndyedThreadStockPanel()" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockPanel.tsx:L147 | neighbors=[ThreadStockPanel.tsx, index.ts]
- "components_work_order_columns_workordercolumns": "workOrderColumns" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-columns.tsx:L23 | neighbors=[work-order-columns.tsx, work-order-table.tsx]
- "components_work_order_row_actions_workorderrowactions": "WorkOrderRowActions()" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-row-actions.tsx:L52 | neighbors=[work-order-columns.tsx, work-order-row-actions.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-028.json

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
