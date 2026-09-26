# Node Description Batch 17 of 53

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

- "formulas_production_formula_calculaterequiredrolls": "calculateRequiredRolls()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L20 | neighbors=[seed.ts, production-formula.ts, production-formula.test.ts]
- "formulas_production_formula_calculatetotalrolls": "calculateTotalRolls()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L36 | neighbors=[seed.ts, production-formula.ts, production-formula.test.ts]
- "hooks_use_companies_usecompanybrands": "useCompanyBrands()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L18 | neighbors=[index.ts, BrandTable.tsx, use-companies.ts]
- "hooks_use_ink_useinkstock": "useInkStock()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L18 | neighbors=[InkConsumptionDialog.tsx, InkStockPanel.tsx, use-ink.ts]
- "hooks_use_inventory_useinventorystock": "useInventoryStock()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L11 | neighbors=[inventory-stock-table.tsx, use-inventory.ts, index.ts]
- "hooks_use_mobile": "use-mobile.ts" | kind=code-symbol | source=client/src/hooks/use-mobile.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, useIsMobile(), sidebar.tsx]
- "hooks_use_production_orders_useavailableresources": "useAvailableResources()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L35 | neighbors=[EditableLabelTypeTable.tsx, PlanLabelTypeForm.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useproductionorders": "useProductionOrders()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L48 | neighbors=[production-order-table.tsx, use-production-orders.ts, index.ts]
- "hooks_use_thread_dyeing_useproviders": "useProviders()" | kind=code-symbol | source=client/src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L12 | neighbors=[SendDyeingDialog.tsx, use-thread-dyeing.ts, ThreadDyeingPage.tsx]
- "hooks_use_thread_usethreadpurchases": "useThreadPurchases()" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L39 | neighbors=[ThreadPurchasePanel.tsx, use-thread.ts, index.ts]
- "hooks_use_thread_usethreadstocks": "useThreadStocks()" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L15 | neighbors=[DyeThreadDialog.tsx, use-thread.ts, index.ts]
- "hooks_use_thread_usethreadstocksummary": "useThreadStockSummary()" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L23 | neighbors=[ThreadStockPanel.tsx, use-thread.ts, index.ts]
- "hooks_use_work_orders_useworkorders": "useWorkOrders()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L12 | neighbors=[work-order-table.tsx, use-work-orders.ts, index.ts]
- "hooks_use_woven_production_useplanwovenline": "usePlanWovenLine()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L36 | neighbors=[PlanLabelTypeDialog.tsx, WovenProductionPanel.tsx, use-woven-production.ts]
- "hooks_use_woven_production_usewovenoverview": "useWovenOverview()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L16 | neighbors=[WovenProductionPanel.tsx, use-woven-production.ts, index.ts]
- "ink_types_inkconsumptioninput": "InkConsumptionInput" | kind=code-symbol | source=client/src/features/ink/types.ts:L46 | neighbors=[use-ink.ts, types.ts, ink-service.ts]
- "ink_types_inkpurchaseinput": "InkPurchaseInput" | kind=code-symbol | source=client/src/features/ink/types.ts:L15 | neighbors=[use-ink.ts, types.ts, ink-service.ts]
- "inventory_inventory_roll_service_assertnonnegative": "assertNonNegative()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L32 | neighbors=[inventory-roll.service.ts, .createInventoryRoll(), .updateInventoryRoll()]
- "inventory_inventory_roll_service_inventoryrollservice_createinventoryroll": ".createInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L66 | neighbors=[InventoryRollService, assertNonNegative(), withPerSkuBalance()]
- "inventory_inventory_roll_service_inventoryrollservice_updateinventoryroll": ".updateInventoryRoll()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L120 | neighbors=[InventoryRollService, assertNonNegative(), withPerSkuBalance()]
- "inventory_inventory_service_calculatederivedfields": "calculateDerivedFields()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L23 | neighbors=[inventory.service.ts, .createPurchase(), .updatePurchase()]
- "layout_index": "index.ts" | kind=code-symbol | source=client/src/components/layout/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, PageHeader.tsx]
- "layouts_applayout_applayout": "AppLayout()" | kind=code-symbol | source=client/src/shared/layouts/AppLayout.tsx:L27 | neighbors=[AppRoutes.tsx, AppLayout.tsx, getInitialSidebarOpen()]
- "lib_api_apierror": "ApiError" | kind=code-symbol | source=client/src/lib/api.ts:L3 | neighbors=[api.ts, .constructor(), request()]
- "lib_celebrate_fireconfetti": "fireConfetti()" | kind=code-symbol | source=client/src/lib/celebrate.ts:L10 | neighbors=[celebrate.ts, celebrateCompletion(), prefersReducedMotion()]
- "lib_celebrate_playsuccesschime": "playSuccessChime()" | kind=code-symbol | source=client/src/lib/celebrate.ts:L44 | neighbors=[celebrate.ts, celebrateCompletion(), prefersReducedMotion()]
- "lib_celebrate_prefersreducedmotion": "prefersReducedMotion()" | kind=code-symbol | source=client/src/lib/celebrate.ts:L3 | neighbors=[celebrate.ts, fireConfetti(), playSuccessChime()]
- "lib_format_calculaterequiredrolls": "calculateRequiredRolls()" | kind=code-symbol | source=client/src/lib/format.ts:L51 | neighbors=[PlanLabelTypeForm.tsx, format.ts, format.test.ts]
- "lib_format_calculatetotalrolls": "calculateTotalRolls()" | kind=code-symbol | source=client/src/lib/format.ts:L64 | neighbors=[PlanLabelTypeForm.tsx, format.ts, format.test.ts]
- "lib_query_client": "query-client.ts" | kind=code-symbol | source=client/src/lib/query-client.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, queryClient, QueryProvider.tsx]
- "machines_operators_types_operator_types": "OPERATOR_TYPES" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L35 | neighbors=[operator-table.tsx, OperatorDialog.tsx, types.ts]
- "materials_receipts_types_materialreceipt": "MaterialReceipt" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L4 | neighbors=[MaterialReceiptPage.tsx, receipts-types.ts, material-receipts-service.ts]
- "materials_receipts_types_receiptkind": "ReceiptKind" | kind=code-symbol | source=client/src/features/materials/receipts-types.ts:L1 | neighbors=[use-material-receipts.ts, receipts-types.ts, material-receipts-service.ts]
- "materials_types_materialinput": "MaterialInput" | kind=code-symbol | source=client/src/features/materials/types.ts:L14 | neighbors=[use-materials.ts, types.ts, material-service.ts]
- "middleware_ratelimiter_apiratelimiter": "apiRateLimiter" | kind=code-symbol | source=server/src/shared/middleware/rateLimiter.ts:L8 | neighbors=[index.ts, rateLimiter.ts, app.ts]
- "operators_operator_service_normaliseavatar": "normaliseAvatar()" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L8 | neighbors=[operator.service.ts, .createOperator(), .updateOperator()]
- "production_orders_types_assignresourcesinput": "AssignResourcesInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L393 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_createproductionorderinput": "CreateProductionOrderInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L331 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_issuerollsinput": "IssueRollsInput" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L386 | neighbors=[use-production-orders.ts, types.ts, production-order-service.ts]
- "production_orders_types_lineplanning": "LinePlanning" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L110 | neighbors=[types.ts, line-draft.ts, line-draft.test.ts]

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
