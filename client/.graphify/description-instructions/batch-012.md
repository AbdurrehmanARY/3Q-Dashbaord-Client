# Node Description Batch 13 of 38

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

- "components_materialform_materialform": "MaterialForm()" | kind=code-symbol | source=src/features/materials/components/MaterialForm.tsx:L26 | neighbors=[material-row-actions.tsx, MaterialForm.tsx, MaterialMasterPage.tsx]
- "components_operator_table_operatortable": "OperatorTable()" | kind=code-symbol | source=src/features/machines-operators/components/operator-table.tsx:L21 | neighbors=[operator-table.tsx, MachinesOperatorsPage.tsx, OperatorsPage.tsx]
- "components_operatordialog_operatordialog": "OperatorDialog()" | kind=code-symbol | source=src/features/machines-operators/components/OperatorDialog.tsx:L38 | neighbors=[operator-row-actions.tsx, operator-table.tsx, OperatorDialog.tsx]
- "components_operatorselect_operatorselect": "OperatorSelect()" | kind=code-symbol | source=src/features/machines-operators/components/OperatorSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, OperatorSelect.tsx, index.ts]
- "components_planlabeltypeform_planlabeltypeform": "PlanLabelTypeForm()" | kind=code-symbol | source=src/features/production-orders/components/PlanLabelTypeForm.tsx:L194 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, initialRow()]
- "components_productionstatusbadge_productionlinestatusbadge": "ProductionLineStatusBadge()" | kind=code-symbol | source=src/features/production-orders/components/ProductionStatusBadge.tsx:L23 | neighbors=[LabelTypeRow.tsx, PlannedLabelTypesTable.tsx, ProductionStatusBadge.tsx]
- "components_productionsummary_productionsummary": "ProductionSummary()" | kind=code-symbol | source=src/features/production-orders/components/ProductionSummary.tsx:L92 | neighbors=[ProductionSummary.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "components_progress_bar_progressbar": "ProgressBar()" | kind=code-symbol | source=src/shared/components/progress-bar.tsx:L19 | neighbors=[progress-bar.tsx, roll-columns.tsx, woven-columns.tsx]
- "components_progress_table_styles_stickycellclass": "stickyCellClass()" | kind=code-symbol | source=src/features/production-orders/components/progress-table-styles.ts:L44 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, progress-table-styles.ts]
- "components_purchase_table_purchasetable": "PurchaseTable()" | kind=code-symbol | source=src/features/purchases/components/purchase-table.tsx:L46 | neighbors=[purchase-table.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx]
- "components_rollstockdialog_rollstockdialog": "RollStockDialog()" | kind=code-symbol | source=src/features/inventory/components/RollStockDialog.tsx:L36 | neighbors=[inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx]
- "components_sharedthreadallocation_sharedthreadallocation": "SharedThreadAllocation()" | kind=code-symbol | source=src/features/production-orders/components/SharedThreadAllocation.tsx:L124 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, threadAllocationRowErrors()]
- "components_sharedthreadallocation_threadallocationrowerrors": "threadAllocationRowErrors()" | kind=code-symbol | source=src/features/production-orders/components/SharedThreadAllocation.tsx:L95 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, SharedThreadAllocation()]
- "data_table_data_table_datatable": "DataTable()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L176 | neighbors=[data-table.tsx, visibleExportColumns(), index.ts]
- "data_table_data_table_empty_datatableempty": "DataTableEmpty()" | kind=code-symbol | source=src/shared/components/data-table/data-table-empty.tsx:L23 | neighbors=[data-table.tsx, data-table-empty.tsx, index.ts]
- "data_table_data_table_export_printtable": "PrintTable()" | kind=code-symbol | source=src/shared/components/data-table/data-table-export.tsx:L52 | neighbors=[data-table.tsx, data-table-export.tsx, index.ts]
- "data_table_data_table_skeleton_datatableskeleton": "DataTableSkeleton()" | kind=code-symbol | source=src/shared/components/data-table/data-table-skeleton.tsx:L13 | neighbors=[data-table.tsx, data-table-skeleton.tsx, index.ts]
- "data_table_data_table_view_options_datatableviewoptions": "DataTableViewOptions()" | kind=code-symbol | source=src/shared/components/data-table/data-table-view-options.tsx:L32 | neighbors=[data-table.tsx, data-table-view-options.tsx, index.ts]
- "data_table_editable_cell_editablecell": "EditableCell()" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L141 | neighbors=[editable-cell.tsx, useEditableCell(), index.ts]
- "data_table_editable_cell_editablecellinput": "EditableCellInput()" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L97 | neighbors=[editable-cell.tsx, editable-cell-number.tsx, index.ts]
- "feedback_index": "index.ts" | kind=code-symbol | source=src/components/feedback/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, StatusBadge.tsx]
- "forms_imageuploadfield_imageuploadfield": "ImageUploadField()" | kind=code-symbol | source=src/components/forms/ImageUploadField.tsx:L38 | neighbors=[DispatchDialog.tsx, DispatchInfo.tsx, ImageUploadField.tsx]
- "healthcheck_client_healthcheck_healthproberesult": "HealthprobeResult" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L12 | neighbors=[client_healthcheck.tsx, materials-health.ts, production-health.ts]
- "healthcheck_client_healthcheck_probebackend": "probeBackend()" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L107 | neighbors=[client_healthcheck.tsx, materials-health.ts, production-health.ts]
- "hooks_use_batches_usecancelbatch": "useCancelBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L170 | neighbors=[BatchStageBoard.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_usecompletebatch": "useCompleteBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L161 | neighbors=[BatchStageBoard.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_usecreatebatch": "useCreateBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L116 | neighbors=[CreateBatchDialog.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_usedeletebatch": "useDeleteBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L179 | neighbors=[BatchStageBoard.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_uselinebatches": "useLineBatches()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L49 | neighbors=[BatchStageBoard.tsx, use-batches.ts, index.ts]
- "hooks_use_batches_userecordoutput": "useRecordOutput()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L152 | neighbors=[BatchOutputDialog.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_usestartbatch": "useStartBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L143 | neighbors=[BatchStageBoard.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_batches_useupdatebatch": "useUpdateBatch()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L134 | neighbors=[EditBatchDialog.tsx, use-batches.ts, useBatchMutation()]
- "hooks_use_companies_usecompanybrands": "useCompanyBrands()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L18 | neighbors=[index.ts, BrandTable.tsx, use-companies.ts]
- "hooks_use_ink_useinkstock": "useInkStock()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L18 | neighbors=[InkConsumptionDialog.tsx, InkStockPanel.tsx, use-ink.ts]
- "hooks_use_inventory_useinventorystock": "useInventoryStock()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L11 | neighbors=[inventory-stock-table.tsx, use-inventory.ts, index.ts]
- "hooks_use_label_types_usecreatelabeltype": "useCreateLabelType()" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L32 | neighbors=[CreateLabelTypeDialog.tsx, use-label-types.ts, index.ts]
- "hooks_use_label_types_uselabeltype": "useLabelType()" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L23 | neighbors=[use-label-types.ts, index.ts, LabelTypeMasterPage.tsx]
- "hooks_use_label_types_uselabeltypes": "useLabelTypes()" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L15 | neighbors=[LabelTypeTable.tsx, use-label-types.ts, index.ts]
- "hooks_use_label_types_useupdatelabeltype": "useUpdateLabelType()" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L44 | neighbors=[CreateLabelTypeDialog.tsx, use-label-types.ts, index.ts]
- "hooks_use_mobile": "use-mobile.ts" | kind=code-symbol | source=src/hooks/use-mobile.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, useIsMobile(), sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-012.json

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
