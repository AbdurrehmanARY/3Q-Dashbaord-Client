# Node Description Batch 30 of 38

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

- "data_table_data_table_tanstackcolumnid": "tanstackColumnId()" | kind=code-symbol | source=src/shared/components/data-table/data-table.tsx:L104 | neighbors=[data-table.tsx]
- "data_table_data_table_toolbar_datatabletoolbarprops": "DataTableToolbarProps" | kind=code-symbol | source=src/shared/components/data-table/data-table-toolbar.tsx:L7 | neighbors=[data-table-toolbar.tsx]
- "data_table_data_table_view_options_columnlabel": "columnLabel()" | kind=code-symbol | source=src/shared/components/data-table/data-table-view-options.tsx:L15 | neighbors=[data-table-view-options.tsx]
- "data_table_editable_cell_editablecellclass": "editableCellClass" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L78 | neighbors=[editable-cell.tsx]
- "data_table_editable_cell_editablecellinputprops": "EditableCellInputProps" | kind=code-symbol | source=src/shared/components/data-table/editable-cell.tsx:L85 | neighbors=[editable-cell.tsx]
- "data_table_types_columnmeta": "ColumnMeta" | kind=code-symbol | source=src/shared/components/data-table/types.ts:L30 | neighbors=[types.ts]
- "data_table_types_tablemeta": "TableMeta" | kind=code-symbol | source=src/shared/components/data-table/types.ts:L15 | neighbors=[types.ts]
- "dialogs_appdialog_appdialogprops": "AppDialogProps" | kind=code-symbol | source=src/components/dialogs/AppDialog.tsx:L12 | neighbors=[AppDialog.tsx]
- "dialogs_confirmdialog_confirmdialogprops": "ConfirmDialogProps" | kind=code-symbol | source=src/components/dialogs/ConfirmDialog.tsx:L15 | neighbors=[ConfirmDialog.tsx]
- "error_boundary_errorboundary_component": "Component" | kind=code-symbol | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_componentdidcatch": ".componentDidCatch()" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L25 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_constructor": ".constructor()" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L16 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_getderivedstatefromerror": ".getDerivedStateFromError()" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L21 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_errorboundary_render": ".render()" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L30 | neighbors=[ErrorBoundary]
- "error_boundary_errorboundary_props": "Props" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L3 | neighbors=[ErrorBoundary.tsx]
- "error_boundary_errorboundary_state": "State" | kind=code-symbol | source=src/shared/components/error-boundary/ErrorBoundary.tsx:L10 | neighbors=[ErrorBoundary.tsx]
- "eslint_config": "eslint.config.js" | kind=code-symbol | source=eslint.config.js:L1 | neighbors=[ee6dbbe feat: production order completi…]
- "feedback_imagepreview_imagepreviewprops": "ImagePreviewProps" | kind=code-symbol | source=src/components/feedback/ImagePreview.tsx:L5 | neighbors=[ImagePreview.tsx]
- "feedback_operatoravatar_operatoravatarprops": "OperatorAvatarProps" | kind=code-symbol | source=src/components/feedback/OperatorAvatar.tsx:L13 | neighbors=[OperatorAvatar.tsx]
- "feedback_statusbadge_dot_colors": "DOT_COLORS" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L52 | neighbors=[StatusBadge.tsx]
- "feedback_statusbadge_statusbadgeprops": "StatusBadgeProps" | kind=code-symbol | source=src/components/feedback/StatusBadge.tsx:L78 | neighbors=[StatusBadge.tsx]
- "forms_appbutton_appbuttonprops": "AppButtonProps" | kind=code-symbol | source=src/components/forms/AppButton.tsx:L6 | neighbors=[AppButton.tsx]
- "forms_appcombobox_appcomboboxprops": "AppComboboxProps" | kind=code-symbol | source=src/components/forms/AppCombobox.tsx:L7 | neighbors=[AppCombobox.tsx]
- "forms_appinput_appinputprops": "AppInputProps" | kind=code-symbol | source=src/components/forms/AppInput.tsx:L6 | neighbors=[AppInput.tsx]
- "forms_appselect_appselectoption": "AppSelectOption" | kind=code-symbol | source=src/components/forms/AppSelect.tsx:L5 | neighbors=[AppSelect.tsx]
- "forms_appselect_appselectprops": "AppSelectProps" | kind=code-symbol | source=src/components/forms/AppSelect.tsx:L11 | neighbors=[AppSelect.tsx]
- "forms_imageuploadfield_imageuploadfieldprops": "ImageUploadFieldProps" | kind=code-symbol | source=src/components/forms/ImageUploadField.tsx:L7 | neighbors=[ImageUploadField.tsx]
- "forms_imageuploadfield_readasdataurl": "readAsDataUrl()" | kind=code-symbol | source=src/components/forms/ImageUploadField.tsx:L23 | neighbors=[ImageUploadField.tsx]
- "healthcheck_client_healthcheck_clienthealthcheck": "ClientHealthcheck()" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L35 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthcheckprops": "HealthcheckProps" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L20 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthchip": "HealthChip()" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L136 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_healthdetailcard": "HealthDetailCard()" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L163 | neighbors=[client_healthcheck.tsx]
- "healthcheck_client_healthcheck_initial": "initial" | kind=code-symbol | source=src/lib/healthcheck/client_healthcheck.tsx:L27 | neighbors=[client_healthcheck.tsx]
- "healthcheck_health_check_shell_healthcheckshell": "HealthCheckShell()" | kind=code-symbol | source=src/lib/healthcheck/health-check-shell.tsx:L26 | neighbors=[health-check-shell.tsx]
- "healthcheck_health_check_shell_healthcheckshellprops": "HealthCheckShellProps" | kind=code-symbol | source=src/lib/healthcheck/health-check-shell.tsx:L13 | neighbors=[health-check-shell.tsx]
- "healthcheck_materials_health_healthproberesult": "HealthprobeResult" | kind=code-symbol | neighbors=[MaterialsHealthResult]
- "healthcheck_materials_health_probematerialshealth": "probeMaterialsHealth()" | kind=code-symbol | source=src/lib/healthcheck/materials-health.ts:L19 | neighbors=[materials-health.ts]
- "healthcheck_production_health_healthproberesult": "HealthprobeResult" | kind=code-symbol | neighbors=[ProductionHealthResult]
- "healthcheck_production_health_probeproductionhealth": "probeProductionHealth()" | kind=code-symbol | source=src/lib/healthcheck/production-health.ts:L19 | neighbors=[production-health.ts]
- "hooks_use_batches_batch_keys": "BATCH_KEYS" | kind=code-symbol | source=src/features/production-orders/hooks/use-batches.ts:L12 | neighbors=[use-batches.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\client\.graphify\description-instructions\batch-029.json

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
