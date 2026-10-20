# Node Description Batch 14 of 74

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

- "inventory_inventory_roll_routes": "inventory-roll.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "inventory_inventory_routes": "inventory.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "inventory_material_routes": "material.routes.ts" | kind=code-symbol | source=server/src/modules/inventory/material.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "label_types_label_types_routes": "label-types.routes.ts" | kind=code-symbol | source=server/src/modules/label-types/label-types.routes.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "label_types_label_types_service_labeltypesservice": "LabelTypesService" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L6 | neighbors=[label-types.service.ts, .create(), .delete(), .getAll(), .getById(), .update()]
- "lib_celebrate": "celebrate.ts" | kind=code-symbol | source=client/src/lib/celebrate.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-completion-celebration.ts, celebrateCompletion(), fireConfetti(), playSuccessChime(), prefersReducedMotion()]
- "machines_machine_repository_machinerepository": "MachineRepository" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L8 | neighbors=[machine.repository.ts, .create(), .findAll(), .findById(), .softDelete(), .update()]
- "machines_machine_routes": "machine.routes.ts" | kind=code-symbol | source=server/src/modules/machines/machine.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router, validateRequest.ts, validateParams(), validateQuery(), validateRequest()]
- "machines_machine_service_machineservice": "MachineService" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L7 | neighbors=[machine.service.ts, .createMachine(), .deleteMachine(), .getMachine(), .getMachines(), .updateMachine()]
- "machines_operators_types_machine": "Machine" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L9 | neighbors=[machine-columns.tsx, machine-row-actions.tsx, MachineDialog.tsx, index.ts, types.ts, entity-service.ts]
- "machines_operators_types_operator": "Operator" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L46 | neighbors=[operator-columns.tsx, operator-row-actions.tsx, OperatorDialog.tsx, index.ts, types.ts, entity-service.ts]
- "material_receipts_material_receipts_controller": "material-receipts.controller.ts" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), LabelSheetController, LocalSheetController, StickerMaterialController]
- "material_receipts_material_receipts_repository_labelsheetrepository": "LabelSheetRepository" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L64 | neighbors=[material-receipts.repository.ts, .create(), .findAll(), .findById(), .remove(), .update()]
- "material_receipts_material_receipts_repository_localsheetrepository": "LocalSheetRepository" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L38 | neighbors=[material-receipts.repository.ts, .create(), .findAll(), .findById(), .remove(), .update()]
- "material_receipts_material_receipts_repository_stickermaterialrepository": "StickerMaterialRepository" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.repository.ts:L12 | neighbors=[material-receipts.repository.ts, .create(), .findAll(), .findById(), .remove(), .update()]
- "middleware_ratelimiter": "rateLimiter.ts" | kind=code-symbol | source=server/src/shared/middleware/rateLimiter.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, apiRateLimiter, authRateLimiter, app.ts, c0c79ec Initial commit: Label Manufactu…]
- "operators_operator_repository_operatorrepository": "OperatorRepository" | kind=code-symbol | source=server/src/modules/operators/operator.repository.ts:L21 | neighbors=[operator.repository.ts, .create(), .findAll(), .findById(), .softDelete(), .update()]
- "operators_operator_routes": "operator.routes.ts" | kind=code-symbol | source=server/src/modules/operators/operator.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "operators_operator_service_operatorservice": "OperatorService" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L14 | neighbors=[operator.service.ts, .createOperator(), .deleteOperator(), .getOperator(), .getOperators(), .updateOperator()]
- "pages_dyedthreadstockpage": "DyedThreadStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/DyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), DyedThreadStockPage(), index.ts]
- "pages_threadpurchasespage": "ThreadPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/purchases/pages/ThreadPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), ThreadPurchasesPage(), index.ts]
- "pages_undyedthreadstockpage": "UndyedThreadStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/UndyedThreadStockPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, PageHeader.tsx, PageHeader(), UndyedThreadStockPage(), index.ts]
- "production_orders_batch_types_productionbatch": "ProductionBatch" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L31 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, batch-types.ts, index.ts, batch-service.ts]
- "production_orders_batch_types_stage_label": "STAGE_LABEL" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L248 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx, StageProgressBars.tsx, batch-types.ts]
- "production_orders_production_order_helpers_test": "production-order.helpers.test.ts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.test.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, schema.ts, ProductionOrder, ProductionOrderLine, makeLine(), order]
- "production_orders_production_order_repository_productionorderrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L272 | neighbors=[ProductionOrderRepository, .drawStockTx(), .releaseLineStockTx(), .resyncOrderTx(), .updateLine(), syncWorkOrderStatusTx()]
- "production_orders_production_order_routes": "production-order.routes.ts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "production_orders_production_order_service_productionorderservice_notifyifordercompleted": ".notifyIfOrderCompleted()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L1085 | neighbors=[ProductionOrderService, .completeProductionOrder(), .transferRolls(), .updateLineFull(), .updateProductionOrder(), .updateStageProgress()]
- "production_orders_production_order_service_productionorderservice_updatelinefull": ".updateLineFull()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L724 | neighbors=[ProductionOrderService, .assertResourcesFree(), .getLineOrThrow(), .getOrderOrThrow(), .getResourceLocks(), .notifyIfOrderCompleted()]
- "purchases_types_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=client/src/features/purchases/types.ts:L1 | neighbors=[purchase-columns.tsx, purchase-row-actions.tsx, purchase-table.tsx, PurchaseForm.tsx, types.ts, purchase-service.ts]
- "schemas_company_schemas": "company-schemas.ts" | kind=code-symbol | source=client/src/features/companies/schemas/company-schemas.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, CompanyDialog.tsx, brandSchema, BrandSchemaInput, companySchema, CompanySchemaInput]
- "scripts_verify_0025_line_scoped": "verify-0025-line-scoped.mjs" | kind=code-symbol | source=server/scripts/verify-0025-line-scoped.mjs:L1 | neighbors=[95ce13e feat(production): make cutting …, admin, env, log, origin, say()]
- "scripts_verify_batch_constraints": "verify-batch-constraints.mjs" | kind=code-symbol | source=server/scripts/verify-batch-constraints.mjs:L1 | neighbors=[748f587 chore: migration reconciliation…, 95ce13e feat(production): make cutting …, env, envPath, here, sql]
- "segmented_tabs_index": "index.ts" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/index.ts:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, InventoryStockPage.tsx, PurchaseRecordPage.tsx, SegmentedTabs.tsx, SegmentedOption, SegmentedTabs()]
- "tables_thread_dyeing_workflow_table": "thread-dyeing-workflow.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread-dyeing-workflow.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadDyeingAllocations, threadDyeingReceives, threadDyeingSends, threadDyeingSendStatusEnum, 9b99ce1 feat: complete production workf…]
- "tables_thread_enums": "thread.enums.ts" | kind=code-symbol | source=server/src/shared/db/tables/thread.enums.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, threadBaseColorEnum, threadDenierEnum, threadMovementTypeEnum, threadStockTypeEnum, f5f1f47 feat: woven labels foundation —…]
- "thread_inventory_thread_inventory_routes": "thread-inventory.routes.ts" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "thread_service_provider_thread_service_provider_repository": "thread-service-provider.repository.ts" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, index.ts, db, schema.ts, NewThreadServiceProvider, ThreadServiceProviderRepository]
- "thread_service_provider_thread_service_provider_repository_threadserviceproviderrepository": "ThreadServiceProviderRepository" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.repository.ts:L6 | neighbors=[thread-service-provider.repository.ts, .create(), .findAll(), .findById(), .remove(), .update()]
- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice": "ThreadServiceProviderService" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L9 | neighbors=[thread-service-provider.service.ts, .create(), .getAll(), .getOne(), .remove(), .update()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-013.json

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
