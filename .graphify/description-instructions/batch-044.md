# Node Description Batch 45 of 74

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

- "batch_and_runs_resource_availability_service_resourceusage": "ResourceUsage" | kind=code-symbol | source=server/src/modules/production/batch-and-runs/resource-availability.service.ts:L15 | neighbors=[resource-availability.service.ts]
- "brands_brand_controller_brandcontroller": "BrandController" | kind=code-symbol | source=server/src/modules/brands/brand.controller.ts:L6 | neighbors=[brand.controller.ts]
- "brands_brand_routes_router": "router" | kind=code-symbol | source=server/src/modules/brands/brand.routes.ts:L7 | neighbors=[brand.routes.ts]
- "brands_brand_schema_createbranddto": "CreateBrandDTO" | kind=code-symbol | source=server/src/modules/brands/brand.schema.ts:L17 | neighbors=[brand.schema.ts]
- "brands_brand_schema_createbrandschema": "createBrandSchema" | kind=code-symbol | source=server/src/modules/brands/brand.schema.ts:L3 | neighbors=[brand.schema.ts]
- "brands_brand_schema_updatebranddto": "UpdateBrandDTO" | kind=code-symbol | source=server/src/modules/brands/brand.schema.ts:L18 | neighbors=[brand.schema.ts]
- "brands_brand_schema_updatebrandschema": "updateBrandSchema" | kind=code-symbol | source=server/src/modules/brands/brand.schema.ts:L10 | neighbors=[brand.schema.ts]
- "cards_appcard_appcardprops": "AppCardProps" | kind=code-symbol | source=client/src/components/cards/AppCard.tsx:L12 | neighbors=[AppCard.tsx]
- "cards_statcard_statcardprops": "StatCardProps" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L9 | neighbors=[StatCard.tsx]
- "cards_statcard_statcardskeleton": "StatCardSkeleton()" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L103 | neighbors=[StatCard.tsx]
- "cards_statcard_trenddirection": "TrendDirection" | kind=code-symbol | source=client/src/components/cards/StatCard.tsx:L7 | neighbors=[StatCard.tsx]
- "client_eslint_config": "eslint.config.js" | kind=code-symbol | source=client/eslint.config.js:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "client_postcss_config": "postcss.config.js" | kind=code-symbol | source=client/postcss.config.js:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "client_tailwind_config": "tailwind.config.js" | kind=code-symbol | source=client/tailwind.config.js:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "client_vite_config_d": "vite.config.d.ts" | kind=code-symbol | source=client/vite.config.d.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "client_vite_config_proxyagent": "proxyAgent" | kind=code-symbol | source=client/vite.config.js:L7 | neighbors=[vite.config.js]
- "client_vitest_config": "vitest.config.ts" | kind=code-symbol | source=client/vitest.config.ts:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "command_palette_commandpalette_commandpaletteprops": "CommandPaletteProps" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L24 | neighbors=[CommandPalette.tsx]
- "command_palette_commandpalette_commandpalettetriggerprops": "CommandPaletteTriggerProps" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L106 | neighbors=[CommandPalette.tsx]
- "command_palette_commandpalette_commands": "COMMANDS" | kind=code-symbol | source=client/src/shared/components/command-palette/CommandPalette.tsx:L30 | neighbors=[CommandPalette.tsx]
- "companies_company_controller_companycontroller": "CompanyController" | kind=code-symbol | source=server/src/modules/companies/company.controller.ts:L6 | neighbors=[company.controller.ts]
- "companies_company_repository_brandrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L79 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_delete": ".delete()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L93 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L50 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_findbycompanyid": ".findByCompanyId()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L75 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L65 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_findbyname": ".findByName()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L70 | neighbors=[BrandRepository]
- "companies_company_repository_brandrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L84 | neighbors=[BrandRepository]
- "companies_company_repository_companyrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L25 | neighbors=[CompanyRepository]
- "companies_company_repository_companyrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L7 | neighbors=[CompanyRepository]
- "companies_company_repository_companyrepository_findbycompanyname": ".findByCompanyName()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L20 | neighbors=[CompanyRepository]
- "companies_company_repository_companyrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L15 | neighbors=[CompanyRepository]
- "companies_company_repository_companyrepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L39 | neighbors=[CompanyRepository]
- "companies_company_repository_companyrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/companies/company.repository.ts:L30 | neighbors=[CompanyRepository]
- "companies_company_routes_router": "router" | kind=code-symbol | source=server/src/modules/companies/company.routes.ts:L8 | neighbors=[company.routes.ts]
- "companies_company_schema_createcompanydto": "CreateCompanyDTO" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L24 | neighbors=[company.schema.ts]
- "companies_company_schema_createcompanyschema": "createCompanySchema" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L3 | neighbors=[company.schema.ts]
- "companies_company_schema_updatecompanydto": "UpdateCompanyDTO" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L25 | neighbors=[company.schema.ts]
- "companies_company_schema_updatecompanyschema": "updateCompanySchema" | kind=code-symbol | source=server/src/modules/companies/company.schema.ts:L13 | neighbors=[company.schema.ts]
- "companies_company_service_brandservice_createbrand": ".createBrand()" | kind=code-symbol | source=server/src/modules/companies/company.service.ts:L57 | neighbors=[BrandService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-044.json

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
