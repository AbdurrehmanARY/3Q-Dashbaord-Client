# Graph Report - .  (2026-10-14)

## Corpus Check
- Large corpus: 559 files · ~228,778 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 2943 nodes · 7009 edges · 155 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 1969 · imports: 1928 · imports_from: 1340 · MODIFIES: 861 · method: 397 · calls: 244 · references: 110 · re_exports: 87 · ON_BRANCH: 31 · PARENT_OF: 30 · inherits: 12


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 559 · Candidates: 679
- Excluded: 41 untracked · 54190 ignored · 0 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `cd392dc`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 83 edges
2. `AppButton` - 71 edges
3. `formatNumber()` - 56 edges
4. `BatchFlowRepository` - 35 edges
5. `ProductionOrderRepository` - 32 edges
6. `AppInput` - 31 edges
7. `ProductionOrderService` - 29 edges
8. `db` - 29 edges
9. `Messages` - 28 edges
10. `StatusBadge()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `0a3ef12 fix(production): order-scoped cutting/packaging batch visibility - read path + create path` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 2 → community 39_
- `0a3ef12 fix(production): order-scoped cutting/packaging batch visibility - read path + create path` --PARENT_OF--> `8221c40 chore(scripts,docs): default the batch-visibility gate to the newest order`  [EXTRACTED]
  git → git  _Bridges community 2 → community 4_
- `13b0a3c chore(server): give vitest a fallback DATABASE_URL` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 3 → community 39_
- `13b0a3c chore(server): give vitest a fallback DATABASE_URL` --PARENT_OF--> `558dd8a refactor(server): split flat domains into sub-module slices`  [EXTRACTED]
  git → git  _Bridges community 3 → community 10_
- `2c8bd34 feat(client): per-table column visibility store and healthcheck probes` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 56 → community 39_

## Communities

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (22): AppProviders(), LayoutProvider(), QueryProvider(), ThemeProvider(), ToastProvider(), Toaster(), TooltipProvider(), DASHBOARD_KEYS (+14 more)

### Community 51 - "Community 51"
Cohesion: 0.13
Nodes (9): app, Props, State, ErrorBoundary, Component, apiRouter, indexRouter, apiRateLimiter (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (21): AppRoutes(), AppRoute, RedirectRoute, routes, redirects, PageHeaderProps, PageHeader(), InventoryStockTable() (+13 more)

### Community 29 - "Community 29"
Cohesion: 0.16
Nodes (17): AppCardProps, TrendDirection, StatCardProps, Button, Card(), CardHeader(), CardTitle(), CardDescription() (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (26): AppCard, StatusVariant, PlannedLabelTypesTableProps, PlannedLabelTypesTable(), ORDER_STATUS, LINE_STATUS, ProductionOrderStatusBadge(), ProductionLineStatusBadge() (+18 more)

### Community 32 - "Community 32"
Cohesion: 0.12
Nodes (20): StatCard(), Textarea, FormValues, LogProductionRunDialogProps, LogProductionRunDialog(), columns, ProductionHistoryTable(), ProductionSummaryCard() (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (30): AppDialogProps, AppDialog(), AppSelectOption, AppSelectProps, AppSelect, SubmitOnEnter(), CompanyDialogProps, companySchema (+22 more)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (53): ConfirmDialogProps, AlertDialog(), AlertDialogTrigger(), AlertDialogContent(), AlertDialogHeader(), AlertDialogFooter(), AlertDialogTitle(), AlertDialogDescription() (+45 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (32): ConfirmDialog(), Tabs(), tabsListVariants, TabsList(), TabsTrigger(), TabsContent(), InkConsumptionDialog(), InkOperatorBreakdown() (+24 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (19): ImagePreviewProps, ImagePreview(), ImageUploadFieldProps, badgeVariants, Badge(), Progress(), ToggleGroupContext, ToggleGroup() (+11 more)

### Community 75 - "Community 75"
Cohesion: 0.23
Nodes (7): initialsOf(), OperatorAvatarProps, OperatorAvatar(), OperatorAvatarName(), Avatar(), AvatarImage(), AvatarFallback()

### Community 38 - "Community 38"
Cohesion: 0.14
Nodes (20): statusBadgeVariants, DOT_COLORS, StatusBadgeProps, StatusBadge(), VARIANTS, AvailabilityBadgeProps, AvailabilityBadge(), OperatorDialog() (+12 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (16): AppButtonProps, AppButton, AppComboboxProps, AppCombobox(), AppInputProps, AppInput, Label(), Props (+8 more)

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (21): ImageUploadField(), ArtworkAndComment(), CompanyInfo(), DispatchDialogProps, DispatchDialog(), DispatchInfo(), OrderInfo(), WorkOrderDialogProps (+13 more)

### Community 54 - "Community 54"
Cohesion: 0.14
Nodes (13): SIZES, PageContainerProps, PageContainer(), Separator(), SidebarProvider(), SidebarInset(), CommandPalette(), CommandPaletteTrigger() (+5 more)

### Community 80 - "Community 80"
Cohesion: 0.29
Nodes (7): Breadcrumb(), BreadcrumbList(), BreadcrumbItem(), BreadcrumbPage(), BreadcrumbSeparator(), pathToSegments(), AppBreadcrumb()

### Community 100 - "Community 100"
Cohesion: 0.25
Nodes (6): Calendar(), Popover(), PopoverTrigger(), PopoverContent(), DatePickerProps, DatePicker()

### Community 72 - "Community 72"
Cohesion: 0.18
Nodes (10): THEMES, INITIAL_DIMENSION, TooltipNameType, ChartConfig, ChartContextProps, ChartContext, useChart(), ChartContainer() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.10
Nodes (21): Checkbox(), DataTableColumnHeader(), DataTableExportColumn, toRecords(), exportRowsToExcel(), PrintTable(), pageWindow(), DataTablePagination() (+13 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (29): Collapsible(), CollapsibleTrigger, CollapsibleContent(), Sheet(), SheetContent(), SheetHeader(), SheetTitle(), SheetDescription() (+21 more)

### Community 35 - "Community 35"
Cohesion: 0.09
Nodes (9): ComboboxTrigger, InputGroup(), inputGroupAddonVariants, InputGroupAddon(), inputGroupButtonVariants, InputGroupButton, InputGroupInput, InputGroupTextarea (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.13
Nodes (15): ComboboxOption, ComboboxSelectProps, ComboboxSelect(), EmptyContent(), MachineDialog(), machineColumns, TYPE_OPTIONS, materialColumns (+7 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (16): CommandDialog(), CommandInput(), CommandList(), CommandEmpty(), CommandGroup(), CommandSeparator(), CommandItem(), Dialog() (+8 more)

### Community 66 - "Community 66"
Cohesion: 0.14
Nodes (4): DrawerContextProps, DrawerContext, useDrawer(), DrawerContent()

### Community 87 - "Community 87"
Cohesion: 0.33
Nodes (8): Empty(), EmptyHeader(), emptyMediaVariants, EmptyMedia(), EmptyTitle(), EmptyDescription(), DataTableEmptyProps, DataTableEmpty()

### Community 92 - "Community 92"
Cohesion: 0.22
Nodes (2): navigationMenuTriggerStyle, NavigationMenuTrigger()

### Community 45 - "Community 45"
Cohesion: 0.15
Nodes (13): Pagination(), PaginationContent(), PaginationItem(), PaginationLinkProps, PaginationLink(), PaginationPrevious(), PaginationNext(), PaginationEllipsis() (+5 more)

### Community 59 - "Community 59"
Cohesion: 0.34
Nodes (10): Table(), TableHeader(), TableBody(), TableRow(), TableHead(), TableCell(), CreateProductionOrderDialogProps, NotesForm (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.09
Nodes (24): TableFooter(), EditableLabelTypeTableProps, EMPTY_ERRORS, EMPTY_OPTIONS, MachineOption, OperatorOption, LabelTypeRowProps, EMPTY_ERRORS (+16 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (20): RollMovement, RollStockInput, inventoryService, ApiError, axiosInstance, request(), api, Paginated (+12 more)

### Community 42 - "Community 42"
Cohesion: 0.14
Nodes (18): rollStockSchema, RollStockSchemaInput, RollStockDialogProps, RollStockDialog(), inventoryColumns, TYPE_OPTIONS, exportColumns, RollStockRowActions() (+10 more)

### Community 43 - "Community 43"
Cohesion: 0.14
Nodes (17): MachineSelectProps, MachineSelect(), OperatorSelectProps, OperatorSelect(), MACHINE_KEYS, OPERATOR_KEYS, useMachines(), useOperators() (+9 more)

### Community 64 - "Community 64"
Cohesion: 0.21
Nodes (11): RECEIPT_KEYS, useReceipts(), useCreateReceipt(), useUpdateReceipt(), useDeleteReceipt(), ReceiptKind, MaterialReceipt, ReceiptFieldType (+3 more)

### Community 107 - "Community 107"
Cohesion: 0.29
Nodes (1): MaterialReceiptPage()

### Community 65 - "Community 65"
Cohesion: 0.24
Nodes (10): MaterialSelectProps, MaterialSelect(), MATERIAL_KEYS, useMaterials(), useCreateMaterial(), useUpdateMaterial(), useDeleteMaterial(), materialService (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (65): BatchStage, LineKind, STAGES_OF, UNIT_LABEL, BatchStatus, BatchSourceEdge, ProductionBatch, formatDuration() (+57 more)

### Community 21 - "Community 21"
Cohesion: 0.09
Nodes (22): UnifiedPlanningDialogProps, UnifiedPlanningDialog(), PlanFormSubmitPayload, RollTrackingTableProps, StageDeductionFlowCardProps, createPlannedLineColumns(), PlannedLineRowActions(), rollColumns (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (49): PlanRowValues, PlanFormValues, PlanLabelTypeFormProps, ROLL_LENGTH_OPTIONS, EMPTY_ROW, initialRow(), PlanLabelTypeForm(), ThreadAllocationRow (+41 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (22): WovenProductionPanel(), WovenThreadReconciliationCardProps, WovenThreadReconciliationCard(), WovenTrackingTableProps, WovenTrackingTable(), wovenColumns, useOrderFlow(), WOVEN_KEYS (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (48): exportColumns, PRODUCTION_ORDER_KEYS, useProductionOrders(), useEligibleSalesOrders(), useCreateProductionOrder(), useDeleteProductionOrder(), useDeleteLine(), useLineMutation() (+40 more)

### Community 67 - "Community 67"
Cohesion: 0.24
Nodes (9): PurchaseFormProps, purchaseSchema, PurchaseSchemaInput, formatDate(), todayISO(), calculateRequiredRolls(), calculateTotalRolls(), totalRollEquivalent200m() (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.20
Nodes (12): purchaseColumns, PurchaseRowActions(), exportColumns, PurchaseTableProps, PURCHASE_KEYS, usePurchases(), useCreatePurchase(), useUpdatePurchase() (+4 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (30): ReceiveForm, ReceiveDyeingDialog(), SendForm, SendDyeingDialog(), ProviderForm, ServiceProviderDialog(), DYEING_KEYS, useProviders() (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (47): DENIER_OPTIONS, BASE_COLOR_OPTIONS, DyeThreadDialog(), DENIER_OPTIONS, COLOR_OPTIONS, ThreadPurchasePanel(), threadStockSchema, ThreadStockSchemaInput (+39 more)

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (21): WorkOrderBasicInfo(), workOrderColumns, WorkOrderRowActions(), STATUS_OPTIONS, PRODUCT_TYPE_OPTIONS, WorkOrderTableProps, exportColumns, WorkOrderStatus (+13 more)

### Community 48 - "Community 48"
Cohesion: 0.12
Nodes (8): defaultsFor(), WorkOrderDialog(), WORK_ORDER_KEYS, useWorkOrders(), useWorkOrderDetail(), useCreateWorkOrder(), useUpdateWorkOrder(), useDeleteWorkOrder()

### Community 39 - "Community 39"
Cohesion: 0.13
Nodes (20): workOrderService, WorkOrderInput, workOrderStatusEnum, workOrders, wovenThreadPlanItems, wovenWorkOrderDetails, 09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page, 0daa333 feat(client): show live stock balance in MaterialSelect (+12 more)

### Community 56 - "Community 56"
Cohesion: 0.16
Nodes (9): HealthprobeResult, HealthcheckProps, initial, probeBackend(), MaterialsHealthResult, HealthprobeResult, ProductionHealthResult, HealthprobeResult (+1 more)

### Community 143 - "Community 143"
Cohesion: 0.60
Nodes (3): SegmentedOption, SegmentedTabsProps, SegmentedTabs()

### Community 96 - "Community 96"
Cohesion: 0.36
Nodes (6): TableVisibilityMap, TableVisibilityState, EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), useTableVisibilityStore, useTableColumnVisibility()

### Community 50 - "Community 50"
Cohesion: 0.19
Nodes (18): companies, brands, materials, machines, operators, work_orders, production_progress, purchase_records (+10 more)

### Community 74 - "Community 74"
Cohesion: 0.29
Nodes (11): users, production_orders, production_order_lines, production_stage_events, operators, public.work_orders, public.users, public.production_orders (+3 more)

### Community 134 - "Community 134"
Cohesion: 0.70
Nodes (4): production_roll_issuances, public.production_order_lines, public.materials, public.users

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (15): woven_work_order_details, woven_production_lines, woven_thread_plan_items, thread_stocks, thread_purchases, thread_dye_batches, thread_stock_movements, work_orders (+7 more)

### Community 135 - "Community 135"
Cohesion: 0.60
Nodes (4): inventory_roll_movements, operators, public.inventory_rolls, public.users

### Community 61 - "Community 61"
Cohesion: 0.18
Nodes (15): production_runs, sticker_materials, local_sheets, label_sheets, thread_service_providers, thread_dyeing_allocations, thread_dyeing_receives, thread_dyeing_sends (+7 more)

### Community 136 - "Community 136"
Cohesion: 0.50
Nodes (4): ink_purchases, ink_consumptions, work_orders, public.operators

### Community 137 - "Community 137"
Cohesion: 0.70
Nodes (4): batch_consumptions, production_batches, production_order_lines, users

### Community 89 - "Community 89"
Cohesion: 0.42
Nodes (9): production_batches, production_stage_transactions, batch_consumptions, production_order_lines, public.production_order_lines, public.machines, public.operators, public.users (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (43): router, AnalyticsService, createCompanySchema, updateCompanySchema, CreateCompanyDTO, UpdateCompanyDTO, router, sql (+35 more)

### Community 148 - "Community 148"
Cohesion: 1.00
Nodes (3): woven_production_lines, production_batches, batch_consumptions

### Community 98 - "Community 98"
Cohesion: 0.25
Nodes (3): serverDir, sql, 2e755d6 feat(server): persist estimated weaving hours for woven work orders

### Community 94 - "Community 94"
Cohesion: 0.25
Nodes (7): label_types, production_order_lines, public.label_types, labelTypes, LabelType, NewLabelType, cd392dc feat(label-types): add label types master data CRUD

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (56): public.batch_consumptions, public.brands, public.companies, public.ink_consumptions, public.ink_purchases, public.inventory_roll_movements, public.inventory_rolls, public.label_sheets (+48 more)

### Community 141 - "Community 141"
Cohesion: 0.40
Nodes (4): argv, DRY, ALL, requested

### Community 63 - "Community 63"
Cohesion: 0.15
Nodes (14): SRC, SKIP_DIRS, MOVE, TAB, CR, LF, WS, QUOTE (+6 more)

### Community 149 - "Community 149"
Cohesion: 0.50
Nodes (1): SKIP

### Community 128 - "Community 128"
Cohesion: 0.40
Nodes (5): env, origin, admin, log, say()

### Community 142 - "Community 142"
Cohesion: 0.40
Nodes (4): here, envPath, env, sql

### Community 83 - "Community 83"
Cohesion: 0.18
Nodes (8): SRC, GONE_LAYER_DIRS, GONE_ALIASES, GONE_DIR_RE, files, findings, required, staleDirs

### Community 22 - "Community 22"
Cohesion: 0.09
Nodes (16): server, databaseConfig, envSchema, env, LogLevel, colors, Logger, getPgPool() (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (29): AnalyticsController, BrandController, CompanyController, InkController, InventoryRollController, InventoryController, MaterialController, LabelTypesController (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (69): MachineProductType, OperatorType, OperatorFilters, Denier, StockType, MovementType, ConsumptionSlice, workOrderWithBrandSelect (+61 more)

### Community 86 - "Community 86"
Cohesion: 0.20
Nodes (1): AnalyticsRepository

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (24): router, router, router, router, router, router, router, router (+16 more)

### Community 133 - "Community 133"
Cohesion: 0.40
Nodes (4): createBrandSchema, updateBrandSchema, CreateBrandDTO, UpdateBrandDTO

### Community 104 - "Community 104"
Cohesion: 0.29
Nodes (1): CompanyRepository

### Community 99 - "Community 99"
Cohesion: 0.25
Nodes (1): BrandRepository

### Community 106 - "Community 106"
Cohesion: 0.29
Nodes (1): CompanyService

### Community 105 - "Community 105"
Cohesion: 0.29
Nodes (1): BrandService

### Community 76 - "Community 76"
Cohesion: 0.17
Nodes (1): InkRepository

### Community 108 - "Community 108"
Cohesion: 0.29
Nodes (6): createInkPurchaseSchema, updateInkPurchaseSchema, createInkConsumptionSchema, CreateInkPurchaseDTO, UpdateInkPurchaseDTO, CreateInkConsumptionDTO

### Community 81 - "Community 81"
Cohesion: 0.22
Nodes (2): dec(), InkService

### Community 28 - "Community 28"
Cohesion: 0.08
Nodes (24): RollMovementType, RollListFilters, PurchaseInsert, StockAdjustment, SourceAllocation, CreateBatchInput, UpdateBatchInput, RecordOutputInput (+16 more)

### Community 90 - "Community 90"
Cohesion: 0.22
Nodes (1): InventoryRollRepository

### Community 102 - "Community 102"
Cohesion: 0.25
Nodes (7): createInventoryRollSchema, updateInventoryRollSchema, inventoryRollParamsSchema, listInventoryRollsQuerySchema, listRollMovementsQuerySchema, CreateInventoryRollDTO, UpdateInventoryRollDTO

### Community 95 - "Community 95"
Cohesion: 0.31
Nodes (3): withPerSkuBalance(), assertNonNegative(), InventoryRollService

### Community 82 - "Community 82"
Cohesion: 0.18
Nodes (1): InventoryRepository

### Community 138 - "Community 138"
Cohesion: 0.40
Nodes (4): createPurchaseSchema, CreatePurchaseDTO, updatePurchaseSchema, UpdatePurchaseDTO

### Community 58 - "Community 58"
Cohesion: 0.18
Nodes (6): DerivedInputs, calculateDerivedFields(), InventoryService, PurchaseRecord, calculateTotalRollPer200m(), calculateInvoiceWeight()

### Community 109 - "Community 109"
Cohesion: 0.33
Nodes (1): MaterialRepository

### Community 139 - "Community 139"
Cohesion: 0.40
Nodes (4): createMaterialSchema, updateMaterialSchema, CreateMaterialDTO, UpdateMaterialDTO

### Community 110 - "Community 110"
Cohesion: 0.29
Nodes (1): MaterialService

### Community 111 - "Community 111"
Cohesion: 0.29
Nodes (1): LabelTypesRepository

### Community 103 - "Community 103"
Cohesion: 0.25
Nodes (7): labelTypeEnum, createLabelTypeSchema, updateLabelTypeSchema, labelTypeParamsSchema, labelTypesQuerySchema, CreateLabelTypeDTO, UpdateLabelTypeDTO

### Community 121 - "Community 121"
Cohesion: 0.47
Nodes (1): LabelTypesService

### Community 122 - "Community 122"
Cohesion: 0.40
Nodes (1): MachineRepository

### Community 140 - "Community 140"
Cohesion: 0.40
Nodes (4): createMachineSchema, updateMachineSchema, CreateMachineDTO, UpdateMachineDTO

### Community 123 - "Community 123"
Cohesion: 0.33
Nodes (1): MachineService

### Community 126 - "Community 126"
Cohesion: 0.33
Nodes (1): StickerMaterialRepository

### Community 125 - "Community 125"
Cohesion: 0.33
Nodes (1): LocalSheetRepository

### Community 124 - "Community 124"
Cohesion: 0.33
Nodes (1): LabelSheetRepository

### Community 70 - "Community 70"
Cohesion: 0.15
Nodes (12): createStickerMaterialSchema, updateStickerMaterialSchema, createLocalSheetSchema, updateLocalSheetSchema, createLabelSheetSchema, updateLabelSheetSchema, CreateStickerMaterialDTO, UpdateStickerMaterialDTO (+4 more)

### Community 62 - "Community 62"
Cohesion: 0.15
Nodes (4): money(), StickerMaterialService, LocalSheetService, LabelSheetService

### Community 127 - "Community 127"
Cohesion: 0.40
Nodes (1): OperatorRepository

### Community 112 - "Community 112"
Cohesion: 0.29
Nodes (6): operatorTypeEnum, avatarUrlSchema, createOperatorSchema, updateOperatorSchema, CreateOperatorDTO, UpdateOperatorDTO

### Community 113 - "Community 113"
Cohesion: 0.33
Nodes (2): normaliseAvatar(), OperatorService

### Community 36 - "Community 36"
Cohesion: 0.12
Nodes (16): ProductionStage, TransferTarget, PlanLineInput, RESOURCE_SLOTS, toNumbers(), stageCompletionPatch(), hasAnyProgress(), deriveLineStatus() (+8 more)

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (27): BatchStage, BatchStatus, LineKind, LineRef, STAGES_OF, UNIT_OF, UPSTREAM_OF, DOWNSTREAM_OF (+19 more)

### Community 53 - "Community 53"
Cohesion: 0.11
Nodes (13): hoisted, FakeRow, RemainingPlanned, WOVEN, PRINTED, JoinKind, Join, BATCHES (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (5): lineColumn(), lineRefOfBatch(), lineRefOfBatchOrNull(), BatchFlowRepository, round2()

### Community 46 - "Community 46"
Cohesion: 0.10
Nodes (18): rolls, optionalRolls, labelQty, actorUserId, lineIdParamsSchema, batchIdParamsSchema, sourceAllocation, createPrintingBatchSchema (+10 more)

### Community 119 - "Community 119"
Cohesion: 0.33
Nodes (2): mocks, cuttingBatch

### Community 44 - "Community 44"
Cohesion: 0.21
Nodes (1): BatchFlowService

### Community 93 - "Community 93"
Cohesion: 0.22
Nodes (1): ProductionRunRepository

### Community 132 - "Community 132"
Cohesion: 0.40
Nodes (4): RUN_REASONS, createProductionRunSchema, saleOrderParamsSchema, CreateProductionRunDTO

### Community 152 - "Community 152"
Cohesion: 0.67
Nodes (1): ProductionRunService

### Community 79 - "Community 79"
Cohesion: 0.20
Nodes (9): MachineAvailability, OperatorAvailability, ResourceUsage, Classification, RANK, classify(), MachineWithAvailability, OperatorWithAvailability (+1 more)

### Community 73 - "Community 73"
Cohesion: 0.30
Nodes (5): ProductionOrderLine, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct()

### Community 55 - "Community 55"
Cohesion: 0.16
Nodes (11): order, order, toNumbers(), hasWovenProgress(), deriveWovenLineStatus(), canStartCutting(), canStartPackaging(), ThreadPlanInput (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.07
Nodes (3): workOrderStatusFor(), syncWorkOrderStatusTx(), ProductionOrderRepository

### Community 41 - "Community 41"
Cohesion: 0.08
Nodes (24): sizePlanItemSchema, planLineSchema, createProductionOrderSchema, updateProductionOrderSchema, planLineRequestSchema, assignLineResourcesSchema, updateStageProgressSchema, transferRollsSchema (+16 more)

### Community 31 - "Community 31"
Cohesion: 0.16
Nodes (1): ProductionOrderService

### Community 85 - "Community 85"
Cohesion: 0.18
Nodes (1): WovenProductionRepository

### Community 69 - "Community 69"
Cohesion: 0.14
Nodes (13): denierEnum, threadPlanItemSchema, sizePlanItemSchema, planWovenLineSchema, updateWeavingSchema, updateWovenCuttingSchema, updateWovenPackagingSchema, reconcileRemainingThreadsSchema (+5 more)

### Community 78 - "Community 78"
Cohesion: 0.41
Nodes (1): WovenProductionService

### Community 114 - "Community 114"
Cohesion: 0.29
Nodes (1): ThreadDyeingRepository

### Community 115 - "Community 115"
Cohesion: 0.29
Nodes (6): denierEnum, baseColorEnum, createDyeingSendSchema, receiveDyeingSchema, CreateDyeingSendDTO, ReceiveDyeingDTO

### Community 151 - "Community 151"
Cohesion: 0.50
Nodes (1): ThreadDyeingService

### Community 49 - "Community 49"
Cohesion: 0.11
Nodes (1): ThreadInventoryRepository

### Community 77 - "Community 77"
Cohesion: 0.17
Nodes (11): denierEnum, baseColorEnum, createThreadPurchaseSchema, createDyeBatchSchema, createThreadStockSchema, updateThreadStockSchema, listThreadStocksQuerySchema, listThreadPurchasesQuerySchema (+3 more)

### Community 71 - "Community 71"
Cohesion: 0.18
Nodes (1): ThreadInventoryService

### Community 129 - "Community 129"
Cohesion: 0.33
Nodes (1): ThreadServiceProviderRepository

### Community 146 - "Community 146"
Cohesion: 0.40
Nodes (4): createThreadServiceProviderSchema, updateThreadServiceProviderSchema, CreateThreadServiceProviderDTO, UpdateThreadServiceProviderDTO

### Community 130 - "Community 130"
Cohesion: 0.47
Nodes (1): ThreadServiceProviderService

### Community 116 - "Community 116"
Cohesion: 0.33
Nodes (1): UserRepository

### Community 131 - "Community 131"
Cohesion: 0.33
Nodes (5): userRoleSchema, createUserSchema, updateUserSchema, CreateUserDTO, UpdateUserDTO

### Community 117 - "Community 117"
Cohesion: 0.29
Nodes (1): UserService

### Community 84 - "Community 84"
Cohesion: 0.20
Nodes (1): WorkOrderRepository

### Community 68 - "Community 68"
Cohesion: 0.14
Nodes (13): artworkImageSchema, wovenDetailSchema, WORK_ORDER_PRIORITIES, WORK_ORDER_TYPES, prioritySchema, orderTypeSchema, createWorkOrderSchema, updateWorkOrderSchema (+5 more)

### Community 118 - "Community 118"
Cohesion: 0.29
Nodes (1): WorkOrderService

### Community 91 - "Community 91"
Cohesion: 0.20
Nodes (5): ROOT, SRC, ALLOWED_CROSS_MODULE_REPO_EDGES, files, graph

### Community 88 - "Community 88"
Cohesion: 0.20
Nodes (9): __filename, __dirname, migrationDir, files, sqlPath, maskedUrl, raw, statements (+1 more)

### Community 101 - "Community 101"
Cohesion: 0.46
Nodes (7): src, dest, IGNORE(), publicTables(), fkEdges(), topoSort(), main()

### Community 34 - "Community 34"
Cohesion: 0.07
Nodes (27): companiesRelations, brandsRelations, workOrdersRelations, usersRelations, productionOrdersRelations, productionOrderLinesRelations, productionBatchesRelations, batchConsumptionsRelations (+19 more)

### Community 33 - "Community 33"
Cohesion: 0.12
Nodes (26): MaterialSeed, MATERIALS, OperatorSeed, OPERATORS, MachineSeed, MACHINES, CompanySeed, COMPANIES (+18 more)

### Community 150 - "Community 150"
Cohesion: 0.50
Nodes (3): productionBatchStageEnum, productionBatchStatusEnum, productionBatches

### Community 144 - "Community 144"
Cohesion: 0.40
Nodes (4): threadDyeingSendStatusEnum, threadDyeingSends, threadDyeingAllocations, threadDyeingReceives

### Community 145 - "Community 145"
Cohesion: 0.40
Nodes (4): threadDenierEnum, threadBaseColorEnum, threadStockTypeEnum, threadMovementTypeEnum

### Community 153 - "Community 153"
Cohesion: 0.67
Nodes (2): userRoleEnum, users

### Community 154 - "Community 154"
Cohesion: 0.67
Nodes (2): inferSelect, inferInsert

### Community 120 - "Community 120"
Cohesion: 0.60
Nodes (4): notFound(), asPgError(), handlePgError(), errorHandler()

### Community 147 - "Community 147"
Cohesion: 0.40
Nodes (4): idParamsSchema, lineIdParamsSchema, companyIdParamsSchema, paginationQuerySchema

### Community 52 - "Community 52"
Cohesion: 0.11
Nodes (18): listMaterialsQuerySchema, listMachinesQuerySchema, listOperatorsQuerySchema, listCompaniesQuerySchema, ListMachinesQueryDTO, ListOperatorsQueryDTO, ListCompaniesQueryDTO, listWorkOrdersQuerySchema (+10 more)

### Community 97 - "Community 97"
Cohesion: 0.36
Nodes (7): ROOT, fail(), info(), heading(), runEnv(), parseArgs(), main()

## Knowledge Gaps
- **783 isolated node(s):** `app`, `AppRoute`, `RedirectRoute`, `AppCardProps`, `TrendDirection` (+778 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 92`** (2 nodes): `navigationMenuTriggerStyle`, `NavigationMenuTrigger()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (1 nodes): `MaterialReceiptPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 149`** (1 nodes): `SKIP`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `AnalyticsRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 104`** (1 nodes): `CompanyRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (1 nodes): `BrandRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 106`** (1 nodes): `CompanyService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 105`** (1 nodes): `BrandService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `InkRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (2 nodes): `dec()`, `InkService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `InventoryRollRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `InventoryRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (1 nodes): `MaterialRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `MaterialService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 111`** (1 nodes): `LabelTypesRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `LabelTypesService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (1 nodes): `MachineRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `MachineService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `StickerMaterialRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `LocalSheetRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (1 nodes): `LabelSheetRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 127`** (1 nodes): `OperatorRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (2 nodes): `normaliseAvatar()`, `OperatorService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (2 nodes): `mocks`, `cuttingBatch`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `BatchFlowService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (1 nodes): `ProductionRunRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 152`** (1 nodes): `ProductionRunService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `ProductionOrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `WovenProductionRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `WovenProductionService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (1 nodes): `ThreadDyeingRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 151`** (1 nodes): `ThreadDyeingService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `ThreadInventoryRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `ThreadInventoryService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (1 nodes): `ThreadServiceProviderRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (1 nodes): `ThreadServiceProviderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (1 nodes): `UserRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (1 nodes): `UserService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `WorkOrderRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `WorkOrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 153`** (2 nodes): `userRoleEnum`, `users`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 154`** (2 nodes): `inferSelect`, `inferInsert`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProductionOrderRepository` connect `Community 24` to `Community 28`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `BatchFlowRepository` connect `Community 17` to `Community 28`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProductionOrderService` connect `Community 31` to `Community 73`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `app`, `AppRoute`, `RedirectRoute` to the rest of the system?**
  _783 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 8` be split into smaller, more focused modules?**
  _Cohesion score 0.05137844611528822 - nodes in this community are weakly interconnected._
- **Should `Community 51` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.06259426847662142 - nodes in this community are weakly interconnected._