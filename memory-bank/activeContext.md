# Active Context

## Current state (what's actually built vs. missing)
The codebase is a two-package, no-workspaces monorepo (`client/`, `server/`)
deployed as **two Vercel projects**. Both packages typecheck clean and the client
test suite is green; the server has a small, focused test suite. The system is
live enough for end-to-end production planning of *both* printed and woven labels,
but it is a **work-in-progress branch** (`chore/ci`) with a **clean working tree** —
the large dirty change set was committed as atomic commits on 2026-09-26 (see
"Working-tree state" below).

### Verified gate state right now (re-verified 2026-09-28, **committed as `0a3ef12`**)
- `client/`: `npm run typecheck` → 0 errors; `npm run lint` → 0 errors (184 warnings); `npm test` → 7 files / 71 tests pass (`utils/batch-scope.test.ts` 9 → 17); `npm run build` → vite build OK.
- `server/`: `npm run typecheck` → **0 errors**; `npm test` → **9 files / 120 tests pass**
  (`vitest.config.ts` injects a dummy `DATABASE_URL` when none is set, so suites no
  longer die on env import-time validation locally or in CI);
  `npm run build` → tsup OK (`dist/index.js` + `api/index.js`), and a rebuild leaves
  `server/api/` **byte-identical** to the committed bundle (so it is in sync);
  `npm run verify:batch-visibility` → all checks PASS against the live DB.
- ⚠ **The live DB was reset since the bug report.** Order `22` no longer exists — the database
  now holds one order, **`#24`** (`PRD-00001`, woven, 60 000), with 2 weaving + 1 cutting batch.
  The T5 script therefore **defaults to the newest order** instead of a hard-coded `22` (the old
  default made the documented no-argument command die with "No production order 22"). Re-run on
  `#24`: `findByOrder(24,'woven','cutting') = 1` (the S1 check that read 0 before the fix),
  `findByLine(woven 20,'weaving') = 1`, `findByLine(…,'cutting') = 0` → **All checks PASS**.

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
- **Cutting/packaging scope — CORRECTED 2026-09-26 (verified against the live DB).**
  The running system is **ORDER-SCOPED**, not line-scoped. `production_batches` carries a
  CHECK named `production_batches_first_stage_one_line`:
  `(stage IN ('weaving','printing') AND num_nonnulls(production_order_line_id,
  woven_production_line_id) = 1) OR (stage IN ('cutting','packaging') AND
  num_nonnulls(...) = 0)` — so cutting/packaging batches MUST have **both** line columns
  NULL, and their numbering is per ORDER + stage (`production_batches_order_stage_no_uq`
  exists; `production_batches_one_line` does NOT exist on the live table). Repository,
  service and tests all implement exactly that, so the deployed code is self-consistent.
  **The documentation was wrong:** migration file
  `0023_revert_cutting_packaging_line_scope.sql`, `.clinerules` §3, `projectbrief.md` and
  `progress.md` all claim line-scoped. Keep-order-scoped vs move-to-line-scoped is an
  **open product decision** — see "Known defects (2026-09-26)". Do NOT "fix" the code to
  line-scoped without also making that migration actually runnable.
- **Two-project Vercel deployment.** Server builds via tsup from
  `src/api-entry.ts` (NOT `src/index.ts`) and renames the output to
  `api/index.js`; `server/vercel.json` exposes it as the only serverless
  function (maxDuration 30, region bom1). Runtime DB = Supabase transaction
  pooler (`:6543`, `prepare:false`); `DIRECT_URL` session pooler (`:5432`) is
  dev-only.
- **Drizzle ORM + Supabase.** Migration files `0000`–`0024` are all applied to live
  (the journal holds 24 entries — `0019`'s entry was lost, leaving an orphaned
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
- `server/drizzle/` — migration files `0000`–`0024` (journal has 24 entries; `0019`'s
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
1. ~~**DECIDE the cutting/packaging scope**~~ — **DECIDED 2026-09-26 (D1: keep
   order-scoped)**: the read path was fixed to match in the same pass, the client create path
   followed on 2026-09-28, and **both are now committed as `0a3ef12`** — item closed.
   Provisioning (`memory-bank/migration-reconciliation.md`) is unaffected — no migration and
   no `schema.ts` change were made.
2. ~~**Execute `memory-bank/migration-reconciliation.md`.**~~ — **Phases 1, 2 and 4
   EXECUTED 2026-09-28**: the lost `0019` journal entry is restored (journal is now a complete
   0–24 sequence), and fresh-DB provisioning now runs off a **pg_dump baseline** instead of
   replaying 0000–0024. New script `server/scripts/dump-baseline.mjs` (`npm run db:baseline`)
   captures `server/scripts/baseline/live-schema.sql` with a mis-target guard;
   `reconcile-migrations.mjs` gained `--fresh` (marks every journal entry `baseline:<tag>`,
   refuses on a non-empty tracker) alongside the existing live `--write` path. Validated
   end-to-end on scratch DB `q3_provision_scratch`: baseline clean → `--fresh` records 25 →
   `drizzle-kit migrate` = nothing to apply → `pg_dump` diff vs live empty → a throwaway
   `0025` probe applied *only* that migration. **Still outstanding: Phase 3 / D4**
   (`schema.ts` still declares the non-existent `production_batches_one_line` check and omits
   `first_stage_one_line` / `order_stage_no_uq`) — decision-gated, needs explicit go-ahead.
3. **Re-affirm client gates**: `typecheck` 0 errors, `lint` 0 errors (184 warnings), `test` 7 files / 71 tests, `build` green — all re-verified 2026-09-28.
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
