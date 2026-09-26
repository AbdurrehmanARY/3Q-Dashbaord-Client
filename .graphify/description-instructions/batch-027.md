# Node Description Batch 28 of 53

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

- "schemas_production_order_schemas_planlineschema": "planLineSchema" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L26 | neighbors=[PlanLabelTypeForm.tsx, production-order-schemas.ts]
- "schemas_production_order_schemas_planlineschemainput": "PlanLineSchemaInput" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L45 | neighbors=[PlanLabelTypeForm.tsx, production-order-schemas.ts]
- "schemas_purchase_schemas_purchaseschema": "purchaseSchema" | kind=code-symbol | source=client/src/features/purchases/schemas/purchase-schemas.ts:L7 | neighbors=[PurchaseForm.tsx, purchase-schemas.ts]
- "schemas_purchase_schemas_purchaseschemainput": "PurchaseSchemaInput" | kind=code-symbol | source=client/src/features/purchases/schemas/purchase-schemas.ts:L22 | neighbors=[PurchaseForm.tsx, purchase-schemas.ts]
- "schemas_thread_schemas_dyebatchschema": "dyeBatchSchema" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L19 | neighbors=[DyeThreadDialog.tsx, thread-schemas.ts]
- "schemas_thread_schemas_dyebatchschemainput": "DyeBatchSchemaInput" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L36 | neighbors=[DyeThreadDialog.tsx, thread-schemas.ts]
- "schemas_thread_schemas_threadpurchaseschema": "threadPurchaseSchema" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L8 | neighbors=[ThreadPurchasePanel.tsx, thread-schemas.ts]
- "schemas_thread_schemas_threadpurchaseschemainput": "ThreadPurchaseSchemaInput" | kind=code-symbol | source=client/src/features/thread/schemas/thread-schemas.ts:L35 | neighbors=[ThreadPurchasePanel.tsx, thread-schemas.ts]
- "schemas_work_order_schemas_dispatchschema": "dispatchSchema" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L84 | neighbors=[DispatchDialog.tsx, work-order-schemas.ts]
- "schemas_work_order_schemas_dispatchschemainput": "DispatchSchemaInput" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L101 | neighbors=[DispatchDialog.tsx, work-order-schemas.ts]
- "schemas_work_order_schemas_workorderformschema": "workOrderFormSchema" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L63 | neighbors=[WorkOrderDialog.tsx, work-order-schemas.ts]
- "segmented_tabs_segmentedtabs_segmentedoption": "SegmentedOption" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/SegmentedTabs.tsx:L3 | neighbors=[index.ts, SegmentedTabs.tsx]
- "segmented_tabs_segmentedtabs_segmentedtabs": "SegmentedTabs()" | kind=code-symbol | source=client/src/shared/components/segmented-tabs/SegmentedTabs.tsx:L31 | neighbors=[index.ts, SegmentedTabs.tsx]
- "server_seed_master_realignexistinglines": "realignExistingLines()" | kind=code-symbol | source=server/seed-master.ts:L189 | neighbors=[seed-master.ts, main()]
- "server_seed_master_seedcompanies": "seedCompanies()" | kind=code-symbol | source=server/seed-master.ts:L227 | neighbors=[seed-master.ts, main()]
- "server_seed_master_seedmachines": "seedMachines()" | kind=code-symbol | source=server/seed-master.ts:L131 | neighbors=[seed-master.ts, main()]
- "server_seed_master_seedoperators": "seedOperators()" | kind=code-symbol | source=server/seed-master.ts:L103 | neighbors=[seed-master.ts, main()]
- "server_seed_master_seedusers": "seedUsers()" | kind=code-symbol | source=server/seed-master.ts:L216 | neighbors=[seed-master.ts, main()]
- "server_seed_master_seedworkorders": "seedWorkOrders()" | kind=code-symbol | source=server/seed-master.ts:L340 | neighbors=[seed-master.ts, main()]
- "server_seed_master_sizemm": "sizeMm()" | kind=code-symbol | source=server/seed-master.ts:L31 | neighbors=[seed-master.ts, fillWeights()]
- "services_company_service_companyservice": "companyService" | kind=code-symbol | source=client/src/features/companies/services/company-service.ts:L4 | neighbors=[use-companies.ts, company-service.ts]
- "services_dashboard_service_dashboardservice": "dashboardService" | kind=code-symbol | source=client/src/features/dashboard/services/dashboard-service.ts:L5 | neighbors=[use-dashboard.ts, dashboard-service.ts]
- "services_entity_service_machineservice": "machineService" | kind=code-symbol | source=client/src/features/machines-operators/services/entity-service.ts:L4 | neighbors=[use-entities.ts, entity-service.ts]
- "services_entity_service_operatorservice": "operatorService" | kind=code-symbol | source=client/src/features/machines-operators/services/entity-service.ts:L12 | neighbors=[use-entities.ts, entity-service.ts]
- "services_ink_service_inkservice": "inkService" | kind=code-symbol | source=client/src/features/ink/services/ink-service.ts:L12 | neighbors=[use-ink.ts, ink-service.ts]
- "services_inventory_service_inventoryservice": "inventoryService" | kind=code-symbol | source=client/src/features/inventory/services/inventory-service.ts:L26 | neighbors=[use-inventory.ts, inventory-service.ts]
- "services_inventory_service_rollstockinput": "RollStockInput" | kind=code-symbol | source=client/src/features/inventory/services/inventory-service.ts:L17 | neighbors=[use-inventory.ts, inventory-service.ts]
- "services_mail_service_mailservice_gettransporter": ".getTransporter()" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L17 | neighbors=[MailService, .sendProductionCompletedEmail()]
- "services_mail_service_mailservice_sendproductioncompletedemail": ".sendProductionCompletedEmail()" | kind=code-symbol | source=server/src/shared/services/mail.service.ts:L35 | neighbors=[MailService, .getTransporter()]
- "services_material_receipts_service_materialreceiptservice": "materialReceiptService" | kind=code-symbol | source=client/src/features/materials/services/material-receipts-service.ts:L6 | neighbors=[use-material-receipts.ts, material-receipts-service.ts]
- "services_material_service_materialservice": "materialService" | kind=code-symbol | source=client/src/features/materials/services/material-service.ts:L4 | neighbors=[use-materials.ts, material-service.ts]
- "services_production_order_service_productionorderservice": "productionOrderService" | kind=code-symbol | source=client/src/features/production-orders/services/production-order-service.ts:L22 | neighbors=[use-production-orders.ts, production-order-service.ts]
- "services_production_run_service_productionrunservice": "productionRunService" | kind=code-symbol | source=client/src/features/production-runs/services/production-run-service.ts:L4 | neighbors=[use-production-runs.ts, production-run-service.ts]
- "services_purchase_service_purchaseservice": "purchaseService" | kind=code-symbol | source=client/src/features/purchases/services/purchase-service.ts:L5 | neighbors=[use-purchases.ts, purchase-service.ts]
- "services_thread_dyeing_service_threaddyeingservice": "threadDyeingService" | kind=code-symbol | source=client/src/features/thread-dyeing/services/thread-dyeing-service.ts:L10 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts]
- "services_thread_service_threadservice": "threadService" | kind=code-symbol | source=client/src/features/thread/services/thread-service.ts:L14 | neighbors=[use-thread.ts, thread-service.ts]
- "services_work_order_service_workorderservice": "workOrderService" | kind=code-symbol | source=client/src/features/work-orders/services/work-order-service.ts:L4 | neighbors=[use-work-orders.ts, work-order-service.ts]
- "services_woven_production_service_wovenproductionservice": "wovenProductionService" | kind=code-symbol | source=client/src/features/production-orders/services/woven-production-service.ts:L12 | neighbors=[use-woven-production.ts, woven-production-service.ts]
- "shared_navigation_navitem": "NavItem" | kind=code-symbol | source=client/src/shared/navigation.ts:L16 | neighbors=[navigation.ts, nav-main.tsx]
- "sidebar_appsidebar_appsidebar": "AppSidebar()" | kind=code-symbol | source=client/src/shared/components/sidebar/AppSidebar.tsx:L22 | neighbors=[AppLayout.tsx, AppSidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-027.json

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
