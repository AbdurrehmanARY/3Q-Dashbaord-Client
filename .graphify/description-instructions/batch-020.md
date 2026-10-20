# Node Description Batch 21 of 74

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "batch_and_runs_batch_flow_repository_batchflowrepository_lockbatchandscopetx": ".lockBatchAndScopeTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L819 | neighbors=[BatchFlowRepository, .lockLineTx(), .scopeOfTx()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_logstagetx": ".logStageTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1299 | neighbors=[BatchFlowRepository, .flowInTx(), round2()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_releaseallsourcestx": ".releaseAllSourcesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1235 | neighbors=[BatchFlowRepository, .bumpConsumedTx(), .replaceSourcesTx()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_releasetosourcestx": ".releaseToSourcesTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1255 | neighbors=[BatchFlowRepository, .bumpConsumedTx(), round2()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_resynclinetx": ".resyncLineTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L1398 | neighbors=[BatchFlowRepository, .resyncLinesTx(), .flowInTx()] | lang=en
- "batch_and_runs_batch_flow_repository_batchflowrepository_scopeoftx": ".scopeOfTx()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L726 | neighbors=[BatchFlowRepository, .lockBatchAndScopeTx(), lineRefOfBatch()] | lang=en
- "batch_and_runs_batch_flow_repository_scopevalues": "scopeValues()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.repository.ts:L173 | neighbors=[batch-flow.repository.ts, .insertBatchTx(), lineValues()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_cancelbatch": ".cancelBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L483 | neighbors=[BatchFlowService, .assertBatchStage(), .getBatch()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_completebatch": ".completeBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L476 | neighbors=[BatchFlowService, .assertBatchStage(), .getBatch()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_recordoutput": ".recordOutput()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L469 | neighbors=[BatchFlowService, .assertBatchStage(), .getBatch()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_startbatch": ".startBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L462 | neighbors=[BatchFlowService, .assertBatchStage(), .getBatch()] | lang=en
- "batch_and_runs_batch_flow_service_batchflowservice_updatebatch": ".updateBatch()" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/batch-flow.service.ts:L455 | neighbors=[BatchFlowService, .assertBatchStage(), .getBatch()] | lang=en
- "batch_and_runs_production_run_service_productionrunservice": "ProductionRunService" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/production-run.service.ts:L6 | neighbors=[production-run.service.ts, .getProductionSummary(), .logProductionRun()] | lang=en
- "breadcrumb_appbreadcrumb_appbreadcrumb": "AppBreadcrumb()" | kind=code-symbol | source=client/src/shared/components/breadcrumb/AppBreadcrumb.tsx:L29 | neighbors=[AppBreadcrumb.tsx, pathToSegments(), AppHeader.tsx] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@19ed10f6c8aa70a8e3b42f91986cb5276e90c7b0": "19ed10f chore(server): rebuild committed api bundle" | kind=Commit | source=git | neighbors=[chore/ci, 748f587 chore: migration reconciliation…, 7318ae9 docs: memory-bank, corrected .c…] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@25b3e1ab29b3568b77bd363fb9b9a6e155831f07": "25b3e1a ci: add GitHub Actions pipeline (typecheck, lint, test, build)" | kind=Commit | source=git | neighbors=[chore/ci, f5f1f47 feat: woven labels foundation —…, c0c79ec Initial commit: Label Manufactu…] | lang=pt
- "commit:repo:local/3Q-facility-Dashboard@9740e304@7318ae9dcf7ad76bac5e208796f8275f6a05c46a": "7318ae9 docs: memory-bank, corrected .clinerules pipeline rules, agent tooling …" | kind=Commit | source=git | neighbors=[0daa333 feat(client): show live stock b…, chore/ci, 19ed10f chore(server): rebuild committe…] | lang=en
- "commit:repo:local/3Q-facility-Dashboard@9740e304@e4ae1ff9000a06f9278b20d5a67a94fd388ee3d8": "e4ae1ff chore: ignore graphify cache/output and local Claude settings" | kind=Commit | source=git | neighbors=[chore/ci, 13b0a3c chore(server): give vitest a fa…, ee6d4dd refactor(server): vertical-slic…] | lang=en
- "components_availabilitybadge_availabilitybadge": "AvailabilityBadge()" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L27 | neighbors=[AvailabilityBadge.tsx, machine-columns.tsx, operator-columns.tsx] | lang=en
- "components_branddialog_branddialog": "BrandDialog()" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L23 | neighbors=[brand-row-actions.tsx, BrandDialog.tsx, BrandTable.tsx] | lang=en
- "components_companydialog_companydialog": "CompanyDialog()" | kind=code-symbol | source=client/src/features/companies/components/CompanyDialog.tsx:L17 | neighbors=[company-row-actions.tsx, CompanyDialog.tsx, CompanyTable.tsx] | lang=en
- "components_dyethreaddialog_dyethreaddialog": "DyeThreadDialog()" | kind=code-symbol | source=client/src/features/thread/components/DyeThreadDialog.tsx:L25 | neighbors=[DyeThreadDialog.tsx, ThreadStockPanel.tsx, index.ts] | lang=en
- "components_inventory_stock_table_inventorystocktable": "InventoryStockTable()" | kind=code-symbol | source=client/src/features/inventory/components/inventory-stock-table.tsx:L30 | neighbors=[inventory-stock-table.tsx, InventoryStockPage.tsx, RollStockPage.tsx] | lang=en
- "components_machine_table_machinetable": "MachineTable()" | kind=code-symbol | source=client/src/features/machines-operators/components/machine-table.tsx:L18 | neighbors=[machine-table.tsx, MachinesOperatorsPage.tsx, MachinesPage.tsx] | lang=en
- "components_machinedialog_machinedialog": "MachineDialog()" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineDialog.tsx:L38 | neighbors=[machine-row-actions.tsx, machine-table.tsx, MachineDialog.tsx] | lang=en
- "components_machineselect_machineselect": "MachineSelect()" | kind=code-symbol | source=client/src/features/machines-operators/components/MachineSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, MachineSelect.tsx, index.ts] | lang=en
- "components_materialform_materialform": "MaterialForm()" | kind=code-symbol | source=client/src/features/materials/components/MaterialForm.tsx:L26 | neighbors=[material-row-actions.tsx, MaterialForm.tsx, MaterialMasterPage.tsx] | lang=en
- "components_operator_table_operatortable": "OperatorTable()" | kind=code-symbol | source=client/src/features/machines-operators/components/operator-table.tsx:L21 | neighbors=[operator-table.tsx, MachinesOperatorsPage.tsx, OperatorsPage.tsx] | lang=en
- "components_operatordialog_operatordialog": "OperatorDialog()" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorDialog.tsx:L38 | neighbors=[operator-row-actions.tsx, operator-table.tsx, OperatorDialog.tsx] | lang=en
- "components_operatorselect_operatorselect": "OperatorSelect()" | kind=code-symbol | source=client/src/features/machines-operators/components/OperatorSelect.tsx:L17 | neighbors=[LogProductionRunDialog.tsx, OperatorSelect.tsx, index.ts] | lang=en
- "components_planlabeltypedialog_planlabeltypedialog": "PlanLabelTypeDialog()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeDialog.tsx:L16 | neighbors=[PlanLabelTypeDialog.tsx, ProductionOrderDashboardPage.tsx, ProductionOrderPlanningPage.tsx] | lang=en
- "components_planlabeltypeform_planlabeltypeform": "PlanLabelTypeForm()" | kind=code-symbol | source=client/src/features/production-orders/components/PlanLabelTypeForm.tsx:L194 | neighbors=[PlanLabelTypeDialog.tsx, PlanLabelTypeForm.tsx, initialRow()] | lang=en
- "components_productionstatusbadge_productionlinestatusbadge": "ProductionLineStatusBadge()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionStatusBadge.tsx:L23 | neighbors=[LabelTypeRow.tsx, PlannedLabelTypesTable.tsx, ProductionStatusBadge.tsx] | lang=en
- "components_productionsummary_productionsummary": "ProductionSummary()" | kind=code-symbol | source=client/src/features/production-orders/components/ProductionSummary.tsx:L92 | neighbors=[ProductionSummary.tsx, ProductionOrderDashboardPage.tsx, index.ts] | lang=en
- "components_progress_bar_progressbar": "ProgressBar()" | kind=code-symbol | source=client/src/shared/components/progress-bar.tsx:L19 | neighbors=[progress-bar.tsx, roll-columns.tsx, woven-columns.tsx] | lang=en
- "components_progress_table_styles_stickycellclass": "stickyCellClass()" | kind=code-symbol | source=client/src/features/production-orders/components/progress-table-styles.ts:L44 | neighbors=[EditableLabelTypeTable.tsx, LabelTypeRow.tsx, progress-table-styles.ts] | lang=en
- "components_purchase_table_purchasetable": "PurchaseTable()" | kind=code-symbol | source=client/src/features/purchases/components/purchase-table.tsx:L46 | neighbors=[purchase-table.tsx, PurchaseRecordPage.tsx, RollPurchasesPage.tsx] | lang=en
- "components_rollstockdialog_rollstockdialog": "RollStockDialog()" | kind=code-symbol | source=client/src/features/inventory/components/RollStockDialog.tsx:L36 | neighbors=[inventory-stock-table.tsx, roll-stock-row-actions.tsx, RollStockDialog.tsx] | lang=en
- "components_sharedthreadallocation_sharedthreadallocation": "SharedThreadAllocation()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L124 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, threadAllocationRowErrors()] | lang=en
- "components_sharedthreadallocation_threadallocationrowerrors": "threadAllocationRowErrors()" | kind=code-symbol | source=client/src/features/production-orders/components/SharedThreadAllocation.tsx:L95 | neighbors=[PlanLabelTypeForm.tsx, SharedThreadAllocation.tsx, SharedThreadAllocation()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-020.json

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
