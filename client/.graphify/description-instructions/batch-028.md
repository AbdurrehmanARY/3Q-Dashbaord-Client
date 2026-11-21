# Node Description Batch 29 of 38

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

- "components_serviceproviderdialog_providerform": "ProviderForm" | kind=code-symbol | source=src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L11 | neighbors=[ServiceProviderDialog.tsx]
- "components_sharedthreadallocation_sharedthreadallocationprops": "SharedThreadAllocationProps" | kind=code-symbol | source=src/features/production-orders/components/SharedThreadAllocation.tsx:L108 | neighbors=[SharedThreadAllocation.tsx]
- "components_sharedthreadallocation_threadavailabilityfor": "threadAvailabilityFor()" | kind=code-symbol | source=src/features/production-orders/components/SharedThreadAllocation.tsx:L70 | neighbors=[SharedThreadAllocation.tsx]
- "components_sizeplaneditor_sizeplaneditorprops": "SizePlanEditorProps" | kind=code-symbol | source=src/features/production-orders/components/SizePlanEditor.tsx:L9 | neighbors=[SizePlanEditor.tsx]
- "components_stagedeductionflowcard_stagedeductionflowcard": "StageDeductionFlowCard()" | kind=code-symbol | source=src/features/production-orders/components/StageDeductionFlowCard.tsx:L10 | neighbors=[StageDeductionFlowCard.tsx]
- "components_stagedeductionflowcard_stagedeductionflowcardprops": "StageDeductionFlowCardProps" | kind=code-symbol | source=src/features/production-orders/components/StageDeductionFlowCard.tsx:L6 | neighbors=[StageDeductionFlowCard.tsx]
- "components_stageprogressbars_stage_style": "STAGE_STYLE" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L7 | neighbors=[StageProgressBars.tsx]
- "components_stageprogressbars_stagebar": "StageBar()" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L142 | neighbors=[StageProgressBars.tsx]
- "components_stageprogressbars_stageprogressbarsprops": "StageProgressBarsProps" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L51 | neighbors=[StageProgressBars.tsx]
- "components_stageprogressbars_stagetotals": "StageTotals" | kind=code-symbol | source=src/features/production-orders/components/StageProgressBars.tsx:L31 | neighbors=[StageProgressBars.tsx]
- "components_stockreconciliationcard_linereconciliationrow": "LineReconciliationRow()" | kind=code-symbol | source=src/features/production-orders/components/StockReconciliationCard.tsx:L41 | neighbors=[StockReconciliationCard.tsx]
- "components_stockreconciliationcard_stockreconciliationcardprops": "StockReconciliationCardProps" | kind=code-symbol | source=src/features/production-orders/components/StockReconciliationCard.tsx:L11 | neighbors=[StockReconciliationCard.tsx]
- "components_threadpurchasepanel_color_options": "COLOR_OPTIONS" | kind=code-symbol | source=src/features/thread/components/ThreadPurchasePanel.tsx:L20 | neighbors=[ThreadPurchasePanel.tsx]
- "components_threadpurchasepanel_denier_options": "DENIER_OPTIONS" | kind=code-symbol | source=src/features/thread/components/ThreadPurchasePanel.tsx:L19 | neighbors=[ThreadPurchasePanel.tsx]
- "components_threadstockdialog_denier_options": "DENIER_OPTIONS" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L37 | neighbors=[ThreadStockDialog.tsx]
- "components_threadstockdialog_threadstockdialogprops": "ThreadStockDialogProps" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L39 | neighbors=[ThreadStockDialog.tsx]
- "components_threadstockdialog_threadstockschema": "threadStockSchema" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L17 | neighbors=[ThreadStockDialog.tsx]
- "components_threadstockdialog_threadstockschemainput": "ThreadStockSchemaInput" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L31 | neighbors=[ThreadStockDialog.tsx]
- "components_threadstockdialog_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=src/features/thread/components/ThreadStockDialog.tsx:L33 | neighbors=[ThreadStockDialog.tsx]
- "components_threadstockpanel_stocktable": "StockTable()" | kind=code-symbol | source=src/features/thread/components/ThreadStockPanel.tsx:L21 | neighbors=[ThreadStockPanel.tsx]
- "components_work_order_row_actions_rowpincontrols": "RowPinControls" | kind=code-symbol | source=src/features/work-orders/components/work-order-row-actions.tsx:L45 | neighbors=[work-order-row-actions.tsx]
- "components_work_order_table_exportcolumns": "exportColumns" | kind=code-symbol | source=src/features/work-orders/components/work-order-table.tsx:L50 | neighbors=[work-order-table.tsx]
- "components_work_order_table_product_type_options": "PRODUCT_TYPE_OPTIONS" | kind=code-symbol | source=src/features/work-orders/components/work-order-table.tsx:L30 | neighbors=[work-order-table.tsx]
- "components_work_order_table_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=src/features/work-orders/components/work-order-table.tsx:L25 | neighbors=[work-order-table.tsx]
- "components_work_order_table_workordertableprops": "WorkOrderTableProps" | kind=code-symbol | source=src/features/work-orders/components/work-order-table.tsx:L43 | neighbors=[work-order-table.tsx]
- "components_workorderdialog_workorderdialogprops": "WorkOrderDialogProps" | kind=code-symbol | source=src/features/work-orders/components/WorkOrderDialog.tsx:L25 | neighbors=[WorkOrderDialog.tsx]
- "components_wovenspecification_estimatedweavingtime": "EstimatedWeavingTime()" | kind=code-symbol | source=src/features/work-orders/components/WovenSpecification.tsx:L16 | neighbors=[WovenSpecification.tsx]
- "components_wovenspecification_sizelabelsinput": "SizeLabelsInput()" | kind=code-symbol | source=src/features/work-orders/components/WovenSpecification.tsx:L131 | neighbors=[WovenSpecification.tsx]
- "components_woventhreadreconciliationcard_woventhreadreconciliationcardprops": "WovenThreadReconciliationCardProps" | kind=code-symbol | source=src/features/production-orders/components/WovenThreadReconciliationCard.tsx:L11 | neighbors=[WovenThreadReconciliationCard.tsx]
- "components_woventrackingtable_woventrackingtableprops": "WovenTrackingTableProps" | kind=code-symbol | source=src/features/production-orders/components/WovenTrackingTable.tsx:L6 | neighbors=[WovenTrackingTable.tsx]
- "dashboard_types_dashboardkpis": "DashboardKpis" | kind=code-symbol | source=src/features/dashboard/types.ts:L5 | neighbors=[types.ts]
- "data_table_data_table_alignclass": "alignClass()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L44 | neighbors=[data-table.tsx]
- "data_table_data_table_column_header_datatablecolumnheaderprops": "DataTableColumnHeaderProps" | kind=code-symbol | source=src/shared/components/data-table/data-table-column-header.tsx:L21 | neighbors=[data-table-column-header.tsx]
- "data_table_data_table_datatableactionbar": "DataTableActionBar()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L499 | neighbors=[data-table.tsx]
- "data_table_data_table_empty_datatableemptyprops": "DataTableEmptyProps" | kind=code-symbol | source=src/shared/components/data-table/data-table-empty.tsx:L10 | neighbors=[data-table-empty.tsx]
- "data_table_data_table_pagination_datatablepaginationprops": "DataTablePaginationProps" | kind=code-symbol | source=src/shared/components/data-table/data-table-pagination.tsx:L19 | neighbors=[data-table-pagination.tsx]
- "data_table_data_table_pinclass": "pinClass()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L81 | neighbors=[data-table.tsx]
- "data_table_data_table_pinstyle": "pinStyle()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L72 | neighbors=[data-table.tsx]
- "data_table_data_table_resolvecolumnid": "resolveColumnId()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L93 | neighbors=[data-table.tsx]
- "data_table_data_table_skeleton_datatableskeletonprops": "DataTableSkeletonProps" | kind=code-symbol | source=src/shared/components/data-table/data-table-skeleton.tsx:L4 | neighbors=[data-table-skeleton.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-028.json

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
