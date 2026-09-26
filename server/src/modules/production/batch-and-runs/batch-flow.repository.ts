import { db, type Tx } from "@db/index";
import {
  productionBatches,
  batchConsumptions,
  productionOrderLines,
  productionOrders,
  productionStageTransactions,
  machines,
  operators,
} from "@db/schema";
import { eq, and, desc, asc, inArray, sql } from "drizzle-orm";
import { BadRequestError, NotFoundError, ConflictError } from "@shared/errors/ApiError";
import {
  type BatchStage,
  type BatchStatus,
  type LineKind,
  type LineRef,
  requireUpstream,
  isFirstStage,
  STAGES_OF,
  batchCodeFor,
  stageTxTypeFor,
  UNIT_OF,
} from "./batch-flow.helpers";
import { wovenProductionLines } from "@db/schema";

export interface SourceAllocation {
  sourceBatchId: number;
  rolls: number;
}

export interface CreateBatchInput {
  stage: BatchStage;
  machineId?: number | null;
  operatorId?: number | null;
  /** Printing only — rolls drawn from the line's planned total. */
  assignedRolls?: number;
  /** Cutting and packaging only — where the input comes from. */
  sources?: SourceAllocation[];
  /** Weaving only — which planned size this batch weaves (a Size Label line). */
  labelSize?: string | null;
  notes?: string | null;
  actorUserId?: number | null;
}

export interface UpdateBatchInput {
  machineId?: number | null;
  operatorId?: number | null;
  assignedRolls?: number;
  sources?: SourceAllocation[];
  /** Weaving only — which planned size this batch weaves (a Size Label line). */
  labelSize?: string | null;
  notes?: string | null;
  actorUserId?: number | null;
}

export interface RecordOutputInput {
  producedRolls?: number;
  /** Printing only. Cutting and packaging release unused input instead of scrapping it. */
  wastedRolls?: number;
  packagedQty?: number;
  actorUserId?: number | null;
}

/** Row shape returned by every batch read, with its resolved machine/operator names. */
const batchSelect = {
  id: productionBatches.id,
  productionOrderId: productionBatches.productionOrderId,
  productionOrderLineId: productionBatches.productionOrderLineId,
  wovenProductionLineId: productionBatches.wovenProductionLineId,
  stage: productionBatches.stage,
  batchNumber: productionBatches.batchNumber,
    batchCode: productionBatches.batchCode,
  machineId: productionBatches.machineId,
  machineName: machines.name,
  operatorId: productionBatches.operatorId,
  operatorName: operators.name,
  /** Which planned size a weaving batch weaves — NULL everywhere else. */
  labelSize: productionBatches.labelSize,
  assignedRolls: productionBatches.assignedRolls,
  producedRolls: productionBatches.producedRolls,
  wastedRolls: productionBatches.wastedRolls,
  consumedRolls: productionBatches.consumedRolls,
  availableRolls: productionBatches.availableRolls,
  packagedQty: productionBatches.packagedQty,
  status: productionBatches.status,
  notes: productionBatches.notes,
  startedAt: productionBatches.startedAt,
  completedAt: productionBatches.completedAt,
  createdAt: productionBatches.createdAt,
  updatedAt: productionBatches.updatedAt,
};

/**
 * The batch material-flow model.
 *
 * NOTE ON LAYERING: like `production-order.repository.ts`, the transactional methods here
 * throw domain errors. That is deliberate — guards like "only 3 printed rolls are
 * available" must run *inside* the same transaction as the write they protect, after the
 * `FOR UPDATE` lock, so they cannot be lifted into the service without losing atomicity.
 *
 * LOCK ORDER, always: the production line first, then batches in ascending id order.
 * The line is the natural lock root because every invariant in the system is scoped to it
 * (remaining planned rolls, printed availability, cut availability), so locking it
 * serialises all batch work for one label type while leaving every other label type and
 * every other order completely unblocked.
 */
/** The batch column that carries the line id, per workflow. */
const lineColumn = (kind: LineKind) =>
  kind === "woven" ? productionBatches.wovenProductionLineId : productionBatches.productionOrderLineId;

/** The insert payload fragment that points a row at the right line. */
const lineValues = (line: LineRef) =>
  line.kind === "woven"
    ? { wovenProductionLineId: line.id, productionOrderLineId: null }
    : { productionOrderLineId: line.id, wovenProductionLineId: null };

/**
 * The label type a batch runs, read back from whichever column is set.
 *
 * Every batch hangs off exactly one line — the `production_batches_one_line` check
 * (`num_nonnulls(production_order_line_id, woven_production_line_id) = 1`) makes that
 * a hard DB guarantee. Cutting and packaging carry a line just like the first stage, so
 * `line` is always present for every batch at every stage.
 */
export function lineRefOfBatchOrNull(b: {
  productionOrderLineId: number | null;
  wovenProductionLineId: number | null;
}): LineRef | null {
  if (b.wovenProductionLineId != null) return { kind: "woven", id: b.wovenProductionLineId };
  if (b.productionOrderLineId != null) return { kind: "printed", id: b.productionOrderLineId };
  // Every batch carries a line (production_batches_one_line check), so this is unreachable
  // for valid rows — kept as a safeguard against corrupt data only.
  return null;
}

/** The line of every batch — the DB check makes one line per batch a hard guarantee. */
export function lineRefOfBatch(b: {
  productionOrderLineId: number | null;
  wovenProductionLineId: number | null;
}): LineRef {
  const line = lineRefOfBatchOrNull(b);
  if (!line) {
    throw new NotFoundError("Batch is not attached to a production line");
  }
  return line;
}

/**
 * What a batch belongs to: its order, its workflow, and — for the first stage only — its
 * label type. Resolving this once is what lets every path below treat the three stages
 * uniformly now that cutting and packaging have no line of their own.
 */
export interface BatchScope {
  productionOrderId: number;
  kind: LineKind;
  /** Null for cutting and packaging, which are independent of label type. */
  line: LineRef | null;
}

/** The insert/update fragment that points a batch or edge at its order and line. */
const scopeValues = (scope: BatchScope) => ({
  productionOrderId: scope.productionOrderId,
  ...(scope.line
    ? lineValues(scope.line)
    : { productionOrderLineId: null, wovenProductionLineId: null }),
});

/**
 * Per-label-type figures for the ORDER-SCOPED stages, as a reusable SQL fragment.
 *
 * Cutting and packaging have no line of their own, so their output is split across the label
 * types that fed them. `batch_consumptions_valid_adjacency` bounds lineage at two hops —
 * cutting always draws from a first-stage batch, packaging always from cutting — so the split
 * is a FIXED TWO-LEVEL join rather than a recursive walk:
 *
 *   weight(label type) = that label type's share of the batch's INPUT / the batch's total input
 *   attributed output  = batch produced x weight
 *
 * Level 1 reads the label type straight off a cutting batch's source batches (weaving and
 * printing are per-label-type, so their line IS the label type). Level 2 pro-rates a packaging
 * batch's input through each cutting batch's own mix — so a package filled from rolls that were
 * "60 Size Label + 40 Care Label" keeps that split all the way down.
 *
 * Every denominator is guarded with NULLIF so a zero-input batch yields 0, never a NaN.
 */
const lineMixCte = () => sql`
  l1 AS (
    SELECT e.destination_batch_id AS batch_id,
           COALESCE(s.production_order_line_id, s.woven_production_line_id) AS line_id,
           SUM(e.rolls) AS rolls
    FROM batch_consumptions e
    JOIN production_batches s ON s.id = e.source_batch_id
    WHERE s.stage IN ('printing','weaving')
    GROUP BY 1, 2
  ),
  mix AS (
    SELECT batch_id, line_id, rolls FROM l1
    UNION ALL
    SELECT e.destination_batch_id,
           l1.line_id,
           SUM(e.rolls * l1.rolls / NULLIF(t.total, 0))
    FROM batch_consumptions e
    JOIN production_batches s ON s.id = e.source_batch_id AND s.stage = 'cutting'
    JOIN l1 ON l1.batch_id = s.id
    JOIN (SELECT batch_id, SUM(rolls) AS total FROM l1 GROUP BY 1) t ON t.batch_id = s.id
    GROUP BY 1, 2
  )
`;

/** One label type's attested share of every cutting/packaging batch in an order. */
const attributedForLine = (orderId: number, lineId: number) => sql`
  WITH ${lineMixCte()}
  SELECT
    COALESCE(SUM(b.produced_rolls * m.rolls / NULLIF(b.assigned_rolls, 0))
      FILTER (WHERE b.stage = 'cutting'), 0)   AS cut_produced,
    COALESCE(SUM(b.consumed_rolls * m.rolls / NULLIF(b.assigned_rolls, 0))
      FILTER (WHERE b.stage = 'cutting'), 0)   AS cut_consumed,
    COALESCE(SUM(b.produced_rolls * m.rolls / NULLIF(b.assigned_rolls, 0))
      FILTER (WHERE b.stage = 'packaging'), 0) AS packaged_produced,
    COALESCE(SUM(b.packaged_qty  * m.rolls / NULLIF(b.assigned_rolls, 0))
      FILTER (WHERE b.stage = 'packaging'), 0) AS packaged_labels
  FROM production_batches b
  JOIN mix m ON m.batch_id = b.id
  WHERE b.production_order_id = ${orderId}
    AND b.status <> 'CANCELLED'
    AND m.line_id = ${lineId}
`;

export class BatchFlowRepository {
  /* ------------------------------------------------------------------ reads */

  async findByLine(line: LineRef, stage?: BatchStage) {
    const conditions = [eq(lineColumn(line.kind), line.id)];
    if (stage) conditions.push(eq(productionBatches.stage, stage));

    const rows = await db
      .select(batchSelect)
      .from(productionBatches)
      .leftJoin(machines, eq(productionBatches.machineId, machines.id))
      .leftJoin(operators, eq(productionBatches.operatorId, operators.id))
      .where(and(...conditions))
      .orderBy(asc(productionBatches.stage), asc(productionBatches.batchNumber));

    return this.attachSources(rows);
  }

  /** Every batch on an order, for whichever workflow it runs. */
  async findByOrder(productionOrderId: number, kind: LineKind = "printed", stage?: BatchStage) {
    const rows =
      kind === "woven"
        ? await (async () => {
            const conditions = [eq(wovenProductionLines.productionOrderId, productionOrderId)];
            if (stage) conditions.push(eq(productionBatches.stage, stage));
            return db
              .select({ ...batchSelect, labelType: wovenProductionLines.labelType })
              .from(productionBatches)
              .innerJoin(
                wovenProductionLines,
                eq(productionBatches.wovenProductionLineId, wovenProductionLines.id)
              )
              .leftJoin(machines, eq(productionBatches.machineId, machines.id))
              .leftJoin(operators, eq(productionBatches.operatorId, operators.id))
              .where(and(...conditions))
              .orderBy(desc(productionBatches.createdAt));
          })()
        : await (async () => {
            const conditions = [eq(productionOrderLines.productionOrderId, productionOrderId)];
            if (stage) conditions.push(eq(productionBatches.stage, stage));
            return db
              .select({ ...batchSelect, labelType: productionOrderLines.labelType })
              .from(productionBatches)
              .innerJoin(
                productionOrderLines,
                eq(productionBatches.productionOrderLineId, productionOrderLines.id)
              )
              .leftJoin(machines, eq(productionBatches.machineId, machines.id))
              .leftJoin(operators, eq(productionBatches.operatorId, operators.id))
              .where(and(...conditions))
              .orderBy(desc(productionBatches.createdAt));
          })();

    return this.attachSources(rows);
  }

  async findById(batchId: number) {
    const [row] = await db
      .select({
        ...batchSelect,
        labelType: sql<string>`COALESCE(${productionOrderLines.labelType}, ${wovenProductionLines.labelType})`,
      })
      .from(productionBatches)
      .leftJoin(
        productionOrderLines,
        eq(productionBatches.productionOrderLineId, productionOrderLines.id)
      )
      .leftJoin(
        wovenProductionLines,
        eq(productionBatches.wovenProductionLineId, wovenProductionLines.id)
      )
      .leftJoin(machines, eq(productionBatches.machineId, machines.id))
      .leftJoin(operators, eq(productionBatches.operatorId, operators.id))
      .where(eq(productionBatches.id, batchId));
    if (!row) return undefined;
    const [withSources] = await this.attachSources([row]);
    return withSources;
  }

  /** Decorates batches with the edges that fed them — "C-001 took 5 from P-001, 3 from P-002". */
  private async attachSources<T extends { id: number }>(rows: T[]) {
    if (rows.length === 0) return rows.map((r) => ({ ...r, sources: [] as SourceEdge[] }));

    const edges = await db
      .select({
        id: batchConsumptions.id,
        destinationBatchId: batchConsumptions.destinationBatchId,
        sourceBatchId: batchConsumptions.sourceBatchId,
        rolls: batchConsumptions.rolls,
        sourceBatchCode: productionBatches.batchCode,
      })
      .from(batchConsumptions)
      .innerJoin(productionBatches, eq(batchConsumptions.sourceBatchId, productionBatches.id))
      .where(
        inArray(
          batchConsumptions.destinationBatchId,
          rows.map((r) => r.id)
        )
      )
      .orderBy(asc(batchConsumptions.sourceBatchId));

    const byDestination = new Map<number, SourceEdge[]>();
    for (const e of edges) {
      const list = byDestination.get(e.destinationBatchId) ?? [];
      list.push({
        sourceBatchId: e.sourceBatchId,
        sourceBatchCode: e.sourceBatchCode,
        rolls: Number(e.rolls),
      });
      byDestination.set(e.destinationBatchId, list);
    }
    return rows.map((r) => ({ ...r, sources: byDestination.get(r.id) ?? [] }));
  }

  /**
   * What each stage of a line currently holds. Every figure is a SUM over one table —
   * nothing is stored twice, so nothing can disagree.
   */
  async findLineFlow(lineId: number) {
    const [row] = await db
      .select({
        lineId: productionOrderLines.id,
        labelType: productionOrderLines.labelType,
        planned: productionOrderLines.totalRolls,
        assignedToPrinting: sql<string>`COALESCE(SUM(${productionBatches.assignedRolls}) FILTER (WHERE ${productionBatches.stage} = 'printing'), 0)`,
        printedProduced: sql<string>`COALESCE(SUM(${productionBatches.producedRolls}) FILTER (WHERE ${productionBatches.stage} = 'printing'), 0)`,
        printedAvailable: sql<string>`COALESCE(SUM(${productionBatches.availableRolls}) FILTER (WHERE ${productionBatches.stage} = 'printing'), 0)`,
        printedWasted: sql<string>`COALESCE(SUM(${productionBatches.wastedRolls}) FILTER (WHERE ${productionBatches.stage} = 'printing'), 0)`,
        cutProduced: sql<string>`COALESCE(SUM(${productionBatches.producedRolls}) FILTER (WHERE ${productionBatches.stage} = 'cutting'), 0)`,
        cutAvailable: sql<string>`COALESCE(SUM(${productionBatches.availableRolls}) FILTER (WHERE ${productionBatches.stage} = 'cutting'), 0)`,
        packagedProduced: sql<string>`COALESCE(SUM(${productionBatches.producedRolls}) FILTER (WHERE ${productionBatches.stage} = 'packaging'), 0)`,
        packagedLabels: sql<string>`COALESCE(SUM(${productionBatches.packagedQty}) FILTER (WHERE ${productionBatches.stage} = 'packaging'), 0)`,
      })
      .from(productionOrderLines)
      .leftJoin(
        productionBatches,
        and(
          eq(productionBatches.productionOrderLineId, productionOrderLines.id),
          sql`${productionBatches.status} <> 'CANCELLED'`
        )
      )
      .where(eq(productionOrderLines.id, lineId))
      .groupBy(productionOrderLines.id);

    return row;
  }

  /**
   * Everything upstream of a batch, at any depth — requirement 21. Flipping source and
   * destination in the recursive term walks downstream instead.
   */
  async findTrace(batchId: number) {
    const upstream = await db.execute(sql`
      WITH RECURSIVE up AS (
        SELECT b.id, b.batch_code, b.stage, b.produced_rolls, 0 AS depth,
               NULL::numeric AS rolls_from_source, NULL::integer AS consumed_by
        FROM production_batches b WHERE b.id = ${batchId}
        UNION ALL
        SELECT s.id, s.batch_code, s.stage, s.produced_rolls, up.depth + 1,
               e.rolls, up.id
        FROM up
        JOIN batch_consumptions e ON e.destination_batch_id = up.id
        JOIN production_batches  s ON s.id = e.source_batch_id
      )
      SELECT * FROM up WHERE depth > 0 ORDER BY depth, batch_code
    `);

    const downstream = await db.execute(sql`
      WITH RECURSIVE down AS (
        SELECT b.id, b.batch_code, b.stage, b.produced_rolls, 0 AS depth,
               NULL::numeric AS rolls_to_destination, NULL::integer AS fed_by
        FROM production_batches b WHERE b.id = ${batchId}
        UNION ALL
        SELECT d.id, d.batch_code, d.stage, d.produced_rolls, down.depth + 1,
               e.rolls, down.id
        FROM down
        JOIN batch_consumptions e ON e.source_batch_id = down.id
        JOIN production_batches  d ON d.id = e.destination_batch_id
      )
      SELECT * FROM down WHERE depth > 0 ORDER BY depth, batch_code
    `);

    return {
      upstream: (upstream as unknown as TraceRow[]) ?? [],
      downstream: (downstream as unknown as TraceRow[]) ?? [],
    };
  }

  /* ------------------------------------------------------------------ writes */

  /**
   * Creates a batch and, for cutting/packaging, its consumption edges — all atomic.
   *
   * Printing draws from the line's remaining planned rolls; the other two stages draw from
   * named upstream batches, and their `assignedRolls` is never typed by a user but is
   * always the sum of their edges.
   */
  async createBatch(scope: BatchScope, input: CreateBatchInput) {
    return db.transaction(async (tx) => {
      const unit = UNIT_OF[scope.kind];

            /* --- the first stage of each workflow draws from the PLAN --- */
      if (isFirstStage(scope.kind, input.stage)) {
        const line = scope.line;
        if (!line) {
          throw new BadRequestError(`A ${input.stage} batch must belong to a label type`);
        }
        const planned = await this.lockLineTx(tx, line);
        const assigned = round2(input.assignedRolls ?? 0);
        if (assigned <= 0) throw new BadRequestError(`Assigned ${unit} must be greater than zero`);

        // For woven Size Label lines, use the size-specific remaining so that
        // assigning one size is not blocked by another size's batches.
        const remaining = await (async () => {
          if (line.kind === "woven" && input.labelSize) {
            return await this.remainingPlannedSizeTx(tx, line, input.labelSize);
          }
          return await this.remainingPlannedTx(tx, line);
        })();
        if (assigned > remaining + EPS) {
          throw new BadRequestError(
            `Cannot assign ${assigned} ${unit} to ${input.stage}: ${round2(remaining)} of the ` +
              `${planned} planned ${unit} remain unassigned`
          );
        }

        const batch = await this.insertBatchTx(tx, scope, input, assigned);
        await this.logStageTx(tx, [line], batch.id, input.stage, 0, input.actorUserId);
        await this.resyncLineTx(tx, line);
        return batch;
      }

      /* --- cutting and packaging consume upstream output, ACROSS label types --- */
      const upstream = requireUpstream(scope.kind, input.stage);
      const sources = input.sources ?? [];
      if (sources.length === 0) {
        throw new BadRequestError(
          `A ${input.stage} batch must consume from at least one ${upstream} batch`
        );
      }

      // Lock order -> lines -> batches, so this path cannot deadlock against a concurrent
      // first-stage batch (which locks a line, then its batch).
      await this.lockOrderTx(tx, scope.productionOrderId);
      const contributing = await this.contributingLineRefsTx(tx, scope, sources);
      await this.lockLinesTx(tx, contributing);

      const locked = await this.lockSourcesTx(tx, scope, input.stage, sources);
      const assigned = round2(sources.reduce((n, s) => n + s.rolls, 0));

      const batch = await this.insertBatchTx(tx, scope, input, assigned);
      for (const s of sources) {
        await tx.insert(batchConsumptions).values({
          destinationBatchId: batch.id,
          sourceBatchId: s.sourceBatchId,
          productionOrderId: scope.productionOrderId,
          sourceStage: upstream,
          destinationStage: input.stage,
          rolls: String(round2(s.rolls)),
          createdByUserId: input.actorUserId ?? null,
        });
        await this.bumpConsumedTx(tx, s.sourceBatchId, round2(s.rolls), locked);
      }

      await this.logStageTx(tx, contributing, batch.id, input.stage, 0, input.actorUserId);
      await this.resyncLinesTx(tx, contributing);
      return batch;
    });
  }

  /**
   * The label types a cutting/packaging batch is about to draw from, resolved from its
   * requested sources so they can be locked in a deterministic order before the write.
   *
   * A cutting batch's sources are first-stage batches, whose own line IS the label type. A
   * packaging batch's sources are cutting batches, which have no line — so their mix is
   * resolved one level further down.
   */
  private async contributingLineRefsTx(
    tx: Tx,
    scope: BatchScope,
    sources: SourceAllocation[]
  ): Promise<LineRef[]> {
    const ids = new Set<number>();
    for (const s of sources) {
      for (const id of await this.lineageLineIdsTx(tx, s.sourceBatchId)) ids.add(id);
    }
    return [...ids].map((id) => ({ kind: scope.kind, id }));
  }

  /**
   * The label type ids a batch's output descends from:
   *   first-stage batch -> its own line
   *   cutting batch     -> the lines of its sources (level 1 of the mix)
   *   packaging batch   -> one level further down (levels 1-2)
   */
  private async lineageLineIdsTx(tx: Tx, batchId: number): Promise<number[]> {
    const rows = (await tx.execute(sql`
      SELECT COALESCE(b.production_order_line_id, b.woven_production_line_id) AS "lineId"
      FROM production_batches b WHERE b.id = ${batchId}
    `)) as unknown as Array<{ lineId: number | null }>;
    const own = rows[0]?.lineId;
    if (own != null) return [Number(own)];
    return this.linesOfOrderFromMix(tx, 0, batchId);
  }

  /**
   * Edits a batch's assignment, sources and resources. Producing batches keep their output:
   * an assignment can be raised or lowered but never below what has already been made.
   */
  async updateBatch(batchId: number, input: UpdateBatchInput) {
    return db.transaction(async (tx) => {
      const { batch, scope, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status === "CANCELLED") throw new BadRequestError("Cannot edit a cancelled batch");
      if (batch.status === "COMPLETED") {
        throw new BadRequestError("Cannot edit a completed batch — cancel it and raise a new one");
      }

      const produced = Number(batch.producedRolls);
      const wasted = Number(batch.wastedRolls);
      const floor = round2(produced + wasted);

      const unit = UNIT_OF[scope.kind];
      /* Everything that must be resynced: the label types the batch covers now, plus — when
         its sources are replaced — whatever it covers afterwards. The OLD mix matters because
         its attribution changes too. */
      const touchedKeys = new Set(contributing.map((l) => `${l.kind}:${l.id}`));
      const touched = [...contributing];

      if (isFirstStage(scope.kind, batch.stage)) {
        if (input.assignedRolls !== undefined) {
          const next = round2(input.assignedRolls);
          if (next < floor - EPS) {
            throw new BadRequestError(
              `Cannot reduce the assignment to ${next}: ${floor} ${unit} have already been produced or wasted by ${batch.batchCode}`
            );
          }
          const remaining = await this.remainingPlannedTx(tx, scope.line!, batchId);
          if (next > remaining + EPS) {
            throw new BadRequestError(
              `Cannot assign ${next} ${unit}: only ${round2(remaining)} planned ${unit} are unassigned`
            );
          }
        }
      } else if (input.sources !== undefined) {
        await this.replaceSourcesTx(tx, scope, batch, input.sources, floor, input.actorUserId);
        for (const ref of await this.contributingLineRefsTx(tx, scope, input.sources)) {
          const key = `${ref.kind}:${ref.id}`;
          if (!touchedKeys.has(key)) {
            touchedKeys.add(key);
            touched.push(ref);
          }
        }
      }

      if (input.machineId !== undefined || input.operatorId !== undefined) {
        const nextMachine = input.machineId !== undefined ? input.machineId : batch.machineId;
        const nextOperator = input.operatorId !== undefined ? input.operatorId : batch.operatorId;
                this.assertStageResources(batch.stage, nextMachine, nextOperator);
        await this.assertResourcesFreeTx(tx, batch.stage, nextMachine, nextOperator, batchId);
      }

      const assignedRolls =
        isFirstStage(scope.kind, batch.stage) && input.assignedRolls !== undefined
          ? String(round2(input.assignedRolls))
          : input.sources !== undefined
            ? String(round2(input.sources.reduce((n, s) => n + s.rolls, 0)))
            : batch.assignedRolls;

            const [updated] = await tx
        .update(productionBatches)
        .set({
          assignedRolls,
          machineId: input.machineId !== undefined ? input.machineId : batch.machineId,
          operatorId: input.operatorId !== undefined ? input.operatorId : batch.operatorId,
          labelSize: input.labelSize !== undefined ? input.labelSize ?? null : batch.labelSize,
          notes: input.notes !== undefined ? input.notes : batch.notes,
          updatedAt: new Date(),
        })
        .where(eq(productionBatches.id, batchId))
        .returning();

      await this.resyncLinesTx(tx, touched);
      return updated;
    });
  }

  /** PLANNED/ASSIGNED -> IN_PROGRESS. Requires the resources the stage needs. */
  async startBatch(batchId: number, actorUserId?: number | null) {
    return db.transaction(async (tx) => {
      const { batch, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status === "IN_PROGRESS") throw new BadRequestError("Batch is already running");
      if (batch.status !== "PLANNED" && batch.status !== "ASSIGNED") {
        throw new BadRequestError(`A ${batch.status.toLowerCase()} batch cannot be started`);
      }
      if (!batch.operatorId) throw new BadRequestError("Assign an operator before starting the batch");
      if (batch.stage !== "packaging" && !batch.machineId) {
        throw new BadRequestError("Assign a machine before starting the batch");
      }
      // Re-checked at start: the machine may have been given to another batch since this
      // one was created, and starting is the point at which it physically occupies it.
            await this.assertResourcesFreeTx(tx, batch.stage, batch.machineId, batch.operatorId, batchId);

      const [updated] = await tx
        .update(productionBatches)
        .set({ status: "IN_PROGRESS", startedAt: batch.startedAt ?? new Date(), updatedAt: new Date() })
        .where(eq(productionBatches.id, batchId))
        .returning();

      await this.resyncLinesTx(tx, contributing, actorUserId);
      return updated;
    });
  }

  /**
   * Records output. Absolute values, not deltas — "this batch has now made 6 rolls".
   * The new figure becomes available to the next stage immediately, without waiting for
   * the batch to complete: that is what makes partial output work.
   */
  async recordOutput(batchId: number, input: RecordOutputInput) {
    return db.transaction(async (tx) => {
      const { batch, scope, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status === "CANCELLED") throw new BadRequestError("Cannot record output on a cancelled batch");
      if (batch.status === "COMPLETED") throw new BadRequestError("Cannot record output on a completed batch");

      const assigned = Number(batch.assignedRolls);
      const consumed = Number(batch.consumedRolls);
      const produced = input.producedRolls !== undefined ? round2(input.producedRolls) : Number(batch.producedRolls);
      const wasted = input.wastedRolls !== undefined ? round2(input.wastedRolls) : Number(batch.wastedRolls);

      if (produced < 0 || wasted < 0) throw new BadRequestError("Output cannot be negative");
      if (wasted > 0 && !isFirstStage(scope.kind, batch.stage)) {
        throw new BadRequestError(
          `Waste is only recorded at ${scope.kind === "woven" ? "weaving" : "printing"} — ` +
            "unused input at cutting and packaging is released back to the previous stage"
        );
      }
      if (produced + wasted > assigned + EPS) {
        throw new BadRequestError(
          `${batch.batchCode} was assigned ${assigned} rolls: cannot record ${produced} produced` +
            (wasted > 0 ? ` and ${wasted} wasted` : "")
        );
      }
      if (produced < consumed - EPS) {
        const takers = await this.downstreamTakersTx(tx, batchId);
        throw new ConflictError(
          `Cannot reduce ${batch.batchCode}'s output to ${produced}: ${consumed} rolls have already been taken by ${takers}`
        );
      }

      const [updated] = await tx
        .update(productionBatches)
        .set({
          producedRolls: String(produced),
          wastedRolls: String(wasted),
          packagedQty:
            input.packagedQty !== undefined ? String(round2(input.packagedQty)) : batch.packagedQty,
          // Recording output implies the batch is running; completed and cancelled
          // batches were both rejected above.
          status: "IN_PROGRESS",
          startedAt: batch.startedAt ?? new Date(),
          updatedAt: new Date(),
        })
        .where(eq(productionBatches.id, batchId))
        .returning();

      await this.logStageTx(
        tx,
        contributing,
        batchId,
        batch.stage,
        produced - Number(batch.producedRolls),
        input.actorUserId
      );
      await this.resyncLinesTx(tx, contributing, input.actorUserId);
      return updated;
    });
  }

  /**
   * Completes a batch and settles the unused reservation.
   *
   *   printing              the shortfall was never physically consumed, so the assignment
   *                         shrinks to what was made and those planned rolls become
   *                         available to a new batch.
   *   cutting / packaging   the shortfall is released back to the SOURCE batches, newest
   *                         edge first, so the rolls return to upstream availability rather
   *                         than disappearing as waste.
   */
  async completeBatch(batchId: number, actorUserId?: number | null) {
    return db.transaction(async (tx) => {
      const { batch, scope, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status === "COMPLETED") throw new BadRequestError("Batch is already completed");
      if (batch.status === "CANCELLED") throw new BadRequestError("Cannot complete a cancelled batch");

            const produced = Number(batch.producedRolls);
      const wasted = Number(batch.wastedRolls);
      const assigned = Number(batch.assignedRolls);
      if (produced <= 0) {
        throw new BadRequestError("Record this batch's output before completing it");
      }

      // The Complete button on the board only appears when the batch has produced
      // everything it was assigned, so this guard keeps the API honest for the same rule.
            const settled = round2(produced + wasted);
      if (settled < assigned - EPS) {
        const kind = scope.kind;
        throw new BadRequestError(
          `Cannot complete ${batch.batchCode}: ${round2(produced)} ${UNIT_OF[kind]} produced of ${round2(assigned)} ${UNIT_OF[kind]} assigned`
        );
      }

      const shortfall = round2(assigned - settled);

      if (shortfall > EPS && !isFirstStage(scope.kind, batch.stage)) {
        await this.releaseToSourcesTx(tx, batchId, shortfall);
      }

      const [updated] = await tx
        .update(productionBatches)
        .set({
          assignedRolls: String(settled),
          status: "COMPLETED",
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(productionBatches.id, batchId))
        .returning();

      await this.resyncLinesTx(tx, contributing, actorUserId);
      return updated;
    });
  }

  /** Voids a batch. Refused while anything downstream still holds its output. */
  async cancelBatch(batchId: number, actorUserId?: number | null) {
    return db.transaction(async (tx) => {
      const { batch, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status === "CANCELLED") throw new BadRequestError("Batch is already cancelled");

      const consumed = Number(batch.consumedRolls);
      if (consumed > EPS) {
        const takers = await this.downstreamTakersTx(tx, batchId);
        throw new ConflictError(
          `${batch.batchCode} cannot be cancelled: ${consumed} rolls have been consumed by ${takers}. Cancel those first.`
        );
      }

      // Hand this batch's own input back to whatever fed it.
      await this.releaseAllSourcesTx(tx, batchId);

      const [updated] = await tx
        .update(productionBatches)
        .set({ status: "CANCELLED", updatedAt: new Date() })
        .where(eq(productionBatches.id, batchId))
        .returning();

      await this.resyncLinesTx(tx, contributing, actorUserId);
      return updated;
    });
  }

  /** Hard delete. Only for a batch that never ran; anything else is cancelled instead. */
  async deleteBatch(batchId: number) {
    return db.transaction(async (tx) => {
      const { batch, contributing } = await this.lockBatchAndScopeTx(tx, batchId);
      if (batch.status !== "PLANNED" && batch.status !== "ASSIGNED") {
        throw new ConflictError(
          `${batch.batchCode} has already run — started batches are cancelled, not deleted`
        );
      }
      if (Number(batch.producedRolls) > 0 || Number(batch.consumedRolls) > 0) {
        throw new ConflictError(`${batch.batchCode} has output recorded and cannot be deleted`);
      }

      await this.releaseAllSourcesTx(tx, batchId);
      await tx.delete(productionBatches).where(eq(productionBatches.id, batchId));
      await this.resyncLinesTx(tx, contributing);
      return { id: batchId };
    });
  }

  /* --------------------------------------------------------- private helpers */

  /**
   * The order's workflow. `product_type` lives on the WORK ORDER, so this is the one place
   * that walks production_orders -> work_orders. An order is uniformly one workflow, which is
   * what lets a cutting/packaging batch — which has no line — still know whether it counts
   * rolls or pieces.
   */
  private async orderKindTx(tx: Tx, productionOrderId: number): Promise<LineKind> {
    const rows = (await tx.execute(sql`
      SELECT w.product_type AS "productType"
      FROM production_orders o
      JOIN work_orders w ON w.id = o.work_order_id
      WHERE o.id = ${productionOrderId}
      LIMIT 1
    `)) as unknown as Array<{ productType: string | null }>;
    return rows[0]?.productType === "woven" ? "woven" : "printed";
  }

  /** A batch's order, workflow and — for the first stage only — its label type. */
  private async scopeOfTx(
    tx: Tx,
    batch: {
      productionOrderId: number;
      productionOrderLineId: number | null;
      wovenProductionLineId: number | null;
    }
  ): Promise<BatchScope> {
    const line = lineRefOfBatchOrNull(batch);
    return {
      productionOrderId: batch.productionOrderId,
      kind: line ? line.kind : await this.orderKindTx(tx, batch.productionOrderId),
      line,
    };
  }

  /** Every label type of an order, whichever workflow it runs. */
  private async lineRefsOfOrderTx(tx: Tx, orderId: number): Promise<LineRef[]> {
    if ((await this.orderKindTx(tx, orderId)) === "woven") {
      const rows = await tx
        .select({ id: wovenProductionLines.id })
        .from(wovenProductionLines)
        .where(eq(wovenProductionLines.productionOrderId, orderId));
      return rows.map((r) => ({ kind: "woven" as const, id: r.id }));
    }
    const rows = await tx
      .select({ id: productionOrderLines.id })
      .from(productionOrderLines)
      .where(eq(productionOrderLines.productionOrderId, orderId));
    return rows.map((r) => ({ kind: "printed" as const, id: r.id }));
  }

  /**
   * For a cutting/packaging batch: the label types it actually covers, resolved from its
   * consumption edges. This is what a write must lock and then resync — the batch has no line
   * of its own, so its blast radius is exactly the label types that fed it.
   */
  private async contributingLinesTx(tx: Tx, orderId: number, batchId: number): Promise<LineRef[]> {
    const kind = await this.orderKindTx(tx, orderId);
    return (await this.linesOfOrderFromMix(tx, orderId, batchId)).map((id) => ({ kind, id }));
  }

  /**
   * The label type ids a cutting/packaging batch draws from, at any depth — level 1 for a
   * cutting batch, levels 1-2 for a packaging batch. Same two-level shape as the mix CTE,
   * reduced to just the distinct label types so it is cheap.
   */
  private async linesOfOrderFromMix(tx: Tx, orderId: number, batchId: number): Promise<number[]> {
    const rows = (await tx.execute(sql`
      WITH ${lineMixCte()}
      SELECT DISTINCT m.line_id AS "lineId"
      FROM mix m
      WHERE m.batch_id = ${batchId} AND m.line_id IS NOT NULL
    `)) as unknown as Array<{ lineId: number | null }>;
    return rows.map((r) => Number(r.lineId)).filter((n) => Number.isFinite(n));
  }

  private async lockOrderTx(tx: Tx, orderId: number) {
    await tx
      .select({ id: productionOrders.id })
      .from(productionOrders)
      .where(eq(productionOrders.id, orderId))
      .for("update");
  }

  /**
   * Locks several lines at once, always in ascending id order. A cutting or packaging batch
   * can touch several label types, and an unordered multi-lock would deadlock against a
   * concurrent first-stage batch on the same line.
   */
  private async lockLinesTx(tx: Tx, lines: LineRef[]) {
    const printed = lines
      .filter((l) => l.kind === "printed")
      .map((l) => l.id)
      .sort((a, b) => a - b);
    const woven = lines
      .filter((l) => l.kind === "woven")
      .map((l) => l.id)
      .sort((a, b) => a - b);

    if (printed.length > 0) {
      await tx
        .select({ id: productionOrderLines.id })
        .from(productionOrderLines)
        .where(inArray(productionOrderLines.id, printed))
        .orderBy(asc(productionOrderLines.id))
        .for("update");
    }
    if (woven.length > 0) {
      await tx
        .select({ id: wovenProductionLines.id })
        .from(wovenProductionLines)
        .where(inArray(wovenProductionLines.id, woven))
        .orderBy(asc(wovenProductionLines.id))
        .for("update");
    }
  }

  /**
   * The lock root. Every batch mutation starts here, on whichever line table owns the line.
   * Returns the PLANNED quantity: rolls for printed, pieces for woven.
   */
  private async lockLineTx(tx: Tx, line: LineRef): Promise<number> {
    if (line.kind === "woven") {
      const [row] = await tx
        .select()
        .from(wovenProductionLines)
        .where(eq(wovenProductionLines.id, line.id))
        .for("update");
      if (!row) throw new NotFoundError("Woven production line not found");
      return Number(row.quantity);
    }
    const [row] = await tx
      .select()
      .from(productionOrderLines)
      .where(eq(productionOrderLines.id, line.id))
      .for("update");
    if (!row) throw new NotFoundError("Production order line not found");
    return Number(row.totalRolls);
  }

  /**
   * The single entry point for every batch mutation. Locks in the order every path here
   * follows — the order first for the order-scoped stages, then the label types, then the
   * batch — and returns the batch with the scope and the label types it touches.
   *
   * `contributing` is captured HERE, under the lock and before any mutation, because a
   * cancellation or a source replacement destroys the edges it is derived from — and after
   * that there would be no way to know which label types to resync.
   */
  private async lockBatchAndScopeTx(tx: Tx, batchId: number) {
    const [peek] = await tx
      .select({
        productionOrderId: productionBatches.productionOrderId,
        productionOrderLineId: productionBatches.productionOrderLineId,
        wovenProductionLineId: productionBatches.wovenProductionLineId,
      })
      .from(productionBatches)
      .where(eq(productionBatches.id, batchId));
    if (!peek) throw new NotFoundError("Batch not found");

    const scope = await this.scopeOfTx(tx, peek);
    let contributing: LineRef[] = [];

    if (scope.line) {
      // First stage: its label type is the lock root, exactly as before.
      contributing = [scope.line];
      await this.lockLineTx(tx, scope.line);
    } else {
      // Order-scoped stages: the order is the root, then every label type the batch draws
      // from, in ascending id order so concurrent writes cannot deadlock.
      await this.lockOrderTx(tx, scope.productionOrderId);
      contributing = await this.contributingLinesTx(tx, scope.productionOrderId, batchId);
      await this.lockLinesTx(tx, contributing);
    }

    const [batch] = await tx
      .select()
      .from(productionBatches)
      .where(eq(productionBatches.id, batchId))
      .for("update");
    if (!batch) throw new NotFoundError("Batch not found");
    return { batch, scope, contributing };
  }

  /**
   * planned − Σ assigned across the live FIRST-stage batches, optionally excluding one.
   *
   * The plan is read FROM THE LINE TABLE, one select per workflow, and never from
   * `production_batches`. That is load-bearing, not stylistic: an outer query over
   * `production_batches` returns ZERO rows while no batch exists anywhere yet, so its
   * scalar sub-selects never evaluate and `row?.planned ?? 0` silently collapses to 0 —
   * which made the FIRST first-stage batch on a fresh database impossible to create, with
   * the nonsensical "0 of the 40000 planned pcs remain unassigned". The line table always
   * has exactly one row for the line, so the guard reports a real figure.
   */
  private async remainingPlannedTx(tx: Tx, line: LineRef, excludeBatchId?: number) {
    const first = STAGES_OF[line.kind][0];
    const col = line.kind === "woven" ? "woven_production_line_id" : "production_order_line_id";

    const assigned = sql<string>`COALESCE((
      SELECT SUM(b.assigned_rolls) FROM production_batches b
      WHERE b.${sql.raw(col)} = ${line.id}
        AND b.stage = ${first} AND b.status <> 'CANCELLED'
        ${excludeBatchId ? sql`AND b.id <> ${excludeBatchId}` : sql``}
    ), 0)`;

    const [row] =
      line.kind === "woven"
        ? await tx
            .select({ planned: wovenProductionLines.quantity, assigned })
            .from(wovenProductionLines)
            .where(eq(wovenProductionLines.id, line.id))
            .limit(1)
        : await tx
            .select({ planned: productionOrderLines.totalRolls, assigned })
            .from(productionOrderLines)
            .where(eq(productionOrderLines.id, line.id))
            .limit(1);

    return round2(Number(row?.planned ?? 0) - Number(row?.assigned ?? 0));
  }

  /**
   * For a woven Size Label line: how many pieces of `size` are still unassigned.
   *
   *   planned size quantity − Σ assigned across live weaving batches of that size
   *
   * Called under the line lock, so it is race-free.
   */
  private async remainingPlannedSizeTx(tx: Tx, line: LineRef, size: string) {
    if (line.kind !== "woven") return round2(0);
    // `s->>'quantity'` yields text; it must be cast before COALESCE against a numeric
    // literal, otherwise Postgres rejects the whole statement (42804). Size comparison is
    // trimmed and case-insensitive so a stray space or casing can never zero the plan out.
    const [row] = await tx
      .select({
        total: sql<string>`COALESCE((
          SELECT (s->>'quantity')::numeric FROM jsonb_array_elements(sizes) s
          WHERE lower(trim(s->>'size')) = lower(trim(${size}))
          LIMIT 1
        ), 0)`,
        assigned: sql<string>`COALESCE((
          SELECT SUM(assigned_rolls) FROM production_batches b
          WHERE b.woven_production_line_id = ${line.id}
            AND b.stage = 'weaving' AND b.status <> 'CANCELLED'
            AND lower(trim(b.label_size)) = lower(trim(${size}))
        ), 0)`,
      })
      .from(wovenProductionLines)
      .where(eq(wovenProductionLines.id, line.id))
      .limit(1);

    return round2(Number(row?.total ?? 0) - Number(row?.assigned ?? 0));
  }

  /**
   * Locks the requested source batches in ascending id order and validates every
   * allocation against freshly-read availability.
   *
   * Cutting and packaging draw ACROSS label types, so the only structural rule left is the
   * order: a batch may consume any upstream output OF ITS OWN ORDER, at the stage its own
   * stage requires. The stage pair itself is what `batch_consumptions_valid_adjacency` pins in
   * the database, so a stage skip stays unrepresentable.
   */
  private async lockSourcesTx(
    tx: Tx,
    scope: BatchScope,
    stage: BatchStage,
    sources: SourceAllocation[]
  ) {
    const upstream = requireUpstream(scope.kind, stage);
    const unit = UNIT_OF[scope.kind];
    const ids = [...new Set(sources.map((s) => s.sourceBatchId))].sort((a, b) => a - b);
    if (ids.length !== sources.length) {
      throw new BadRequestError("Each source batch may only be listed once");
    }

    const rows = await tx
      .select()
      .from(productionBatches)
      .where(inArray(productionBatches.id, ids))
      .orderBy(asc(productionBatches.id))
      .for("update");

    const byId = new Map(rows.map((r) => [r.id, r]));
    for (const req of sources) {
      const src = byId.get(req.sourceBatchId);
      if (!src) throw new NotFoundError(`Source batch ${req.sourceBatchId} not found`);
      if (src.productionOrderId !== scope.productionOrderId) {
        throw new BadRequestError(
          `${src.batchCode} belongs to a different production order — material never moves between orders`
        );
      }
      if (src.stage !== upstream) {
        throw new BadRequestError(`A ${stage} batch consumes ${upstream} output, not ${src.stage}`);
      }
      if (src.status === "CANCELLED") {
        throw new BadRequestError(`${src.batchCode} is cancelled`);
      }
      const rolls = round2(req.rolls);
      if (rolls <= 0) throw new BadRequestError("Each allocation must be greater than zero");

      const available = round2(Number(src.producedRolls) - Number(src.consumedRolls));
      if (rolls > available + EPS) {
        const noun = upstream === "printing" ? "printed" : upstream === "weaving" ? "woven" : "cut";
        throw new BadRequestError(
          `${src.batchCode} has only ${available} ${noun} ${unit} available; requested ${rolls}`
        );
      }
    }
    return byId;
  }

  private async insertBatchTx(
    tx: Tx,
    scope: BatchScope,
    input: CreateBatchInput,
    assignedRolls: number
  ) {
        this.assertStageResources(input.stage, input.machineId, input.operatorId);
    // Reserved here, under the lock, so two planners cannot claim the same press.
    await this.assertResourcesFreeTx(tx, input.stage, input.machineId, input.operatorId);

    /*
     * Numbering. Weaving and printing run one sequence per label type; cutting and packaging
     * have no line, so theirs is per ORDER. These two shapes are mirrored by the partial
     * unique indexes on the table, which are what actually enforce them.
     */
    const scopeClause = scope.line
      ? and(
          eq(lineColumn(scope.line.kind), scope.line.id),
          eq(productionBatches.stage, input.stage)
        )
      : and(
          eq(productionBatches.productionOrderId, scope.productionOrderId),
          eq(productionBatches.stage, input.stage)
        );

    const [row] = await tx
      .select({ max: sql<number>`COALESCE(MAX(${productionBatches.batchNumber}), 0)` })
      .from(productionBatches)
      .where(scopeClause);
    const batchNumber = Number(row?.max ?? 0) + 1;

    const [batch] = await tx
      .insert(productionBatches)
            .values({
        ...scopeValues(scope),
        stage: input.stage,
        batchNumber,
        batchCode: batchCodeFor(input.stage, batchNumber),
        machineId: input.machineId ?? null,
        operatorId: input.operatorId ?? null,
        /** Weaving batches record which planned size they run; other stages ignore it. */
        labelSize: input.labelSize ?? null,
        assignedRolls: String(assignedRolls),
        producedRolls: "0",
        wastedRolls: "0",
        consumedRolls: "0",
        packagedQty: "0",
        status: "ASSIGNED",
        notes: input.notes ?? null,
        createdByUserId: input.actorUserId ?? null,
      })
      .returning();
    return batch;
  }

  /**
   * A batch cannot exist without the people and equipment to run it.
   *
   * Printing and cutting need a machine and an operator; packaging needs an operator only —
   * it is done by hand, so assigning it a machine is an error rather than an option.
   */
  private assertStageResources(
    stage: BatchStage,
    machineId?: number | null,
    operatorId?: number | null
  ) {
    if (stage === "packaging") {
      if (machineId) throw new BadRequestError("Packaging has an operator but no machine");
    } else if (!machineId) {
      throw new BadRequestError(`A ${stage} batch needs a machine before it can be created`);
    }
    if (!operatorId) {
      throw new BadRequestError(`A ${stage} batch needs an operator before it can be created`);
    }
  }

  /**
   * Machines and operators currently held by a live batch, with what is holding them.
   *
   * A resource is held while its batch is PLANNED, ASSIGNED or IN_PROGRESS. Completing or
   * cancelling the batch frees it with no separate release step — the hold is derived from
   * batch state, never stored, so it cannot leak.
   */
        async findResourceHolds(excludeBatchId?: number) {
    const conditions = [sql`${productionBatches.status} IN ('PLANNED','ASSIGNED','IN_PROGRESS')`];
    if (excludeBatchId) conditions.push(sql`${productionBatches.id} <> ${excludeBatchId}`);

        return db.execute(sql`
      SELECT
        b.id AS "batchId",
        b.batch_code AS "batchCode",
        b.stage AS "stage",
        b.status AS "status",
        b.machine_id AS "machineId",
        b.operator_id AS "operatorId",
        COALESCE(pol.label_type, wpl.label_type) AS "labelType",
        COALESCE(po.production_number, wpo.production_number) AS "productionNumber"
      FROM production_batches b
      LEFT JOIN production_order_lines pol ON b.production_order_line_id = pol.id
      LEFT JOIN production_orders po ON pol.production_order_id = po.id
      LEFT JOIN woven_production_lines wpl ON b.woven_production_line_id = wpl.id
      LEFT JOIN production_orders wpo ON wpl.production_order_id = wpo.id
      WHERE b.status IN ('PLANNED','ASSIGNED','IN_PROGRESS')
      ${excludeBatchId ? sql`AND b.id <> ${excludeBatchId}` : sql``}
    `);
  }

  /**
   * Refuses a machine already committed to another live batch. For non-weaving stages the
   * operator is refused too; a weaving operator can run multiple looms, so we only block
   * the machine there. Runs inside the caller's transaction, after the line lock, so two
   * planners cannot both claim the same press at the same moment.
   */
  private async assertResourcesFreeTx(
    tx: Tx,
    stage: BatchStage,
    machineId: number | null | undefined,
    operatorId: number | null | undefined,
    excludeBatchId?: number
  ) {
    // Machines are reserved across ALL stages. Operators are reserved only for
    // non-weaving stages: a weaving operator can run multiple looms.
    const checkOperator = stage !== "weaving";
    const resIds = checkOperator
      ? [machineId, operatorId].filter((v): v is number => typeof v === "number")
      : [machineId].filter((v): v is number => typeof v === "number");
    if (resIds.length === 0) return;

    const resClause = "(" + resIds.join(",") + ")";
    const opClause = checkOperator ? " OR b.operator_id IN (" + operatorId + ")" : "";
    const excludeClause = excludeBatchId ? " AND b.id <> " + excludeBatchId : "";

    const clashes = (await tx.execute(sql`
      SELECT
        b.batch_code AS "batchCode",
        b.machine_id AS "machineId",
        b.operator_id AS "operatorId",
        COALESCE(pol.label_type, wpl.label_type) AS "labelType",
        COALESCE(po.production_number, wpo.production_number) AS "productionNumber",
        m.name AS "machineName",
        o.name AS "operatorName"
      FROM production_batches b
      LEFT JOIN production_order_lines pol ON b.production_order_line_id = pol.id
      LEFT JOIN production_orders po ON pol.production_order_id = po.id
      LEFT JOIN woven_production_lines wpl ON b.woven_production_line_id = wpl.id
      LEFT JOIN production_orders wpo ON wpl.production_order_id = wpo.id
      LEFT JOIN machines m ON b.machine_id = m.id
      LEFT JOIN operators o ON b.operator_id = o.id
      WHERE b.status IN ('PLANNED','ASSIGNED','IN_PROGRESS')
        AND (b.machine_id IN ${sql.raw(resClause)}${sql.raw(opClause)})
        ${sql.raw(excludeClause)}
    `)) as unknown as Array<{
      batchCode: string;
      machineId: number | null;
      operatorId: number | null;
      labelType: string;
      productionNumber: string;
      machineName: string | null;
      operatorName: string | null;
    }>;

    for (const c of clashes) {
      const where = c.productionNumber + " · " + c.labelType + " (" + c.batchCode + ")";
      if (machineId && c.machineId === machineId) {
        throw new ConflictError((c.machineName ?? "That machine") + " is already running " + where);
      }
      if (checkOperator && operatorId && c.operatorId === operatorId) {
        throw new ConflictError((c.operatorName ?? "That operator") + " is already assigned to " + where);
      }
    }
  }

  /** Moves a source's consumed cache. The CHECK constraint is the backstop. */
  private async bumpConsumedTx(
    tx: Tx,
    sourceBatchId: number,
    delta: number,
    locked?: Map<number, unknown>
  ) {
    if (!locked?.has(sourceBatchId)) {
      await tx
        .select({ id: productionBatches.id })
        .from(productionBatches)
        .where(eq(productionBatches.id, sourceBatchId))
        .for("update");
    }
    await tx
      .update(productionBatches)
      .set({ consumedRolls: sql`consumed_rolls + ${delta}`, updatedAt: new Date() })
      .where(eq(productionBatches.id, sourceBatchId));
  }

  /** Replaces a batch's whole source set, crediting the old edges back first. */
  private async replaceSourcesTx(
    tx: Tx,
    scope: BatchScope,
    batch: typeof productionBatches.$inferSelect,
    sources: SourceAllocation[],
    floor: number,
    actorUserId?: number | null
  ) {
    if (sources.length === 0) throw new BadRequestError("A batch must keep at least one source");

    const total = round2(sources.reduce((n, s) => n + s.rolls, 0));
    if (total < floor - EPS) {
      throw new BadRequestError(
        `Cannot reduce the input to ${total}: ${floor} ${UNIT_OF[scope.kind]} have already been produced by ${batch.batchCode}`
      );
    }

    await this.releaseAllSourcesTx(tx, batch.id);
    const locked = await this.lockSourcesTx(tx, scope, batch.stage, sources);
    for (const s of sources) {
      await tx.insert(batchConsumptions).values({
        destinationBatchId: batch.id,
        sourceBatchId: s.sourceBatchId,
        productionOrderId: scope.productionOrderId,
        sourceStage: requireUpstream(scope.kind, batch.stage),
        destinationStage: batch.stage,
        rolls: String(round2(s.rolls)),
        createdByUserId: actorUserId ?? null,
      });
      await this.bumpConsumedTx(tx, s.sourceBatchId, round2(s.rolls), locked);
    }
  }

  /** Credits every inbound edge back to its source and removes the edges. */
  private async releaseAllSourcesTx(tx: Tx, batchId: number) {
    const edges = await tx
      .select()
      .from(batchConsumptions)
      .where(eq(batchConsumptions.destinationBatchId, batchId))
      .orderBy(asc(batchConsumptions.sourceBatchId));

    for (const e of edges) {
      await this.bumpConsumedTx(tx, e.sourceBatchId, -Number(e.rolls));
    }
    if (edges.length > 0) {
      await tx.delete(batchConsumptions).where(eq(batchConsumptions.destinationBatchId, batchId));
    }
  }

  /**
   * Hands `shortfall` rolls back to the sources, newest edge first. Used on completion
   * when a cutting or packaging batch made less than it was given — the leftover returns
   * to upstream availability rather than being scrapped.
   */
  private async releaseToSourcesTx(tx: Tx, batchId: number, shortfall: number) {
    const edges = await tx
      .select()
      .from(batchConsumptions)
      .where(eq(batchConsumptions.destinationBatchId, batchId))
      .orderBy(desc(batchConsumptions.id));

    let left = shortfall;
    for (const e of edges) {
      if (left <= EPS) break;
      const give = Math.min(left, Number(e.rolls));
      const remainder = round2(Number(e.rolls) - give);

      if (remainder <= EPS) {
        await tx.delete(batchConsumptions).where(eq(batchConsumptions.id, e.id));
      } else {
        await tx
          .update(batchConsumptions)
          .set({ rolls: String(remainder), updatedAt: new Date() })
          .where(eq(batchConsumptions.id, e.id));
      }
      await this.bumpConsumedTx(tx, e.sourceBatchId, -round2(give));
      left = round2(left - give);
    }
  }

  private async downstreamTakersTx(tx: Tx, batchId: number) {
    const rows = await tx
      .select({ code: productionBatches.batchCode })
      .from(batchConsumptions)
      .innerJoin(productionBatches, eq(batchConsumptions.destinationBatchId, productionBatches.id))
      .where(eq(batchConsumptions.sourceBatchId, batchId));
    return rows.map((r) => r.code).join(", ") || "a downstream batch";
  }

  /**
   * The stage ledger predates the woven workflow and its line column points at printed
   * lines only, so woven batches are not written to it. No history is lost: the batches and
   * their consumption edges are the append-only record for both workflows.
   *
   * An order-scoped cutting/packaging batch writes one row per label type it covers, so the
   * ledger keeps its per-line meaning even though the batch itself spans several. Each row
   * snapshots the position of the label type it is about, read from the same attribution the
   * counters use — so ledger and totals cannot disagree.
   */
  private async logStageTx(
    tx: Tx,
    lines: LineRef[],
    batchId: number,
    stage: BatchStage,
    delta: number,
    actorUserId?: number | null
  ) {
    for (const line of lines) {
      if (line.kind !== "printed") continue;
      const flow = await this.flowInTx(tx, line);
      await tx.insert(productionStageTransactions).values({
        productionOrderLineId: line.id,
        batchId,
        stage,
        transactionType: stageTxTypeFor(stage),
        quantity: String(round2(delta)),
        printedAvailableAfter: String(flow.printedAvailable),
        cuttedAvailableAfter: String(flow.cutAvailable),
        packagedTotalAfter: String(flow.packagedProduced),
        createdByUserId: actorUserId ?? null,
      });
    }
  }

  /**
   * The line's live position: its own first-stage batches, plus its ATTRIBUTED share of the
   * order's cutting and packaging.
   *
   * Weaving and printing are per-label-type, so their figures are a plain sum over this line's
   * own batches. Cutting and packaging are order-scoped, so this line's share of them is the
   * pro-rata weight derived in `lineMixCte` — a batch that cut 60 Size Label and 40 Care Label
   * rolls contributes 60% of its output here and 40% there.
   */
  private async flowInTx(tx: Tx, line: LineRef) {
    const first = STAGES_OF[line.kind][0];
    const [row] = await tx
      .select({
        firstProduced: sql<string>`COALESCE(SUM(produced_rolls) FILTER (WHERE stage = ${first}), 0)`,
        firstConsumed: sql<string>`COALESCE(SUM(consumed_rolls) FILTER (WHERE stage = ${first}), 0)`,
        firstAvailable: sql<string>`COALESCE(SUM(available_rolls) FILTER (WHERE stage = ${first}), 0)`,
      })
      .from(productionBatches)
      .where(
        and(
          eq(lineColumn(line.kind), line.id),
          sql`${productionBatches.status} <> 'CANCELLED'`
        )
      );

    const orderId =
      line.kind === "woven"
        ? Number(
            (
              await tx
                .select({ id: wovenProductionLines.productionOrderId })
                .from(wovenProductionLines)
                .where(eq(wovenProductionLines.id, line.id))
            )[0]?.id ?? 0
          )
        : Number(
            (
              await tx
                .select({ id: productionOrderLines.productionOrderId })
                .from(productionOrderLines)
                .where(eq(productionOrderLines.id, line.id))
            )[0]?.id ?? 0
          );

    const cut = orderId
      ? await this.attributedForLineTx(tx, orderId, line.id)
      : { cutProduced: 0, cutConsumed: 0, packagedProduced: 0, packagedLabels: 0 };

    const printedProduced = round2(Number(row?.firstProduced ?? 0));
    const printedConsumed = round2(Number(row?.firstConsumed ?? 0));
    const cutProduced = round2(cut.cutProduced);
    const cutConsumed = round2(cut.cutConsumed);

    return {
      printedProduced,
      printedConsumed,
      printedAvailable: round2(Number(row?.firstAvailable ?? 0)),
      cutProduced,
      cutConsumed,
      /* Available at cutting is this label type's share of what was cut, less what it has
         already handed to packaging — the same identity the line-scoped version had. */
      cutAvailable: round2(Math.max(0, cutProduced - cutConsumed)),
      packagedProduced: round2(cut.packagedProduced),
      packagedLabels: round2(cut.packagedLabels),
    };
  }

  /** This label type's pro-rata share of the order's cutting and packaging figures. */
  private async attributedForLineTx(tx: Tx, orderId: number, lineId: number) {
    const rows = (await tx.execute(attributedForLine(orderId, lineId))) as unknown as Array<{
      cut_produced: string | null;
      cut_consumed: string | null;
      packaged_produced: string | null;
      packaged_labels: string | null;
    }>;
    const r = rows[0];
    return {
      cutProduced: Number(r?.cut_produced ?? 0),
      cutConsumed: Number(r?.cut_consumed ?? 0),
      packagedProduced: Number(r?.packaged_produced ?? 0),
      packagedLabels: Number(r?.packaged_labels ?? 0),
    };
  }

  /**
   * Projects the batch figures back onto the line's own counters, which the rest of the app
   * still reads. The mapping is exact for both workflows, and keeps each chain true by
   * construction:
   *
   *   printed   printedRolls = Σ produced(printing) · sentToCutting = Σ consumed(printing)
   *             cutRolls     = attributed produced(cutting) · sentToPackaging = attributed consumed(cutting)
   *             packagedRolls= attributed produced(packaging)
   *   woven     wovenQty     = Σ produced(weaving)
   *             cutQty       = attributed produced(cutting)
   *             packagedQty  = attributed produced(packaging)
   *
   * The cutting and packaging terms are the label type's PRO-RATA share when those stages are
   * order-scoped, which is what keeps the chain true across label types: one batch's cut
   * output is split between them by how much of each it consumed, and the shares sum back to
   * the batch total.
   */
  private async resyncLinesTx(tx: Tx, lines: LineRef[], actorUserId?: number | null) {
    // Deduplicate: two edges of one packaging batch can resolve to the same label type.
    const seen = new Set<string>();
    for (const line of lines) {
      const key = `${line.kind}:${line.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      await this.resyncLineTx(tx, line, actorUserId);
    }
  }

  private async resyncLineTx(tx: Tx, line: LineRef, _actorUserId?: number | null) {
    const flow = await this.flowInTx(tx, line);

    if (line.kind === "woven") {
      const [row] = await tx
        .select()
        .from(wovenProductionLines)
        .where(eq(wovenProductionLines.id, line.id));
      if (!row) return;

      const planned = Number(row.quantity);
      const hasProgress =
        flow.printedProduced > 0 || flow.cutProduced > 0 || flow.packagedProduced > 0;
      const status =
        planned > 0 && flow.packagedProduced >= planned - EPS
          ? "completed"
          : hasProgress
            ? "active"
            : "pending";

      await tx
        .update(wovenProductionLines)
        .set({
          wovenQty: String(flow.printedProduced),
          cutQty: String(flow.cutProduced),
          packagedQty: String(flow.packagedProduced),
          weavingStatus: flow.printedProduced > 0 ? "active" : "pending",
          status,
          updatedAt: new Date(),
        })
        .where(eq(wovenProductionLines.id, line.id));

      if (hasProgress) {
        await tx
          .update(productionOrders)
          .set({ status: "production", updatedAt: new Date() })
          .where(
            and(
              eq(productionOrders.id, row.productionOrderId),
              sql`${productionOrders.status} = 'planned'`
            )
          );
      }
      return;
    }

    const [row] = await tx
      .select()
      .from(productionOrderLines)
      .where(eq(productionOrderLines.id, line.id));
    if (!row) return;

    const planned = Number(row.totalRolls);
    const hasProgress =
      flow.printedProduced > 0 || flow.cutProduced > 0 || flow.packagedProduced > 0;
    const lineStatus =
      planned > 0 && flow.packagedProduced >= planned - EPS
        ? "completed"
        : hasProgress
          ? "active"
          : "pending";

    await tx
      .update(productionOrderLines)
      .set({
        printedRolls: String(flow.printedProduced),
        sentToCuttingRolls: String(flow.printedConsumed),
        cutRolls: String(flow.cutProduced),
        sentToPackagingRolls: String(flow.cutConsumed),
        packagedRolls: String(flow.packagedProduced),
        packagedQty: String(flow.packagedLabels),
        status: lineStatus,
        updatedAt: new Date(),
      })
      .where(eq(productionOrderLines.id, line.id));

    // The order moves to `production` on first progress. Completion stays a deliberate user
    // action (see production-order.helpers), so it is never set here.
    if (hasProgress) {
      await tx
        .update(productionOrders)
        .set({ status: "production", updatedAt: new Date() })
        .where(
          and(
            eq(productionOrders.id, row.productionOrderId),
            sql`${productionOrders.status} = 'planned'`
          )
        );
    }
  }
}

export interface SourceEdge {
  sourceBatchId: number;
  sourceBatchCode: string;
  rolls: number;
}

export interface TraceRow {
  id: number;
  batch_code: string;
  stage: BatchStage;
  produced_rolls: string;
  depth: number;
  rolls_from_source?: string | null;
  rolls_to_destination?: string | null;
}

export type { BatchStage, BatchStatus };

/** Rolls are numeric(12,2); rounding every write keeps float drift out of the comparisons. */
const EPS = 0.005;
function round2(n: number) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

export const batchFlowRepository = new BatchFlowRepository();
