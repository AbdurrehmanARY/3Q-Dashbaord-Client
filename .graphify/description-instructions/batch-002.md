# Node Description Batch 3 of 74

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

- "components_materialform": "MaterialForm.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, material-row-actions.tsx, descriptionOptions, MaterialForm(), MaterialFormProps]
- "constants_messages_messages": "Messages" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L1 | neighbors=[batch-flow.service.ts, production-run.service.ts, company.service.ts, messages.ts, ink.service.ts, inventory-roll.service.ts]
- "production_orders_woven_types": "woven-types.ts" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx]
- "components_dispatchdialog": "DispatchDialog.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchDialog.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, DispatchDialog(), DispatchDialogProps, AppDialog.tsx]
- "components_dyethreaddialog": "DyeThreadDialog.tsx" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, BASE_COLOR_OPTIONS, DENIER_OPTIONS, DyeThreadDialog(), AppDialog.tsx, AppDialog()]
- "components_inkconsumptiondialog": "InkConsumptionDialog.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkConsumptionDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_senddyeingdialog": "SendDyeingDialog.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/components/SendDyeingDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, SendDyeingDialog(), SendForm, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "errors_apierror_notfounderror": "NotFoundError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L22 | neighbors=[batch-flow.repository.ts, batch-flow.service.ts, production-run.service.ts, company.service.ts, ApiError.ts, ApiError]
- "feedback_statusbadge_statusbadge": "StatusBadge()" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L84 | neighbors=[AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx, inventory-columns.tsx, LowStockAlert.tsx, machine-columns.tsx]
- "middleware_validaterequest": "validateRequest.ts" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L1 | neighbors=[batch-flow.routes.ts, brand.routes.ts, ee6d4dd refactor(server): vertical-slic…, company.routes.ts, ink.routes.ts, inventory-roll.routes.ts]
- "sidebar_nav_main": "nav-main.tsx" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppSidebar.tsx, utils.ts, cn(), navigation.ts, NavItem]
- "batch_and_runs_batch_flow_repository": "batch-flow.repository.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1 | neighbors=[BatchFlowRepository, BatchScope, batchSelect, CreateBatchInput, lineColumn(), lineRefOfBatch()]
- "components_inventory_stock_table": "inventory-stock-table.tsx" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L1 | neighbors=[2c8bd34 feat(client): per-table column …, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, cc50221 feat: dispatched status + FBR i…]
- "components_purchase_table": "purchase-table.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L1 | neighbors=[2c8bd34 feat(client): per-table column …, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, date-picker.tsx, DatePicker()]
- "components_sharedthreadallocation": "SharedThreadAllocation.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, PlanLabelTypeForm.tsx, emptyThreadAllocationRow(), SharedThreadAllocation(), SharedThreadAllocationProps, ThreadAllocationRow]
- "components_threadstockdialog": "ThreadStockDialog.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, DENIER_OPTIONS, ThreadStockDialog(), ThreadStockDialogProps, threadStockSchema, ThreadStockSchemaInput]
- "constants_messages_entity": "Entity" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L9 | neighbors=[production-run.service.ts, company.service.ts, messages.ts, ink.service.ts, inventory.service.ts, material.service.ts]
- "components_machine_table": "machine-table.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-table.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard, machine-columns.tsx]
- "dialogs_appdialog_appdialog": "AppDialog()" | kind=code-symbol | source=client/src/components/dialogs/AppDialog.tsx:L22 | neighbors=[BatchOutputDialog.tsx, BatchTraceDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, CreateProductionOrderDialog.tsx]
- "forms_appcombobox": "AppCombobox.tsx" | kind=code-symbol | source=client/src/components/forms/AppCombobox.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, CompanyInfo.tsx, CompanySelect.tsx, CreateProductionOrderDialog.tsx]
- "hooks_use_thread": "use-thread.ts" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx]
- "lib_api": "api.ts" | kind=code-symbol | source=client/src/lib/api.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, client_healthcheck.tsx, materials-health.ts, production-health.ts, api]
- "production_orders_production_order_schema": "production-order.schema.ts" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.schema.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, AssignLineResourcesDTO, assignLineResourcesSchema, CreateBatchDTO, createBatchSchema, CreateProductionOrderDTO]
- "schemas_production_order_schemas": "production-order-schemas.ts" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PlanLabelTypeForm.tsx, assignResourcesSchema, AssignResourcesSchemaInput]
- "src_app": "app.ts" | kind=code-symbol | source=server/src/app.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, c0c79ec Initial commit: Label Manufactu…, cd392dc feat(label-types): add label ty…, ee6d4dd refactor(server): vertical-slic…, api-entry.ts, AppProviders.tsx]
- "thread_types": "types.ts" | kind=code-symbol | source=client/src/features/thread/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, DyeThreadDialog.tsx, ThreadPurchasePanel.tsx, ThreadStockDialog.tsx, ThreadStockPanel.tsx]
- "hooks_use_ink": "use-ink.ts" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkConsumptionDialog.tsx, InkOperatorBreakdown.tsx, InkPurchaseDialog.tsx, InkStockPanel.tsx, INK_KEYS]
- "components_inkpurchasedialog": "InkPurchaseDialog.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkPurchaseDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkPurchaseDialog(), Props, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_rollstockdialog": "RollStockDialog.tsx" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog(), RollStockDialogProps, rollStockSchema]
- "dialogs_confirmdialog": "ConfirmDialog.tsx" | kind=code-symbol | source=client/src/components/dialogs/ConfirmDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, data-table.tsx, ConfirmDialog()]
- "errors_asynchandler": "asyncHandler.ts" | kind=code-symbol | source=server/src/shared/errors/asyncHandler.ts:L1 | neighbors=[analytics.controller.ts, batch-flow.controller.ts, production-run.controller.ts, brand.controller.ts, ee6d4dd refactor(server): vertical-slic…, company.controller.ts]
- "hooks_use_entities": "use-entities.ts" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx, MachineSelect.tsx, operator-row-actions.tsx]
- "layout_pageheader_pageheader": "PageHeader()" | kind=code-symbol | source=client/src/components/layout/PageHeader.tsx:L11 | neighbors=[MaterialReceiptPage.tsx, PageHeader.tsx, CompanyBrandPage.tsx, DashboardPage.tsx, DyedThreadStockPage.tsx, InkConsumptionPage.tsx]
- "pages_inkpurchasespage": "InkPurchasesPage.tsx" | kind=code-symbol | source=client/src/features/ink/pages/InkPurchasesPage.tsx:L1 | neighbors=[routes.tsx, 2c8bd34 feat(client): per-table column …, 9b99ce1 feat: complete production workf…, ink-purchase-columns.tsx, inkPurchaseColumns(), InkPurchaseDialog.tsx]
- "batch_and_runs_batch_flow_schema": "batch-flow.schema.ts" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.schema.ts:L1 | neighbors=[actorUserId, batchActionSchema, batchIdParamsSchema, CreateConsumingBatchDTO, createConsumingBatchSchema, CreatePrintingBatchDTO]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@95ce13e359ee0a92d72beadca3ca8546910506d8": "95ce13e feat(production): make cutting and packaging batches line-scoped" | kind=Commit | source=git | neighbors=[batch-flow.controller.ts, batch-flow.helpers.ts, batch-flow.repository.ts, batch-flow.repository.test.ts, batch-flow.routes.ts, batch-flow.schema.ts]
- "components_branddialog": "BrandDialog.tsx" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, types.ts, Brand, Company, BrandDialog()]
- "components_companydialog": "CompanyDialog.tsx" | kind=code-symbol | source=client/src/features/companies/components/CompanyDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, company-row-actions.tsx, types.ts, Company, CompanyDialog(), CompanyDialogProps]
- "components_productiontrendchart": "ProductionTrendChart.tsx" | kind=code-symbol | source=client/src/features/dashboard/components/ProductionTrendChart.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, dayKey(), ProductionTrendChart(), RANGE_OPTIONS, index.ts, card.tsx]
- "errors_asynchandler_asynchandler": "asyncHandler()" | kind=code-symbol | source=server/src/shared/errors/asyncHandler.ts:L3 | neighbors=[analytics.controller.ts, batch-flow.controller.ts, production-run.controller.ts, brand.controller.ts, company.controller.ts, asyncHandler.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-002.json

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
