# Graph Report - .  (2026-11-07)

## Corpus Check
- Large corpus: 579 files · ~249,730 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 3107 nodes · 7428 edges · 164 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 2103 · imports: 2040 · imports_from: 1404 · MODIFIES: 921 · method: 403 · calls: 259 · references: 110 · re_exports: 100 · ON_BRANCH: 37 · PARENT_OF: 36 · inherits: 15


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 579 · Candidates: 720
- Excluded: 508 untracked · 54505 ignored · 0 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `0f7814f`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 83 edges
2. `AppButton` - 75 edges
3. `formatNumber()` - 60 edges
4. `BatchFlowRepository` - 35 edges
5. `AppInput` - 33 edges
6. `ProductionOrderRepository` - 32 edges
7. `ProductionOrderService` - 30 edges
8. `AppDialog()` - 29 edges
9. `StatusBadge()` - 29 edges
10. `Messages` - 28 edges

## Surprising Connections (you probably didn't know these)
- `09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 46 → community 64_
- `0a3ef12 fix(production): order-scoped cutting/packaging batch visibility - read path + create path` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 45 → community 64_
- `13b0a3c chore(server): give vitest a fallback DATABASE_URL` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 2 → community 64_
- `13b0a3c chore(server): give vitest a fallback DATABASE_URL` --PARENT_OF--> `558dd8a refactor(server): split flat domains into sub-module slices`  [EXTRACTED]
  git → git  _Bridges community 2 → community 10_
- `25b3e1a ci: add GitHub Actions pipeline (typecheck, lint, test, build)` --ON_BRANCH--> `chore/ci`  [EXTRACTED]
  git → git  _Bridges community 54 → community 64_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (88): Database, db, BatchConsumption, InkConsumption, InkPurchase, InventoryRollMovement, LabelSheet, LabelType (+80 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (53): Brand, BrandInput, Company, CompanyInput, createBrandColumns(), BrandRowActions(), BrandDialog(), BrandDialogProps (+45 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (38): router, AnalyticsService, 13b0a3c chore(server): give vitest a fallback DATABASE_URL, e4ae1ff chore: ignore graphify cache/output and local Claude settings, ee6d4dd refactor(server): vertical-slice modules + shared layout, CreateCompanyDTO, createCompanySchema, UpdateCompanyDTO (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (56): productionOrderColumns, exportColumns, rollColumns, RollTrackingTableProps, PRODUCTION_ORDER_KEYS, useAssignLineResources(), useCreateProductionOrder(), useDeleteLine() (+48 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (50): EMPTY, EMPTY_ROW, initialRow(), PlanFormValues, PlanLabelTypeForm(), PlanLabelTypeFormProps, PlanRowValues, ROLL_LENGTH_OPTIONS (+42 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (27): Entity, Messages, Tx, Brand, Company, InventoryRoll, ApiError, BadRequestError (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (47): 95aebc1 feat: thread receiving, stock and dyeing UI as tabs on existing pages, BASE_COLOR_OPTIONS, DENIER_OPTIONS, DyeThreadDialog(), COLOR_OPTIONS, DENIER_OPTIONS, ThreadPurchasePanel(), DENIER_OPTIONS (+39 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (52): COMPANIES, CompanySeed, INK_CONSUMPTIONS, INK_PURCHASES, InkConsumptionSeed, InkPurchaseSeed, LABEL_SHEETS, LABEL_TYPES (+44 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (38): inkConsumptionColumns(), ColumnCallbacks, inkPurchaseColumns(), InkConsumptionDialog(), Props, InkOperatorBreakdown(), InkPurchaseDialog(), Props (+30 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (31): useIsMobile(), navigation, NavItem, isRouteActive(), NavMain(), NavSubItem(), Collapsible(), CollapsibleContent() (+23 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (29): AnalyticsController, BatchFlowController, BatchOverviewController, cuttingBatchController, packagingBatchController, printingBatchController, weavingBatchController, ProductionRunController (+21 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (18): AppRoutes(), AppRoute, RedirectRoute, redirects, routes, CreateProductionOrderDialog(), MachineTable(), MaterialTable() (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (27): AppCard, StatCard(), StatCardProps, TrendDirection, BatchStageBoard(), PlanLabelTypeDialog(), UnifiedPlanningDialog(), createPlannedLineColumns() (+19 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (16): AppProviders(), c0c79ec Initial commit: Label Manufacturing ERP + audit remediation, production_progress, public.materials, useTheme(), queryClient, LayoutProvider(), QueryProvider() (+8 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (24): router, router, router, router, router, router, router, router (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (17): ProgressBarProps, editableCellClass, EditableCellInputProps, ImagePreview(), ImagePreviewProps, ImageUploadFieldProps, HealthCheckShellProps, cn() (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (29): PlanLabelTypeDialogProps, UnifiedPlanningDialogProps, PlanFormSubmitPayload, ProgressBar(), wovenColumns, WovenTrackingTable(), WovenTrackingTableProps, useDeleteWovenLine() (+21 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (30): ReceiveDyeingDialog(), ReceiveForm, SendDyeingDialog(), SendForm, ProviderForm, ServiceProviderDialog(), DYEING_KEYS, useCreateProvider() (+22 more)

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (5): BatchFlowRepository, lineColumn(), lineRefOfBatch(), lineRefOfBatchOrNull(), round2()

### Community 19 - "Community 19"
Cohesion: 0.10
Nodes (22): CompanyDialogProps, FormValues, LogProductionRunDialogProps, descriptionOptions, MaterialFormProps, typeOptions, SizePlanEditorProps, StockReconciliationCardProps (+14 more)

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (27): assertOutputWithinInput(), assertWithinAvailable(), assertWithinPlan(), BatchPosition, batchPositionOf(), BatchQuantities, BatchStage, BatchStatus (+19 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (30): CreateFormData, CreateLabelTypeDialogProps, UpdateFormData, MachineDialogProps, PRODUCT_TYPE_OPTIONS, STATUS_OPTIONS, TYPE_OPTIONS, DESIGNATION_OPTIONS (+22 more)

### Community 22 - "Community 22"
Cohesion: 0.09
Nodes (25): EditableLabelTypeTableProps, EMPTY_ERRORS, EMPTY_OPTIONS, EMPTY_ERRORS, LabelTypeRow, LabelTypeRowProps, MachineOption, OperatorOption (+17 more)

### Community 23 - "Community 23"
Cohesion: 0.14
Nodes (34): public.batch_consumptions, public.brands, public.companies, public.ink_consumptions, public.ink_purchases, public.inventory_roll_movements, public.inventory_rolls, public.label_sheets (+26 more)

### Community 24 - "Community 24"
Cohesion: 0.07
Nodes (3): ProductionOrderRepository, syncWorkOrderStatusTx(), workOrderStatusFor()

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (15): databaseConfig, env, envSchema, colors, Logger, LogLevel, getDb(), getPgPool() (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.07
Nodes (16): 9b99ce1 feat: complete production workflow, stock master data, company brand columns & responsive layout, MaterialReceiptPage(), ImportMeta, ImportMetaEnv, productionRunReasonEnum, productionRuns, stickerMaterials, threadDyeingAllocations (+8 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (1): ProductionOrderService

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (29): batchConsumptionsRelations, brandsRelations, companiesRelations, inventoryRollsRelations, machinesRelations, materialsRelations, operatorsRelations, printedLabelWorkOrdersRelations (+21 more)

### Community 29 - "Community 29"
Cohesion: 0.09
Nodes (19): LowStockAlert(), RecentWorkOrders(), DashboardKpis, KpiResponse, DASHBOARD_KEYS, useWorkOrderTrend(), useCeoMachines(), useCeoOperators() (+11 more)

### Community 30 - "Community 30"
Cohesion: 0.09
Nodes (9): ComboboxTrigger, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton, inputGroupButtonVariants, InputGroupInput, InputGroupTextarea (+1 more)

### Community 31 - "Community 31"
Cohesion: 0.12
Nodes (16): normalizeSizePlan(), validateSizePlan(), isSizeLabel(), LABEL_TYPES, normalizeSize(), SizePlan, deriveLineStatus(), hasAnyProgress() (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.14
Nodes (20): 933ccd7 feat: stock CRUD UI, operator type/avatar, artwork preview, production summary, AvailabilityBadge(), AvailabilityBadgeProps, VARIANTS, MachineRowActions(), operatorColumns, OperatorRowActions(), DESIGNATION_OPTIONS (+12 more)

### Community 33 - "Community 33"
Cohesion: 0.12
Nodes (12): eaaeae6 feat(server): line-scoped cutting/packaging, label-types schema, waste migrations 0027/0028, completion-report builder, rebuild api bundle, ProductionOrderLine, calculateRequiredRolls(), calculateTotalRolls(), calculateTotalWeight(), completionPct(), progressTargetOf(), order (+4 more)

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (17): CreateLabelTypeDialog(), labelTypeColumns(), CATEGORY_OPTIONS, LabelTypeTable(), LabelTypeTableProps, LABEL_TYPE_KEYS, productionOrderLabelTypeKeys, useCreateLabelType() (+9 more)

### Community 35 - "Community 35"
Cohesion: 0.14
Nodes (20): workOrderColumns, WorkOrderRowActions(), exportColumns, PRODUCT_TYPE_OPTIONS, STATUS_OPTIONS, WorkOrderTableProps, WorkOrderBasicInfo(), estimateWeavingHours() (+12 more)

### Community 36 - "Community 36"
Cohesion: 0.08
Nodes (24): AssignLineResourcesDTO, assignLineResourcesSchema, CreateBatchDTO, createBatchSchema, CreateProductionOrderDTO, createProductionOrderSchema, IssueRollsDTO, issueRollsSchema (+16 more)

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (15): CommandPaletteProps, CommandPaletteTriggerProps, COMMANDS, CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+7 more)

### Community 38 - "Community 38"
Cohesion: 0.10
Nodes (17): BatchOutputDialog(), BatchOutputDialogProps, BatchStageBoardProps, STAGE_ACCENT, STAGE_ICON, STATUS_LABEL, STATUS_VARIANT, BatchTraceDialog() (+9 more)

### Community 39 - "Community 39"
Cohesion: 0.14
Nodes (18): inventoryColumns, exportColumns, TYPE_OPTIONS, RollStockRowActions(), RollStockDialog(), RollStockDialogProps, rollStockSchema, RollStockSchemaInput (+10 more)

### Community 40 - "Community 40"
Cohesion: 0.17
Nodes (15): AppCardProps, ProductionTrendChart(), RANGE_OPTIONS, StageDeductionFlowCardProps, Card(), CardAction(), CardContent(), CardDescription() (+7 more)

### Community 41 - "Community 41"
Cohesion: 0.21
Nodes (19): afb13d7 feat(client): line-scoped batch edits, label-types CRUD, dispatch DC image + completion report, EditBatchDialogProps, BatchSourceOption, ProductionBatch, UNIT_LABEL, UpdateBatchInput, BatchEditValues, buildBatchUpdateBody() (+11 more)

### Community 42 - "Community 42"
Cohesion: 0.13
Nodes (16): LogProductionRunDialog(), columns, ProductionHistoryTable(), ProductionSummaryCard(), PRODUCTION_RUN_KEYS, useLogProductionRun(), useProductionSummary(), LogProductionRunInput (+8 more)

### Community 43 - "Community 43"
Cohesion: 0.14
Nodes (17): MachineSelect(), MachineSelectProps, OperatorSelect(), OperatorSelectProps, MACHINE_KEYS, OPERATOR_KEYS, useCreateMachine(), useCreateOperator() (+9 more)

### Community 44 - "Community 44"
Cohesion: 0.21
Nodes (1): BatchFlowService

### Community 45 - "Community 45"
Cohesion: 0.10
Nodes (13): cuttingBatch, mocks, 0a3ef12 fix(production): order-scoped cutting/packaging batch visibility - read path + create path, 95ce13e feat(production): make cutting and packaging batches line-scoped, admin, env, log, origin (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.15
Nodes (17): 09c4b95 feat: dispatch dialog, product-type filter, woven spec on detail page, b7b6ac9 feat: merge woven labels into the existing work-order flow (dispatch DC/LC), DispatchDialog(), DispatchDialogProps, ImageUploadField(), useCreateWorkOrder(), useDispatchWorkOrder(), useUpdateWorkOrder() (+9 more)

### Community 47 - "Community 47"
Cohesion: 0.15
Nodes (13): DataTablePaginationProps, Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink(), PaginationLinkProps, PaginationNext() (+5 more)

### Community 48 - "Community 48"
Cohesion: 0.16
Nodes (16): AvailableSources, BatchSourceEdge, BatchStage, BatchTrace, CreateConsumingBatchInput, CreatePrintingBatchInput, OrderFlow, RecordOutputInput (+8 more)

### Community 49 - "Community 49"
Cohesion: 0.10
Nodes (18): actorUserId, batchActionSchema, batchIdParamsSchema, CreateConsumingBatchDTO, createConsumingBatchSchema, CreatePrintingBatchDTO, createPrintingBatchSchema, labelQty (+10 more)

### Community 50 - "Community 50"
Cohesion: 0.10
Nodes (7): c27dc7d feat(server): stock CRUD history, operator type/avatar, stage traceability, useDeleteWorkOrder(), useWorkOrderDetail(), inventoryRollMovements, rollMovementTypeEnum, operatorTypeEnum, operators

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (13): c401a21 feat(client): weaving-time display and work-order detail rework, cc50221 feat: dispatched status + FBR invoice; tabs on top; sticky table columns, ArtworkAndComment(), CompanyInfo(), DispatchInfo(), OrderInfo(), defaultsFor(), WorkOrderDialog() (+5 more)

### Community 52 - "Community 52"
Cohesion: 0.13
Nodes (15): machineColumns, TYPE_OPTIONS, MachineDialog(), materialColumns, MaterialRowActions(), MaterialTableProps, TYPE_OPTIONS, MATERIAL_DESCRIPTIONS (+7 more)

### Community 53 - "Community 53"
Cohesion: 0.11
Nodes (1): ThreadInventoryRepository

### Community 54 - "Community 54"
Cohesion: 0.11
Nodes (12): 25b3e1a ci: add GitHub Actions pipeline (typecheck, lint, test, build), f5f1f47 feat: woven labels foundation — schema, migration, sticky progress columns, productTypeEnum, threadDyeBatches, threadBaseColorEnum, threadDenierEnum, threadMovementTypeEnum, threadStockTypeEnum (+4 more)

### Community 55 - "Community 55"
Cohesion: 0.19
Nodes (18): brands, companies, inventory_rolls, machines, materials, operators, production_info, production_progress (+10 more)

### Community 56 - "Community 56"
Cohesion: 0.13
Nodes (9): Component, ErrorBoundary, Props, State, apiRateLimiter, authRateLimiter, apiRouter, app (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.11
Nodes (18): ListCompaniesQueryDTO, listCompaniesQuerySchema, ListMachinesQueryDTO, listMachinesQuerySchema, ListMaterialsQueryDTO, listMaterialsQuerySchema, ListOperatorsQueryDTO, listOperatorsQuerySchema (+10 more)

### Community 58 - "Community 58"
Cohesion: 0.11
Nodes (13): BATCHES, CONSUMPTIONS, cuttingRow, FakeRow, hoisted, Join, JoinKind, LINE_TABLES (+5 more)

### Community 59 - "Community 59"
Cohesion: 0.14
Nodes (13): CommandPalette(), CommandPaletteTrigger(), DataTableToolbarProps, AppHeader(), PageContainer(), PageContainerProps, SIZES, AppLayout() (+5 more)

### Community 60 - "Community 60"
Cohesion: 0.29
Nodes (11): CreateProductionOrderDialogProps, NotesForm, DataTableSkeletonProps, formatNumber(), Table(), TableBody(), TableCell(), TableHead() (+3 more)

### Community 61 - "Community 61"
Cohesion: 0.16
Nodes (9): 2c8bd34 feat(client): per-table column visibility store and healthcheck probes, HealthcheckProps, HealthprobeResult, initial, probeBackend(), HealthprobeResult, MaterialsHealthResult, HealthprobeResult (+1 more)

### Community 62 - "Community 62"
Cohesion: 0.13
Nodes (14): cd392dc feat(label-types): add label types master data CRUD, label_types, production_order_lines, public.label_types, CreateLabelTypeDTO, createLabelTypeSchema, labelTypeEnum, labelTypeParamsSchema (+6 more)

### Community 63 - "Community 63"
Cohesion: 0.20
Nodes (12): purchaseColumns, PurchaseRowActions(), exportColumns, PurchaseTableProps, PURCHASE_KEYS, useCreatePurchase(), useDeletePurchase(), usePurchases() (+4 more)

### Community 64 - "Community 64"
Cohesion: 0.19
Nodes (15): chore/ci, proxyAgent, 08c0e9d fix(client): restore vite.config.ts so tsc -b type-checks config input (fixes Vercel TS18003), 0daa333 feat(client): show live stock balance in MaterialSelect, 0f7814f feat(client): show Required Rolls column in plan table for each label type, 19ed10f chore(server): rebuild committed api bundle, 1a9098e chore(gui): graphify report + memory-bank updates from line-scoped batch refactor, 3e6a631 feat: woven production client UI, branching off the shared dashboard (+7 more)

### Community 65 - "Community 65"
Cohesion: 0.19
Nodes (5): calculateInvoiceWeight(), calculateTotalRollPer200m(), calculateDerivedFields(), DerivedInputs, InventoryService

### Community 66 - "Community 66"
Cohesion: 0.21
Nodes (15): public.machines, public.operators, public.production_orders, public.thread_stocks, public.users, public.work_orders, public.woven_production_lines, thread_dye_batches (+7 more)

### Community 67 - "Community 67"
Cohesion: 0.18
Nodes (15): label_sheets, local_sheets, machines, production_runs, public.machines, public.operators, public.thread_dyeing_sends, public.thread_service_providers (+7 more)

### Community 68 - "Community 68"
Cohesion: 0.15
Nodes (4): LabelSheetService, LocalSheetService, money(), StickerMaterialService

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (14): CR, files, isImportSpec(), KW, LF, MOVE, QUOTE, resolveTarget() (+6 more)

### Community 70 - "Community 70"
Cohesion: 0.17
Nodes (7): DatePicker(), DatePickerProps, Button, Calendar(), Popover(), PopoverContent(), PopoverTrigger()

### Community 71 - "Community 71"
Cohesion: 0.21
Nodes (11): RECEIPT_KEYS, useCreateReceipt(), useDeleteReceipt(), useReceipts(), useUpdateReceipt(), MaterialReceipt, MaterialReceiptConfig, ReceiptField (+3 more)

### Community 72 - "Community 72"
Cohesion: 0.24
Nodes (10): MaterialSelect(), MaterialSelectProps, MATERIAL_KEYS, useCreateMaterial(), useDeleteMaterial(), useMaterials(), useUpdateMaterial(), Material (+2 more)

### Community 73 - "Community 73"
Cohesion: 0.18
Nodes (12): DataTableColumnHeader(), DataTableProps, DataTablePagination(), pageWindow(), DataTableSkeleton(), DataTableToolbar(), DataTableViewOptions(), EditableCell() (+4 more)

### Community 74 - "Community 74"
Cohesion: 0.20
Nodes (10): NewWovenProductionLine, ProductionOrder, WovenProductionLine, canStartCutting(), canStartPackaging(), deriveWovenLineStatus(), hasWovenProgress(), order (+2 more)

### Community 75 - "Community 75"
Cohesion: 0.14
Nodes (4): DrawerContent(), DrawerContext, DrawerContextProps, useDrawer()

### Community 76 - "Community 76"
Cohesion: 0.16
Nodes (2): buildConditions(), WorkOrderRepository

### Community 77 - "Community 77"
Cohesion: 0.24
Nodes (9): PurchaseFormProps, calculateInvoiceWeight(), calculateRequiredRolls(), calculateTotalRolls(), formatDate(), todayISO(), totalRollEquivalent200m(), purchaseSchema (+1 more)

### Community 78 - "Community 78"
Cohesion: 0.20
Nodes (6): DataTable(), DataTableExportColumn, exportRowsToExcel(), PrintTable(), toRecords(), visibleExportColumns()

### Community 79 - "Community 79"
Cohesion: 0.25
Nodes (12): BATCH_KEYS, useBatchMutation(), useBatchSources(), useCancelBatch(), useCompleteBatch(), useCreateBatch(), useDeleteBatch(), useLineBatches() (+4 more)

### Community 80 - "Community 80"
Cohesion: 0.16
Nodes (12): buildCompletionReport(), CompletionLineKind, CompletionReport, CompletionReportBatch, CompletionReportTotals, CompletionStageDetail, LabelTypeWaste, num() (+4 more)

### Community 81 - "Community 81"
Cohesion: 0.14
Nodes (13): artworkImageSchema, CreateWorkOrderDTO, createWorkOrderSchema, DispatchWorkOrderDTO, dispatchWorkOrderSchema, orderTypeSchema, prioritySchema, UpdateWorkOrderDTO (+5 more)

### Community 82 - "Community 82"
Cohesion: 0.14
Nodes (13): denierEnum, PlanWovenLineDTO, planWovenLineSchema, ReconcileRemainingThreadsDTO, reconcileRemainingThreadsSchema, sizePlanItemSchema, threadPlanItemSchema, UpdateWeavingDTO (+5 more)

### Community 83 - "Community 83"
Cohesion: 0.18
Nodes (10): PlannedLabelTypesTable(), PlannedLabelTypesTableProps, PRIORITY_META, ProductionOrderRowActions(), LINE_STATUS, ORDER_STATUS, ProductionLineStatusBadge(), ProductionOrderStatusBadge() (+2 more)

### Community 84 - "Community 84"
Cohesion: 0.15
Nodes (12): CreateLabelSheetDTO, createLabelSheetSchema, CreateLocalSheetDTO, createLocalSheetSchema, CreateStickerMaterialDTO, createStickerMaterialSchema, UpdateLabelSheetDTO, updateLabelSheetSchema (+4 more)

### Community 85 - "Community 85"
Cohesion: 0.15
Nodes (9): counts, envFileUrl, outArg, patched, pgDump, [pgVersion], raw, serverDir (+1 more)

### Community 86 - "Community 86"
Cohesion: 0.18
Nodes (1): ThreadInventoryService

### Community 87 - "Community 87"
Cohesion: 0.20
Nodes (9): 7d4a38d feat(client): batch planning and stage UI for production orders, CreateBatchDialog(), CreateBatchDialogProps, SourcePicker(), SizeAssignment, stageInputLabel(), UPSTREAM_STAGE, isSizeLabel() (+1 more)

### Community 88 - "Community 88"
Cohesion: 0.29
Nodes (11): operators, production_order_lines, production_orders, production_stage_events, public.machines, public.operators, public.production_order_lines, public.production_orders (+3 more)

### Community 89 - "Community 89"
Cohesion: 0.17
Nodes (1): InkRepository

### Community 90 - "Community 90"
Cohesion: 0.17
Nodes (11): baseColorEnum, CreateDyeBatchDTO, createDyeBatchSchema, CreateThreadPurchaseDTO, createThreadPurchaseSchema, createThreadStockSchema, denierEnum, listThreadMovementsQuerySchema (+3 more)

### Community 91 - "Community 91"
Cohesion: 0.41
Nodes (1): WovenProductionService

### Community 92 - "Community 92"
Cohesion: 0.20
Nodes (10): BatchScope, batchSelect, CreateBatchInput, lineValues(), RecordOutputInput, scopeValues(), SourceAllocation, SourceEdge (+2 more)

### Community 93 - "Community 93"
Cohesion: 0.20
Nodes (9): Classification, classify(), MachineAvailability, MachineWithAvailability, OperatorAvailability, OperatorWithAvailability, RANK, ResourceAvailabilityService (+1 more)

### Community 94 - "Community 94"
Cohesion: 0.29
Nodes (7): AppBreadcrumb(), pathToSegments(), Breadcrumb(), BreadcrumbItem(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 95 - "Community 95"
Cohesion: 0.25
Nodes (7): ab23f28 fix: tab switcher rendered unstyled and collapsed the page layout, InventoryStockTable(), StockTab, TABS, SegmentedOption, SegmentedTabs(), SegmentedTabsProps

### Community 96 - "Community 96"
Cohesion: 0.22
Nodes (2): dec(), InkService

### Community 97 - "Community 97"
Cohesion: 0.18
Nodes (1): InventoryRepository

### Community 98 - "Community 98"
Cohesion: 0.18
Nodes (8): files, findings, GONE_ALIASES, GONE_DIR_RE, GONE_LAYER_DIRS, required, SRC, staleDirs

### Community 99 - "Community 99"
Cohesion: 0.22
Nodes (8): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType, useChart()

### Community 100 - "Community 100"
Cohesion: 0.18
Nodes (1): WovenProductionRepository

### Community 101 - "Community 101"
Cohesion: 0.20
Nodes (1): AnalyticsRepository

### Community 102 - "Community 102"
Cohesion: 0.20
Nodes (4): 2e755d6 feat(server): persist estimated weaving hours for woven work orders, serverDir, sql, wovenWorkOrderDetails

### Community 103 - "Community 103"
Cohesion: 0.33
Nodes (8): DataTableEmpty(), DataTableEmptyProps, Empty(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 104 - "Community 104"
Cohesion: 0.20
Nodes (9): client, __dirname, __filename, files, maskedUrl, migrationDir, raw, sqlPath (+1 more)

### Community 105 - "Community 105"
Cohesion: 0.42
Nodes (9): batch_consumptions, production_batches, production_order_lines, production_stage_transactions, public.machines, public.operators, public.production_batches, public.production_order_lines (+1 more)

### Community 106 - "Community 106"
Cohesion: 0.27
Nodes (5): OperatorAvatarName(), OperatorAvatarProps, Avatar(), AvatarFallback(), AvatarImage()

### Community 107 - "Community 107"
Cohesion: 0.22
Nodes (1): InventoryRollRepository

### Community 108 - "Community 108"
Cohesion: 0.20
Nodes (5): ALLOWED_CROSS_MODULE_REPO_EDGES, files, graph, ROOT, SRC

### Community 109 - "Community 109"
Cohesion: 0.22
Nodes (2): NavigationMenuTrigger(), navigationMenuTriggerStyle

### Community 110 - "Community 110"
Cohesion: 0.22
Nodes (1): ProductionRunRepository

### Community 111 - "Community 111"
Cohesion: 0.31
Nodes (3): assertNonNegative(), InventoryRollService, withPerSkuBalance()

### Community 112 - "Community 112"
Cohesion: 0.25
Nodes (5): ApiError, axiosInstance, Paginated, refreshSubscribers, request()

### Community 113 - "Community 113"
Cohesion: 0.36
Nodes (6): EMPTY_COLUMN_VISIBILITY, sanitizeColumnVisibility(), TableVisibilityMap, TableVisibilityState, useTableColumnVisibility(), useTableVisibilityStore

### Community 114 - "Community 114"
Cohesion: 0.36
Nodes (7): fail(), heading(), info(), main(), parseArgs(), ROOT, runEnv()

### Community 115 - "Community 115"
Cohesion: 0.25
Nodes (1): BrandRepository

### Community 116 - "Community 116"
Cohesion: 0.25
Nodes (6): STAGE_STYLE, StageProgressBarsProps, StageTotals, LineFlow, LineKind, STAGES_OF

### Community 117 - "Community 117"
Cohesion: 0.46
Nodes (7): dest, fkEdges(), IGNORE(), main(), publicTables(), src, topoSort()

### Community 118 - "Community 118"
Cohesion: 0.43
Nodes (6): useCompletionCelebration(), celebrateCompletion(), fireConfetti(), playSuccessChime(), prefersReducedMotion(), ProductionOrderStatus

### Community 119 - "Community 119"
Cohesion: 0.25
Nodes (7): CreateInventoryRollDTO, createInventoryRollSchema, inventoryRollParamsSchema, listInventoryRollsQuerySchema, listRollMovementsQuerySchema, UpdateInventoryRollDTO, updateInventoryRollSchema

### Community 120 - "Community 120"
Cohesion: 0.25
Nodes (7): force, journal, missing, newestIdx, recordedWhen, serverDir, sql

### Community 121 - "Community 121"
Cohesion: 0.29
Nodes (1): CompanyRepository

### Community 122 - "Community 122"
Cohesion: 0.29
Nodes (1): BrandService

### Community 123 - "Community 123"
Cohesion: 0.29
Nodes (1): CompanyService

### Community 124 - "Community 124"
Cohesion: 0.29
Nodes (6): CreateInkConsumptionDTO, createInkConsumptionSchema, CreateInkPurchaseDTO, createInkPurchaseSchema, UpdateInkPurchaseDTO, updateInkPurchaseSchema

### Community 125 - "Community 125"
Cohesion: 0.33
Nodes (1): MaterialRepository

### Community 126 - "Community 126"
Cohesion: 0.29
Nodes (1): MaterialService

### Community 127 - "Community 127"
Cohesion: 0.29
Nodes (1): LabelTypesRepository

### Community 128 - "Community 128"
Cohesion: 0.29
Nodes (6): avatarUrlSchema, CreateOperatorDTO, createOperatorSchema, operatorTypeEnum, UpdateOperatorDTO, updateOperatorSchema

### Community 129 - "Community 129"
Cohesion: 0.33
Nodes (2): normaliseAvatar(), OperatorService

### Community 130 - "Community 130"
Cohesion: 0.29
Nodes (1): ThreadDyeingRepository

### Community 131 - "Community 131"
Cohesion: 0.29
Nodes (6): baseColorEnum, CreateDyeingSendDTO, createDyeingSendSchema, denierEnum, ReceiveDyeingDTO, receiveDyeingSchema

### Community 132 - "Community 132"
Cohesion: 0.33
Nodes (1): UserRepository

### Community 133 - "Community 133"
Cohesion: 0.29
Nodes (6): CreateUserDTO, createUserSchema, UpdateUserDTO, updateUserSchema, UserRole, userRoleSchema

### Community 134 - "Community 134"
Cohesion: 0.29
Nodes (1): UserService

### Community 135 - "Community 135"
Cohesion: 0.29
Nodes (1): WorkOrderService

### Community 136 - "Community 136"
Cohesion: 0.60
Nodes (4): asPgError(), errorHandler(), handlePgError(), notFound()

### Community 137 - "Community 137"
Cohesion: 0.47
Nodes (1): LabelTypesService

### Community 138 - "Community 138"
Cohesion: 0.40
Nodes (1): MachineRepository

### Community 139 - "Community 139"
Cohesion: 0.33
Nodes (1): MachineService

### Community 140 - "Community 140"
Cohesion: 0.33
Nodes (1): LabelSheetRepository

### Community 141 - "Community 141"
Cohesion: 0.33
Nodes (1): LocalSheetRepository

### Community 142 - "Community 142"
Cohesion: 0.33
Nodes (1): StickerMaterialRepository

### Community 143 - "Community 143"
Cohesion: 0.40
Nodes (1): OperatorRepository

### Community 144 - "Community 144"
Cohesion: 0.33
Nodes (1): ThreadServiceProviderRepository

### Community 145 - "Community 145"
Cohesion: 0.47
Nodes (1): ThreadServiceProviderService

### Community 146 - "Community 146"
Cohesion: 0.40
Nodes (4): CreateProductionRunDTO, createProductionRunSchema, RUN_REASONS, saleOrderParamsSchema

### Community 147 - "Community 147"
Cohesion: 0.40
Nodes (4): CreateBrandDTO, createBrandSchema, UpdateBrandDTO, updateBrandSchema

### Community 148 - "Community 148"
Cohesion: 0.70
Nodes (4): production_roll_issuances, public.materials, public.production_order_lines, public.users

### Community 149 - "Community 149"
Cohesion: 0.60
Nodes (4): inventory_roll_movements, operators, public.inventory_rolls, public.users

### Community 150 - "Community 150"
Cohesion: 0.50
Nodes (4): ink_consumptions, ink_purchases, public.operators, work_orders

### Community 151 - "Community 151"
Cohesion: 0.70
Nodes (4): batch_consumptions, production_batches, production_order_lines, users

### Community 152 - "Community 152"
Cohesion: 0.40
Nodes (4): CreateMaterialDTO, createMaterialSchema, UpdateMaterialDTO, updateMaterialSchema

### Community 153 - "Community 153"
Cohesion: 0.40
Nodes (4): CreateMachineDTO, createMachineSchema, UpdateMachineDTO, updateMachineSchema

### Community 154 - "Community 154"
Cohesion: 0.40
Nodes (4): ALL, argv, DRY, requested

### Community 155 - "Community 155"
Cohesion: 0.40
Nodes (4): env, envPath, here, sql

### Community 156 - "Community 156"
Cohesion: 0.40
Nodes (4): CreateThreadServiceProviderDTO, createThreadServiceProviderSchema, UpdateThreadServiceProviderDTO, updateThreadServiceProviderSchema

### Community 157 - "Community 157"
Cohesion: 0.40
Nodes (4): companyIdParamsSchema, idParamsSchema, lineIdParamsSchema, paginationQuerySchema

### Community 158 - "Community 158"
Cohesion: 1.00
Nodes (3): batch_consumptions, production_batches, woven_production_lines

### Community 159 - "Community 159"
Cohesion: 0.50
Nodes (1): SKIP

### Community 160 - "Community 160"
Cohesion: 0.50
Nodes (3): productionBatches, productionBatchStageEnum, productionBatchStatusEnum

### Community 161 - "Community 161"
Cohesion: 0.50
Nodes (1): ThreadDyeingService

### Community 162 - "Community 162"
Cohesion: 0.67
Nodes (1): ProductionRunService

### Community 163 - "Community 163"
Cohesion: 0.67
Nodes (2): ColumnMeta, TableMeta

## Knowledge Gaps
- **858 isolated node(s):** `app`, `AppRoute`, `RedirectRoute`, `AppCardProps`, `TrendDirection` (+853 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 27`** (1 nodes): `ProductionOrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `BatchFlowService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `ThreadInventoryRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (2 nodes): `buildConditions()`, `WorkOrderRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `ThreadInventoryService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `InkRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `WovenProductionService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (2 nodes): `dec()`, `InkService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (1 nodes): `InventoryRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (1 nodes): `WovenProductionRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 101`** (1 nodes): `AnalyticsRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (1 nodes): `InventoryRollRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (2 nodes): `NavigationMenuTrigger()`, `navigationMenuTriggerStyle`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `ProductionRunRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (1 nodes): `BrandRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `CompanyRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (1 nodes): `BrandService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `CompanyService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `MaterialRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `MaterialService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 127`** (1 nodes): `LabelTypesRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (2 nodes): `normaliseAvatar()`, `OperatorService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (1 nodes): `ThreadDyeingRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (1 nodes): `UserRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (1 nodes): `UserService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (1 nodes): `WorkOrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (1 nodes): `LabelTypesService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (1 nodes): `MachineRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `MachineService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (1 nodes): `LabelSheetRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (1 nodes): `LocalSheetRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (1 nodes): `StickerMaterialRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 143`** (1 nodes): `OperatorRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 144`** (1 nodes): `ThreadServiceProviderRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 145`** (1 nodes): `ThreadServiceProviderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 159`** (1 nodes): `SKIP`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 161`** (1 nodes): `ThreadDyeingService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 162`** (1 nodes): `ProductionRunService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 163`** (2 nodes): `ColumnMeta`, `TableMeta`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProductionOrderRepository` connect `Community 24` to `Community 0`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProductionOrderService` connect `Community 27` to `Community 33`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `BatchFlowRepository` connect `Community 18` to `Community 92`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `app`, `AppRoute`, `RedirectRoute` to the rest of the system?**
  _858 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.028337428337428337 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07066151202749141 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.029411764705882353 - nodes in this community are weakly interconnected._