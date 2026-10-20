# Node Description Batch 72 of 74

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

- "users_user_service_userservice_getusers": ".getUsers()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L9 | neighbors=[UserService]
- "users_user_service_userservice_updateuser": ".updateUser()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L32 | neighbors=[UserService]
- "users_users_routes_router": "router" | kind=code-symbol | source=server/src/modules/users/users.routes.ts:L8 | neighbors=[users.routes.ts]
- "utils_line_draft_completionpct": "completionPct()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L142 | neighbors=[line-draft.ts]
- "utils_line_draft_test_makedraft": "makeDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L5 | neighbors=[line-draft.test.ts]
- "utils_line_draft_test_planning": "planning" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L22 | neighbors=[line-draft.test.ts]
- "utils_planning_dialog_planningsubmittarget": "PlanningSubmitTarget" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.ts:L9 | neighbors=[planning-dialog.ts]
- "utils_planning_dialog_test_makeprintedediting": "makePrintedEditing()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.test.ts:L12 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_makewovenediting": "makeWovenEditing()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.test.ts:L33 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_printedbody": "printedBody" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.test.ts:L52 | neighbors=[planning-dialog.test.ts]
- "utils_planning_dialog_test_wovenbody": "wovenBody" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-dialog.test.ts:L59 | neighbors=[planning-dialog.test.ts]
- "utils_planning_rows_planrowlike": "PlanRowLike" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.ts:L4 | neighbors=[planning-rows.ts]
- "utils_planning_rows_test_sum": "sum()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.test.ts:L21 | neighbors=[planning-rows.test.ts]
- "utils_planning_rows_test_thread": "thread()" | kind=code-symbol | source=client/src/features/production-orders/utils/planning-rows.test.ts:L13 | neighbors=[planning-rows.test.ts]
- "validation_common_schema_companyidparamsschema": "companyIdParamsSchema" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L17 | neighbors=[common.schema.ts]
- "validation_common_schema_idparamsschema": "idParamsSchema" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L9 | neighbors=[common.schema.ts]
- "validation_common_schema_lineidparamsschema": "lineIdParamsSchema" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L13 | neighbors=[common.schema.ts]
- "validation_common_schema_paginationqueryschema": "paginationQuerySchema" | kind=code-symbol | source=server/src/shared/validation/common.schema.ts:L22 | neighbors=[common.schema.ts]
- "validation_query_schema_listcompaniesquerydto": "ListCompaniesQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L29 | neighbors=[query.schema.ts]
- "validation_query_schema_listcompaniesqueryschema": "listCompaniesQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L23 | neighbors=[query.schema.ts]
- "validation_query_schema_listmachinesquerydto": "ListMachinesQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L27 | neighbors=[query.schema.ts]
- "validation_query_schema_listmachinesqueryschema": "listMachinesQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L8 | neighbors=[query.schema.ts]
- "validation_query_schema_listmaterialsquerydto": "ListMaterialsQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L71 | neighbors=[query.schema.ts]
- "validation_query_schema_listmaterialsqueryschema": "listMaterialsQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L3 | neighbors=[query.schema.ts]
- "validation_query_schema_listoperatorsquerydto": "ListOperatorsQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L28 | neighbors=[query.schema.ts]
- "validation_query_schema_listoperatorsqueryschema": "listOperatorsQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L13 | neighbors=[query.schema.ts]
- "validation_query_schema_listproductionordersquerydto": "ListProductionOrdersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L73 | neighbors=[query.schema.ts]
- "validation_query_schema_listproductionordersqueryschema": "listProductionOrdersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L46 | neighbors=[query.schema.ts]
- "validation_query_schema_listpurchasesquerydto": "ListPurchasesQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L74 | neighbors=[query.schema.ts]
- "validation_query_schema_listpurchasesqueryschema": "listPurchasesQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L59 | neighbors=[query.schema.ts]
- "validation_query_schema_liststockquerydto": "ListStockQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L75 | neighbors=[query.schema.ts]
- "validation_query_schema_liststockqueryschema": "listStockQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L66 | neighbors=[query.schema.ts]
- "validation_query_schema_listusersquerydto": "ListUsersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L57 | neighbors=[query.schema.ts]
- "validation_query_schema_listusersqueryschema": "listUsersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L52 | neighbors=[query.schema.ts]
- "validation_query_schema_listworkordersquerydto": "ListWorkOrdersQueryDTO" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L72 | neighbors=[query.schema.ts]
- "validation_query_schema_listworkordersqueryschema": "listWorkOrdersQuerySchema" | kind=code-symbol | source=server/src/shared/validation/query.schema.ts:L31 | neighbors=[query.schema.ts]
- "work_orders_types_linkedproductionorder": "LinkedProductionOrder" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L102 | neighbors=[types.ts]
- "work_orders_types_workorderpriority": "WorkOrderPriority" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L27 | neighbors=[types.ts]
- "work_orders_types_workordertype": "WorkOrderType" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L39 | neighbors=[types.ts]
- "work_orders_types_wovendetailinput": "WovenDetailInput" | kind=code-symbol | source=client/src/features/work-orders/types.ts:L114 | neighbors=[types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-071.json

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
