# Node Description Batch 17 of 74

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=client/src/components/ui/checkbox.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, utils.ts, cn(), Checkbox()] | lang=en
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=client/src/components/ui/collapsible.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, nav-main.tsx, Collapsible(), CollapsibleContent(), CollapsibleTrigger] | lang=en
- "ui_progress_progress": "Progress()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L5 | neighbors=[LabelTypeRow.tsx, progress-bar.tsx, StageProgressBars.tsx, WorkOrderDetailPage.tsx, progress.tsx] | lang=en
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), ScrollArea(), ScrollBar()] | lang=en
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=client/src/components/ui/sonner.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ToastProvider.tsx, ui-store.ts, useUiStore, Toaster()] | lang=en
- "utils_weaving_time": "weaving-time.ts" | kind=code-symbol | source=client/src/features/work-orders/utils/weaving-time.ts:L1 | neighbors=[c401a21 feat(client): weaving-time disp…, work-order-columns.tsx, WovenSpecification.tsx, estimateWeavingHours(), weaving-time.test.ts] | lang=en
- "validation_common_schema": "common.schema.ts" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, companyIdParamsSchema, idParamsSchema, lineIdParamsSchema, paginationQuerySchema] | lang=en
- "work_orders_types_workorderdetail": "WorkOrderDetail" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L109 | neighbors=[DispatchDialog.tsx, WorkOrderDialog.tsx, work-order-service.ts, types.ts, WorkOrder] | lang=en
- "woven_production_woven_production_helpers_tonumbers": "toNumbers()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.helpers.ts:L12 | neighbors=[woven-production.helpers.ts, canStartCutting(), canStartPackaging(), deriveWovenLineStatus(), hasWovenProgress()] | lang=en
- "analytics_analytics_controller": "analytics.controller.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.controller.ts:L1 | neighbors=[AnalyticsController, asyncHandler.ts, asyncHandler(), ee6d4dd refactor(server): vertical-slic…] | lang=en
- "baseline_live_schema_public_batch_consumptions": "public.batch_consumptions" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L251 | neighbors=[live-schema.sql, public.production_batches, public.production_orders, public.users] | lang=en
- "baseline_live_schema_public_production_roll_issuances": "public.production_roll_issuances" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L861 | neighbors=[live-schema.sql, public.materials, public.production_order_lines, public.users] | lang=en
- "baseline_live_schema_public_production_stage_transactions": "public.production_stage_transactions" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L954 | neighbors=[live-schema.sql, public.production_batches, public.production_order_lines, public.users] | lang=en
- "baseline_live_schema_public_thread_dyeing_sends": "public.thread_dyeing_sends" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1188 | neighbors=[live-schema.sql, public.thread_dyeing_allocations, public.thread_dyeing_receives, public.thread_service_providers] | lang=en
- "baseline_live_schema_public_thread_stocks": "public.thread_stocks" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1340 | neighbors=[live-schema.sql, public.thread_dye_batches, public.thread_stock_movements, public.woven_thread_plan_items] | lang=en
- "baseline_live_schema_public_woven_production_lines": "public.woven_production_lines" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1462 | neighbors=[live-schema.sql, public.production_batches, public.production_orders, public.woven_thread_plan_items] | lang=en
- "batch_and_runs_batch_flow_helpers_batchpositionof": "batchPositionOf()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L138 | neighbors=[batch-flow.helpers.ts, assertWithinAvailable(), n(), round2()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_attachsources": ".attachSources()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L266 | neighbors=[BatchFlowRepository, .findById(), .findByLine(), .findByOrder()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_bumpconsumedtx": ".bumpConsumedTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1181 | neighbors=[BatchFlowRepository, .releaseAllSourcesTx(), .releaseToSourcesTx(), .replaceSourcesTx()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_locksourcestx": ".lockSourcesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L957 | neighbors=[BatchFlowRepository, lineRefOfBatchOrNull(), round2(), .replaceSourcesTx()] | lang=en
- "batch_and_runs_batch_flow_repository_linecolumn": "lineColumn()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L115 | neighbors=[batch-flow.repository.ts, .findByLine(), .flowInTx(), .insertBatchTx()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_createbatch": ".createBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L413 | neighbors=[BatchFlowService, .getBatch(), .kindForStage(), .resolveLine()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_getavailablesources": ".getAvailableSources()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L275 | neighbors=[BatchFlowService, .kindForStage(), .plannedQtyOf(), .resolveLine()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_getlinebatches": ".getLineBatches()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L118 | neighbors=[BatchFlowService, .kindForStage(), .resolveLine(), .withEstimates()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_getstageresources": ".getStageResources()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L344 | neighbors=[BatchFlowService, .kindForStage(), .resolveLine(), .resolveStageResources()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_withestimates": ".withEstimates()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L93 | neighbors=[BatchFlowService, .getBatch(), .getLineBatches(), .getOrderBatches()] | lang=en
- "batch_and_runs_production_run_controller": "production-run.controller.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.controller.ts:L1 | neighbors=[ProductionRunController, asyncHandler.ts, asyncHandler(), 558dd8a refactor(server): split flat do…] | lang=en
- "brands_brand_controller": "brand.controller.ts" | kind=code-symbol | source=server/src/modules/brands/brand.controller.ts:L1 | neighbors=[BrandController, asyncHandler.ts, asyncHandler(), 558dd8a refactor(server): split flat do…] | lang=en
- "cards_index": "index.ts" | kind=code-symbol | source=client/src/components/cards/index.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, index.ts] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@0daa333b8127e7d6df443c8030964df2c9d4064d": "0daa333 feat(client): show live stock balance in MaterialSelect" | kind=Commit | source=git | neighbors=[chore/ci, 7318ae9 docs: memory-bank, corrected .c…, MaterialSelect.tsx, 2c8bd34 feat(client): per-table column …] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@13b0a3c5f898256f5a7c78e84617e8ab92ba7fbd": "13b0a3c chore(server): give vitest a fallback DATABASE_URL" | kind=Commit | source=git | neighbors=[chore/ci, 558dd8a refactor(server): split flat do…, vitest.config.ts, e4ae1ff chore: ignore graphify cache/ou…] | lang=pt
- "commit:repo:local/3Q-facility-Dashboard@9740e304@8221c40cf8f46102576c386f0824958c90e4368f": "8221c40 chore(scripts,docs): default the batch-visibility gate to the newest or…" | kind=Commit | source=git | neighbors=[0a3ef12 fix(production): order-scoped c…, chore/ci, efa0e77 chore(db): repair migration jou…, verify-batch-visibility.mjs] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@a7e14be19c323870aed1b5d2fa4579227660e3a3": "a7e14be feat: woven planning, weaving/cutting/packaging stages, thread stock en…" | kind=Commit | source=git | neighbors=[09c4b95 feat: dispatch dialog, product-…, chore/ci, 95aebc1 feat: thread receiving, stock a…, woven-production-service.ts] | lang=pt
- "companies_company_controller": "company.controller.ts" | kind=code-symbol | source=server/src/modules/companies/company.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, CompanyController, asyncHandler.ts, asyncHandler()] | lang=en
- "components_batchstageboard_batchstageboard": "BatchStageBoard()" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L107 | neighbors=[BatchStageBoard.tsx, WovenProductionPanel.tsx, ProductionOrderDashboardPage.tsx, index.ts] | lang=en
- "components_materialreceiptpage_materialreceiptpage": "MaterialReceiptPage()" | kind=code-symbol | source=client/src/features/materials/components/MaterialReceiptPage.tsx:L21 | neighbors=[MaterialReceiptPage.tsx, LabelSheetsPage.tsx, LocalSheetsPage.tsx, StickerMaterialsPage.tsx] | lang=en
- "components_productionstatusbadge_productionorderstatusbadge": "ProductionOrderStatusBadge()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L18 | neighbors=[production-order-columns.tsx, ProductionStatusBadge.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx] | lang=en
- "components_purchaseform_purchaseform": "PurchaseForm()" | kind=code-symbol | source=client/src/features/purchases/components/PurchaseForm.tsx:L23 | neighbors=[purchase-row-actions.tsx, PurchaseForm.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx] | lang=en
- "dashboard_types": "types.ts" | kind=code-symbol | source=client/src/features/dashboard/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DashboardKpis, KpiResponse, dashboard-service.ts] | lang=en
- "data_table_data_table_export_datatableexportcolumn": "DataTableExportColumn" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-export.tsx:L8 | neighbors=[EditableLabelTypeTable.tsx, data-table.tsx, data-table-export.tsx, index.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-016.json

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
