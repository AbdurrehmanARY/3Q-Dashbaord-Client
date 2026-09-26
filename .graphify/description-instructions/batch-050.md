# Node Description Batch 51 of 53

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

- "ui_sidebar_sidebargrouplabel": "SidebarGroupLabel()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L396 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinput": "SidebarInput()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L321 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuaction": "SidebarMenuAction()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L558 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubadge": "SidebarMenuBadge()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L588 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuskeleton": "SidebarMenuSkeleton()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L605 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarseparator": "SidebarSeparator()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L357 | neighbors=[sidebar.tsx]
- "ui_table_tablecaption": "TableCaption()" | kind=code-symbol | source=client/src/components/ui/table.tsx:L94 | neighbors=[table.tsx]
- "ui_toggle_group_togglegroupcontext": "ToggleGroupContext" | kind=code-symbol | source=client/src/components/ui/toggle-group.tsx:L9 | neighbors=[toggle-group.tsx]
- "users_user_controller_usercontroller": "UserController" | kind=code-symbol | source=server/src/modules/users/user.controller.ts:L7 | neighbors=[user.controller.ts]
- "users_user_repository_userrepository_create": ".create()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L28 | neighbors=[UserRepository]
- "users_user_repository_userrepository_findall": ".findAll()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L7 | neighbors=[UserRepository]
- "users_user_repository_userrepository_findbyemail": ".findByEmail()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L23 | neighbors=[UserRepository]
- "users_user_repository_userrepository_findbyid": ".findById()" | kind=code-symbol | source=server/src/modules/users/user.repository.ts:L18 | neighbors=[UserRepository]
- "users_user_schema_createuserdto": "CreateUserDTO" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L24 | neighbors=[user.schema.ts]
- "users_user_schema_createuserschema": "createUserSchema" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L5 | neighbors=[user.schema.ts]
- "users_user_schema_updateuserdto": "UpdateUserDTO" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L25 | neighbors=[user.schema.ts]
- "users_user_schema_updateuserschema": "updateUserSchema" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L14 | neighbors=[user.schema.ts]
- "users_user_schema_userroleschema": "userRoleSchema" | kind=code-symbol | source=server/src/modules/users/user.schema.ts:L3 | neighbors=[user.schema.ts]
- "users_user_service_userrole": "UserRole" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L6 | neighbors=[user.service.ts]
- "users_user_service_userservice_assertactor": ".assertActor()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L56 | neighbors=[UserService]
- "users_user_service_userservice_createuser": ".createUser()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L19 | neighbors=[UserService]
- "users_user_service_userservice_deleteuser": ".deleteUser()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L49 | neighbors=[UserService]
- "users_user_service_userservice_getuser": ".getUser()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L13 | neighbors=[UserService]
- "users_user_service_userservice_getusers": ".getUsers()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L9 | neighbors=[UserService]
- "users_user_service_userservice_updateuser": ".updateUser()" | kind=code-symbol | source=server/src/modules/users/user.service.ts:L32 | neighbors=[UserService]
- "users_users_routes_router": "router" | kind=code-symbol | source=server/src/modules/users/users.routes.ts:L8 | neighbors=[users.routes.ts]
- "utils_line_draft_completionpct": "completionPct()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.ts:L142 | neighbors=[line-draft.ts]
- "utils_line_draft_test_makedraft": "makeDraft()" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L5 | neighbors=[line-draft.test.ts]
- "utils_line_draft_test_planning": "planning" | kind=code-symbol | source=client/src/features/production-orders/utils/line-draft.test.ts:L22 | neighbors=[line-draft.test.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-050.json

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
