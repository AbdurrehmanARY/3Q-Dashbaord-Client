# Node Description Batch 4 of 53

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

- "components_productionsummary": "ProductionSummary.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, AppCard.tsx, AppCard, ProductionSummary(), StageRow(), StageSummary]
- "constants_messages_entity": "Entity" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L9 | neighbors=[company.service.ts, messages.ts, ink.service.ts, inventory.service.ts, material.service.ts, machine.service.ts]
- "data_table_data_table_pagination": "data-table-pagination.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-pagination.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTablePagination(), DataTablePaginationProps, pageWindow(), pagination.tsx]
- "drizzle_0000_lovely_imperial_guard": "0000_lovely_imperial_guard.sql" | kind=code-symbol | source=server/drizzle/0000_lovely_imperial_guard.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brands, companies, inventory_rolls, machines, materials]
- "forms_appselect": "AppSelect.tsx" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, DyeThreadDialog.tsx, LogProductionRunDialog.tsx, MachineDialog.tsx, OperatorDialog.tsx, PlanLabelTypeForm.tsx]
- "hooks_use_thread_dyeing": "use-thread-dyeing.ts" | kind=code-symbol | source=client/src/features/thread-dyeing/hooks/use-thread-dyeing.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, SendDyeingDialog.tsx, ServiceProviderDialog.tsx, DYEING_KEYS, useCreateProvider()]
- "lib_format_formatdate": "formatDate()" | kind=code-symbol | source=client/src/lib/format.ts:L12 | neighbors=[CreateProductionOrderDialog.tsx, ink-purchase-columns.tsx, MaterialReceiptPage.tsx, production-order-columns.tsx, production-order-table.tsx, ProductionHistoryTable.tsx]
- "pages_purchaserecordpage": "PurchaseRecordPage.tsx" | kind=code-symbol | source=client/src/features/purchases/pages/PurchaseRecordPage.tsx:L1 | neighbors=[routes.tsx, 95aebc1 feat: thread receiving, stock a…, ab23f28 fix: tab switcher rendered unst…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, purchase-table.tsx]
- "services_inventory_service": "inventory-service.ts" | kind=code-symbol | source=client/src/features/inventory/services/inventory-service.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, c0c79ec Initial commit: Label Manufactu…, use-inventory.ts, types.ts, PurchaseInput, PurchaseRecord]
- "sidebar_nav_user": "nav-user.tsx" | kind=code-symbol | source=client/src/shared/components/sidebar/nav-user.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppSidebar.tsx, NavUser(), avatar.tsx, Avatar(), AvatarFallback()]
- "src_index": "index.ts" | kind=code-symbol | source=server/src/index.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, ee6d4dd refactor(server): vertical-slic…, env, Logger, setupGracefulShutdown()]
- "ui_input_group": "input-group.tsx" | kind=code-symbol | source=client/src/components/ui/input-group.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, combobox.tsx, command.tsx, utils.ts, cn(), button.tsx]
- "validation_query_schema": "query.schema.ts" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, ListCompaniesQueryDTO, listCompaniesQuerySchema, ListMachinesQueryDTO, listMachinesQuerySchema, ListMaterialsQueryDTO]
- "cards_appcard_appcard": "AppCard" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L22 | neighbors=[AppCard.tsx, BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, operator-table.tsx, PlanLabelTypeForm.tsx]
- "cards_statcard": "StatCard.tsx" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L1 | neighbors=[index.ts, StatCard(), StatCardProps, StatCardSkeleton(), TrendDirection, utils.ts]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@f5f1f472cfd6b8380a8783c3305b17dab2c3b69e": "f5f1f47 feat: woven labels foundation — schema, migration, sticky progress colu…" | kind=Commit | source=git | neighbors=[25b3e1a ci: add GitHub Actions pipeline…, chore/ci, b7b6ac9 feat: merge woven labels into t…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx, progress-table-styles.ts]
- "components_production_order_table": "production-order-table.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-table.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, production-order-columns.tsx, productionOrderColumns, exportColumns]
- "components_receivedyeingdialog": "ReceiveDyeingDialog.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/components/ReceiveDyeingDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, ReceiveDyeingDialog(), ReceiveForm, AppDialog.tsx, AppDialog(), AppButton.tsx]
- "components_work_order_columns": "work-order-columns.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, workOrderColumns, work-order-row-actions.tsx, WorkOrderRowActions()]
- "components_woventhreadreconciliationcard": "WovenThreadReconciliationCard.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenThreadReconciliationCard.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, WovenProductionPanel.tsx, AppCard.tsx, AppCard, WovenThreadReconciliationCard(), WovenThreadReconciliationCardProps]
- "hooks_use_inventory": "use-inventory.ts" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, c0c79ec Initial commit: Label Manufactu…, inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx, INVENTORY_KEYS]
- "middleware_validaterequest": "validateRequest.ts" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, company.routes.ts, ink.routes.ts, inventory-roll.routes.ts, inventory.routes.ts, material.routes.ts]
- "schemas_work_order_schemas": "work-order-schemas.ts" | kind=code-symbol | source=client/src/features/work-orders/schemas/work-order-schemas.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, ArtworkAndComment.tsx]
- "services_work_order_service": "work-order-service.ts" | kind=code-symbol | source=client/src/features/work-orders/services/work-order-service.ts:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, c0c79ec Initial commit: Label Manufactu…, use-work-orders.ts, api.ts, api, workOrderService]
- "sidebar_appsidebar": "AppSidebar.tsx" | kind=code-symbol | source=client/src/shared/components/sidebar/AppSidebar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppLayout.tsx, navigation.ts, navigation, AppSidebar(), nav-main.tsx]
- "ui_empty": "empty.tsx" | kind=code-symbol | source=client/src/components/ui/empty.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BrandTable.tsx, CompanyTable.tsx, machine-table.tsx, material-table.tsx, operator-table.tsx]
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=client/src/components/ui/skeleton.tsx:L1 | neighbors=[StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, EditableLabelTypeTable.tsx, LowStockAlert.tsx, ProductionRunsSection.tsx, ProductionTrendChart.tsx]
- "utils_line_draft": "line-draft.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx, use-production-orders.ts, types.ts]
- "command_palette_commandpalette": "CommandPalette.tsx" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L1 | neighbors=[CommandPalette(), CommandPaletteProps, CommandPaletteTrigger(), CommandPaletteTriggerProps, COMMANDS, navigation.ts]
- "components_lowstockalert": "LowStockAlert.tsx" | kind=code-symbol | source=client/src/features/dashboard/components/LowStockAlert.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, LowStockAlert(), StatusBadge.tsx, StatusBadge(), index.ts]
- "layouts_applayout": "AppLayout.tsx" | kind=code-symbol | source=client/src/shared/layouts/AppLayout.tsx:L1 | neighbors=[AppRoutes.tsx, c0c79ec Initial commit: Label Manufactu…, ErrorBoundary.tsx, ErrorBoundary, AppHeader.tsx, AppHeader()]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=client/src/components/ui/dialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppDialog.tsx, command.tsx, utils.ts, cn(), button.tsx]
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=client/src/components/ui/drawer.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Drawer(), DrawerClose(), DrawerContent()]
- "companies_types": "types.ts" | kind=code-symbol | source=client/src/features/companies/types.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, Brand, BrandInput, Company, CompanyInput]
- "components_inkstockpanel": "InkStockPanel.tsx" | kind=code-symbol | source=client/src/features/ink/components/InkStockPanel.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, InkStockPanel(), StatusBadge.tsx, StatusBadge(), use-ink.ts, useInkStock()]
- "components_operator_columns": "operator-columns.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-columns.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge.tsx, AvailabilityBadge(), operatorColumns, operator-row-actions.tsx]
- "components_productionrunssection": "ProductionRunsSection.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/ProductionRunsSection.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, AppCard.tsx, AppCard, LogProductionRunDialog.tsx, LogProductionRunDialog(), ProductionHistoryTable.tsx]
- "data_table_data_table_view_options": "data-table-view-options.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-view-options.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, data-table.tsx, columnLabel(), DataTableViewOptions(), utils.ts, cn()]
- "db_seed_data": "seed-data.ts" | kind=code-symbol | source=server/src/shared/db/seed-data.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, COMPANIES, CompanySeed, MACHINES, MachineSeed, MATERIALS]
- "drizzle_0012_flawless_master_chief": "0012_flawless_master_chief.sql" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L1 | neighbors=[f5f1f47 feat: woven labels foundation —…, public.machines, public.operators, public.production_orders, public.thread_stocks, public.users]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-003.json

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
