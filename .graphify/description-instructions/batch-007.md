# Node Description Batch 8 of 74

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

- "components_materialselect": "MaterialSelect.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialSelect.tsx:L1 | neighbors=[0daa333 feat(client): show live stock b…, c0c79ec Initial commit: Label Manufactu…, MaterialSelect(), MaterialSelectProps, AppCombobox.tsx, AppCombobox()]
- "components_purchase_columns": "purchase-columns.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, purchaseColumns, purchase-row-actions.tsx, PurchaseRowActions(), index.ts]
- "db_seed": "seed.ts" | kind=code-symbol | source=server/src/shared/db/seed.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, seed(), production-formula.ts]
- "drizzle_0002_production_orders_and_users": "0002_production_orders_and_users.sql" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, operators, production_order_lines, production_orders, production_stage_events, public.machines]
- "forms_imageuploadfield": "ImageUploadField.tsx" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, DispatchDialog.tsx, DispatchInfo.tsx, ImagePreview.tsx, ImagePreview(), AppButton.tsx]
- "ink_ink_repository_inkrepository": "InkRepository" | kind=code-symbol | source=server/src/modules/ink/ink.repository.ts:L10 | neighbors=[ink.repository.ts, .balanceWeight(), .consumptionByOperator(), .createConsumption(), .createPurchase(), .findPurchaseById()]
- "inventory_inventory_roll_repository": "inventory-roll.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, Tx, schema.ts, InventoryRoll]
- "inventory_types": "types.ts" | kind=code-symbol | source=client/src/features/inventory/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, inventory-columns.tsx, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx]
- "machines_machine_service": "machine.service.ts" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts]
- "operators_operator_service": "operator.service.ts" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts]
- "pages_rollpurchasespage": "RollPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/purchases/pages/RollPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, purchase-table.tsx, PurchaseTable(), PurchaseForm.tsx, PurchaseForm()]
- "pages_workorderlistpage": "WorkOrderListPage.tsx" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderListPage.tsx:L1 | neighbors=[routes.tsx, adfafe7 polish: nav + page copy for the…, c0c79ec Initial commit: Label Manufactu…, work-order-table.tsx, WorkOrderTable(), WorkOrderDialog.tsx]
- "services_material_receipts_service": "material-receipts-service.ts" | kind=code-symbol | source=client/src/features/materials/services/material-receipts-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-material-receipts.ts, api.ts, api, receipts-types.ts, MaterialReceipt]
- "services_production_run_service": "production-run-service.ts" | kind=code-symbol | source=client/src/features/production-runs/services/production-run-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-production-runs.ts, api.ts, api, types.ts, LogProductionRunInput]
- "thread_inventory_thread_inventory_schema": "thread-inventory.schema.ts" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, baseColorEnum, CreateDyeBatchDTO, createDyeBatchSchema, CreateThreadPurchaseDTO, createThreadPurchaseSchema]
- "ui_label_label": "Label()" | kind=code-symbol | source=client/src/components/ui/label.tsx:L5 | neighbors=[ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx, WorkOrderBasicInfo.tsx]
- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator()]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LabelTypeRow.tsx, progress-bar.tsx, StageProgressBars.tsx, WorkOrderDetailPage.tsx, utils.ts]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, editable-cell.tsx, AppLayout.tsx, LayoutProvider.tsx, nav-main.tsx, sidebar.tsx]
- "utils_line_draft_test": "line-draft.test.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, types.ts, LinePlanning, line-draft.ts]
- "woven_production_woven_production_repository": "woven-production.repository.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.repository.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, index.ts, db, Tx, schema.ts, NewWovenProductionLine]
- "woven_production_woven_production_service_wovenproductionservice": "WovenProductionService" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L32 | neighbors=[woven-production.service.ts, .assertWoven(), .deleteLine(), .getLineOrThrow(), .getOrderOrThrow(), .getOverview()]
- "batch_and_runs_batch_flow_controller": "batch-flow.controller.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.controller.ts:L1 | neighbors=[BatchFlowController, BatchOverviewController, cuttingBatchController, packagingBatchController, printingBatchController, weavingBatchController]
- "batch_and_runs_batch_flow_service": "batch-flow.service.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L1 | neighbors=[BatchFlowService, messages.ts, Messages, size-plans.ts, SizePlan, ApiError.ts]
- "components_availabilitybadge": "AvailabilityBadge.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge(), AvailabilityBadgeProps, VARIANTS, StatusBadge.tsx, StatusBadge()]
- "components_material_columns": "material-columns.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, materialColumns, material-row-actions.tsx, MaterialRowActions(), index.ts]
- "config_logger_logger": "Logger" | kind=code-symbol | source=server/src/shared/config/logger.ts:L10 | neighbors=[logger.ts, .debug(), .error(), .formatMessage(), .info(), .warn()]
- "data_table_data_table_empty": "data-table-empty.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-empty.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTableEmpty(), DataTableEmptyProps, empty.tsx, Empty()]
- "db_schema_productionorder": "ProductionOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L101 | neighbors=[schema.ts, production-order.helpers.ts, production-order.helpers.test.ts, production-order.repository.ts, production-order.service.ts, woven-production.helpers.ts]
- "forms_appselect_appselect": "AppSelect" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L18 | neighbors=[CreateBatchDialog.tsx, DyeThreadDialog.tsx, LogProductionRunDialog.tsx, MachineDialog.tsx, OperatorDialog.tsx, PlanLabelTypeForm.tsx]
- "hooks_use_material_receipts": "use-material-receipts.ts" | kind=code-symbol | source=client/src/features/materials/hooks/use-material-receipts.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, RECEIPT_KEYS, useCreateReceipt(), useDeleteReceipt(), useReceipts()]
- "inventory_inventory_repository": "inventory.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, Tx, schema.ts, InventoryRoll]
- "inventory_inventory_repository_inventoryrepository": "InventoryRepository" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L34 | neighbors=[inventory.repository.ts, .applyStockDeltaTx(), .createInventoryRoll(), .createPurchaseWithStock(), .deletePurchaseWithStock(), .findAllPurchases()]
- "inventory_inventory_roll_service": "inventory-roll.service.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Messages, ApiError.ts, ApiError, ConflictError]
- "inventory_material_service": "material.service.ts" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Material]
- "pages_companybrandpage": "CompanyBrandPage.tsx" | kind=code-symbol | source=client/src/features/companies/pages/CompanyBrandPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, types.ts, Company, BrandTable.tsx, BrandTable()]
- "pages_materialmasterpage": "MaterialMasterPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/MaterialMasterPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, material-table.tsx, MaterialTable(), MaterialForm.tsx, MaterialForm()]
- "pages_productionorderlistpage": "ProductionOrderListPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderListPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, CreateProductionOrderDialog(), production-order-table.tsx, ProductionOrderTable()]
- "production_orders_label_types": "label-types.ts" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, CreateBatchDialog.tsx, PlanLabelTypeForm.tsx, SizePlanEditor.tsx, isSizeLabel(), LABEL_TYPES]
- "production_orders_production_order_service_productionorderservice_getlineorthrow": ".getLineOrThrow()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L58 | neighbors=[ProductionOrderService, .assignLineResources(), .deleteLine(), .getLineEvents(), .getLineIssuances(), .issueRolls()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-007.json

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
