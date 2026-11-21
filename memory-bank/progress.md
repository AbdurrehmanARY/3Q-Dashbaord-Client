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
- Cutting and packaging are **LINE-SCOPED since 2026-09-29** — every batch carries exactly one
  line column (`production_order_line_id` for printed, `woven_production_line_id` for woven) and
  numbering restarts per (line, stage), enforced by `production_batches_one_line`
  (`num_nonnulls(...) = 1` at every stage) plus the partial `production_batches_printed_no_uq` /
  `production_batches_woven_no_uq` indexes. Delivered by migration
  `0025_line_scoped_cutting_packaging.sql`: drop `first_stage_one_line` first (the backfill
  violates it otherwise), backfill line-less rows (largest contributor → packaging inherits its
  cutting line → the order's first line as fallback), RAISE if any orphan remains, add
  `one_line`, drop `order_stage_no_uq`. **Validated end-to-end on a scratch DB** by
  `server/scripts/verify-0025-line-scoped.mjs` (all 4 phases pass). Server side: the attribution
  machinery (`labelMixForOrder` / `lineMixCte` / `attributedFlowOf`) is deleted, `createBatch`
  is one line-scoped path for all four stages with same-line source enforcement, and the
  order-scoped routes/schema/controller/service helpers are gone. Client side:
  `utils/batch-scope.ts`, `createFromOrder`/`getSourcesFromOrder`/`getResourcesFromOrder` and the
  scope-picking hooks are deleted; the board and dialog always use `flow.lineId`;
  `services/batch-service.test.ts` pins the line URLs. ✅ **0025 has been applied to live Supabase** (verified 2026-10-28) — the
  migration is journalled (idx 25) and has been applied to live Supabase.
  HISTORY (2026-09-26 → 2026-09-29): live was briefly order-scoped (0023's content had never
  executed, so `first_stage_one_line` + `order_stage_no_uq` were live), and the interim read-path
  and create-path fixes recorded below — and in `implementation.md` §12–§13 — described that
  design. **They are superseded by this entry.**
- **The create path matches (2026-09-28).** The client no longer POSTs cutting/packaging batches to
  `/cutting-batches/lines/:lineId`: `batchService.createFromOrder` / `getSourcesFromOrder` /
  `getResourcesFromOrder` serve both stages, `useStageSources` / `useStageScopedResources` pick the
  scope from the stage, and one pure helper — `utils/batch-scope.ts#batchCreateTarget` — decides
  line vs order for the mutation (order wins for cutting/packaging). `batch-scope.test.ts` 9 → 17
  tests; client gates green (7 files / 71 tests). See `implementation.md` §13.
  **Both halves are committed** (2026-09-28) as `0a3ef12` on `chore/ci` — 24 files, +2807/−170 —
  together with the regenerated `server/api/index.js` (509 070 B): a fresh `npm run build` leaves
  `server/api/` byte-identical, so the committed bundle is in sync.
- Woven production: `woven_production_lines`, `woven_thread_plan_items`, dyeing
  workflow + service-provider send/receive, thread-dye-batches.
- Append-only `production_runs` audit log (+ one-time backfill migration).
- Roll allocation / assignment UI for machines (`Printing`/`Cutting` types) and
  operators (`Printing`/`Cutting`/`Packaging` designations).

### Analytics & reporting
- `GET /api/analytics/kpis` — the only analytics endpoint left (the old
  `reports` feature was removed; the dashboard consumes this one endpoint).
- Dashboard page + production-order summary cards.

### Dashboard consolidation (2026-10-29)
- Removed `features/ceo-dashboard/` (7 pages + hooks + service). The
  "CEO Dashboard" navigation entry was replaced by an expanded top-level
  "Dashboard" section with six sub-pages (`/dashboard/work-orders`,
  `/dashboard/work-orders/printed`, `/dashboard/work-orders/woven`,
  `/dashboard/production-orders`, `/dashboard/production-orders/printed`,
  `/dashboard/production-orders/woven`, `/dashboard/machines`,
  `/dashboard/operators`, `/dashboard/roll-stock`,
  `/dashboard/thread-stock`) plus the `/` overview.
- The old `DashboardPage.tsx` KPI-based overview was replaced by the
  CEO overview (stat cards + trend) from the deleted `CeoDashboardPage`.
- Old `/ceo-dashboard/*` routes are kept as redirects to `/dashboard/*`
  for backward compatibility.
- `routes.tsx` and `shared/navigation.ts` updated accordingly; graphify
  re-indexed; typecheck + 92/92 tests green.

### Tooling & delivery
- CI (`.github/workflows/ci.yml`): typecheck → lint → test → build, both packages
  independently.
- Two-project Vercel deployment with the pooler (runtime) vs session-pooler
  (migrations) DB split, and the `api/index.js` serverless-function entry.
- All migration files `0000`–`0024` exist and are applied to Supabase. The journal
  now holds **25 entries (idx 0–24, complete)** — the `0019_batch_flow_sync` entry was
  lost and was **restored 2026-09-28** (`when: 1786533923814`, matching its orphaned live
  tracker row, id 20). Every journal entry IS recorded on live (0022/0023 via placeholder
  hashes from `server/scripts/reconcile-migrations.mjs`; 0024 with its real hash).
  **Fresh-DB provisioning is fixed (2026-09-28) via a pg_dump baseline rather than a replay**:
  `server/scripts/baseline/live-schema.sql` (34 tables / 17 enums / 81 indexes / 104 constraints)
  + `npm run db:baseline` (`dump-baseline.mjs`, with a mis-target guard) +
  `reconcile-migrations.mjs --fresh` (records all entries `baseline:<tag>`, refuses a non-empty
  tracker) + `drizzle-kit migrate`. Proven on scratch DB `q3_provision_scratch` including a
  future-migration probe. Replaying 0000–0024 stays an audit path only — the chain still cannot
  run from 0000 (0018/0019 mutual redundancy, 0023 divergence, out-of-band live objects).
  Remaining: Phase 3 / D4 — `schema.ts` still disagrees with live (decision-gated).

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
  gitignored (`.gitignore:31`) but NOT deleted — it holds its own `.git` history, so removing it
  is a data-loss decision needing an explicit go-ahead. **Characterised 2026-09-28:** an
  unrelated repo on `main` (3 commits — `Initial commit`, `first repo`, `Create .git.zip`), no
  remote, 720 files / 6.8 MB, its HEAD is *not* an ancestor of `chore/ci`; it also carries local
  duplicate `client/`/`server/` copies plus regenerable build output. Safe to delete **only**
  with explicit approval.

## Quality gates & known issues
- **TypeScript**: both packages `npm run typecheck` → **0 errors** (verified on
  this session). `strict` mode on in both `tsconfig.json` files.
- **Tests** (re-verified 2026-09-28): `client/` **7 files / 71 tests**;
  `server/` **9 files / 120 tests**. Server suites:
  `batch-and-runs/batch-flow.helpers.test.ts` (53),
  `batch-and-runs/batch-flow.service.test.ts` (2),
  `batch-and-runs/batch-flow.repository.test.ts` (3),
  `production-orders/production-order.helpers.test.ts` (11),
  `woven-production/woven-production.helpers.test.ts` (13),
  `work-orders/work-order.helpers.test.ts` (7), `shared/formulas/*` (13),
  `shared/__tests__/architecture.test.ts` (5).
  Client suites: `utils/batch-scope.test.ts` (17) plus six pre-existing pure util/store tests
  (`utils/line-draft`, `utils/planning-dialog`, `utils/planning-rows`, `lib/format`,
  `utils/weaving-time`, `store/table-visibility-store`).
- **Known issues / drift**
  - CI runs on **Node 20** but `server/package.json` declares `engines: 24.x`.
  - **Zod v3 (server) vs v4 (client)** — schemas cannot be shared across packages.
  - `CLAUDE.md` is **partially stale** (no woven/thread/dyeing/batch-flow, rate
    limiter wrongly called a no-op); treat as secondary to the real code.
  - The compiled `server/api/index.js` is **committed to git** — **decided 2026-09-28: keep it
    committed and in sync** (`.clinerules` §5: `vercel.json` serves `functions["api/index.js"]`).
    Verified by rebuilding: `server/api/` comes out byte-identical to the committed bundle. The
    build's rename step only maps `api/api-entry.js` → `api/index.js`, so the committed
    `api/index.js.map` lags one build (runtime-irrelevant, pre-existing script quirk).
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

### Bug fixes (2026-10-12)
- **Fixed `use-label-types.ts` in production-orders hook**:
  - Corrected import paths: `@lib/api` → `@/lib/api`, `../types` → `@/features/label-types/types`
  - Fixed `useLabelTypesForPlanning()` to use dynamic `type` parameter instead of hardcoded "woven"
  - Fixed API call to separate path and query params: `api.get<{ data: LabelType[] }>("/label-types", { category: type, activeOnly: true })`0.
  - Added `select: (res) => res.data` to unwrap the response envelope
  - Added `staleTime: 5 * 60 * 1000` for TanStack Query v5

- **Fixed `BatchStageBoard.tsx`**:
  - Added missing variable definitions in `BatchRow` function: `open`, `produced`, `assigned`, `available`, `wasted`, `pct`, `canDelete`, `canStart`, `canComplete`, `canOutput`, `canCancel`, `canTakeAction`
  - Removed stray `}` at end of file
  - File now properly ends with `RowAction` function closure

- **Migration 0026_label_types.sql**:
  - Created `label_types` master data table with named constraint `label_types_valid_category` check
  - Added FK column `production_order_lines.label_type_id` referencing `label_types.id`
  - Created index `production_order_lines_label_type_idx` for efficient lookups
  - Seeded initial label types (4 woven: Size/Care/Main/Loop Label; 5 printed: Address/Warning/Composition/Import/Poly Import Label)

- **Migration journal (`_journal.json`)**:
  - Verified idx-26 entry for 0026_label_types with timestamp 1787300000000

- **Validation**:
  - Server typecheck: ✅ 0 errors
  - Server tests: ✅ 123/123 tests pass (9 files)
  - Client typecheck: ✅ 0 errors
  - Client tests: ✅ 67/67 tests pass (7 files)
### Waste across all stages + DC copy image (2026-10-14)
- **Migrations 0027 + 0028 applied to live Supabase** via drizzle-kit migrate (session pooler DIRECT_URL). Verified by erify-new-columns.mjs:
  - production_batches.waste_reason (varchar, nullable) — present
  - work_orders.dc_image_url (text, nullable) — present
  - production_batches_waste_first_stage_only CHECK — dropped
  - Migration journal idx 27 + 28 recorded in drizzle.__drizzle_migrations
- **0027_waste_all_stages**: dropped first-stage-only waste CHECK, added waste_reason column. Waste now recordable at all stages (printing, weaving, cutting, packaging). ecordOutput guard removed; emainingPlannedTx ceiling EXCLUDES waste — does NOT create auto-headroom.
- **0028_dispatch_dc_image**: added dc_image_url text column to work_orders for DC copy images alongside artwork.
- **Verification**: Server typecheck ✅, Server tests ✅ 123/123, Client typecheck ✅, Client tests ✅ 67/67, Server build ✅ (api/index.js rebuilt), graphify update ✅.
  - **Client-side fixes (2026-10-14)**: Removed `isPrinting` gate from `BatchOutputDialog.tsx` so waste can be recorded at all stages (cutting, packaging); added `wasteReason` field to `RecordOutputInput` in `batch-types.ts`, added `wastedTotal` to `LineFlow`, and `wasteReason` to `ProductionBatch`. Fixed stale comments in `BatchOutputDialog.tsx` and `BatchStageBoard.tsx`. `isFirstStage` import removed from `BatchOutputDialog.tsx` (still used by other components). Verification: Client typecheck 0 errors, Client tests 67/67, Server typecheck 0 errors, Server tests 123/123, graphify update done.




### Waste tracking without auto-headroom (2026-10-14, logic follow-up)
- Changed remainingPlannedTx and remainingPlannedSizeTx to return planned - totalAssigned instead of planned + totalWasted - totalAssigned — waste no longer creates assignment headroom
- Changed lineFlowOf.remainingPlanned formula to planned - assignedToFirst (waste excluded from ceiling)
- Changed isReadyForCompletion to accept wastedTotal param and check packagedProduced + wastedTotal >= planned — waste counts toward completion but not assignment capacity
- Updated tests: existing isReadyForCompletion calls include wastedTotal: 0; new test case verifies waste counts toward completion but not headroom
- wastedTotal added to service totals accumulator and initial value
- Verification: Server typecheck 0 errors, Server tests 123/123 (9 files), Client typecheck 0 errors, Client tests 67/67 (7 files), Server build OK (api/index.js rebuilt), graphify update done, implementation.md written

## Edit batch dialog + wiring (2026-10-15, follow-up to waste tracking)

- `utils/batch-edit.ts` + `batch-edit.test.ts` (21 tests): extracts the client-side ceiling corrections the server enforces on write (source-own-hold; first-stage plan + own assignment) so the dialog prompts before the server's 409.
- `EditBatchDialog.tsx`: edit UX prefilled from the batch with edit-aware caps; submits via PATCH /batches/:id through `updateBatch`; machine/operator selects scoped with `batch.id` so this batch's own resources stay selectable.
- `CreateBatchDialog.tsx`: `SourcePicker` lifted and made edit-aware (`ownAllocations`); create path unchanged.
- `BatchStageBoard.tsx`: `editBatch` state + `onEdit` threaded `StagePanel` -> `BatchRow`; Edit `RowAction` (Pencil) gated by `!readOnly && canTakeAction`; `<EditBatchDialog/>` rendered alongside the other stage dialogs.
- Client gate: typecheck 0 errors · 88 tests green (8 files); server unchanged this session.

### Roll progress tracking on required rolls (2026-10-19)
- Progress % and section-completion for Printing/Cutting/Packaging now target `requiredRolls`
  (falls back to `totalRolls` when required is 0). Over-production is allowed and clamped to
  100% on the bars; the section stays Complete once produced >= required. Server
  (`completionPct`/`progressTargetOf`, `stageCompletionPatch`, `deriveLineStatus`, overview builder,
  `isReadyForCompletion`) and client (`StageProgressBars`, `roll-columns`, `line-draft` patch)
  mirrors updated; assignment capacity/inventory counters remain on `totalRolls`. Woven untouched.
  Server 139/139, client 92/92, server build OK (bundle rebuilt).

## GitHub sync — two repos (2026-10-20)
Pushed the two packages as separate GitHub repositories, preserving each
repo's existing history as a fast-forward (no force, nothing lost on GitHub):
- Client -> https://github.com/AbdurrehmanARY/3Q-Dashbaord-Client main
  (0cdf79f -> 12acd8e, fast-forward) - content = monorepo client/ tree.
- Server -> https://github.com/AbdurrehmanARY/3Q-Dashbaord-Server main
  (e428327 -> f5222b9, fast-forward) - content = monorepo server/ tree.

Method: local monorepo was committed on chore/ci; each push used a git
commit-tree whose tree is the package subtree (HEAD:client / HEAD:server)
and whose parent is the target repo's current main, then git push <sha>:main.
Auth succeeded via a cached Windows Credential Manager entry for github.com
(no interactive prompt, no PAT).

Validation before push: client typecheck OK, server typecheck OK, client
tests 92/92, server tests 148/148, server build (api/index.js bundle) OK.

Local repo status: chore/ci is 3 commits ahead of original main (afb13d7
feat(client), eaaeae6 feat(server), 1a9098e chore(gui)). The monorepo
itself has no GitHub remote (only named client/server remotes to the two
package repos). Stray helper artifacts left untracked: temp_status.txt,
create_navigation.ps1, fix-block.py, fix_dialog.ps1, fix_dispatch_dialog.py,
and a misplaced root vite.config.ts.

Note: pushing triggers Vercel redeploy of client-jet-omega-25.vercel.app
and server-jade-gamma-86.vercel.app (both repos have the Vercel GitHub
integration).
## Vercel build fix (2026-10-20)
- Client build (tsc -b && vite build) failed on Vercel with TS18003: tsconfig.node.json included vite.config.ts but it had been removed. Restored client/vite.config.ts (proxy config) so tsc -b finds its input. Build now passes locally (~53s). Pushed updated client as a fast-forward.

## Plan & Reserve — visible validation for hidden required fields (2026-10-21)
- Symptom: user enters material (confirmed persisting via the Controller) but submit never fires — it was silently rejected by the row resolver with the error trapped inside a collapsed row.
- Root cause: `planLineSchema.labelSize` (`z.coerce.number().positive("Must be > 0")`) and `materialCode` (`.min(1)`) are unconditional on every printed row, but their inline errors render only inside the `isOpen` block; the closed-row summary never surfaced them, so the blank required field was invisible. There is no top-level per-row-error summary, so RHF's `handleSubmit` set `errors` and skipped the async callback — looking like "submit won't fire."
- Fix (`client/src/features/production-orders/components/PlanLabelTypeForm.tsx`, client-only):
  - added `isSubmitted` to `formState`;
  - added `hasRowErrors` boolean mirroring the file's existing `Array.isArray(errors.rows)` guard (avoids the TS2722 on `.some`);
  - added a top-level `<Warning>` above the buttons that appears after a failed submit ("Plan incomplete — expand the highlighted row…");
  - added a `useEffect` that auto-opens the first errored row after `isSubmitted && !isSubmitting`;
  - extended the closed-row summary to also show `Label Size (mm)` (`N mm` or `"Label size needed"`), so the blocker is visible without expanding.
- No schema/server change: `labelSize` is required-by-design (a real printed-label dimension; server twin `planLineSchema` enforces `.positive()`).
- Validation: client typecheck 0 errors · vitest 92/92 · `npm run build` OK (full Vite bundle).

## Woven make-up support — remove planning ceiling & surface required quantity (2026-10-27)
- **Server (`woven-production.service.ts`):** Removed the `plannedBySiblings + input.quantity > orderQty`
  ceiling check in `planLine()`. Woven label types may now be planned BEYOND the order's totalQty —
  this is the make-up path: after waste is recorded, the production manager re-plans the affected
  label type with an increased quantity so new weaving batches can replace lost pieces. A duplicate
  label-type name is still rejected. (The compiled `server/api/index.js` bundle needs `npm run build`
  to track this source change.)
- **Server (`batch-flow.service.ts`):** Set `required: Number(l.quantity)` for woven lines (was `0`).
  Makes the per-line target explicit instead of relying on the `required > 0 ? required : planned`
  fallback in `StageProgressBars`.
- **Client (`PlanLabelTypeForm.tsx`):** `blocked` now uses `(!isWoven && overAllocated)` so only the
  *printed* workflow keeps the hard ceiling. Woven still shows an informational Warning when total
  planned exceeds the order's unplanned remainder, but the submit button stays enabled for make-up.
  Ceiling label appends "(exceeds order total)" when over-allocated.
- **Client (`WovenProductionPanel.tsx`):** Added `quantityLabels` to the woven StageProgressBars
  so bars read "X produced / Y required pcs"; removed the `disabled={remainingQty <= 0}` gate on the
  "Add Label Type" button (woven has no hard ceiling now); added `ProductionCompletionReport` to the
  completed-production summary so the floor gets the order-wide issued/produced/waste breakdown
  alongside the per-stage audit cards.
- **Client (`BatchOutputDialog.tsx`):** Updated JSDoc to state waste is recordable at every stage
  (since 0027) and that recording waste does NOT create headroom — the user must re-plan the label
  type to add make-up capacity (matching `remainingPlannedTx` / `lineFlowOf` comments).
- **Verification:** static review confirms type-safety of every edit; `run_commands` tool unavailable
  in this session for `tsc --noEmit` / `vitest` / `npm run build` — run `verify-changes.bat` at repo
  root, or execute `cd server && npm run typecheck && npm test && npm run build` then
  `cd client && npm run typecheck && npm test`.

### Waste-deducted progress denominator (2026-10-27, continuation)

- **Server (`batch-flow.service.ts` `getOrderFlow`):** `required` is now `round2(Math.max(0, line.required - flow.wastedTotal))` — waste is deduced from the planned target so the denominator shrinks when waste is recorded and grows when make-up is planned. This applies to both woven (`line.required = quantity`) and printed (`line.required = requiredRolls`).
- **Server (`batch-flow.helpers.ts` `isReadyForCompletion`):** Removed `+ l.wastedTotal` from the left side — since `required` now already has waste subtracted, the check is simply `packagedProduced >= target`. Math is equivalent: old `packagedProduced + waste >= planned` equals new `packagedProduced >= planned - waste`.
- **Server (`woven-production.service.ts` `getOverview`):** Added per-line `wastedTotal` (sum of `wastedRolls` from live batches per line); updated `progressPct` and `isComplete` to use `quantity - wastedTotal` as the target. Order-level `totals.wastedTotal` added to `WovenOverview.totals`.
- **Client (`woven-types.ts`):** Added `wastedTotal: number` to `WovenLineOverview.weaving` and `WovenOverview.totals`.
- **Client (`StageProgressBars.tsx`):** Added `wastedTotal: number` to `StageTotals` interface (field was already in the API response).
- **Client (`WovenProductionPanel.tsx`):** Stat card now shows waste count in the description using `data.totals.wastedTotal`.
- **Tests (`batch-flow.helpers.test.ts`):** Updated `isReadyForCompletion` tests — "waste deducts from required target" replaces "counts waste toward completion"; completion test now expects false when a line hasn't met its waste-adjusted target and true when it has.

## CEO Dashboard + Work-Order Split (2026-10-28, completed)

### Migration 0029 — separate workflow tables
- **SQL** (`drizzle/0029_separate_workflow_tables.sql`): creates 4 new extension tables:
  `printed_label_work_orders`, `woven_label_work_orders` (with absorbed loom spec: design_code,
  pick, repeat, density, speed, extra, estimated_weaving_hours, size_labels; unique index on design_code),
  `printed_label_production_orders`, `woven_label_production_orders`. Backfills all existing rows
  by `product_type` via inner join to `work_orders`. Non-destructive — no existing tables dropped.
- **Journal**: registered `idx 29` in `drizzle/meta/_journal.json`.
- **Applied to live Supabase** (verified 2026-10-28): 30 migration rows in `__drizzle_migrations`.
  1 woven work order backfilled with loom spec; all FKs validated.
- **Idempotent**: backfill INSERTs filter by product_type; re-runnable.

### Server — CEO Dashboard Module
- **Routes** (`ceo-dashboard.routes.ts`): 6 GET-only endpoints — `roll-stock`, `thread-stock`,
  `work-orders`, `production`, `operators`, `machines`. No mutation handlers.
- **Controller** (`ceo-dashboard.controller.ts`): thin asyncHandler-wrapped methods, one service
  call each; response shaped server-side.
- **Service** (`ceo-dashboard.service.ts`): 6 read-only methods; operator/machine utilization
  computed via joins through `production_batches` -> `production_orders` to resolve `productionNumber`.
- **Repository** (`ceo-dashboard.repository.ts`): 6 query methods using Drizzle ORM; inner joins
  enforce product-type scoping.
- **App** (`app.ts`): mounted `@ceo` router + split work-order routers (`@work-orders/printed`,
  `@work-orders/woven`, `@production/printed`, `@production/woven`).

### Server — Split Work-Order Routes
- **Printed** (`work-orders/printed/`): repository (inner join to `printed_label_work_orders`,
  `product_type = 'printed'` filter), service (design-code uniqueness, `orderDate` required,
  `estimatedWeavingHours` excluded), controller (validation middleware), routes (CRUD + filters).
- **Woven** (`work-orders/woven/`): repository (inner join to `woven_label_work_orders`,
  `product_type = 'woven'` filter), service (design-code uniqueness, server-side
  `estimatedWeavingHours`), controller (validation middleware), routes (CRUD + filters).
- **Type fix**: `status` field in both repositories uses `WorkOrder['status']` (pgEnum union),
  not `string`; `WorkOrderRow` interface exported from printed repo for TS4053 fix.

### Server — Fixed `findLines` Bug
- **Before**: `woven-production-order.routes.ts` called `findLinesByOrder` which did not exist on
  `woven-production-order.repository.ts`.
- **Fix**: renamed `findLinesByOrder` -> `findLines` on both the repository method and the call site.

### Client — CEO Dashboard Feature
- **Service** (`ceo-dashboard-service.ts`): typed read-only API wrappers with
  `select: (res) => res.data` unwrap pattern.
- **Hooks** (`use-ceo-dashboard.ts`): 6 `useQuery`-only hooks with `CEO_DASHBOARD_KEYS` factory,
  60s `staleTime`, single-object argument syntax (v5 style).
- **Pages** (7 total): `CeoDashboardPage` (overview with stat cards) + 6 detail pages
  (`RollStockDashboardPage`, `ThreadStockDashboardPage`, `WorkOrdersDashboardPage`,
  `ProductionDashboardPage`, `OperatorsDashboardPage`, `MachinesDashboardPage`).
  Uses plain HTML tables (no shadcn/ui data-table — simpler for read-only).
- **Routes** (`app/routes.tsx`): 7 new routes under `/ceo/`.

### Client — Split Work-Order Modules
- **Printed** (`features/work-orders/printed/`): service, hooks (usePrintedWorkOrders,
  useCreatePrintedWorkOrder, useUpdatePrintedWorkOrder, useDeletePrintedWorkOrder),
  list page with filtering, `PrintedWorkOrderTable` (DataTable-based), `PrintedWorkOrderColumns`
  (printed-only columns — omits Type badge and Design Code), `PrintedWorkOrderDialog` (productType
  fixed to "printed", no WovenSpecification section, hideProductType selector), `PrintedWorkOrderRowActions`
  (view/edit/child-order/dispatch/delete/pin).
- **Woven** (`features/work-orders/woven/`): service, hooks (useWovenWorkOrders,
  useCreateWovenWorkOrder, useUpdateWovenWorkOrder, useDeleteWovenWorkOrder),
  list page with filtering, `WovenWorkOrderTable` (DataTable-based), `WovenWorkOrderColumns`
  (woven-only columns — surfaces Design Code prominently), `WovenWorkOrderDialog` (productType fixed
  to "woven", always shows WovenSpecification section), `WovenWorkOrderRowActions` (view/edit/child-order
  dispatch/delete/pin).
- Both dialogs support child-order creation (shortfall/recut/additional) with auto-suffixed SO numbers.
- Both use `useQuery` + `useMutation` with `invalidateQueries` + `toast`.
- `DataTableColumnHeaderProps` extended with optional `align` prop to support right-aligned headers.
- **Verification**: client typecheck 0 errors; client tests 92/92 passed.

### Client — Navigation
- **shared/navigation.ts**: Added CEO Dashboard nav entry; added Printed Labels and
  Woven Labels sub-items under Work Orders.

### Seeding
- **`seed-master-data.ts`** (new): Seeds ALL tables except work orders and production.
  Includes: materials, operators, machines, users, companies, brands,
  purchaseRecords, inventoryRolls, labelTypes, threadServiceProviders,
  threadStocks, threadPurchases, threadDyeingSends, threadDyeingAllocations,
  threadDyeingReceives, threadDyeBatches, stickerMaterials, localSheets,
  labelSheets, inkPurchases, inkConsumptions.
  Run via `npm run db:seed:master-data`. Idempotent upserts on natural keys.
- ✅ **Successfully executed against live database** (2026-11-05): all tables populated.
  Typecheck: 0 errors. Seeder exit code: 0.

### Verification
- **Server typecheck**: 0 errors
- **Client typecheck**: 0 errors
- **Server tests**: 10 files, 149 tests passed
- **Client tests**: 8 files, 92 tests passed
- **Server build**: tsup OK, server/api/index.js regenerated (552 KB)
- **Migration**: 0029 applied to live Supabase, 4 tables created, data backfilled, FKs validated

### Client — Workflow-specific Production Order Pages, Tables, Columns, Hooks, Services (2026-10-29)
- **Printed** (`features/production-orders/printed/`): service (`printed-production-order-service.ts`,
  list/get/remove delegating delete to `/production-orders/:id`), hooks (`use-printed-production-orders.ts`
  with `PRINTED_PRODUCTION_ORDER_KEYS` factory, `usePrintedProductionOrders`, `usePrintedProductionOrderDetail`,
  `useDeletePrintedProductionOrder`), columns (`printedProductionOrderColumns` omitting Production Type
  badge and Est. Weaving Time columns), row actions (view/edit/delete with confirmation dialog),
  table component (`PrintedProductionOrderTable` with DataTable, toolbar filters for status/priority,
  export columns, proper `DataTableEmpty` states), list page (`PrintedProductionOrderListPage`).
- **Woven** (`features/production-orders/woven/`): service (`woven-production-order-service.ts`), hooks
  (`use-woven-production-orders.ts` with `WOVEN_PRODUCTION_ORDER_KEYS`, woven equivalents), columns
  (`wovenProductionOrderColumns` including Est. Weaving Time prominently), row actions, table component
  (`WovenProductionOrderTable` with same structure as printed but woven-specific), list page
  (`WovenProductionOrderListPage`).
- **Shared** modifications: `CreateProductionOrderDialog` gained `productTypeFilter` prop to narrow the
  eligible-sales-orders list to printed/woven only; `DataTableColumnHeader` confirmed to support `align`
  prop via the column definitions.
- **Routes** (`app/routes.tsx`): added `/production-orders/printed` and `/production-orders/woven`
  routes before the generic `/production-orders/:id` catch-all.
- **Navigation** (`shared/navigation.ts`): expanded "Production Orders" with "Printed Labels" and
  "Woven Labels" sub-items.
- **Gate**: client typecheck 0 errors.

### Client — Dashboard Production Order Planning Routes (2026-11-05)
- Added missing dashboard planning routes to `app/routes.tsx`:
  - `/dashboard/production-orders/printed/:id/plan` → `ProductionOrderPlanningPage`
  - `/dashboard/production-orders/woven/:id/plan` → `ProductionOrderPlanningPage`
- These connect the `CreateProductionOrderDialog` post-creation navigation
  (`/dashboard/production-orders/printed/:id/plan` and `/dashboard/production-orders/woven/:id/plan`)
  to the existing `ProductionOrderPlanningPage` component, which uses `UnifiedPlanningDialog`
  and handles both printed and woven workflows based on the order's `productType`.
- Non-dashboard equivalents (`/production-orders/printed/:id/plan`, `/production-orders/woven/:id/plan`)
  already existed.
- **Verification**: client typecheck 0 errors; client tests 92/92 passed.

### Client — CEO Dashboard Tabbed Navigation (2026-11-05)
- Replaced single-view CEO pages with tabbed pages that render both Printed and Woven views:
  - Created `CeoWorkOrdersDashboardPage.tsx` — tabs for Printed/Woven Work Orders at `/dashboard/ceo/work-orders/{printed,woven}`
  - Created `CeoProductionDashboardPage.tsx` — tabs for Printed/Woven Production at `/dashboard/ceo/production/{printed,woven}`
  - Updated `app/routes.tsx`: CEO routes now point to the tabbed pages (each URL handled by same page via `useLocation`)
  - Sidebar navigation already had nested CEO items; tabs now render within each page to switch between views
  - Each tab has its own URL — refresh/deep-links preserve the selected tab
- **Verification**: client typecheck 0 errors; client tests 92/92 passed; client build OK
