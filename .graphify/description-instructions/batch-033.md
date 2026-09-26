# Node Description Batch 34 of 53

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

- "components_machinedialog_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L25 | neighbors=[MachineDialog.tsx]
- "components_machineselect_machineselectprops": "MachineSelectProps" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineSelect.tsx:L5 | neighbors=[MachineSelect.tsx]
- "components_material_table_materialtableprops": "MaterialTableProps" | kind=code-symbol | source=client/src/features/materials/components/material-table.tsx:L13 | neighbors=[material-table.tsx]
- "components_material_table_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/materials/components/material-table.tsx:L11 | neighbors=[material-table.tsx]
- "components_materialform_descriptionoptions": "descriptionOptions" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L24 | neighbors=[MaterialForm.tsx]
- "components_materialform_materialformprops": "MaterialFormProps" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L17 | neighbors=[MaterialForm.tsx]
- "components_materialform_typeoptions": "typeOptions" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L23 | neighbors=[MaterialForm.tsx]
- "components_materialreceiptpage_receiptformdialog": "ReceiptFormDialog()" | kind=code-symbol | source=client/src/features/materials/components/MaterialReceiptPage.tsx:L122 | neighbors=[MaterialReceiptPage.tsx]
- "components_materialselect_materialselectprops": "MaterialSelectProps" | kind=code-symbol | source=client/src/features/materials/components/MaterialSelect.tsx:L7 | neighbors=[MaterialSelect.tsx]
- "components_operator_table_designation_options": "DESIGNATION_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L14 | neighbors=[operator-table.tsx]
- "components_operator_table_operator_type_options": "OPERATOR_TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L15 | neighbors=[operator-table.tsx]
- "components_operatordialog_designation_options": "DESIGNATION_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L29 | neighbors=[OperatorDialog.tsx]
- "components_operatordialog_operator_type_options": "OPERATOR_TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L30 | neighbors=[OperatorDialog.tsx]
- "components_operatordialog_operatordialogprops": "OperatorDialogProps" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L21 | neighbors=[OperatorDialog.tsx]
- "components_operatordialog_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L28 | neighbors=[OperatorDialog.tsx]
- "components_operatorselect_operatorselectprops": "OperatorSelectProps" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorSelect.tsx:L5 | neighbors=[OperatorSelect.tsx]
- "components_planlabeltypedialog_planlabeltypedialogprops": "PlanLabelTypeDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L7 | neighbors=[PlanLabelTypeDialog.tsx]
- "components_planlabeltypedialog_unifiedplanningdialogprops": "UnifiedPlanningDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L15 | neighbors=[PlanLabelTypeDialog.tsx]
- "components_planlabeltypeform_empty": "EMPTY" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L31 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_planlabeltypeformprops": "PlanLabelTypeFormProps" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L20 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_roll_length_options": "ROLL_LENGTH_OPTIONS" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L44 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_stat": "Stat()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L351 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planlabeltypeform_warning": "Warning()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L378 | neighbors=[PlanLabelTypeForm.tsx]
- "components_planned_line_row_actions_plannedlinerowactionsprops": "PlannedLineRowActionsProps" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-row-actions.tsx:L17 | neighbors=[planned-line-row-actions.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-033.json

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
