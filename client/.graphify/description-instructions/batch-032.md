# Node Description Batch 33 of 38

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

- "pages_workorderdetailpage_wovenproductiondetailview": "WovenProductionDetailView()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderDetailPage.tsx:L475 | neighbors=[WorkOrderDetailPage.tsx]
- "pages_workorderlistpage_workorderlistpage": "WorkOrderListPage()" | kind=code-symbol | source=src/features/work-orders/pages/WorkOrderListPage.tsx:L8 | neighbors=[WorkOrderListPage.tsx]
- "postcss_config": "postcss.config.js" | kind=code-symbol | source=postcss.config.js:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "production_orders_batch_types_batchsourceedge": "BatchSourceEdge" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L25 | neighbors=[batch-types.ts]
- "production_orders_batch_types_sourceallocationinput": "SourceAllocationInput" | kind=code-symbol | source=src/features/production-orders/batch-types.ts:L213 | neighbors=[batch-types.ts]
- "production_orders_label_types_labeltype": "LabelType" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L14 | neighbors=[label-types.ts]
- "production_orders_label_types_sizelabel": "sizeLabel()" | kind=code-symbol | source=src/features/production-orders/label-types.ts:L31 | neighbors=[label-types.ts]
- "production_orders_types_completionreporttotals": "CompletionReportTotals" | kind=code-symbol | source=src/features/production-orders/types.ts:L467 | neighbors=[types.ts]
- "production_orders_types_completionstagedetail": "CompletionStageDetail" | kind=code-symbol | source=src/features/production-orders/types.ts:L439 | neighbors=[types.ts]
- "production_orders_types_labeltypewaste": "LabelTypeWaste" | kind=code-symbol | source=src/features/production-orders/types.ts:L461 | neighbors=[types.ts]
- "production_orders_types_linecutting": "LineCutting" | kind=code-symbol | source=src/features/production-orders/types.ts:L160 | neighbors=[types.ts]
- "production_orders_types_lineliveprogress": "LineLiveProgress" | kind=code-symbol | source=src/features/production-orders/types.ts:L183 | neighbors=[types.ts]
- "production_orders_types_linematerial": "LineMaterial" | kind=code-symbol | source=src/features/production-orders/types.ts:L128 | neighbors=[types.ts]
- "production_orders_types_linepackaging": "LinePackaging" | kind=code-symbol | source=src/features/production-orders/types.ts:L172 | neighbors=[types.ts]
- "production_orders_types_lineprinting": "LinePrinting" | kind=code-symbol | source=src/features/production-orders/types.ts:L147 | neighbors=[types.ts]
- "production_orders_types_linereadiness": "LineReadiness" | kind=code-symbol | source=src/features/production-orders/types.ts:L142 | neighbors=[types.ts]
- "production_orders_types_linereconciliation": "LineReconciliation" | kind=code-symbol | source=src/features/production-orders/types.ts:L198 | neighbors=[types.ts]
- "production_orders_types_machineavailability": "MachineAvailability" | kind=code-symbol | source=src/features/production-orders/types.ts:L366 | neighbors=[types.ts]
- "production_orders_types_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=src/features/production-orders/types.ts:L367 | neighbors=[types.ts]
- "production_orders_types_operatorwasteentry": "OperatorWasteEntry" | kind=code-symbol | source=src/features/production-orders/types.ts:L455 | neighbors=[types.ts]
- "production_orders_types_productioneventtype": "ProductionEventType" | kind=code-symbol | source=src/features/production-orders/types.ts:L307 | neighbors=[types.ts]
- "production_orders_types_productionorderheader": "ProductionOrderHeader" | kind=code-symbol | source=src/features/production-orders/types.ts:L248 | neighbors=[types.ts]
- "production_orders_types_productionordertotals": "ProductionOrderTotals" | kind=code-symbol | source=src/features/production-orders/types.ts:L272 | neighbors=[types.ts]
- "production_orders_types_resourceavailability": "ResourceAvailability" | kind=code-symbol | source=src/features/production-orders/types.ts:L370 | neighbors=[types.ts]
- "production_orders_types_stageinventoryposition": "StageInventoryPosition" | kind=code-symbol | source=src/features/production-orders/types.ts:L213 | neighbors=[types.ts]
- "production_orders_types_transfertarget": "TransferTarget" | kind=code-symbol | source=src/features/production-orders/types.ts:L9 | neighbors=[types.ts]
- "production_orders_types_user": "User" | kind=code-symbol | source=src/features/production-orders/types.ts:L13 | neighbors=[types.ts]
- "production_orders_types_userrole": "UserRole" | kind=code-symbol | source=src/features/production-orders/types.ts:L11 | neighbors=[types.ts]
- "production_orders_types_wastebreakdownentry": "WasteBreakdownEntry" | kind=code-symbol | source=src/features/production-orders/types.ts:L448 | neighbors=[types.ts]
- "production_runs_types_machinebreakdown": "MachineBreakdown" | kind=code-symbol | source=src/features/production-runs/types.ts:L47 | neighbors=[types.ts]
- "production_runs_types_operatorbreakdown": "OperatorBreakdown" | kind=code-symbol | source=src/features/production-runs/types.ts:L54 | neighbors=[types.ts]
- "schemas_company_schemas_brandschema": "brandSchema" | kind=code-symbol | source=src/features/companies/schemas/company-schemas.ts:L17 | neighbors=[company-schemas.ts]
- "schemas_company_schemas_brandschemainput": "BrandSchemaInput" | kind=code-symbol | source=src/features/companies/schemas/company-schemas.ts:L22 | neighbors=[company-schemas.ts]
- "schemas_label_type_schemas_labeltypeformdata": "LabelTypeFormData" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L23 | neighbors=[label-type-schemas.ts]
- "schemas_label_type_schemas_labeltypeschema": "labelTypeSchema" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L3 | neighbors=[label-type-schemas.ts]
- "schemas_label_type_schemas_updatelabeltypeformdata": "UpdateLabelTypeFormData" | kind=code-symbol | source=src/features/label-types/schemas/label-type-schemas.ts:L24 | neighbors=[label-type-schemas.ts]
- "schemas_production_order_schemas_assignresourcesschema": "assignResourcesSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L62 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_assignresourcesschemainput": "AssignResourcesSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L75 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_createproductionorderschema": "createProductionOrderSchema" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L3 | neighbors=[production-order-schemas.ts]
- "schemas_production_order_schemas_createproductionorderschemainput": "CreateProductionOrderSchemaInput" | kind=code-symbol | source=src/features/production-orders/schemas/production-order-schemas.ts:L49 | neighbors=[production-order-schemas.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-032.json

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
