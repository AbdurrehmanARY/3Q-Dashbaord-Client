# Node Description Batch 24 of 53

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

- "drizzle_0015_mature_captain_britain_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L102 | neighbors=[0015_mature_captain_britain.sql, production_runs]
- "drizzle_0015_mature_captain_britain_public_thread_service_providers": "public.thread_service_providers" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L106 | neighbors=[0015_mature_captain_britain.sql, thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_public_users": "public.users" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L103 | neighbors=[0015_mature_captain_britain.sql, production_runs]
- "drizzle_0015_mature_captain_britain_public_work_orders": "public.work_orders" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L96 | neighbors=[0015_mature_captain_britain.sql, machines]
- "drizzle_0015_mature_captain_britain_thread_dyeing_allocations": "thread_dyeing_allocations" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L63 | neighbors=[0015_mature_captain_britain.sql, public.thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_thread_dyeing_receives": "thread_dyeing_receives" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L73 | neighbors=[0015_mature_captain_britain.sql, public.thread_dyeing_sends]
- "drizzle_0015_mature_captain_britain_thread_dyeing_sends": "thread_dyeing_sends" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L83 | neighbors=[0015_mature_captain_britain.sql, public.thread_service_providers]
- "drizzle_0017_glorious_captain_america_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L24 | neighbors=[0017_glorious_captain_america.sql, work_orders]
- "drizzle_0017_glorious_captain_america_work_orders": "work_orders" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L24 | neighbors=[0017_glorious_captain_america.sql, public.operators]
- "drizzle_0018_batch_material_flow_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L29 | neighbors=[0018_batch_material_flow.sql, production_batches]
- "drizzle_0018_batch_material_flow_users": "users" | kind=code-symbol | source=server/drizzle/0018_batch_material_flow.sql:L94 | neighbors=[0018_batch_material_flow.sql, batch_consumptions]
- "drizzle_0019_batch_flow_sync_production_order_lines": "production_order_lines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L75 | neighbors=[0019_batch_flow_sync.sql, public.production_order_lines]
- "drizzle_0019_batch_flow_sync_public_machines": "public.machines" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L82 | neighbors=[0019_batch_flow_sync.sql, production_batches]
- "drizzle_0019_batch_flow_sync_public_operators": "public.operators" | kind=code-symbol | source=server/drizzle/0019_batch_flow_sync.sql:L83 | neighbors=[0019_batch_flow_sync.sql, production_batches]
- "drizzle_0021_woven_batch_flow_batch_consumptions": "batch_consumptions" | kind=code-symbol | source=server/drizzle/0021_woven_batch_flow.sql:L58 | neighbors=[0021_woven_batch_flow.sql, production_batches]
- "errors_errorhandler_aspgerror": "asPgError()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L11 | neighbors=[errorHandler.ts, handlePgError()]
- "errors_errorhandler_notfound": "notFound()" | kind=code-symbol | source=server/src/shared/errors/errorHandler.ts:L5 | neighbors=[errorHandler.ts, index.ts]
- "feedback_imagepreview_imagepreview": "ImagePreview()" | kind=code-symbol | source=client/src/components/feedback/ImagePreview.tsx:L23 | neighbors=[ImagePreview.tsx, ImageUploadField.tsx]
- "feedback_operatoravatar_initialsof": "initialsOf()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L5 | neighbors=[OperatorAvatar.tsx, OperatorAvatar()]
- "feedback_operatoravatar_operatoravatarname": "OperatorAvatarName()" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L41 | neighbors=[operator-columns.tsx, OperatorAvatar.tsx]
- "feedback_statusbadge_statusbadgevariants": "statusBadgeVariants" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L5 | neighbors=[StatusBadge.tsx, StatusBadge()]
- "feedback_statusbadge_statusvariant": "StatusVariant" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L50 | neighbors=[ProductionStatusBadge.tsx, StatusBadge.tsx]
- "formulas_production_formula_calculatetotalweight": "calculateTotalWeight()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L42 | neighbors=[production-formula.ts, production-formula.test.ts]
- "formulas_production_formula_completionpct": "completionPct()" | kind=code-symbol | source=server/src/shared/formulas/production-formula.ts:L48 | neighbors=[production-formula.ts, production-formula.test.ts]
- "header_appheader_appheader": "AppHeader()" | kind=code-symbol | source=client/src/shared/components/header/AppHeader.tsx:L16 | neighbors=[AppHeader.tsx, AppLayout.tsx]
- "health_health_routes": "health.routes.ts" | kind=code-symbol | source=server/src/modules/health/health.routes.ts:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…, router]
- "hooks_use_companies_usecreatebrand": "useCreateBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L64 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_usecreatecompany": "useCreateCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L27 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_companies_usedeletebrand": "useDeleteBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L89 | neighbors=[brand-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_usedeletecompany": "useDeleteCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L52 | neighbors=[company-row-actions.tsx, use-companies.ts]
- "hooks_use_companies_useupdatebrand": "useUpdateBrand()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L76 | neighbors=[BrandDialog.tsx, use-companies.ts]
- "hooks_use_companies_useupdatecompany": "useUpdateCompany()" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L39 | neighbors=[CompanyDialog.tsx, use-companies.ts]
- "hooks_use_completion_celebration_usecompletioncelebration": "useCompletionCelebration()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-completion-celebration.ts:L11 | neighbors=[use-completion-celebration.ts, ProductionOrderDashboardPage.tsx]
- "hooks_use_dashboard_trends_useworkordertrend": "useWorkOrderTrend()" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard-trends.ts:L14 | neighbors=[use-dashboard-trends.ts, DashboardPage.tsx]
- "hooks_use_dashboard_usedashboardkpis": "useDashboardKpis()" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L8 | neighbors=[use-dashboard.ts, DashboardPage.tsx]
- "hooks_use_entities_usecreatemachine": "useCreateMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L30 | neighbors=[MachineDialog.tsx, use-entities.ts]
- "hooks_use_entities_usecreateoperator": "useCreateOperator()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L57 | neighbors=[OperatorDialog.tsx, use-entities.ts]
- "hooks_use_entities_usedeletemachine": "useDeleteMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L48 | neighbors=[machine-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_usedeleteoperator": "useDeleteOperator()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L75 | neighbors=[operator-row-actions.tsx, use-entities.ts]
- "hooks_use_entities_useupdatemachine": "useUpdateMachine()" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L39 | neighbors=[MachineDialog.tsx, use-entities.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-023.json

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
