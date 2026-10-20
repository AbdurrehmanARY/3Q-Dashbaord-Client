# Node Description Batch 19 of 74

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

- "hooks_use_work_orders_usedeleteworkorder": "useDeleteWorkOrder()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L74 | neighbors=[work-order-row-actions.tsx, work-order-table.tsx, use-work-orders.ts, WorkOrderDetailPage.tsx]
- "ink_ink_controller": "ink.controller.ts" | kind=code-symbol | source=server/src/modules/ink/ink.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InkController]
- "ink_ink_service_dec": "dec()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L12 | neighbors=[ink.service.ts, .createConsumption(), .createPurchase(), .updatePurchase()]
- "ink_types_inkconsumption": "InkConsumption" | kind=code-symbol | source=client/src/features/ink/types.ts:L35 | neighbors=[ink-consumption-columns.tsx, types.ts, InkConsumptionPage.tsx, ink-service.ts]
- "inventory_inventory_controller": "inventory.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InventoryController]
- "inventory_inventory_roll_controller": "inventory-roll.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InventoryRollController]
- "inventory_inventory_roll_service_withperskubalance": "withPerSkuBalance()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L27 | neighbors=[inventory-roll.service.ts, .createInventoryRoll(), .getInventoryRollByMaterialCode(), .updateInventoryRoll()]
- "inventory_material_controller": "material.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/material.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), MaterialController]
- "label_types_label_types_controller": "label-types.controller.ts" | kind=code-symbol | source=server/src/modules/label-types/label-types.controller.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, asyncHandler.ts, asyncHandler(), LabelTypesController]
- "lib_celebrate_celebratecompletion": "celebrateCompletion()" | kind=code-symbol | source=client/src/lib/celebrate.ts:L82 | neighbors=[use-completion-celebration.ts, celebrate.ts, fireConfetti(), playSuccessChime()]
- "machines_machine_controller": "machine.controller.ts" | kind=code-symbol | source=server/src/modules/machines/machine.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), MachineController]
- "operators_operator_controller": "operator.controller.ts" | kind=code-symbol | source=server/src/modules/operators/operator.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), OperatorController]
- "production_orders_batch_types_isfirststage": "isFirstStage()" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L269 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, batch-types.ts, BatchOutputDialog.tsx]
- "production_orders_batch_types_lineflow": "LineFlow" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L149 | neighbors=[BatchStageBoard.tsx, StageProgressBars.tsx, batch-types.ts, index.ts]
- "production_orders_batch_types_linekind": "LineKind" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L12 | neighbors=[BatchOutputDialog.tsx, CreateBatchDialog.tsx, StageProgressBars.tsx, batch-types.ts]
- "production_orders_production_order_controller": "production-order.controller.ts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), ProductionOrderController]
- "production_orders_production_order_helpers_tonumbers": "toNumbers()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L34 | neighbors=[production-order.helpers.ts, deriveLineStatus(), hasAnyProgress(), stageCompletionPatch()]
- "production_orders_production_order_repository_syncworkorderstatustx": "syncWorkOrderStatusTx()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L48 | neighbors=[production-order.repository.ts, .resyncOrderTx(), .update(), workOrderStatusFor()]
- "production_orders_production_order_service_productionorderservice_assertresourcesfree": ".assertResourcesFree()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L96 | neighbors=[ProductionOrderService, .assignLineResources(), .buildPlanRow(), .updateLineFull()]
- "production_orders_production_order_service_productionorderservice_transferrolls": ".transferRolls()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L629 | neighbors=[ProductionOrderService, .getLineOrThrow(), .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "production_orders_production_order_service_productionorderservice_updatelineplan": ".updateLinePlan()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L261 | neighbors=[ProductionOrderService, .buildPlanRow(), .getLineOrThrow(), .getOrderOrThrow()]
- "production_orders_production_order_service_productionorderservice_updatestageprogress": ".updateStageProgress()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L513 | neighbors=[ProductionOrderService, .getLineOrThrow(), .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "production_orders_types_updatelinefullinput": "UpdateLineFullInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L419 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts, line-draft.ts]
- "production_orders_woven_types_threadplaninput": "ThreadPlanInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L93 | neighbors=[SharedThreadAllocation.tsx, woven-types.ts, planning-rows.ts, planning-rows.test.ts]
- "schemas_material_schemas_material_types": "MATERIAL_TYPES" | kind=code-symbol | source=client/src/features/materials/schemas/material-schemas.ts:L13 | neighbors=[material-table.tsx, MaterialForm.tsx, index.ts, material-schemas.ts]
- "scripts_tree_src": "tree-src.mjs" | kind=code-symbol | source=server/scripts/tree-src.mjs:L1 | neighbors=[748f587 chore: migration reconciliation…, SKIP, tree(), walk()]
- "server_vitest_config": "vitest.config.ts" | kind=code-symbol | source=server/vitest.config.ts:L1 | neighbors=[13b0a3c chore(server): give vitest a fa…, c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, resolvePath()]
- "services_mail_service_mailservice": "MailService" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L14 | neighbors=[test-mail.ts, mail.service.ts, .getTransporter(), .sendProductionCompletedEmail()]
- "store_table_visibility_store_usetablecolumnvisibility": "useTableColumnVisibility()" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L106 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts, useTableVisibilityStore]
- "store_table_visibility_store_usetablevisibilitystore": "useTableVisibilityStore" | kind=code-symbol | source=client/src/store/table-visibility-store.ts:L65 | neighbors=[data-table.tsx, table-visibility-store.ts, table-visibility-store.test.ts, useTableColumnVisibility()]
- "store_ui_store_useuistore": "useUiStore" | kind=code-symbol | source=client/src/store/ui-store.ts:L11 | neighbors=[use-theme.ts, ThemeProvider.tsx, ui-store.ts, sonner.tsx]
- "tables_inventory_roll_movements_table": "inventory-roll-movements.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, inventoryRollMovements, rollMovementTypeEnum, c27dc7d feat(server): stock CRUD histor…]
- "tables_label_types_table": "label-types.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/label-types.table.ts:L1 | neighbors=[cd392dc feat(label-types): add label ty…, LabelType, labelTypes, NewLabelType]
- "tables_machines_table": "machines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/machines.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, machines, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…]
- "tables_operators_table": "operators.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/operators.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, operators, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "tables_production_batches_table": "production-batches.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionBatches, productionBatchStageEnum, productionBatchStatusEnum]
- "tables_production_orders_table": "production-orders.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionOrders, productionOrderStatusEnum, c0c79ec Initial commit: Label Manufactu…]
- "tables_production_stage_events_table": "production-stage-events.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-events.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionEventTypeEnum, productionStageEvents, c0c79ec Initial commit: Label Manufactu…]
- "tables_users_table": "users.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/users.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, userRoleEnum, users, c0c79ec Initial commit: Label Manufactu…]
- "tables_woven_thread_plan_items_table": "woven-thread-plan-items.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-thread-plan-items.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, wovenThreadPlanItems, 9b99ce1 feat: complete production workf…, f5f1f47 feat: woven labels foundation —…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-018.json

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
