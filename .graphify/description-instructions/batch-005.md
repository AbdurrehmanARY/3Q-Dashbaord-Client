# Node Description Batch 6 of 74

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

- "scripts_reorganize_modules": "reorganize-modules.mjs" | kind=code-symbol | source=server/scripts/reorganize-modules.mjs:L1 | neighbors=[558dd8a refactor(server): split flat do…, CR, files, isImportSpec(), KW, LF]
- "thread_inventory_thread_inventory_repository": "thread-inventory.repository.ts" | kind=code-symbol | source=server/src/modules/thread/thread-inventory/thread-inventory.repository.ts:L1 | neighbors=[558dd8a refactor(server): split flat do…, index.ts, db, Tx, schema.ts, NewThreadDyeBatch]
- "ui_button_button": "Button" | kind=code-symbol | source=client/src/components/ui/button.tsx:L46 | neighbors=[LowStockAlert.tsx, RecentWorkOrders.tsx, data-table-toolbar.tsx, AppButton.tsx, DashboardPage.tsx, ProductionOrderDashboardPage.tsx]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=client/src/components/ui/chart.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, ProductionTrendChart.tsx, utils.ts, cn(), ChartConfig, ChartContainer()]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), button.tsx, buttonVariants, Sheet()]
- "utils_planning_rows": "planning-rows.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L1 | neighbors=[7d4a38d feat(client): batch planning an…, PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, woven-types.ts, ThreadPlanInput, allocateSharedThreads()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@2c8bd345e405694942a72e87945d1e44362dbe75": "2c8bd34 feat(client): per-table column visibility store and healthcheck probes" | kind=Commit | source=git | neighbors=[chore/ci, 0daa333 feat(client): show live stock b…, inventory-stock-table.tsx, purchase-table.tsx, data-table.tsx, data-table-view-options.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@c401a2159471eadc35e480d73dd73e0515f2fe11": "c401a21 feat(client): weaving-time display and work-order detail rework" | kind=Commit | source=git | neighbors=[7d4a38d feat(client): batch planning an…, chore/ci, 2c8bd34 feat(client): per-table column …, ArtworkAndComment.tsx, DispatchInfo.tsx, work-order-columns.tsx]
- "components_date_picker": "date-picker.tsx" | kind=code-symbol | source=client/src/shared/components/date-picker.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DatePicker(), DatePickerProps, toISODate(), utils.ts, cn()]
- "data_table_data_table_column_header": "data-table-column-header.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-column-header.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, DataTableColumnHeader(), DataTableColumnHeaderProps, utils.ts, cn()]
- "hooks_use_materials": "use-materials.ts" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-row-actions.tsx, material-table.tsx, MaterialForm.tsx, MaterialSelect.tsx, MATERIAL_KEYS]
- "inventory_inventory_service": "inventory.service.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Material]
- "schemas_entity_schemas": "entity-schemas.ts" | kind=code-symbol | source=client/src/features/machines-operators/schemas/entity-schemas.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, machine-table.tsx, MachineDialog.tsx, operator-table.tsx]
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
- "components_plannedlabeltypestable": "PlannedLabelTypesTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/PlannedLabelTypesTable.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, AppCard.tsx, AppCard, PlannedLabelTypesTable(), PlannedLabelTypesTableProps, ProductionStatusBadge.tsx]
- "components_sizeplaneditor": "SizePlanEditor.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/SizePlanEditor.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, PlanLabelTypeForm.tsx, SizePlanEditor(), SizePlanEditorProps, AppButton.tsx, AppButton]
- "constants_labels": "labels.ts" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L1 | neighbors=[batch-flow.helpers.test.ts, ee6d4dd refactor(server): vertical-slic…, normalizeSizePlan(), validateSizePlan(), size-plans.ts, isSizeLabel()]
- "data_table_data_table_skeleton": "data-table-skeleton.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-skeleton.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTableSkeleton(), DataTableSkeletonProps, skeleton.tsx, Skeleton()]
- "data_table_editable_cell": "editable-cell.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/editable-cell.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, EditableCell(), editableCellClass, EditableCellInput(), EditableCellInputProps, useEditableCell()]
- "db_drizzle": "drizzle.ts" | kind=code-symbol | source=server/src/shared/db/drizzle.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, database.ts, databaseConfig, env.ts, env, logger.ts]
- "feedback_operatoravatar": "OperatorAvatar.tsx" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, operator-columns.tsx, OperatorDialog.tsx, ProductionSummary.tsx, initialsOf(), OperatorAvatar()]
- "header_appheader": "AppHeader.tsx" | kind=code-symbol | source=client/src/shared/components/header/AppHeader.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppBreadcrumb.tsx, AppBreadcrumb(), CommandPalette.tsx, CommandPalette(), CommandPaletteTrigger()]
- "healthcheck_client_healthcheck": "client_healthcheck.tsx" | kind=code-symbol | source=client/src/lib/healthcheck/client_healthcheck.tsx:L1 | neighbors=[2c8bd34 feat(client): per-table column …, ClientHealthcheck(), HealthcheckProps, HealthChip(), HealthDetailCard(), HealthprobeResult]
- "ink_types": "types.ts" | kind=code-symbol | source=client/src/features/ink/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ink-consumption-columns.tsx, ink-purchase-columns.tsx, InkPurchaseDialog.tsx, use-ink.ts, InkConsumption]
- "pages_inventorystockpage": "InventoryStockPage.tsx" | kind=code-symbol | source=client/src/features/inventory/pages/InventoryStockPage.tsx:L1 | neighbors=[routes.tsx, 95aebc1 feat: thread receiving, stock a…, ab23f28 fix: tab switcher rendered unst…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, inventory-stock-table.tsx]
- "production_runs_types": "types.ts" | kind=code-symbol | source=client/src/features/production-runs/types.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, LogProductionRunDialog.tsx, ProductionHistoryTable.tsx, ProductionSummaryCard.tsx, use-production-runs.ts, LogProductionRunInput]
- "services_company_service": "company-service.ts" | kind=code-symbol | source=client/src/features/companies/services/company-service.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, use-companies.ts, types.ts, Brand, Company, api.ts]
- "services_thread_dyeing_service": "thread-dyeing-service.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/services/thread-dyeing-service.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, use-thread-dyeing.ts, api.ts, api, threadDyeingService, types.ts]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L74 | neighbors=[brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx, operator-row-actions.tsx, production-order-row-actions.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-005.json

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
