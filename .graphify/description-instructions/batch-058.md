# Node Description Batch 59 of 74

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

- "pages_productionorderdashboardpage_field": "Field()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L400 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_printedproductionbody": "PrintedProductionBody()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L241 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_productionorderdashboardpage": "ProductionOrderDashboardPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L40 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderlistpage_productionorderlistpage": "ProductionOrderListPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderListPage.tsx:L9 | neighbors=[ProductionOrderListPage.tsx]
- "pages_productionorderplanningpage_field": "Field()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L142 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_productionorderplanningpage_productionorderplanningpage": "ProductionOrderPlanningPage()" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L17 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_purchaserecordpage_purchaserecordpage": "PurchaseRecordPage()" | kind=code-symbol | source=client/src/features/purchases/pages/PurchaseRecordPage.tsx:L23 | neighbors=[PurchaseRecordPage.tsx]
- "pages_purchaserecordpage_purchasetab": "PurchaseTab" | kind=code-symbol | source=client/src/features/purchases/pages/PurchaseRecordPage.tsx:L11 | neighbors=[PurchaseRecordPage.tsx]
- "pages_purchaserecordpage_tabs": "TABS" | kind=code-symbol | source=client/src/features/purchases/pages/PurchaseRecordPage.tsx:L13 | neighbors=[PurchaseRecordPage.tsx]
- "pages_rollpurchasespage_rollpurchasespage": "RollPurchasesPage()" | kind=code-symbol | source=client/src/features/purchases/pages/RollPurchasesPage.tsx:L13 | neighbors=[RollPurchasesPage.tsx]
- "pages_rollstockpage_rollstockpage": "RollStockPage()" | kind=code-symbol | source=client/src/features/inventory/pages/RollStockPage.tsx:L7 | neighbors=[RollStockPage.tsx]
- "pages_stickermaterialspage_stickermaterialspage": "StickerMaterialsPage()" | kind=code-symbol | source=client/src/features/materials/pages/StickerMaterialsPage.tsx:L3 | neighbors=[StickerMaterialsPage.tsx]
- "pages_threaddyeingpage_providerstable": "ProvidersTable()" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L147 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_sendstable": "SendsTable()" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L81 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_status_variant": "STATUS_VARIANT" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L17 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_threaddyeingpage": "ThreadDyeingPage()" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L23 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threadpurchasespage_threadpurchasespage": "ThreadPurchasesPage()" | kind=code-symbol | source=client/src/features/purchases/pages/ThreadPurchasesPage.tsx:L8 | neighbors=[ThreadPurchasesPage.tsx]
- "pages_undyedthreadstockpage_undyedthreadstockpage": "UndyedThreadStockPage()" | kind=code-symbol | source=client/src/features/inventory/pages/UndyedThreadStockPage.tsx:L7 | neighbors=[UndyedThreadStockPage.tsx]
- "pages_workorderdetailpage_field": "Field()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L420 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_figure": "Figure()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L429 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_productionflowsection": "ProductionFlowSection()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L379 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_stageprogress": "StageProgress()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L438 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_stageprogresspcs": "StageProgressPcs()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L554 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_stageprogresssection": "StageProgressSection()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L267 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_th": "Th()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L409 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_workorderdetailpage": "WorkOrderDetailPage()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L32 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_wovenproductiondetailview": "WovenProductionDetailView()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L463 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderlistpage_workorderlistpage": "WorkOrderListPage()" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderListPage.tsx:L8 | neighbors=[WorkOrderListPage.tsx]
- "production_orders_batch_types_batchsourceedge": "BatchSourceEdge" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L25 | neighbors=[batch-types.ts]
- "production_orders_batch_types_batchsourceoption": "BatchSourceOption" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L86 | neighbors=[batch-types.ts]
- "production_orders_batch_types_sourceallocationinput": "SourceAllocationInput" | kind=code-symbol | source=client/src/features/production-orders/batch-types.ts:L208 | neighbors=[batch-types.ts]
- "production_orders_label_types_labeltype": "LabelType" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L14 | neighbors=[label-types.ts]
- "production_orders_label_types_sizelabel": "sizeLabel()" | kind=code-symbol | source=client/src/features/production-orders/label-types.ts:L31 | neighbors=[label-types.ts]
- "production_orders_production_order_controller_productionordercontroller": "ProductionOrderController" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.controller.ts:L17 | neighbors=[production-order.controller.ts]
- "production_orders_production_order_helpers_cascadechain": "cascadeChain()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L81 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_deriveorderpatch": "deriveOrderPatch()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L152 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_missingcuttingrequirements": "missingCuttingRequirements()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L65 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_missingstartrequirements": "missingStartRequirements()" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L56 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_planlineinput": "PlanLineInput" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L7 | neighbors=[production-order.helpers.ts]
- "production_orders_production_order_helpers_productionstage": "ProductionStage" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.helpers.ts:L4 | neighbors=[production-order.helpers.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-058.json

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
