import { STAGES_OF, type BatchStage, type LineKind } from "../batch-types";

/** Which record owns a stage's batches. */
export type BatchScope = "line" | "order";

/**
 * Whether this stage's batches belong to ONE label type or to the WHOLE order.
 *
 * A workflow's first stage is per-label-type — Printing on the printed side, Weaving on the woven
 * — so its batches carry a line id and are read from the line endpoint. Cutting and packaging
 * span label types: `production_batches_first_stage_one_line` requires both line columns to be
 * NULL for them, so their batches belong to the order and must be read from the order endpoint.
 *
 * This is the decision the dashboard got wrong: asking the line endpoint for cutting or packaging
 * can only ever answer `[]`, because a batch with no line cannot match a line filter. Panels that
 * ignore the scope look empty even when the floor is full of batches.
 */
export function batchScopeOf(kind: LineKind, stage: BatchStage): BatchScope {
  return STAGES_OF[kind][0] === stage ? "line" : "order";
}

/** True for the stages whose batches are keyed by the order rather than by a label type. */
export function isOrderScopedStage(kind: LineKind, stage: BatchStage): boolean {
  return batchScopeOf(kind, stage) === "order";
}

/** True for the first stage of a workflow, which is keyed by the production line / label type. */
export function isLineScopedStage(kind: LineKind, stage: BatchStage): boolean {
  return batchScopeOf(kind, stage) === "line";
}

/**
 * True when EVERY workflow makes this stage order-scoped — cutting and packaging. Unlike
 * {@link isOrderScopedStage}, this needs no `kind`: callers that hold a stage but not the order's
 * workflow (the create mutation, for instance) can still tell a shared stage from the two
 * first stages, which are line-scoped in their own workflow and simply absent from the other.
 *
 * Derived from the workflow stage lists rather than hard-coded, so a stage cannot drift out of
 * this answer while a URL keeps pointing at it.
 */
export function isOrderScopedOnEveryWorkflow(stage: BatchStage): boolean {
  return (Object.keys(STAGES_OF) as LineKind[]).every((kind) => isOrderScopedStage(kind, stage));
}

/** Which record a new batch must be POSTed against: its production line, or its order. */
export type BatchCreateTarget =
  | { scope: "line"; lineId: number }
  | { scope: "order"; orderId: string };

/**
 * The endpoint a new batch of `stage` belongs to, given whichever ids the caller happens to hold.
 *
 * Order-scoped stages are created against the ORDER (`/production/orders/:stage-batches/:orderId`).
 * Every board renders them, so a caller can easily still be carrying the line id of the board it is
 * drawn under; letting that line win would POST to a URL that claims a line the schema forbids —
 * `createBatch` writes `line: null` for those stages regardless, so the line id would be noise.
 * The order therefore wins for them whenever it is known.
 *
 * `null` means neither id can express the batch — the caller must report that rather than POST.
 */
export function batchCreateTarget(
  stage: BatchStage,
  ids: { lineId?: number; orderId?: string }
): BatchCreateTarget | null {
  const orderId = ids.orderId;
  if (orderId && (isOrderScopedOnEveryWorkflow(stage) || ids.lineId === undefined)) {
    return { scope: "order", orderId };
  }
  if (ids.lineId !== undefined) return { scope: "line", lineId: ids.lineId };
  return null;
}
