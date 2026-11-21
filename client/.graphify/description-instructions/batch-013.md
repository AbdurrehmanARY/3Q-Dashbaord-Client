# Node Description Batch 14 of 38

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

- "hooks_use_production_orders_usecompletionreport": "useCompletionReport()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L77 | neighbors=[ProductionCompletionReport.tsx, use-production-orders.ts, index.ts]
- "hooks_use_production_orders_useproductionorders": "useProductionOrders()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L50 | neighbors=[production-order-table.tsx, use-production-orders.ts, index.ts]
- "hooks_use_thread_dyeing_useproviders": "useProviders()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L12 | neighbors=[SendDyeingDialog.tsx, use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "hooks_use_thread_usethreadpurchases": "useThreadPurchases()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L39 | neighbors=[ThreadPurchasePanel.tsx, use-thread.ts, index.ts]
- "hooks_use_thread_usethreadstocks": "useThreadStocks()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L15 | neighbors=[DyeThreadDialog.tsx, use-thread.ts, index.ts]
- "hooks_use_thread_usethreadstocksummary": "useThreadStockSummary()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L23 | neighbors=[ThreadStockPanel.tsx, use-thread.ts, index.ts]
- "hooks_use_work_orders_useworkorders": "useWorkOrders()" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L12 | neighbors=[work-order-table.tsx, use-work-orders.ts, index.ts]
- "hooks_use_woven_production_usewovenoverview": "useWovenOverview()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L16 | neighbors=[WovenProductionPanel.tsx, use-woven-production.ts, index.ts]
- "ink_types_inkconsumptioninput": "InkConsumptionInput" | kind=code-symbol | source=src/features/ink/types.ts:L46 | neighbors=[use-ink.ts, types.ts, ink-service.ts]
- "ink_types_inkpurchaseinput": "InkPurchaseInput" | kind=code-symbol | source=src/features/ink/types.ts:L15 | neighbors=[use-ink.ts, types.ts, ink-service.ts]
- "layout_index": "index.ts" | kind=code-symbol | source=src/components/layout/index.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, index.ts, PageHeader.tsx]
- "layouts_applayout_applayout": "AppLayout()" | kind=code-symbol | source=src/shared/layouts/AppLayout.tsx:L27 | neighbors=[AppRoutes.tsx, AppLayout.tsx, getInitialSidebarOpen()]
- "lib_api_apierror": "ApiError" | kind=code-symbol | source=src/lib/api.ts:L3 | neighbors=[api.ts, .constructor(), request()]
- "lib_celebrate_fireconfetti": "fireConfetti()" | kind=code-symbol | source=src/lib/celebrate.ts:L10 | neighbors=[celebrate.ts, celebrateCompletion(), prefersReducedMotion()]
- "lib_celebrate_playsuccesschime": "playSuccessChime()" | kind=code-symbol | source=src/lib/celebrate.ts:L44 | neighbors=[celebrate.ts, celebrateCompletion(), prefersReducedMotion()]
- "lib_celebrate_prefersreducedmotion": "prefersReducedMotion()" | kind=code-symbol | source=src/lib/celebrate.ts:L3 | neighbors=[celebrate.ts, fireConfetti(), playSuccessChime()]
- "lib_format_calculaterequiredrolls": "calculateRequiredRolls()" | kind=code-symbol | source=src/lib/format.ts:L51 | neighbors=[PlanLabelTypeForm.tsx, format.ts, format.test.ts]
- "lib_format_calculatetotalrolls": "calculateTotalRolls()" | kind=code-symbol | source=src/lib/format.ts:L64 | neighbors=[PlanLabelTypeForm.tsx, format.ts, format.test.ts]
- "lib_query_client": "query-client.ts" | kind=code-symbol | source=src/lib/query-client.ts:L1 | neighbors=[ee6dbbe feat: production order completi…, queryClient, QueryProvider.tsx]
- "machines_operators_types_operator_types": "OPERATOR_TYPES" | kind=code-symbol | source=src/features/machines-operators/types.ts:L35 | neighbors=[operator-table.tsx, OperatorDialog.tsx, types.ts]
- "materials_receipts_types_materialreceipt": "MaterialReceipt" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L4 | neighbors=[MaterialReceiptPage.tsx, receipts-types.ts, material-receipts-service.ts]
- "materials_receipts_types_receiptkind": "ReceiptKind" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L1 | neighbors=[use-material-receipts.ts, receipts-types.ts, material-receipts-service.ts]
- "materials_types_materialinput": "MaterialInput" | kind=code-symbol | source=src/features/materials/types.ts:L14 | neighbors=[use-materials.ts, types.ts, material-service.ts]
- "production_orders_batch_types_batchsourceoption": "BatchSourceOption" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L86 | neighbors=[batch-types.ts, batch-edit.ts, batch-edit.test.ts]
- "production_orders_batch_types_createconsumingbatchinput": "CreateConsumingBatchInput" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L227 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_createprintingbatchinput": "CreatePrintingBatchInput" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L218 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_orderflow": "OrderFlow" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L182 | neighbors=[batch-types.ts, index.ts, batch-service.ts]
- "production_orders_batch_types_recordoutputinput": "RecordOutputInput" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L244 | neighbors=[use-batches.ts, batch-types.ts, batch-service.ts]
- "production_orders_batch_types_sizeassignment": "SizeAssignment" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L110 | neighbors=[CreateBatchDialog.tsx, batch-types.ts, batch-edit.ts]
- "production_orders_batch_types_stageinputlabel": "stageInputLabel()" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L261 | neighbors=[CreateBatchDialog.tsx, EditBatchDialog.tsx, batch-types.ts]
- "production_orders_batch_types_stageoperator": "StageOperator" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L131 | neighbors=[CreateBatchDialog.tsx, batch-types.ts, StageResource]
- "production_orders_batch_types_stageresource": "StageResource" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L119 | neighbors=[batch-types.ts, StageMachine, StageOperator]
- "production_orders_batch_types_upstream_stage": "UPSTREAM_STAGE" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L269 | neighbors=[CreateBatchDialog.tsx, EditBatchDialog.tsx, batch-types.ts]
- "production_orders_types_assignresourcesinput": "AssignResourcesInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L393 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_createproductionorderinput": "CreateProductionOrderInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L331 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_issuerollsinput": "IssueRollsInput" | kind=code-symbol | source=src/features/production-orders/types.ts:L386 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_lineplanning": "LinePlanning" | kind=code-symbol | source=src/features/production-orders/types.ts:L110 | neighbors=[types.ts, line-draft.ts, line-draft.test.ts]
- "production_orders_types_productionorderdetail": "ProductionOrderDetail" | kind=code-symbol | source=src/features/production-orders/types.ts:L104 | neighbors=[types.ts, ProductionOrder, production-order-service.ts]
- "production_orders_types_productionorderstatus": "ProductionOrderStatus" | kind=code-symbol | source=src/features/production-orders/types.ts:L1 | neighbors=[ProductionStatusBadge.tsx, use-completion-celebration.ts, types.ts]
- "production_orders_types_productionstage": "ProductionStage" | kind=code-symbol | source=src/features/production-orders/types.ts:L8 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-013.json

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
