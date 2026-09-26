# Graph Report - .  (2026-09-23)

## Corpus Check
- 455 files · ~142,865 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2085 nodes · 5350 edges · 118 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: imports: 1609 · contains: 1460 · imports_from: 1175 · MODIFIES: 683 · method: 163 · calls: 86 · re_exports: 76 · references: 62 · ON_BRANCH: 15 · PARENT_OF: 14 · inherits: 7


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 455 · Candidates: 552
- Excluded: 344 untracked · 54043 ignored · 0 sensitive · 55 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `ee6d4dd`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 79 edges
2. `AppButton` - 65 edges
3. `formatNumber()` - 48 edges
4. `AppInput` - 28 edges
5. `StatusBadge()` - 27 edges
6. `PageHeader()` - 23 edges
7. `AppDialog()` - 22 edges
8. `SubmitOnEnter()` - 21 edges
9. `buttonVariants` - 20 edges
10. `Messages` - 20 edges

## Surprising Connections (you probably didn't know these)
- `09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 34 → community 24_
- `3e6a631 feat: woven production client UI, branching off the shared dashboard` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 13 → community 24_
- `933ccd7 feat: stock CRUD UI, operator type/avatar, artwork preview, production summary` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 1 → community 24_
- `933ccd7 feat: stock CRUD UI, operator type/avatar, artwork preview, production summary` --PARENT_OF--> `9b99ce1 feat: complete production workflow, stock master data, company brand columns & responsive layout`  [EXTRACTED]
  git → git  _Bridges community 1 → community 26_
- `95aebc1 feat: thread receiving, stock and dyeing UI as tabs on existing pages` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 8 → community 24_

## Communities

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (16): AppProviders(), LayoutProvider(), QueryProvider(), ThemeProvider(), ToastProvider(), Toaster(), TooltipProvider(), queryClient (+8 more)

### Community 36 - "Community 36"
Cohesion: 0.13
Nodes (9): app, Props, State, ErrorBoundary, Component, apiRouter, indexRouter, apiRateLimiter (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.16
Nodes (6): AppRoutes(), AppRoute, RedirectRoute, routes, redirects, MaterialReceiptPage()

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (19): AppCardProps, TrendDirection, StatCardProps, Card(), CardHeader(), CardTitle(), CardDescription(), CardAction() (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (25): AppCard, ColorRow, WovenPlanningFormProps, WovenPlanningForm(), WovenThreadReconciliationCardProps, WovenThreadReconciliationCard(), WovenTrackingTableProps, WovenTrackingTable() (+17 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (17): StatCard(), LogProductionRunDialog(), columns, ProductionHistoryTable(), ProductionSummaryCard(), PRODUCTION_RUN_KEYS, useProductionSummary(), useLogProductionRun() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (45): AppDialogProps, AppDialog(), AppButtonProps, AppButton, AppInputProps, AppInput, AppSelectOption, AppSelectProps (+37 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (33): ConfirmDialogProps, AlertDialog(), AlertDialogTrigger(), AlertDialogContent(), AlertDialogHeader(), AlertDialogFooter(), AlertDialogTitle(), AlertDialogDescription() (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (39): ConfirmDialog(), Tabs(), tabsListVariants, TabsList(), TabsTrigger(), TabsContent(), Props, InkConsumptionDialog() (+31 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (17): ImagePreviewProps, ImagePreview(), ImageUploadFieldProps, badgeVariants, Badge(), Button, inputGroupAddonVariants, InputGroupAddon() (+9 more)

### Community 60 - "Community 60"
Cohesion: 0.23
Nodes (7): initialsOf(), OperatorAvatarProps, OperatorAvatar(), OperatorAvatarName(), Avatar(), AvatarImage(), AvatarFallback()

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (43): statusBadgeVariants, DOT_COLORS, StatusBadgeProps, StatusBadge(), ComboboxOption, ComboboxSelectProps, ComboboxSelect(), EmptyContent() (+35 more)

### Community 64 - "Community 64"
Cohesion: 0.20
Nodes (9): StatusVariant, ORDER_STATUS, LINE_STATUS, ProductionOrderStatusBadge(), ProductionLineStatusBadge(), PRIORITY_META, productionOrderColumns, ProductionOrderRowActions() (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (14): AppComboboxProps, AppCombobox(), PlanLabelTypeFormProps, EMPTY, ROLL_LENGTH_OPTIONS, PurchaseFormProps, purchaseSchema, PurchaseSchemaInput (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.16
Nodes (16): ImageUploadField(), DispatchDialogProps, DispatchDialog(), WORK_ORDER_KEYS, useCreateWorkOrder(), useUpdateWorkOrder(), useDispatchWorkOrder(), dispatchSchema (+8 more)

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (18): SIZES, PageContainerProps, PageContainer(), Breadcrumb(), BreadcrumbList(), BreadcrumbItem(), BreadcrumbPage(), BreadcrumbSeparator() (+10 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (7): PageHeaderProps, PageHeader(), PurchaseForm(), PurchaseTable(), PurchaseTab, TABS, WorkOrderTable()

### Community 45 - "Community 45"
Cohesion: 0.16
Nodes (9): Calendar(), Popover(), PopoverTrigger(), PopoverContent(), purchaseColumns, exportColumns, PurchaseTableProps, DatePickerProps (+1 more)

### Community 68 - "Community 68"
Cohesion: 0.22
Nodes (8): THEMES, INITIAL_DIMENSION, TooltipNameType, ChartContextProps, ChartContext, useChart(), ChartTooltipContent(), ChartLegendContent()

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (18): Checkbox(), DataTableColumnHeader(), DataTableEmpty(), DataTableExportColumn, toRecords(), exportRowsToExcel(), PrintTable(), pageWindow() (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (29): Collapsible(), CollapsibleTrigger, CollapsibleContent(), Sheet(), SheetContent(), SheetHeader(), SheetTitle(), SheetDescription() (+21 more)

### Community 37 - "Community 37"
Cohesion: 0.11
Nodes (3): ComboboxTrigger, InputGroupButton, InputGroupInput

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (17): CommandDialog(), CommandInput(), CommandList(), CommandEmpty(), CommandGroup(), CommandSeparator(), CommandItem(), Dialog() (+9 more)

### Community 51 - "Community 51"
Cohesion: 0.14
Nodes (4): DrawerContextProps, DrawerContext, useDrawer(), DrawerContent()

### Community 77 - "Community 77"
Cohesion: 0.39
Nodes (7): Empty(), EmptyHeader(), emptyMediaVariants, EmptyMedia(), EmptyTitle(), EmptyDescription(), DataTableEmptyProps

### Community 76 - "Community 76"
Cohesion: 0.22
Nodes (2): navigationMenuTriggerStyle, NavigationMenuTrigger()

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (13): Pagination(), PaginationContent(), PaginationItem(), PaginationLinkProps, PaginationLink(), PaginationPrevious(), PaginationNext(), PaginationEllipsis() (+5 more)

### Community 56 - "Community 56"
Cohesion: 0.19
Nodes (7): Progress(), RollTrackingTableProps, StageDeductionFlowCardProps, rollColumns, ProductionLineOverview, ProgressBarProps, ProgressBar()

### Community 40 - "Community 40"
Cohesion: 0.29
Nodes (11): Table(), TableHeader(), TableBody(), TableRow(), TableHead(), TableCell(), Textarea, CreateProductionOrderDialogProps (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (24): TableFooter(), EditableLabelTypeTableProps, EMPTY_ERRORS, EMPTY_OPTIONS, MachineOption, OperatorOption, LabelTypeRowProps, EMPTY_ERRORS (+16 more)

### Community 58 - "Community 58"
Cohesion: 0.26
Nodes (9): Tooltip(), TooltipTrigger(), TooltipContent(), EditableCellNumber(), useEditableCell(), editableCellClass, EditableCellInputProps, EditableCellInput() (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.17
Nodes (12): brandSchema, BrandInput, BrandDialogProps, BrandDialog(), BrandTableProps, createBrandColumns(), BrandRowActions(), useCreateBrand() (+4 more)

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (7): BrandTable(), CompanyDialog(), CompanyTableProps, CompanyTable(), companyColumns, CompanyRowActions(), Company

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (10): CompanySelectProps, CompanySelect(), COMPANY_KEYS, useCompanies(), useCompanyBrands(), useCreateCompany(), useUpdateCompany(), useDeleteCompany() (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.16
Nodes (15): RollMovementType, RollListFilters, InventoryRollWithComputed, PurchaseInsert, StockAdjustment, UserRole, Messages, Entity (+7 more)

### Community 73 - "Community 73"
Cohesion: 0.27
Nodes (5): useWorkOrderTrend(), DASHBOARD_KEYS, useDashboardKpis(), dashboardService, useWorkOrders()

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (47): DashboardKpis, KpiResponse, rollStockSchema, RollStockSchemaInput, RollStockDialogProps, RollStockDialog(), inventoryColumns, TYPE_OPTIONS (+39 more)

### Community 54 - "Community 54"
Cohesion: 0.21
Nodes (7): InventoryStockTable(), StockTab, TABS, SegmentedOption, SegmentedTabsProps, SegmentedTabs(), ab23f28 fix: tab switcher rendered unstyled and collapsed the page layout

### Community 43 - "Community 43"
Cohesion: 0.13
Nodes (7): MachineTable(), OperatorTable(), rollMovementTypeEnum, inventoryRollMovements, operatorTypeEnum, operators, c27dc7d feat(server): stock CRUD history, operator type/avatar, stage traceability

### Community 109 - "Community 109"
Cohesion: 0.50
Nodes (2): MaterialForm(), MaterialTable()

### Community 41 - "Community 41"
Cohesion: 0.21
Nodes (11): RECEIPT_KEYS, useReceipts(), useCreateReceipt(), useUpdateReceipt(), useDeleteReceipt(), ReceiptKind, MaterialReceipt, ReceiptFieldType (+3 more)

### Community 108 - "Community 108"
Cohesion: 0.50
Nodes (2): CreateProductionOrderDialog(), ProductionOrderTable()

### Community 46 - "Community 46"
Cohesion: 0.15
Nodes (11): UnifiedPlanningDialogProps, PlanLabelTypeForm(), createPlannedLineColumns(), PlannedLineRowActions(), useProductionOrderOverview(), usePlanLine(), useUpdateLinePlan(), ProductType (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (24): UnifiedPlanningDialog(), StageSummary, ProductionSummary(), StockReconciliationCardProps, StockReconciliationCard(), WovenProductionPanel(), exportColumns, PRODUCTION_ORDER_KEYS (+16 more)

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (6): useCompletionCelebration(), ProductionOrderStatus, prefersReducedMotion(), fireConfetti(), playSuccessChime(), celebrateCompletion()

### Community 52 - "Community 52"
Cohesion: 0.14
Nodes (13): createProductionOrderSchema, sizePlanSchema, planLineSchema, PlanLineSchemaInput, CreateProductionOrderSchemaInput, stageProgressSchema, transferRollsSchema, assignResourcesSchema (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (32): ProductionStage, TransferTarget, UserRole, User, EligibleSalesOrder, ProductionOrder, ProductionOrderLine, ProductionOrderDetail (+24 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (30): ReceiveForm, ReceiveDyeingDialog(), SendForm, SendDyeingDialog(), ProviderForm, ServiceProviderDialog(), DYEING_KEYS, useProviders() (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (39): DENIER_OPTIONS, BASE_COLOR_OPTIONS, DyeThreadDialog(), DENIER_OPTIONS, COLOR_OPTIONS, ThreadPurchasePanel(), UndyedThreadStockPanel(), DyedThreadStockPanel() (+31 more)

### Community 26 - "Community 26"
Cohesion: 0.16
Nodes (15): ArtworkAndComment(), CompanyInfo(), DispatchInfo(), OrderInfo(), WorkOrderDialogProps, defaultsFor(), WorkOrderDialog(), WovenSpecification() (+7 more)

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (20): WorkOrderBasicInfo(), workOrderColumns, WorkOrderRowActions(), STATUS_OPTIONS, PRODUCT_TYPE_OPTIONS, WorkOrderTableProps, exportColumns, WorkOrderStatus (+12 more)

### Community 61 - "Community 61"
Cohesion: 0.17
Nodes (2): useWorkOrderDetail(), useDeleteWorkOrder()

### Community 113 - "Community 113"
Cohesion: 0.67
Nodes (2): ImportMetaEnv, ImportMeta

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (32): AnalyticsController, router, CompanyController, router, InkController, InventoryRollController, InventoryController, MaterialController (+24 more)

### Community 35 - "Community 35"
Cohesion: 0.19
Nodes (18): companies, brands, materials, machines, operators, work_orders, production_progress, purchase_records (+10 more)

### Community 59 - "Community 59"
Cohesion: 0.29
Nodes (11): users, production_orders, production_order_lines, production_stage_events, operators, public.work_orders, public.users, public.production_orders (+3 more)

### Community 98 - "Community 98"
Cohesion: 0.70
Nodes (4): production_roll_issuances, public.production_order_lines, public.materials, public.users

### Community 47 - "Community 47"
Cohesion: 0.21
Nodes (15): woven_work_order_details, woven_production_lines, woven_thread_plan_items, thread_stocks, thread_purchases, thread_dye_batches, thread_stock_movements, work_orders (+7 more)

### Community 99 - "Community 99"
Cohesion: 0.60
Nodes (4): inventory_roll_movements, operators, public.inventory_rolls, public.users

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (15): production_runs, sticker_materials, local_sheets, label_sheets, thread_service_providers, thread_dyeing_allocations, thread_dyeing_receives, thread_dyeing_sends (+7 more)

### Community 100 - "Community 100"
Cohesion: 0.50
Nodes (4): ink_purchases, ink_consumptions, work_orders, public.operators

### Community 101 - "Community 101"
Cohesion: 0.70
Nodes (4): batch_consumptions, production_batches, production_order_lines, users

### Community 72 - "Community 72"
Cohesion: 0.42
Nodes (9): production_batches, production_stage_transactions, batch_consumptions, production_order_lines, public.production_order_lines, public.machines, public.operators, public.users (+1 more)

### Community 110 - "Community 110"
Cohesion: 1.00
Nodes (3): woven_production_lines, production_batches, batch_consumptions

### Community 105 - "Community 105"
Cohesion: 0.40
Nodes (4): argv, DRY, ALL, requested

### Community 67 - "Community 67"
Cohesion: 0.18
Nodes (8): SRC, GONE_LAYER_DIRS, GONE_ALIASES, GONE_DIR_RE, files, findings, required, staleDirs

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (14): round4(), sizeMm(), fillWeights(), seedMaterials(), seedOperators(), MACHINE_TAKEOVERS, seedMachines(), realignExistingLines() (+6 more)

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (13): server, databaseConfig, envSchema, env, getPgPool(), getDb(), setupGracefulShutdown(), migrateMachinesTable() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (57): workOrderWithBrandSelect, NewCompany, NewBrand, Material, NewMaterial, NewMachine, NewOperator, WorkOrder (+49 more)

### Community 70 - "Community 70"
Cohesion: 0.20
Nodes (1): AnalyticsRepository

### Community 112 - "Community 112"
Cohesion: 0.67
Nodes (1): AnalyticsService

### Community 39 - "Community 39"
Cohesion: 0.11
Nodes (4): CompanyRepository, BrandRepository, Company, Brand

### Community 29 - "Community 29"
Cohesion: 0.19
Nodes (13): router, router, router, router, router, router, router, router (+5 more)

### Community 97 - "Community 97"
Cohesion: 0.40
Nodes (4): createCompanySchema, updateCompanySchema, CreateCompanyDTO, UpdateCompanyDTO

### Community 83 - "Community 83"
Cohesion: 0.29
Nodes (1): CompanyService

### Community 82 - "Community 82"
Cohesion: 0.29
Nodes (1): BrandService

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (11): MachineProductType, OperatorType, OperatorFilters, db, Database, Machine, Operator, User (+3 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (1): InkRepository

### Community 84 - "Community 84"
Cohesion: 0.29
Nodes (6): createInkPurchaseSchema, updateInkPurchaseSchema, createInkConsumptionSchema, CreateInkPurchaseDTO, UpdateInkPurchaseDTO, CreateInkConsumptionDTO

### Community 65 - "Community 65"
Cohesion: 0.22
Nodes (2): dec(), InkService

### Community 74 - "Community 74"
Cohesion: 0.22
Nodes (1): InventoryRollRepository

### Community 81 - "Community 81"
Cohesion: 0.25
Nodes (7): createInventoryRollSchema, updateInventoryRollSchema, inventoryRollParamsSchema, listInventoryRollsQuerySchema, listRollMovementsQuerySchema, CreateInventoryRollDTO, UpdateInventoryRollDTO

### Community 78 - "Community 78"
Cohesion: 0.31
Nodes (3): withPerSkuBalance(), assertNonNegative(), InventoryRollService

### Community 66 - "Community 66"
Cohesion: 0.18
Nodes (1): InventoryRepository

### Community 102 - "Community 102"
Cohesion: 0.40
Nodes (4): createPurchaseSchema, CreatePurchaseDTO, updatePurchaseSchema, UpdatePurchaseDTO

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (9): DerivedInputs, calculateDerivedFields(), InventoryService, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct(), calculateTotalRollPer200m() (+1 more)

### Community 85 - "Community 85"
Cohesion: 0.33
Nodes (1): MaterialRepository

### Community 103 - "Community 103"
Cohesion: 0.40
Nodes (4): createMaterialSchema, updateMaterialSchema, CreateMaterialDTO, UpdateMaterialDTO

### Community 86 - "Community 86"
Cohesion: 0.29
Nodes (1): MaterialService

### Community 92 - "Community 92"
Cohesion: 0.40
Nodes (1): MachineRepository

### Community 104 - "Community 104"
Cohesion: 0.40
Nodes (4): createMachineSchema, updateMachineSchema, CreateMachineDTO, UpdateMachineDTO

### Community 93 - "Community 93"
Cohesion: 0.33
Nodes (1): MachineService

### Community 94 - "Community 94"
Cohesion: 0.40
Nodes (1): OperatorRepository

### Community 87 - "Community 87"
Cohesion: 0.29
Nodes (6): operatorTypeEnum, avatarUrlSchema, createOperatorSchema, updateOperatorSchema, CreateOperatorDTO, UpdateOperatorDTO

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (2): normaliseAvatar(), OperatorService

### Community 89 - "Community 89"
Cohesion: 0.33
Nodes (1): UserRepository

### Community 95 - "Community 95"
Cohesion: 0.33
Nodes (5): userRoleSchema, createUserSchema, updateUserSchema, CreateUserDTO, UpdateUserDTO

### Community 90 - "Community 90"
Cohesion: 0.29
Nodes (1): UserService

### Community 69 - "Community 69"
Cohesion: 0.20
Nodes (1): WorkOrderRepository

### Community 53 - "Community 53"
Cohesion: 0.14
Nodes (13): artworkImageSchema, wovenDetailSchema, WORK_ORDER_PRIORITIES, WORK_ORDER_TYPES, prioritySchema, orderTypeSchema, createWorkOrderSchema, updateWorkOrderSchema (+5 more)

### Community 91 - "Community 91"
Cohesion: 0.29
Nodes (1): WorkOrderService

### Community 75 - "Community 75"
Cohesion: 0.20
Nodes (5): ROOT, SRC, ALLOWED_CROSS_MODULE_REPO_EDGES, files, graph

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (7): LogLevel, colors, Logger, notFound(), asPgError(), handlePgError(), errorHandler()

### Community 57 - "Community 57"
Cohesion: 0.26
Nodes (7): validateSizePlan(), normalizeSizePlan(), SizePlan, LABEL_TYPES, isSizeLabel(), productionOrderLines, wovenProductionLines

### Community 71 - "Community 71"
Cohesion: 0.20
Nodes (9): __filename, __dirname, migrationDir, files, sqlPath, maskedUrl, raw, statements (+1 more)

### Community 79 - "Community 79"
Cohesion: 0.46
Nodes (7): src, dest, IGNORE(), publicTables(), fkEdges(), topoSort(), main()

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (27): companiesRelations, brandsRelations, workOrdersRelations, usersRelations, productionOrdersRelations, productionOrderLinesRelations, productionBatchesRelations, batchConsumptionsRelations (+19 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (26): MaterialSeed, MATERIALS, OperatorSeed, OPERATORS, MachineSeed, MACHINES, CompanySeed, COMPANIES (+18 more)

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (16): productTypeEnum, threadDyeBatches, threadPurchases, threadStockMovements, threadStocks, threadDenierEnum, threadBaseColorEnum, threadStockTypeEnum (+8 more)

### Community 111 - "Community 111"
Cohesion: 0.50
Nodes (3): productionBatchStageEnum, productionBatchStatusEnum, productionBatches

### Community 114 - "Community 114"
Cohesion: 0.67
Nodes (2): productionOrderStatusEnum, productionOrders

### Community 115 - "Community 115"
Cohesion: 0.67
Nodes (2): productionEventTypeEnum, productionStageEvents

### Community 116 - "Community 116"
Cohesion: 0.67
Nodes (2): productionStageTxTypeEnum, productionStageTransactions

### Community 106 - "Community 106"
Cohesion: 0.40
Nodes (4): threadDyeingSendStatusEnum, threadDyeingSends, threadDyeingAllocations, threadDyeingReceives

### Community 117 - "Community 117"
Cohesion: 0.67
Nodes (2): userRoleEnum, users

### Community 118 - "Community 118"
Cohesion: 0.67
Nodes (2): inferSelect, inferInsert

### Community 107 - "Community 107"
Cohesion: 0.40
Nodes (4): idParamsSchema, lineIdParamsSchema, companyIdParamsSchema, paginationQuerySchema

### Community 38 - "Community 38"
Cohesion: 0.11
Nodes (18): listMaterialsQuerySchema, listMachinesQuerySchema, listOperatorsQuerySchema, listCompaniesQuerySchema, ListMachinesQueryDTO, ListOperatorsQueryDTO, ListCompaniesQueryDTO, listWorkOrdersQuerySchema (+10 more)

## Knowledge Gaps
- **520 isolated node(s):** `app`, `AppRoute`, `RedirectRoute`, `AppCardProps`, `TrendDirection` (+515 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 76`** (2 nodes): `navigationMenuTriggerStyle`, `NavigationMenuTrigger()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (2 nodes): `MaterialForm()`, `MaterialTable()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (2 nodes): `CreateProductionOrderDialog()`, `ProductionOrderTable()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (2 nodes): `useWorkOrderDetail()`, `useDeleteWorkOrder()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (2 nodes): `ImportMetaEnv`, `ImportMeta`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `AnalyticsRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (1 nodes): `AnalyticsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `CompanyService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `BrandService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `InkRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (2 nodes): `dec()`, `InkService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `InventoryRollRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `InventoryRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `MaterialRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `MaterialService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `MachineRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (1 nodes): `MachineService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (1 nodes): `OperatorRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (2 nodes): `normaliseAvatar()`, `OperatorService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `UserRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `UserService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `WorkOrderRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `WorkOrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (2 nodes): `productionOrderStatusEnum`, `productionOrders`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (2 nodes): `productionEventTypeEnum`, `productionStageEvents`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (2 nodes): `productionStageTxTypeEnum`, `productionStageTransactions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (2 nodes): `userRoleEnum`, `users`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (2 nodes): `inferSelect`, `inferInsert`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 10` to `Community 18`, `Community 2`, `Community 40`, `Community 45`, `Community 14`, `Community 27`, `Community 64`, `Community 11`, `Community 56`, `Community 12`, `Community 8`, `Community 28`, `Community 13`, `Community 17`, `Community 58`, `Community 3`, `Community 60`, `Community 5`, `Community 23`, `Community 33`, `Community 54`, `Community 7`, `Community 68`, `Community 37`, `Community 21`, `Community 51`, `Community 77`, `Community 76`, `Community 32`, `Community 6`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `InkRepository` connect `Community 62` to `Community 30`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `AppButton` connect `Community 3` to `Community 2`, `Community 44`, `Community 63`, `Community 40`, `Community 34`, `Community 8`, `Community 6`, `Community 1`, `Community 14`, `Community 5`, `Community 41`, `Community 27`, `Community 11`, `Community 25`, `Community 45`, `Community 12`, `Community 28`, `Community 26`, `Community 13`, `Community 17`, `Community 10`, `Community 109`, `Community 108`, `Community 46`, `Community 33`, `Community 61`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `app`, `AppRoute`, `RedirectRoute` to the rest of the system?**
  _520 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.06553911205073996 - nodes in this community are weakly interconnected._
- **Should `Community 36` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Community 18` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._