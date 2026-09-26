import { describe, it, expect, vi } from "vitest";
import { getTableName } from "drizzle-orm";
import { productionOrderLines, wovenProductionLines } from "@db/schema";
import { BatchFlowRepository } from "./batch-flow.repository";
import type { LineRef } from "./batch-flow.helpers";

/**
 * The database handle is stubbed: this file exercises how the availability guard BUILDS its
 * query, not the database. `@db/index` eagerly validates env vars and opens a pool, so it
 * must never load here.
 */
vi.mock("@db/index", () => ({ __esModule: true, db: {} }));

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
