# Node Description Batch 5 of 53

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "drizzle_0015_mature_captain_britain": "0015_mature_captain_britain.sql" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L1 | neighbors=[9b99ce1 feat: complete production workf…, label_sheets, local_sheets, machines, production_runs, public.machines]
- "materials_index": "index.ts" | kind=code-symbol | source=client/src/features/materials/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, inventory-stock-table.tsx, LowStockAlert.tsx, PlanLabelTypeForm.tsx, purchase-row-actions.tsx, RollStockDialog.tsx]
- "schemas_production_order_schemas": "production-order-schemas.ts" | kind=code-symbol | source=client/src/features/production-orders/schemas/production-order-schemas.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PlanLabelTypeForm.tsx, assignResourcesSchema, AssignResourcesSchemaInput, createProductionOrderSchema]
- "ui_button_button": "Button" | kind=code-symbol | source=client/src/components/ui/button.tsx:L46 | neighbors=[LowStockAlert.tsx, RecentWorkOrders.tsx, data-table-toolbar.tsx, AppButton.tsx, DashboardPage.tsx, ProductionOrderDashboardPage.tsx]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProductionTrendChart.tsx, utils.ts, cn(), ChartConfig, ChartContainer()]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), button.tsx, buttonVariants, Sheet()]
- "branch:repo:local/3Q-facility-Dashboard@9740e304#chore/ci": "chore/ci" | kind=Branch | source=git | neighbors=[09c4b95 feat: dispatch dialog, product-…, 25b3e1a ci: add GitHub Actions pipeline…, 3e6a631 feat: woven production client U…, 933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, 9b99ce1 feat: complete production workf…]
- "components_date_picker": "date-picker.tsx" | kind=code-symbol | source=client/src/shared/components/date-picker.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DatePicker(), DatePickerProps, toISODate(), utils.ts, cn()]
- "components_productionstatusbadge": "ProductionStatusBadge.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LabelTypeRow.tsx, production-order-columns.tsx, LINE_STATUS, ORDER_STATUS, ProductionLineStatusBadge()]
- "components_wovenspecification": "WovenSpecification.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/WovenSpecification.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, WorkOrderDialog.tsx, EstimatedWeavingTime(), SizeLabelsInput(), WovenSpecification(), AppButton.tsx]
- "data_table_data_table_column_header": "data-table-column-header.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-column-header.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, DataTableColumnHeader(), DataTableColumnHeaderProps, utils.ts, cn()]
- "errors_apierror_apierror": "ApiError" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L4 | neighbors=[company.service.ts, labels.ts, ApiError.ts, .constructor(), BadRequestError, ConflictError]
- "hooks_use_materials": "use-materials.ts" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-row-actions.tsx, material-table.tsx, MaterialForm.tsx, MaterialSelect.tsx, MATERIAL_KEYS]
- "inventory_inventory_service": "inventory.service.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Material]
- "lib_api_api": "api" | kind=code-symbol | source=client/src/lib/api.ts:L51 | neighbors=[api.ts, company-service.ts, dashboard-service.ts, entity-service.ts, ink-service.ts, inventory-service.ts]
- "production_orders_types_productionlineoverview": "ProductionLineOverview" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L232 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, planned-line-columns.tsx, planned-line-row-actions.tsx]
- "schemas_entity_schemas": "entity-schemas.ts" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, machine-table.tsx, MachineDialog.tsx, operator-table.tsx]
- "server_seed_master": "seed-master.ts" | kind=code-symbol | source=server/seed-master.ts:L1 | neighbors=[schema.ts, fillWeights(), MACHINE_TAKEOVERS, main(), realignExistingLines(), round4()]
- "services_ink_service": "ink-service.ts" | kind=code-symbol | source=client/src/features/ink/services/ink-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-ink.ts, types.ts, InkConsumption, InkConsumptionInput, InkOperatorSummary]
- "services_thread_service": "thread-service.ts" | kind=code-symbol | source=client/src/features/thread/services/thread-service.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, use-thread.ts, api.ts, api, threadService]
- "ui_card": "card.tsx" | kind=code-symbol | source=client/src/components/ui/card.tsx:L1 | neighbors=[AppCard.tsx, StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, LowStockAlert.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx]
- "ui_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L7 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L19 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L15 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx]
- "ui_label": "label.tsx" | kind=code-symbol | source=client/src/components/ui/label.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ArtworkAndComment.tsx, CreateProductionOrderDialog.tsx, InkConsumptionDialog.tsx, LogProductionRunDialog.tsx, ServiceProviderDialog.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=client/src/components/ui/skeleton.tsx:L3 | neighbors=[StatCard.tsx, EditableLabelTypeTable.tsx, LowStockAlert.tsx, ProductionRunsSection.tsx, ProductionTrendChart.tsx, RecentWorkOrders.tsx]
- "components_ink_purchase_columns": "ink-purchase-columns.tsx" | kind=code-symbol | source=client/src/features/ink/components/ink-purchase-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ColumnCallbacks, inkPurchaseColumns(), index.ts, ConfirmDialog.tsx, ConfirmDialog()]
- "components_inkoperatorbreakdown": "InkOperatorBreakdown.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkOperatorBreakdown.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkOperatorBreakdown(), use-ink.ts, useInkConsumptionByOperator(), format.ts, formatNumber()]
- "components_inventory_columns": "inventory-columns.tsx" | kind=code-symbol | source=client/src/features/inventory/components/inventory-columns.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, inventoryColumns, roll-stock-row-actions.tsx, RollStockRowActions()]
- "components_machine_columns": "machine-columns.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge.tsx, AvailabilityBadge(), machineColumns, machine-row-actions.tsx]
- "data_table_data_table_skeleton": "data-table-skeleton.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-skeleton.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTableSkeleton(), DataTableSkeletonProps, skeleton.tsx, Skeleton()]
- "data_table_editable_cell": "editable-cell.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, EditableCell(), editableCellClass, EditableCellInput(), EditableCellInputProps, useEditableCell()]
- "db_drizzle": "drizzle.ts" | kind=code-symbol | source=server/src/shared/db/drizzle.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, database.ts, databaseConfig, env.ts, env, logger.ts]
- "feedback_operatoravatar": "OperatorAvatar.tsx" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, operator-columns.tsx, OperatorDialog.tsx, ProductionSummary.tsx, initialsOf(), OperatorAvatar()]
- "header_appheader": "AppHeader.tsx" | kind=code-symbol | source=client/src/shared/components/header/AppHeader.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppBreadcrumb.tsx, AppBreadcrumb(), CommandPalette.tsx, CommandPalette(), CommandPaletteTrigger()]
- "ink_types": "types.ts" | kind=code-symbol | source=client/src/features/ink/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, InkPurchaseDialog.tsx, use-ink.ts, InkConsumption]
- "machines_operators_index": "index.ts" | kind=code-symbol | source=client/src/features/machines-operators/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, InkConsumptionDialog.tsx, WovenPlanningForm.tsx, MachineSelect.tsx, MachineSelect(), OperatorSelect.tsx]
- "pages_inventorystockpage": "InventoryStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/InventoryStockPage.tsx:L1 | neighbors=[routes.tsx, 95aebc1 feat: thread receiving, stock a…, ab23f28 fix: tab switcher rendered unst…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, inventory-stock-table.tsx]
- "production_runs_types": "types.ts" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, ProductionSummaryCard.tsx, use-production-runs.ts, LogProductionRunInput]
- "services_company_service": "company-service.ts" | kind=code-symbol | source=client/src/features/companies/services/company-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-companies.ts, types.ts, Brand, Company, api.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-004.json

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
