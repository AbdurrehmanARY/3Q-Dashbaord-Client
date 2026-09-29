# Implementation — Cutting/Packaging Batches Are Invisible to the Dashboard

**Affects:** `server/` + `client/` (read paths only — no schema change)
**Status:** Diagnosis complete and reproduced against the live database (2026-09-26). **No code changed yet.**
**Repro order:** production order `22` (woven) · batches `C-001` (id 47), `C-002` (id 48)
**Baseline:** `chore/ci` @ `748f587`, working tree has `client/.../BatchStageBoard.tsx` modified (uncommitted)

---

## 1. TL;DR

An operator creates a cutting batch. The toast says `C-001 created`, the row is really in the
database, the consumption edges really exist — and the Cutting panel still says
*"No cutting batches yet."* with `Cut 0`.

The cause is **not** creation, validation, caching or invalidation. It is three independent
defects, all on the **read** path of the order-scoped stages (cutting, packaging):

| # | Defect | Where | Effect |
|---|---|---|---|
| **R1** | The client asks a **line-scoped** question for an **order-scoped** stage | `BatchStageBoard.tsx:193` → `GET /production/cutting-batches/lines/{lineId}` | `WHERE woven_production_line_id = 15` never matches a NULL column → always `[]` |
| **R2** | `findByOrder` **INNER JOINs** the line table, so line-less rows are dropped | `batch-flow.repository.ts:258-261, 273-276` | The order-scoped endpoint (`GET /production/orders/:id/batches`) is empty **too** — therefore **no client-only fix exists** |
| **R3** | `getOrderFlow` builds each label type's cut/packaging figures from **line-owned** batches only | `batch-flow.service.ts:179-202` | `cutProduced`, `cutAvailable`, `packagedProduced`, `packagedLabels`, `batchCounts.cutting/packaging` are pinned at **0**, `readyForCompletion` can never become true |

R3 is the subtle one: the correct per-label-type attribution **already exists and is already
written** by the mutation path (`lineMixCte` → `attributedForLine` → `flowInTx` →
`resyncLineTx`). Only the read path ignores it. That is why the backend "looks correct" while
the screen is wrong.

**Nothing about the write path is broken**, and **no migration is required**: cutting and
packaging are order-scoped on the live database by design, and the fix must follow that, not
fight it (see `memory-bank/migration-reconciliation.md`).

---

## 2. Symptom and reproduction

1. Open production order `22` (woven) → **Production Batches** section.
2. Under the Size Label board, create a **Cutting** batch (`C-001`) drawing on `W-001`.
3. Toast: `C-001 created`. The panel keeps rendering *"No cutting batches yet."*
4. Repeat → `C-002 created`, still invisible. Cutting header figures stay `Cut 0`.
5. `GET /api/production/cutting-batches/47` returns the batch fine (200) — the row is healthy.

---

## 3. Evidence (read-only, reproducible)

### 3.1 Live schema invariant

`node scripts/verify-batch-constraints.mjs` (run from `server/`; the script loads `server/.env`
itself and is strictly read-only) reports the live CHECK — the **order-scoped** variant — plus the
per-stage line census:

```sql
CHECK (((stage IN ('weaving','printing'))  AND num_nonnulls(production_order_line_id, woven_production_line_id) = 1)
    OR ((stage IN ('cutting','packaging')) AND num_nonnulls(production_order_line_id, woven_production_line_id) = 0))
```

and the live row census: `weaving 1 (0 line-less) · printing 2 (0 line-less) · cutting 2 (2 line-less)`.

### 3.2 Raw rows

`C-001`/`C-002` exist on order `22` with **both** line columns NULL. The weaving batch `W-001`
(id 46) carries `woven_production_line_id = 15`. Lineage is intact:

```
batch_consumptions → 47: 46(weaving) → 47(cutting), 12000.00 pcs
batch_consumptions → 48: 46(weaving) → 48(cutting), 10000.00 pcs
```

### 3.3 Endpoint predicates, emulated in SQL against the live DB

| Emulated query | Result | Meaning |
|---|---|---|
| `findByLine(woven 15, 'weaving')` → `WHERE woven_production_line_id = 15 AND stage='weaving'` | **1** | First stages work — W-001 renders fine |
| `findByLine(woven 15, 'cutting')` → `WHERE woven_production_line_id = 15 AND stage='cutting'` | **0** | **R1**: what the Cutting panel actually asks for |
| `findByOrder(22,'woven','cutting')` → INNER JOIN `woven_production_lines` | **0** | **R2**: the order-scoped endpoint is empty as well |
| `WHERE production_order_id = 22 AND stage='cutting'` | **2** | The rows are there; only the joins/predicates hide them |

Command used (from `server/`, quoting trimmed for PowerShell):

```
node --env-file .env --input-type=module -e "…select count(*) … where woven_production_line_id = 15 and stage = 'cutting'…"
```

---

## 4. Root cause chain

### R1 — the client asks a line-scoped question for an order-scoped stage

`client/src/features/production-orders/components/BatchStageBoard.tsx:193`

```ts
const batches = useLineBatches(stage, flow.lineId);
```

`StagePanel` renders every stage of `flow.stages` (`BatchStageBoard.tsx:134-145`), so cutting and
packaging — which have no line — are listed through the **line** endpoint:
`useLineBatches` → `batchService.listByLine` → `GET /production/{stage}-batches/lines/{lineId}`
(`use-batches.ts:49-56`, `batch-service.ts:24-25`, `batch-flow.routes.ts:39`).

Server side, that becomes `findByLine` (`batch-flow.repository.ts:233-246`):

```ts
const conditions = [eq(lineColumn(line.kind), line.id)];
```

with `lineColumn = kind === "woven" ? productionBatches.wovenProductionLineId : productionBatches.productionOrderLineId`
(`batch-flow.repository.ts:109-110`). For cutting/packaging that column is **NULL**, and
`NULL = 15` is never true. The list is empty by construction — at every stage of every order,
for every user, forever.

### R2 — the order-scoped read drops line-less rows (which is why a client-only fix cannot work)

`batch-flow.repository.ts:249-284` — both branches INNER JOIN the line table **on the line
column**, so a batch whose line column is NULL cannot survive the join:

```ts
const conditions = [eq(wovenProductionLines.productionOrderId, productionOrderId)];
if (stage) conditions.push(eq(productionBatches.stage, stage));
return db
  .select({ ...batchSelect, labelType: wovenProductionLines.labelType })
  .from(productionBatches)
  .innerJoin(                          // ← INNER: NULL line ⇒ row dropped
    wovenProductionLines,
    eq(productionBatches.wovenProductionLineId, wovenProductionLines.id)
  )
```

The endpoint that would have served it already exists — `GET /production/orders/:id/batches`
(`batch-flow.routes.ts:74-79`), `getOrderBatches` (`batch-flow.service.ts:121-127`),
`batchService.listByOrder` (`batch-service.ts:48-49`) — and it answers `[]` for cutting and
packaging. Emulated as query **C** above: **0 rows**.

The matching client hook is already written and **currently dead code**: `useOrderBatches`
(`use-batches.ts:90-97`) has no consumer and is not even re-exported (`index.ts:11` exports only
`useOrderFlow, useLineBatches`). So the "obvious" client fix — reach for the order hook — still
renders an empty panel. **A server change is unavoidable.**

### R3 — the flow the UI reads is line-scoped, so every cut/packaging figure is pinned at 0

`batch-flow.service.ts:179-202`:

```ts
const perLine = rawLines.map((line) => {
  const own = batches.filter((b) =>
    kind === "woven" ? b.wovenProductionLineId === line.id : b.productionOrderLineId === line.id
  );
  const flow = lineFlowOf(line.planned, own, kind, line.sizes);
  const count = (stage: BatchStage) =>
    own.filter((b) => b.stage === stage && b.status !== "CANCELLED").length;
```

`batches` comes from `findByOrder` (line 157), so `own` can only ever contain line-attached
rows. Line-less cutting/packaging batches are excluded twice over, and their figures are then
summed to zero for every label type and for the whole order:

| Figure | Consumed at | Result today |
|---|---|---|
| `flow.cutProduced` | `BatchStageBoard.tsx:209` (`"Cut"`) | `0` |
| `flow.cutAvailable` | `BatchStageBoard.tsx:204` (packaging intake) | `0` |
| `flow.packagedProduced` | `BatchStageBoard.tsx:109` (`donePct`), `:210` | `0%`, `0` |
| `totals.cutProduced/packagedProduced` | `StageProgressBars.tsx:96-97` | `0%` on both bars |
| `batchCounts.cutting/packaging` | `batch-types.ts:162` | `0` |
| `running` | `batch-flow.service.ts:200` | never lists a running cutting batch |
| `readyForCompletion` | `batch-flow.service.ts:233` → `helpers.ts:306-309`; banners `ProductionOrderDashboardPage.tsx:371`, `WorkOrderDetailPage.tsx:391` | **never true** |

`isReadyForCompletion` only needs `packagedProduced >= planned` per label type
(`batch-flow.helpers.ts:306-309`), so while R3 stands **no order can ever show "ready to
complete"** from the batch board — packaging work cannot move the number.

The correct per-label-type attribution **already exists**, is **already written**, and is simply
never read by the endpoint the dashboard uses:

- `lineMixCte` / `attributedForLine(orderId, lineId)` — `batch-flow.repository.ts:169-228`
  (pro-rata weight = the label type's share of a batch's input);
- `flowInTx` — `batch-flow.repository.ts:1443-1508` ("its own first-stage batches, plus its
  **attributed share** of the order's cutting and packaging");
- consumed by the write side (`logStageTx` `:1418-1441`, `resyncLineTx`) so the stored line
  counters move correctly.

That asymmetry — write side attributed, read side line-scoped — is exactly why the database and
the dashboard disagree.

### The write path is correct (do not "fix" it)

`batch-flow.service.ts:414-421` is deliberate:

```ts
line: isFirstStage(line.kind, stage) ? line : null,
```

with `scopeValues` writing both columns NULL (`batch-flow.repository.ts:162-167`), matching the
live CHECK. The regression is already pinned by tests — *"The regression: this used to call
`lineRefOfBatch(cutting)` -> `NotFoundError`, so the create/update/start/output/complete/cancel
routes all answered 404 even though the DB write had committed"*
(`batch-flow.service.test.ts:99-110`, plus the order-scoped source test at `:113+`).

### Invalidation is correct (this rules out the caching hypothesis)

`use-batches.ts:29-45` invalidates `BATCH_KEYS.all` (`['batches']`) plus `['production-orders']`
and the order-flow key. The panel therefore **does** refetch after creating `C-001` — into a
permanently empty result. No cache key, `staleTime` or prefix is at fault.

### Second-order symptom: packaging cannot be created at all

`getAvailableSources` (`batch-flow.service.ts:241-299`) picks its upstream per stage (`:263`:
`stage === "cutting" ? STAGES_OF[line.kind][0] : "cutting"`):

- `stage='cutting'` → upstream is the **first stage**, whose batches are line-attached → the
  picker works (which is why cutting batches could be created in the first place);
- `stage='packaging'` → upstream is `'cutting'` → `findByOrder(..., 'cutting')` → **0 rows** by
  R2 → *"No cut available"* → **a packaging batch can never be created from the UI**.

So the failure is not "one panel shows nothing": cutting is *creatable but invisible*, packaging
is *not creatable at all*.

### Comment/schema drift from the same episode (must be corrected with the fix)

The line-scoped model that migration 0023 *recorded as applied but never executed*
(`memory-bank/migration-reconciliation.md`) is still described as fact in nearby comments — which
is exactly what makes the next reader "fix" the client instead of the server:

| Location | Stale claim |
|---|---|
| `batch-flow.repository.ts:118-135` | *"Every batch hangs off exactly one line — the `production_batches_one_line` check (`num_nonnulls(...) = 1`) makes that a hard DB guarantee. Cutting and packaging carry a line just like the first stage, so `line` is always present for every batch at every stage."* — contradicted 30 lines later by `BatchScope.line` (`:154-159`) and `scopeValues` (`:162-167`) |
| `batch-flow.helpers.ts:17` | *"A batch always hangs off exactly one line, of one kind."* |
| `batch-flow.repository.ts:137-147` | `lineRefOfBatch` throws *"Batch is not attached to a production line"* and is still documented as a guarantee; the code actually uses the `OrNull` variant (`:840`) |
| constraint naming | `batch-flow.service.ts:133` names `production_batches_first_stage_one_line` (the live one); `batch-flow.repository.ts:121,132` name `production_batches_one_line` (the never-executed variant) |

---

## 5. Impact inventory

| Surface | Status today |
|---|---|
| Cutting panel — batch list (woven **and** printed orders) | always empty (R1) |
| Packaging panel — batch list | always empty (R1) |
| Cutting panel — `Cut`, `Cut available` | `0` (R3) |
| Packaging panel — `Cut available`, `Packaged` | `0` (R3) |
| Board header — `N% packaged` | `0%` (R3) |
| `StageProgressBars` — cutting + packaging bars | `0%` (R3) |
| `batchCounts`, `running` in the flow payload | `0` / `[]` (R3) |
| `readyForCompletion` banner (dashboard + `WorkOrderDetailPage`) | unreachable (R3) |
| Packaging batch creation (source picker) | impossible — "No cut available" (R2) |
| Panel header count badge (`liveCount`) | `0` — derived from the empty list (`BatchStageBoard.tsx:215,230-234`) |
| Batch CRUD by direct URL (`GET /cutting-batches/47`, output, complete, cancel) | **works** — only listing and figures are broken |
| Integrity of the two live batches | intact — edges verified (§3.2) |

---

## 6. What is *not* the cause

| Hypothesis | Verdict |
|---|---|
| Creation/validation rejected or rolled back | ❌ Rows exist; `GET /cutting-batches/47` → 200 |
| The toast lies | ❌ It fires only after the mutation resolves (`use-batches.ts:37-42`) |
| React Query cache / `staleTime` / invalidation | ❌ Prefix invalidation is correct and refetches into a structurally empty query |
| `flow.stages` omits cutting | ❌ `flow.stages` is `['weaving','cutting','packaging']` (`helpers.ts:25-28`) |
| Create route mis-resolves the order | ❌ `createBatch` derives `orderId` from the line, then intentionally drops the line (`service.ts:409-421`) |
| Missing migration / wrong CHECK | ❌ The live CHECK is the order-scoped variant and both rows satisfy it (§3.1) |
| RLS / permissions / auth | ❌ No auth or RLS exists in this codebase (`.clinerules` §4) |
| Deployed-vs-local difference | ⚠️ Not needed to explain it — the failure reproduces on live-DB predicates — but end-to-end HTTP against the deployed API is still unverified (§9.4) |

---

## 7. Fix plan

**Naming (not to be confused with batch codes `C-001`/`C-002`):** `S1–S4` are server edits, `C1–C3`
are client edits, `T1–T5` are tests, `R1–R3` are root causes, `D1–D5` are decisions. Each `S`/`C`
names the defect it closes.

Three server edits (S1–S3) make the order-scoped truth readable; three client edits (C1–C3) point
each panel at the right question and describe it honestly. No migration, no schema change, and no
change to any write path.

### S1 — `findByOrder`: stop dropping line-less rows *(fixes R2)*

`batch-flow.repository.ts:249-284`. Anchor the query on `production_batches.production_order_id`
(always set by `scopeValues`, `:162-167`, for every stage) instead of on the joined line, and
LEFT JOIN both line tables so `labelType` resolves for line-attached rows and stays NULL for
order-scoped ones.

```ts
async findByOrder(productionOrderId: number, kind: LineKind = "printed", stage?: BatchStage) {
  const conditions = [
    eq(productionBatches.productionOrderId, productionOrderId),
    // Workflow filter replaces the old line-join filter: a printed order carries no weaving rows.
    inArray(productionBatches.stage, STAGES_OF[kind] as BatchStage[]),
  ];
  if (stage) conditions.push(eq(productionBatches.stage, stage));

  const rows = await db
    .select({
      ...batchSelect,
      labelType: sql<
        string | null
      >`COALESCE(${productionOrderLines.labelType}, ${wovenProductionLines.labelType})`,
    })
    .from(productionBatches)
    .leftJoin(productionOrderLines, eq(productionBatches.productionOrderLineId, productionOrderLines.id))
    .leftJoin(wovenProductionLines, eq(productionBatches.wovenProductionLineId, wovenProductionLines.id))
    .leftJoin(machines, eq(productionBatches.machineId, machines.id))
    .leftJoin(operators, eq(productionBatches.operatorId, operators.id))
    .where(and(...conditions))
    .orderBy(desc(productionBatches.createdAt));

  return this.attachSources(rows);
}
```

**Trap to avoid:** leaving `eq(wovenProductionLines.productionOrderId, …)` in the `WHERE` clause
would silently degrade the LEFT JOIN back into an INNER JOIN — the NULL-line rows fail that
predicate — and the bug would survive the "fix". The order predicate belongs on
`production_batches.production_order_id`, exactly as `findById` (`:286-307`) already does for
these rows.

**Type ripple:** `labelType` widens from `string` to `string | null`. That is honest — an
order-scoped batch serves *many* label types. The only client consumer of this endpoint
(`useOrderBatches`) is dead code, so the ripple is a typecheck fix plus S2.

### S2 — expose the attribution the panel needs *(additive field)*

A panel showing an order-wide cutting batch must be able to say *what fed it*; otherwise `C-001`
appearing unchanged in three label-type boards looks like a bug. Reuse the existing `lineMixCte`
(`:169-228`) through an order-level read and attach `labelMix` to order-scoped rows:

```ts
/** Which label types fed each order-scoped batch, and by how much. */
async labelMixForOrder(orderId: number) {
  const rows = (await db.execute(sql`
    WITH ${mixCteSql}                        -- the same CTE lineMixCte already builds
    SELECT b.id AS batch_id, m.line_id, m.rolls, b.assigned_rolls
    FROM production_batches b
    JOIN mix m ON m.batch_id = b.id
    WHERE b.production_order_id = ${orderId}
    ORDER BY b.id, m.line_id
  `)) as unknown as Array<{ batch_id: number; line_id: number; rolls: string; assigned_rolls: string }>;
  …
}
```

Attach as `labelMix: [{ lineId, labelType, rolls, share }]` (`share = rolls / assignedRolls`,
clamped to `[0,1]`, rounded to 4 dp) on rows whose stage is not a first stage, and `[]` for
first-stage rows. This is the same weight `flowInTx` uses, so chips and counters cannot disagree.

### S3 — `getOrderFlow`: read the attributed figures *(fixes R3)*

`batch-flow.service.ts:179-202`. Keep `lineFlowOf` for the first stage (its own batches — correct
and cheap), then **overlay** the attributed cut/packaging figures, and derive `batchCounts` /
`running` from the union of line-owned and attributed rows:

```ts
const perLine = await Promise.all(
  rawLines.map(async (line) => {
    const own = batches.filter((b) => lineOfBatch(b) === line.id);
    const ownFirst = own.filter((b) => b.stage === stages[0]);
    const flow = lineFlowOf(line.planned, ownFirst, kind, line.sizes);
    const attr = await batchFlowRepository.attributedForLine(Number(orderId), line.id);
    const running = own.filter((b) => b.status === "IN_PROGRESS").map((b) => b.batchCode);
    return {
      lineId: line.id, labelType: line.labelType, quantity: line.quantity,
      materialCode: line.materialCode, kind, unit: UNIT_OF[kind], stages,
      ...flow,
      cutProduced: attr.cutProduced,
      cutConsumed: attr.cutConsumed,
      cutAvailable: round2(Math.max(0, attr.cutProduced - attr.cutConsumed)),
      packagedProduced: attr.packagedProduced,
      packagedLabels: attr.packagedLabels,
      batchCounts: {
        [stages[0]]: ownFirst.filter((b) => b.status !== "CANCELLED").length,
        cutting: attr.cuttingBatches,
        packaging: attr.packagingBatches,
      },
      running: [...new Set([...running, ...attr.running])],
    };
  })
);
```

`attributedForLine` is a thin public wrapper over the existing private `attributedForLineTx` SQL
(`:1510-1525`) run on the pool rather than inside a transaction — the same fragment `flowInTx`
already trusts, so the read and write sides agree by construction.

**Why `totals` stays correct:** each batch's weights sum to exactly 1 (the CTE normalises by
`assigned_rolls`), so summing per-line attributed figures across label types yields the true order
total without double counting. **Edge case to test:** a batch with `assigned_rolls = 0` makes
`NULLIF(…, 0)` yield NULL, so its output is attributed to nobody and totals undercount. Either
guard the denominator (`COALESCE(NULLIF(assigned_rolls,0), 1)`) or assert `assigned_rolls > 0` at
creation.

### S4 — `getLineBatches`: document the scope, don't fake it

`batch-flow.service.ts:110-119` will keep returning `[]` for cutting/packaging — a line-scoped URL
cannot honestly answer an order-scoped question. Keep the behaviour and replace the silence with an
explicit contract:

```ts
/**
 * First-stage batches of ONE label type. Cutting and packaging are order-scoped — they carry no
 * line (`production_batches_first_stage_one_line`) — so they are NOT listable here and this
 * answers [] for those stages by design. Read them from `getOrderBatches` instead.
 */
```

Alternatives considered: returning the order-wide set from the line URL (rejected — it makes a
line-scoped route lie), or answering `400` (rejected — no gain, and C1 moves the client off this
path anyway).

### C1 — point each panel at the right scope *(fixes R1)*

`BatchStageBoard.tsx:193` asks the line-scoped question unconditionally. Add one scope-aware hook
next to the existing ones and use it in `StagePanel`:

```ts
/**
 * Batches of one stage, asked of the scope that owns it. The first stage of a workflow is
 * per label type; cutting and packaging belong to the ORDER, so they must not be filtered by a
 * line the batch does not have.
 */
export function useStageBatches(orderId: string, stage: BatchStage, lineId: number, kind: LineKind) {
  const lineScoped = isFirstStage(kind, stage);
  // Both hooks are called on every render — hook order stays stable, only one is enabled.
  const byLine = useLineBatches(stage, lineScoped ? lineId : undefined);   // existing `enabled: !!lineId`
  const byOrder = useOrderBatches(orderId, lineScoped ? undefined : stage, !lineScoped);
  return lineScoped ? byLine : byOrder;
}
```

- `useLineBatches` already disables itself when `lineId` is `undefined` (`use-batches.ts:54`), so no
  signature change is needed there.
- `useOrderBatches` (`use-batches.ts:90-97`) gains a third `enabled = true` parameter (the same
  shape `useBatchSources` already has at `:59`) and should be exported from
  `features/production-orders/index.ts:11` alongside `useOrderFlow, useLineBatches` — it is the
  endpoint's intended consumer and is currently dead code.
- `StagePanel` becomes `const batches = useStageBatches(orderId, stage, flow.lineId, flow.kind);`
  — `batches.data ?? []` and every row action keep working unchanged, because both hooks return
  `UseQueryResult<ProductionBatch[]>`.
- The cache/invalidation work already covers this: `BATCH_KEYS.orderBatches(orderId)` sits under
  the `['batches']` prefix that every mutation invalidates (`use-batches.ts:38`).

### C2 — show *why* an order-wide batch is in this panel

With S2 in place, render the mix on order-scoped rows so the same `C-001` appearing in every
label-type board reads as design rather than duplication:

```tsx
{batch.labelMix.length > 0 && (
  <div className="mt-1 flex flex-wrap gap-1">
    {batch.labelMix.map((m) => (
      <Badge key={m.lineId} variant="outline" className="text-[10px]">
        {m.labelType} {Math.round(m.share * 100)}%
      </Badge>
    ))}
  </div>
)}
```

Also state the scope in the panel header for those stages — e.g. `Cutting · order-wide` — and fix
the now-false docblocks: `BatchStageBoard.tsx:94-100` ("One label type's three stages") and
`ProductionOrderDashboardPage.tsx:354-358` ("a cutting batch for Care can only ever draw on Care's
printed output"), both of which contradict `lockSourcesTx` (`batch-flow.repository.ts:1068-1124`,
which only checks *same order* + *upstream stage*).

### C3 — cleanups and the create-button guard

1. Remove the debugging `console.log("flow",flow)` (`BatchStageBoard.tsx:195`).
2. Replace the commented-out `// disabled={intake.value <= 0}` (`:243`) with a guard derived from
   the **sources** query, not from the line's own figure:
   ```tsx
   const sourcesQuery = useBatchSources(stage, flow.lineId, !readOnly);
   const canCreate = sourcesQuery.data?.fromPlan
     ? sourcesQuery.data.remainingPlanned > 0
     : (sourcesQuery.data?.totalAvailable ?? 0) > 0;
   ```
   `useBatchSources` is already called by `CreateBatchDialog` with the same key
   (`CreateBatchDialog.tsx:54`), so TanStack Query dedupes the request. This is also *why* the
   guard was commented out: for cutting, `intake.value` is the panel's **own** printed figure
   while `lockSourcesTx` legitimately allows consuming **any** label type's printed output of the
   order — so the line-scoped number could disable a button that should work.
3. Correct the stale invariants listed in §4: `batch-flow.repository.ts:118-147` (state the live
   order-scoped rule and the live constraint name), `batch-flow.helpers.ts:17`, and
   `batch-flow.service.ts:132-135` (already correct in spirit — align the constraint name).
   Leave `lineRefOfBatch` exported only if a caller needs the throwing variant; otherwise delete it
   and its row in the test mock so the next reader cannot mistake it for a live guarantee.

---

## 8. Test plan

House rules apply: strict unit tests for every modified logic, and `npm test` in **both** packages
(`.clinerules` §2). Both bugs live in read paths, so the tests must assert *structure*, not only
numbers — the style this codebase already uses (`batch-flow.repository.test.ts:7-29` records which
tables a guard reads and fails if the shape regresses).

### T1 — server, structural: `findByOrder` cannot drop a NULL-line row

Extend `server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts` (`@db/index` is
already stubbed at `:12`, so hold the stub in a `vi.hoisted` mutable and have the fake fluent chain
record join kinds):

```ts
const joins: Array<"inner" | "left"> = [];
// .leftJoin()/.innerJoin() record their kind and return the chain; .where() returns the chain;
// .orderBy() resolves the canned rows. Empty rows also exercises attachSources' early return.
```

Assertions:
- `findByOrder(22, "woven", "cutting")` resolves to line-less rows (both line columns NULL);
- recorded join kinds for the line tables are **all `"left"`** — an `innerJoin` on
  `woven_production_lines`/`production_order_lines` is the exact shape that caused R2;
- the fake throws if `innerJoin` is ever called with a line table, so a reintroduction fails loudly
  instead of silently returning `[]`;
- a row whose `labelType` is NULL survives, and `sources: []` is preserved.

### T2 — server, unit: `getOrderFlow` reports attributed cut/packaging figures *(R3)*

Extend `server/src/modules/production/batch-and-runs/batch-flow.service.test.ts` (repositories are
already mocked at `:11-28`; add `attributedForLine` to the `batchFlowRepository` mock and `findLines`
to both line repositories).

**Case A — mirrors order 22 exactly:** `findById(22)` → `{ productType: "woven" }`;
`wovenProductionRepository.findLines(22)` → `[{ id: 15, labelType: "Size Label", quantity: 40000, sizes: [] }]`;
`findByOrder` → `[W-001 with producedRolls: "22000.00"]` (line-attached, as on live);
`attributedForLine(22, 15)` → `{ cutProduced: 22000, cutConsumed: 0, packagedProduced: 0,
packagedLabels: 0, cuttingBatches: 2, packagingBatches: 0, running: [] }`.

Expect `lines[0].cutProduced === 22000`, `lines[0].cutAvailable === 22000`,
`lines[0].batchCounts.cutting === 2`, `totals.cutProduced === 22000`, and
`readyForCompletion === false` (planned 40 000 vs packaged 0).

**Case B — the banner becomes reachable:** same inputs but `packagedProduced: 40000` →
`readyForCompletion === true`. Nothing else in the system can currently produce that `true`.

**Case C — no double counting:** two label types, one cutting batch drawing 60/40 →
`totals.cutProduced` equals the batch output once, not twice.

### T3 — server, unit: attribution share math *(S2)*

If `labelMixForOrder` computes `share` in TS, extract it as a pure function and test 6000 / 10 000 →
`0.6` / `0.4` (sums to 1) plus the `assigned_rolls = 0` fallback from §7/S3, instead of emitting
`NaN`. If the share is computed in SQL, assert the emitted expression guards its denominator.

### T4 — client, unit: the scope decision *(R1 / C1)*

The client has **no component tests today** — six test files, all pure utils plus one store test
(`utils/line-draft.test.ts`, `utils/planning-dialog.test.ts`, `utils/planning-rows.test.ts`,
`lib/format.test.ts`, `store/table-visibility-store.test.ts`, `utils/weaving-time.test.ts`; the only
`@testing-library/react` import is the store test). So make the decision testable by extraction — a
scope predicate/selector next to `isFirstStage` in `batch-types.ts` (or a small
`utils/batch-scope.ts`) — and cover the matrix in `utils/batch-scope.test.ts`:

| workflow | `weaving` | `printing` | `cutting` | `packaging` |
|---|---|---|---|---|
| `printed` | n/a | line | **order** | **order** |
| `woven` | line | n/a | **order** | **order** |

That matrix *is* the reported regression. Rendering is covered by the manual pass (§9.5), which is
the honest limit of the current client test setup.

### T5 — live, read-only gate for the visibility predicates

Add `server/scripts/verify-batch-visibility.mjs` in the same style as
`verify-batch-constraints.mjs` (raw `postgres`, `DIRECT_URL || DATABASE_URL`, read-only, no
`dist`/server boot), printing PASS/FAIL for the §3.3 predicates:

```
PASS            order+stage count (22,'cutting')      = 2
PASS            findByLine(woven 15,'weaving')        = 1
PASS            findByOrder(22,'woven','cutting')     = 2     ← 0 before S1
PASS            flow attribution 22/15 cutProduced    = 22000
FAIL-by-design  findByLine(woven 15,'cutting')        = 0     (S4 contract)
```

Keep it out of `npm test` (vitest here runs offline); expose it as
`npm run verify:batch-visibility` in `server/package.json`.

---

## 9. Verification

### 9.1 Typecheck — both packages

```
cd server && npm run typecheck      # tsc --noEmit, expect 0 errors
cd client && npm run typecheck
```

Expect exactly one deliberate ripple: `labelType: string | null` from S1 (S2 explains why that is
honest). No new `any` beyond the accepted `zodResolver(schema) as any` pattern.

### 9.2 Tests — both packages

```
cd server && npm test
cd client && npm test
```

All green, **and** the pre-existing pinned regressions must still pass untouched:
`batch-flow.service.test.ts:99-110` (a cutting batch must not 404 on read) and the order-scoped
source-picker test at `:113+`. Weakening either invalidates the fix.

### 9.3 Build — the committed bundle is part of the deliverable

```
cd server && npm run build
git status            # expect: regenerated api/index.js (tsup + the api-entry.js -> index.js rename)
```

`server/api/index.js` is **checked into the repo** and served by `vercel.json`
(`functions["api/index.js"]`), so the fix is not live until the regenerated bundle is committed
(`.clinerules` §5).

### 9.4 End-to-end against the live API (once, after deploy)

Against order `22`:

| Request | Before | After |
|---|---|---|
| `GET /api/production/orders/22/batches?stage=cutting` | `[]` | `C-001`, `C-002` (with `labelMix`) |
| `GET /api/production/orders/22/flow` → `totals.cutProduced` | `0` | the two batches' real `produced_rolls` sum |
| `GET /api/production/orders/22/flow` → Size Label `batchCounts.cutting` | `0` | `2` |
| `GET /api/production/cutting-batches/lines/15` | `[]` | `[]` — unchanged, now documented (S4) |

Read the actual `produced_rolls`/`assigned_rolls` of batches 47–48 before asserting exact numbers:
the 22 000 pcs figure is what `W-001` **fed** them (§3.2), not necessarily what they produced.

### 9.5 Manual UI pass (the regressions a unit test cannot see)

1. Order 22 → the Cutting panel lists both batches; the header no longer reads "No cutting batches yet".
2. `Cut` / `Packaged` figures and both `StageProgressBars` move; `% packaged` becomes non-zero once packaging runs.
3. The packaging source picker lists the cutting batches (today: "No cut available" ⇒ uncreatable).
4. The create-button guard disables only when the **order-wide** upstream is genuinely empty.
5. Printed-order happy path (printing → cutting → packaging) unaffected.
6. `readyForCompletion` appears once an order packages its plan; completing the order still renders traceability (`ProductionSummary`).
7. `WorkOrderDetailPage` figures (it also reads `useOrderFlow`, `:380`) stay consistent with the dashboard.

---

## 10. Risks, open decisions, out of scope

### Decisions that need a human before (or during) implementation

| # | Decision | Recommendation |
|---|---|---|
| **D1** | **Keep cutting/packaging order-scoped** (this plan) vs move them back to line-scoped (a corrected re-run of 0023) | **Keep order-scoped.** It matches the live CHECK, the running code, the pinned service tests, and the physical fact that a cutter cuts across label types. The alternative costs a migration plus a rework of every read/write path, and existing NULL-line rows **cannot be back-filled** — their label type is not recoverable from order-wide lineage |
| **D2** | Panel semantics for order-scoped stages: (a) show the order-wide batch in every label-type board with mix chips, (b) filter per label type by attributed share, (c) move cutting/packaging to one order-level board | **(a) now**, (c) as a later UX project. (a) needs S2 to be honest about *why* the row is there; (c) is conceptually cleanest but is a real UI redesign |
| **D3** | Add `POST /production/orders/:id/{stage}-batches` so order-scoped creation no longer demands a `lineId` that merely resolves the order (`batch-flow.routes.ts:47`) | **Defer.** API tidiness only; noting it because the current URL shape is what makes the client *look* like it is asking about a line |
| **D4** | `schema.ts` still encodes the never-executed line-scoped CHECK (`.clinerules` §3) | **Separate change.** Reconcile it there so `npm run db:generate` cannot emit a wrong migration later. DDL is out of scope for a read-path fix |
| **D5** | `assigned_rolls = 0` makes attribution NULL ⇒ totals undercount (§7/S3) | Guard the denominator **and** keep the creation-time invariant `assigned_rolls > 0`; cover with T3 |

### Risks

| Risk | Mitigation |
|---|---|
| S1 "looks" applied but the line predicate stays in `WHERE`, silently re-inner-joining | T1 asserts join kinds and throws on `innerJoin` with a line table |
| S3 introduces an N+1 (one attributed query per label type) | Fine at this scale (a handful of lines per order); if it ever matters, fold into one grouped query keyed by `line_id` |
| `labelType` widening to nullable ripples into client types | Only `useOrderBatches` consumes it (dead code today); fix the type, add S2's `labelMix`, no other consumer |
| Double counting if attribution ever spans workflows | The adjacency CHECK pins the upstream stage and weights normalise per batch (Σ = 1) — asserted by T2 Case C |
| Someone points the client at the order endpoint before S1 is deployed | Land S1 first (§11.A); the panel stays empty until the server change is live — the honest failure mode |

### Explicitly out of scope

No migration and no `schema.ts` change · no write-path change · no auth/RBAC work · no removal of
`useLineBatches` (still correct for first stages) · no back-fill or repair of the two existing live
batches (they are valid) · no `vercel.json` or deploy-config change.

---

## 11. Appendix

### A. Execution order

| Step | Change | Gate |
|---|---|---|
| 1 | **S1** `findByOrder` LEFT JOIN + `productionOrderId` anchor | T1 green, server `npm test` |
| 2 | **S3** `getOrderFlow` attributed overlay + public `attributedForLine` | T2 green |
| 3 | **S2** `labelMix` on order-scoped rows | T3 green |
| 4 | **C1** `useStageBatches` + `useOrderBatches(orderId, stage, enabled)` + export | T4 green |
| 5 | **C2/C3** mix chips, scope labels, `console.log`/`disabled` cleanup, comment fixes | client `npm run typecheck` |
| 6 | **S4** contract docblock on `getLineBatches` | — |
| 7 | typecheck + tests in **both** packages | §9.1–9.2 |
| 8 | `cd server && npm run build` | §9.3, bundle diff reviewed |
| 9 | `node scripts/verify-batch-visibility.mjs` + API/UI pass | §9.4–9.5 |
| 10 | Commit **including** the regenerated `server/api/index.js` | — |
| 11 | `graphify update .`; update `memory-bank/activeContext.md` + `progress.md` | `.clinerules` §6–7 |

### B. Files to touch

| File | Change |
|---|---|
| `server/src/modules/production/batch-and-runs/batch-flow.repository.ts` | S1, S2, comment corrections (`:118-147`) |
| `server/src/modules/production/batch-and-runs/batch-flow.service.ts` | S3, S4, constraint-name alignment (`:132-135`) |
| `server/src/modules/production/batch-and-runs/batch-flow.helpers.ts` | comment fix (`:17`) |
| `server/src/modules/production/batch-and-runs/batch-flow.repository.test.ts` | T1 |
| `server/src/modules/production/batch-and-runs/batch-flow.service.test.ts` | T2 (+ mock additions) |
| `server/scripts/verify-batch-visibility.mjs` *(new)* + `server/package.json` script | T5 |
| `server/api/index.js` | regenerated bundle (must be committed) |
| `client/src/features/production-orders/hooks/use-batches.ts` | C1 (`useStageBatches`, `enabled` param) |
| `client/src/features/production-orders/components/BatchStageBoard.tsx` | C1, C2, C3 |
| `client/src/features/production-orders/pages/ProductionOrderDashboardPage.tsx` | C2 docblock (`:354-358`) |
| `client/src/features/production-orders/index.ts` | export `useOrderBatches` (`:11`) |
| `client/src/features/production-orders/batch-types.ts` + new `utils/batch-scope.{ts,test.ts}` | `labelMix` on `ProductionBatch`, T4 |

### C. Commands used for the diagnosis (read-only, re-runnable)

```
cd server
node scripts/verify-batch-constraints.mjs     # live CHECK + per-stage line census
node scripts/verify-migration.mjs             # migration-ledger reconciliation
```

The raw-row and predicate checks in §3.2–3.3 were run as
`node --env-file .env --input-type=module -e "…"` one-liners against `DIRECT_URL`, selecting counts
and rows only. **No writes were performed against the live database during this diagnosis.**

---

## 12. Execution record (2026-09-26)

> **⚠ SUPERSEDED 2026-09-29.** This section records the *interim* order-scoped design (D1 "keep
> order-scoped", D2 mix chips). The decision was reversed and shipped as migration
> `0025_line_scoped_cutting_packaging.sql` + a server/client rewrite — see **§15** for the current
> state. The diagnosis (§4) and the read-path defects R1–R3 remain valid history; the fix shapes
> described here do not.

**Status: executed.** The user said "proceed with implementation", which was read as accepting
the recommended options — **D1 = keep cutting/packaging order-scoped** (no migration, no schema
change) and **D2 = (a) order-wide row + mix chips now** (the order-level board stays deferred).
S1 → T1 → S3 → T2 → S2 → T3 → C1 → T4 → C2/C3 → S4 were all landed in that pass; nothing in §10's
"explicitly out of scope" list was touched.

### Deviations from §7 (all deliberate)

1. **S3 has no public `attributedForLine` wrapper.** The overlay is built from one order-level
   read, `batchFlowRepository.labelMixForOrder(orderId)`, plus a **pure** helper
   `attributedFlowOf(batches, mix, lineId)` in `batch-flow.helpers.ts`. That single map feeds S2
   (the chips) and S3 (the figures) with the *same* weights, and it removes the N+1 risk that §10
   flagged — one query per order, not one per label type. The write path is untouched, so
   `flowInTx`/`attributedForLineTx` still own the counters.
2. **`labelMix` is `[]` on every non-order read** (`findByLine`, `findById`) instead of being
   absent, so `ProductionBatch.labelMix` can be a required field and the client renders one shape.
   Both are zero-query.
3. **`lineRefOfBatch` (the throwing variant) was deleted**, along with its row in the service
   test's mock — it had no callers (C3.3), and its docblock was one of the comments that claimed a
   guarantee the database does not make. `lineRefOfBatchOrNull` stays (used by `scopeOfTx`).
4. Also in the C3 spirit: the controller's `console.log("working")` / `console.log("route hit")`
   debug lines are gone, and the panel's `isLoading` became `isPending` (TanStack v5 rule,
   `.clinerules` §2).
5. Two files (`production-orders/index.ts`, `ProductionOrderDashboardPage.tsx`) were held open by
   another process and could not be written in place; they were replaced atomically via
   `write-temp → rename`, content byte-identical apart from the intended edit.

### Gate results (all green)

| Gate | Result |
|---|---|
| `server/ npm run typecheck` | 0 errors |
| `server/ npm test` | 9 files / **120 tests** pass (was 107) — incl. both pinned regressions, untouched |
| `server/ npm run build` | tsup OK; `server/api/index.js` regenerated (503 755 B) |
| `client/ npm run typecheck` | 0 errors |
| `client/ npm test` | 7 files / **63 tests** pass (was 6/54) — new `utils/batch-scope.test.ts` (9) |
| `client/ npm run build` | vite build OK |
| `graphify update .` | AST rebuilt (3189 nodes / 8936 edges). NOTE: installed CLI is 0.9.58 vs skill 0.17.1, so it wrote the **superseded, gitignored** `graphify-out/`; `.graphify/GRAPH_REPORT.md` was left alone deliberately. |
| `npm run verify:batch-visibility` (T5, live DB) | **All checks PASS** — order 22: 2 cutting batches, both line-less; `findByLine(…,'weaving') = 1`; `findByOrder(22,'woven','cutting') = 2`; `findByLine(…,'cutting') = 0 (by design)` |

### Live end-to-end (local dev server, port 5000)

| Request | Before | After |
|---|---|---|
| `GET /api/production/orders/22/batches?stage=cutting` | `[]` (R2) | **200** → `C-001`, `C-002`, `productionOrderLineId: null`, `labelMix: [{lineId:15, labelType:"Care Label", rolls:10000, share:1}]`, `sources` attached |
| `GET /api/production/orders/22/flow` → `lines[0].batchCounts.cutting` | `0` (R3) | **`2`** |
| `GET /api/production/cutting-batches/lines/15` | `[]` | `[]` (unchanged, now documented as the S4 contract) |
| `GET /api/production/weaving-batches/lines/15` | 1 batch | unchanged ✓ |

**Expectation calibrated against live data:** §3.3's `flow attribution 22/15 cutProduced = 22000`
is *not* what the API reports — and that is correct. Both cutting batches on order 22 are still
`ASSIGNED` with `produced_rolls = 0`, so their attributed output **is** 0 until output is recorded
(the `22000` figure is the weaving batch's `consumed_rolls`, i.e. the cutting *input*, not its
output). The observable fix is `batchCounts.cutting = 2` and the two rows in the list endpoint.

### Not done here (unchanged from §10)

- **Commit**: nothing was committed — the working tree holds exactly §7's change set plus this
  document, for review first. `server/api/index.js` is part of it and must travel with the code.
- D3 (order-level create route), D4 (`schema.ts` CHECK reconciliation), D5 (creation-time
  `assigned_rolls > 0` assertion — today's `mixDenominator` fallback covers it on read).
- §9.4 (end-to-end against the *deployed* Vercel API) and §9.5 (manual UI pass) — after deploy.

---

## 13. Execution record — the client half of the order-scoped create (2026-09-28)

> **⚠ SUPERSEDED 2026-09-29.** `utils/batch-scope.ts`, `batchCreateTarget`,
> `getSourcesFromOrder`/`getResourcesFromOrder`/`createFromOrder` and the `useOrder*` hooks no
> longer exist — every stage POSTs and reads against its line. See **§15**.

**Status: executed.** §12 fixed the *read* path and left **D3** on the follow-up list as
"order-level create route" — the server half of it (routes + service) landed with §12, but nothing
in `client/` called it: the dashboard still POSTed cutting and packaging batches to
`/cutting-batches/lines/:lineId`, a URL that claims a line the live CHECK forbids the batch to have.
This pass lands the client half, so creation, sources and resources all resolve through the scope
that owns the stage.

### What changed

| File | Change |
|---|---|
| `services/batch-service.ts` | `getSourcesFromOrder`, `getResourcesFromOrder`, `createFromOrder` — the three endpoints added in §12 finally have callers |
| `hooks/use-batches.ts` | `BATCH_KEYS.orderSources` / `.orderResources`; `useOrderBatchSources`, `useOrderStageResources`; unified `useStageSources` / `useStageScopedResources`; `useBatchMutation` also invalidates `orderFlow(orderId)` resolved from `args.orderId ?? orderId` |
| `utils/batch-scope.ts` | `isLineScopedStage`, `isOrderScopedOnEveryWorkflow`, `batchCreateTarget` |
| `components/BatchStageBoard.tsx` | the panel reads its stage through the scope-owning hook (`useStageBatches`) and asks for sources through `useStageSources`; `CreateBatchDialog` gets `lineId={undefined}` for cutting/packaging |
| `components/CreateBatchDialog.tsx` | `lineId` / `labelType` become optional, `canSubmit` demands a line only for the first stage, and the header says *"Order-wide — consumes printed rolls from every label type"* instead of naming one label type |
| `utils/batch-scope.test.ts` | the scope matrix gains the create-endpoint cases: **9 → 17 tests** |
| `index.ts` | exports the new hooks and helpers |

### One decision point, and it is a pure function

Whether a stage is created against a line or against an order used to be decided inline in the
mutation *and* again in the dialog. It now lives in `batchCreateTarget(stage, { lineId, orderId })`
(`utils/batch-scope.ts`), which returns `{ scope: "line" }` / `{ scope: "order" }` / `null`, and it is
unit-tested. Two properties are deliberate:

1. **The order wins for cutting and packaging even when a line id is present.** Every label type's
   board renders the same order-scoped batches, so a caller is *always* holding a line id it could
   wrongly forward; the helper absorbs that instead of turning it into a request.
2. **The stage alone decides — no `kind` needed.** `isOrderScopedOnEveryWorkflow(stage)` derives the
   answer from `STAGES_OF` (true only for cutting and packaging) rather than hard-coding the two
   stages, and the tests pin the trap it avoids: `isOrderScopedStage("printed", "weaving")` is
   *also* `true`, yet a weaving batch must go to a line. A line-only caller keeps working for the
   shared stages too (the server derives the order from the line and writes `line: null`), so this
   is a narrowing of the URL, not a breaking change for any other caller.

The board and the dialog share the order-scoped query keys (`BATCH_KEYS.orderSources` /
`.orderResources`), so the "can I create a batch at all?" guard and the dialog's source list are one
request, not two — the same dedupe §12 relied on, now preserved across the scope split.

### Gate results (all green)

| Gate | Result |
|---|---|
| `client/ npm run typecheck` | 0 errors |
| `client/ npm test` | 7 files / **71 tests** pass (was 63) — `utils/batch-scope.test.ts` 9 → **17** |
| `client/ npm run lint` | 0 errors, **184 warnings** (unchanged from baseline) |
| `client/ npm run build` | vite build OK |
| `server/ npm run typecheck` | 0 errors (untouched by this pass) |
| `server/ npm test` | 9 files / **120 tests** pass |
| `server/ npm run build` | tsup OK; `server/api/index.js` regenerated (509 070 B) |
| `graphify update .` | AST rebuilt — 3211 nodes / 9016 edges (writes the gitignored `graphify-out/`; `.graphify/GRAPH_REPORT.md` cannot be refreshed by the installed 0.9.58 CLI) |

### Not done here

- **Commit** — still nothing committed; the working tree holds §7 + §12 + §13 for review, and
  `server/api/index.js` travels with it.
- §9.4 (end-to-end against the *deployed* Vercel API) and §9.5 (manual UI pass) — unchanged.
- D4 (`schema.ts` CHECK reconciliation) and D5 (creation-time `assigned_rolls > 0`) — unchanged.

---

## 14. Execution record — landed, committed, and the T5 default fixed (2026-09-28)

**Status: executed.** §12 and §13 are no longer "for review" — the whole change set (server read
path, client create path, this document, and the regenerated bundle) is **committed on `chore/ci`
as `0a3ef12`** (24 files, +2807/−170), and the working tree is clean.

### Post-commit validation (re-run against the committed tree)

| Gate | Result |
|---|---|
| `client/ npm run typecheck` | 0 errors |
| `client/ npm test` | 7 files / **71 tests** pass |
| `client/ npm run lint` | 0 errors, **184 warnings** (baseline, unchanged) |
| `server/ npm run typecheck` | 0 errors |
| `server/ npm test` | 9 files / **120 tests** pass |
| `server/ npm run build` | tsup OK — and `git status server/api/` stays **empty**: the committed `api/index.js` (509 070 B) is byte-identical to a fresh build |
| `server/ npm run verify:batch-visibility` | **All checks PASS** (see below) |

### The live database changed, and that exposed one real defect

Order `22` — the order the bug was reported against, and the id T5 hard-coded as its default —
**no longer exists**. The database now holds a single order, **`#24`** (`PRD-00001`, woven,
60 000 pcs) with 2 weaving and 1 cutting batch. So `npm run verify:batch-visibility`, the
documented argument-less invocation, had started failing with `No production order 22` — a green
gate gone red for a stale reason, which is precisely the failure mode a gate must not have.

**Fix:** the default now resolves to the newest production order
(`SELECT id FROM production_orders ORDER BY id DESC LIMIT 1`); an explicit id still wins, and a
bad argument (`… 9999`) still fails loudly with `No production order 9999` and exit code 1.

Re-run against the current data:

```
order 24 · woven · first stage weaving
PASS  cutting: every batch is order-scoped             = 1/1
PASS  findByLine(woven_production_lines 20,'weaving')  = 1
PASS  findByOrder(24,'woven','cutting')                = 1     ← 0 before S1
PASS  findByLine(woven_production_lines 20,'cutting')  = 0 (by design)
All checks PASS
```

That is independent, live evidence for the §12 fix: `findByOrder(…, 'cutting')` returns the
order-scoped batch that no line-scoped read can ever see.

### Still not done (unchanged)

- §9.4 (end-to-end against the *deployed* Vercel API) and §9.5 (manual UI pass) — after deploy.
- D4 (`schema.ts` CHECK reconciliation — see `migration-reconciliation.md` Phase 3) and
  D5 (creation-time `assigned_rolls > 0`).
- `3Q-Dashbaord/` stays in place pending an explicit go-ahead: deleting it destroys its own
  unrelated `.git` history.

---

## 15. Execution record — the LINE-scoped rewrite (2026-09-29)

**Decision:** the D1/D2 design of §12–§14 was reversed. Cutting and packaging batches are now
**line-scoped** like every other stage: one batch, one label type, one production line — which is
what §4's root cause R1 actually wanted, since a line-scoped read can now answer for every stage.

### Migration `server/drizzle/0025_line_scoped_cutting_packaging.sql` (journal idx 25)

Operation order matters and was corrected during validation:

| Step | Statement | Why in this position |
|---|---|---|
| 0 | `DROP CONSTRAINT production_batches_first_stage_one_line` | the old CHECK demands `num_nonnulls = 0` for cutting/packaging — it **forbids the rows the backfill is about to write**, so backfilling first fails with a CHECK violation (observed on the scratch DB) |
| 1 | backfill line-less **cutting** from its largest contributor | `batch_consumptions` edges into printing/weaving batches, `ROW_NUMBER() OVER (PARTITION BY batch ORDER BY rolls DESC)` |
| 2 | backfill line-less **packaging** from its largest contributor | must follow 1: its contributor is a cutting batch that step 1 just gave a line |
| 3 | fallback: the order's first line (`MIN(id)` of the workflow's line table) | covers batches with no readable edges |
| 4 | `DO $$ … RAISE EXCEPTION $$` if any line-less batch remains | a clear error beats a CHECK violation deep inside `ADD CONSTRAINT` |
| 5 | `DROP INDEX production_batches_order_stage_no_uq`; `ADD CONSTRAINT production_batches_one_line (num_nonnulls(...) = 1)`; `CREATE UNIQUE INDEX IF NOT EXISTS …_printed_no_uq / …_woven_no_uq` | the target shape `production-batches.table.ts` already declared |

No renumbering is needed: `batch_number` was unique per (order, stage) and a line belongs to one
order, so the per-line subsets stay unique; the two partial indexes then cover
(line, stage, batch_number) for all four stages.

**Validation — `server/scripts/verify-0025-line-scoped.mjs`** (LOCAL-only: refuses any URL that
is not `localhost`; drops its scratch DB afterwards) provisions `q3_0025_scratch` from
`scripts/baseline/live-schema.sql`, seeds one order with **two** label types and line-less
cutting + packaging batches fed by both, then runs four phases:

```
phase 1  new CHECK exists · old CHECK gone · order-stage index gone · both per-line indexes exist
         P-CARE -> Care Label · P-SIZE -> Size Label
         C-TEST (cutting)    -> Size Label   ← largest contributor (70 > 30)
         PK-TEST (packaging) -> Size Label   ← inherited from its cutting batch
         no line-less batch survived
phase 2  orphan batch present -> "Cannot make cutting/packaging line-scoped: 1 batch(es) still
         carry no line…" (RAISED; transaction rolled back)
phase 3  cutting batch WITH a line accepted; line-less one rejected by production_batches_one_line
phase 4  next batch_number on that (line, stage) accepted; a repeat refused by
         production_batches_printed_no_uq
ALL SCRATCH CHECKS PASSED
```

### Server code

- `batch-flow.repository.ts` — attribution machinery **deleted** (`lineMixCte`,
  `attributedForLineTx`, `contributingLineRefsTx`, `lineageLineIdsTx`, `linesOfOrderFromMix`,
  `contributingLinesTx`, `lineRefsOfOrderTx`, `orderKindTx`, `attachLabelMix`,
  `labelMixForOrder`). `BatchScope.line` is now a non-null `LineRef` resolved by the throwing
  `lineRefOfBatch`; `createBatch` is a single path for **all** stages (lock order → line →
  sources); `lockSourcesTx` refuses a source from another line with an explicit message;
  `insertBatchTx` always numbers per (line, stage); `flowInTx` sums the line's own batches;
  `findByLine` / `findByOrder` filter without a line-table join (both line tables are LEFT joined
  only to resolve `labelType` for display).
- `batch-flow.service.ts` — `getOrderFlow` sums each line's own cutting/packaging batches (no
  pro-rata split); `getAvailableSources` returns `findByLine` (same-line only);
  `createBatchFromOrder` / `getAvailableSourcesFromOrder` / `getStageResourcesFromOrder` deleted;
  `createBatch` always passes `line`.
- `batch-flow.controller.ts` / `.routes.ts` / `.schema.ts` — `createFromOrder`,
  `getSourcesFromOrder`, `getResourcesFromOrder`, `orderStageRouter`,
  `/orders/{cutting,packaging}-batches` mounts and `createOrderScopedBatchSchema` removed.
- `batch-flow.helpers.ts` — attribution helpers deleted; `LineRef` docs updated.
- Tests: `batch-flow.repository.test.ts` (12) and `batch-flow.service.test.ts` (8) rewritten —
  line-scoped reads, same-line source picker, "each cutting batch lands on exactly one label
  type", cancelled batches moving nothing.

### Client code

- `utils/batch-scope.ts` + `batch-scope.test.ts` **deleted** — with every stage line-scoped there
  is no scope decision left to make; `useCreateBatch` simply requires a `lineId`.
- `services/batch-service.ts` — `getSourcesFromOrder`, `getResourcesFromOrder`, `createFromOrder`,
  `listByOrder` removed; `create` is the one create route for all stages.
- `hooks/use-batches.ts` — `orderSources` / `orderResources` / `orderBatches` keys and
  `useOrderBatchSources` / `useOrderStageResources` / `useOrderBatches` / `useStageBatches` /
  `useStageSources` / `useStageScopedResources` removed; callers use `useLineBatches`,
  `useBatchSources`, `useStageResources` directly.
- `BatchStageBoard.tsx` — always passes `flow.lineId`; reads batches/sources from the line; the
  "· order-wide" header and the order-scoped empty-state suffix are gone.
- `CreateBatchDialog.tsx` — `canSubmit` needs a line for **every** stage; the description no
  longer says "Order-wide".
- `batch-types.ts` — `BatchLabelMix` and `ProductionBatch.labelMix` removed (the server stopped
  sending it; rendering `.length` would have thrown).
- **New test** `services/batch-service.test.ts` — mocks `@/lib/api` and pins the URLs: sources,
  resources, list and create for **all four stages** hit `…/{stage}-batches/lines/{id}`, and no
  method can produce a `/production/orders/…-batches` path again.

### Gates (2026-09-29)

| Gate | Result |
|---|---|
| `server`: `npm run typecheck` | 0 errors |
| `server`: `npm test` | 9 files / **122** tests pass |
| `server`: `npm run build` | tsup OK, `api/index.js` regenerated |
| `client`: `npm run typecheck` | 0 errors |
| `client`: `npm test` | 7 files / **67** tests pass |
| `node scripts/verify-0025-line-scoped.mjs` (local scratch DB) | **ALL SCRATCH CHECKS PASSED** |
| `node scripts/verify-batch-constraints.mjs` (live, read-only) | live is **pre-0025**: `first_stage_one_line` + `order_stage_no_uq` present, 3 line-less cutting batches |

### Follow-ups

1. **Apply 0025 to live Supabase** (dev machine, `DIRECT_URL`), then re-run
   `verify:batch-constraints` (must show `production_batches_one_line`, no
   `production_batches_order_stage_no_uq`, 0 line-less rows) and `verify:batch-visibility` — its
   assertions were rewritten for the line-scoped world (every batch carries a line; the order's
   lines account for all of its cutting batches; per-line figures are a plain sum, no `labelMix`).
2. Until 0025 has run, do **not** `drizzle-kit push`/`generate` against live
   (`migration-reconciliation.md` F5).
3. D5 (creation-time `assigned_rolls > 0`) and §9.4/§9.5 remain open exactly as before.
