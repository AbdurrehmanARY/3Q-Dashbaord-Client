# Node Description Batch 19 of 38

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

- "components_woventrackingtable_woventrackingtable": "WovenTrackingTable()" | kind=code-symbol | source=src/features/production-orders/components/WovenTrackingTable.tsx:L14 | neighbors=[WovenProductionPanel.tsx, WovenTrackingTable.tsx]
- "dashboard_types_kpiresponse": "KpiResponse" | kind=code-symbol | source=src/features/dashboard/types.ts:L17 | neighbors=[types.ts, dashboard-service.ts]
- "data_table_data_table_column_header_datatablecolumnheader": "DataTableColumnHeader()" | kind=code-symbol | source=src/shared/components/data-table/data-table-column-header.tsx:L31 | neighbors=[data-table-column-header.tsx, index.ts]
- "data_table_data_table_datatableprops": "DataTableProps" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L123 | neighbors=[data-table.tsx, index.ts]
- "data_table_data_table_export_torecords": "toRecords()" | kind=code-symbol | source=src/shared/components/data-table/data-table-export.tsx:L19 | neighbors=[data-table-export.tsx, exportRowsToExcel()]
- "data_table_data_table_pagination_pagewindow": "pageWindow()" | kind=code-symbol | source=src/shared/components/data-table/data-table-pagination.tsx:L30 | neighbors=[data-table-pagination.tsx, DataTablePagination()]
- "data_table_data_table_toolbar_datatabletoolbar": "DataTableToolbar()" | kind=code-symbol | source=src/shared/components/data-table/data-table-toolbar.tsx:L23 | neighbors=[data-table-toolbar.tsx, index.ts]
- "data_table_data_table_visibleexportcolumns": "visibleExportColumns()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L112 | neighbors=[data-table.tsx, DataTable()]
- "data_table_editable_cell_number_editablecellnumber": "EditableCellNumber()" | kind=code-symbol | source=src/shared/components/data-table/editable-cell-number.tsx:L13 | neighbors=[editable-cell-number.tsx, index.ts]
- "data_table_sticky_columns_stickycellclass": "stickyCellClass()" | kind=code-symbol | source=src/shared/components/data-table/sticky-columns.ts:L15 | neighbors=[index.ts, sticky-columns.ts]
- "feedback_imagepreview_imagepreview": "ImagePreview()" | kind=code-symbol | source=src/components/feedback/ImagePreview.tsx:L23 | neighbors=[ImagePreview.tsx, ImageUploadField.tsx]
- "feedback_operatoravatar_initialsof": "initialsOf()" | kind=code-symbol | source=src/components/feedback/OperatorAvatar.tsx:L5 | neighbors=[OperatorAvatar.tsx, OperatorAvatar()]
- "feedback_operatoravatar_operatoravatarname": "OperatorAvatarName()" | kind=code-symbol | source=src/components/feedback/OperatorAvatar.tsx:L41 | neighbors=[operator-columns.tsx, OperatorAvatar.tsx]
- "feedback_statusbadge_statusbadgevariants": "statusBadgeVariants" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L5 | neighbors=[StatusBadge.tsx, StatusBadge()]
- "feedback_statusbadge_statusvariant": "StatusVariant" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L50 | neighbors=[ProductionStatusBadge.tsx, StatusBadge.tsx]
- "header_appheader_appheader": "AppHeader()" | kind=code-symbol | source=src/shared/components/header/AppHeader.tsx:L16 | neighbors=[AppHeader.tsx, AppLayout.tsx]
- "healthcheck_materials_health_materialshealthresult": "MaterialsHealthResult" | kind=code-symbol | source=src/lib/healthcheck/materials-health.ts:L12 | neighbors=[materials-health.ts, HealthprobeResult]
- "healthcheck_production_health_productionhealthresult": "ProductionHealthResult" | kind=code-symbol | source=src/lib/healthcheck/production-health.ts:L12 | neighbors=[production-health.ts, HealthprobeResult]
- "hooks_use_batches_usebatchtrace": "useBatchTrace()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L96 | neighbors=[BatchTraceDialog.tsx, use-batches.ts]
- "hooks_use_companies_usecreatebrand": "useCreateBrand()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L64 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_usecreatecompany": "useCreateCompany()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L27 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_companies_usedeletebrand": "useDeleteBrand()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L89 | neighbors=[brand-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_usedeletecompany": "useDeleteCompany()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L52 | neighbors=[company-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_useupdatebrand": "useUpdateBrand()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L76 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_useupdatecompany": "useUpdateCompany()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L39 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_completion_celebration_usecompletioncelebration": "useCompletionCelebration()" | kind=code-symbol | source=src/features/production-orders/hooks/use-completion-celebration.ts:L11 | neighbors=[use-completion-celebration.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_dashboard_trends_useworkordertrend": "useWorkOrderTrend()" | kind=code-symbol | source=src/features/dashboard/hooks/use-dashboard-trends.ts:L14 | neighbors=[use-dashboard-trends.ts, DashboardPage.tsx]
- "hooks_use_dashboard_usedashboardkpis": "useDashboardKpis()" | kind=code-symbol | source=src/features/dashboard/hooks/use-dashboard.ts:L8 | neighbors=[use-dashboard.ts, DashboardPage.tsx]
- "hooks_use_entities_usecreatemachine": "useCreateMachine()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L30 | neighbors=[MachineDialog.tsx, use-entities.ts]
- "hooks_use_entities_usecreateoperator": "useCreateOperator()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L57 | neighbors=[OperatorDialog.tsx, use-entities.ts]
- "hooks_use_entities_usedeletemachine": "useDeleteMachine()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L48 | neighbors=[machine-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_usedeleteoperator": "useDeleteOperator()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L75 | neighbors=[operator-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_useupdatemachine": "useUpdateMachine()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L39 | neighbors=[MachineDialog.tsx, use-entities.ts]
- "hooks_use_entities_useupdateoperator": "useUpdateOperator()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L66 | neighbors=[OperatorDialog.tsx, use-entities.ts]
- "hooks_use_ink_usecreateinkconsumption": "useCreateInkConsumption()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L89 | neighbors=[InkConsumptionDialog.tsx, use-ink.ts]
- "hooks_use_ink_usecreateinkpurchase": "useCreateInkPurchase()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L28 | neighbors=[InkPurchaseDialog.tsx, use-ink.ts]
- "hooks_use_ink_usedeleteinkconsumption": "useDeleteInkConsumption()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L101 | neighbors=[use-ink.ts, InkConsumptionPage.tsx]
- "hooks_use_ink_usedeleteinkpurchase": "useDeleteInkPurchase()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L53 | neighbors=[use-ink.ts, InkPurchasesPage.tsx]
- "hooks_use_ink_useinkconsumptionbyoperator": "useInkConsumptionByOperator()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L74 | neighbors=[InkOperatorBreakdown.tsx, use-ink.ts]
- "hooks_use_ink_useinkconsumptions": "useInkConsumptions()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L66 | neighbors=[use-ink.ts, InkConsumptionPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-018.json

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
