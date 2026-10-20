/**
 * The rules behind the "Edit batch" dialog, kept out of the component so they can be
 * tested without rendering anything.
 *
 * Two ceilings here are easy to get wrong from the client, because the figure a READ
 * returns is not the figure the WRITE checks:
 *
 *   1. SOURCES.  The `availableRolls` a source reports already has this batch's own hold
 *      deducted - the hold counts as consumed. The write path credits that hold back
 *      (`replaceSourcesTx` -> `releaseAllSourcesTx`) before it re-locks, so the ceiling
 *      the server actually enforces is the live availability PLUS what this batch still
 *      holds from that source. Without the addition, a batch that is a source's only
 *      taker could not even re-submit its own unchanged allocation.
 *
 *   2. PLAN.  `remainingPlanned` from the line read subtracts EVERY live first-stage
 *      assignment, including this batch's own. The server's guard
 *      (`remainingPlannedTx(tx, line, batchId)`) excludes the batch being edited, so the
 *      ceiling is the reported figure PLUS this batch's own assignment.
 *
 * Both paths are additionally floored by `editFloor` (produced + wasted), which neither
 * may drop below - the server refuses it in both branches too.
 */
import { formatNumber } from "@/lib/format";
import {
  UNIT_LABEL,
  type BatchSourceOption,
  type LineKind,
  type ProductionBatch,
  type SizeAssignment,
  type UpdateBatchInput,
} from "../batch-types";

/** Matches the server's `EPS`: how far a figure may drift before it counts as short. */
const EPS = 0.01;

const round2 = (n: number) => Math.round(n * 100) / 100;

/** The word for one whole unit of a line's quantity - "Rolls" or "Pieces". */
export function wholeUnitWord(kind: LineKind): string {
  return kind === "woven" ? "Pieces" : "Rolls";
}

/**
 * How far a batch's input can never fall: what it has already produced plus what it has
 * already scrapped. The first-stage guard and `replaceSourcesTx` both enforce it, so the
 * dialog states it before the server has to.
 */
export function editFloor(batch: ProductionBatch): number {
  return round2(Number(batch.producedRolls) + Number(batch.wastedRolls));
}

/** `sourceBatchId -> rolls` this batch currently holds from that source. */
export function ownEdgesOf(batch: ProductionBatch): Record<number, number> {
  const edges: Record<number, number> = {};
  for (const e of batch.sources) edges[e.sourceBatchId] = Number(e.rolls);
  return edges;
}

/**
 * How much of an upstream batch an EDIT may still take - see note (1) at the top of this
 * file for why the batch's own hold is added back.
 */
export function editSourceCap(option: BatchSourceOption, own: Record<number, number>): number {
  return option.availableRolls + (own[option.sourceBatchId] ?? 0);
}

/** The plan ceiling for a first-stage assignment while editing - see note (2). */
export function firstStageCap(remainingPlanned: number, batch: ProductionBatch): number {
  return Math.max(0, round2(remainingPlanned)) + Number(batch.assignedRolls);
}

/**
 * The source rows an edit should offer: whatever the live query returned, PLUS every
 * upstream batch this batch still holds.
 *
 * `getAvailableSources` hides a source with nothing left - which is exactly the state a
 * source is in when this batch is its only taker. Letting that filter through here would
 * drop the batch's own edge the moment the user saved, so held sources are re-added at
 * zero live availability; `editSourceCap` then credits the hold back and the row stays
 * editable. Held rows lead, since a batch's own input is what the user came to review.
 */
export function mergeEditSources(
  options: BatchSourceOption[],
  batch: ProductionBatch
): BatchSourceOption[] {
  const seen = new Set(options.map((o) => o.sourceBatchId));
  const held: BatchSourceOption[] = [];

  for (const e of batch.sources) {
    if (seen.has(e.sourceBatchId)) continue;
    seen.add(e.sourceBatchId);
    held.push({
      sourceBatchId: e.sourceBatchId,
      batchCode: e.sourceBatchCode,
      producedRolls: 0,
      availableRolls: 0,
      machineName: null,
      operatorName: null,
      // A placeholder status only: this row exists because the live read filtered it out,
      // so its true status is unknown here. Nothing renders it - SourcePicker draws the
      // code, the cap and the machine name, and the cap for such a row comes from
      // `editSourceCap`, not from these figures.
      status: "IN_PROGRESS",
    });
  }

  return [...held, ...options];
}

/** Everything the edit rules need to judge a form. */
export interface BatchEditValues {
  batch: ProductionBatch;
  /** Decides the unit word in every message below. */
  kind: LineKind;
  /** Printing and weaving draw from the plan; cutting and packaging from upstream batches. */
  fromPlan: boolean;
  assignedRolls: string;
  allocations: Record<number, string>;
  machineId: string;
  operatorId: string;
  labelSize: string;
  notes: string;
  /** False for packaging, which is done by hand. */
  requiresMachine: boolean;
  /** Planned sizes of a woven Size Label line - empty for every other line. */
  sizeTracking: SizeAssignment[];
  /** Plan left as the line read reports it - still counting this batch's own assignment. */
  remainingPlanned: number;
  /** Upstream rows, already merged with the sources this batch still holds. */
  sources: BatchSourceOption[];
}

/**
 * Every reason the form cannot be saved, worded the way the server would word it. The
 * server still has the final say - this only turns its 409s into prompts the user can act
 * on while the form is still in front of them.
 */
export function validateBatchEdit(v: BatchEditValues): string | null {
  if (v.requiresMachine && !v.machineId) return "Select a machine";
  if (!v.operatorId) return "Select an operator";

  const unit = UNIT_LABEL[v.kind];
  const whole = wholeUnitWord(v.kind);
  const floor = editFloor(v.batch);

  if (v.fromPlan) {
    if (v.sizeTracking.length > 0 && !v.labelSize) {
      return "Select which planned size this batch weaves";
    }

    const rolls = Number(v.assignedRolls);
    if (v.assignedRolls.trim() === "" || !Number.isFinite(rolls)) {
      return `Enter how many ${unit} to assign`;
    }
    if (!Number.isInteger(rolls) || rolls <= 0) {
      return `${whole} are whole units - enter 1, 2, 3...`;
    }
    if (rolls < floor - EPS) {
      return `Cannot go below ${formatNumber(floor, 0)} ${unit} - ${floorPhrase(v.batch)} already`;
    }
    const cap = firstStageCap(v.remainingPlanned, v.batch);
    if (rolls > cap + EPS) {
      return `Only ${formatNumber(cap, 0)} unassigned ${unit} are left for this label type`;
    }
    return null;
  }

  const own = ownEdgesOf(v.batch);
  let total = 0;
  let taken = 0;

  for (const s of v.sources) {
    const raw = (v.allocations[s.sourceBatchId] ?? "").trim();
    if (raw === "") continue;

    const want = Number(raw);
    if (!Number.isFinite(want) || !Number.isInteger(want) || want < 0) {
      return `${whole} are whole units - enter 1, 2, 3...`;
    }
    if (want === 0) continue;

    const cap = editSourceCap(s, own);
    if (want > cap + EPS) {
      return `${s.batchCode} has only ${formatNumber(cap, 0)} ${unit} available`;
    }
    taken += 1;
    total += want;
  }

  // `replaceSourcesTx` refuses an empty set outright - a batch always draws from somewhere.
  if (taken === 0) return "Keep at least one source batch";
  if (total < floor - EPS) {
    return `Cannot reduce the input below ${formatNumber(floor, 0)} ${unit} - ${floorPhrase(v.batch)} already`;
  }
  return null;
}

/** "produced or wasted", "produced", "wasted" - whichever this batch has actually done. */
function floorPhrase(batch: ProductionBatch): string {
  const produced = Number(batch.producedRolls) > 0;
  const wasted = Number(batch.wastedRolls) > 0;
  if (produced && wasted) return "produced or wasted";
  if (produced) return "produced";
  return "wasted";
}

/**
 * The PATCH body. Every editable field is sent rather than diffed - the server treats a
 * value identical to the stored one as a no-op, and a partial body would need
 * "leave this alone" semantics that `machineId: null` (packaging has no machine) cannot
 * express anyway.
 */
export function buildBatchUpdateBody(v: BatchEditValues): UpdateBatchInput {
  const shared = {
    machineId: v.machineId ? Number(v.machineId) : null,
    operatorId: Number(v.operatorId),
    notes: v.notes.trim() || null,
  };

  if (v.fromPlan) {
    return {
      ...shared,
      assignedRolls: Number(v.assignedRolls),
      labelSize: v.labelSize.trim() || null,
    };
  }

  return {
    ...shared,
    sources: v.sources
      .filter((s) => Number(v.allocations[s.sourceBatchId] ?? 0) > 0)
      .map((s) => ({
        sourceBatchId: s.sourceBatchId,
        rolls: Number(v.allocations[s.sourceBatchId]),
      })),
  };
}
