# Migration reconciliation plan — fresh-DB provisioning

*Drafted 2026-09-26 from live-DB verification (`server/scripts/verify-batch-constraints.mjs`,
`server/scripts/reconcile-migrations.mjs` dry-run) and a migration-file audit. **Phases 1, 2 and 4
were executed 2026-09-28** (journal repaired; baseline provisioning implemented and validated
end-to-end on a scratch database). **Phase 3 / Step 0 remains an open product decision.***

## TL;DR
- Live DB and the migration chain disagree in three independent ways: a **lost journal entry**
  (0019), an **unapplied-but-recorded** migration (0023), and **live objects no migration ever
  created** (`production_order_id`, `first_stage_one_line`, `order_stage_no_uq`, …).
- `drizzle-kit migrate` from an empty database **fails first at 0018** and could not reproduce
  live even if it didn't.
- Recommended path: repair the journal (safe immediately), then provision fresh databases from a
  **pg_dump baseline of live + "mark all applied"** instead of replaying 0000–0024.
  ✅ **Done 2026-09-28** — see "What was executed" below.
- **Step 0 is a product decision**: keep cutting/packaging ORDER-scoped (recommended — live, code
  and tests already agree) or move to LINE-scoped (needs a data migration + code rewrite).

## Verified findings

### F1 — live is ORDER-scoped (verified 2026-09-26)
`production_batches` on the live DB carries:
- CHECK `production_batches_first_stage_one_line` — first stages need exactly one line column
  NON-NULL; cutting/packaging need **both** NULL (exact DDL in the Appendix);
- **no** `production_batches_one_line` constraint at all;
- unique index `production_batches_order_stage_no_uq` (partial on cutting/packaging);
- `production_order_id integer NOT NULL` + FK `production_batches_order_fk` + unique
  `production_batches_id_order_uq (id, production_order_id)`.

### F2 — journal / tracker state
- `server/drizzle/`: **25 SQL files** (0000–0024); `_journal.json` has **24 entries — idx 19 is
  missing** (`0019_batch_flow_sync.sql` and `meta/0019_snapshot.json` exist on disk; snapshots
  stop at 0019 — there are no 0018/0020+ snapshots).
- Live `drizzle.__drizzle_migrations`: **25 rows**; every journal entry IS recorded (idx 22/23 =
  `pre-applied:*` placeholder hashes written by `reconcile-migrations.mjs --write`; 0024 has its
  real hash `f1bd6aff…`). **One orphan row**: `created_at = 1786533923814` — that is 0019's
  genuine application, whose journal entry was later lost.
- `reconcile-migrations.mjs` (dry-run) prints `journal entries NOT recorded in DB:` → empty.
  The live tracker is healthy; the gap is only in the repo's journal.

### F3 — fresh replay fails (the chain is not runnable end-to-end)
1. **0018 is the first failure**: it does `ALTER TABLE "production_batches" …` (line 29), but the
   only `CREATE TABLE production_batches` in the whole chain is 0019 — which is *not in the
   journal*, so a fresh DB never gets the table.
2. **Journaling 0019 as-is does not fix it.** 0018 runs before 0019 (idx order) and still fails;
   and the two files are mutually redundant anyway: 0019's full CREATE already contains 0018's
   columns/constraints (`batch_code`, `produced_rolls`, `line_stage_no_uq`, …), so whichever runs
   second dies on "already exists"; 0019's plain `CREATE TABLE batch_consumptions` also collides
   with 0018's `CREATE TABLE IF NOT EXISTS batch_consumptions`.
3. **Even past 0019, 0021 + 0023 diverge**: 0021 adds `production_batches_one_line` (live does
   not have it) and 0023 *adds the same name again* → duplicate-object error on any fresh
   replay; 0023 also drops `production_batches_first_stage_one_line` and
   `production_batches_order_stage_no_uq`, which **no migration ever creates**.
4. Conclusion: live was shaped by the early migrations **plus** out-of-band DDL (likely a
   `drizzle-kit push` from `schema.ts` at some point, plus hand-written constraints). The chain
   can never reproduce live by patching 0018/0019 alone.

### F4 — live objects no migration creates
`production_batches.production_order_id` (+ FK `production_batches_order_fk`, unique
`production_batches_id_order_uq`), `production_batches_first_stage_one_line`,
`production_batches_order_stage_no_uq`, `production_batches_printed_no_uq`,
`production_batches_woven_no_uq`, `production_batches_woven_line_stage_no_uq` — grep across
`server/drizzle/*.sql` finds none of these being created. Conversely, 0018's
`production_batches_line_stage_no_uq` and 0019's `production_batches_id_line_stage_uq` do **not**
exist on live.

### F5 — `schema.ts` still disagrees with live
`server/src/shared/db/tables/production-batches.table.ts`:
- still declares check `production_batches_one_line` (`num_nonnulls(...) = 1` for **every**
  stage) — live lacks it, and enabling it would *reject every live cutting/packaging batch*;
- does **not** declare `production_batches_first_stage_one_line` or
  `production_batches_order_stage_no_uq`.

→ `drizzle-kit push` against live today would try to ADD `one_line` (would fail on existing
rows) and DROP the two live objects. Fix this (Phase 3) **before anyone runs push/generate**.

## The plan

### Step 0 — product decision (blocker)
- **Option A (recommended): keep ORDER-scoped.** Live DB, repository/service/tests and the
  running system all agree today; the work shrinks to making the repo files tell the truth.
- **Option B: move to LINE-scoped.** Requires a *new forward* migration (0025) with a data
  backfill — existing line-less cutting/packaging batches span label types, so assigning each
  one line is a real business mapping — plus rewrites of repository/service/tests and of the
  schema check. Migration 0023 stays obsolete either way (its content was never executed).

### Phase 1 — journal repair — ✅ EXECUTED 2026-09-28
1. Inserted into `server/drizzle/meta/_journal.json` between idx 18 and idx 20:
   ```json
   { "idx": 19, "version": "7", "when": 1786533923814, "tag": "0019_batch_flow_sync", "breakpoints": true }
   ```
   `when` is `1786533923814` (the orphan row's `created_at`) so drizzle/reconcile match it as
   already-applied on live. Journal is now a complete 0–24 sequence with strictly increasing
   `when`, and the diff is exactly this one 7-line insertion.
2. JSON parses: `node -e "JSON.parse(...)"` → OK.
3. `reconcile-migrations.mjs` dry-run against live → missing list empty; `drizzle-kit migrate` on
   live → **nothing to do** (exit 0).
4. Live was never at risk: recorded entries are skipped by `when`, and drizzle does not re-verify
   hashes (proven — 0024 applied after placeholder hashes were inserted).

### Phase 2 — fresh provisioning = baseline, not replay — ✅ EXECUTED 2026-09-28
1. Baseline captured from live (read-only) to `server/scripts/baseline/live-schema.sql`
   (kept **outside** `server/drizzle/` so drizzle-kit never mistakes it for a migration).
   Handled by **`server/scripts/dump-baseline.mjs`** (`npm run db:baseline`), which finds `pg_dump`
   even when it is off PATH, runs `--schema-only --no-owner --no-privileges -n public`, and patches
   `CREATE SCHEMA public;` → `CREATE SCHEMA IF NOT EXISTS public;`.
   Counts: **34 tables · 17 enums · 81 indexes · 104 named constraints**, zero GRANT/RLS cruft.
2. `reconcile-migrations.mjs` gained **`--fresh`**: after the baseline is applied to an empty DB it
   inserts **all 25** journal `when`s with `baseline:<tag>` placeholder hashes (including the idx-19
   timestamp from Phase 1). It **refuses** when the tracker already holds rows (exit 1) unless
   `--force`, so it cannot be run against live by accident. `--write` remains the live-DB path.
3. Procedure documented (`server/scripts/baseline/README.md`, `.clinerules` §5):
   *fresh DB = apply baseline → `reconcile-migrations --fresh` → `drizzle-kit migrate`*.
   Replay of 0000–0024 is an **audit path only**, never the provisioning path.
4. Optional hardening (IF NOT EXISTS guards in 0019) — **not done and no longer needed**: replay is
   abandoned as a provisioning strategy.

**Guard added after a real near-miss:** Node's `--env-file` does **not** override a pre-existing
environment variable, so a stale `DIRECT_URL` in the shell silently redirected a dump at the wrong
database and briefly overwrote the baseline. `dump-baseline.mjs` now resolves the target URL and
**refuses** unless it equals `server/.env`'s `DIRECT_URL` (override with `--force`). Verified: a
stale `DIRECT_URL` → `exit 1` with a message naming both URLs.

### Phase 3 — make the repo files tell the truth — ⏸ NOT STARTED (blocked on Step 0; needs explicit go-ahead)
**If Option A (keep order-scoped):**
1. `production-batches.table.ts`: replace the stale `production_batches_one_line` check with
   `production_batches_first_stage_one_line` using the exact live definition, and declare
   `production_batches_order_stage_no_uq` (DDL in the Appendix).
2. Rewrite `0023_revert_cutting_packaging_line_scope.sql` as a documented no-op — its SQL never
   ran anywhere; keep the journal entry so live never re-runs it, and a comment-only file makes
   an accidental manual run harmless.
3. Run `drizzle-kit generate` and review the delta against snapshot 0019: expect noise (0020–0024
   have no snapshots). Keep only a delta that `pg_dump`-diffs clean against live; regenerate
   snapshots as needed.
4. Housekeeping candidate: `production_batches_woven_no_uq` and
   `production_batches_woven_line_stage_no_uq` are index duplicates (identical columns + WHERE) —
   decide which name `schema.ts` should own and drop the other on live.

**If Option B (line-scoped):** write 0025 (data backfill + swap `first_stage_one_line` →
`one_line` + drop `order_stage_no_uq`), update the schema check/indexes and all batch
code/tests, and still rewrite 0023 as obsolete (Phase 3.2).

### Phase 4 — validation checklist — ✅ EXECUTED 2026-09-28 (scratch DB `q3_provision_scratch`, local PG 18.3)
1. ✅ Empty scratch DB: baseline applied clean (34 tables / 17 enums / 81 indexes; 404 constraints
   on PG18 vs 113 on live = PG18 stores NOT NULL in `pg_constraint`, otherwise type-for-type
   identical) → `--fresh` recorded all 25 entries → `drizzle-kit migrate` → **nothing to apply**
   (exit 0).
2. ✅ `pg_dump --schema-only` scratch vs live → identical modulo pg_dump nonce/banner lines.
3. ✅ **Future-migration probe**: a throwaway `0025_tmp_provision_probe.sql` applied **only that
   migration** (tracker 25 → 26, probe table created) — proving genuinely-new migrations still
   flow through a baseline-provisioned DB. Probe artifacts reverted; journal restored to the single
   idx-19 insertion.
4. ✅ Safety guard: `reconcile-migrations.mjs --fresh` against live → `exit 1`, live untouched.
5. ✅ Server suite green after the script changes (`typecheck` 0 / `test` 120 / `build` OK).

## Where things stand (2026-09-28)

| Phase | Status |
|---|---|
| 1 — journal repair (idx 19) | ✅ executed, committed |
| 2 — baseline + `--fresh` provisioning | ✅ executed, committed |
| 3 — `schema.ts` / 0023 reconciliation (D4) | ⏸ decision-gated on Step 0 — **not started** |
| 4 — scratch-DB validation | ✅ executed, evidence above |

Provisioning a new database today (from `server/`):

```bash
npm run db:baseline                                                   # refresh from live
psql "$SCRATCH_URL" -f scripts/baseline/live-schema.sql               # apply to empty DB
node --env-file <scratch.env> scripts/reconcile-migrations.mjs --fresh  # mark all applied
npx drizzle-kit migrate                                               # only genuinely-new ones
```

## Appendix — exact live DDL targets (captured 2026-09-26)

```sql
-- CHECK (pg_get_constraintdef):
ALTER TABLE public.production_batches ADD CONSTRAINT production_batches_first_stage_one_line
  CHECK (((stage = ANY (ARRAY['weaving'::production_batch_stage, 'printing'::production_batch_stage]))
          AND (num_nonnulls(production_order_line_id, woven_production_line_id) = 1))
      OR ((stage = ANY (ARRAY['cutting'::production_batch_stage, 'packaging'::production_batch_stage]))
          AND (num_nonnulls(production_order_line_id, woven_production_line_id) = 0)));

CREATE UNIQUE INDEX production_batches_order_stage_no_uq ON public.production_batches USING btree (production_order_id, stage, batch_number) WHERE (stage = ANY (ARRAY['cutting'::production_batch_stage, 'packaging'::production_batch_stage]));
CREATE UNIQUE INDEX production_batches_printed_no_uq ON public.production_batches USING btree (production_order_line_id, stage, batch_number) WHERE (production_order_line_id IS NOT NULL);
CREATE UNIQUE INDEX production_batches_woven_no_uq ON public.production_batches USING btree (woven_production_line_id, stage, batch_number) WHERE (woven_production_line_id IS NOT NULL);
CREATE UNIQUE INDEX production_batches_woven_line_stage_no_uq ON public.production_batches USING btree (woven_production_line_id, stage, batch_number) WHERE (woven_production_line_id IS NOT NULL);
```

Evidence commands (all read-only): `node --env-file server/.env server/scripts/verify-batch-constraints.mjs`,
`node --env-file server/.env server/scripts/reconcile-migrations.mjs`, and `pg_indexes` /
`pg_get_constraintdef` one-liners run via `node --input-type=module -e` against `DIRECT_URL`.


