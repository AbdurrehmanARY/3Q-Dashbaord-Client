# Node Description Batch 33 of 74

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

- "feedback_imagepreview_imagepreview": "ImagePreview()" | kind=code-symbol | source=client/src/components/feedback/ImagePreview.tsx:L23 | neighbors=[ImagePreview.tsx, ImageUploadField.tsx]
- "feedback_operatoravatar_initialsof": "initialsOf()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L5 | neighbors=[OperatorAvatar.tsx, OperatorAvatar()]
- "feedback_operatoravatar_operatoravatarname": "OperatorAvatarName()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L41 | neighbors=[operator-columns.tsx, OperatorAvatar.tsx]
- "feedback_statusbadge_statusbadgevariants": "statusBadgeVariants" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L5 | neighbors=[StatusBadge.tsx, StatusBadge()]
- "feedback_statusbadge_statusvariant": "StatusVariant" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L50 | neighbors=[ProductionStatusBadge.tsx, StatusBadge.tsx]
- "header_appheader_appheader": "AppHeader()" | kind=code-symbol | source=client/src/shared/components/header/AppHeader.tsx:L16 | neighbors=[AppHeader.tsx, AppLayout.tsx]
- "health_health_routes": "health.routes.ts" | kind=code-symbol | source=server/src/modules/health/health.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router]
- "healthcheck_materials_health_materialshealthresult": "MaterialsHealthResult" | kind=code-symbol | source=client/src/lib/healthcheck/materials-health.ts:L12 | neighbors=[materials-health.ts, HealthprobeResult]
- "healthcheck_production_health_productionhealthresult": "ProductionHealthResult" | kind=code-symbol | source=client/src/lib/healthcheck/production-health.ts:L12 | neighbors=[production-health.ts, HealthprobeResult]
- "hooks_use_batches_usebatchtrace": "useBatchTrace()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L96 | neighbors=[BatchTraceDialog.tsx, use-batches.ts]
- "hooks_use_batches_useupdatebatch": "useUpdateBatch()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L134 | neighbors=[use-batches.ts, useBatchMutation()]
- "hooks_use_companies_usecreatebrand": "useCreateBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L64 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_usecreatecompany": "useCreateCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L27 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_companies_usedeletebrand": "useDeleteBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L89 | neighbors=[brand-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_usedeletecompany": "useDeleteCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L52 | neighbors=[company-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_useupdatebrand": "useUpdateBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L76 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_useupdatecompany": "useUpdateCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L39 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_completion_celebration_usecompletioncelebration": "useCompletionCelebration()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-completion-celebration.ts:L11 | neighbors=[use-completion-celebration.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_dashboard_trends_useworkordertrend": "useWorkOrderTrend()" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard-trends.ts:L14 | neighbors=[use-dashboard-trends.ts, DashboardPage.tsx]
- "hooks_use_dashboard_usedashboardkpis": "useDashboardKpis()" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L8 | neighbors=[use-dashboard.ts, DashboardPage.tsx]
- "hooks_use_entities_usecreatemachine": "useCreateMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L30 | neighbors=[MachineDialog.tsx, use-entities.ts]
- "hooks_use_entities_usecreateoperator": "useCreateOperator()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L57 | neighbors=[OperatorDialog.tsx, use-entities.ts]
- "hooks_use_entities_usedeletemachine": "useDeleteMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L48 | neighbors=[machine-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_usedeleteoperator": "useDeleteOperator()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L75 | neighbors=[operator-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_useupdatemachine": "useUpdateMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L39 | neighbors=[MachineDialog.tsx, use-entities.ts]
- "hooks_use_entities_useupdateoperator": "useUpdateOperator()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L66 | neighbors=[OperatorDialog.tsx, use-entities.ts]
- "hooks_use_ink_usecreateinkconsumption": "useCreateInkConsumption()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L89 | neighbors=[InkConsumptionDialog.tsx, use-ink.ts]
- "hooks_use_ink_usecreateinkpurchase": "useCreateInkPurchase()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L28 | neighbors=[InkPurchaseDialog.tsx, use-ink.ts]
- "hooks_use_ink_usedeleteinkconsumption": "useDeleteInkConsumption()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L101 | neighbors=[use-ink.ts, InkConsumptionPage.tsx]
- "hooks_use_ink_usedeleteinkpurchase": "useDeleteInkPurchase()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L53 | neighbors=[use-ink.ts, InkPurchasesPage.tsx]
- "hooks_use_ink_useinkconsumptionbyoperator": "useInkConsumptionByOperator()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L74 | neighbors=[InkOperatorBreakdown.tsx, use-ink.ts]
- "hooks_use_ink_useinkconsumptions": "useInkConsumptions()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L66 | neighbors=[use-ink.ts, InkConsumptionPage.tsx]
- "hooks_use_ink_useinkpurchases": "useInkPurchases()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L14 | neighbors=[use-ink.ts, InkPurchasesPage.tsx]
- "hooks_use_ink_useupdateinkpurchase": "useUpdateInkPurchase()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L40 | neighbors=[InkPurchaseDialog.tsx, use-ink.ts]
- "hooks_use_inventory_usecreaterollstock": "useCreateRollStock()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L35 | neighbors=[RollStockDialog.tsx, use-inventory.ts]
- "hooks_use_inventory_usedeleterollstock": "useDeleteRollStock()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L60 | neighbors=[roll-stock-row-actions.tsx, use-inventory.ts]
- "hooks_use_inventory_userollmovements": "useRollMovements()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L27 | neighbors=[roll-stock-row-actions.tsx, use-inventory.ts]
- "hooks_use_inventory_useupdateinventoryroll": "useUpdateInventoryRoll()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L72 | neighbors=[use-inventory.ts, index.ts]
- "hooks_use_inventory_useupdaterollstock": "useUpdateRollStock()" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L47 | neighbors=[RollStockDialog.tsx, use-inventory.ts]
- "hooks_use_material_receipts_usecreatereceipt": "useCreateReceipt()" | kind=code-symbol | source=client/src/features/materials/hooks/use-material-receipts.ts:L18 | neighbors=[MaterialReceiptPage.tsx, use-material-receipts.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-032.json

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
