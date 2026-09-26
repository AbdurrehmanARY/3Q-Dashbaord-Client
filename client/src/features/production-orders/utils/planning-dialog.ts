import type { PlanLineInput, ProductType, ProductionLineOverview } from "../types";
import type { PlanWovenInput, WovenLineOverview } from "../woven-types";

/**
 * The single mutation the planning dialog must fire for a given product type and
 * editing state. A discriminated union keeps every caller's shape explicit:
 * printed lines are identified by a string id, woven lines by a numeric one.
 */
export type PlanningSubmitTarget =
  | { kind: "create-printed"; body: PlanLineInput }
  | { kind: "update-printed"; lineId: string; body: PlanLineInput }
  | { kind: "create-woven"; body: PlanWovenInput }
  | { kind: "update-woven"; lineId: number; body: PlanWovenInput };

/**
 * Resolve which mutation the unified planning dialog should call.
 *
 * The product type alone decides the workflow — an editing line of the other
 * workflow is treated according to its `productType` argument, never by sniffing
 * the editing object's shape.
 */
export function resolvePlanningSubmitTarget(
  productType: ProductType,
  editing: ProductionLineOverview | WovenLineOverview | null | undefined,
  body: PlanLineInput | PlanWovenInput
): PlanningSubmitTarget {
  if (productType === "printed") {
    const printed = body as PlanLineInput;
    return editing
      ? { kind: "update-printed", lineId: String(editing.id), body: printed }
      : { kind: "create-printed", body: printed };
  }
  const woven = body as PlanWovenInput;
  return editing
    ? { kind: "update-woven", lineId: editing.id, body: woven }
    : { kind: "create-woven", body: woven };
}

/**
 * Default quantity the planning form opens with: the edited line's own quantity
 * when re-planning, otherwise everything on the order not yet planned.
 *
 * Woven lines carry `quantity` at the top level; printed lines nest it under
 * `planning`.
 */
export function resolvePlanningDefaultQuantity(
  editing: ProductionLineOverview | WovenLineOverview | null | undefined,
  remainingQty: number
): number {
  if (!editing) return remainingQty;
  return "quantity" in editing ? Number(editing.quantity) : Number(editing.planning.quantity);
}
