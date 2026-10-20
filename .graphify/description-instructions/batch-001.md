# Node Description Batch 2 of 74

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

- "batch_and_runs_batch_flow_repository_batchflowrepository": "BatchFlowRepository" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L178 | neighbors=[batch-flow.repository.ts, .assertResourcesFreeTx(), .assertStageResources(), .attachSources(), .bumpConsumedTx(), .cancelBatch()]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@c27dc7dc04e1c465d4dc9b4fb4c38d9a66abaa2a": "c27dc7d feat(server): stock CRUD history, operator type/avatar, stage traceabil…" | kind=Commit | source=git | neighbors=[ab23f28 fix: tab switcher rendered unst…, routes.tsx, chore/ci, AppCard.tsx, 933ccd7 feat: stock CRUD UI, operator t…, combobox.tsx]
- "components_createproductionorderdialog": "CreateProductionOrderDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/CreateProductionOrderDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, CreateProductionOrderDialog(), CreateProductionOrderDialogProps, NotesForm, AppDialog.tsx]
- "components_operatordialog": "OperatorDialog.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, operator-row-actions.tsx, operator-table.tsx, DESIGNATION_OPTIONS]
- "db_index": "index.ts" | kind=code-symbol | source=server/src/shared/db/index.ts:L1 | neighbors=[analytics.repository.ts, batch-flow.repository.ts, production-run.repository.ts, ee6d4dd refactor(server): vertical-slic…, company.repository.ts, clear-all-tables.ts]
- "pages_inkconsumptionpage": "InkConsumptionPage.tsx" | kind=code-symbol | source=client/src/features/ink/pages/InkConsumptionPage.tsx:L1 | neighbors=[routes.tsx, 2c8bd34 feat(client): per-table column …, 9b99ce1 feat: complete production workf…, ink-consumption-columns.tsx, inkConsumptionColumns(), InkConsumptionDialog.tsx]
- "ui_button": "button.tsx" | kind=code-symbol | source=client/src/components/ui/button.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, date-picker.tsx, EditableLabelTypeTable.tsx, LowStockAlert.tsx]
- "commit:repo:local/3Q-facility-Dashboard@9740e304@933ccd7f9240e4dba5c2bb6a4772c24f2f51054d": "933ccd7 feat: stock CRUD UI, operator type/avatar, artwork preview, production …" | kind=Commit | source=git | neighbors=[chore/ci, 9b99ce1 feat: complete production workf…, EditableLabelTypeTable.tsx, inventory-columns.tsx, inventory-stock-table.tsx, operator-columns.tsx]
- "components_purchaseform": "PurchaseForm.tsx" | kind=code-symbol | source=client/src/features/purchases/components/PurchaseForm.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, purchase-row-actions.tsx, PurchaseForm(), PurchaseFormProps, AppDialog.tsx]
- "components_work_order_table": "work-order-table.tsx" | kind=code-symbol | source=client/src/features/work-orders/components/work-order-table.tsx:L1 | neighbors=[09c4b95 feat: dispatch dialog, product-…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, c401a21 feat(client): weaving-time disp…, work-order-columns.tsx]
- "app_routes": "routes.tsx" | kind=code-symbol | source=client/src/app/routes.tsx:L1 | neighbors=[AppRoutes.tsx, AppRoute, page(), RedirectRoute, redirects, routes]
- "constants_messages": "messages.ts" | kind=code-symbol | source=server/src/shared/constants/messages.ts:L1 | neighbors=[batch-flow.service.ts, production-run.service.ts, cd392dc feat(label-types): add label ty…, ee6d4dd refactor(server): vertical-slic…, company.service.ts, Entity]
- "work_orders_types": "types.ts" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, b7b6ac9 feat: merge woven labels into t…, c0c79ec Initial commit: Label Manufactu…, c401a21 feat(client): weaving-time disp…, cc50221 feat: dispatched status + FBR i…]
- "cards_appcard": "AppCard.tsx" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L1 | neighbors=[AppCard, AppCardProps, utils.ts, cn(), card.tsx, Card()]
- "components_planlabeltypedialog": "PlanLabelTypeDialog.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, UnifiedPlanningDialog(), UnifiedPlanningDialogProps, PlanLabelTypeForm.tsx, PlanFormSubmitPayload]
- "hooks_use_batches": "use-batches.ts" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-batches.ts:L1 | neighbors=[0a3ef12 fix(production): order-scoped c…, 7d4a38d feat(client): batch planning an…, 95ce13e feat(production): make cutting …, BatchOutputDialog.tsx, BatchStageBoard.tsx, BatchTraceDialog.tsx]
- "pages_productionorderplanningpage": "ProductionOrderPlanningPage.tsx" | kind=code-symbol | source=client/src/features/production-orders/pages/ProductionOrderPlanningPage.tsx:L1 | neighbors=[routes.tsx, 7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, AppCard.tsx, AppCard]
- "production_orders_production_order_repository_productionorderrepository": "ProductionOrderRepository" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.repository.ts:L110 | neighbors=[production-order.repository.ts, .applyLineChangeTransaction(), .create(), .createLinePlanTransaction(), .createWithWorkOrderStatusTx(), .delete()]
- "relations_index": "index.ts" | kind=code-symbol | source=server/src/shared/db/relations/index.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, schema.ts, batchConsumptionsRelations, brandsRelations, companiesRelations, inventoryRollsRelations]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=client/src/components/ui/dropdown-menu.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-row-actions.tsx, company-row-actions.tsx, EditableLabelTypeTable.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "branch:repo:local/3Q-facility-Dashboard@9740e304#chore/ci": "chore/ci" | kind=Branch | source=git | neighbors=[09c4b95 feat: dispatch dialog, product-…, 0a3ef12 fix(production): order-scoped c…, 0daa333 feat(client): show live stock b…, 13b0a3c chore(server): give vitest a fa…, 19ed10f chore(server): rebuild committe…, 25b3e1a ci: add GitHub Actions pipeline…]
- "components_brand_row_actions": "brand-row-actions.tsx" | kind=code-symbol | source=client/src/features/companies/components/brand-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, brand-columns.tsx, types.ts, Brand, Company, BrandRowActions()]
- "components_labeltyperow": "LabelTypeRow.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/LabelTypeRow.tsx:L1 | neighbors=[7d4a38d feat(client): batch planning an…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, f5f1f47 feat: woven labels foundation —…, EditableLabelTypeTable.tsx, EMPTY_ERRORS]
- "components_operator_table": "operator-table.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L1 | neighbors=[933ccd7 feat: stock CRUD UI, operator t…, 9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, AppCard.tsx, AppCard]
- "components_purchase_row_actions": "purchase-row-actions.tsx" | kind=code-symbol | source=client/src/features/purchases/components/purchase-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, purchase-columns.tsx, PurchaseRowActions(), PurchaseForm.tsx, PurchaseForm(), AppButton.tsx]
- "db_seed_master": "seed-master.ts" | kind=code-symbol | source=server/src/shared/db/seed-master.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, index.ts, db, schema.ts, seed-data.ts, COMPANIES]
- "forms_appinput_appinput": "AppInput" | kind=code-symbol | source=client/src/components/forms/AppInput.tsx:L12 | neighbors=[BatchOutputDialog.tsx, BrandDialog.tsx, CompanyDialog.tsx, CreateBatchDialog.tsx, DispatchDialog.tsx, DispatchInfo.tsx]
- "components_company_row_actions": "company-row-actions.tsx" | kind=code-symbol | source=client/src/features/companies/components/company-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, company-columns.tsx, types.ts, Company, CompanyRowActions(), CompanyDialog.tsx]
- "components_machine_row_actions": "machine-row-actions.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, machine-columns.tsx, MachineRowActions(), MachineDialog.tsx, MachineDialog(), AppButton.tsx]
- "components_material_row_actions": "material-row-actions.tsx" | kind=code-symbol | source=client/src/features/materials/components/material-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, material-columns.tsx, MaterialRowActions(), MaterialForm.tsx, MaterialForm(), AppButton.tsx]
- "components_materialreceiptpage": "MaterialReceiptPage.tsx" | kind=code-symbol | source=client/src/features/materials/components/MaterialReceiptPage.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, MaterialReceiptPage(), ReceiptFormDialog(), index.ts, AppDialog.tsx, AppDialog()]
- "components_operator_row_actions": "operator-row-actions.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-row-actions.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, operator-columns.tsx, OperatorRowActions(), OperatorDialog.tsx, OperatorDialog(), AppButton.tsx]
- "components_production_order_row_actions": "production-order-row-actions.tsx" | kind=code-symbol | source=client/src/features/production-orders/components/production-order-row-actions.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, c27dc7d feat(server): stock CRUD histor…, production-order-columns.tsx, ProductionOrderRowActions(), AppButton.tsx]
- "thread_index": "index.ts" | kind=code-symbol | source=client/src/features/thread/index.ts:L1 | neighbors=[95aebc1 feat: thread receiving, stock a…, 9b99ce1 feat: complete production workf…, PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, DyedThreadStockPage.tsx, InventoryStockPage.tsx]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=client/src/components/ui/alert-dialog.tsx:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…, BatchStageBoard.tsx, brand-row-actions.tsx, company-row-actions.tsx, machine-row-actions.tsx, material-row-actions.tsx]
- "components_logproductionrundialog": "LogProductionRunDialog.tsx" | kind=code-symbol | source=client/src/features/production-runs/components/LogProductionRunDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, FormValues, LogProductionRunDialog(), LogProductionRunDialogProps, MachineSelect.tsx, MachineSelect()]
- "components_machinedialog": "MachineDialog.tsx" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, machine-row-actions.tsx, machine-table.tsx, MachineDialog(), MachineDialogProps]
- "db_index_db": "db" | kind=code-symbol | source=server/src/shared/db/index.ts:L3 | neighbors=[analytics.repository.ts, batch-flow.repository.ts, production-run.repository.ts, company.repository.ts, clear-all-tables.ts, index.ts]
- "layout_pageheader": "PageHeader.tsx" | kind=code-symbol | source=client/src/components/layout/PageHeader.tsx:L1 | neighbors=[9b99ce1 feat: complete production workf…, c0c79ec Initial commit: Label Manufactu…, MaterialReceiptPage.tsx, index.ts, PageHeader(), PageHeaderProps]
- "production_orders_production_order_service_productionorderservice": "ProductionOrderService" | kind=code-symbol | source=server/src/modules/production/production-orders/production-order.service.ts:L39 | neighbors=[production-order.service.ts, .assertResourcesFree(), .assignLineResources(), .buildPlanRow(), .completeProductionOrder(), .createProductionOrder()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-001.json

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
