# Node Description Batch 52 of 74

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

- "drizzle_0011_rename_item_code_to_material_code": "0011_rename_item_code_to_material_code.sql" | kind=code-symbol | source=server/drizzle/0011_rename_item_code_to_material_code.sql:L1 | neighbors=[c0c79ec Initial commit: Label Manufactu…]
- "drizzle_0012_flawless_master_chief_thread_purchases": "thread_purchases" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L72 | neighbors=[0012_flawless_master_chief.sql]
- "drizzle_0012_flawless_master_chief_thread_stocks": "thread_stocks" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L58 | neighbors=[0012_flawless_master_chief.sql]
- "drizzle_0012_flawless_master_chief_woven_work_order_details": "woven_work_order_details" | kind=code-symbol | source=server/drizzle/0012_flawless_master_chief.sql:L6 | neighbors=[0012_flawless_master_chief.sql]
- "drizzle_0013_busy_prodigy": "0013_busy_prodigy.sql" | kind=code-symbol | source=server/drizzle/0013_busy_prodigy.sql:L1 | neighbors=[cc50221 feat: dispatched status + FBR i…]
- "drizzle_0015_mature_captain_britain_label_sheets": "label_sheets" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L42 | neighbors=[0015_mature_captain_britain.sql]
- "drizzle_0015_mature_captain_britain_local_sheets": "local_sheets" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L31 | neighbors=[0015_mature_captain_britain.sql]
- "drizzle_0015_mature_captain_britain_sticker_materials": "sticker_materials" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L19 | neighbors=[0015_mature_captain_britain.sql]
- "drizzle_0015_mature_captain_britain_thread_service_providers": "thread_service_providers" | kind=code-symbol | source=server/drizzle/0015_mature_captain_britain.sql:L53 | neighbors=[0015_mature_captain_britain.sql]
- "drizzle_0016_milky_joseph": "0016_milky_joseph.sql" | kind=code-symbol | source=server/drizzle/0016_milky_joseph.sql:L1 | neighbors=[9b99ce1 feat: complete production workf…]
- "drizzle_0017_glorious_captain_america_ink_consumptions": "ink_consumptions" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L13 | neighbors=[0017_glorious_captain_america.sql]
- "drizzle_0017_glorious_captain_america_ink_purchases": "ink_purchases" | kind=code-symbol | source=server/drizzle/0017_glorious_captain_america.sql:L1 | neighbors=[0017_glorious_captain_america.sql]
- "drizzle_0020_woven_batch_stage": "0020_woven_batch_stage.sql" | kind=code-symbol | source=server/drizzle/0020_woven_batch_stage.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…]
- "drizzle_0022_label_kinds_and_sizes": "0022_label_kinds_and_sizes.sql" | kind=code-symbol | source=server/drizzle/0022_label_kinds_and_sizes.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…]
- "drizzle_0023_revert_cutting_packaging_line_scope": "0023_revert_cutting_packaging_line_scope.sql" | kind=code-symbol | source=server/drizzle/0023_revert_cutting_packaging_line_scope.sql:L1 | neighbors=[ee6d4dd refactor(server): vertical-slic…]
- "drizzle_0024_woven_estimated_weaving_hours": "0024_woven_estimated_weaving_hours.sql" | kind=code-symbol | source=server/drizzle/0024_woven_estimated_weaving_hours.sql:L1 | neighbors=[2e755d6 feat(server): persist estimated…]
- "drizzle_0025_line_scoped_cutting_packaging": "0025_line_scoped_cutting_packaging.sql" | kind=code-symbol | source=server/drizzle/0025_line_scoped_cutting_packaging.sql:L1 | neighbors=[95ce13e feat(production): make cutting …]
- "drizzle_0026_label_types_label_types": "label_types" | kind=code-symbol | source=server/drizzle/0026_label_types.sql:L15 | neighbors=[0026_label_types.sql]
- "error_boundary_errorboundary_component": "Component" | kind=code-symbol | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_componentdidcatch": ".componentDidCatch()" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L25 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_constructor": ".constructor()" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L16 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_getderivedstatefromerror": ".getDerivedStateFromError()" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L21 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_render": ".render()" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L30 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_props": "Props" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L3 | neighbors=[ErrorBoundary.tsx]
- "error_boundary_errorboundary_state": "State" | kind=code-symbol | source=client/src/shared/components/error-boundary/ErrorBoundary.tsx:L10 | neighbors=[ErrorBoundary.tsx]
- "errors_apierror_apierror_constructor": ".constructor()" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L8 | neighbors=[ApiError]
- "errors_apierror_badrequesterror_constructor": ".constructor()" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L17 | neighbors=[BadRequestError]
- "errors_apierror_conflicterror_constructor": ".constructor()" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L29 | neighbors=[ConflictError]
- "errors_apierror_internalservererror_constructor": ".constructor()" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L35 | neighbors=[InternalServerError]
- "errors_apierror_notfounderror_constructor": ".constructor()" | kind=code-symbol | source=server/src/shared/errors/ApiError.ts:L23 | neighbors=[NotFoundError]
- "feedback_imagepreview_imagepreviewprops": "ImagePreviewProps" | kind=code-symbol | source=client/src/components/feedback/ImagePreview.tsx:L5 | neighbors=[ImagePreview.tsx]
- "feedback_operatoravatar_operatoravatarprops": "OperatorAvatarProps" | kind=code-symbol | source=client/src/components/feedback/OperatorAvatar.tsx:L13 | neighbors=[OperatorAvatar.tsx]
- "feedback_statusbadge_dot_colors": "DOT_COLORS" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L52 | neighbors=[StatusBadge.tsx]
- "feedback_statusbadge_statusbadgeprops": "StatusBadgeProps" | kind=code-symbol | source=client/src/components/feedback/StatusBadge.tsx:L78 | neighbors=[StatusBadge.tsx]
- "forms_appbutton_appbuttonprops": "AppButtonProps" | kind=code-symbol | source=client/src/components/forms/AppButton.tsx:L6 | neighbors=[AppButton.tsx]
- "forms_appcombobox_appcomboboxprops": "AppComboboxProps" | kind=code-symbol | source=client/src/components/forms/AppCombobox.tsx:L7 | neighbors=[AppCombobox.tsx]
- "forms_appinput_appinputprops": "AppInputProps" | kind=code-symbol | source=client/src/components/forms/AppInput.tsx:L6 | neighbors=[AppInput.tsx]
- "forms_appselect_appselectoption": "AppSelectOption" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L5 | neighbors=[AppSelect.tsx]
- "forms_appselect_appselectprops": "AppSelectProps" | kind=code-symbol | source=client/src/components/forms/AppSelect.tsx:L11 | neighbors=[AppSelect.tsx]
- "forms_imageuploadfield_imageuploadfieldprops": "ImageUploadFieldProps" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L7 | neighbors=[ImageUploadField.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-051.json

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
