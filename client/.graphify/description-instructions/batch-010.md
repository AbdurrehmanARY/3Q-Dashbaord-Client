# Node Description Batch 11 of 38

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

- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=src/components/ui/card.tsx:L23 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=src/components/ui/card.tsx:L36 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=src/components/ui/collapsible.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, nav-main.tsx, Collapsible(), CollapsibleContent(), CollapsibleTrigger]
- "ui_progress_progress": "Progress()" | kind=code-symbol | source=src/components/ui/progress.tsx:L5 | neighbors=[LabelTypeRow.tsx, progress-bar.tsx, StageProgressBars.tsx, WorkOrderDetailPage.tsx, progress.tsx]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, utils.ts, cn(), ScrollArea(), ScrollBar()]
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=src/components/ui/sonner.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ToastProvider.tsx, ui-store.ts, useUiStore, Toaster()]
- "utils_batch_edit_editfloor": "editFloor()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L48 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, round2(), batch-edit.test.ts, validateBatchEdit()]
- "utils_batch_edit_firststagecap": "firstStageCap()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L68 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, round2(), batch-edit.test.ts, validateBatchEdit()]
- "vite_config": "vite.config.ts" | kind=code-symbol | source=vite.config.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 6341954 Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, proxyAgent]
- "work_orders_types_producttype": "ProductType" | kind=code-symbol | source=src/features/work-orders/types.ts:L19 | neighbors=[CreateProductionOrderDialog.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx, types.ts]
- "work_orders_types_workorderdetail": "WorkOrderDetail" | kind=code-symbol | source=src/features/work-orders/types.ts:L109 | neighbors=[DispatchDialog.tsx, WorkOrderDialog.tsx, work-order-service.ts, types.ts, WorkOrder]
- "cards_index": "index.ts" | kind=code-symbol | source=src/components/cards/index.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, ee6dbbe feat: production order completi…, index.ts]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@6341954ca91b24b28667711bcd3941949160f6fe": "6341954 Sync client from 3Q-facility-Dashboard monorepo @ 08c0e9d (chore/ci) - …" | kind=Commit | source=git | neighbors=[12acd8e Sync client from 3Q-facility-Da…, main, 9fc49fe Sync client from 3Q-facility-Da…, vite.config.ts]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@9fc49fe6b1628ed049bfef789d86e2b2762cd2d7": "9fc49fe Sync client from 3Q-facility-Dashboard monorepo @ 0f7814f (chore/ci bra…" | kind=Commit | source=git | neighbors=[6341954 Sync client from 3Q-facility-Da…, main, 9947228 feat(client): summary-only comp…, roll-columns.tsx]
- "components_batchstageboard_batchstageboard": "BatchStageBoard()" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L109 | neighbors=[BatchStageBoard.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "components_materialreceiptpage_materialreceiptpage": "MaterialReceiptPage()" | kind=code-symbol | source=src/features/materials/components/MaterialReceiptPage.tsx:L21 | neighbors=[MaterialReceiptPage.tsx, LabelSheetsPage.tsx, LocalSheetsPage.tsx, StickerMaterialsPage.tsx]
- "components_productioncompletionreport_productioncompletionreport": "ProductionCompletionReport()" | kind=code-symbol | source=src/features/production-orders/components/ProductionCompletionReport.tsx:L25 | neighbors=[ProductionCompletionReport.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "components_productionstatusbadge_productionorderstatusbadge": "ProductionOrderStatusBadge()" | kind=code-symbol | source=src/features/production-orders/components/ProductionStatusBadge.tsx:L18 | neighbors=[production-order-columns.tsx, ProductionStatusBadge.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx]
- "components_purchaseform_purchaseform": "PurchaseForm()" | kind=code-symbol | source=src/features/purchases/components/PurchaseForm.tsx:L23 | neighbors=[purchase-row-actions.tsx, PurchaseForm.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx]
- "dashboard_types": "types.ts" | kind=code-symbol | source=src/features/dashboard/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, DashboardKpis, KpiResponse, dashboard-service.ts]
- "data_table_data_table_export_datatableexportcolumn": "DataTableExportColumn" | kind=code-symbol | source=src/shared/components/data-table/data-table-export.tsx:L8 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, index.ts]
- "data_table_data_table_pagination_datatablepagination": "DataTablePagination()" | kind=code-symbol | source=src/shared/components/data-table/data-table-pagination.tsx:L56 | neighbors=[data-table.tsx, data-table-pagination.tsx, pageWindow(), index.ts]
- "data_table_editable_cell_useeditablecell": "useEditableCell()" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L16 | neighbors=[editable-cell.tsx, EditableCell(), editable-cell-number.tsx, index.ts]
- "dialogs_index": "index.ts" | kind=code-symbol | source=src/components/dialogs/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, AppDialog.tsx, ConfirmDialog.tsx]
- "hooks_use_batches_useorderflow": "useOrderFlow()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L87 | neighbors=[WovenProductionPanel.tsx, use-batches.ts, ProductionOrderDashboardPage.tsx, index.ts]
- "hooks_use_batches_usestageresources": "useStageResources()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L78 | neighbors=[CreateBatchDialog.tsx, EditBatchDialog.tsx, use-batches.ts, index.ts]
- "hooks_use_companies_usecompanies": "useCompanies()" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L10 | neighbors=[index.ts, CompanySelect.tsx, CompanyTable.tsx, use-companies.ts]
- "hooks_use_dashboard_trends": "use-dashboard-trends.ts" | kind=code-symbol | source=src/features/dashboard/hooks/use-dashboard-trends.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, useWorkOrderTrend(), index.ts, DashboardPage.tsx]
- "hooks_use_entities_usemachines": "useMachines()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L14 | neighbors=[machine-table.tsx, MachineSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_entities_useoperators": "useOperators()" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L22 | neighbors=[operator-table.tsx, OperatorSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_materials_usematerials": "useMaterials()" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L11 | neighbors=[material-table.tsx, MaterialSelect.tsx, use-materials.ts, index.ts]
- "hooks_use_production_orders_usedeleteproductionorder": "useDeleteProductionOrder()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L131 | neighbors=[production-order-row-actions.tsx, production-order-table.tsx, use-production-orders.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_production_orders_uselinemutation": "useLineMutation()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L203 | neighbors=[use-production-orders.ts, useAssignLineResources(), useTransferRolls(), useUpdateStageProgress()]
- "hooks_use_production_orders_useproductionorderoverview": "useProductionOrderOverview()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L67 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]
- "hooks_use_work_orders_usedeleteworkorder": "useDeleteWorkOrder()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L74 | neighbors=[work-order-row-actions.tsx, work-order-table.tsx, use-work-orders.ts, WorkOrderDetailPage.tsx]
- "ink_types_inkconsumption": "InkConsumption" | kind=code-symbol | source=src/features/ink/types.ts:L35 | neighbors=[ink-consumption-columns.tsx, types.ts, InkConsumptionPage.tsx, ink-service.ts]
- "label_types_types_createlabeltypeinput": "CreateLabelTypeInput" | kind=code-symbol | source=src/features/label-types/types.ts:L10 | neighbors=[use-label-types.ts, index.ts, types.ts, label-type-service.ts]
- "label_types_types_updatelabeltypeinput": "UpdateLabelTypeInput" | kind=code-symbol | source=src/features/label-types/types.ts:L15 | neighbors=[use-label-types.ts, index.ts, types.ts, label-type-service.ts]
- "lib_celebrate_celebratecompletion": "celebrateCompletion()" | kind=code-symbol | source=src/lib/celebrate.ts:L82 | neighbors=[use-completion-celebration.ts, celebrate.ts, fireConfetti(), playSuccessChime()]
- "production_orders_batch_types_isfirststage": "isFirstStage()" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L274 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, EditBatchDialog.tsx, batch-types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-010.json

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
