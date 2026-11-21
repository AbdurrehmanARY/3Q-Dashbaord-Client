# Node Description Batch 32 of 38

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

- "pages_inkconsumptionpage_exportcolumns": "exportColumns" | kind=code-symbol | source=src/features/ink/pages/InkConsumptionPage.tsx:L22 | neighbors=[InkConsumptionPage.tsx]
- "pages_inkconsumptionpage_inkconsumptionpage": "InkConsumptionPage()" | kind=code-symbol | source=src/features/ink/pages/InkConsumptionPage.tsx:L32 | neighbors=[InkConsumptionPage.tsx]
- "pages_inkpurchasespage_exportcolumns": "exportColumns" | kind=code-symbol | source=src/features/ink/pages/InkPurchasesPage.tsx:L18 | neighbors=[InkPurchasesPage.tsx]
- "pages_inkpurchasespage_inkpurchasespage": "InkPurchasesPage()" | kind=code-symbol | source=src/features/ink/pages/InkPurchasesPage.tsx:L29 | neighbors=[InkPurchasesPage.tsx]
- "pages_inventorystockpage_inventorystockpage": "InventoryStockPage()" | kind=code-symbol | source=src/features/inventory/pages/InventoryStockPage.tsx:L19 | neighbors=[InventoryStockPage.tsx]
- "pages_inventorystockpage_stocktab": "StockTab" | kind=code-symbol | source=src/features/inventory/pages/InventoryStockPage.tsx:L7 | neighbors=[InventoryStockPage.tsx]
- "pages_inventorystockpage_tabs": "TABS" | kind=code-symbol | source=src/features/inventory/pages/InventoryStockPage.tsx:L9 | neighbors=[InventoryStockPage.tsx]
- "pages_labelsheetspage_labelsheetspage": "LabelSheetsPage()" | kind=code-symbol | source=src/features/materials/pages/LabelSheetsPage.tsx:L3 | neighbors=[LabelSheetsPage.tsx]
- "pages_labeltypemasterpage_labeltypemasterpage": "LabelTypeMasterPage()" | kind=code-symbol | source=src/features/label-types/pages/LabelTypeMasterPage.tsx:L10 | neighbors=[LabelTypeMasterPage.tsx]
- "pages_localsheetspage_localsheetspage": "LocalSheetsPage()" | kind=code-symbol | source=src/features/materials/pages/LocalSheetsPage.tsx:L3 | neighbors=[LocalSheetsPage.tsx]
- "pages_machinesoperatorspage_machinesoperatorspage": "MachinesOperatorsPage()" | kind=code-symbol | source=src/features/machines-operators/pages/MachinesOperatorsPage.tsx:L5 | neighbors=[MachinesOperatorsPage.tsx]
- "pages_machinespage_machinespage": "MachinesPage()" | kind=code-symbol | source=src/features/machines-operators/pages/MachinesPage.tsx:L4 | neighbors=[MachinesPage.tsx]
- "pages_materialmasterpage_materialmasterpage": "MaterialMasterPage()" | kind=code-symbol | source=src/features/materials/pages/MaterialMasterPage.tsx:L8 | neighbors=[MaterialMasterPage.tsx]
- "pages_operatorspage_operatorspage": "OperatorsPage()" | kind=code-symbol | source=src/features/machines-operators/pages/OperatorsPage.tsx:L4 | neighbors=[OperatorsPage.tsx]
- "pages_productionorderdashboardpage_batchflowsection": "BatchFlowSection()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L394 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_field": "Field()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L432 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_printedproductionbody": "PrintedProductionBody()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L246 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderdashboardpage_productionorderdashboardpage": "ProductionOrderDashboardPage()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L42 | neighbors=[ProductionOrderDashboardPage.tsx]
- "pages_productionorderlistpage_productionorderlistpage": "ProductionOrderListPage()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderListPage.tsx:L9 | neighbors=[ProductionOrderListPage.tsx]
- "pages_productionorderplanningpage_field": "Field()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L142 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_productionorderplanningpage_productionorderplanningpage": "ProductionOrderPlanningPage()" | kind=code-symbol | source=src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L17 | neighbors=[ProductionOrderPlanningPage.tsx]
- "pages_purchaserecordpage_purchaserecordpage": "PurchaseRecordPage()" | kind=code-symbol | source=src/features/purchases/pages/PurchaseRecordPage.tsx:L23 | neighbors=[PurchaseRecordPage.tsx]
- "pages_purchaserecordpage_purchasetab": "PurchaseTab" | kind=code-symbol | source=src/features/purchases/pages/PurchaseRecordPage.tsx:L11 | neighbors=[PurchaseRecordPage.tsx]
- "pages_purchaserecordpage_tabs": "TABS" | kind=code-symbol | source=src/features/purchases/pages/PurchaseRecordPage.tsx:L13 | neighbors=[PurchaseRecordPage.tsx]
- "pages_rollpurchasespage_rollpurchasespage": "RollPurchasesPage()" | kind=code-symbol | source=src/features/purchases/pages/RollPurchasesPage.tsx:L13 | neighbors=[RollPurchasesPage.tsx]
- "pages_rollstockpage_rollstockpage": "RollStockPage()" | kind=code-symbol | source=src/features/inventory/pages/RollStockPage.tsx:L7 | neighbors=[RollStockPage.tsx]
- "pages_stickermaterialspage_stickermaterialspage": "StickerMaterialsPage()" | kind=code-symbol | source=src/features/materials/pages/StickerMaterialsPage.tsx:L3 | neighbors=[StickerMaterialsPage.tsx]
- "pages_threaddyeingpage_providerstable": "ProvidersTable()" | kind=code-symbol | source=src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L147 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_sendstable": "SendsTable()" | kind=code-symbol | source=src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L81 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_status_variant": "STATUS_VARIANT" | kind=code-symbol | source=src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L17 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threaddyeingpage_threaddyeingpage": "ThreadDyeingPage()" | kind=code-symbol | source=src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L23 | neighbors=[ThreadDyeingPage.tsx]
- "pages_threadpurchasespage_threadpurchasespage": "ThreadPurchasesPage()" | kind=code-symbol | source=src/features/purchases/pages/ThreadPurchasesPage.tsx:L8 | neighbors=[ThreadPurchasesPage.tsx]
- "pages_undyedthreadstockpage_undyedthreadstockpage": "UndyedThreadStockPage()" | kind=code-symbol | source=src/features/inventory/pages/UndyedThreadStockPage.tsx:L7 | neighbors=[UndyedThreadStockPage.tsx]
- "pages_workorderdetailpage_field": "Field()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L432 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_figure": "Figure()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L441 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_productionflowsection": "ProductionFlowSection()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L385 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_stageprogress": "StageProgress()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L450 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_stageprogresspcs": "StageProgressPcs()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L566 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_th": "Th()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L421 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderdetailpage_workorderdetailpage": "WorkOrderDetailPage()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L33 | neighbors=[WorkOrderDetailPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-031.json

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
