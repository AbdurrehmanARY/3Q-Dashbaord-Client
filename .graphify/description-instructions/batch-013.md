# Node Description Batch 14 of 53

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

- "drizzle_0019_batch_flow_sync_production_batches": "production_batches" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L13 | neighbors=[0019_batch_flow_sync.sql, public.machines, public.operators, public.users]
- "drizzle_0019_batch_flow_sync_production_stage_transactions": "production_stage_transactions" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L43 | neighbors=[0019_batch_flow_sync.sql, public.production_batches, public.production_order_lines, public.users]
- "drizzle_0019_batch_flow_sync_public_production_order_lines": "public.production_order_lines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L75 | neighbors=[0019_batch_flow_sync.sql, batch_consumptions, production_order_lines, production_stage_transactions]
- "drizzle_0019_batch_flow_sync_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L84 | neighbors=[0019_batch_flow_sync.sql, batch_consumptions, production_batches, production_stage_transactions]
- "drizzle_0021_woven_batch_flow": "0021_woven_batch_flow.sql" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, woven_production_lines]
- "drizzle_0021_woven_batch_flow_woven_production_lines": "woven_production_lines" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L14 | neighbors=[0021_woven_batch_flow.sql, production_batches, woven_production_lines]
- "feedback_operatoravatar_operatoravatar": "OperatorAvatar()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L31 | neighbors=[OperatorDialog.tsx, ProductionSummary.tsx, OperatorAvatar.tsx, initialsOf()]
- "formulas_purchase_formula_test": "purchase-formula.test.ts" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.test.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, purchase-formula.ts, calculateInvoiceWeight(), calculateTotalRollPer200m()]
- "hooks_use_companies_usecompanies": "useCompanies()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L10 | neighbors=[index.ts, CompanySelect.tsx, CompanyTable.tsx, use-companies.ts]
- "hooks_use_dashboard_trends": "use-dashboard-trends.ts" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard-trends.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useWorkOrderTrend(), index.ts, DashboardPage.tsx]
- "hooks_use_entities_usemachines": "useMachines()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L14 | neighbors=[machine-table.tsx, MachineSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_entities_useoperators": "useOperators()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L22 | neighbors=[operator-table.tsx, OperatorSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_materials_usematerials": "useMaterials()" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L11 | neighbors=[material-table.tsx, MaterialSelect.tsx, use-materials.ts, index.ts]
- "hooks_use_production_orders_usedeleteproductionorder": "useDeleteProductionOrder()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L119 | neighbors=[production-order-row-actions.tsx, production-order-table.tsx, use-production-orders.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_production_orders_uselinemutation": "useLineMutation()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L191 | neighbors=[use-production-orders.ts, useAssignLineResources(), useTransferRolls(), useUpdateStageProgress()]
- "hooks_use_production_orders_useproductionorderoverview": "useProductionOrderOverview()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L65 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]
- "hooks_use_work_orders_usedeleteworkorder": "useDeleteWorkOrder()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L74 | neighbors=[work-order-row-actions.tsx, work-order-table.tsx, use-work-orders.ts, WorkOrderDetailPage.tsx]
- "ink_ink_controller": "ink.controller.ts" | kind=code-symbol | source=server/src/modules/ink/ink.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InkController]
- "ink_ink_service_dec": "dec()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L12 | neighbors=[ink.service.ts, .createConsumption(), .createPurchase(), .updatePurchase()]
- "ink_types_inkconsumption": "InkConsumption" | kind=code-symbol | source=client/src/features/ink/types.ts:L35 | neighbors=[ink-consumption-columns.tsx, types.ts, InkConsumptionPage.tsx, ink-service.ts]
- "inventory_inventory_controller": "inventory.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InventoryController]
- "inventory_inventory_roll_controller": "inventory-roll.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), InventoryRollController]
- "inventory_inventory_roll_service_withperskubalance": "withPerSkuBalance()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L27 | neighbors=[inventory-roll.service.ts, .createInventoryRoll(), .getInventoryRollByMaterialCode(), .updateInventoryRoll()]
- "inventory_material_controller": "material.controller.ts" | kind=code-symbol | source=server/src/modules/inventory/material.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), MaterialController]
- "lib_celebrate_celebratecompletion": "celebrateCompletion()" | kind=code-symbol | source=client/src/lib/celebrate.ts:L82 | neighbors=[use-completion-celebration.ts, celebrate.ts, fireConfetti(), playSuccessChime()]
- "machines_machine_controller": "machine.controller.ts" | kind=code-symbol | source=server/src/modules/machines/machine.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), MachineController]
- "operators_operator_controller": "operator.controller.ts" | kind=code-symbol | source=server/src/modules/operators/operator.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), OperatorController]
- "production_orders_types_updatelinefullinput": "UpdateLineFullInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L419 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts, line-draft.ts]
- "schemas_material_schemas_material_types": "MATERIAL_TYPES" | kind=code-symbol | source=client/src/features/materials/schemas/material-schemas.ts:L13 | neighbors=[material-table.tsx, MaterialForm.tsx, index.ts, material-schemas.ts]
- "server_seed_master_fillweights": "fillWeights()" | kind=code-symbol | source=server/seed-master.ts:L43 | neighbors=[seed-master.ts, round4(), sizeMm(), seedMaterials()]
- "services_mail_service_mailservice": "MailService" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L14 | neighbors=[test-mail.ts, mail.service.ts, .getTransporter(), .sendProductionCompletedEmail()]
- "store_ui_store_useuistore": "useUiStore" | kind=code-symbol | source=client/src/store/ui-store.ts:L11 | neighbors=[use-theme.ts, ThemeProvider.tsx, ui-store.ts, sonner.tsx]
- "tables_inventory_roll_movements_table": "inventory-roll-movements.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/inventory-roll-movements.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, inventoryRollMovements, rollMovementTypeEnum, c27dc7d feat(server): stock CRUD histor…]
- "tables_machines_table": "machines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/machines.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, machines, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…]
- "tables_operators_table": "operators.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/operators.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, operators, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "tables_production_batches_table": "production-batches.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-batches.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionBatches, productionBatchStageEnum, productionBatchStatusEnum]
- "tables_production_orders_table": "production-orders.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-orders.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionOrders, productionOrderStatusEnum, c0c79ec Initial commit: Label Manufactu…]
- "tables_production_stage_events_table": "production-stage-events.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/production-stage-events.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, productionEventTypeEnum, productionStageEvents, c0c79ec Initial commit: Label Manufactu…]
- "tables_users_table": "users.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/users.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, userRoleEnum, users, c0c79ec Initial commit: Label Manufactu…]
- "tables_woven_thread_plan_items_table": "woven-thread-plan-items.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-thread-plan-items.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, wovenThreadPlanItems, 9b99ce1 feat: complete production workf…, f5f1f47 feat: woven labels foundation —…]

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
