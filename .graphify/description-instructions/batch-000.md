# Node Description Batch 1 of 53

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
Write every description in French (fr). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:local/3Q-facility-Dashboard@9740e304@c0c79ec9479dc3e587a716987545bc9bf336ca4e": "c0c79ec Initial commit: Label Manufacturing ERP + audit remediation" | kind=Commit | source=git | neighbors=[AppProviders.tsx, AppRoutes.tsx, routes.tsx, chore/ci, AppBreadcrumb.tsx, AppCard.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@9b99ce1e72bc5c62b6a4bd38db05d484691eb7b3": "9b99ce1 feat: complete production workflow, stock master data, company brand co…" | kind=Commit | source=git | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, routes.tsx, chore/ci, ee6d4dd refactor(server): vertical-slic…, ArtworkAndComment.tsx, brand-columns.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@ee6d4dde05688f77295b03f6b0d506147a3f5a2e": "ee6d4dd refactor(server): vertical-slice modules + shared layout" | kind=Commit | source=git | neighbors=[9b99ce1 feat: complete production workf…, analytics.controller.ts, analytics.repository.ts, analytics.routes.ts, analytics.service.ts, chore/ci]
- "db_schema": "schema.ts" | kind=code-symbol | source=server/src/shared/db/schema.ts:L1 | neighbors=[analytics.repository.ts, ee6d4dd refactor(server): vertical-slic…, company.repository.ts, company.service.ts, drizzle.ts, migrate-production-runs.ts]
- "lib_utils": "utils.ts" | kind=code-symbol | source=client/src/lib/utils.ts:L1 | neighbors=[AppCard.tsx, StatCard.tsx, c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, CreateProductionOrderDialog.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=client/src/lib/utils.ts:L4 | neighbors=[AppCard.tsx, StatCard.tsx, brand-row-actions.tsx, company-row-actions.tsx, CreateProductionOrderDialog.tsx, date-picker.tsx]
- "forms_appbutton": "AppButton.tsx" | kind=code-symbol | source=client/src/components/forms/AppButton.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx, company-row-actions.tsx, CompanyDialog.tsx]
- "production_orders_types": "types.ts" | kind=code-symbol | source=client/src/features/production-orders/types.ts:L1 | neighbors=[3e6a631 feat: woven production client U…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, EditableLabelTypeTable.tsx, LabelTypeRow.tsx]
- "data_table_index": "index.ts" | kind=code-symbol | source=client/src/shared/components/data-table/index.ts:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, brand-columns.tsx, BrandTable.tsx, company-columns.tsx]
- "forms_appbutton_appbutton": "AppButton" | kind=code-symbol | source=client/src/components/forms/AppButton.tsx:L14 | neighbors=[brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx, company-row-actions.tsx, CompanyDialog.tsx, CompanyTable.tsx]
- "lib_format": "format.ts" | kind=code-symbol | source=client/src/lib/format.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx]
- "pages_productionorderdashboardpage": "ProductionOrderDashboardPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx:L1 | neighbors=[routes.tsx, 3e6a631 feat: woven production client U…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, AppHeader.tsx, AppLayout.tsx, AppSidebar.tsx, nav-main.tsx, nav-user.tsx]
- "hooks_use_production_orders": "use-production-orders.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog.tsx, EditableLabelTypeTable.tsx, PlanLabelTypeDialog.tsx]
- "components_editablelabeltypetable": "EditableLabelTypeTable.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/EditableLabelTypeTable.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable(), EditableLabelTypeTableProps]
- "pages_workorderdetailpage": "WorkOrderDetailPage.tsx" | kind=code-symbol | source=client/src/features/work-orders/pages/WorkOrderDetailPage.tsx:L1 | neighbors=[routes.tsx, 09c4b95 feat: dispatch dialog, product-…, 933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…]
- "lib_format_formatnumber": "formatNumber()" | kind=code-symbol | source=client/src/lib/format.ts:L3 | neighbors=[CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx, EditableLabelTypeTable.tsx, ink-consumption-columns.tsx, ink-purchase-columns.tsx]
- "components_workorderdialog": "WorkOrderDialog.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/WorkOrderDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, work-order-row-actions.tsx]
- "components_threadpurchasepanel": "ThreadPurchasePanel.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadPurchasePanel.tsx:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, cc50221 feat: dispatched status + FBR i…, AppCard.tsx, AppCard, COLOR_OPTIONS, DENIER_OPTIONS]
- "data_table_data_table": "data-table.tsx" | kind=code-symbol | source=client/src/shared/components/data-table/data-table.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, alignClass(), DataTable(), DataTableActionBar()]
- "components_roll_stock_row_actions": "roll-stock-row-actions.tsx" | kind=code-symbol | source=client/src/features/inventory/components/roll-stock-row-actions.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, inventory-columns.tsx, HistoryDialog(), MOVEMENT_LABELS, RollStockRowActions(), RollStockDialog.tsx]
- "components_threadstockpanel": "ThreadStockPanel.tsx" | kind=code-symbol | source=client/src/features/thread/components/ThreadStockPanel.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 95aebc1 feat: thread receiving, stock a…, 9b99ce1 feat: complete production workf…, cc50221 feat: dispatched status + FBR i…, AppCard.tsx, AppCard]
- "ui_combobox": "combobox.tsx" | kind=code-symbol | source=client/src/components/ui/combobox.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, combobox.tsx, inventory-stock-table.tsx, machine-table.tsx]
- "pages_threaddyeingpage": "ThreadDyeingPage.tsx" | kind=code-symbol | source=client/src/features/thread-dyeing/pages/ThreadDyeingPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, ReceiveDyeingDialog.tsx, ReceiveDyeingDialog(), SendDyeingDialog.tsx, SendDyeingDialog()]
- "components_planlabeltypeform": "PlanLabelTypeForm.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, PlanLabelTypeDialog.tsx, AppCard.tsx, AppCard]
- "forms_appinput": "AppInput.tsx" | kind=code-symbol | source=client/src/components/forms/AppInput.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BrandDialog.tsx, CompanyDialog.tsx, DispatchDialog.tsx, DispatchInfo.tsx, DyeThreadDialog.tsx]
- "components_work_order_row_actions": "work-order-row-actions.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-row-actions.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, cc50221 feat: dispatched status + FBR i…, work-order-columns.tsx, DispatchDialog.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@933ccd7f9240e4dba5c2bb6a4772c24f2f51054d": "933ccd7 feat: stock CRUD UI, operator type/avatar, artwork preview, production …" | kind=Commit | source=git | neighbors=[chore/ci, 9b99ce1 feat: complete production workf…, EditableLabelTypeTable.tsx, inventory-columns.tsx, inventory-stock-table.tsx, operator-columns.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@c27dc7dc04e1c465d4dc9b4fb4c38d9a66abaa2a": "c27dc7d feat(server): stock CRUD history, operator type/avatar, stage traceabil…" | kind=Commit | source=git | neighbors=[ab23f28 fix: tab switcher rendered unst…, routes.tsx, chore/ci, AppCard.tsx, 933ccd7 feat: stock CRUD UI, operator t…, combobox.tsx]
- "components_createproductionorderdialog": "CreateProductionOrderDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/CreateProductionOrderDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog(), CreateProductionOrderDialogProps, NotesForm, AppDialog.tsx]
- "components_operatordialog": "OperatorDialog.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, operator-row-actions.tsx, operator-table.tsx, DESIGNATION_OPTIONS]
- "feedback_statusbadge": "StatusBadge.tsx" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AvailabilityBadge.tsx, CreateProductionOrderDialog.tsx, InkStockPanel.tsx, inventory-columns.tsx]
- "services_production_order_service": "production-order-service.ts" | kind=code-symbol | source=client/src/features/production-orders/services/production-order-service.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, use-production-orders.ts, api.ts, api]
- "ui_button": "button.tsx" | kind=code-symbol | source=client/src/components/ui/button.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, LowStockAlert.tsx]
- "components_purchaseform": "PurchaseForm.tsx" | kind=code-symbol | source=client/src/features/purchases/components/PurchaseForm.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, purchase-row-actions.tsx, PurchaseForm(), PurchaseFormProps, AppDialog.tsx]
- "dialogs_appdialog": "AppDialog.tsx" | kind=code-symbol | source=client/src/components/dialogs/AppDialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BrandDialog.tsx, CompanyDialog.tsx, CreateProductionOrderDialog.tsx, DispatchDialog.tsx, DyeThreadDialog.tsx]
- "pages_inkconsumptionpage": "InkConsumptionPage.tsx" | kind=code-symbol | source=client/src/features/ink/pages/InkConsumptionPage.tsx:L1 | neighbors=[routes.tsx, 9b99ce1 feat: complete production workf…, ink-consumption-columns.tsx, inkConsumptionColumns(), InkConsumptionDialog.tsx, InkConsumptionDialog()]
- "app_routes": "routes.tsx" | kind=code-symbol | source=client/src/app/routes.tsx:L1 | neighbors=[AppRoutes.tsx, AppRoute, page(), RedirectRoute, redirects, routes]
- "components_work_order_table": "work-order-table.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-table.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, work-order-columns.tsx, workOrderColumns]
- "components_wovenproductionpanel": "WovenProductionPanel.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/WovenProductionPanel.tsx:L1 | neighbors=[3e6a631 feat: woven production client U…, 9b99ce1 feat: complete production workf…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard, StatCard.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-000.json

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
