# Node Description Batch 13 of 53

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

- "tables_woven_production_lines_table": "woven-production-lines.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/woven-production-lines.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, size-plans.ts, SizePlan, wovenProductionLines, f5f1f47 feat: woven labels foundation —…]
- "thread_types_thread_base_colors": "THREAD_BASE_COLORS" | kind=code-symbol | source=client/src/features/thread/types.ts:L6 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, thread-schemas.ts, index.ts, types.ts]
- "thread_types_threadstock": "ThreadStock" | kind=code-symbol | source=client/src/features/thread/types.ts:L16 | neighbors=[ThreadStockDialog.tsx, ThreadStockPanel.tsx, thread-service.ts, index.ts, types.ts]
- "types_index": "index.ts" | kind=code-symbol | source=server/src/types/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, inferInsert, inferSelect, schema.ts]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=client/src/components/ui/badge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Badge(), badgeVariants]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L23 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L36 | neighbors=[AppCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=client/src/components/ui/checkbox.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, utils.ts, cn(), Checkbox()]
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=client/src/components/ui/collapsible.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, nav-main.tsx, Collapsible(), CollapsibleContent(), CollapsibleTrigger]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), ScrollArea(), ScrollBar()]
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=client/src/components/ui/sonner.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ToastProvider.tsx, ui-store.ts, useUiStore, Toaster()]
- "validation_common_schema": "common.schema.ts" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, companyIdParamsSchema, idParamsSchema, lineIdParamsSchema, paginationQuerySchema]
- "work_orders_types_workorderdetail": "WorkOrderDetail" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L107 | neighbors=[DispatchDialog.tsx, WorkOrderDialog.tsx, work-order-service.ts, types.ts, WorkOrder]
- "analytics_analytics_controller": "analytics.controller.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.controller.ts:L1 | neighbors=[AnalyticsController, asyncHandler.ts, asyncHandler(), ee6d4dd refactor(server): vertical-slic…]
- "cards_index": "index.ts" | kind=code-symbol | source=client/src/components/cards/index.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, index.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@a7e14be19c323870aed1b5d2fa4579227660e3a3": "a7e14be feat: woven planning, weaving/cutting/packaging stages, thread stock en…" | kind=Commit | source=git | neighbors=[09c4b95 feat: dispatch dialog, product-…, chore/ci, 95aebc1 feat: thread receiving, stock a…, woven-production-service.ts]
- "companies_company_controller": "company.controller.ts" | kind=code-symbol | source=server/src/modules/companies/company.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CompanyController, asyncHandler.ts, asyncHandler()]
- "components_materialreceiptpage_materialreceiptpage": "MaterialReceiptPage()" | kind=code-symbol | source=client/src/features/materials/components/MaterialReceiptPage.tsx:L21 | neighbors=[MaterialReceiptPage.tsx, LabelSheetsPage.tsx, LocalSheetsPage.tsx, StickerMaterialsPage.tsx]
- "components_productionstatusbadge_productionorderstatusbadge": "ProductionOrderStatusBadge()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L18 | neighbors=[production-order-columns.tsx, ProductionStatusBadge.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx]
- "components_purchaseform_purchaseform": "PurchaseForm()" | kind=code-symbol | source=client/src/features/purchases/components/PurchaseForm.tsx:L23 | neighbors=[purchase-row-actions.tsx, PurchaseForm.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx]
- "constants_labels_validatesizeplan": "validateSizePlan()" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L13 | neighbors=[labels.ts, normalizeSizePlan(), production-order-service.ts, woven-production-service.ts]
- "dashboard_types": "types.ts" | kind=code-symbol | source=client/src/features/dashboard/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DashboardKpis, KpiResponse, dashboard-service.ts]
- "data_table_data_table_export_datatableexportcolumn": "DataTableExportColumn" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L8 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, index.ts]
- "data_table_data_table_pagination_datatablepagination": "DataTablePagination()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L56 | neighbors=[data-table.tsx, data-table-pagination.tsx, pageWindow(), index.ts]
- "data_table_editable_cell_useeditablecell": "useEditableCell()" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L16 | neighbors=[editable-cell.tsx, EditableCell(), editable-cell-number.tsx, index.ts]
- "db_schema_brand": "Brand" | kind=code-symbol | source=server/src/shared/db/schema.ts:L86 | neighbors=[company.repository.ts, company.service.ts, schema.ts, company-service.ts]
- "db_schema_company": "Company" | kind=code-symbol | source=server/src/shared/db/schema.ts:L84 | neighbors=[company.repository.ts, company.service.ts, schema.ts, company-service.ts]
- "db_schema_inventoryroll": "InventoryRoll" | kind=code-symbol | source=server/src/shared/db/schema.ts:L114 | neighbors=[analytics.repository.ts, schema.ts, inventory.repository.ts, inventory-roll.repository.ts]
- "db_schema_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=server/src/shared/db/schema.ts:L112 | neighbors=[analytics.repository.ts, schema.ts, inventory.service.ts, inventory-service.ts]
- "db_seed_master_fillweights": "fillWeights()" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L43 | neighbors=[seed-master.ts, round4(), sizeMm(), seedMaterials()]
- "db_size_plans_sizeplan": "SizePlan" | kind=code-symbol | source=server/src/shared/db/size-plans.ts:L9 | neighbors=[labels.ts, size-plans.ts, production-order-lines.table.ts, woven-production-lines.table.ts]
- "dialogs_index": "index.ts" | kind=code-symbol | source=client/src/components/dialogs/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, AppDialog.tsx, ConfirmDialog.tsx]
- "drizzle_0000_lovely_imperial_guard_production_info": "production_info" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L141 | neighbors=[0000_lovely_imperial_guard.sql, public.brands, public.companies, public.production_progress]
- "drizzle_0002_production_orders_and_users_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L32 | neighbors=[0002_production_orders_and_users.sql, public.machines, public.operators, public.production_orders]
- "drizzle_0002_production_orders_and_users_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0002_production_orders_and_users.sql:L73 | neighbors=[0002_production_orders_and_users.sql, operators, production_orders, production_stage_events]
- "drizzle_0004_production_roll_issuances_production_roll_issuances": "production_roll_issuances" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L1 | neighbors=[0004_production_roll_issuances.sql, public.materials, public.production_order_lines, public.users]
- "drizzle_0012_flawless_master_chief_public_thread_stocks": "public.thread_stocks" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L127 | neighbors=[0012_flawless_master_chief.sql, thread_dye_batches, thread_stock_movements, woven_thread_plan_items]
- "drizzle_0012_flawless_master_chief_woven_production_lines": "woven_production_lines" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L20 | neighbors=[0012_flawless_master_chief.sql, public.machines, public.operators, public.production_orders]
- "drizzle_0015_mature_captain_britain_production_runs": "production_runs" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L3 | neighbors=[0015_mature_captain_britain.sql, public.machines, public.operators, public.users]
- "drizzle_0019_batch_flow_sync_batch_consumptions": "batch_consumptions" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L57 | neighbors=[0019_batch_flow_sync.sql, public.production_batches, public.production_order_lines, public.users]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-012.json

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
