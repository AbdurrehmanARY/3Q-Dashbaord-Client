# Node Description Batch 44 of 53

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
- "production_orders_types_linecutting": "LineCutting" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L160 | neighbors=[types.ts]
- "production_orders_types_lineliveprogress": "LineLiveProgress" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L183 | neighbors=[types.ts]
- "production_orders_types_linematerial": "LineMaterial" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L128 | neighbors=[types.ts]
- "production_orders_types_linepackaging": "LinePackaging" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L172 | neighbors=[types.ts]
- "production_orders_types_lineprinting": "LinePrinting" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L147 | neighbors=[types.ts]
- "production_orders_types_linereadiness": "LineReadiness" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L142 | neighbors=[types.ts]
- "production_orders_types_linereconciliation": "LineReconciliation" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L198 | neighbors=[types.ts]
- "production_orders_types_machineavailability": "MachineAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L366 | neighbors=[types.ts]
- "production_orders_types_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L367 | neighbors=[types.ts]
- "production_orders_types_productioneventtype": "ProductionEventType" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L307 | neighbors=[types.ts]
- "production_orders_types_productionorderheader": "ProductionOrderHeader" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L248 | neighbors=[types.ts]
- "production_orders_types_productionordertotals": "ProductionOrderTotals" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L272 | neighbors=[types.ts]
- "production_orders_types_resourceavailability": "ResourceAvailability" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L370 | neighbors=[types.ts]
- "production_orders_types_stageinventoryposition": "StageInventoryPosition" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L213 | neighbors=[types.ts]
- "production_orders_types_transfertarget": "TransferTarget" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L9 | neighbors=[types.ts]
- "production_orders_types_user": "User" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L13 | neighbors=[types.ts]
- "production_orders_types_userrole": "UserRole" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L11 | neighbors=[types.ts]
- "production_orders_woven_types_threadplaninput": "ThreadPlanInput" | kind=code-symbol | source=client/src/features/production-orders/woven-types.ts:L93 | neighbors=[woven-types.ts]
- "production_runs_types_machinebreakdown": "MachineBreakdown" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L47 | neighbors=[types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-043.json

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
