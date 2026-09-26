# Node Description Batch 7 of 53

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

- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=client/src/components/ui/navigation-menu.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator()]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=client/src/components/ui/tooltip.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, editable-cell.tsx, AppLayout.tsx, LayoutProvider.tsx, nav-main.tsx, sidebar.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@3e6a631cfbebe35cb199e8f0c6066ca93eaa6c56": "3e6a631 feat: woven production client UI, branching off the shared dashboard" | kind=Commit | source=git | neighbors=[chore/ci, adfafe7 polish: nav + page copy for the…, WovenPlanningForm.tsx, WovenProductionPanel.tsx, use-woven-production.ts, ProductionOrderDashboardPage.tsx]
- "components_availabilitybadge": "AvailabilityBadge.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AvailabilityBadge(), AvailabilityBadgeProps, VARIANTS, StatusBadge.tsx, StatusBadge()]
- "components_material_columns": "material-columns.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, materialColumns, material-row-actions.tsx, MaterialRowActions(), index.ts]
- "components_materialselect": "MaterialSelect.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialSelect.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, MaterialSelect(), MaterialSelectProps, AppCombobox.tsx, AppCombobox(), use-materials.ts]
- "config_logger_logger": "Logger" | kind=code-symbol | source=server/src/shared/config/logger.ts:L10 | neighbors=[logger.ts, .debug(), .error(), .formatMessage(), .info(), .warn()]
- "constants_labels": "labels.ts" | kind=code-symbol | source=server/src/shared/constants/labels.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, normalizeSizePlan(), validateSizePlan(), size-plans.ts, isSizeLabel(), LABEL_TYPES]
- "data_table_data_table_empty": "data-table-empty.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table-empty.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, data-table.tsx, DataTableEmpty(), DataTableEmptyProps, empty.tsx, Empty()]
- "forms_appselect_appselect": "AppSelect" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L18 | neighbors=[DyeThreadDialog.tsx, LogProductionRunDialog.tsx, MachineDialog.tsx, OperatorDialog.tsx, PlanLabelTypeForm.tsx, PurchaseForm.tsx]
- "hooks_use_material_receipts": "use-material-receipts.ts" | kind=code-symbol | source=client/src/features/materials/hooks/use-material-receipts.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage.tsx, RECEIPT_KEYS, useCreateReceipt(), useDeleteReceipt(), useReceipts()]
- "inventory_inventory_repository": "inventory.repository.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, Tx, schema.ts, InventoryRoll]
- "inventory_inventory_repository_inventoryrepository": "InventoryRepository" | kind=code-symbol | source=server/src/modules/inventory/inventory.repository.ts:L34 | neighbors=[inventory.repository.ts, .applyStockDeltaTx(), .createInventoryRoll(), .createPurchaseWithStock(), .deletePurchaseWithStock(), .findAllPurchases()]
- "inventory_inventory_roll_service": "inventory-roll.service.ts" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Messages, ApiError.ts, ApiError, ConflictError]
- "inventory_material_service": "material.service.ts" | kind=code-symbol | source=server/src/modules/inventory/material.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Material]
- "machines_machine_service": "machine.service.ts" | kind=code-symbol | source=server/src/modules/machines/machine.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Machine]
- "middleware_validaterequest_validaterequest": "validateRequest()" | kind=code-symbol | source=server/src/shared/middleware/validateRequest.ts:L15 | neighbors=[company.routes.ts, ink.routes.ts, inventory-roll.routes.ts, inventory.routes.ts, material.routes.ts, machine.routes.ts]
- "operators_operator_service": "operator.service.ts" | kind=code-symbol | source=server/src/modules/operators/operator.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, Operator]
- "pages_companybrandpage": "CompanyBrandPage.tsx" | kind=code-symbol | source=client/src/features/companies/pages/CompanyBrandPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, types.ts, Company, BrandTable.tsx, BrandTable()]
- "pages_materialmasterpage": "MaterialMasterPage.tsx" | kind=code-symbol | source=client/src/features/materials/pages/MaterialMasterPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, material-table.tsx, MaterialTable(), MaterialForm.tsx, MaterialForm()]
- "pages_productionorderlistpage": "ProductionOrderListPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderListPage.tsx:L1 | neighbors=[routes.tsx, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, CreateProductionOrderDialog(), production-order-table.tsx, ProductionOrderTable()]
- "scripts_verify_migration": "verify-migration.mjs" | kind=code-symbol | source=server/scripts/verify-migration.mjs:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, files, findings, GONE_ALIASES, GONE_DIR_RE, GONE_LAYER_DIRS]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=client/src/components/ui/avatar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, OperatorAvatar.tsx, nav-user.tsx, utils.ts, cn(), Avatar()]
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=client/src/components/ui/breadcrumb.tsx:L1 | neighbors=[AppBreadcrumb.tsx, c0c79ec Initial commit: Label Manufactu…, utils.ts, cn(), Breadcrumb(), BreadcrumbEllipsis()]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, LabelTypeRow.tsx, progress-bar.tsx, WorkOrderDetailPage.tsx, utils.ts, cn()]
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L81 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ThreadPurchasePanel.tsx]
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L55 | neighbors=[CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, InkOperatorBreakdown.tsx, InkStockPanel.tsx, LabelTypeRow.tsx, ThreadPurchasePanel.tsx]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=client/src/components/ui/tabs.tsx:L1 | neighbors=[ab23f28 fix: tab switcher rendered unst…, c0c79ec Initial commit: Label Manufactu…, InkConsumptionPage.tsx, ThreadDyeingPage.tsx, utils.ts, cn()]
- "users_user_service": "user.service.ts" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, messages.ts, Entity, Messages, schema.ts, User]
- "utils_line_draft_test": "line-draft.test.ts" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, types.ts, LinePlanning, line-draft.ts, cascadeDraft()]
- "work_orders_work_order_repository_workorderrepository": "WorkOrderRepository" | kind=code-symbol | source=server/src/modules/work-orders/work-order.repository.ts:L45 | neighbors=[work-order.repository.ts, .create(), .createWithWovenDetail(), .delete(), .findAll(), .findByDesignCode()]
- "analytics_analytics_repository": "analytics.repository.ts" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L1 | neighbors=[AnalyticsRepository, index.ts, db, schema.ts, InventoryRoll, Material]
- "analytics_analytics_repository_analyticsrepository": "AnalyticsRepository" | kind=code-symbol | source=server/src/modules/analytics/analytics.repository.ts:L6 | neighbors=[analytics.repository.ts, .countActiveProductionProgress(), .countCompletedProductionProgress(), .countLowStock(), .countMaterials(), .countProductionProgress()]
- "breadcrumb_appbreadcrumb": "AppBreadcrumb.tsx" | kind=code-symbol | source=client/src/shared/components/breadcrumb/AppBreadcrumb.tsx:L1 | neighbors=[AppBreadcrumb(), pathToSegments(), breadcrumb.tsx, Breadcrumb(), BreadcrumbItem(), BreadcrumbList()]
- "companies_index": "index.ts" | kind=code-symbol | source=client/src/features/companies/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, types.ts, Brand, Company, CompanySelect.tsx, CompanySelect()]
- "components_brand_columns": "brand-columns.tsx" | kind=code-symbol | source=client/src/features/companies/components/brand-columns.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, types.ts, Brand, Company, createBrandColumns()]
- "components_index": "index.ts" | kind=code-symbol | source=client/src/features/companies/components/index.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, index.ts, BrandDialog.tsx, BrandTable.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "components_progress_table_styles": "progress-table-styles.ts" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx, alignClass()]
- "components_woventrackingtable": "WovenTrackingTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenTrackingTable.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c27dc7d feat(server): stock CRUD histor…, WovenProductionPanel.tsx, woven-columns.tsx, wovenColumns, WovenTrackingTable()]
- "config_env": "env.ts" | kind=code-symbol | source=server/src/shared/config/env.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, database.ts, env, envSchema, drizzle.ts, mail.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-006.json

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
