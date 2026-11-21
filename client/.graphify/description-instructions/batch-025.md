# Node Description Batch 26 of 38

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

- "work_orders_types_workorderstatus": "WorkOrderStatus" | kind=code-symbol | source=src/features/work-orders/types.ts:L10 | neighbors=[work-order-table.tsx, types.ts]
- "app_approutes_pagefallback": "PageFallback()" | kind=code-symbol | source=src/app/AppRoutes.tsx:L6 | neighbors=[AppRoutes.tsx]
- "app_routes_approute": "AppRoute" | kind=code-symbol | source=src/app/routes.tsx:L7 | neighbors=[routes.tsx]
- "app_routes_page": "page()" | kind=code-symbol | source=src/app/routes.tsx:L18 | neighbors=[routes.tsx]
- "app_routes_redirectroute": "RedirectRoute" | kind=code-symbol | source=src/app/routes.tsx:L13 | neighbors=[routes.tsx]
- "cards_appcard_appcardprops": "AppCardProps" | kind=code-symbol | source=src/components/cards/AppCard.tsx:L12 | neighbors=[AppCard.tsx]
- "cards_statcard_statcardprops": "StatCardProps" | kind=code-symbol | source=src/components/cards/StatCard.tsx:L9 | neighbors=[StatCard.tsx]
- "cards_statcard_statcardskeleton": "StatCardSkeleton()" | kind=code-symbol | source=src/components/cards/StatCard.tsx:L103 | neighbors=[StatCard.tsx]
- "cards_statcard_trenddirection": "TrendDirection" | kind=code-symbol | source=src/components/cards/StatCard.tsx:L7 | neighbors=[StatCard.tsx]
- "command_palette_commandpalette_commandpaletteprops": "CommandPaletteProps" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L24 | neighbors=[CommandPalette.tsx]
- "command_palette_commandpalette_commandpalettetriggerprops": "CommandPaletteTriggerProps" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L106 | neighbors=[CommandPalette.tsx]
- "command_palette_commandpalette_commands": "COMMANDS" | kind=code-symbol | source=src/shared/components/command-palette/CommandPalette.tsx:L30 | neighbors=[CommandPalette.tsx]
- "companies_types_brandinput": "BrandInput" | kind=code-symbol | source=src/features/companies/types.ts:L28 | neighbors=[types.ts]
- "companies_types_companyinput": "CompanyInput" | kind=code-symbol | source=src/features/companies/types.ts:L22 | neighbors=[types.ts]
- "components_availabilitybadge_availabilitybadgeprops": "AvailabilityBadgeProps" | kind=code-symbol | source=src/features/machines-operators/components/AvailabilityBadge.tsx:L21 | neighbors=[AvailabilityBadge.tsx]
- "components_availabilitybadge_variants": "VARIANTS" | kind=code-symbol | source=src/features/machines-operators/components/AvailabilityBadge.tsx:L8 | neighbors=[AvailabilityBadge.tsx]
- "components_batchoutputdialog_batchoutputdialogprops": "BatchOutputDialogProps" | kind=code-symbol | source=src/features/production-orders/components/BatchOutputDialog.tsx:L14 | neighbors=[BatchOutputDialog.tsx]
- "components_batchstageboard_batchrow": "BatchRow()" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L365 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_batchstageboardprops": "BatchStageBoardProps" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L88 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_rowaction": "RowAction()" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L570 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stage_accent": "STAGE_ACCENT" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L64 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stage_icon": "STAGE_ICON" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L56 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stagepanel": "StagePanel()" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L197 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L80 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_status_variant": "STATUS_VARIANT" | kind=code-symbol | source=src/features/production-orders/components/BatchStageBoard.tsx:L72 | neighbors=[BatchStageBoard.tsx]
- "components_batchtracedialog_batchtracedialogprops": "BatchTraceDialogProps" | kind=code-symbol | source=src/features/production-orders/components/BatchTraceDialog.tsx:L8 | neighbors=[BatchTraceDialog.tsx]
- "components_batchtracedialog_tracelist": "TraceList()" | kind=code-symbol | source=src/features/production-orders/components/BatchTraceDialog.tsx:L54 | neighbors=[BatchTraceDialog.tsx]
- "components_branddialog_branddialogprops": "BrandDialogProps" | kind=code-symbol | source=src/features/companies/components/BrandDialog.tsx:L16 | neighbors=[BrandDialog.tsx]
- "components_branddialog_brandinput": "BrandInput" | kind=code-symbol | source=src/features/companies/components/BrandDialog.tsx:L14 | neighbors=[BrandDialog.tsx]
- "components_branddialog_brandschema": "brandSchema" | kind=code-symbol | source=src/features/companies/components/BrandDialog.tsx:L11 | neighbors=[BrandDialog.tsx]
- "components_brandtable_brandtableprops": "BrandTableProps" | kind=code-symbol | source=src/features/companies/components/BrandTable.tsx:L12 | neighbors=[BrandTable.tsx]
- "components_companydialog_companydialogprops": "CompanyDialogProps" | kind=code-symbol | source=src/features/companies/components/CompanyDialog.tsx:L11 | neighbors=[CompanyDialog.tsx]
- "components_companyselect_companyselectprops": "CompanySelectProps" | kind=code-symbol | source=src/features/companies/components/CompanySelect.tsx:L5 | neighbors=[CompanySelect.tsx]
- "components_companytable_companytableprops": "CompanyTableProps" | kind=code-symbol | source=src/features/companies/components/CompanyTable.tsx:L12 | neighbors=[CompanyTable.tsx]
- "components_createbatchdialog_createbatchdialogprops": "CreateBatchDialogProps" | kind=code-symbol | source=src/features/production-orders/components/CreateBatchDialog.tsx:L24 | neighbors=[CreateBatchDialog.tsx]
- "components_createlabeltypedialog_createformdata": "CreateFormData" | kind=code-symbol | source=src/features/label-types/components/CreateLabelTypeDialog.tsx:L13 | neighbors=[CreateLabelTypeDialog.tsx]
- "components_createlabeltypedialog_createlabeltypedialogprops": "CreateLabelTypeDialogProps" | kind=code-symbol | source=src/features/label-types/components/CreateLabelTypeDialog.tsx:L16 | neighbors=[CreateLabelTypeDialog.tsx]
- "components_createlabeltypedialog_updateformdata": "UpdateFormData" | kind=code-symbol | source=src/features/label-types/components/CreateLabelTypeDialog.tsx:L14 | neighbors=[CreateLabelTypeDialog.tsx]
- "components_createproductionorderdialog_createproductionorderdialogprops": "CreateProductionOrderDialogProps" | kind=code-symbol | source=src/features/production-orders/components/CreateProductionOrderDialog.tsx:L16 | neighbors=[CreateProductionOrderDialog.tsx]
- "components_createproductionorderdialog_notesform": "NotesForm" | kind=code-symbol | source=src/features/production-orders/components/CreateProductionOrderDialog.tsx:L24 | neighbors=[CreateProductionOrderDialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-025.json

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
