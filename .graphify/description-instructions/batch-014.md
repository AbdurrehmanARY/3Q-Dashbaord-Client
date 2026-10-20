# Node Description Batch 15 of 74

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

- "thread_types_thread_deniers": "THREAD_DENIERS" | kind=code-symbol | source=client/src/features/thread/types.ts:L2 | neighbors=[DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, thread-schemas.ts, index.ts, types.ts]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=client/src/components/ui/badge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BatchStageBoard.tsx, utils.ts, cn(), Badge(), badgeVariants]
- "ui_card_card": "Card()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L5 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=client/src/components/ui/card.tsx:L72 | neighbors=[AppCard.tsx, StatCard.tsx, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx, card.tsx]
- "ui_input_input": "Input" | kind=code-symbol | source=client/src/components/ui/input.tsx:L13 | neighbors=[data-table-toolbar.tsx, AppInput.tsx, InkConsumptionPage.tsx, input.tsx, input-group.tsx, sidebar.tsx]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L47 | neighbors=[nav-main.tsx, nav-user.tsx, sidebar.tsx, Sidebar(), SidebarRail(), SidebarTrigger()]
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=client/src/components/ui/toggle.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Toggle(), toggleVariants, toggle-group.tsx]
- "users_user_schema": "user.schema.ts" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateUserDTO, createUserSchema, UpdateUserDTO, updateUserSchema, userRoleSchema]
- "users_users_routes": "users.routes.ts" | kind=code-symbol | source=server/src/modules/users/users.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, validateRequest.ts, validateParams(), validateQuery(), validateRequest(), router]
- "utils_planning_rows_allocatesharedthreads": "allocateSharedThreads()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L101 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, planning-rows.ts, round3(), toNumber(), planning-rows.test.ts]
- "work_orders_types_work_order_status_meta": "WORK_ORDER_STATUS_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L49 | neighbors=[RecentWorkOrders.tsx, work-order-columns.tsx, work-order-table.tsx, WorkOrderDialog.tsx, WorkOrderDetailPage.tsx, types.ts]
- "woven_production_woven_production_helpers_test": "woven-production.helpers.test.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.test.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, schema.ts, ProductionOrder, WovenProductionLine, makeLine(), order]
- "woven_production_woven_production_routes": "woven-production.routes.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.routes.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, validateRequest.ts, validateParams(), validateRequest(), orderLineParamsSchema, router]
- "woven_production_woven_production_service_wovenproductionservice_getorderorthrow": ".getOrderOrThrow()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L39 | neighbors=[WovenProductionService, .deleteLine(), .planLine(), .updateCutting(), .updatePackaging(), .updateWeaving()]
- "baseline_live_schema_public_machines": "public.machines" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L583 | neighbors=[live-schema.sql, public.operators, public.production_batches, public.production_order_lines, public.production_runs]
- "baseline_live_schema_public_materials": "public.materials" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L623 | neighbors=[live-schema.sql, public.inventory_rolls, public.production_order_lines, public.production_roll_issuances, public.purchase_records]
- "baseline_live_schema_public_production_runs": "public.production_runs" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L896 | neighbors=[live-schema.sql, public.machines, public.operators, public.users, public.work_orders]
- "baseline_live_schema_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1414 | neighbors=[live-schema.sql, public.production_orders, public.production_runs, public.brands, public.woven_work_order_details]
- "batch_and_runs_batch_flow_repository_batchflowrepository_flowintx": ".flowInTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1332 | neighbors=[BatchFlowRepository, lineColumn(), round2(), .logStageTx(), .resyncLineTx()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_insertbatchtx": ".insertBatchTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1013 | neighbors=[BatchFlowRepository, .assertResourcesFreeTx(), .assertStageResources(), lineColumn(), scopeValues()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_replacesourcestx": ".replaceSourcesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1201 | neighbors=[BatchFlowRepository, .bumpConsumedTx(), .lockSourcesTx(), .releaseAllSourcesTx(), round2()]
- "batch_and_runs_batch_flow_service_batchflowservice_kindforstage": ".kindForStage()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L82 | neighbors=[BatchFlowService, .createBatch(), .getAvailableSources(), .getLineBatches(), .getStageResources()]
- "batch_and_runs_batch_flow_service_batchflowservice_resolveline": ".resolveLine()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L45 | neighbors=[BatchFlowService, .createBatch(), .getAvailableSources(), .getLineBatches(), .getStageResources()]
- "batch_and_runs_production_run_schema": "production-run.schema.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.schema.ts:L1 | neighbors=[CreateProductionRunDTO, createProductionRunSchema, RUN_REASONS, saleOrderParamsSchema, 558dd8a refactor(server): split flat do…]
- "brands_brand_routes": "brand.routes.ts" | kind=code-symbol | source=server/src/modules/brands/brand.routes.ts:L1 | neighbors=[router, validateRequest.ts, validateParams(), validateRequest(), 558dd8a refactor(server): split flat do…]
- "brands_brand_schema": "brand.schema.ts" | kind=code-symbol | source=server/src/modules/brands/brand.schema.ts:L1 | neighbors=[CreateBrandDTO, createBrandSchema, UpdateBrandDTO, updateBrandSchema, 558dd8a refactor(server): split flat do…]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@adfafe75dc3b508c99025b6f29034770a85fdad2": "adfafe7 polish: nav + page copy for the two product lines" | kind=Commit | source=git | neighbors=[3e6a631 feat: woven production client U…, chore/ci, cc50221 feat: dispatched status + FBR i…, WorkOrderListPage.tsx, navigation.ts]
- "companies_company_schema": "company.schema.ts" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CreateCompanyDTO, createCompanySchema, UpdateCompanyDTO, updateCompanySchema]
- "components_planlabeltypedialog_unifiedplanningdialog": "UnifiedPlanningDialog()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L27 | neighbors=[PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx, index.ts]
- "components_stageprogressbars_stageprogressbars": "StageProgressBars()" | kind=code-symbol | source=client/src/features/production-orders/components/StageProgressBars.tsx:L55 | neighbors=[StageProgressBars.tsx, stageRowsOf(), WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, index.ts]
- "config_logger_logger_formatmessage": ".formatMessage()" | kind=code-symbol | source=server/src/shared/config/logger.ts:L11 | neighbors=[Logger, .debug(), .error(), .info(), .warn()]
- "data_table_data_table_export_exportrowstoexcel": "exportRowsToExcel()" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L34 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, toRecords(), index.ts]
- "data_table_sticky_columns": "sticky-columns.ts" | kind=code-symbol | source=client/src/shared/components/data-table/sticky-columns.ts:L1 | neighbors=[cc50221 feat: dispatched status + FBR i…, index.ts, stickyCellClass(), utils.ts, cn()]
- "db_clear_all_tables": "clear-all-tables.ts" | kind=code-symbol | source=server/src/shared/db/clear-all-tables.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, clearAll(), index.ts, db, 9b99ce1 feat: complete production workf…]
- "db_migrate_speed_column": "migrate-speed-column.ts" | kind=code-symbol | source=server/src/shared/db/migrate-speed-column.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, migrateSpeedColumn(), index.ts]
- "db_test_mail": "test-mail.ts" | kind=code-symbol | source=server/src/shared/db/test-mail.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, main(), mail.service.ts, MailService, 9b99ce1 feat: complete production workf…]
- "drizzle_0000_lovely_imperial_guard_production_progress": "production_progress" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L74 | neighbors=[0000_lovely_imperial_guard.sql, public.machines, public.materials, public.operators, public.work_orders]
- "drizzle_0000_lovely_imperial_guard_public_materials": "public.materials" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L168 | neighbors=[0000_lovely_imperial_guard.sql, inventory_rolls, production_progress, purchase_records, roll_allocations]
- "drizzle_0004_production_roll_issuances": "0004_production_roll_issuances.sql" | kind=code-symbol | source=server/drizzle/0004_production_roll_issuances.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, production_roll_issuances, public.materials, public.production_order_lines, public.users]
- "drizzle_0014_last_meteorite": "0014_last_meteorite.sql" | kind=code-symbol | source=server/drizzle/0014_last_meteorite.sql:L1 | neighbors=[c27dc7d feat(server): stock CRUD histor…, inventory_roll_movements, operators, public.inventory_rolls, public.users]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-014.json

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
