# Node Description Batch 20 of 38

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

- "hooks_use_ink_useinkpurchases": "useInkPurchases()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L14 | neighbors=[use-ink.ts, InkPurchasesPage.tsx]
- "hooks_use_ink_useupdateinkpurchase": "useUpdateInkPurchase()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L40 | neighbors=[InkPurchaseDialog.tsx, use-ink.ts]
- "hooks_use_inventory_usecreaterollstock": "useCreateRollStock()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L35 | neighbors=[RollStockDialog.tsx, use-inventory.ts]
- "hooks_use_inventory_usedeleterollstock": "useDeleteRollStock()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L60 | neighbors=[roll-stock-row-actions.tsx, use-inventory.ts]
- "hooks_use_inventory_userollmovements": "useRollMovements()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L27 | neighbors=[roll-stock-row-actions.tsx, use-inventory.ts]
- "hooks_use_inventory_useupdateinventoryroll": "useUpdateInventoryRoll()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L72 | neighbors=[use-inventory.ts, index.ts]
- "hooks_use_inventory_useupdaterollstock": "useUpdateRollStock()" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L47 | neighbors=[RollStockDialog.tsx, use-inventory.ts]
- "hooks_use_label_types_label_type_keys": "LABEL_TYPE_KEYS" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L6 | neighbors=[use-label-types.ts, index.ts]
- "hooks_use_label_types_usedeletelabeltype": "useDeleteLabelType()" | kind=code-symbol | source=src/features/label-types/hooks/use-label-types.ts:L57 | neighbors=[use-label-types.ts, index.ts]
- "hooks_use_material_receipts_usecreatereceipt": "useCreateReceipt()" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L18 | neighbors=[MaterialReceiptPage.tsx, use-material-receipts.ts]
- "hooks_use_material_receipts_usedeletereceipt": "useDeleteReceipt()" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L43 | neighbors=[MaterialReceiptPage.tsx, use-material-receipts.ts]
- "hooks_use_material_receipts_usereceipts": "useReceipts()" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L10 | neighbors=[MaterialReceiptPage.tsx, use-material-receipts.ts]
- "hooks_use_material_receipts_useupdatereceipt": "useUpdateReceipt()" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L30 | neighbors=[MaterialReceiptPage.tsx, use-material-receipts.ts]
- "hooks_use_materials_usecreatematerial": "useCreateMaterial()" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L19 | neighbors=[MaterialForm.tsx, use-materials.ts]
- "hooks_use_materials_usedeletematerial": "useDeleteMaterial()" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L44 | neighbors=[material-row-actions.tsx, use-materials.ts]
- "hooks_use_materials_useupdatematerial": "useUpdateMaterial()" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L31 | neighbors=[MaterialForm.tsx, use-materials.ts]
- "hooks_use_mobile_useismobile": "useIsMobile()" | kind=code-symbol | source=src/hooks/use-mobile.ts:L5 | neighbors=[use-mobile.ts, sidebar.tsx]
- "hooks_use_production_orders_useassignlineresources": "useAssignLineResources()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L220 | neighbors=[use-production-orders.ts, useLineMutation()]
- "hooks_use_production_orders_useavailableresources": "useAvailableResources()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L37 | neighbors=[EditableLabelTypeTable.tsx, use-production-orders.ts]
- "hooks_use_production_orders_usecompleteproductionorder": "useCompleteProductionOrder()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L327 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_production_orders_usecreateproductionorder": "useCreateProductionOrder()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L104 | neighbors=[CreateProductionOrderDialog.tsx, use-production-orders.ts]
- "hooks_use_production_orders_usedeleteline": "useDeleteLine()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L186 | neighbors=[planned-line-row-actions.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useeligiblesalesorders": "useEligibleSalesOrders()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L86 | neighbors=[CreateProductionOrderDialog.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useplanline": "usePlanLine()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L159 | neighbors=[PlanLabelTypeDialog.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useproductionorderdetail": "useProductionOrderDetail()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L58 | neighbors=[use-production-orders.ts, index.ts]
- "hooks_use_production_orders_usereconcileline": "useReconcileLine()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L309 | neighbors=[StockReconciliationCard.tsx, use-production-orders.ts]
- "hooks_use_production_orders_usetransferrolls": "useTransferRolls()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L275 | neighbors=[use-production-orders.ts, useLineMutation()]
- "hooks_use_production_orders_useupdatelinefull": "useUpdateLineFull()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L241 | neighbors=[EditableLabelTypeTable.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useupdatelineplan": "useUpdateLinePlan()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L172 | neighbors=[PlanLabelTypeDialog.tsx, use-production-orders.ts]
- "hooks_use_production_orders_useupdateproductionorder": "useUpdateProductionOrder()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L116 | neighbors=[use-production-orders.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_production_orders_useupdatestageprogress": "useUpdateStageProgress()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L228 | neighbors=[use-production-orders.ts, useLineMutation()]
- "hooks_use_production_runs_uselogproductionrun": "useLogProductionRun()" | kind=code-symbol | source=src/features/production-runs/hooks/use-production-runs.ts:L19 | neighbors=[LogProductionRunDialog.tsx, use-production-runs.ts]
- "hooks_use_production_runs_useproductionsummary": "useProductionSummary()" | kind=code-symbol | source=src/features/production-runs/hooks/use-production-runs.ts:L10 | neighbors=[ProductionRunsSection.tsx, use-production-runs.ts]
- "hooks_use_purchases_usecreatepurchase": "useCreatePurchase()" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L19 | neighbors=[PurchaseForm.tsx, use-purchases.ts]
- "hooks_use_purchases_usedeletepurchase": "useDeletePurchase()" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L48 | neighbors=[purchase-row-actions.tsx, use-purchases.ts]
- "hooks_use_purchases_usepurchases": "usePurchases()" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L11 | neighbors=[purchase-table.tsx, use-purchases.ts]
- "hooks_use_purchases_useupdatepurchase": "useUpdatePurchase()" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L33 | neighbors=[PurchaseForm.tsx, use-purchases.ts]
- "hooks_use_theme_usetheme": "useTheme()" | kind=code-symbol | source=src/shared/hooks/use-theme.ts:L3 | neighbors=[use-theme.ts, ThemeToggle.tsx]
- "hooks_use_thread_dyeing_usecreateprovider": "useCreateProvider()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L20 | neighbors=[ServiceProviderDialog.tsx, use-thread-dyeing.ts]
- "hooks_use_thread_dyeing_usedeleteprovider": "useDeleteProvider()" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L45 | neighbors=[use-thread-dyeing.ts, ThreadDyeingPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-019.json

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
