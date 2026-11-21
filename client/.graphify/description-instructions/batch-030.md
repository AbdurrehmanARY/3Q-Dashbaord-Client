# Node Description Batch 31 of 38

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

- "hooks_use_companies_company_keys": "COMPANY_KEYS" | kind=code-symbol | source=src/features/companies/hooks/use-companies.ts:L5 | neighbors=[use-companies.ts]
- "hooks_use_dashboard_dashboard_keys": "DASHBOARD_KEYS" | kind=code-symbol | source=src/features/dashboard/hooks/use-dashboard.ts:L4 | neighbors=[use-dashboard.ts]
- "hooks_use_entities_machine_keys": "MACHINE_KEYS" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L5 | neighbors=[use-entities.ts]
- "hooks_use_entities_operator_keys": "OPERATOR_KEYS" | kind=code-symbol | source=src/features/machines-operators/hooks/use-entities.ts:L9 | neighbors=[use-entities.ts]
- "hooks_use_ink_ink_keys": "INK_KEYS" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L6 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidateconsumptionside": "invalidateConsumptionSide()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L83 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidatepurchaseside": "invalidatePurchaseSide()" | kind=code-symbol | source=src/features/ink/hooks/use-ink.ts:L23 | neighbors=[use-ink.ts]
- "hooks_use_inventory_inventory_keys": "INVENTORY_KEYS" | kind=code-symbol | source=src/features/inventory/hooks/use-inventory.ts:L6 | neighbors=[use-inventory.ts]
- "hooks_use_label_types_productionorderlabeltypekeys": "productionOrderLabelTypeKeys" | kind=code-symbol | source=src/features/production-orders/hooks/use-label-types.ts:L5 | neighbors=[use-label-types.ts]
- "hooks_use_label_types_uselabeltypesforplanning": "useLabelTypesForPlanning()" | kind=code-symbol | source=src/features/production-orders/hooks/use-label-types.ts:L10 | neighbors=[use-label-types.ts]
- "hooks_use_material_receipts_receipt_keys": "RECEIPT_KEYS" | kind=code-symbol | source=src/features/materials/hooks/use-material-receipts.ts:L6 | neighbors=[use-material-receipts.ts]
- "hooks_use_materials_material_keys": "MATERIAL_KEYS" | kind=code-symbol | source=src/features/materials/hooks/use-materials.ts:L6 | neighbors=[use-materials.ts]
- "hooks_use_production_orders_invalidateplanning": "invalidatePlanning()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L150 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_production_order_keys": "PRODUCTION_ORDER_KEYS" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L19 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useissuerolls": "useIssueRolls()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L293 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_uselineissuances": "useLineIssuances()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L283 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useproductionorderevents": "useProductionOrderEvents()" | kind=code-symbol | source=src/features/production-orders/hooks/use-production-orders.ts:L95 | neighbors=[use-production-orders.ts]
- "hooks_use_production_runs_production_run_keys": "PRODUCTION_RUN_KEYS" | kind=code-symbol | source=src/features/production-runs/hooks/use-production-runs.ts:L6 | neighbors=[use-production-runs.ts]
- "hooks_use_purchases_purchase_keys": "PURCHASE_KEYS" | kind=code-symbol | source=src/features/purchases/hooks/use-purchases.ts:L6 | neighbors=[use-purchases.ts]
- "hooks_use_thread_dyeing_dyeing_keys": "DYEING_KEYS" | kind=code-symbol | source=src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L6 | neighbors=[use-thread-dyeing.ts]
- "hooks_use_thread_thread_keys": "THREAD_KEYS" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L6 | neighbors=[use-thread.ts]
- "hooks_use_thread_usethreadmovements": "useThreadMovements()" | kind=code-symbol | source=src/features/thread/hooks/use-thread.ts:L31 | neighbors=[use-thread.ts]
- "hooks_use_work_orders_work_order_keys": "WORK_ORDER_KEYS" | kind=code-symbol | source=src/features/work-orders/hooks/use-work-orders.ts:L6 | neighbors=[use-work-orders.ts]
- "hooks_use_woven_production_invalidatewoven": "invalidateWoven()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L29 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdateweaving": "useUpdateWeaving()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L63 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdatewovencutting": "useUpdateWovenCutting()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L76 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdatewovenpackaging": "useUpdateWovenPackaging()" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L89 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_woven_keys": "WOVEN_KEYS" | kind=code-symbol | source=src/features/production-orders/hooks/use-woven-production.ts:L11 | neighbors=[use-woven-production.ts]
- "layout_pagecontainer_pagecontainerprops": "PageContainerProps" | kind=code-symbol | source=src/components/layout/PageContainer.tsx:L16 | neighbors=[PageContainer.tsx]
- "layout_pagecontainer_sizes": "SIZES" | kind=code-symbol | source=src/components/layout/PageContainer.tsx:L9 | neighbors=[PageContainer.tsx]
- "layout_pageheader_pageheaderprops": "PageHeaderProps" | kind=code-symbol | source=src/components/layout/PageHeader.tsx:L4 | neighbors=[PageHeader.tsx]
- "lib_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=src/lib/api.ts:L5 | neighbors=[ApiError]
- "lib_api_axiosinstance": "axiosInstance" | kind=code-symbol | source=src/lib/api.ts:L16 | neighbors=[api.ts]
- "lib_api_paginated": "Paginated" | kind=code-symbol | source=src/lib/api.ts:L60 | neighbors=[api.ts]
- "lib_format_exporttocsv": "exportToCsv()" | kind=code-symbol | source=src/lib/format.ts:L94 | neighbors=[format.ts]
- "materials_receipts_types_receiptfield": "ReceiptField" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L15 | neighbors=[receipts-types.ts]
- "materials_receipts_types_receiptfieldtype": "ReceiptFieldType" | kind=code-symbol | source=src/features/materials/receipts-types.ts:L13 | neighbors=[receipts-types.ts]
- "pages_companybrandpage_companybrandpage": "CompanyBrandPage()" | kind=code-symbol | source=src/features/companies/pages/CompanyBrandPage.tsx:L7 | neighbors=[CompanyBrandPage.tsx]
- "pages_dashboardpage_dashboardpage": "DashboardPage()" | kind=code-symbol | source=src/features/dashboard/pages/DashboardPage.tsx:L24 | neighbors=[DashboardPage.tsx]
- "pages_dyedthreadstockpage_dyedthreadstockpage": "DyedThreadStockPage()" | kind=code-symbol | source=src/features/inventory/pages/DyedThreadStockPage.tsx:L7 | neighbors=[DyedThreadStockPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-030.json

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
