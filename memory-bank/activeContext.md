# Active Context

## Current state (what's actually built vs. missing)
The codebase is a two-package, no-workspaces monorepo (`client/`, `server/`)
deployed as **two Vercel projects**. Both packages typecheck clean and the client
test suite is green; the server has a small, focused test suite. The system is
live enough for end-to-end production planning of *both* printed and woven labels,
but it is a **work-in-progress branch** (`chore/ci`) with a **clean working tree** —
the large dirty change set was committed as atomic commits on 2026-09-26 (see
"Working-tree state" below).

### New: seed-master-data.ts (2026-11-04)
- Created `server/src/shared/db/seed-master-data.ts` — seeds all tables except work orders
  and production tables (printedLabelWorkOrders, wovenLabelWorkOrders, productionOrders,
  productionOrderLines, productionBatches, productionStageTransactions, productionRuns,
  productionStageEvents, productionRollIssuances, batchConsumptions, wovenThreadPlanItems,
  wovenWorkOrderDetails).
- Added `npm run db:seed:master-data` script to server/package.json.
- Extended seed-data.ts with LABEL_TYPES, THREAD_SERVICE_PROVIDERS, THREAD_STOCKS,
  THREAD_PURCHASES, THREAD_DYEING_SENDS, THREAD_DYEING_ALLOCATIONS, THREAD_DYEING_RECEIVES,
  THREAD_DYE_BATCHES, STICKER_MATERIALS, LOCAL_SHEETS, LABEL_SHEETS, INK_PURCHASES,
  INK_CONSUMPTIONS seed data arrays.

### Verified gate state right now (re-verified 2026-10-14, with client-side waste fixes)

Post-change verification (client-side edits to BatchOutputDialog.tsx, batch-types.ts, BatchStageBoard.tsx):
- `client/`: `npm run typecheck` -> 0 errors; `npm test` -> **7 files / 67 tests**
- `server/`: `npm run typecheck` -> **0 errors**; `npm test` -> **9 files / 123 tests**;
- `graphify update .` -> 2943 nodes, 7009 edges, 155 communities rebuilt

- `client/`: `npm run typecheck` → 0 errors; `npm test` → **7 files / 67 tests**
  (`utils/batch-scope.test.ts` deleted with the scope decision;
  `services/batch-service.test.ts` added — it pins the line-scoped URLs).
- `server/`: `npm run typecheck` → **0 errors**; `npm test` → **10 files / 149 tests**;
  `npm run build` → tsup OK and `server/api/index.js` regenerated; migration 0025 validated
  end-to-end on a scratch DB by `scripts/verify-0025-line-scoped.mjs` (**all checks pass**).
- ✅ **0025 has been applied to live Supabase** (verified 2026-10-28): `production_batches_one_line` CHECK exists, `production_batches_order_stage_no_uq` is dropped,
  and 0 batches have no line across all stages. The line-scoped code now works end-to-end on live.
- ✅ **0029 has been applied to live Supabase** (verified 2026-10-28): workflow-scoped extension tables
  created, existing rows backfilled by productType, FKs validated. CEO dashboard endpoints + split
  work-order routes now have their extension tables.
- ✅ **Dashboard route & navigation consolidation (2026-10-29)**: removed
  `features/ceo-dashboard/` (7 pages + hooks + service), replaced the
  "CEO Dashboard" nav item with an expanded top-level "Dashboard" section
  (`/dashboard/*` sub-routes), moved the CeoDashboardPage overview to `/`,
  and added `/ceo-dashboard/*` → `/dashboard/*` redirects for backward
  compatibility. `routes.tsx` + `navigation.ts` updated; graphify re-indexed.
  `client/`: `npx tsc --noEmit` → 0 errors; `npx vitest run` → **92/92**.

- ✅ **Dashboard Production Order Planning Routes (2026-11-05)**: Added missing dashboard planning routes to `app/routes.tsx`:
  - `/dashboard/production-orders/printed/:id/plan` → `ProductionOrderPlanningPage`
  - `/dashboard/production-orders/woven/:id/plan` → `ProductionOrderPlanningPage`
  These connect `CreateP`

- ✅ **CEO Dashboard tabbed navigation (2026-11-05)**: Replaced single-view CEO pages with tabbed pages:
  - Created `CeoWorkOrdersDashboardPage.tsx` — tabs for Printed/Woven Work Orders at `/dashboard/ceo/work-orders/{printed,woven}`
  - Created `CeoProductionDashboardPage.tsx` — tabs for Printed/Woven Production at `/dashboard/ceo/production/{printed,woven}`
  - Updated `routes.tsx`: CEO routes now point to the tabbed pages (each URL handled by same page via `useLocation`)
  - Sidebar navigation already had nested CEO items; tabs now render within each page
  - Each tab has its own URL — refresh/deep-links preserve the selected tab
  - Verification: client typecheck 0 errors; client tests 92/92 passed; client build OKroductionOrderDialog` post-creation navigation to the existing `ProductionOrderPlanningPage` component (which uses `UnifiedPlanningDialog` and handles both printed/woven via `productType`). Non-dashboard equivalents already existed.

  - `server/src/app.ts` — **Route mounting order fix** (2026-10-28): specific sub-routers
    (`/work-orders/printed`, `/work-orders/woven`) were mounted AFTER the general `/work-orders`
    router, causing Express to match "printed"/"woven" as the `:id` param and return 400 (zod
    `z.coerce.number()` rejection). Reordered so specific routes mount first, with an explanatory
    comment. General `/work-orders` router now mounts last, matching the same pattern already used
    for `/production/printed` and `/production/woven/orders`.
- ⚠ **Nested `.git` repositories** exist in `server/` and `client/` (stale, from before the
  monorepo consolidation; their HEADs are old feature commits and they do not track the current
  layout). Always run `git status` / `git add` / `git commit` from the **repo root**, never from
  inside a package — otherwise you commit to the wrong repository.

## Woven make-up support — in progress (2026-10-27)
- **Removed the woven planning ceiling**: woven label types can now be planned beyond the order's
  totalQty so that waste at any stage can be recovered by re-planning with an increased quantity.
  Duplicate label-type names are still rejected. See `progress.md` for the full change list.
- **Required quantity surfaced in label stage progress**: `quantityLabels` prop added to the woven
  `StageProgressBars` so bars read "X produced / Y required pcs".
- **`required` field on woven lines**: set to `quantity` (was `0`) so completion-readiness and
  progress bars key off the same explicit target.
- **Production completion report**: added `ProductionCompletionReport` to the woven completed-view.
- ⚠ `server/api/index.js` bundle NOT yet rebuilt (source changes applied to `.ts` files only).
  Run `npm run build` in `server/` to sync the bundle before deploying.
- ⚠ `run_commands` tool was unavailable during this session — typecheck/tests not verified locally.
  Run `verify-changes.bat` at repo root to validate: server typecheck, server tests, server build,
  then client typecheck, client tests.

## Cutting/packaging batches → LINE-SCOPED — SHIPPED (2026-09-29)

The 2026-09-26 open product decision (D1: "keep order-scoped") has been **decided the other way
and executed**: every batch now belongs to exactly one production line, cutting and packaging
included. What landed:

- **Migration `server/drizzle/0025_line_scoped_cutting_packaging.sql`** (+ `_journal.json` idx 25,
  `when 1787250000000`): drops the order-scoped CHECK *first* (it forbids the rows the backfill is
  about to write — validated: applying the backfill under `first_stage_one_line` fails with a CHECK
  violation), backfills cutting from its largest contributor, packaging from its cutting line, then
  falls back to the order's first line, RAISEs if any line-less batch survives, and only then swaps
  in `production_batches_one_line` (`num_nonnulls(...) = 1` for **every** stage) and drops
  `production_batches_order_stage_no_uq`. `production_batches_printed_no_uq` /
  `_woven_no_uq` are `CREATE IF NOT EXISTS`d, so per-(line, stage) numbering now covers all four
  stages without any renumbering (batch numbers were unique per order; a line lives in one order).
- **Migration VALIDATED end-to-end on a scratch database** — `server/scripts/verify-0025-line-scoped.mjs`
  (LOCAL-only; refuses anything but `localhost`) rebuilds `q3_0025_scratch` from
  `scripts/baseline/live-schema.sql`, seeds a two-label-type order with line-less cutting +
  packaging batches and runs 4 phases. **ALL SCRATCH CHECKS PASSED**: DDL swap, largest-contributor
  backfill (cutting → Size Label because 70 > 30), packaging inheriting its cutting line, orphan
  guard raising, the new CHECK accepting/rejecting the right rows, and per-line numbering
  rejecting a duplicate `batch_number`. The scratch DB is dropped afterwards.
- **Server**: attribution machinery deleted (`labelMixForOrder` / `lineMixCte` /
  `attributedForLine` / `contributingLines` / `linesOfOrderFromMix` / `attributedFlowOf` /
  `orderKindTx` / `attachLabelMix`); `createBatch` is now one path for all stages (lock order →
  line → sources, same-line source enforcement with a clear error); `insertBatchTx` numbers per
  (line, stage) always; `flowInTx` sums the line's own batches; `getOrderFlow` no longer
  pro-rata-splits anything; `getAvailableSources` is line-scoped. Order-scoped routes removed:
  `orderStageRouter`, `POST/GET /production/orders/:stage-batches/:id{,/sources,/resources}`,
  `createOrderScopedBatchSchema`, `createFromOrder` / `getSourcesFromOrder` /
  `getResourcesFromOrder` controller+schema helpers, `createBatchFromOrder` /
  `getAvailableSourcesFromOrder` / `getStageResourcesFromOrder` service methods.
- **Client**: `utils/batch-scope.ts` + its test deleted (there is no scope decision left to make);
  `getSourcesFromOrder` / `getResourcesFromOrder` / `createFromOrder` / `listByOrder` and the
  `useOrder*` / `useStage*` scope-picking hooks and query keys removed; the board and dialog always
  pass `flow.lineId`; `canSubmit` needs a line for **every** stage; `ProductionBatch.labelMix` and
  its mix chips removed (the server no longer sends it — rendering it would have thrown).
  New `services/batch-service.test.ts` pins the line URLs for all four stages and asserts no
  method can reach a `/production/orders/:stage-batches/…` route again.
- **Gates (2026-09-29)**: server typecheck **0 errors** · `npm test` **9 files / 123 tests** ·
  `npm run build` OK (`api/index.js` regenerated); client typecheck **0 errors** · `npm test`
  **7 files / 67 tests**.
- **NOT yet done:** 0025 has **not** been applied to the live Supabase database (verified 2026-09-29
  with `scripts/verify-batch-constraints.mjs`: live still carries
  `production_batches_first_stage_one_line` + `production_batches_order_stage_no_uq` and 3 line-less
  cutting batches, i.e. it is still pre-0025). Applying it to live is a separate, explicit step —
  see `memory-bank/migration-reconciliation.md`.

## Estimated weaving time (woven work orders) — DONE (2026-09-23)
- New persisted column `woven_work_order_details.estimated_weaving_hours` (numeric 12,2,
  default 0); migration `server/drizzle/0024_woven_estimated_weaving_hours.sql`
  (hand-written + `_journal.json` entry idx 24 — snapshots stop at 0019, so
  `drizzle-kit generate` must NOT be used here). Includes a SQL backfill for existing
  woven rows.
- Formula lives in two mirrored helpers — `server/src/modules/work-orders/work-order.helpers.ts`
  and `client/src/features/work-orders/utils/weaving-time.ts`:
  `round2((totalQty / repeat) * pick / (speed * 60))`, speed → 600 RPM default, 0 when
  inputs incomplete. Unit tests on both sides (7 + 4).
- Server computes & persists on create; recomputes on update (pick/repeat/speed patch
  merged over the stored row; a totalQty-only edit recomputes from stored loom inputs).
  Never accepted from the client (clinerules §3). **Bug fixed en passant**: `speed` was
  silently dropped by the service on create *and* update before this change (the zod
  DTO always had it; the service type/forwarding didn't).
- Client: read-only `EstimatedWeavingTime` preview inside `WovenSpecification.tsx`
  (renders automatically inside `WorkOrderDialog` for woven orders);
  `work-order-columns.tsx` "Est. Weaving Time" prefers the stored value with a
  live-formula fallback; `WorkOrder.estimatedWeavingHours?: string | null`.
- Architecture test updated for module-reorg paths (`production/production-orders/…`,
  `woven-production/woven-production/…`, `thread/thread-inventory/…`).
- **Migration 0024 APPLIED to the live DB** (2026-09-23): column verified
  `numeric(12,2) default '0'`; all 4 existing woven rows backfilled (top: Guess 29R
  19.05 hrs) and cross-checked against the formula. Two fixes were needed to get
  `drizzle-kit migrate` working again: (a) a trailing comma made
  `drizzle/meta/_journal.json` invalid JSON; (b) migrations 0022/0023 had been applied
  outside the tracker and were unrecorded — `server/scripts/reconcile-migrations.mjs
  --write` records pre-applied entries (placeholder hash, skips idx 24) so migrate only
  runs genuinely-new migrations. `server/scripts/verify-estimated-weaving.mjs` re-checks
  the column/backfill anytime. NO table drop/truncate was performed — data preserved.

## Server vertical-slice refactor — DONE
`server/src` was reorganised from layer-based (`api/{controllers,routes,services,repositories,validations}`)
into `modules/<domain>/` (flat files) + `shared/`. This was a **directory-only refactor**: no endpoint,
status code, payload shape, or SQL query changed. Evidence gathered at the time:
- **Live HTTP proof** (booted the real app, sent real requests): `GET /api` → 200
  `{"message":"API is running"}`, `GET /health` → 200, `GET /api/brands` and `GET /api/materials`
  → 200 with real DB rows, and the `/api/materials/{stickers,local-sheets,label-sheets}` sub-routers
  → 200, which proves the **mount-order invariant** (those three must mount before `/materials`,
  else its `/:code` swallows them) survived the move.
- Git recorded **159 renames** (i.e. byte-preserving moves), 4 deletes (2 dissolved barrels +
  2 dangling `api/utils|middleware/index.ts`), 20 adds.
- Aliases (`@modules`, `@shared`, `@db`, `@config`) had to be updated in **both** `tsconfig.json`
  and `vitest.config.ts` — the latter duplicates them manually, so they must always move in lockstep.
- Route-table dumping via Express internals (`layer.regexp`) turned out to be **unreliable**
  (version-sensitive, mangled paths). The live-HTTP probe is the trustworthy AC1 proof — prefer it.

## Recent architectural decisions
- **Unified planning UI.** The printed (`PlanLabelTypeForm`) and woven
  (`WovenPlanningForm`) planning forms were unified behind a single
  `UnifiedPlanningDialog`/`UnifiedPlanningForm` selected purely by the `productType`
  prop — never by sniffing the editing object's shape. The selection logic was
  extracted into `utils/planning-dialog.ts` (`resolvePlanningSubmitTarget`,
  `resolvePlanningDefaultQuantity`) so the workflow dispatch is a pure, tested
  invariant. `WovenProductionPanel` was refactored onto this dialog pattern;
  `components/unified/` was abandoned and deleted.
- **Cutting/packaging scope — SETTLED LINE-SCOPED 2026-09-29** (history: it was
  **order-scoped** on the live DB from 2026-09-26 until 0025 — `production_batches_first_stage_one_line`
  required `num_nonnulls(...) = 0` for cutting/packaging and `production_batches_order_stage_no_uq`
  numbered them per order, which made every line-scoped read structurally empty and left the
  dashboard panels blank). The product decision that was recorded as open went the other way and
  **was executed as migration `0025_line_scoped_cutting_packaging.sql`**: the order-scoped CHECK is
  dropped first, the line-less rows are backfilled (largest contributor → packaging inherits its
  cutting line → order's first line as a fallback), an orphan guard refuses to continue if any
  batch still has no line, and `production_batches_one_line` (`num_nonnulls(...) = 1` for every
  stage) replaces it. `production-batches.table.ts` already declared that shape, so the database
  was moved **to** the schema — `.clinerules` §3, `projectbrief.md` and `progress.md`, which had
  claimed line-scoped all along, are now right. Validated on a scratch DB by
  `server/scripts/verify-0025-line-scoped.mjs`; **live is still pre-0025** until someone applies it.
- **Two-project Vercel deployment.** Server builds via tsup from
  `src/api-entry.ts` (NOT `src/index.ts`) and renames the output to
  `api/index.js`; `server/vercel.json` exposes it as the only serverless
  function (maxDuration 30, region bom1). Runtime DB = Supabase transaction
  pooler (`:6543`, `prepare:false`); `DIRECT_URL` session pooler (`:5432`) is
  dev-only.
- **Drizzle ORM + Supabase.** Migration files `0000`–`0024` are applied to live; **`0025`
  (`0025_line_scoped_cutting_packaging`, 2026-09-29) is journalled but NOT yet applied there** —
  the journal holds 26 entries
  (`0019`'s entry was lost, leaving an orphaned
  tracker row; see `memory-bank/migration-reconciliation.md`); `relations/` holds the
  only wired-up Drizzle `relations()`. Decimal columns are strings over the
  wire throughout.
- **Zod v3 (server) / v4 (client)** split is treated as a hard cross-package
  constraint: schemas are NOT shared.

## Working-tree state — RESOLVED 2026-09-26
**And re-resolved 2026-09-28:** the batch-visibility change set — §12 (server read path) + §13
(client create path) + `implementation.md` — was **committed as `0a3ef12`** on `chore/ci`
(24 files, +2807/−170), including the regenerated `server/api/index.js`. The tree is clean.

The large dirty change set was committed on `chore/ci` in atomic commits: server
sub-module reorg; migration 0024 + estimated-weaving feature (server + client);
client batch planning/stage UI (unified dialog; `WovenStageBoard`,
`WovenPlanningForm` and the work-order progress cards deleted); healthcheck probes +
table-visibility store; tooling (`.gitignore`, `CLAUDE.md`, `.clinerules`,
`.claude/`, `.graphify/`, vitest env fallback); diagnostic scripts; `memory-bank/`
docs (incl. `migration-reconciliation.md`); rebuilt `server/api` bundle.
Outstanding non-code state:
- Stray repo-root cruft — **mostly cleaned 2026-09-26.** Removed: `Continue` (empty),
  `fix_all.py`, `fix-bb.js`, `fix-bb.py`, `fix-dialog.ps1`, `fix-assert-resources.js`,
  `insp.txt`, `inspect-out.txt`, `head-index.txt`, `app-index-diff.txt`, `client/tsc-cli.txt`,
  `server/scripts/tmp-diag-line15.mjs`, `server/seed-master.ts` (stale pre-refactor duplicate
  of `src/shared/db/seed-master.ts`) and the `.verify-head/` snapshot dir. `graphify-out/` and
  `.verify-head/` are now gitignored so they cannot be committed by accident.
  Deliberately KEPT: `3Q-Dashbaord/` (gitignored nested repo with its own `.git` history —
  deleting it destroys that history, so it needs an explicit go-ahead), `graphify-out/`
  (11.6 MB stale graph, superseded by `.graphify/`), `tox.mjs` (a working monorepo test
  runner) and `implementation_spec.md` (a still-relevant refactor spec). `client.zip` was
  already gone and the duplicate `_journal.json` is resolved — only
  `server/drizzle/meta/_journal.json` remains.

## Where the code lives (quick map)
- `client/src/app/` — providers, route table (`routes.tsx`), App shell.
- `client/src/lib/api.ts` — typed axios wrapper + `ApiError`.
- `client/src/shared/` — generic UI (sidebar, header, data-table, theme).
- `client/src/components/{ui,forms,cards,dialogs,feedback,layout,data-table}/`.
- `client/src/features/<feature>/` — each feature owns pages/components/hooks/services/schemas/types.
- `server/src/{index.ts,app.ts,api-entry.ts}` — dev entry, Express app (owns the `apiRouter` + all 20 mounts), serverless entry (imports `app` only, no migrations).
- `server/src/modules/<domain>/` — **vertical slices** (flat per-resource files):
  `work-orders/`, `production/`, `inventory/`, `companies/`, `users/`, `machines/`,
  `operators/`, `ink/`, `thread/`, `analytics/`, `health/`.
  File naming: `<resource>.{routes,controller,service,repository,schema}.ts`.
- `server/src/shared/` — cross-cutting only: `config/` (env, database, logger),
  `db/` (schema.ts, drizzle.ts, tables/, relations/, seed/migrate scripts),
  `errors/`, `middleware/`, `validation/`, `constants/`, `services/` (mail), `utils/` (formulas).
- `server/src/shared/__tests__/architecture.test.ts` — architecture guard (acyclic graph,
  repositories-are-leaves). Not a behaviour test; it fails CI on structural regressions.
- `server/drizzle/` — migration files `0000`–`0025` (journal has 26 entries; `0019`'s
  entry was lost — see `migration-reconciliation.md`).
- `server/src/config/env.ts` — Zod-validated environment (env vars list).
- Knowledge graph at `.graphify/` (report: `.graphify/GRAPH_REPORT.md`).

## Cutting/packaging batch visibility — FIXED (2026-09-26)

**Symptom:** the cutting and packaging panels on the production-order dashboard stayed empty while
the floor showed batches; `GET /production/orders/22/batches?stage=cutting` answered `[]` and
`flow.totals.cutProduced` stayed 0, so `readyForCompletion` was unreachable. Full diagnosis, plan
and an execution record live in `implementation.md` (§1–§12).

**Root causes (all READ-path):** R1 the client asked the line endpoint for every stage;
R2 `findByOrder` INNER JOINed the line table, which drops the NULL-line rows that cutting and
packaging batches are (live constraint `production_batches_first_stage_one_line`);
R3 `getOrderFlow` summed only line-owned batches. The write path
(`lineMixCte` / `attributedForLine` / `flowInTx`) was already order-scoped and correct.

**Decisions taken by proceeding:** D1 = keep cutting/packaging **order-scoped** (no migration, no
schema change); D2 = order-wide row + mix chips now (the order-level board stays deferred).
**⚠ Both superseded 2026-09-29** — D1 was reversed and executed as migration 0025, and everything
below this line describes the *interim* order-scoped system (D2's `labelMix` machinery is deleted).
See "Cutting/packaging batches → LINE-SCOPED — SHIPPED (2026-09-29)" at the top for the current state.

**What landed** — server: `findByOrder` anchored on `production_batches.production_order_id` with
both line tables LEFT joined + an explicit `STAGES_OF[kind]` workflow filter; new
`labelMixForOrder(orderId)` reusing the write path's `lineMixCte`, attached as `labelMix` on
order-scoped rows; pure `attributedFlowOf()` in `batch-flow.helpers.ts` drives `getOrderFlow`'s
per-label-type cut/packaging figures, `batchCounts` and `running`. Client: `useStageBatches`
(line vs order scope), `utils/batch-scope.ts#batchScopeOf`, mix chips, "· order-wide" header,
create button guarded by the **sources** query, debug `console.log`s removed, stale "one line per
batch" comments corrected. Tests: +13 (T1 structural join test, T2 attributed-flow cases, T3 share
math, T4 scope matrix, T5 live script `npm run verify:batch-visibility`).

**Live proof:** order 22 now lists `C-001`/`C-002` (both `productionOrderLineId: null`) with
`labelMix: [{lineId:15, labelType:"Care Label", rolls:10000, share:1}]`, and
`flow.lines[Care Label].batchCounts.cutting = 2`. Both cutting batches are still `ASSIGNED`
(`produced_rolls = 0`), so `cutProduced = 0` is the correct figure until output is recorded.

**NOT committed yet** — the working tree holds this change set (+ `implementation.md`) for review;
`server/api/index.js` was regenerated and must travel with the code (`.clinerules` §5).
### Client side of the order-scoped create — WIRED (2026-09-28)
The read path above fixed the *panels*; this pass fixed the **create** path, which still POSTed
cutting/packaging batches to `/cutting-batches/lines/:lineId` — a URL claiming a line the live
CHECK forbids those batches to have (`implementation.md` §13).
- `services/batch-service.ts`: `getSourcesFromOrder`, `getResourcesFromOrder`, `createFromOrder`
  now have callers (the §12 server endpoints were previously unreachable from the UI).
- `hooks/use-batches.ts`: `BATCH_KEYS.orderSources` / `.orderResources`, `useOrderBatchSources`,
  `useOrderStageResources`, and the unified `useStageSources` / `useStageScopedResources` that pick
  line vs order from `batchScopeOf`. Both candidate hooks are always called (stable hook order),
  exactly one enabled. `useBatchMutation` also invalidates `orderFlow(orderId)` resolved from
  `args.orderId ?? orderId`, so a create from any board refreshes the flow figures.
- `CreateBatchDialog`: `lineId` / `labelType` optional; `canSubmit` needs a line only for the
  first stage; header reads "Order-wide — consumes … from every label type"; the dialog hands both
  ids to the hook instead of deciding the URL itself.
- **Single decision point, unit-tested:** `utils/batch-scope.ts#batchCreateTarget(stage, {lineId,
  orderId})` → `{scope:"line"}` / `{scope:"order"}` / `null`, plus `isOrderScopedOnEveryWorkflow`
  (derived from `STAGES_OF`, so no hard-coded stage list). Order wins for cutting/packaging even
  when a line id is present; `batch-scope.test.ts` 9 → **17 tests**.
- Gates re-verified 2026-09-28: client typecheck 0 errors · `npm test` **7 files / 71 tests** ·
  lint 0 errors / 184 warnings (unchanged) · `npm run build` green · server typecheck 0 errors ·
  server `npm test` 9 files / 120 tests · server build OK (`api/index.js` regenerated, 509 070 B) ·
  `graphify update .` → 3211 nodes / 9016 edges (gitignored `graphify-out/` only).
  Still **not committed**; §9.4 (deployed API) and §9.5 (manual UI pass) remain outstanding.




## Immediate next steps
1. ~~**DECIDE the cutting/packaging scope**~~ — **DECIDED 2026-09-29, the other way: LINE-SCOPED.**
   Migration `0025_line_scoped_cutting_packaging.sql` was written, journalled (idx 25) and
   **validated end-to-end on a scratch DB** (`server/scripts/verify-0025-line-scoped.mjs`, all
   checks pass); server and client were rewritten to the line-scoped model and both packages are
   green. **Outstanding: apply 0025 to live Supabase** (D1/DIRECT_URL, dev machine only) and then
   re-run `npm run verify:batch-constraints` + `npm run verify:batch-visibility` against it.
   Provisioning is unaffected: a fresh DB gets 0025 through `drizzle-kit migrate` like any other
   genuinely-new migration (it is already in the journal).
2. ~~**Execute `memory-bank/migration-reconciliation.md`.**~~ — **Phases 1, 2 and 4
   EXECUTED 2026-09-28**: the lost `0019` journal entry is restored (journal is now a complete
   0–24 sequence), and fresh-DB provisioning now runs off a **pg_dump baseline** instead of
   replaying 0000–0024. New script `server/scripts/dump-baseline.mjs` (`npm run db:baseline`)
   captures `server/scripts/baseline/live-schema.sql` with a mis-target guard;
   `reconcile-migrations.mjs` gained `--fresh` (marks every journal entry `baseline:<tag>`,
   refuses on a non-empty tracker) alongside the existing live `--write` path. Validated
   end-to-end on scratch DB `q3_provision_scratch`: baseline clean → `--fresh` records 25 →
   `drizzle-kit migrate` = nothing to apply → `pg_dump` diff vs live empty → a throwaway
   `0025` probe applied *only* that migration.
   **Phase 3 / D4 is now largely self-resolving**: 0025 is what makes live match
   `schema.ts` (which declares `production_batches_one_line`, not the old pair), so applying it
   closes the check/index mismatch the phase was about — **still gated on the go-ahead to touch
   live.**
3. **Re-affirm client gates**: `typecheck` 0 errors, `test` 7 files / 67 tests (the scope-matrix
   suite `batch-scope.test.ts` was deleted with the scope decision; `batch-service.test.ts` added),
   `build` green — re-verified 2026-09-29.
4. ~~**Decide on the committed `server/api/index.js` build artifact**~~ — **DECIDED
   2026-09-28: keep it committed and in sync** (`.clinerules` §5 — `vercel.json` serves
   `functions["api/index.js"]`, and the file is tracked). Verified by rebuilding: `server/api/`
   came out byte-identical to the committed bundle. Residual quirk (no action needed): the rename
   step maps only `api/api-entry.js` → `api/index.js`, so the committed `api/index.js.map` lags
   one build; nothing reads it at runtime.
5. **Housekeep**: `3Q-Dashbaord/` is **characterised but NOT deleted** — 2026-09-28
   investigation: its own unrelated `.git` on `main` (3 commits, no remote), 720 files / 6.8 MB,
   gitignored at `.gitignore:31`, HEAD *not* an ancestor of `chore/ci`, carrying duplicate
   `client/` + `server/` copies and regenerable build output. Deleting it destroys that history,
   so it stays pending an explicit go-ahead. Also outstanding: refresh the stale `CLAUDE.md`.
6. **Longer-term (roadmap items, see progress.md)**: auth + RBAC, invoicing/ledger,
   list-endpoint pagination, the `production-runs` page/route, CI Node 20→24, and
   the deferred follow-ups below.

## Deferred follow-ups from the refactor
- Vite dev server proxy errors: `localhost` DNS resolution fails (ECONNREFUSED for A/AAAA queries), causing ENOBUFS/EADDRINUSE errors. **FIXED**: Replaced Vite's built-in proxy with a custom plugin using `http-proxy-middleware` and a singleton keep-alive HTTP agent (`maxSockets: 100`). The built-in http-proxy closure captured options before agent could be set. Also changed proxy target to `127.0.0.1`. Added `http-proxy-middleware` dev dependency (`client/vite.config.ts`).
- Migration 0025 (`production_batches_line_scoped_cutting_packaging.sql`): Applied to live database via `npx drizzle-kit migrate`. Database now has `production_batches_one_line` CHECK constraint, replacing the old `production_batches_first_stage_one_line`. Cutting/packaging batches now support line-scoped configuration.
- `batch-flow.repository.ts#assertResourcesFreeTx` builds SQL by string concatenation
  — parameterise with `sql.join`/bound values (also fixes an `IN (null)` no-op edge case).
- Repository-level `throw new NotFoundError/ConflictError` across ~10 repositories
  violates `.clinerules` §2 (repos should be Drizzle-only); relocate to services.
  Left alone deliberately: moving them changes transaction-boundary error semantics.
- `api/index.ts` Vercel entry + `/api/v1` prefix were explicitly **not** introduced;
  `vercel.json` is byte-unchanged.
- `.graphify/GRAPH_REPORT.md` is stale from commit `9b99ce1` (`graphify` CLI unavailable here).


## Woven planning entry points unified — DONE (2026-09-25)
- `WovenProductionPanel.tsx` no longer renders an inline `<PlanLabelTypeForm>`; it mounts the
  shared `UnifiedPlanningDialog` (from `PlanLabelTypeDialog.tsx`) with `productType="woven"`,
  gated by `planning || editing !== null`. Both entry buttons (`Plan Woven Production` →
  `setPlanning(true)`; `Re-plan` → `setEditing(line)`) open it, matching the printed workflow.
- Removed the dead `PlanLabelTypeForm` import, `usePlanWovenLine`, `showForm`, `planLine`,
  `handleSubmit`, and the stale `!showForm` guard on the empty state.
- Gates after the change: `typecheck` 0 errors · `lint` 0 errors (184 warnings) ·
  `test` 6 files / 54 tests green · `npm run build` OK.
- POST-MORTEM (do not repeat): `Set-Content -Value $lines -NoNewline` with a PowerShell ARRAY
  flattened all 326 lines of this file into ONE line (no separators), duplicating a JSX comment
  and orphaning the `) : null}` closer. Recovered by rebuilding from the VS Code Local History
  snapshot (`%APPDATA%\Code\User\History\-11bde6d\Gud9.tsx`) + 4 deterministic edits.
  RULES: never hand an array to `Set-Content -NoNewline`; write files with
  `[System.IO.File]::WriteAllText($path,$text,(New-Object System.Text.UTF8Encoding($false)))`;
  repo source files use CRLF.


### Waste tracking without auto-headroom (follow-up 2026-10-14)
- changed remainingPlannedTx/remainingPlannedSizeTx to return planned - totalAssigned (waste excluded from ceiling)
- changed isReadyForCompletion to check packagedProduced + wastedTotal >= planned
- verification: Server 123/123 OK, Client 67/67 OK, build OK, graphify OK, implementation.md written

## Edit batch flow — wired (2026-10-15)

- `client/src/features/production-orders/utils/batch-edit.ts` — pure, side-effect-free edit-rule module with 21 unit tests covering the three client/server ceiling mismatches: `editFloor` (produced + wasted), `editSourceCap` (live availability + the batch's own hold re-added), `firstStageCap` (remainingPlanned + the batch's own first-stage assignment), `mergeEditSources` (re-adds held sources the live query filtered out), `validateBatchEdit`, `buildBatchUpdateBody`.
- `EditBatchDialog.tsx` (new) — standalone editor mirroring CreateBatchDialog: prefilled state, plan ceiling banner, plan select with the edit-aware `SourcePicker` (`ownAllocations`), machine/operator selects via `useStageResources(stage, lineId, batch.id)` so the batch's own resources stay selectable, notes, floor line, inline server-style validation; submits via `updateBatch.mutateAsync`.
- `CreateBatchDialog.tsx` — `SourcePicker` exported with an optional `ownAllocations` prop so its cap/label/max-All logic is edit-aware while staying byte-identical for create-mode.
- `BatchStageBoard.tsx` — `editBatch` state threaded through `StagePanel` -> `BatchRow`; Edit `RowAction` (Pencil icon, first position, gated by `!readOnly && canTakeAction`); renders `<EditBatchDialog/>` alongside the existing create/output/trace dialogs.
- **Client gate (2026-10-15):** `npm run typecheck` -> 0 errors; `npm test` -> **8 files / 88 tests** (added `batch-edit.test.ts`, 21 tests; server unchanged this session).
- graphify CLI unavailable in this environment (see activeContext line 328) — `GRAPH_REPORT.md` not refreshed.

## Roll progress tracking → required rolls (2026-10-19, act)
- Progress % for Printing/Cutting/Packaging and order readiness is now measured against
  `requiredRolls` (required, excludes extra/buffer) instead of `totalRolls`. When
  `requiredRolls` is 0 (legacy), behaviour falls back to `totalRolls`.
- Over-producing past required is allowed: progress % is clamped at 100 and the stage
  stays Complete. Completion stamps (`printingCompletedAt`/`cuttingCompletedAt`/
  `packagingCompletedAt`), line `status = completed`, Production Summary stage badges,
  the batch-board "ready to complete" banner, and dashboard bars all flip Complete once
  produced >= required. Inventory-position counters (unprinted/printable/remaining) and
  assignment capacity (`remainingPlanned`, output ≤ assigned, printed ≤ totalRolls,
  assertWithinPlan) stay on `totalRolls` so extra rolls remain assignable and producible.
- Server: `production-formula.ts` (new `progressTargetOf`, `completionPct` clamped),
  `production-order.helpers.ts` (`stageCompletionPatch`, `deriveLineStatus`),
  `production-order-overview.builder.ts` (per-stage + totals progress, isReadyForCompletion),
  `batch-flow.helpers.ts` (`isReadyForCompletion` target), `batch-flow.service.ts`
  (exposes `required` per line + totals). Woven path untouched (quantity-based).
- Client mirrors: `line-draft.ts` optimistic `patchOverviewLine` + local `completionPct`,
  `StageProgressBars.tsx`, `roll-columns.tsx`; `LineFlow.required?`.
- Tests: helpers + batch-flow + formula server suites extended; client `line-draft.test.ts`
  gains `patchOverviewLine` cases.
- Gate: server typecheck OK, server tests 139/139; client typecheck OK, client tests 92/92;
  server build OK (`server/api/index.js` rebuilt). graphify unavailable.

## Remove production_operator role (2026-11-06, act)
- Removed `production_operator` from the `user_role` enum (now 4 roles: `ceo`, `office_staff`, `production_manager`, `accountant`)
- Updated files:
  - `server/src/shared/db/tables/users.table.ts` - enum definition
  - `server/src/shared/middleware/rbac.ts` - removed production_operator permissions
  - `server/src/shared/validation/query.schema.ts` - updated listUsersQuerySchema
  - `client/src/features/production-orders/types.ts` - UserRole type
  - `client/src/features/production-orders/context/ActorContext.tsx` - ROLE_LABELS
  - `server/src/features/production-orders/types.ts` - UserRole type
  - `server/src/features/production-orders/context/ActorContext.tsx` - ROLE_LABELS
  - `memory-bank/projectbrief.md` - role table
  - `CLAUDE.md` - roles documentation
- Created migration `0032_remove_production_operator_role.sql` to update PostgreSQL enum
- Seed data already had only 4 roles (ceo, office_staff, production_manager, accountant)
- Gate: server typecheck 0 errors, server tests 149/149; client typecheck 0 errors, client tests 92/92

## Workflow-specific work-order dialogs, tables, columns, and row actions (act, 2026-10-29)
- **Printed** (`client/src/features/work-orders/printed/components/`): `PrintedWorkOrderTable`
  (DataTable + `printedWorkOrderColumns` that omit the Type badge and Design Code columns),
  `PrintedWorkOrderDialog` (productType fixed to "printed", no WovenSpecification section,
  `hideProductType` on `WorkOrderBasicInfo`), `PrintedWorkOrderRowActions` (view/edit/
  child-order/dispatch/delete/pin, workflow-specific hooks).
- **Woven** (`client/src/features/work-orders/woven/components/`): `WovenWorkOrderTable`
  (DataTable + `wovenWorkOrderColumns` that surface Design Code prominently),
  `WovenWorkOrderDialog` (productType fixed to "woven", always renders `WovenSpecification`),
  `WovenWorkOrderRowActions` (same menu structure as printed, uses woven hooks and dispatch dialog).
- Both list pages (`printed/pages`, `woven/pages`) now render their DataTable + create dialog,
  with a working "New Order" button that opens the workflow-specific dialog.
- Both dialogs support child-order creation (shortfall/recut/additional) with auto-suffixed
  SO numbers and inherited comment/PO/Due Date fields.
- `DataTableColumnHeaderProps` extended with optional `align?: "left" | "right" | "center"`
  to support right-aligned header cells (previously only `meta: { align }` was supported).
- `hasProductionOrder` / `productionOrder` computed via `"productionOrder" in workOrder`
  type-guard pattern (matching the shared `WorkOrderDialog`) to handle the
  `WorkOrder | WorkOrderDetail` union correctly.
- **Gate**: client typecheck 0 errors; client tests 92/92. graphify updated.

## Auth/RBAC dev bypass (act, 2026-11-07)
- Root cause of "tables show no data": every non-/auth API route required a valid JWT via the global `authenticate` middleware in `server/src/app.ts` (line 131), plus many routes enforced `requireRole` RBAC. Without a logged-in user / valid token, all API calls returned 401/403 and all tables rendered empty.
- Changes:
  - `server/src/app.ts`: replaced global `authenticate` with `isProduction ? authenticate : optionalAuth` — requests without a token still reach controllers in dev; valid tokens still populate `req.user`.
  - `server/src/shared/middleware/rbac.ts`: `requireRole` now returns `next()` when `req.user` is undefined (dev mode bypass) instead of throwing `ForbiddenError("Authentication required")`. Production stays strict because `authenticate` guarantees `req.user` is set.
- Gate: server typecheck 0 errors; server tests 149/149; client typecheck 0 errors; client tests 92/92.
