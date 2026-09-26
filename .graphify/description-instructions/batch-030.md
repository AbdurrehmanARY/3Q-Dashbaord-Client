# Node Description Batch 31 of 53

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

- "ui_sidebar_sidebarinset": "SidebarInset()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L308 | neighbors=[AppLayout.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenubuttonvariants": "sidebarMenuButtonVariants" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L480 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusub": "SidebarMenuSub()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L643 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusubbutton": "SidebarMenuSubButton" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L671 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenusubitem": "SidebarMenuSubItem()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L657 | neighbors=[nav-main.tsx, sidebar.tsx]
- "ui_sidebar_sidebarprovider": "SidebarProvider()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L56 | neighbors=[AppLayout.tsx, sidebar.tsx]
- "ui_sonner_toaster": "Toaster()" | kind=code-symbol | source=client/src/components/ui/sonner.tsx:L10 | neighbors=[ToastProvider.tsx, sonner.tsx]
- "ui_table_tablefooter": "TableFooter()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L42 | neighbors=[EditableLabelTypeTable.tsx, table.tsx]
- "ui_tabs_tabslistvariants": "tabsListVariants" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L35 | neighbors=[tabs.tsx, TabsList()]
- "ui_toggle_group_togglegroup": "ToggleGroup()" | kind=code-symbol | source=client/src/components/ui/toggle-group.tsx:L21 | neighbors=[ProductionTrendChart.tsx, toggle-group.tsx]
- "ui_toggle_group_togglegroupitem": "ToggleGroupItem()" | kind=code-symbol | source=client/src/components/ui/toggle-group.tsx:L57 | neighbors=[ProductionTrendChart.tsx, toggle-group.tsx]
- "ui_toggle_toggle": "Toggle()" | kind=code-symbol | source=client/src/components/ui/toggle.tsx:L28 | neighbors=[toggle.tsx, toggleVariants]
- "users_user_repository_userrepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L42 | neighbors=[UserRepository, .update()]
- "users_user_repository_userrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L33 | neighbors=[UserRepository, .softDelete()]
- "utils_line_draft_linetodraft": "lineToDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L24 | neighbors=[EditableLabelTypeTable.tsx, line-draft.ts]
- "utils_line_draft_patchoverviewline": "patchOverviewLine()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L153 | neighbors=[use-production-orders.ts, line-draft.ts]
- "work_orders_types_work_order_priorities": "WORK_ORDER_PRIORITIES" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L28 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_types": "WORK_ORDER_TYPES" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L40 | neighbors=[WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_workorderstatus": "WorkOrderStatus" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L10 | neighbors=[work-order-table.tsx, types.ts]
- "work_orders_work_order_repository_workorderrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L167 | neighbors=[WorkOrderRepository, .upsertWovenDetail()]
- "work_orders_work_order_repository_workorderrepository_upsertwovendetail": ".upsertWovenDetail()" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L158 | neighbors=[WorkOrderRepository, .update()]
- "analytics_analytics_controller_analyticscontroller": "AnalyticsController" | kind=code-symbol | source=server/src/modules/analytics/analytics.controller.ts:L5 | neighbors=[analytics.controller.ts]
- "analytics_analytics_repository_analyticsrepository_countactiveproductionprogress": ".countActiveProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L25 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countcompletedproductionprogress": ".countCompletedProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L33 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countlowstock": ".countLowStock()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L48 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countmaterials": ".countMaterials()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L43 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countproductionprogress": ".countProductionProgress()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L20 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countsubmittedworkorders": ".countSubmittedWorkOrders()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L13 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_countworkorders": ".countWorkOrders()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L7 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_sumbalancerolls": ".sumBalanceRolls()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L53 | neighbors=[AnalyticsRepository]
- "analytics_analytics_repository_analyticsrepository_sumissuedrolls": ".sumIssuedRolls()" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L58 | neighbors=[AnalyticsRepository]
- "analytics_analytics_routes_router": "router" | kind=code-symbol | source=server/src/modules/analytics/analytics.routes.ts:L4 | neighbors=[analytics.routes.ts]
- "analytics_analytics_service_analyticsservice_getkpis": ".getKpis()" | kind=code-symbol | source=server/src/modules/analytics/analytics.service.ts:L4 | neighbors=[AnalyticsService]
- "app_approutes_pagefallback": "PageFallback()" | kind=code-symbol | source=client/src/app/AppRoutes.tsx:L6 | neighbors=[AppRoutes.tsx]
- "app_routes_approute": "AppRoute" | kind=code-symbol | source=client/src/app/routes.tsx:L7 | neighbors=[routes.tsx]
- "app_routes_page": "page()" | kind=code-symbol | source=client/src/app/routes.tsx:L18 | neighbors=[routes.tsx]
- "app_routes_redirectroute": "RedirectRoute" | kind=code-symbol | source=client/src/app/routes.tsx:L13 | neighbors=[routes.tsx]
- "cards_appcard_appcardprops": "AppCardProps" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L12 | neighbors=[AppCard.tsx]
- "cards_statcard_statcardprops": "StatCardProps" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L9 | neighbors=[StatCard.tsx]
- "cards_statcard_statcardskeleton": "StatCardSkeleton()" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L103 | neighbors=[StatCard.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-030.json

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
