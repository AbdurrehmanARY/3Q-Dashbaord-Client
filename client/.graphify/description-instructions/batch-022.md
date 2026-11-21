# Node Description Batch 23 of 38

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

- "schemas_work_order_schemas_dispatchschemainput": "DispatchSchemaInput" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L121 | neighbors=[DispatchDialog.tsx, work-order-schemas.ts]
- "schemas_work_order_schemas_workorderformschema": "workOrderFormSchema" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L73 | neighbors=[WorkOrderDialog.tsx, work-order-schemas.ts]
- "segmented_tabs_segmentedtabs_segmentedoption": "SegmentedOption" | kind=code-symbol | source=src/shared/components/segmented-tabs/SegmentedTabs.tsx:L3 | neighbors=[index.ts, SegmentedTabs.tsx]
- "segmented_tabs_segmentedtabs_segmentedtabs": "SegmentedTabs()" | kind=code-symbol | source=src/shared/components/segmented-tabs/SegmentedTabs.tsx:L31 | neighbors=[index.ts, SegmentedTabs.tsx]
- "services_company_service_companyservice": "companyService" | kind=code-symbol | source=src/features/companies/services/company-service.ts:L4 | neighbors=[use-companies.ts, company-service.ts]
- "services_dashboard_service_dashboardservice": "dashboardService" | kind=code-symbol | source=src/features/dashboard/services/dashboard-service.ts:L5 | neighbors=[use-dashboard.ts, dashboard-service.ts]
- "services_entity_service_machineservice": "machineService" | kind=code-symbol | source=src/features/machines-operators/services/entity-service.ts:L4 | neighbors=[use-entities.ts, entity-service.ts]
- "services_entity_service_operatorservice": "operatorService" | kind=code-symbol | source=src/features/machines-operators/services/entity-service.ts:L12 | neighbors=[use-entities.ts, entity-service.ts]
- "services_ink_service_inkservice": "inkService" | kind=code-symbol | source=src/features/ink/services/ink-service.ts:L12 | neighbors=[use-ink.ts, ink-service.ts]
- "services_inventory_service_inventoryservice": "inventoryService" | kind=code-symbol | source=src/features/inventory/services/inventory-service.ts:L26 | neighbors=[use-inventory.ts, inventory-service.ts]
- "services_inventory_service_rollstockinput": "RollStockInput" | kind=code-symbol | source=src/features/inventory/services/inventory-service.ts:L17 | neighbors=[use-inventory.ts, inventory-service.ts]
- "services_material_receipts_service_materialreceiptservice": "materialReceiptService" | kind=code-symbol | source=src/features/materials/services/material-receipts-service.ts:L6 | neighbors=[use-material-receipts.ts, material-receipts-service.ts]
- "services_material_service_materialservice": "materialService" | kind=code-symbol | source=src/features/materials/services/material-service.ts:L4 | neighbors=[use-materials.ts, material-service.ts]
- "services_production_order_service_productionorderservice": "productionOrderService" | kind=code-symbol | source=src/features/production-orders/services/production-order-service.ts:L23 | neighbors=[use-production-orders.ts, production-order-service.ts]
- "services_production_run_service_productionrunservice": "productionRunService" | kind=code-symbol | source=src/features/production-runs/services/production-run-service.ts:L4 | neighbors=[use-production-runs.ts, production-run-service.ts]
- "services_purchase_service_purchaseservice": "purchaseService" | kind=code-symbol | source=src/features/purchases/services/purchase-service.ts:L5 | neighbors=[use-purchases.ts, purchase-service.ts]
- "services_thread_dyeing_service_threaddyeingservice": "threadDyeingService" | kind=code-symbol | source=src/features/thread-dyeing/services/thread-dyeing-service.ts:L10 | neighbors=[use-thread-dyeing.ts, thread-dyeing-service.ts]
- "services_thread_service_threadservice": "threadService" | kind=code-symbol | source=src/features/thread/services/thread-service.ts:L14 | neighbors=[use-thread.ts, thread-service.ts]
- "services_work_order_service_workorderservice": "workOrderService" | kind=code-symbol | source=src/features/work-orders/services/work-order-service.ts:L4 | neighbors=[use-work-orders.ts, work-order-service.ts]
- "services_woven_production_service_wovenproductionservice": "wovenProductionService" | kind=code-symbol | source=src/features/production-orders/services/woven-production-service.ts:L12 | neighbors=[use-woven-production.ts, woven-production-service.ts]
- "shared_navigation_navitem": "NavItem" | kind=code-symbol | source=src/shared/navigation.ts:L18 | neighbors=[navigation.ts, nav-main.tsx]
- "sidebar_appsidebar_appsidebar": "AppSidebar()" | kind=code-symbol | source=src/shared/components/sidebar/AppSidebar.tsx:L22 | neighbors=[AppLayout.tsx, AppSidebar.tsx]
- "sidebar_nav_main_navmain": "NavMain()" | kind=code-symbol | source=src/shared/components/sidebar/nav-main.tsx:L34 | neighbors=[AppSidebar.tsx, nav-main.tsx]
- "sidebar_nav_user_navuser": "NavUser()" | kind=code-symbol | source=src/shared/components/sidebar/nav-user.tsx:L19 | neighbors=[AppSidebar.tsx, nav-user.tsx]
- "src_main": "main.tsx" | kind=code-symbol | source=src/main.tsx:L1 | neighbors=[ee6dbbe feat: production order completi…, App.tsx]
- "theme_toggle_themetoggle_themetoggle": "ThemeToggle()" | kind=code-symbol | source=src/shared/components/theme-toggle/ThemeToggle.tsx:L5 | neighbors=[AppHeader.tsx, ThemeToggle.tsx]
- "thread_dyeing_types_base_colors": "BASE_COLORS" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L6 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_basecolor": "BaseColor" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L2 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_denier": "Denier" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L1 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_deniers": "DENIERS" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L5 | neighbors=[SendDyeingDialog.tsx, types.ts]
- "thread_dyeing_types_dyeing_status_labels": "DYEING_STATUS_LABELS" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L8 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_dyeing_types_dyeingstatus": "DyeingStatus" | kind=code-symbol | source=src/features/thread-dyeing/types.ts:L3 | neighbors=[ThreadDyeingPage.tsx, types.ts]
- "thread_types_threaddenier": "ThreadDenier" | kind=code-symbol | source=src/features/thread/types.ts:L3 | neighbors=[index.ts, types.ts]
- "thread_types_threadmovement": "ThreadMovement" | kind=code-symbol | source=src/features/thread/types.ts:L49 | neighbors=[thread-service.ts, types.ts]
- "thread_types_threadstocksummary": "ThreadStockSummary" | kind=code-symbol | source=src/features/thread/types.ts:L30 | neighbors=[thread-service.ts, types.ts]
- "ui_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L11 | neighbors=[ConfirmDialog.tsx, alert-dialog.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L26 | neighbors=[OperatorAvatar.tsx, avatar.tsx]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_breadcrumb_breadcrumb": "Breadcrumb()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L8 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L32 | neighbors=[AppBreadcrumb.tsx, breadcrumb.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-022.json

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
