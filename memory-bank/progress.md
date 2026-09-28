# Progress

## Completed features (verified present in the codebase)

### Master data & order entry
- Companies + Brands (brands linked via FK to companies — the broken free-text
  `company` varchar was fixed).
- Work Orders: create/read/update/list, status is **derived** (not client-set),
  `totalQty` frozen once a production order exists, completion lock on
  `status === "complete"`. Woven orders persist a server-calculated
  `estimated_weaving_hours` on `woven_work_order_details` (migration 0024 + backfill),
  previewed live in the dialog and shown in the list's "Est. Weaving Time" column.
- Product types: a work order branches into **Printed** or **Woven**.

### Purchasing & inventory (three ledgers, all append-only with balances)
- Roll purchases (`purchase_records`, `/purchases/rolls`) — derived fields
  (`totalRoll`, `totalRollPer200m`, `invoiceWeight`, `localWeight`) always
  server-calculated via `api/utils/purchase-formula.ts`; purchases credit
  `inventory_rolls` immediately.
- Thread inventory (`/thread`, `thread_stocks`/`thread_stock_movements`):
  UNDYED vs DYED pools, thread receiving + stock.
- Ink inventory (`/ink`): ink purchases, stock, consumption (printers draw ink).
- Sticker / local sheet / label sheet receipts.

### Production (batch-based pipeline)
- Production orders + **unified planning UI** (`UnifiedPlanningDialog` chosen by
  `productType` prop; `PlanLabelTypeForm` printed + `WovenPlanningForm` woven,
  both supporting `isDialogContent`). Selection logic extracted to
  `utils/planning-dialog.ts` (`resolvePlanningSubmitTarget`,
  `resolvePlanningDefaultQuantity`) with 10 unit tests — 54/54 client tests pass (6 files).
- Batch flow: `production_batches` (stage × machine × operator, per line),
  append-only `production_stage_transactions` ledger, `batch_consumptions`,
  `/production/*` REST API (lines, sources, batch CRUD, start/output/complete/cancel,
  order flow, traces).
- Material issuance (`production_roll_issuances`) — the only stock debit path;
  `SELECT … FOR UPDATE` on the ledger row; `issuedRolls` maintained
  transactionally as a fast-read cache.
- Cutting and packaging are **ORDER-SCOPED** in the running system (both line columns NULL;
  numbering per order + stage via `production_batches_order_stage_no_uq`).
  CORRECTED 2026-09-26: a previous note here claimed line-scoped via migration `0023` +
  `production_batches_one_line`, but that constraint does not exist on the live DB and the
  migration never executed (it was recorded as applied with a placeholder hash).
  **The read path now matches (2026-09-26):** `findByOrder` anchors on
  `production_batches.production_order_id` with both line tables LEFT joined;
  `labelMixForOrder` reuses the write path's `lineMixCte` to report which label types fed each
  order-scoped batch; `getOrderFlow` uses a pure `attributedFlowOf()` for per-label-type
  cut/packaging figures and counts; the client reads each stage through `useStageBatches`
  (line scope for the first stage, order scope for cutting/packaging). See
  `implementation.md` §12 for the execution record.
- **The create path matches (2026-09-28).** The client no longer POSTs cutting/packaging batches to
  `/cutting-batches/lines/:lineId`: `batchService.createFromOrder` / `getSourcesFromOrder` /
  `getResourcesFromOrder` serve both stages, `useStageSources` / `useStageScopedResources` pick the
  scope from the stage, and one pure helper — `utils/batch-scope.ts#batchCreateTarget` — decides
  line vs order for the mutation (order wins for cutting/packaging). `batch-scope.test.ts` 9 → 17
  tests; client gates green (7 files / 71 tests). See `implementation.md` §13.
- Woven production: `woven_production_lines`, `woven_thread_plan_items`, dyeing
  workflow + service-provider send/receive, thread-dye-batches.
- Append-only `production_runs` audit log (+ one-time backfill migration).
- Roll allocation / assignment UI for machines (`Printing`/`Cutting` types) and
  operators (`Printing`/`Cutting`/`Packaging` designations).

### Analytics & reporting
- `GET /api/analytics/kpis` — the only analytics endpoint left (the old
  `reports` feature was removed; the dashboard consumes this one endpoint).
- Dashboard page + production-order summary cards.

### Tooling & delivery
- CI (`.github/workflows/ci.yml`): typecheck → lint → test → build, both packages
  independently.
- Two-project Vercel deployment with the pooler (runtime) vs session-pooler
  (migrations) DB split, and the `api/index.js` serverless-function entry.
- All migration files `0000`–`0024` exist and are applied to Supabase. The journal
  holds 24 entries — the `0019_batch_flow_sync` entry was lost, leaving its live
  tracker row orphaned (id 20, `created_at=1786533923814`) — and every journal entry
  IS recorded on live (0022/0023 via placeholder hashes from
  `server/scripts/reconcile-migrations.mjs`; 0024 with its real hash). Fresh-DB
  provisioning from scratch is still broken (0018/0019 mutual redundancy + the 0023
  divergence + out-of-band live objects) — full findings and plan in
  `memory-bank/migration-reconciliation.md`.

## Roadmap (not built)
- **Auth + RBAC.** No authentication exists; roles are descriptive. Wire up
  `authRateLimiter` + a real auth layer and gate the descriptive roles. (See
  `.clinerules` §4.)
- **Invoicing / accounting ledger.** Only invoice-number/date *data* columns
  exist; there is no invoicing module, no financial ledger, no CEO/Accountant
  views. (Out of scope for the real role matrix.)
- **List-endpoint pagination.** No list endpoint implements pagination
  (per `CLAUDE.md` API conventions); all return `{ data: T[] }`.
- **`production-runs` UI.** The feature has components/hooks/services/types but
  **no page and no route** in `app/routes.tsx`.
- **`CLAUDE.md` refresh.** It still predates woven/thread/dyeing/batch-flow and
  claims the rate limiter is a no-op — needs updating to match real code.
- **CI Node drift.** `engines: 24.x` vs CI on Node 20 — align.
- **Repo housekeeping — DONE 2026-09-26** except `3Q-Dashbaord/`. Root `fix*.py`/`fix*.js`/
  `fix-dialog.ps1`, `insp.txt`, `inspect-out.txt`, `head-index.txt`, `app-index-diff.txt`,
  `Continue`, `client/tsc-cli.txt`, `server/scripts/tmp-diag-line15.mjs`,
  `server/seed-master.ts` and `.verify-head/` are removed; `client.zip` was already gone and
  the `_journal.json` duplication is resolved (one file remains). `3Q-Dashbaord/` is
  gitignored but NOT deleted — it holds its own `.git` history, so removing it is a
  data-loss decision needing an explicit go-ahead.

## Quality gates & known issues
- **TypeScript**: both packages `npm run typecheck` → **0 errors** (verified on
  this session). `strict` mode on in both `tsconfig.json` files.
- **Tests** (re-verified 2026-09-26): `client/` **6 files / 54 tests**;
  `server/` **9 files / 107 tests**. Suites:
  `batch-and-runs/batch-flow.helpers.test.ts` (53),
  `batch-and-runs/batch-flow.service.test.ts` (2),
  `batch-and-runs/batch-flow.repository.test.ts` (3),
  `production-orders/production-order.helpers.test.ts` (11),
  `woven-production/woven-production.helpers.test.ts` (13),
  `work-orders/work-order.helpers.test.ts` (7), `shared/formulas/*` (13),
  `shared/__tests__/architecture.test.ts` (5).
- **Known issues / drift**
  - CI runs on **Node 20** but `server/package.json` declares `engines: 24.x`.
  - **Zod v3 (server) vs v4 (client)** — schemas cannot be shared across packages.
  - `CLAUDE.md` is **partially stale** (no woven/thread/dyeing/batch-flow, rate
    limiter wrongly called a no-op); treat as secondary to the real code.
  - The compiled `server/api/index.js` (~4.4k lines) is **committed to git**.
  - The working tree on `chore/ci` was resolved 2026-09-26: the server sub-module
    reorg, the client unified-planning + batch UI work, migration 0024, the tooling
    changes and `memory-bank/` all landed in a run of atomic commits. Only the
    gitignored `3Q-Dashbaord/` nested copy remains outstanding (it holds its own
    `.git` history — deleting it needs an explicit go-ahead).

## Server module extraction (vertical slices) — DONE
- **Phase A complete** (`modules/shared/`): 15 infra files moved from
  `api/{utils,middleware,constants,validations/services/mail}` into
  `modules/shared/{errors,formulas,middleware,constants,validation,services}`.
  `@shared/*` alias added to `tsconfig.json` + `vitest.config.ts`. `tsc --noEmit`
  → 0 errors; `vitest run` → 92/92 (incl. the 2 relocated formula tests).
- **Wave 1 complete** (`modules/users/`): controller/service/repository/routes +
  `users.schema.ts` relocated into `modules/users/{controllers,services,repositories,routes,schemas}`;
  `@modules/*` alias added; external callers (5 `api/services/*` + the test mock) repointed
  to `@modules/users/...`; `api/routes/index.ts` mounts from the new location. `tsc` 0 errors;
  tests 92/92.
- **Sub-module slices (2026-09-26):** the flat domains were split further —
  `production/{batch-and-runs,production-orders,woven-production}`,
  `thread/{thread-dyeing,thread-inventory,thread-service-provider}`, plus standalone
  `brands/` and `material-receipts/`; `app.ts`, cross-module import repoints and the
  architecture-test path guards moved in lockstep.
- **Follow-ups (deliberately out of scope for this structural move):**
  - Parameterize the 3 `sql.raw` string-concatenation clauses in
    `production/batch-and-runs/batch-flow.repository.ts#assertResourcesFreeTx` —
    actual shape: `resClause = "(ids)"` used as `b.machine_id IN (…)`,
    `opClause = " OR b.operator_id IN (id)"`, `excludeClause = " AND b.id <> id"`.
    All concatenated values are internal type-guarded numbers (`assertStageResources`
    forces a non-null machine+operator on create/reassign; packaging has no machine;
    weaving skips `opClause`), so there is no user-input path today — flagged by
    clinerules §B anyway. Two real edge cases: (a) `resClause` packs `operatorId`
    into the `machine_id` IN-list as well (cross-id false-positive risk); (b) the
    start path passes stored IDs unguarded, so a NULL `operator_id` yields
    `IN (null)` — valid SQL that matches nothing, silently skipping the operator
    check. Semantics to preserve when parameterizing: machines are reserved across
    ALL stages, operators only for non-weaving (a weaving operator may run several
    looms); holds are derived from `status IN ('PLANNED','ASSIGNED','IN_PROGRESS')`
    — completing/cancelling frees them with no release step; the check runs inside
    the caller's transaction, after the line lock.
  - Repository-level `throw new NotFoundError/ConflictError` calls violate clinerules
    §2 (repos import db/tables/operators only) — left as-is to avoid changing
    transaction-boundary error semantics; relocate to services in a future wave.
  - `src/utils/` is an empty leftover dir (Phase D housekeeping).
  - `server/api/index.js` rebuilt via `npm run build` to track the new `@shared`/`@modules`
    resolutions.



## Client unified-planning follow-through (2026-09-25)
- `WovenProductionPanel.tsx` now mounts the single `UnifiedPlanningDialog`
  (`productType="woven"`) instead of an inline `PlanLabelTypeForm`; `showForm` / `planLine` /
  `handleSubmit` and the stale `!showForm` guard are gone. All planning entry points
  (Dashboard, Planning page, Woven panel) open the one dialog.
- Client gates re-verified: 6 test files / 54 tests pass; typecheck + build clean.
