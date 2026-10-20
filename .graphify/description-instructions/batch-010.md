# Node Description Batch 11 of 74

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

- "ui_combobox_comboboxselect": "ComboboxSelect()" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L301 | neighbors=[combobox.tsx, inventory-stock-table.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, work-order-table.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=client/src/components/ui/input.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, utils.ts, cn()]
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=client/src/components/ui/toggle-group.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProductionTrendChart.tsx, utils.ts, cn(), toggle.tsx, ToggleGroup()]
- "utils_production_order_export": "production-order-export.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/production-order-export.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, ProductionOrderDashboardPage.tsx, format.ts, formatDate(), formatNumber(), types.ts]
- "work_orders_types_workorder": "WorkOrder" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L60 | neighbors=[DispatchDialog.tsx, work-order-columns.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx, work-order-service.ts]
- "work_orders_work_order_repository": "work-order.repository.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L1 | neighbors=[2e755d6 feat(server): persist estimated…, ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, NewWovenWorkOrderDetail]
- "batch_and_runs_batch_flow_repository_round2": "round2()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1510 | neighbors=[batch-flow.repository.ts, .flowInTx(), .lockSourcesTx(), .logStageTx(), .releaseToSourcesTx(), .remainingPlannedSizeTx()]
- "batch_and_runs_batch_flow_service_batchflowservice_getbatch": ".getBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L137 | neighbors=[BatchFlowService, .cancelBatch(), .completeBatch(), .createBatch(), .withEstimates(), .recordOutput()]
- "batch_and_runs_batch_flow_service_test": "batch-flow.service.test.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.test.ts:L1 | neighbors=[batchRow(), cuttingBatch, mockOrder22(), mocks, service(), 0a3ef12 fix(production): order-scoped c…]
- "batch_and_runs_production_run_service": "production-run.service.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.service.ts:L1 | neighbors=[ProductionRunService, messages.ts, Entity, Messages, ApiError.ts, BadRequestError]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@ab23f28056f804cacf08f052370c19d06240c0f3": "ab23f28 fix: tab switcher rendered unstyled and collapsed the page layout" | kind=Commit | source=git | neighbors=[chore/ci, c27dc7d feat(server): stock CRUD histor…, InventoryStockPage.tsx, PurchaseRecordPage.tsx, index.ts, SegmentedTabs.tsx]
- "companies_company_repository": "company.repository.ts" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, BrandRepository, CompanyRepository, index.ts, db, schema.ts]
- "companies_company_repository_brandrepository": "BrandRepository" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L49 | neighbors=[company.repository.ts, .create(), .delete(), .findAll(), .findByCompanyId(), .findById()]
- "components_company_columns": "company-columns.tsx" | kind=code-symbol | source=client/src/features/companies/components/company-columns.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, types.ts, Company, companyColumns, company-row-actions.tsx, CompanyRowActions()]
- "components_companyinfo": "CompanyInfo.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/CompanyInfo.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, index.ts, CompanyInfo(), AppCombobox.tsx, AppCombobox(), work-order-schemas.ts]
- "components_companyselect": "CompanySelect.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanySelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, CompanySelect(), CompanySelectProps, AppCombobox.tsx, AppCombobox()]
- "data_table_data_table_export": "data-table-export.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, EditableLabelTypeTable.tsx, data-table.tsx, DataTableExportColumn, exportRowsToExcel(), PrintTable()]
- "db_schema_material": "Material" | kind=code-symbol | source=server/src/shared/db/schema.ts:L91 | neighbors=[analytics.repository.ts, schema.ts, inventory.service.ts, material.repository.ts, material.service.ts, production-order-overview.builder.ts]
- "db_schema_productionorderline": "ProductionOrderLine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L103 | neighbors=[analytics.repository.ts, schema.ts, production-order.helpers.ts, production-order.helpers.test.ts, production-order-overview.builder.ts, production-order.repository.ts]
- "dialogs_confirmdialog_confirmdialog": "ConfirmDialog()" | kind=code-symbol | source=client/src/components/dialogs/ConfirmDialog.tsx:L26 | neighbors=[ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog.tsx, ProductionOrderDashboardPage.tsx]
- "error_boundary_errorboundary_errorboundary": "ErrorBoundary" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L15 | neighbors=[ErrorBoundary.tsx, Component, .componentDidCatch(), .constructor(), .getDerivedStateFromError(), .render()]
- "healthcheck_materials_health": "materials-health.ts" | kind=code-symbol | source=client/src/lib/healthcheck/materials-health.ts:L1 | neighbors=[2c8bd34 feat(client): per-table column …, client_healthcheck.tsx, HealthprobeResult, probeBackend(), MaterialsHealthResult, probeMaterialsHealth()]
- "healthcheck_production_health": "production-health.ts" | kind=code-symbol | source=client/src/lib/healthcheck/production-health.ts:L1 | neighbors=[2c8bd34 feat(client): per-table column …, client_healthcheck.tsx, HealthprobeResult, probeBackend(), probeProductionHealth(), ProductionHealthResult]
- "hooks_use_batches_usebatchmutation": "useBatchMutation()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L28 | neighbors=[use-batches.ts, useCancelBatch(), useCompleteBatch(), useCreateBatch(), useDeleteBatch(), useRecordOutput()]
- "inventory_inventory_roll_schema": "inventory-roll.schema.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateInventoryRollDTO, createInventoryRollSchema, inventoryRollParamsSchema, listInventoryRollsQuerySchema, listRollMovementsQuerySchema]
- "inventory_types_stocklevel": "StockLevel" | kind=code-symbol | source=client/src/features/inventory/types.ts:L1 | neighbors=[inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx, use-inventory.ts, index.ts]
- "label_types_label_types_schema": "label-types.schema.ts" | kind=code-symbol | source=server/src/modules/label-types/label-types.schema.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, CreateLabelTypeDTO, createLabelTypeSchema, labelTypeEnum, labelTypeParamsSchema, labelTypesQuerySchema]
- "label_types_label_types_service": "label-types.service.ts" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, messages.ts, Entity, Messages, ApiError.ts, ConflictError]
- "layout_pagecontainer": "PageContainer.tsx" | kind=code-symbol | source=client/src/components/layout/PageContainer.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PageContainer(), PageContainerProps, SIZES, utils.ts]
- "lib_format_todayiso": "todayISO()" | kind=code-symbol | source=client/src/lib/format.ts:L35 | neighbors=[DispatchDialog.tsx, InkPurchaseDialog.tsx, PurchaseForm.tsx, SendDyeingDialog.tsx, ThreadPurchasePanel.tsx, WorkOrderDialog.tsx]
- "operators_operator_repository": "operator.repository.ts" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, Operator, OperatorFilters]
- "production_orders_batch_types_batchstage": "BatchStage" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L3 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, StageProgressBars.tsx, use-batches.ts, batch-types.ts, index.ts]
- "production_orders_woven_types_planwoveninput": "PlanWovenInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L101 | neighbors=[PlanLabelTypeForm.tsx, use-woven-production.ts, woven-types.ts, woven-production-service.ts, planning-dialog.ts, planning-dialog.test.ts]
- "schemas_work_order_schemas_workorderschemainput": "WorkOrderSchemaInput" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L91 | neighbors=[ArtworkAndComment.tsx, CompanyInfo.tsx, DispatchInfo.tsx, OrderInfo.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx]
- "scripts_verify_batch_visibility": "verify-batch-visibility.mjs" | kind=code-symbol | source=server/scripts/verify-batch-visibility.mjs:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 8221c40 chore(scripts,docs): default th…, 95ce13e feat(production): make cutting …, env, envPath, here]
- "services_batch_service_test": "batch-service.test.ts" | kind=code-symbol | source=client/src/features/production-orders/services/batch-service.test.ts:L1 | neighbors=[95ce13e feat(production): make cutting …, batch-types.ts, BatchStage, batch-service.ts, batchService, mockCalls]
- "services_purchase_service": "purchase-service.ts" | kind=code-symbol | source=client/src/features/purchases/services/purchase-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-purchases.ts, api.ts, api, types.ts, PurchaseInput]
- "tables_production_order_lines_table": "production-order-lines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-order-lines.table.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, ee6d4dd refactor(server): vertical-slic…, size-plans.ts, SizePlan, productionOrderLines, 9b99ce1 feat: complete production workf…]
- "tables_work_orders_table": "work-orders.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/work-orders.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, workOrders, workOrderStatusEnum, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "thread_dyeing_thread_dyeing_service": "thread-dyeing.service.ts" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, messages.ts, Entity, Messages, ApiError.ts, BadRequestError]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-010.json

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
