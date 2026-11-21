# Node Description Batch 21 of 38

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

- "hooks_use_thread_dyeing_usereceivedyeing": "useReceiveDyeing()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L79 | neighbors=[ReceiveDyeingDialog.tsx, use-thread-dyeing.ts]
- "hooks_use_thread_dyeing_usesenddyeing": "useSendDyeing()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L66 | neighbors=[SendDyeingDialog.tsx, use-thread-dyeing.ts]
- "hooks_use_thread_dyeing_usesends": "useSends()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L58 | neighbors=[use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "hooks_use_thread_dyeing_useupdateprovider": "useUpdateProvider()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L32 | neighbors=[ServiceProviderDialog.tsx, use-thread-dyeing.ts]
- "hooks_use_thread_usecreatedyebatch": "useCreateDyeBatch()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L118 | neighbors=[DyeThreadDialog.tsx, use-thread.ts]
- "hooks_use_thread_usecreatethreadpurchase": "useCreateThreadPurchase()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L48 | neighbors=[ThreadPurchasePanel.tsx, use-thread.ts]
- "hooks_use_thread_usecreatethreadstock": "useCreateThreadStock()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L72 | neighbors=[ThreadStockDialog.tsx, use-thread.ts]
- "hooks_use_thread_usedeletethreadpurchase": "useDeleteThreadPurchase()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L60 | neighbors=[ThreadPurchasePanel.tsx, use-thread.ts]
- "hooks_use_thread_usedeletethreadstock": "useDeleteThreadStock()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L97 | neighbors=[ThreadStockPanel.tsx, use-thread.ts]
- "hooks_use_thread_usedyebatches": "useDyeBatches()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L109 | neighbors=[use-thread.ts, index.ts]
- "hooks_use_thread_useupdatethreadstock": "useUpdateThreadStock()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L84 | neighbors=[ThreadStockDialog.tsx, use-thread.ts]
- "hooks_use_work_orders_usecreateworkorder": "useCreateWorkOrder()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L29 | neighbors=[WorkOrderDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_usedispatchworkorder": "useDispatchWorkOrder()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L59 | neighbors=[DispatchDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_useupdateworkorder": "useUpdateWorkOrder()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L41 | neighbors=[WorkOrderDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_useworkorderdetail": "useWorkOrderDetail()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L20 | neighbors=[use-work-orders.ts, WorkOrderDetailPage.tsx]
- "hooks_use_woven_production_usedeletewovenline": "useDeleteWovenLine()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L51 | neighbors=[WovenProductionPanel.tsx, use-woven-production.ts]
- "hooks_use_woven_production_useplanwovenline": "usePlanWovenLine()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L36 | neighbors=[PlanLabelTypeDialog.tsx, use-woven-production.ts]
- "hooks_use_woven_production_usereconcilewoventhreadstock": "useReconcileWovenThreadStock()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L102 | neighbors=[WovenThreadReconciliationCard.tsx, use-woven-production.ts]
- "ink_types_inkoperatorsummary": "InkOperatorSummary" | kind=code-symbol | source=src/features/ink/types.ts:L55 | neighbors=[types.ts, ink-service.ts]
- "ink_types_inkstockrow": "InkStockRow" | kind=code-symbol | source=src/features/ink/types.ts:L25 | neighbors=[types.ts, ink-service.ts]
- "inventory_types_purchaseinput": "PurchaseInput" | kind=code-symbol | source=src/features/inventory/types.ts:L42 | neighbors=[types.ts, inventory-service.ts]
- "inventory_types_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=src/features/inventory/types.ts:L20 | neighbors=[types.ts, inventory-service.ts]
- "layout_pagecontainer_pagecontainer": "PageContainer()" | kind=code-symbol | source=src/components/layout/PageContainer.tsx:L21 | neighbors=[PageContainer.tsx, AppLayout.tsx]
- "layouts_applayout_getinitialsidebaropen": "getInitialSidebarOpen()" | kind=code-symbol | source=src/shared/layouts/AppLayout.tsx:L22 | neighbors=[AppLayout.tsx, AppLayout()]
- "lib_api_request": "request()" | kind=code-symbol | source=src/lib/api.ts:L23 | neighbors=[api.ts, ApiError]
- "lib_format_calculateinvoiceweight": "calculateInvoiceWeight()" | kind=code-symbol | source=src/lib/format.ts:L89 | neighbors=[PurchaseForm.tsx, format.ts]
- "lib_format_calculatetotalweight": "calculateTotalWeight()" | kind=code-symbol | source=src/lib/format.ts:L70 | neighbors=[PlanLabelTypeForm.tsx, format.ts]
- "lib_format_totalrollequivalent200m": "totalRollEquivalent200m()" | kind=code-symbol | source=src/lib/format.ts:L80 | neighbors=[PurchaseForm.tsx, format.ts]
- "lib_query_client_queryclient": "queryClient" | kind=code-symbol | source=src/lib/query-client.ts:L3 | neighbors=[query-client.ts, QueryProvider.tsx]
- "machines_operators_types_machineavailability": "MachineAvailability" | kind=code-symbol | source=src/features/machines-operators/types.ts:L6 | neighbors=[AvailabilityBadge.tsx, types.ts]
- "machines_operators_types_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=src/features/machines-operators/types.ts:L7 | neighbors=[AvailabilityBadge.tsx, types.ts]
- "machines_operators_types_operatortype": "OperatorType" | kind=code-symbol | source=src/features/machines-operators/types.ts:L33 | neighbors=[operator-table.tsx, types.ts]
- "materials_receipts_types_materialreceiptconfig": "MaterialReceiptConfig" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L22 | neighbors=[MaterialReceiptPage.tsx, receipts-types.ts]
- "production_orders_batch_types_availablesources": "AvailableSources" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L96 | neighbors=[batch-types.ts, batch-service.ts]
- "production_orders_batch_types_batchstatus": "BatchStatus" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L22 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_batchtrace": "BatchTrace" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L205 | neighbors=[batch-types.ts, batch-service.ts]
- "production_orders_batch_types_batchtracerow": "BatchTraceRow" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L195 | neighbors=[BatchTraceDialog.tsx, batch-types.ts]
- "production_orders_batch_types_formatduration": "formatDuration()" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L80 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_isbatchopen": "isBatchOpen()" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L279 | neighbors=[BatchStageBoard.tsx, batch-types.ts]
- "production_orders_batch_types_stageresources": "StageResources" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L137 | neighbors=[batch-types.ts, batch-service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-020.json

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
