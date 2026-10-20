# Node Description Batch 46 of 74

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

- "companies_company_service_brandservice_deletebrand": ".deleteBrand()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L73 | neighbors=[BrandService]
- "companies_company_service_brandservice_getbrand": ".getBrand()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L47 | neighbors=[BrandService]
- "companies_company_service_brandservice_getbrands": ".getBrands()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L43 | neighbors=[BrandService]
- "companies_company_service_brandservice_getbrandsbycompany": ".getBrandsByCompany()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L53 | neighbors=[BrandService]
- "companies_company_service_brandservice_updatebrand": ".updateBrand()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L65 | neighbors=[BrandService]
- "companies_company_service_companyservice_createcompany": ".createCompany()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L21 | neighbors=[CompanyService]
- "companies_company_service_companyservice_deletecompany": ".deleteCompany()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L35 | neighbors=[CompanyService]
- "companies_company_service_companyservice_getcompanies": ".getCompanies()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L7 | neighbors=[CompanyService]
- "companies_company_service_companyservice_getcompanybyid": ".getCompanyById()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L11 | neighbors=[CompanyService]
- "companies_company_service_companyservice_getcompanybyname": ".getCompanyByName()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L17 | neighbors=[CompanyService]
- "companies_company_service_companyservice_updatecompany": ".updateCompany()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L27 | neighbors=[CompanyService]
- "companies_types_brandinput": "BrandInput" | kind=code-symbol | source=client/src/features/companies/types.ts:L28 | neighbors=[types.ts]
- "companies_types_companyinput": "CompanyInput" | kind=code-symbol | source=client/src/features/companies/types.ts:L22 | neighbors=[types.ts]
- "components_availabilitybadge_availabilitybadgeprops": "AvailabilityBadgeProps" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L21 | neighbors=[AvailabilityBadge.tsx]
- "components_availabilitybadge_variants": "VARIANTS" | kind=code-symbol | source=client/src/features/machines-operators/components/AvailabilityBadge.tsx:L8 | neighbors=[AvailabilityBadge.tsx]
- "components_batchoutputdialog_batchoutputdialogprops": "BatchOutputDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/BatchOutputDialog.tsx:L14 | neighbors=[BatchOutputDialog.tsx]
- "components_batchstageboard_batchrow": "BatchRow()" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L347 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_batchstageboardprops": "BatchStageBoardProps" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L86 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_rowaction": "RowAction()" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L549 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stage_accent": "STAGE_ACCENT" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L62 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stage_icon": "STAGE_ICON" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L54 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_stagepanel": "StagePanel()" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L182 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_status_label": "STATUS_LABEL" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L78 | neighbors=[BatchStageBoard.tsx]
- "components_batchstageboard_status_variant": "STATUS_VARIANT" | kind=code-symbol | source=client/src/features/production-orders/components/BatchStageBoard.tsx:L70 | neighbors=[BatchStageBoard.tsx]
- "components_batchtracedialog_batchtracedialogprops": "BatchTraceDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/BatchTraceDialog.tsx:L8 | neighbors=[BatchTraceDialog.tsx]
- "components_batchtracedialog_tracelist": "TraceList()" | kind=code-symbol | source=client/src/features/production-orders/components/BatchTraceDialog.tsx:L54 | neighbors=[BatchTraceDialog.tsx]
- "components_branddialog_branddialogprops": "BrandDialogProps" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L16 | neighbors=[BrandDialog.tsx]
- "components_branddialog_brandinput": "BrandInput" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L14 | neighbors=[BrandDialog.tsx]
- "components_branddialog_brandschema": "brandSchema" | kind=code-symbol | source=client/src/features/companies/components/BrandDialog.tsx:L11 | neighbors=[BrandDialog.tsx]
- "components_brandtable_brandtableprops": "BrandTableProps" | kind=code-symbol | source=client/src/features/companies/components/BrandTable.tsx:L12 | neighbors=[BrandTable.tsx]
- "components_companydialog_companydialogprops": "CompanyDialogProps" | kind=code-symbol | source=client/src/features/companies/components/CompanyDialog.tsx:L11 | neighbors=[CompanyDialog.tsx]
- "components_companyselect_companyselectprops": "CompanySelectProps" | kind=code-symbol | source=client/src/features/companies/components/CompanySelect.tsx:L5 | neighbors=[CompanySelect.tsx]
- "components_companytable_companytableprops": "CompanyTableProps" | kind=code-symbol | source=client/src/features/companies/components/CompanyTable.tsx:L12 | neighbors=[CompanyTable.tsx]
- "components_createbatchdialog_createbatchdialogprops": "CreateBatchDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/CreateBatchDialog.tsx:L24 | neighbors=[CreateBatchDialog.tsx]
- "components_createbatchdialog_sourcepicker": "SourcePicker()" | kind=code-symbol | source=client/src/features/production-orders/components/CreateBatchDialog.tsx:L415 | neighbors=[CreateBatchDialog.tsx]
- "components_createproductionorderdialog_createproductionorderdialogprops": "CreateProductionOrderDialogProps" | kind=code-symbol | source=client/src/features/production-orders/components/CreateProductionOrderDialog.tsx:L15 | neighbors=[CreateProductionOrderDialog.tsx]
- "components_createproductionorderdialog_notesform": "NotesForm" | kind=code-symbol | source=client/src/features/production-orders/components/CreateProductionOrderDialog.tsx:L21 | neighbors=[CreateProductionOrderDialog.tsx]
- "components_date_picker_datepickerprops": "DatePickerProps" | kind=code-symbol | source=client/src/shared/components/date-picker.tsx:L9 | neighbors=[date-picker.tsx]
- "components_date_picker_toisodate": "toISODate()" | kind=code-symbol | source=client/src/shared/components/date-picker.tsx:L21 | neighbors=[date-picker.tsx]
- "components_dispatchdialog_dispatchdialogprops": "DispatchDialogProps" | kind=code-symbol | source=client/src/features/work-orders/components/DispatchDialog.tsx:L14 | neighbors=[DispatchDialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-045.json

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
