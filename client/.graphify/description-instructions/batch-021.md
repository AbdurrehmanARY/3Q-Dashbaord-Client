# Node Description Batch 22 of 38

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

- "production_orders_batch_types_stages_of": "STAGES_OF" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L14 | neighbors=[StageProgressBars.tsx, batch-types.ts]
- "production_orders_label_types_label_types": "LABEL_TYPES" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L13 | neighbors=[PlanLabelTypeForm.tsx, label-types.ts]
- "production_orders_types_availableresources": "AvailableResources" | kind=code-symbol | source=src/features/production-orders/types.ts:L359 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_eligiblesalesorder": "EligibleSalesOrder" | kind=code-symbol | source=src/features/production-orders/types.ts:L25 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionlinestatus": "ProductionLineStatus" | kind=code-symbol | source=src/features/production-orders/types.ts:L6 | neighbors=[ProductionStatusBadge.tsx, types.ts]
- "production_orders_types_productionorderline": "ProductionOrderLine" | kind=code-symbol | source=src/features/production-orders/types.ts:L70 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionrollissuance": "ProductionRollIssuance" | kind=code-symbol | source=src/features/production-orders/types.ts:L376 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_types_productionstageevent": "ProductionStageEvent" | kind=code-symbol | source=src/features/production-orders/types.ts:L316 | neighbors=[types.ts, production-order-service.ts]
- "production_orders_woven_types_woventhread": "WovenThread" | kind=code-symbol | source=src/features/production-orders/woven-types.ts:L5 | neighbors=[WovenThreadReconciliationCard.tsx, woven-types.ts]
- "production_runs_types_run_reasons": "RUN_REASONS" | kind=code-symbol | source=src/features/production-runs/types.ts:L10 | neighbors=[LogProductionRunDialog.tsx, types.ts]
- "production_runs_types_runreason": "RunReason" | kind=code-symbol | source=src/features/production-runs/types.ts:L1 | neighbors=[LogProductionRunDialog.tsx, types.ts]
- "providers_layoutprovider_layoutprovider": "LayoutProvider()" | kind=code-symbol | source=src/app/providers/LayoutProvider.tsx:L8 | neighbors=[AppProviders.tsx, LayoutProvider.tsx]
- "providers_queryprovider_queryprovider": "QueryProvider()" | kind=code-symbol | source=src/app/providers/QueryProvider.tsx:L6 | neighbors=[AppProviders.tsx, QueryProvider.tsx]
- "providers_themeprovider_themeprovider": "ThemeProvider()" | kind=code-symbol | source=src/app/providers/ThemeProvider.tsx:L10 | neighbors=[AppProviders.tsx, ThemeProvider.tsx]
- "providers_toastprovider_toastprovider": "ToastProvider()" | kind=code-symbol | source=src/app/providers/ToastProvider.tsx:L4 | neighbors=[ToastProvider.tsx, App.tsx]
- "schemas_company_schemas_companyschema": "companySchema" | kind=code-symbol | source=src/features/companies/schemas/company-schemas.ts:L3 | neighbors=[CompanyDialog.tsx, company-schemas.ts]
- "schemas_company_schemas_companyschemainput": "CompanySchemaInput" | kind=code-symbol | source=src/features/companies/schemas/company-schemas.ts:L15 | neighbors=[CompanyDialog.tsx, company-schemas.ts]
- "schemas_entity_schemas_machineschema": "machineSchema" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L8 | neighbors=[MachineDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_machineschemainput": "MachineSchemaInput" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L29 | neighbors=[MachineDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_operatorschema": "operatorSchema" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L18 | neighbors=[OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_operatorschemainput": "OperatorSchemaInput" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L30 | neighbors=[OperatorDialog.tsx, entity-schemas.ts]
- "schemas_entity_schemas_shifts": "SHIFTS" | kind=code-symbol | source=src/features/machines-operators/schemas/entity-schemas.ts:L5 | neighbors=[OperatorDialog.tsx, entity-schemas.ts]
- "schemas_ink_schemas_inkconsumptionschema": "inkConsumptionSchema" | kind=code-symbol | source=src/features/ink/schemas/ink-schemas.ts:L13 | neighbors=[InkConsumptionDialog.tsx, ink-schemas.ts]
- "schemas_ink_schemas_inkconsumptionschemainput": "InkConsumptionSchemaInput" | kind=code-symbol | source=src/features/ink/schemas/ink-schemas.ts:L20 | neighbors=[InkConsumptionDialog.tsx, ink-schemas.ts]
- "schemas_ink_schemas_inkpurchaseschema": "inkPurchaseSchema" | kind=code-symbol | source=src/features/ink/schemas/ink-schemas.ts:L3 | neighbors=[InkPurchaseDialog.tsx, ink-schemas.ts]
- "schemas_ink_schemas_inkpurchaseschemainput": "InkPurchaseSchemaInput" | kind=code-symbol | source=src/features/ink/schemas/ink-schemas.ts:L11 | neighbors=[InkPurchaseDialog.tsx, ink-schemas.ts]
- "schemas_label_type_schemas_createlabeltypeschema": "createLabelTypeSchema" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L12 | neighbors=[CreateLabelTypeDialog.tsx, label-type-schemas.ts]
- "schemas_label_type_schemas_updatelabeltypeschema": "updateLabelTypeSchema" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L17 | neighbors=[CreateLabelTypeDialog.tsx, label-type-schemas.ts]
- "schemas_material_schemas_material_descriptions": "MATERIAL_DESCRIPTIONS" | kind=code-symbol | source=src/features/materials/schemas/material-schemas.ts:L27 | neighbors=[MaterialForm.tsx, material-schemas.ts]
- "schemas_material_schemas_materialschema": "materialSchema" | kind=code-symbol | source=src/features/materials/schemas/material-schemas.ts:L3 | neighbors=[MaterialForm.tsx, material-schemas.ts]
- "schemas_material_schemas_materialschemainput": "MaterialSchemaInput" | kind=code-symbol | source=src/features/materials/schemas/material-schemas.ts:L10 | neighbors=[MaterialForm.tsx, material-schemas.ts]
- "schemas_production_order_schemas_printedplanformschema": "printedPlanFormSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L121 | neighbors=[PlanLabelTypeForm.tsx, production-order-schemas.ts]
- "schemas_production_order_schemas_wovenplanformschema": "wovenPlanFormSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L125 | neighbors=[PlanLabelTypeForm.tsx, production-order-schemas.ts]
- "schemas_purchase_schemas_purchaseschema": "purchaseSchema" | kind=code-symbol | source=src/features/purchases/schemas/purchase-schemas.ts:L7 | neighbors=[PurchaseForm.tsx, purchase-schemas.ts]
- "schemas_purchase_schemas_purchaseschemainput": "PurchaseSchemaInput" | kind=code-symbol | source=src/features/purchases/schemas/purchase-schemas.ts:L22 | neighbors=[PurchaseForm.tsx, purchase-schemas.ts]
- "schemas_thread_schemas_dyebatchschema": "dyeBatchSchema" | kind=code-symbol | source=src/features/thread/schemas/thread-schemas.ts:L19 | neighbors=[DyeThreadDialog.tsx, thread-schemas.ts]
- "schemas_thread_schemas_dyebatchschemainput": "DyeBatchSchemaInput" | kind=code-symbol | source=src/features/thread/schemas/thread-schemas.ts:L36 | neighbors=[DyeThreadDialog.tsx, thread-schemas.ts]
- "schemas_thread_schemas_threadpurchaseschema": "threadPurchaseSchema" | kind=code-symbol | source=src/features/thread/schemas/thread-schemas.ts:L8 | neighbors=[ThreadPurchasePanel.tsx, thread-schemas.ts]
- "schemas_thread_schemas_threadpurchaseschemainput": "ThreadPurchaseSchemaInput" | kind=code-symbol | source=src/features/thread/schemas/thread-schemas.ts:L35 | neighbors=[ThreadPurchasePanel.tsx, thread-schemas.ts]
- "schemas_work_order_schemas_dispatchschema": "dispatchSchema" | kind=code-symbol | source=src/features/work-orders/schemas/work-order-schemas.ts:L94 | neighbors=[DispatchDialog.tsx, work-order-schemas.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-021.json

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
