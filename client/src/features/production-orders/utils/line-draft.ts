import type {
  LinePlanning,
  ProductionLineOverview,
  ProductionOrderOverview,
  UpdateLineFullInput,
} from "../types";

/** Editable snapshot of one Production Progress row. Mirrors `UpdateLineFullInput` 1:1,
 * but with every field required so the inline table always has a value to render. */
export interface LineDraft {
  printedRolls: number;
  sentToCuttingRolls: number;
  cutRolls: number;
  sentToPackagingRolls: number;
  packagedRolls: number;
  packagedQty: number;
  printingMachineId: number | null;
  printingOperatorId: number | null;
  cuttingMachineId: number | null;
  cuttingOperatorId: number | null;
  packagingOperatorId: number | null;
}

export function lineToDraft(line: ProductionLineOverview): LineDraft {
  return {
    printedRolls: line.printing.printedRolls,
    sentToCuttingRolls: line.cutting.sentToCuttingRolls,
    cutRolls: line.cutting.cutRolls,
    sentToPackagingRolls: line.packaging.sentToPackagingRolls,
    packagedRolls: line.packaging.packagedRolls,
    packagedQty: line.packaging.packagedQty,
    printingMachineId: line.printing.machineId,
    printingOperatorId: line.printing.operatorId,
    cuttingMachineId: line.cutting.machineId,
    cuttingOperatorId: line.cutting.operatorId,
    packagingOperatorId: line.packaging.operatorId,
  };
}

/**
 * Pulls every downstream counter down to its new ceiling — lowering Printing to 8 drags
 * Cutting (and everything after it) to at most 8. Mirrors `cascadeChain` on the server.
 *
 * Downstream is only ever clamped **down**: raising Printing back to 10 does not un-cut
 * rolls that were never cut.
 */
export function cascadeDraft(draft: LineDraft, changed: keyof LineDraft): LineDraft {
  const order: (keyof LineDraft)[] = [
    "printedRolls",
    "sentToCuttingRolls",
    "cutRolls",
    "sentToPackagingRolls",
    "packagedRolls",
  ];
  const start = order.indexOf(changed);
  if (start === -1) return draft;

  const next = { ...draft };
  for (let i = start + 1; i < order.length; i++) {
    const upstream = Number(next[order[i - 1]]) || 0;
    const current = Number(next[order[i]]) || 0;
    (next as Record<string, unknown>)[order[i]] = Math.min(current, upstream);
  }
  return next;
}

/** Only the fields that actually changed — the row save should never resend the rest. */
export function diffLineDraft(original: LineDraft, draft: LineDraft): UpdateLineFullInput {
  const body: UpdateLineFullInput = {};
  (Object.keys(draft) as (keyof LineDraft)[]).forEach((key) => {
    if (draft[key] !== original[key]) {
      (body as Record<string, unknown>)[key] = draft[key];
    }
  });
  return body;
}

/**
 * Mirrors the server's chain validation in `production-order.service.ts`
 * (`updateLineFull`) for immediate inline feedback. Because the draft represents the
 * whole chain at once, only upper-bound checks are needed — internal consistency is
 * guaranteed once every link in the chain is <= the one before it.
 *
 *   printed <= totalRolls
 *   sentToCutting <= printed
 *   cut <= sentToCutting
 *   sentToPackaging <= cut
 *   packaged <= sentToPackaging
 *   packagedQty <= quantity
 */
export function validateLineDraft(
  draft: LineDraft,
  planning: LinePlanning
): Partial<Record<keyof LineDraft, string>> {
  const errors: Partial<Record<keyof LineDraft, string>> = {};

  if (draft.printedRolls < 0) errors.printedRolls = "Cannot be negative";
  else if (draft.printedRolls > planning.totalRolls) {
    errors.printedRolls = `Cannot exceed total rolls (${planning.totalRolls})`;
  }

  if (draft.sentToCuttingRolls < 0) errors.sentToCuttingRolls = "Cannot be negative";
  else if (draft.sentToCuttingRolls > draft.printedRolls) {
    errors.sentToCuttingRolls = `Cannot exceed printed (${draft.printedRolls})`;
  }

  if (draft.cutRolls < 0) errors.cutRolls = "Cannot be negative";
  else if (draft.cutRolls > draft.sentToCuttingRolls) {
    errors.cutRolls = `Cannot exceed cutting (${draft.sentToCuttingRolls})`;
  }

  if (draft.sentToPackagingRolls < 0) errors.sentToPackagingRolls = "Cannot be negative";
  else if (draft.sentToPackagingRolls > draft.cutRolls) {
    errors.sentToPackagingRolls = `Cannot exceed cutted (${draft.cutRolls})`;
  }

  if (draft.packagedRolls < 0) errors.packagedRolls = "Cannot be negative";
  else if (draft.packagedRolls > draft.sentToPackagingRolls) {
    errors.packagedRolls = `Cannot exceed packaging (${draft.sentToPackagingRolls})`;
  }

  if (draft.packagedQty < 0) errors.packagedQty = "Cannot be negative";
  else if (draft.packagedQty > planning.quantity) {
    errors.packagedQty = `Cannot exceed quantity (${planning.quantity})`;
  }

  return errors;
}

function completionPct(packaged: number, total: number): number {
  if (!(total > 0)) return 0;
  return Math.round((packaged / total) * 10000) / 100;
}

/**
 * Optimistic patch applied to the cached overview the instant Save is clicked — before
 * the server responds. Machine/operator IDs update immediately; their display NAMES
 * (looked up server-side) settle a moment later when `onSettled` refetches the real
 * overview, which happens automatically within one round trip.
 */
export function patchOverviewLine(
  overview: ProductionOrderOverview,
  lineId: number,
  body: UpdateLineFullInput
): ProductionOrderOverview {
  const lines = overview.lines.map((line): ProductionLineOverview => {
    if (line.id !== lineId) return line;

    const totalRolls = line.planning.totalRolls;
    const printedRolls = body.printedRolls ?? line.printing.printedRolls;
    const sentToCuttingRolls = body.sentToCuttingRolls ?? line.cutting.sentToCuttingRolls;
    const cutRolls = body.cutRolls ?? line.cutting.cutRolls;
    const sentToPackagingRolls = body.sentToPackagingRolls ?? line.packaging.sentToPackagingRolls;
    const packagedRolls = body.packagedRolls ?? line.packaging.packagedRolls;
    const packagedQty = body.packagedQty ?? line.packaging.packagedQty;

    return {
      ...line,
      printing: {
        ...line.printing,
        printedRolls,
        progressPct: completionPct(printedRolls, totalRolls),
        machineId: body.printingMachineId !== undefined ? body.printingMachineId : line.printing.machineId,
        operatorId: body.printingOperatorId !== undefined ? body.printingOperatorId : line.printing.operatorId,
      },
      cutting: {
        ...line.cutting,
        sentToCuttingRolls,
        cutRolls,
        progressPct: completionPct(cutRolls, totalRolls),
        machineId: body.cuttingMachineId !== undefined ? body.cuttingMachineId : line.cutting.machineId,
        operatorId: body.cuttingOperatorId !== undefined ? body.cuttingOperatorId : line.cutting.operatorId,
      },
      packaging: {
        ...line.packaging,
        sentToPackagingRolls,
        packagedRolls,
        packagedQty,
        progressPct: completionPct(packagedRolls, totalRolls),
        operatorId:
          body.packagingOperatorId !== undefined ? body.packagingOperatorId : line.packaging.operatorId,
      },
      liveProgress: {
        ...line.liveProgress,
        printedRolls,
        waitingForCutting: Math.max(printedRolls - sentToCuttingRolls, 0),
        sentToCuttingRolls,
        cutRolls,
        waitingForPackaging: Math.max(cutRolls - sentToPackagingRolls, 0),
        sentToPackagingRolls,
        packagedRolls,
        completionPct: completionPct(packagedRolls, totalRolls),
      },
    };
  });

  return { ...overview, lines };
}
