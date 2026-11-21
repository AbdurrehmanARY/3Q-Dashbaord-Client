# Node Description Batch 8 of 38

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

- "components_progress_table_styles": "progress-table-styles.ts" | kind=code-symbol | source=src/features/production-orders/components/progress-table-styles.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx, alignClass(), PROGRESS_COLUMNS]
- "components_rolltrackingtable": "RollTrackingTable.tsx" | kind=code-symbol | source=src/features/production-orders/components/RollTrackingTable.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, roll-columns.tsx, rollColumns, RollTrackingTable(), RollTrackingTableProps]
- "healthcheck_materials_health": "materials-health.ts" | kind=code-symbol | source=src/lib/healthcheck/materials-health.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, client_healthcheck.tsx, HealthprobeResult, probeBackend(), MaterialsHealthResult]
- "healthcheck_production_health": "production-health.ts" | kind=code-symbol | source=src/lib/healthcheck/production-health.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, client_healthcheck.tsx, HealthprobeResult, probeBackend(), probeProductionHealth()]
- "inventory_index": "index.ts" | kind=code-symbol | source=src/features/inventory/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, LowStockAlert.tsx, MaterialSelect.tsx, PlanLabelTypeForm.tsx, use-inventory.ts, useInventoryStock()]
- "materials_receipts_types": "receipts-types.ts" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, MaterialReceiptPage.tsx, use-material-receipts.ts, MaterialReceipt, MaterialReceiptConfig, ReceiptField]
- "pages_machinesoperatorspage": "MachinesOperatorsPage.tsx" | kind=code-symbol | source=src/features/machines-operators/pages/MachinesOperatorsPage.tsx:L1 | neighbors=[routes.tsx, ee6dbbe feat: production order completi…, machine-table.tsx, MachineTable(), operator-table.tsx, OperatorTable()]
- "production_orders_batch_types_productionbatch": "ProductionBatch" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L31 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, EditBatchDialog.tsx, batch-types.ts, index.ts]
- "purchases_types": "types.ts" | kind=code-symbol | source=src/features/purchases/types.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, use-purchases.ts]
- "schemas_material_schemas": "material-schemas.ts" | kind=code-symbol | source=src/features/materials/schemas/material-schemas.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, material-table.tsx, MaterialForm.tsx, index.ts, MATERIAL_DESCRIPTIONS]
- "services_batch_service_test": "batch-service.test.ts" | kind=code-symbol | source=src/features/production-orders/services/batch-service.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, batch-types.ts, BatchStage, batch-service.ts, batchService]
- "services_entity_service": "entity-service.ts" | kind=code-symbol | source=src/features/machines-operators/services/entity-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-entities.ts, api.ts, api, types.ts, Machine]
- "services_material_receipts_service": "material-receipts-service.ts" | kind=code-symbol | source=src/features/materials/services/material-receipts-service.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, use-material-receipts.ts, api.ts, api, receipts-types.ts, MaterialReceipt]
- "services_production_run_service": "production-run-service.ts" | kind=code-symbol | source=src/features/production-runs/services/production-run-service.ts:L1 | neighbors=[815ad75 feat: complete frontend updates…, use-production-runs.ts, api.ts, api, types.ts, LogProductionRunInput]
- "shared_navigation": "navigation.ts" | kind=code-symbol | source=src/shared/navigation.ts:L1 | neighbors=[CommandPalette.tsx, 12acd8e Sync client from 3Q-facility-Da…, 815ad75 feat: complete frontend updates…, 9947228 feat(client): summary-only comp…, ee6dbbe feat: production order completi…, navigation]
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=src/components/ui/calendar.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, date-picker.tsx, utils.ts, cn(), button.tsx, Button]
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, utils.ts, cn()]
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=src/components/ui/toggle-group.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, ProductionTrendChart.tsx, utils.ts, cn(), toggle.tsx, ToggleGroup()]
- "utils_batch_edit_validatebatchedit": "validateBatchEdit()" | kind=code-symbol | source=src/features/production-orders/utils/batch-edit.ts:L138 | neighbors=[EditBatchDialog.tsx, batch-edit.ts, batch-edit.test.ts, editFloor(), editSourceCap(), firstStageCap()]
- "work_orders_types_workorder": "WorkOrder" | kind=code-symbol | source=src/features/work-orders/types.ts:L60 | neighbors=[DispatchDialog.tsx, work-order-columns.tsx, work-order-row-actions.tsx, work-order-table.tsx, WorkOrderDialog.tsx, work-order-service.ts]
- "commit:repo:github.com/AbdurrehmanARY/3Q-Dashbaord-Client@567656d3c6b597091fab20b641b477ad4688fe83": "567656d feat: add max length validation and scrollable container to WorkOrderDi…" | kind=Commit | source=git | neighbors=[main, c2dc30d feat: restrict weaving machine …, ArtworkAndComment.tsx, DispatchInfo.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx]
- "components_company_columns": "company-columns.tsx" | kind=code-symbol | source=src/features/companies/components/company-columns.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, types.ts, Company, companyColumns, company-row-actions.tsx, CompanyRowActions()]
- "components_companyinfo": "CompanyInfo.tsx" | kind=code-symbol | source=src/features/work-orders/components/CompanyInfo.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, index.ts, CompanyInfo(), AppCombobox.tsx, AppCombobox(), work-order-schemas.ts]
- "components_companyselect": "CompanySelect.tsx" | kind=code-symbol | source=src/features/companies/components/CompanySelect.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, CompanySelect(), CompanySelectProps, AppCombobox.tsx, AppCombobox()]
- "data_table_data_table_export": "data-table-export.tsx" | kind=code-symbol | source=src/shared/components/data-table/data-table-export.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, EditableLabelTypeTable.tsx, data-table.tsx, DataTableExportColumn, exportRowsToExcel(), PrintTable()]
- "dialogs_confirmdialog_confirmdialog": "ConfirmDialog()" | kind=code-symbol | source=src/components/dialogs/ConfirmDialog.tsx:L26 | neighbors=[ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog.tsx, ProductionOrderDashboardPage.tsx]
- "error_boundary_errorboundary_errorboundary": "ErrorBoundary" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L15 | neighbors=[ErrorBoundary.tsx, Component, .componentDidCatch(), .constructor(), .getDerivedStateFromError(), .render()]
- "hooks_use_batches_usebatchmutation": "useBatchMutation()" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L28 | neighbors=[use-batches.ts, useCancelBatch(), useCompleteBatch(), useCreateBatch(), useDeleteBatch(), useRecordOutput()]
- "inventory_types_stocklevel": "StockLevel" | kind=code-symbol | source=src/features/inventory/types.ts:L1 | neighbors=[inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx, use-inventory.ts, index.ts]
- "layout_pagecontainer": "PageContainer.tsx" | kind=code-symbol | source=src/components/layout/PageContainer.tsx:L1 | neighbors=[815ad75 feat: complete frontend updates…, ee6dbbe feat: production order completi…, PageContainer(), PageContainerProps, SIZES, utils.ts]
- "lib_format_todayiso": "todayISO()" | kind=code-symbol | source=src/lib/format.ts:L35 | neighbors=[DispatchDialog.tsx, InkPurchaseDialog.tsx, PurchaseForm.tsx, SendDyeingDialog.tsx, ThreadPurchasePanel.tsx, WorkOrderDialog.tsx]
- "production_orders_batch_types_batchstage": "BatchStage" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L3 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, StageProgressBars.tsx, use-batches.ts, batch-types.ts, index.ts]
- "production_orders_types_productionorderoverview": "ProductionOrderOverview" | kind=code-symbol | source=src/features/production-orders/types.ts:L299 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, index.ts, types.ts, production-order-service.ts, line-draft.ts]
- "schemas_label_type_schemas": "label-type-schemas.ts" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, CreateLabelTypeDialog.tsx, createLabelTypeSchema, LabelTypeFormData, labelTypeSchema]
- "schemas_work_order_schemas_workorderschemainput": "WorkOrderSchemaInput" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L91 | neighbors=[ArtworkAndComment.tsx, CompanyInfo.tsx, DispatchInfo.tsx, OrderInfo.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx]
- "services_company_service": "company-service.ts" | kind=code-symbol | source=src/features/companies/services/company-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-companies.ts, types.ts, Brand, Company, api.ts]
- "services_material_service": "material-service.ts" | kind=code-symbol | source=src/features/materials/services/material-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-materials.ts, api.ts, api, types.ts, Material]
- "services_purchase_service": "purchase-service.ts" | kind=code-symbol | source=src/features/purchases/services/purchase-service.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, use-purchases.ts, api.ts, api, types.ts, PurchaseInput]
- "store_table_visibility_store_test": "table-visibility-store.test.ts" | kind=code-symbol | source=src/store/table-visibility-store.test.ts:L1 | neighbors=[12acd8e Sync client from 3Q-facility-Da…, 9947228 feat(client): summary-only comp…, table-visibility-store.ts, EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), resetStore()]
- "ui_empty_emptycontent": "EmptyContent()" | kind=code-symbol | source=src/components/ui/empty.tsx:L84 | neighbors=[BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx, purchase-table.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-007.json

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
