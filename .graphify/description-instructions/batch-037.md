# Node Description Batch 38 of 74

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
- "shared_navigation_navitem": "NavItem" | kind=code-symbol | source=client/src/shared/navigation.ts:L17 | neighbors=[navigation.ts, nav-main.tsx]
- "sidebar_appsidebar_appsidebar": "AppSidebar()" | kind=code-symbol | source=client/src/shared/components/sidebar/AppSidebar.tsx:L22 | neighbors=[AppLayout.tsx, AppSidebar.tsx]
- "sidebar_nav_main_navmain": "NavMain()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-main.tsx:L34 | neighbors=[AppSidebar.tsx, nav-main.tsx]
- "sidebar_nav_user_navuser": "NavUser()" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-user.tsx:L19 | neighbors=[AppSidebar.tsx, nav-user.tsx]
- "src_api_entry": "api-entry.ts" | kind=code-symbol | source=server/src/api-entry.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, app.ts]
- "src_main": "main.tsx" | kind=code-symbol | source=client/src/main.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, app.ts]
- "tables_batch_consumptions_table": "batch-consumptions.table.ts" | kind=code-symbol | source=server/src/shared/db/tables/batch-consumptions.table.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, batchConsumptions]
- "theme_toggle_themetoggle_themetoggle": "ThemeToggle()" | kind=code-symbol | source=client/src/shared/components/theme-toggle/ThemeToggle.tsx:L5 | neighbors=[AppHeader.tsx, ThemeToggle.tsx]
- "thread_dyeing_types_base_colors": "BASE_COLORS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L6 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_basecolor": "BaseColor" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L2 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_denier": "Denier" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L1 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_deniers": "DENIERS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L5 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_dyeing_status_labels": "DYEING_STATUS_LABELS" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L8 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_dyeing_types_dyeingstatus": "DyeingStatus" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L3 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_consumeforplantx": ".consumeForPlanTx()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L386 | neighbors=[ThreadInventoryRepository, .moveStockTx()]
- "thread_inventory_thread_inventory_repository_threadinventoryrepository_releaseforplantx": ".releaseForPlanTx()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L473 | neighbors=[ThreadInventoryRepository, .moveStockTx()]
- "thread_inventory_thread_inventory_service_threadinventoryservice_createdyebatch": ".createDyeBatch()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L257 | neighbors=[ThreadInventoryService, .nextBatchNumber()]
- "thread_inventory_thread_inventory_service_threadinventoryservice_getstocks": ".getStocks()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L42 | neighbors=[ThreadInventoryService, .getStockSummary()]
- "thread_inventory_thread_inventory_service_threadinventoryservice_getstocksummary": ".getStockSummary()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L53 | neighbors=[ThreadInventoryService, .getStocks()]
- "thread_inventory_thread_inventory_service_threadinventoryservice_nextbatchnumber": ".nextBatchNumber()" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.service.ts:L244 | neighbors=[ThreadInventoryService, .createDyeBatch()]
- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice_remove": ".remove()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L25 | neighbors=[ThreadServiceProviderService, .getOne()]
- "thread_service_provider_thread_service_provider_service_threadserviceproviderservice_update": ".update()" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.service.ts:L21 | neighbors=[ThreadServiceProviderService, .getOne()]
- "thread_types_threaddenier": "ThreadDenier" | kind=code-symbol | source=client/src/features/thread/types.ts:L3 | neighbors=[index.ts, types.ts]
- "thread_types_threadmovement": "ThreadMovement" | kind=code-symbol | source=client/src/features/thread/types.ts:L49 | neighbors=[thread-service.ts, types.ts]
- "thread_types_threadstocksummary": "ThreadStockSummary" | kind=code-symbol | source=client/src/features/thread/types.ts:L30 | neighbors=[thread-service.ts, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-037.json

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
