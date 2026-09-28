import { describe, it, expect, vi } from "vitest";
import { getTableName } from "drizzle-orm";
import {
  batchConsumptions,
  machines,
  operators,
  productionBatches,
  productionOrderLines,
  wovenProductionLines,
} from "@db/schema";
import { BatchFlowRepository, labelShare, mixDenominator } from "./batch-flow.repository";
import type { LineRef } from "./batch-flow.helpers";

/**
 * The database handle is stubbed: this file exercises how the reads BUILD their queries, not the
 * database. `@db/index` eagerly validates env vars and opens a pool, so it must never load here.
 * The handle is mutable so a single test can swap in a fake that records its joins.
 */
const hoisted = vi.hoisted(() => ({ db: {} as unknown }));

vi.mock("@db/index", () => ({
  __esModule: true,
  get db() {
    return hoisted.db;
  },
}));

/**
 * Regression (reported from the floor):
 *
 *   POST /api/production/weaving-batches/lines/15  -> 400
 *   "Cannot assign 1998 pcs to weaving: 0 of the 40000 planned pcs remain unassigned"
 *
 * line 15 planned 40,000 pcs and had NO batches, yet the server answered "0 remain
 * unassigned" — so the first batch of a line could never be created. Cause: the guard read
 * its two figures as scalar sub-selects FROM `production_batches`. An outer query over a
 * table with no rows returns no rows at all, so the sub-selects never ran and the
 * `?? 0` fallbacks turned "40,000 planned, 0 assigned" into "0 remaining". The outer row
 * must therefore come from the LINE table, which always has exactly one row per line.
 *
 * The guard below is structural: it fails if the read ever targets `production_batches`
 * again, which is the shape that produced the bug.
 */
type FakeRow = { planned: string; assigned: string };

/** Records which table each read targets and returns canned rows for it. */
function fakeTx(rowsByTable: Record<string, FakeRow[]>) {
  const readTables: string[] = [];
  const tx = {
    select: () => ({
      from: (table: Parameters<typeof getTableName>[0]) => {
        const name = getTableName(table);
        readTables.push(name);
        return {
          where: () => ({
            limit: async () => rowsByTable[name] ?? [],
          }),
        };
      },
    }),
  };
  return { tx, readTables };
}

interface RemainingPlanned {
  remainingPlannedTx(tx: unknown, line: LineRef, excludeBatchId?: number): Promise<number>;
}

const repo = () => new BatchFlowRepository() as unknown as RemainingPlanned;

const WOVEN = getTableName(wovenProductionLines);
const PRINTED = getTableName(productionOrderLines);

describe("BatchFlowRepository.remainingPlannedTx", () => {
  it("reads a woven line's plan from woven_production_lines", async () => {
    const { tx, readTables } = fakeTx({
      [WOVEN]: [{ planned: "40000.00", assigned: "0" }],
    });

    await expect(repo().remainingPlannedTx(tx, { kind: "woven", id: 15 })).resolves.toBe(40000);
    expect(readTables).toEqual([WOVEN]);
    // The bug: a read from production_batches returns no row while it is empty, so the
    // whole plan looked already assigned.
    expect(readTables).not.toContain("production_batches");
  });

  it("reads a printed line's plan from production_order_lines", async () => {
    const { tx, readTables } = fakeTx({
      [PRINTED]: [{ planned: "120.00", assigned: "20.00" }],
    });

    await expect(repo().remainingPlannedTx(tx, { kind: "printed", id: 7 })).resolves.toBe(100);
    expect(readTables).toEqual([PRINTED]);
    expect(readTables).not.toContain("production_batches");
  });

  it("still honours excludeBatchId when re-checking an assignment", async () => {
    const { tx, readTables } = fakeTx({
      [WOVEN]: [{ planned: "40000.00", assigned: "38000.00" }],
    });

    await expect(
      repo().remainingPlannedTx(tx, { kind: "woven", id: 15 }, 42)
    ).resolves.toBe(2000);
    expect(readTables).toEqual([WOVEN]);
  });
});

/* ------------------------------------------------------------- order-wide reads */

type JoinKind = "inner" | "left";
interface Join {
  kind: JoinKind;
  table: string;
}

const BATCHES = getTableName(productionBatches);
const CONSUMPTIONS = getTableName(batchConsumptions);
const MACHINES = getTableName(machines);
const OPERATORS = getTableName(operators);
/** The two tables whose join decides whether the order read can see line-less batches. */
const LINE_TABLES: string[] = [PRINTED, WOVEN];

/**
 * A fake Drizzle handle that records HOW each table is joined, not what the database answers.
 * Any `innerJoin` on a line table throws immediately: that is the exact shape of the bug.
 */
function fakeDb(
  rowsByFrom: Record<string, unknown[]>,
  opts: { joins?: Join[]; mix?: unknown[] } = {}
) {
  const joins = opts.joins ?? [];

  const chainFor = (fromTable: string) => {
    const node: Record<string, (...args: unknown[]) => unknown> = {};
    node.leftJoin = (table) => {
      joins.push({ kind: "left", table: getTableName(table as never) });
      return node;
    };
    node.innerJoin = (table) => {
      const name = getTableName(table as never);
      if (LINE_TABLES.includes(name)) {
        throw new Error(`order read inner-joined ${name}: line-less batches would be dropped`);
      }
      joins.push({ kind: "inner", table: name });
      return node;
    };
    node.where = () => node;
    node.orderBy = async () => rowsByFrom[fromTable] ?? [];
    return node;
  };

  return {
    joins,
    select: () => ({ from: (table: unknown) => chainFor(getTableName(table as never)) }),
    execute: async () => opts.mix ?? [],
  };
}

/** A cutting batch as the live DB stores it: order-scoped, both line columns NULL. */
const cuttingRow = {
  id: 41,
  productionOrderId: 22,
  productionOrderLineId: null,
  wovenProductionLineId: null,
  stage: "cutting" as const,
  batchNumber: 1,
  batchCode: "C-001",
  machineId: null,
  machineName: null,
  operatorId: null,
  operatorName: null,
  labelSize: null,
  assignedRolls: "10000.00",
  producedRolls: "22000.00",
  wastedRolls: "0.00",
  consumedRolls: "0.00",
  availableRolls: "22000.00",
  packagedQty: "0.00",
  status: "COMPLETED" as const,
  notes: null,
  startedAt: null,
  completedAt: null,
  createdAt: new Date("2026-09-01T00:00:00Z"),
  updatedAt: new Date("2026-09-01T00:00:00Z"),
  // The LEFT join finds no line for this row, so the label type is honestly NULL.
  labelType: null,
};

/**
 * Regression (reported from the floor): the order-wide batch list showed a stage with batches on
 * the floor and nothing on screen.
 *
 * Cause: `findByOrder` filtered through an INNER JOIN on the line table
 * (`wovenProductionLines.productionOrderId = :id`). Cutting and packaging batches carry no line —
 * `production_batches_first_stage_one_line` forbids it for those stages — and an inner join drops
 * rows whose join key is NULL, so every one of them was excluded by construction.
 */
describe("BatchFlowRepository.findByOrder", () => {
  const findByOrder = (orderId = 22) =>
    new BatchFlowRepository().findByOrder(orderId, "woven", "cutting");

  it("returns an order-scoped cutting batch instead of dropping it", async () => {
    hoisted.db = fakeDb(
      { [BATCHES]: [cuttingRow], [CONSUMPTIONS]: [] },
      {
        // 6000 / 4000 of a 10 000 input: what the two label types contributed to this batch.
        mix: [
          {
            batch_id: 41,
            line_id: 15,
            rolls: "6000.00",
            assigned_rolls: "10000.00",
            label_type: "Size Label",
          },
          {
            batch_id: 41,
            line_id: 16,
            rolls: "4000.00",
            assigned_rolls: "10000.00",
            label_type: "Care Label",
          },
        ],
      }
    );

    const rows = await findByOrder();

    expect(rows).toHaveLength(1);
    const row = rows[0];
    expect(row.productionOrderLineId).toBeNull();
    expect(row.wovenProductionLineId).toBeNull();
    expect(row.labelType).toBeNull();
    // No consumption edges in this fixture; the shape must still be present.
    expect(row.sources).toEqual([]);
    // ...and the row explains itself: which label types fed it, and by how much.
    expect(row.labelMix.map((m) => [m.labelType, m.share])).toEqual([
      ["Size Label", 0.6],
      ["Care Label", 0.4],
    ]);
  });

  it("LEFT joins both line tables, so no batch can be filtered out by them", async () => {
    const joins: Join[] = [];
    hoisted.db = fakeDb({ [BATCHES]: [] }, { joins });

    await findByOrder();

    expect(joins.filter((j) => LINE_TABLES.includes(j.table)).map((j) => j.kind)).toEqual([
      "left",
      "left",
    ]);
    // Anchored on the batch's own order column, with machines/operators LEFT joined too.
    expect(joins.map((j) => j.table)).toEqual([PRINTED, WOVEN, MACHINES, OPERATORS]);
    expect(joins.every((j) => j.kind === "left")).toBe(true);
  });

  it("keeps the guard honest: inner-joining a line table throws", () => {
    const fake = fakeDb({});
    expect(() =>
      fake.select().from(productionBatches).innerJoin(wovenProductionLines, null)
    ).toThrow(/line-less batches would be dropped/);
  });

  it("skips the mix query when every row is a first-stage batch", async () => {
    let executed = 0;
    const fake = fakeDb({
      [BATCHES]: [{ ...cuttingRow, id: 7, stage: "weaving", labelType: "XL" }],
    });
    hoisted.db = {
      ...fake,
      execute: async () => {
        executed += 1;
        return [];
      },
    };

    const rows = await new BatchFlowRepository().findByOrder(22, "woven", "weaving");

    // The sources picker reads first-stage batches only: no mix query is wasted on them.
    expect(executed).toBe(0);
    expect(rows[0].labelMix).toEqual([]);
  });
});

/* ------------------------------------------------------------------- share math */

describe("mixDenominator / labelShare", () => {
  it("splits a 60/40 input into shares that sum to exactly 1", () => {
    const denominator = mixDenominator(10000, 10000);
    expect(labelShare(6000, denominator)).toBe(0.6);
    expect(labelShare(4000, denominator)).toBe(0.4);
    expect(labelShare(6000, denominator) + labelShare(4000, denominator)).toBe(1);
  });

  it("falls back to the batch's own input when assigned_rolls is 0", () => {
    // A zero denominator would attribute the batch's output to nobody and undercount totals.
    const denominator = mixDenominator(0, 10000);
    expect(denominator).toBe(10000);
    expect(labelShare(6000, denominator) + labelShare(4000, denominator)).toBe(1);
  });

  it("emits 0 — never NaN — when there is nothing to divide by", () => {
    expect(mixDenominator(0, 0)).toBe(0);
    expect(labelShare(5000, 0)).toBe(0);
    expect(labelShare(0, 0)).toBe(0);
    expect(Number.isNaN(labelShare(5000, 0))).toBe(false);
  });

  it("clamps a share into [0, 1] and rounds to 4 dp", () => {
    expect(labelShare(20000, 10000)).toBe(1);
    expect(labelShare(-5, 10000)).toBe(0);
    expect(labelShare(1, 3)).toBe(0.3333);
  });
});

