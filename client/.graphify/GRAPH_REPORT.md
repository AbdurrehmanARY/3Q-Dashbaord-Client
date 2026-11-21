# Graph Report - .  (2026-10-29)

## Corpus Check
- 328 files · ~110,303 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1485 nodes · 4691 edges · 56 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: imports: 1674 · imports_from: 1181 · contains: 1141 · MODIFIES: 514 · re_exports: 91 · calls: 52 · ON_BRANCH: 13 · PARENT_OF: 13 · inherits: 7 · method: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 328 · Candidates: 337
- Excluded: 411 untracked · 41736 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `9947228`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 83 edges
2. `AppButton` - 75 edges
3. `formatNumber()` - 59 edges
4. `AppInput` - 33 edges
5. `AppDialog()` - 29 edges
6. `StatusBadge()` - 28 edges
7. `PageHeader()` - 24 edges
8. `SubmitOnEnter()` - 21 edges
9. `api` - 21 edges
10. `AppCard` - 20 edges

## Surprising Connections (you probably didn't know these)
- `0cdf79f fix: fallback speed to 600 RPM in WorkOrderDetailPage calculation` --PARENT_OF--> `12acd8e Sync client from 3Q-facility-Dashboard monorepo @ 1a9098e (chore/ci) - line-scoped batches, label-types CRUD, dispatch DC image, completion report`  [EXTRACTED]
  git → git  _Bridges community 17 → community 7_
- `0cdf79f fix: fallback speed to 600 RPM in WorkOrderDetailPage calculation` --PARENT_OF--> `25e9a18 feat(client): summary-only completed production view with button-triggered reconciliation dialog`  [EXTRACTED]
  git → git  _Bridges community 17 → community 13_
- `25e9a18 feat(client): summary-only completed production view with button-triggered reconciliation dialog` --PARENT_OF--> `9947228 feat(client): summary-only completed production view with button-triggered reconciliation dialog`  [EXTRACTED]
  git → git  _Bridges community 13 → community 7_
- `ee6dbbe feat: production order completion workflow, live progress cards, thread reconciliation, machine/operator product type filtering` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 40 → community 17_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (58): AvailabilityBadge(), AvailabilityBadgeProps, VARIANTS, machineColumns, MachineRowActions(), TYPE_OPTIONS, MachineDialog(), MachineDialogProps (+50 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (32): BrandRowActions(), CompanyRowActions(), DispatchDialog(), PlannedLineRowActionsProps, ProductionOrderRowActions(), MOVEMENT_LABELS, RowPinControls, DataTableColumnHeaderProps (+24 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (39): inventoryColumns, exportColumns, TYPE_OPTIONS, RollStockRowActions(), RollStockDialog(), RollStockDialogProps, rollStockSchema, RollStockSchemaInput (+31 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (52): PRODUCTION_ORDER_KEYS, useAssignLineResources(), useCompleteProductionOrder(), useCompletionReport(), useCreateProductionOrder(), useDeleteLine(), useDeleteProductionOrder(), useEligibleSalesOrders() (+44 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (44): BASE_COLOR_OPTIONS, DENIER_OPTIONS, DyeThreadDialog(), ThreadPurchasePanel(), DENIER_OPTIONS, ThreadStockDialog(), ThreadStockDialogProps, threadStockSchema (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (34): DataTableColumnHeader(), DataTable(), DataTableProps, DataTableEmpty(), DataTableEmptyProps, DataTableExportColumn, exportRowsToExcel(), PrintTable() (+26 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (29): useIsMobile(), navigation, NavItem, NavMain(), Collapsible(), CollapsibleContent(), CollapsibleTrigger, Sheet() (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (31): 12acd8e Sync client from 3Q-facility-Dashboard monorepo @ 1a9098e (chore/ci) - line-scoped batches, label-types CRUD, dispatch DC image, completion report, 6341954 Sync client from 3Q-facility-Dashboard monorepo @ 08c0e9d (chore/ci) - fix: restore vite.config.ts so the Vite/Vercel build (tsc -b && vite build) passes, resolving TS18003, 9947228 feat(client): summary-only completed production view with button-triggered reconciliation dialog, 9fc49fe Sync client from 3Q-facility-Dashboard monorepo @ 0f7814f (chore/ci branch), CreateFormData, CreateLabelTypeDialog(), CreateLabelTypeDialogProps, UpdateFormData (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (16): AppRoute, RedirectRoute, CreateProductionOrderDialog(), InventoryStockTable(), MachineTable(), OperatorTable(), ProductionOrderTable(), PurchaseTable() (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (30): ReceiveDyeingDialog(), ReceiveForm, SendDyeingDialog(), SendForm, ProviderForm, ServiceProviderDialog(), DYEING_KEYS, useCreateProvider() (+22 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (29): BatchOutputDialog(), BatchOutputDialogProps, BatchStageBoardProps, STAGE_ACCENT, STAGE_ICON, STATUS_LABEL, STATUS_VARIANT, BatchTraceDialog() (+21 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (10): ProgressBarProps, ImagePreview(), ImagePreviewProps, ImageUploadFieldProps, HealthCheckShellProps, cn(), Progress(), ToggleGroupContext (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (25): EditableLabelTypeTableProps, EMPTY_ERRORS, EMPTY_OPTIONS, EMPTY_ERRORS, LabelTypeRow, LabelTypeRowProps, MachineOption, OperatorOption (+17 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (20): AppCard, StatCard(), StatCardProps, TrendDirection, 25e9a18 feat(client): summary-only completed production view with button-triggered reconciliation dialog, BatchStageBoard(), UnifiedPlanningDialog(), ProductionCompletionReport() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (23): Brand, BrandInput, Company, CompanyInput, createBrandColumns(), BrandDialog(), BrandDialogProps, BrandInput (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (23): materialColumns, MaterialRowActions(), MaterialTable(), MaterialTableProps, TYPE_OPTIONS, descriptionOptions, MaterialForm(), MaterialFormProps (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (12): DataTableToolbarProps, Button, ComboboxTrigger, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton, inputGroupButtonVariants (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.16
Nodes (19): main, 0cdf79f fix: fallback speed to 600 RPM in WorkOrderDetailPage calculation, 567656d feat: add max length validation and scrollable container to WorkOrderDialog, 815ad75 feat: complete frontend updates, responsive layout, stock reconciliation & company brand columns, 84328c7 feat: show Est. Weaving Time in Work Order details & Work Order list table, 9ff35ed feat: add speed (RPM) to Work Order forms/views and display estimated weaving time breakdown, c2dc30d feat: restrict weaving machine and operator pickers in woven production to woven resources, cf620b4 feat: add Estimated Weaving Time column to production tables (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (20): CompanyInfo(), DispatchDialogProps, Props, Props, AppDialog(), AppCombobox(), AppComboboxProps, AppInput (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (24): workOrderColumns, WorkOrderRowActions(), exportColumns, PRODUCT_TYPE_OPTIONS, STATUS_OPTIONS, WorkOrderTableProps, WorkOrderBasicInfo(), workOrderService (+16 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (19): FormValues, LogProductionRunDialog(), LogProductionRunDialogProps, columns, ProductionHistoryTable(), ProductionSummaryCard(), PRODUCTION_RUN_KEYS, useLogProductionRun() (+11 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (17): CommandPaletteProps, CommandPaletteTriggerProps, COMMANDS, AppDialogProps, CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (19): ColumnCallbacks, inkPurchaseColumns(), InkPurchaseDialog(), InkStockPanel(), INK_KEYS, useCreateInkConsumption(), useCreateInkPurchase(), useDeleteInkPurchase() (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (20): EMPTY_ROW, initialRow(), PlanFormValues, PlanLabelTypeForm(), PlanLabelTypeFormProps, PlanRowValues, ROLL_LENGTH_OPTIONS, emptyThreadAllocationRow() (+12 more)

### Community 24 - "Community 24"
Cohesion: 0.16
Nodes (17): AppCardProps, LowStockAlert(), ProductionTrendChart(), RANGE_OPTIONS, RecentWorkOrders(), useWorkOrderTrend(), Card(), CardAction() (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (15): createPlannedLineColumns(), PlannedLineRowActions(), PlannedLabelTypesTable(), PlannedLabelTypesTableProps, LINE_STATUS, ORDER_STATUS, ProductionLineStatusBadge(), ProductionOrderStatusBadge() (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (18): DatePicker(), DatePickerProps, purchaseColumns, PurchaseRowActions(), exportColumns, PurchaseTableProps, PURCHASE_KEYS, useCreatePurchase() (+10 more)

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (12): MaterialReceiptPage(), RECEIPT_KEYS, useCreateReceipt(), useDeleteReceipt(), useReceipts(), useUpdateReceipt(), MaterialReceipt, MaterialReceiptConfig (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (19): EditBatchDialogProps, BatchSourceOption, LineKind, ProductionBatch, UNIT_LABEL, UpdateBatchInput, BatchEditValues, buildBatchUpdateBody() (+11 more)

### Community 29 - "Community 29"
Cohesion: 0.09
Nodes (20): assignResourcesSchema, AssignResourcesSchemaInput, createProductionOrderSchema, CreateProductionOrderSchemaInput, issueRollsSchema, IssueRollsSchemaInput, planLineSchema, PlanLineSchemaInput (+12 more)

### Community 30 - "Community 30"
Cohesion: 0.11
Nodes (9): AppRoutes(), redirects, routes, Component, ErrorBoundary, Props, State, ToastProvider() (+1 more)

### Community 31 - "Community 31"
Cohesion: 0.16
Nodes (13): WovenThreadReconciliationCard(), WovenThreadReconciliationCardProps, useDeleteWovenLine(), useReconcileWovenThreadStock(), useWovenOverview(), WOVEN_KEYS, PlanWovenInput, WeavingInput (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (13): DataTablePaginationProps, Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink(), PaginationLinkProps, PaginationNext() (+5 more)

### Community 33 - "Community 33"
Cohesion: 0.16
Nodes (16): AvailableSources, BatchSourceEdge, BatchStage, BatchTrace, CreateConsumingBatchInput, CreatePrintingBatchInput, OrderFlow, RecordOutputInput (+8 more)

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (11): AppProviders(), useTheme(), queryClient, LayoutProvider(), QueryProvider(), ThemeProvider(), Theme, UiState (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.30
Nodes (12): CreateProductionOrderDialogProps, NotesForm, COLOR_OPTIONS, DENIER_OPTIONS, DataTableSkeletonProps, formatNumber(), Table(), TableBody() (+4 more)

### Community 36 - "Community 36"
Cohesion: 0.13
Nodes (8): defaultsFor(), WorkOrderDialog(), useCreateWorkOrder(), useDeleteWorkOrder(), useUpdateWorkOrder(), useWorkOrderDetail(), useWorkOrders(), WORK_ORDER_KEYS

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (13): inkConsumptionColumns(), InkConsumptionDialog(), InkOperatorBreakdown(), ConfirmDialog(), useDeleteInkConsumption(), useInkConsumptions(), formatDateTime(), exportColumns (+5 more)

### Community 38 - "Community 38"
Cohesion: 0.16
Nodes (12): UnifiedPlanningDialogProps, PlanFormSubmitPayload, usePlanLine(), useUpdateLinePlan(), usePlanWovenLine(), PlanLineInput, ProductType, PlanningSubmitTarget (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.14
Nodes (12): CreateBatchDialog(), CreateBatchDialogProps, SourcePicker(), AppSelect, AppSelectOption, AppSelectProps, isFirstStage(), SizeAssignment (+4 more)

### Community 40 - "Community 40"
Cohesion: 0.17
Nodes (3): ee6dbbe feat: production order completion workflow, live progress cards, thread reconciliation, machine/operator product type filtering, ImportMeta, ImportMetaEnv

### Community 41 - "Community 41"
Cohesion: 0.24
Nodes (11): ThreadPlanInput, allocateSharedThreads(), cumulativeStockIssues(), duplicateRowIndexes(), labelKey(), labelTypeTaken(), PlanRowLike, round3() (+3 more)

### Community 42 - "Community 42"
Cohesion: 0.14
Nodes (4): DrawerContent(), DrawerContext, DrawerContextProps, useDrawer()

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (11): CommandPalette(), CommandPaletteTrigger(), AppHeader(), PageContainer(), PageContainerProps, SIZES, AppLayout(), getInitialSidebarOpen() (+3 more)

### Community 44 - "Community 44"
Cohesion: 0.24
Nodes (9): PurchaseFormProps, calculateInvoiceWeight(), calculateRequiredRolls(), calculateTotalRolls(), formatDate(), todayISO(), totalRollEquivalent200m(), purchaseSchema (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (7): AppBreadcrumb(), pathToSegments(), Breadcrumb(), BreadcrumbItem(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (8): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType, useChart()

### Community 47 - "Community 47"
Cohesion: 0.24
Nodes (8): CompanyDialog(), CompanyDialogProps, useCreateCompany(), useUpdateCompany(), brandSchema, BrandSchemaInput, companySchema, CompanySchemaInput

### Community 48 - "Community 48"
Cohesion: 0.27
Nodes (5): OperatorAvatarName(), OperatorAvatarProps, Avatar(), AvatarFallback(), AvatarImage()

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (2): NavigationMenuTrigger(), navigationMenuTriggerStyle

### Community 50 - "Community 50"
Cohesion: 0.29
Nodes (6): STAGE_STYLE, StageProgressBars(), StageProgressBarsProps, stageRowsOf(), StageTotals, STAGES_OF

### Community 51 - "Community 51"
Cohesion: 0.43
Nodes (6): useCompletionCelebration(), celebrateCompletion(), fireConfetti(), playSuccessChime(), prefersReducedMotion(), ProductionOrderStatus

### Community 52 - "Community 52"
Cohesion: 0.38
Nodes (5): ProgressBar(), wovenColumns, WovenTrackingTable(), WovenTrackingTableProps, WovenLineOverview

### Community 53 - "Community 53"
Cohesion: 0.43
Nodes (5): editableCellClass, EditableCellInputProps, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 54 - "Community 54"
Cohesion: 0.60
Nodes (3): SegmentedOption, SegmentedTabs(), SegmentedTabsProps

### Community 55 - "Community 55"
Cohesion: 1.00
Nodes (2): Badge(), badgeVariants

## Knowledge Gaps
- **272 isolated node(s):** `AppRoute`, `RedirectRoute`, `AppCardProps`, `TrendDirection`, `StatCardProps` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 49`** (2 nodes): `NavigationMenuTrigger()`, `navigationMenuTriggerStyle`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (2 nodes): `Badge()`, `badgeVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 11` to `Community 24`, `Community 13`, `Community 1`, `Community 39`, `Community 35`, `Community 26`, `Community 12`, `Community 23`, `Community 17`, `Community 9`, `Community 4`, `Community 19`, `Community 5`, `Community 53`, `Community 21`, `Community 48`, `Community 0`, `Community 18`, `Community 2`, `Community 43`, `Community 8`, `Community 54`, `Community 6`, `Community 55`, `Community 45`, `Community 46`, `Community 7`, `Community 16`, `Community 42`, `Community 49`, `Community 32`, `Community 37`, `Community 20`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `AppButton` connect `Community 1` to `Community 10`, `Community 14`, `Community 47`, `Community 39`, `Community 7`, `Community 35`, `Community 18`, `Community 4`, `Community 28`, `Community 37`, `Community 22`, `Community 2`, `Community 12`, `Community 20`, `Community 0`, `Community 15`, `Community 27`, `Community 23`, `Community 25`, `Community 17`, `Community 26`, `Community 44`, `Community 9`, `Community 13`, `Community 19`, `Community 31`, `Community 5`, `Community 11`, `Community 8`, `Community 36`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `formatNumber()` connect `Community 35` to `Community 10`, `Community 39`, `Community 18`, `Community 4`, `Community 12`, `Community 28`, `Community 37`, `Community 22`, `Community 2`, `Community 15`, `Community 27`, `Community 38`, `Community 23`, `Community 25`, `Community 17`, `Community 13`, `Community 20`, `Community 26`, `Community 44`, `Community 9`, `Community 24`, `Community 1`, `Community 50`, `Community 19`, `Community 52`, `Community 31`, `Community 36`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `AppRoute`, `RedirectRoute`, `AppCardProps` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05368382080710848 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14119513484928609 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.055523085914669784 - nodes in this community are weakly interconnected._