# Node Description Batch 47 of 74

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

- "components_dyethreaddialog_base_color_options": "BASE_COLOR_OPTIONS" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L15 | neighbors=[DyeThreadDialog.tsx]
- "components_dyethreaddialog_denier_options": "DENIER_OPTIONS" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L14 | neighbors=[DyeThreadDialog.tsx]
- "components_editablelabeltypetable_editablelabeltypetable": "EditableLabelTypeTable()" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L34 | neighbors=[EditableLabelTypeTable.tsx]
- "components_editablelabeltypetable_editablelabeltypetableprops": "EditableLabelTypeTableProps" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L22 | neighbors=[EditableLabelTypeTable.tsx]
- "components_editablelabeltypetable_empty_errors": "EMPTY_ERRORS" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L435 | neighbors=[EditableLabelTypeTable.tsx]
- "components_editablelabeltypetable_empty_options": "EMPTY_OPTIONS" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L436 | neighbors=[EditableLabelTypeTable.tsx]
- "components_ink_purchase_columns_columncallbacks": "ColumnCallbacks" | kind=code-symbol | source=client/src/features/ink/components/ink-purchase-columns.tsx:L9 | neighbors=[ink-purchase-columns.tsx]
- "components_inkconsumptiondialog_props": "Props" | kind=code-symbol | source=client/src/features/ink/components/InkConsumptionDialog.tsx:L16 | neighbors=[InkConsumptionDialog.tsx]
- "components_inkpurchasedialog_props": "Props" | kind=code-symbol | source=client/src/features/ink/components/InkPurchaseDialog.tsx:L12 | neighbors=[InkPurchaseDialog.tsx]
- "components_inventory_stock_table_exportcolumns": "exportColumns" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L19 | neighbors=[inventory-stock-table.tsx]
- "components_inventory_stock_table_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L17 | neighbors=[inventory-stock-table.tsx]
- "components_labeltyperow_empty_errors": "EMPTY_ERRORS" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L43 | neighbors=[LabelTypeRow.tsx]
- "components_labeltyperow_labeltyperowprops": "LabelTypeRowProps" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L23 | neighbors=[LabelTypeRow.tsx]
- "components_labeltyperow_machineoption": "MachineOption" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L14 | neighbors=[LabelTypeRow.tsx]
- "components_labeltyperow_numbercell": "NumberCell()" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L45 | neighbors=[LabelTypeRow.tsx]
- "components_labeltyperow_operatoroption": "OperatorOption" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L18 | neighbors=[LabelTypeRow.tsx]
- "components_labeltyperow_selectcell": "SelectCell()" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L85 | neighbors=[LabelTypeRow.tsx]
- "components_logproductionrundialog_formvalues": "FormValues" | kind=code-symbol | source=client/src/features/production-runs/components/LogProductionRunDialog.tsx:L15 | neighbors=[LogProductionRunDialog.tsx]
- "components_logproductionrundialog_logproductionrundialogprops": "LogProductionRunDialogProps" | kind=code-symbol | source=client/src/features/production-runs/components/LogProductionRunDialog.tsx:L24 | neighbors=[LogProductionRunDialog.tsx]
- "components_machine_table_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-table.tsx:L13 | neighbors=[machine-table.tsx]
- "components_machinedialog_machinedialogprops": "MachineDialogProps" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L17 | neighbors=[MachineDialog.tsx]
- "components_machinedialog_product_type_options": "PRODUCT_TYPE_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L26 | neighbors=[MachineDialog.tsx]
- "components_machinedialog_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L24 | neighbors=[MachineDialog.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-046.json

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
