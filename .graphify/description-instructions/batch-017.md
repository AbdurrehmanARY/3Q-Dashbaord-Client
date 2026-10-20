# Node Description Batch 18 of 74

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

- "data_table_data_table_pagination_datatablepagination": "DataTablePagination()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L56 | neighbors=[data-table.tsx, data-table-pagination.tsx, pageWindow(), index.ts]
- "data_table_editable_cell_useeditablecell": "useEditableCell()" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L16 | neighbors=[editable-cell.tsx, EditableCell(), editable-cell-number.tsx, index.ts]
- "db_schema_brand": "Brand" | kind=code-symbol | source=server/src/shared/db/schema.ts:L89 | neighbors=[company.repository.ts, company.service.ts, schema.ts, company-service.ts]
- "db_schema_company": "Company" | kind=code-symbol | source=server/src/shared/db/schema.ts:L87 | neighbors=[company.repository.ts, company.service.ts, schema.ts, company-service.ts]
- "db_schema_inventoryroll": "InventoryRoll" | kind=code-symbol | source=server/src/shared/db/schema.ts:L117 | neighbors=[analytics.repository.ts, schema.ts, inventory.repository.ts, inventory-roll.repository.ts]
- "db_schema_machine": "Machine" | kind=code-symbol | source=server/src/shared/db/schema.ts:L93 | neighbors=[schema.ts, machine.repository.ts, machine.service.ts, production-order-overview.builder.ts]
- "db_schema_operator": "Operator" | kind=code-symbol | source=server/src/shared/db/schema.ts:L95 | neighbors=[schema.ts, operator.repository.ts, operator.service.ts, production-order-overview.builder.ts]
- "db_schema_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=server/src/shared/db/schema.ts:L115 | neighbors=[analytics.repository.ts, schema.ts, inventory.service.ts, inventory-service.ts]
- "db_schema_workorder": "WorkOrder" | kind=code-symbol | source=server/src/shared/db/schema.ts:L99 | neighbors=[analytics.repository.ts, schema.ts, production-order.repository.ts, work-order.repository.ts]
- "db_seed_master_fillweights": "fillWeights()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L43 | neighbors=[seed-master.ts, round4(), sizeMm(), seedMaterials()]
- "dialogs_index": "index.ts" | kind=code-symbol | source=client/src/components/dialogs/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, AppDialog.tsx, ConfirmDialog.tsx]
- "drizzle_0000_lovely_imperial_guard_production_info": "production_info" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L141 | neighbors=[0000_lovely_imperial_guard.sql, public.brands, public.companies, public.production_progress]
- "drizzle_0002_production_orders_and_users_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L32 | neighbors=[0002_production_orders_and_users.sql, public.machines, public.operators, public.production_orders]
- "drizzle_0002_production_orders_and_users_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L73 | neighbors=[0002_production_orders_and_users.sql, operators, production_orders, production_stage_events]
- "drizzle_0004_production_roll_issuances_production_roll_issuances": "production_roll_issuances" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L1 | neighbors=[0004_production_roll_issuances.sql, public.materials, public.production_order_lines, public.users]
- "drizzle_0012_flawless_master_chief_public_thread_stocks": "public.thread_stocks" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L127 | neighbors=[0012_flawless_master_chief.sql, thread_dye_batches, thread_stock_movements, woven_thread_plan_items]
- "drizzle_0012_flawless_master_chief_woven_production_lines": "woven_production_lines" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L20 | neighbors=[0012_flawless_master_chief.sql, public.machines, public.operators, public.production_orders]
- "drizzle_0015_mature_captain_britain_production_runs": "production_runs" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L3 | neighbors=[0015_mature_captain_britain.sql, public.machines, public.operators, public.users]
- "drizzle_0019_batch_flow_sync_batch_consumptions": "batch_consumptions" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L57 | neighbors=[0019_batch_flow_sync.sql, public.production_batches, public.production_order_lines, public.users]
- "drizzle_0019_batch_flow_sync_production_batches": "production_batches" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L13 | neighbors=[0019_batch_flow_sync.sql, public.machines, public.operators, public.users]
- "drizzle_0019_batch_flow_sync_production_stage_transactions": "production_stage_transactions" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L43 | neighbors=[0019_batch_flow_sync.sql, public.production_batches, public.production_order_lines, public.users]
- "drizzle_0019_batch_flow_sync_public_production_order_lines": "public.production_order_lines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L75 | neighbors=[0019_batch_flow_sync.sql, batch_consumptions, production_order_lines, production_stage_transactions]
- "drizzle_0019_batch_flow_sync_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L84 | neighbors=[0019_batch_flow_sync.sql, batch_consumptions, production_batches, production_stage_transactions]
- "drizzle_0021_woven_batch_flow": "0021_woven_batch_flow.sql" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batch_consumptions, production_batches, woven_production_lines]
- "drizzle_0021_woven_batch_flow_woven_production_lines": "woven_production_lines" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L14 | neighbors=[0021_woven_batch_flow.sql, production_batches, woven_production_lines]
- "drizzle_0026_label_types": "0026_label_types.sql" | kind=code-symbol | source=server/drizzle/0026_label_types.sql:L1 | neighbors=[cd392dc feat(label-types): add label ty…, label_types, production_order_lines, public.label_types]
- "feedback_operatoravatar_operatoravatar": "OperatorAvatar()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L31 | neighbors=[OperatorDialog.tsx, ProductionSummary.tsx, OperatorAvatar.tsx, initialsOf()]
- "formulas_production_formula_calculaterequiredrolls": "calculateRequiredRolls()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L20 | neighbors=[seed.ts, production-formula.ts, production-formula.test.ts, production-order.service.ts]
- "formulas_production_formula_calculatetotalrolls": "calculateTotalRolls()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L36 | neighbors=[seed.ts, production-formula.ts, production-formula.test.ts, production-order.service.ts]
- "formulas_purchase_formula_test": "purchase-formula.test.ts" | kind=code-symbol | source=server/src/shared/formulas/purchase-formula.test.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, purchase-formula.ts, calculateInvoiceWeight(), calculateTotalRollPer200m()]
- "hooks_use_batches_usebatchsources": "useBatchSources()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L65 | neighbors=[BatchStageBoard.tsx, CreateBatchDialog.tsx, use-batches.ts, index.ts]
- "hooks_use_batches_useorderflow": "useOrderFlow()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L87 | neighbors=[WovenProductionPanel.tsx, use-batches.ts, ProductionOrderDashboardPage.tsx, index.ts]
- "hooks_use_companies_usecompanies": "useCompanies()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L10 | neighbors=[index.ts, CompanySelect.tsx, CompanyTable.tsx, use-companies.ts]
- "hooks_use_dashboard_trends": "use-dashboard-trends.ts" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard-trends.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useWorkOrderTrend(), index.ts, DashboardPage.tsx]
- "hooks_use_entities_usemachines": "useMachines()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L14 | neighbors=[machine-table.tsx, MachineSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_entities_useoperators": "useOperators()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L22 | neighbors=[operator-table.tsx, OperatorSelect.tsx, use-entities.ts, index.ts]
- "hooks_use_materials_usematerials": "useMaterials()" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L11 | neighbors=[material-table.tsx, MaterialSelect.tsx, use-materials.ts, index.ts]
- "hooks_use_production_orders_usedeleteproductionorder": "useDeleteProductionOrder()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L119 | neighbors=[production-order-row-actions.tsx, production-order-table.tsx, use-production-orders.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_production_orders_uselinemutation": "useLineMutation()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L191 | neighbors=[use-production-orders.ts, useAssignLineResources(), useTransferRolls(), useUpdateStageProgress()]
- "hooks_use_production_orders_useproductionorderoverview": "useProductionOrderOverview()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L65 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-017.json

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
