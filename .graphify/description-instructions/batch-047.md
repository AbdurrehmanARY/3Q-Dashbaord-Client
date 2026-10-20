# Node Description Batch 48 of 74

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

- "components_planlabeltypedialog_unifiedplanningdialogprops": "UnifiedPlanningDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L10 | neighbors=[PlanLabelTypeDialog.tsx]
- "components_planlabeltypeform_empty": "EMPTY" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L31 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_empty_row": "EMPTY_ROW" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L92 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_planformvalues": "PlanFormValues" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L67 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_planlabeltypeformprops": "PlanLabelTypeFormProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L71 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_planrowvalues": "PlanRowValues" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L54 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_roll_length_options": "ROLL_LENGTH_OPTIONS" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L86 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_rowtotalrolls": "rowTotalRolls()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L140 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_stat": "Stat()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L151 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_warning": "Warning()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L178 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planned_line_row_actions_plannedlinerowactionsprops": "PlannedLineRowActionsProps" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-row-actions.tsx:L17 | neighbors=[planned-line-row-actions.tsx]
- "components_plannedlabeltypestable_plannedlabeltypestableprops": "PlannedLabelTypesTableProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlannedLabelTypesTable.tsx:L8 | neighbors=[PlannedLabelTypesTable.tsx]
- "components_production_order_columns_priority_meta": "PRIORITY_META" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-columns.tsx:L10 | neighbors=[production-order-columns.tsx]
- "components_production_order_table_exportcolumns": "exportColumns" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-table.tsx:L16 | neighbors=[production-order-table.tsx]
- "components_productionhistorytable_columns": "columns" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionHistoryTable.tsx:L7 | neighbors=[ProductionHistoryTable.tsx]
- "components_productionrunssection_productionrunssection": "ProductionRunsSection()" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionRunsSection.tsx:L15 | neighbors=[ProductionRunsSection.tsx]
- "components_productionstatusbadge_line_status": "LINE_STATUS" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L10 | neighbors=[ProductionStatusBadge.tsx]
- "components_productionstatusbadge_order_status": "ORDER_STATUS" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L4 | neighbors=[ProductionStatusBadge.tsx]
- "components_productionsummary_stagerow": "StageRow()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L21 | neighbors=[ProductionSummary.tsx]
- "components_productionsummary_stagesummary": "StageSummary" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L9 | neighbors=[ProductionSummary.tsx]
- "components_productiontrendchart_daykey": "dayKey()" | kind=code-symbol | source=client/src/features/dashboard/components/ProductionTrendChart.tsx:L34 | neighbors=[ProductionTrendChart.tsx]
- "components_productiontrendchart_range_options": "RANGE_OPTIONS" | kind=code-symbol | source=client/src/features/dashboard/components/ProductionTrendChart.tsx:L22 | neighbors=[ProductionTrendChart.tsx]
- "components_progress_bar_progressbarprops": "ProgressBarProps" | kind=code-symbol | source=client/src/shared/components/progress-bar.tsx:L4 | neighbors=[progress-bar.tsx]
- "components_progress_table_styles_progresscolumn": "ProgressColumn" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L8 | neighbors=[progress-table-styles.ts]
- "components_purchase_table_exportcolumns": "exportColumns" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L19 | neighbors=[purchase-table.tsx]
- "components_purchase_table_purchasetableprops": "PurchaseTableProps" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L34 | neighbors=[purchase-table.tsx]
- "components_purchaseform_purchaseformprops": "PurchaseFormProps" | kind=code-symbol | source=client/src/features/purchases/components/PurchaseForm.tsx:L16 | neighbors=[PurchaseForm.tsx]
- "components_receivedyeingdialog_receiveform": "ReceiveForm" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ReceiveDyeingDialog.tsx:L10 | neighbors=[ReceiveDyeingDialog.tsx]
- "components_roll_stock_row_actions_historydialog": "HistoryDialog()" | kind=code-symbol | source=client/src/features/inventory/components/roll-stock-row-actions.tsx:L41 | neighbors=[roll-stock-row-actions.tsx]
- "components_roll_stock_row_actions_movement_labels": "MOVEMENT_LABELS" | kind=code-symbol | source=client/src/features/inventory/components/roll-stock-row-actions.tsx:L31 | neighbors=[roll-stock-row-actions.tsx]
- "components_rollstockdialog_rollstockdialogprops": "RollStockDialogProps" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L29 | neighbors=[RollStockDialog.tsx]
- "components_rollstockdialog_rollstockschema": "rollStockSchema" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L18 | neighbors=[RollStockDialog.tsx]
- "components_rollstockdialog_rollstockschemainput": "RollStockSchemaInput" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L27 | neighbors=[RollStockDialog.tsx]
- "components_rolltrackingtable_rolltrackingtable": "RollTrackingTable()" | kind=code-symbol | source=client/src/features/production-orders/components/RollTrackingTable.tsx:L18 | neighbors=[RollTrackingTable.tsx]
- "components_rolltrackingtable_rolltrackingtableprops": "RollTrackingTableProps" | kind=code-symbol | source=client/src/features/production-orders/components/RollTrackingTable.tsx:L6 | neighbors=[RollTrackingTable.tsx]
- "components_senddyeingdialog_sendform": "SendForm" | kind=code-symbol | source=client/src/features/thread-dyeing/components/SendDyeingDialog.tsx:L13 | neighbors=[SendDyeingDialog.tsx]
- "components_serviceproviderdialog_providerform": "ProviderForm" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L11 | neighbors=[ServiceProviderDialog.tsx]
- "components_sharedthreadallocation_sharedthreadallocationprops": "SharedThreadAllocationProps" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L108 | neighbors=[SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadavailabilityfor": "threadAvailabilityFor()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L70 | neighbors=[SharedThreadAllocation.tsx]
- "components_sizeplaneditor_sizeplaneditorprops": "SizePlanEditorProps" | kind=code-symbol | source=client/src/features/production-orders/components/SizePlanEditor.tsx:L9 | neighbors=[SizePlanEditor.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-047.json

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
