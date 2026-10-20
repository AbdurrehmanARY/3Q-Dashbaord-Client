# Node Description Batch 71 of 74

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

- "ui_progress_progressvalue": "ProgressValue()" | kind=code-symbol | source=client/src/components/ui/progress.tsx:L62 | neighbors=[progress.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L6 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=client/src/components/ui/scroll-area.tsx:L29 | neighbors=[scroll-area.tsx]
- "ui_select_selectgroup": "SelectGroup()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L11 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L98 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L171 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L152 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=client/src/components/ui/select.tsx:L139 | neighbors=[select.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L16 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L85 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L24 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L20 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=client/src/components/ui/sheet.tsx:L12 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L45 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontextprops": "SidebarContextProps" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L35 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupaction": "SidebarGroupAction()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L420 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent()" | kind=code-symbol | source=client/src/components/ui/sidebar.tsx:L444 | neighbors=[sidebar.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-070.json

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
