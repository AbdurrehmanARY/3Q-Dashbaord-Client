# Node Description Batch 35 of 74

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

- "hooks_use_work_orders_usecreateworkorder": "useCreateWorkOrder()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L29 | neighbors=[WorkOrderDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_usedispatchworkorder": "useDispatchWorkOrder()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L59 | neighbors=[DispatchDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_useupdateworkorder": "useUpdateWorkOrder()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L41 | neighbors=[WorkOrderDialog.tsx, use-work-orders.ts]
- "hooks_use_work_orders_useworkorderdetail": "useWorkOrderDetail()" | kind=code-symbol | source=client/src/features/work-orders/hooks/use-work-orders.ts:L20 | neighbors=[use-work-orders.ts, WorkOrderDetailPage.tsx]
- "hooks_use_woven_production_usedeletewovenline": "useDeleteWovenLine()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L51 | neighbors=[WovenProductionPanel.tsx, use-woven-production.ts]
- "hooks_use_woven_production_usereconcilewoventhreadstock": "useReconcileWovenThreadStock()" | kind=code-symbol | source=client/src/features/production-orders/hooks/use-woven-production.ts:L102 | neighbors=[WovenThreadReconciliationCard.tsx, use-woven-production.ts]
- "ink_ink_service_inkservice_createconsumption": ".createConsumption()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L86 | neighbors=[InkService, dec()]
- "ink_ink_service_inkservice_createpurchase": ".createPurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L20 | neighbors=[InkService, dec()]
- "ink_ink_service_inkservice_updatepurchase": ".updatePurchase()" | kind=code-symbol | source=server/src/modules/ink/ink.service.ts:L34 | neighbors=[InkService, dec()]
- "ink_types_inkoperatorsummary": "InkOperatorSummary" | kind=code-symbol | source=client/src/features/ink/types.ts:L55 | neighbors=[types.ts, ink-service.ts]
- "ink_types_inkstockrow": "InkStockRow" | kind=code-symbol | source=client/src/features/ink/types.ts:L25 | neighbors=[types.ts, ink-service.ts]
- "inventory_inventory_roll_repository_inventoryrollrepository_findbymaterialcode": ".findByMaterialCode()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L198 | neighbors=[InventoryRollRepository, .syncMaterialStockLedgers()]
- "inventory_inventory_roll_repository_inventoryrollrepository_syncmaterialstockledgers": ".syncMaterialStockLedgers()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.repository.ts:L72 | neighbors=[InventoryRollRepository, .findByMaterialCode()]
- "inventory_inventory_roll_service_inventoryrollservice_getinventoryrollbymaterialcode": ".getInventoryRollByMaterialCode()" | kind=code-symbol | source=server/src/modules/inventory/inventory-roll.service.ts:L54 | neighbors=[InventoryRollService, withPerSkuBalance()]
- "inventory_inventory_service_inventoryservice_createpurchase": ".createPurchase()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L40 | neighbors=[InventoryService, calculateDerivedFields()]
- "inventory_inventory_service_inventoryservice_updatepurchase": ".updatePurchase()" | kind=code-symbol | source=server/src/modules/inventory/inventory.service.ts:L89 | neighbors=[InventoryService, calculateDerivedFields()]
- "inventory_material_repository_materialrepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L43 | neighbors=[MaterialRepository, .update()]
- "inventory_material_repository_materialrepository_update": ".update()" | kind=code-symbol | source=server/src/modules/inventory/material.repository.ts:L34 | neighbors=[MaterialRepository, .softDelete()]
- "inventory_types_purchaseinput": "PurchaseInput" | kind=code-symbol | source=client/src/features/inventory/types.ts:L42 | neighbors=[types.ts, inventory-service.ts]
- "inventory_types_purchaserecord": "PurchaseRecord" | kind=code-symbol | source=client/src/features/inventory/types.ts:L20 | neighbors=[types.ts, inventory-service.ts]
- "label_types_label_types_service_labeltypesservice_delete": ".delete()" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L44 | neighbors=[LabelTypesService, .getById()]
- "label_types_label_types_service_labeltypesservice_update": ".update()" | kind=code-symbol | source=server/src/modules/label-types/label-types.service.ts:L30 | neighbors=[LabelTypesService, .getById()]
- "layout_pagecontainer_pagecontainer": "PageContainer()" | kind=code-symbol | source=client/src/components/layout/PageContainer.tsx:L21 | neighbors=[PageContainer.tsx, AppLayout.tsx]
- "layouts_applayout_getinitialsidebaropen": "getInitialSidebarOpen()" | kind=code-symbol | source=client/src/shared/layouts/AppLayout.tsx:L22 | neighbors=[AppLayout.tsx, AppLayout()]
- "lib_api_request": "request()" | kind=code-symbol | source=client/src/lib/api.ts:L23 | neighbors=[api.ts, ApiError]
- "lib_format_calculateinvoiceweight": "calculateInvoiceWeight()" | kind=code-symbol | source=client/src/lib/format.ts:L89 | neighbors=[PurchaseForm.tsx, format.ts]
- "lib_format_calculatetotalweight": "calculateTotalWeight()" | kind=code-symbol | source=client/src/lib/format.ts:L70 | neighbors=[PlanLabelTypeForm.tsx, format.ts]
- "lib_format_totalrollequivalent200m": "totalRollEquivalent200m()" | kind=code-symbol | source=client/src/lib/format.ts:L80 | neighbors=[PurchaseForm.tsx, format.ts]
- "lib_query_client_queryclient": "queryClient" | kind=code-symbol | source=client/src/lib/query-client.ts:L3 | neighbors=[query-client.ts, QueryProvider.tsx]
- "machines_machine_repository_machinerepository_softdelete": ".softDelete()" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L42 | neighbors=[MachineRepository, .update()]
- "machines_machine_repository_machinerepository_update": ".update()" | kind=code-symbol | source=server/src/modules/machines/machine.repository.ts:L33 | neighbors=[MachineRepository, .softDelete()]
- "machines_operators_types_machineavailability": "MachineAvailability" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L6 | neighbors=[AvailabilityBadge.tsx, types.ts]
- "machines_operators_types_operatoravailability": "OperatorAvailability" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L7 | neighbors=[AvailabilityBadge.tsx, types.ts]
- "machines_operators_types_operatortype": "OperatorType" | kind=code-symbol | source=client/src/features/machines-operators/types.ts:L33 | neighbors=[operator-table.tsx, types.ts]
- "material_receipts_material_receipts_service_labelsheetservice_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L93 | neighbors=[LabelSheetService, money()]
- "material_receipts_material_receipts_service_labelsheetservice_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L102 | neighbors=[LabelSheetService, money()]
- "material_receipts_material_receipts_service_localsheetservice_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L60 | neighbors=[LocalSheetService, money()]
- "material_receipts_material_receipts_service_localsheetservice_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L69 | neighbors=[LocalSheetService, money()]
- "material_receipts_material_receipts_service_stickermaterialservice_create": ".create()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L24 | neighbors=[StickerMaterialService, money()]
- "material_receipts_material_receipts_service_stickermaterialservice_update": ".update()" | kind=code-symbol | source=server/src/modules/material-receipts/material-receipts.service.ts:L35 | neighbors=[StickerMaterialService, money()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\3Q-facility-Dashboard\.graphify\description-instructions\batch-034.json

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
