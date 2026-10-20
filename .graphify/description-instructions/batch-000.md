# Node Description Batch 1 of 74

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

- "commit:repo:local/3Q-facility-Dashboard@9740e304@c0c79ec9479dc3e587a716987545bc9bf336ca4e": "c0c79ec Initial commit: Label Manufacturing ERP + audit remediation" | kind=Commit | source=git | neighbors=[AppProviders.tsx, AppRoutes.tsx, routes.tsx, chore/ci, AppBreadcrumb.tsx, AppCard.tsx] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@9b99ce1e72bc5c62b6a4bd38db05d484691eb7b3": "9b99ce1 feat: complete production workflow, stock master data, company brand co…" | kind=Commit | source=git | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, routes.tsx, chore/ci, ee6d4dd refactor(server): vertical-slic…, ArtworkAndComment.tsx, brand-columns.tsx] | lang=fr
- "commit:repo:local/3Q-facility-Dashboard@9740e304@ee6d4dde05688f77295b03f6b0d506147a3f5a2e": "ee6d4dd refactor(server): vertical-slice modules + shared layout" | kind=Commit | source=git | neighbors=[9b99ce1 feat: complete production workf…, analytics.controller.ts, analytics.repository.ts, analytics.routes.ts, analytics.service.ts, chore/ci] | lang=en
- "db_schema": "schema.ts" | kind=code-symbol | source=server/src/shared/db/schema.ts:L1 | neighbors=[analytics.repository.ts, batch-flow.repository.ts, batch-flow.repository.test.ts, production-run.repository.ts, cd392dc feat(label-types): add label ty…, ee6d4dd refactor(server): vertical-slic…] | lang=en
- "lib_utils": "utils.ts" | kind=code-symbol | source=client/src/lib/utils.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, CreateBatchDialog.tsx] | lang=en
- "lib_utils_cn": "cn()" | kind=code-symbol | source=client/src/lib/utils.ts:L4 | neighbors=[AppCard.tsx, StatCard.tsx, brand-row-actions.tsx, company-row-actions.tsx, CreateBatchDialog.tsx, CreateProductionOrderDialog.tsx] | lang=en
- "forms_appbutton": "AppButton.tsx" | kind=code-symbol | source=client/src/components/forms/AppButton.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, brand-row-actions.tsx, BrandDialog.tsx] | lang=en
- "components_planlabeltypeform": "PlanLabelTypeForm.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PlanLabelTypeDialog.tsx, AppCard.tsx] | lang=en
- "lib_format": "format.ts" | kind=code-symbol | source=client/src/lib/format.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx] | lang=en
- "production_orders_types": "types.ts" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, EditableLabelTypeTable.tsx] | lang=en
- "forms_appbutton_appbutton": "AppButton" | kind=code-symbol | source=client/src/components/forms/AppButton.tsx:L14 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx] | lang=en
- "pages_productionorderdashboardpage": "ProductionOrderDashboardPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L1 | neighbors=[routes.tsx, 0a3ef12 fix(production): order-scoped c…, 3e6a631 feat: woven production client U…, 7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…] | lang=en
- "data_table_index": "index.ts" | kind=code-symbol | source=client/src/shared/components/data-table/index.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, brand-columns.tsx, BrandTable.tsx, company-columns.tsx] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@558dd8adc67761833780a218a4c85efadde670ec": "558dd8a refactor(server): split flat domains into sub-module slices" | kind=Commit | source=git | neighbors=[13b0a3c chore(server): give vitest a fa…, batch-flow.controller.ts, batch-flow.helpers.ts, batch-flow.helpers.test.ts, batch-flow.repository.ts, batch-flow.repository.test.ts] | lang=pt
- "lib_format_formatnumber": "formatNumber()" | kind=code-symbol | source=client/src/lib/format.ts:L3 | neighbors=[BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx, CreateBatchDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx] | lang=en
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppHeader.tsx, AppLayout.tsx, AppSidebar.tsx, nav-main.tsx, nav-user.tsx] | lang=en
- "components_batchstageboard": "BatchStageBoard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 95ce13e feat(production): make cutting …, AppCard.tsx, AppCard, BatchOutputDialog.tsx] | lang=en
- "hooks_use_production_orders": "use-production-orders.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx] | lang=en
- "components_editablelabeltypetable": "EditableLabelTypeTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable()] | lang=en
- "pages_workorderdetailpage": "WorkOrderDetailPage.tsx" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L1 | neighbors=[routes.tsx, 09c4b95 feat: dispatch dialog, product-…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…] | lang=en
- "components_workorderdialog": "WorkOrderDialog.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, c401a21 feat(client): weaving-time disp…, cc50221 feat: dispatched status + FBR i…] | lang=en
- "data_table_data_table": "data-table.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L1 | neighbors=[2c8bd34 feat(client): per-table column …, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, alignClass(), DataTable()] | lang=en
- "batch_and_runs_batch_flow_helpers": "batch-flow.helpers.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L1 | neighbors=[assertOutputWithinInput(), assertWithinAvailable(), assertWithinPlan(), batchCodeFor(), BatchPosition, batchPositionOf()] | lang=en
- "components_threadpurchasepanel": "ThreadPurchasePanel.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadPurchasePanel.tsx:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, cc50221 feat: dispatched status + FBR i…, AppCard.tsx, AppCard, COLOR_OPTIONS, DENIER_OPTIONS] | lang=en
- "production_orders_batch_types": "batch-types.ts" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 95ce13e feat(production): make cutting …, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx] | lang=en
- "components_roll_stock_row_actions": "roll-stock-row-actions.tsx" | kind=code-symbol | source=client/src/features/inventory/components/roll-stock-row-actions.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, inventory-columns.tsx, HistoryDialog(), MOVEMENT_LABELS, RollStockRowActions(), RollStockDialog.tsx] | lang=en
- "components_threadstockpanel": "ThreadStockPanel.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockPanel.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, 9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, AppCard.tsx, AppCard] | lang=en
- "forms_appinput": "AppInput.tsx" | kind=code-symbol | source=client/src/components/forms/AppInput.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BatchOutputDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, DispatchDialog.tsx] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@7d4a38dcae08993914043d8015bf3270ad4c7260": "7d4a38d feat(client): batch planning and stage UI for production orders" | kind=Commit | source=git | neighbors=[2e755d6 feat(server): persist estimated…, chore/ci, c401a21 feat(client): weaving-time disp…, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx] | lang=en
- "ui_combobox": "combobox.tsx" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, combobox.tsx, inventory-stock-table.tsx, machine-table.tsx] | lang=en
- "components_wovenproductionpanel": "WovenProductionPanel.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenProductionPanel.tsx:L1 | neighbors=[3e6a631 feat: woven production client U…, 7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard] | lang=en
- "errors_apierror": "ApiError.ts" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L1 | neighbors=[batch-flow.helpers.ts, batch-flow.repository.ts, batch-flow.service.ts, production-run.service.ts, ee6d4dd refactor(server): vertical-slic…, company.service.ts] | lang=en
- "pages_threaddyeingpage": "ThreadDyeingPage.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, ReceiveDyeingDialog(), SendDyeingDialog.tsx, SendDyeingDialog()] | lang=en
- "production_orders_index": "index.ts" | kind=code-symbol | source=client/src/features/production-orders/index.ts:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 95ce13e feat(production): make cutting …, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…] | lang=en
- "dialogs_appdialog": "AppDialog.tsx" | kind=code-symbol | source=client/src/components/dialogs/AppDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BatchOutputDialog.tsx, BatchTraceDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx] | lang=en
- "components_createbatchdialog": "CreateBatchDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/CreateBatchDialog.tsx:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 95ce13e feat(production): make cutting …, BatchStageBoard.tsx, CreateBatchDialog(), CreateBatchDialogProps] | lang=en
- "components_work_order_row_actions": "work-order-row-actions.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-row-actions.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, work-order-columns.tsx, DispatchDialog.tsx] | lang=en
- "feedback_statusbadge": "StatusBadge.tsx" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx] | lang=en
- "services_production_order_service": "production-order-service.ts" | kind=code-symbol | source=client/src/features/production-orders/services/production-order-service.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, use-production-orders.ts, api.ts] | lang=en
- "baseline_live_schema": "live-schema.sql" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1 | neighbors=[public.batch_consumptions, public.brands, public.companies, public.ink_consumptions, public.ink_purchases, public.inventory_roll_movements] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-000.json

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
