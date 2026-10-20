# Node Description Batch 20 of 74

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

- "thread_dyeing_thread_dyeing_controller": "thread-dyeing.controller.ts" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), ThreadDyeingController]
- "thread_dyeing_thread_dyeing_service_threaddyeingservice": "ThreadDyeingService" | kind=code-symbol | source=server/src/modules/thread/thread-dyeing/thread-dyeing.service.ts:L7 | neighbors=[thread-dyeing.service.ts, .listSends(), .receiveDyed(), .sendForDyeing()]
- "thread_dyeing_types_dyeingsend": "DyeingSend" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L42 | neighbors=[ReceiveDyeingDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "thread_dyeing_types_serviceprovider": "ServiceProvider" | kind=code-symbol | source=client/src/features/thread-dyeing/types.ts:L14 | neighbors=[ServiceProviderDialog.tsx, ThreadDyeingPage.tsx, thread-dyeing-service.ts, types.ts]
- "thread_inventory_thread_inventory_controller": "thread-inventory.controller.ts" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), ThreadInventoryController]
- "thread_service_provider_thread_service_provider_controller": "thread-service-provider.controller.ts" | kind=code-symbol | source=server/src/modules/thread/thread-service-provider/thread-service-provider.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), ThreadServiceProviderController]
- "ui_input_group_inputgroupaddon": "InputGroupAddon()" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L46 | neighbors=[combobox.tsx, command.tsx, input-group.tsx, inputGroupAddonVariants]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=client/src/components/ui/separator.tsx:L5 | neighbors=[data-table-toolbar.tsx, AppHeader.tsx, separator.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L458 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L502 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_sidebar_sidebarmenuitem": "SidebarMenuItem()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L469 | neighbors=[AppSidebar.tsx, nav-main.tsx, nav-user.tsx, sidebar.tsx]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L50 | neighbors=[InkConsumptionPage.tsx, ThreadDyeingPage.tsx, tabs.tsx, tabsListVariants]
- "ui_tooltip_tooltip": "Tooltip()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L20 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L28 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "ui_tooltip_tooltiptrigger": "TooltipTrigger()" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L24 | neighbors=[editable-cell.tsx, nav-main.tsx, sidebar.tsx, tooltip.tsx]
- "users_user_controller": "user.controller.ts" | kind=code-symbol | source=server/src/modules/users/user.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), UserController]
- "utils_line_draft_linedraft": "LineDraft" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L10 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, line-draft.ts, line-draft.test.ts]
- "utils_planning_rows_labeltypetaken": "labelTypeTaken()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L47 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, labelKey(), planning-rows.test.ts]
- "utils_planning_rows_tonumber": "toNumber()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L12 | neighbors=[PlanLabelTypeForm.tsx, planning-rows.ts, allocateSharedThreads(), planning-rows.test.ts]
- "utils_weaving_time_estimateweavinghours": "estimateWeavingHours()" | kind=code-symbol | source=client/src/features/work-orders/utils/weaving-time.ts:L8 | neighbors=[work-order-columns.tsx, WovenSpecification.tsx, weaving-time.ts, weaving-time.test.ts]
- "work_orders_types_producttype": "ProductType" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L19 | neighbors=[work-order-table.tsx, WorkOrderBasicInfo.tsx, WorkOrderDialog.tsx, types.ts]
- "work_orders_types_work_order_priority_meta": "WORK_ORDER_PRIORITY_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L29 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_types_work_order_type_meta": "WORK_ORDER_TYPE_META" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L41 | neighbors=[work-order-columns.tsx, work-order-table.tsx, WorkOrderBasicInfo.tsx, types.ts]
- "work_orders_work_order_controller": "work-order.controller.ts" | kind=code-symbol | source=server/src/modules/work-orders/work-order.controller.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, asyncHandler.ts, asyncHandler(), WorkOrderController]
- "woven_production_woven_production_controller": "woven-production.controller.ts" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.controller.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, asyncHandler.ts, asyncHandler(), WovenProductionController]
- "woven_production_woven_production_service_wovenproductionservice_notifyifordercompleted": ".notifyIfOrderCompleted()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L464 | neighbors=[WovenProductionService, .updateCutting(), .updatePackaging(), .updateWeaving()]
- "woven_production_woven_production_service_wovenproductionservice_planline": ".planLine()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L210 | neighbors=[WovenProductionService, .assertWoven(), .getLineOrThrow(), .getOrderOrThrow()]
- "woven_production_woven_production_service_wovenproductionservice_updatecutting": ".updateCutting()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L356 | neighbors=[WovenProductionService, .getLineOrThrow(), .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "woven_production_woven_production_service_wovenproductionservice_updatepackaging": ".updatePackaging()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L399 | neighbors=[WovenProductionService, .getLineOrThrow(), .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "woven_production_woven_production_service_wovenproductionservice_updateweaving": ".updateWeaving()" | kind=code-symbol | source=server/src/modules/production/woven-production/woven-production.service.ts:L315 | neighbors=[WovenProductionService, .getLineOrThrow(), .getOrderOrThrow(), .notifyIfOrderCompleted()]
- "baseline_live_schema_public_brands": "public.brands" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L292 | neighbors=[live-schema.sql, public.companies, public.work_orders]
- "baseline_live_schema_public_inventory_roll_movements": "public.inventory_roll_movements" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L435 | neighbors=[live-schema.sql, public.inventory_rolls, public.users]
- "baseline_live_schema_public_inventory_rolls": "public.inventory_rolls" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L474 | neighbors=[live-schema.sql, public.inventory_roll_movements, public.materials]
- "baseline_live_schema_public_production_stage_events": "public.production_stage_events" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L917 | neighbors=[live-schema.sql, public.production_order_lines, public.users]
- "baseline_live_schema_public_thread_dye_batches": "public.thread_dye_batches" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1077 | neighbors=[live-schema.sql, public.thread_stocks, public.users]
- "baseline_live_schema_public_thread_stock_movements": "public.thread_stock_movements" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1302 | neighbors=[live-schema.sql, public.thread_stocks, public.users]
- "baseline_live_schema_public_woven_thread_plan_items": "public.woven_thread_plan_items" | kind=code-symbol | source=server/scripts/baseline/live-schema.sql:L1509 | neighbors=[live-schema.sql, public.thread_stocks, public.woven_production_lines]
- "batch_and_runs_batch_flow_helpers_assertwithinavailable": "assertWithinAvailable()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L290 | neighbors=[batch-flow.helpers.ts, batchPositionOf(), round2()]
- "batch_and_runs_batch_flow_helpers_lineflowof": "lineFlowOf()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.helpers.ts:L222 | neighbors=[batch-flow.helpers.ts, lineSizeFlows(), round2()]
- "batch_and_runs_batch_flow_repository_batchflowrepository_findbyline": ".findByLine()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L189 | neighbors=[BatchFlowRepository, .attachSources(), lineColumn()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-019.json

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
