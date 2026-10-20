# Node Description Batch 4 of 74

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "forms_submitonenter": "SubmitOnEnter.tsx" | kind=code-symbol | source=client/src/components/forms/SubmitOnEnter.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx]
- "hooks_use_woven_production": "use-woven-production.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, WovenThreadReconciliationCard.tsx, invalidateWoven()]
- "services_woven_production_service": "woven-production-service.ts" | kind=code-symbol | source=client/src/features/production-orders/services/woven-production-service.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, use-woven-production.ts, api.ts, api, woven-types.ts]
- "ui_command": "command.tsx" | kind=code-symbol | source=client/src/components/ui/command.tsx:L1 | neighbors=[CommandPalette.tsx, c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Command(), CommandDialog()]
- "batch_and_runs_batch_flow_repository_test": "batch-flow.repository.test.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts:L1 | neighbors=[BATCHES, CONSUMPTIONS, cuttingRow, db(), fakeDb(), FakeRow]
- "batch_and_runs_batch_flow_service_batchflowservice": "BatchFlowService" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L40 | neighbors=[batch-flow.service.ts, .assertBatchStage(), .cancelBatch(), .completeBatch(), .createBatch(), .deleteBatch()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@cc50221eb2e4d6dcb1c1f912a2aa9faf7bd27763": "cc50221 feat: dispatched status + FBR invoice; tabs on top; sticky table columns" | kind=Commit | source=git | neighbors=[adfafe7 polish: nav + page copy for the…, chore/ci, ab23f28 fix: tab switcher rendered unst…, DispatchDialog.tsx, inventory-stock-table.tsx, progress-table-styles.ts]
- "components_brandtable": "BrandTable.tsx" | kind=code-symbol | source=client/src/features/companies/components/BrandTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard, types.ts, Company]
- "components_companytable": "CompanyTable.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanyTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard, types.ts, Company]
- "components_serviceproviderdialog": "ServiceProviderDialog.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ServiceProviderDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ProviderForm, ServiceProviderDialog(), AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_work_order_columns": "work-order-columns.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, c401a21 feat(client): weaving-time disp…, workOrderColumns, work-order-row-actions.tsx]
- "components_workorderbasicinfo": "WorkOrderBasicInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderBasicInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c401a21 feat(client): weaving-time disp…, WorkOrderBasicInfo(), AppCombobox.tsx, AppCombobox(), AppInput.tsx]
- "forms_submitonenter_submitonenter": "SubmitOnEnter()" | kind=code-symbol | source=client/src/components/forms/SubmitOnEnter.tsx:L10 | neighbors=[BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx, InkConsumptionDialog.tsx]
- "pages_dashboardpage": "DashboardPage.tsx" | kind=code-symbol | source=client/src/features/dashboard/pages/DashboardPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, StatCard.tsx, StatCard(), LowStockAlert.tsx]
- "thread_dyeing_types": "types.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "ui_table": "table.tsx" | kind=code-symbol | source=client/src/components/ui/table.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx]
- "components_batchoutputdialog": "BatchOutputDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/BatchOutputDialog.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, BatchOutputDialog(), BatchOutputDialogProps, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_material_table": "material-table.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-table.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, material-columns.tsx, materialColumns, MaterialTable(), MaterialTableProps]
- "components_production_order_columns": "production-order-columns.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-columns.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PRIORITY_META, productionOrderColumns, production-order-row-actions.tsx]
- "components_recentworkorders": "RecentWorkOrders.tsx" | kind=code-symbol | source=client/src/features/dashboard/components/RecentWorkOrders.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, RecentWorkOrders(), StatusBadge.tsx, StatusBadge(), format.ts, formatDate()]
- "components_stageprogressbars": "StageProgressBars.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/StageProgressBars.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, STAGE_STYLE, StageBar(), StageProgressBars(), StageProgressBarsProps, stageRowsOf()]
- "components_stockreconciliationcard": "StockReconciliationCard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/StockReconciliationCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, AppCard.tsx, AppCard, LineReconciliationRow(), StockReconciliationCard(), StockReconciliationCardProps]
- "hooks_use_companies": "use-companies.ts" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx, company-row-actions.tsx]
- "hooks_use_work_orders": "use-work-orders.ts" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, c0c79ec Initial commit: Label Manufactu…, DispatchDialog.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx]
- "lib_format_formatdate": "formatDate()" | kind=code-symbol | source=client/src/lib/format.ts:L12 | neighbors=[CreateProductionOrderDialog.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, production-order-columns.tsx, production-order-table.tsx, ProductionHistoryTable.tsx]
- "machines_operators_types": "types.ts" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge.tsx, machine-columns.tsx, machine-row-actions.tsx]
- "middleware_validaterequest_validaterequest": "validateRequest()" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L15 | neighbors=[batch-flow.routes.ts, brand.routes.ts, company.routes.ts, ink.routes.ts, inventory-roll.routes.ts, inventory.routes.ts]
- "services_batch_service": "batch-service.ts" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.ts:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 95ce13e feat(production): make cutting …, use-batches.ts, api.ts, api]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository": "ThreadInventoryRepository" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L37 | neighbors=[thread-inventory.repository.ts, .consumeForPlanTx(), .countStocks(), .createDyeBatchTransaction(), .createPurchaseWithStock(), .createStockWithHistory()]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=client/src/components/ui/button.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "cards_appcard_appcard": "AppCard" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L22 | neighbors=[AppCard.tsx, BatchStageBoard.tsx, BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, operator-table.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@0a3ef1275ef10a587a90b6718b7cf0f29b9d17d1": "0a3ef12 fix(production): order-scoped cutting/packaging batch visibility - read…" | kind=Commit | source=git | neighbors=[batch-flow.controller.ts, batch-flow.helpers.ts, batch-flow.repository.ts, batch-flow.repository.test.ts, batch-flow.routes.ts, batch-flow.schema.ts]
- "components_planned_line_row_actions": "planned-line-row-actions.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/planned-line-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, planned-line-columns.tsx, PlannedLineRowActions(), PlannedLineRowActionsProps, AppButton.tsx, AppButton]
- "components_production_order_table": "production-order-table.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-table.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, production-order-columns.tsx, productionOrderColumns]
- "components_productionsummary": "ProductionSummary.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, AppCard.tsx, AppCard, ProductionSummary(), StageRow(), StageSummary]
- "data_table_data_table_pagination": "data-table-pagination.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTablePagination(), DataTablePaginationProps, pageWindow(), pagination.tsx]
- "drizzle_0000_lovely_imperial_guard": "0000_lovely_imperial_guard.sql" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brands, companies, inventory_rolls, machines, materials]
- "forms_appselect": "AppSelect.tsx" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, CreateBatchDialog.tsx, DyeThreadDialog.tsx, LogProductionRunDialog.tsx, MachineDialog.tsx, OperatorDialog.tsx]
- "hooks_use_thread_dyeing": "use-thread-dyeing.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, DYEING_KEYS, useCreateProvider()]
- "lib_api_api": "api" | kind=code-symbol | source=client/src/lib/api.ts:L51 | neighbors=[client_healthcheck.tsx, materials-health.ts, production-health.ts, api.ts, batch-service.ts, company-service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-003.json

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
