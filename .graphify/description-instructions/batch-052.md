# Node Description Batch 53 of 74

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

- "forms_imageuploadfield_readasdataurl": "readAsDataUrl()" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L23 | neighbors=[ImageUploadField.tsx]
- "health_health_routes_router": "router" | kind=code-symbol | source=server/src/modules/health/health.routes.ts:L3 | neighbors=[health.routes.ts]
- "healthcheck_client_healthcheck_clienthealthcheck": "ClientHealthcheck()" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L35 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthcheckprops": "HealthcheckProps" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L20 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthchip": "HealthChip()" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L136 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthdetailcard": "HealthDetailCard()" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L163 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_initial": "initial" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L27 | neighbors=[client_healthcheck.tsx]
- "healthcheck_health_check_shell_healthcheckshell": "HealthCheckShell()" | kind=code-symbol | source=client/src/lib/healthcheck/health-check-shell.tsx:L26 | neighbors=[health-check-shell.tsx]
- "healthcheck_health_check_shell_healthcheckshellprops": "HealthCheckShellProps" | kind=code-symbol | source=client/src/lib/healthcheck/health-check-shell.tsx:L13 | neighbors=[health-check-shell.tsx]
- "healthcheck_materials_health_healthproberesult": "HealthprobeResult" | kind=code-symbol | neighbors=[MaterialsHealthResult]
- "healthcheck_materials_health_probematerialshealth": "probeMaterialsHealth()" | kind=code-symbol | source=client/src/lib/healthcheck/materials-health.ts:L19 | neighbors=[materials-health.ts]
- "healthcheck_production_health_healthproberesult": "HealthprobeResult" | kind=code-symbol | neighbors=[ProductionHealthResult]
- "healthcheck_production_health_probeproductionhealth": "probeProductionHealth()" | kind=code-symbol | source=client/src/lib/healthcheck/production-health.ts:L19 | neighbors=[production-health.ts]
- "hooks_use_batches_batch_keys": "BATCH_KEYS" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L12 | neighbors=[use-batches.ts]
- "hooks_use_companies_company_keys": "COMPANY_KEYS" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L5 | neighbors=[use-companies.ts]
- "hooks_use_dashboard_dashboard_keys": "DASHBOARD_KEYS" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L4 | neighbors=[use-dashboard.ts]
- "hooks_use_entities_machine_keys": "MACHINE_KEYS" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L5 | neighbors=[use-entities.ts]
- "hooks_use_entities_operator_keys": "OPERATOR_KEYS" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L9 | neighbors=[use-entities.ts]
- "hooks_use_ink_ink_keys": "INK_KEYS" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L6 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidateconsumptionside": "invalidateConsumptionSide()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L83 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidatepurchaseside": "invalidatePurchaseSide()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L23 | neighbors=[use-ink.ts]
- "hooks_use_inventory_inventory_keys": "INVENTORY_KEYS" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L6 | neighbors=[use-inventory.ts]
- "hooks_use_material_receipts_receipt_keys": "RECEIPT_KEYS" | kind=code-symbol | source=client/src/features/materials/hooks/use-material-receipts.ts:L6 | neighbors=[use-material-receipts.ts]
- "hooks_use_materials_material_keys": "MATERIAL_KEYS" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L6 | neighbors=[use-materials.ts]
- "hooks_use_production_orders_invalidateplanning": "invalidatePlanning()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L138 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_production_order_keys": "PRODUCTION_ORDER_KEYS" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L18 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useissuerolls": "useIssueRolls()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L281 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_uselineissuances": "useLineIssuances()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L271 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useproductionorderevents": "useProductionOrderEvents()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L83 | neighbors=[use-production-orders.ts]
- "hooks_use_production_runs_production_run_keys": "PRODUCTION_RUN_KEYS" | kind=code-symbol | source=client/src/features/production-runs/hooks/use-production-runs.ts:L6 | neighbors=[use-production-runs.ts]
- "hooks_use_purchases_purchase_keys": "PURCHASE_KEYS" | kind=code-symbol | source=client/src/features/purchases/hooks/use-purchases.ts:L6 | neighbors=[use-purchases.ts]
- "hooks_use_thread_dyeing_dyeing_keys": "DYEING_KEYS" | kind=code-symbol | source=client/src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L6 | neighbors=[use-thread-dyeing.ts]
- "hooks_use_thread_thread_keys": "THREAD_KEYS" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L6 | neighbors=[use-thread.ts]
- "hooks_use_thread_usethreadmovements": "useThreadMovements()" | kind=code-symbol | source=client/src/features/thread/hooks/use-thread.ts:L31 | neighbors=[use-thread.ts]
- "hooks_use_work_orders_work_order_keys": "WORK_ORDER_KEYS" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L6 | neighbors=[use-work-orders.ts]
- "hooks_use_woven_production_invalidatewoven": "invalidateWoven()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L29 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdateweaving": "useUpdateWeaving()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L63 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdatewovencutting": "useUpdateWovenCutting()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L76 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_useupdatewovenpackaging": "useUpdateWovenPackaging()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L89 | neighbors=[use-woven-production.ts]
- "hooks_use_woven_production_woven_keys": "WOVEN_KEYS" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L11 | neighbors=[use-woven-production.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-052.json

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
