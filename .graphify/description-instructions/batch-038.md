# Node Description Batch 39 of 53

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
- "forms_imageuploadfield_readasdataurl": "readAsDataUrl()" | kind=code-symbol | source=client/src/components/forms/ImageUploadField.tsx:L23 | neighbors=[ImageUploadField.tsx]
- "health_health_routes_router": "router" | kind=code-symbol | source=server/src/modules/health/health.routes.ts:L3 | neighbors=[health.routes.ts]
- "hooks_use_companies_company_keys": "COMPANY_KEYS" | kind=code-symbol | source=client/src/features/companies/hooks/use-companies.ts:L5 | neighbors=[use-companies.ts]
- "hooks_use_dashboard_dashboard_keys": "DASHBOARD_KEYS" | kind=code-symbol | source=client/src/features/dashboard/hooks/use-dashboard.ts:L4 | neighbors=[use-dashboard.ts]
- "hooks_use_entities_machine_keys": "MACHINE_KEYS" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L5 | neighbors=[use-entities.ts]
- "hooks_use_entities_operator_keys": "OPERATOR_KEYS" | kind=code-symbol | source=client/src/features/machines-operators/hooks/use-entities.ts:L9 | neighbors=[use-entities.ts]
- "hooks_use_ink_ink_keys": "INK_KEYS" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L6 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidateconsumptionside": "invalidateConsumptionSide()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L83 | neighbors=[use-ink.ts]
- "hooks_use_ink_invalidatepurchaseside": "invalidatePurchaseSide()" | kind=code-symbol | source=client/src/features/ink/hooks/use-ink.ts:L23 | neighbors=[use-ink.ts]
- "hooks_use_inventory_inventory_keys": "INVENTORY_KEYS" | kind=code-symbol | source=client/src/features/inventory/hooks/use-inventory.ts:L6 | neighbors=[use-inventory.ts]
- "hooks_use_material_receipts_receipt_keys": "RECEIPT_KEYS" | kind=code-symbol | source=client/src/features/materials/hooks/use-material-receipts.ts:L6 | neighbors=[use-material-receipts.ts]
- "hooks_use_materials_material_keys": "MATERIAL_KEYS" | kind=code-symbol | source=client/src/features/materials/hooks/use-materials.ts:L6 | neighbors=[use-materials.ts]
- "hooks_use_production_orders_invalidateplanning": "invalidatePlanning()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L138 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_production_order_keys": "PRODUCTION_ORDER_KEYS" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L18 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useissuerolls": "useIssueRolls()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L281 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_uselineissuances": "useLineIssuances()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L271 | neighbors=[use-production-orders.ts]
- "hooks_use_production_orders_useproductionorderevents": "useProductionOrderEvents()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-production-orders.ts:L83 | neighbors=[use-production-orders.ts]
- "hooks_use_production_runs_production_run_keys": "PRODUCTION_RUN_KEYS" | kind=code-symbol | source=client/src/features/production-runs/hooks/use-production-runs.ts:L6 | neighbors=[use-production-runs.ts]
- "hooks_use_purchases_purchase_keys": "PURCHASE_KEYS" | kind=code-symbol | source=client/src/features/purchases/hooks/use-purchases.ts:L6 | neighbors=[use-purchases.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-038.json

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
