import { AppDialog } from "@/components/dialogs/AppDialog";
import { formatNumber } from "@/lib/format";
import { PlanLabelTypeForm, type PlanFormSubmitPayload } from "./PlanLabelTypeForm";
import { usePlanLine, useUpdateLinePlan } from "../hooks/use-production-orders";
import { usePlanWovenLine } from "../hooks/use-woven-production";
import type { ProductType, ProductionLineOverview } from "../types";
import type { WovenLineOverview } from "../woven-types";
import { resolvePlanningSubmitTarget, resolvePlanningDefaultQuantity } from "../utils/planning-dialog";

interface UnifiedPlanningDialogProps {
  open: boolean;
  productType: ProductType;
  orderId: string;
  soNumber?: string;
  remainingQty: number;
  editing?: ProductionLineOverview | WovenLineOverview | null;
  onClose: () => void;
}

/**
 * The one planning dialog for both workflows — printed and woven, one label type or many.
 *
 * The workflow comes from `productType` alone and the form returns ready-made rows; this
 * dialog only routes them to the right mutation. With `editing` set the plan re-plans that
 * single existing record instead of creating new ones.
 */
export function UnifiedPlanningDialog({
  open,
  productType,
  orderId,
  soNumber,
  remainingQty,
  editing = null,
  onClose,
}: UnifiedPlanningDialogProps) {
  // Printed hooks
  const planLine = usePlanLine(orderId);
  const updateLinePlan = useUpdateLinePlan();

  // Woven hook
  const planWovenLine = usePlanWovenLine(orderId);

  const saving =
    productType === "printed"
      ? planLine.isPending || updateLinePlan.isPending
      : planWovenLine.isPending;

  /**
   * Rows are submitted in order. A later row failing (e.g. stock ran out) leaves the
   * earlier rows planned and visible — the same outcome as planning them one dialog at a
   * time, and every mutation already invalidates the order caches and toasts its error.
   */
  const handleSubmit = async (payload: PlanFormSubmitPayload) => {
    for (const row of payload.rows) {
      const target = resolvePlanningSubmitTarget(productType, editing, row);
      switch (target.kind) {
        case "update-printed":
          await updateLinePlan.mutateAsync({ lineId: target.lineId, body: target.body });
          break;
        case "create-printed":
          await planLine.mutateAsync(target.body);
          break;
        case "update-woven":
          await planWovenLine.mutateAsync({ lineId: target.lineId, body: target.body });
          break;
        case "create-woven":
          await planWovenLine.mutateAsync({ lineId: null, body: target.body });
          break;
      }
    }
    onClose();
  };

  const handleCancel = () => onClose();

  const isWoven = productType === "woven";

  // Woven lines carry `quantity` at the top level; printed lines nest it under `planning`.
  const defaultQuantity = resolvePlanningDefaultQuantity(editing, remainingQty);

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title={
        editing
          ? `Edit ${editing.labelType}`
          : isWoven
          ? "Plan Woven Production"
          : "Plan Printed Production"
      }
      description={
        soNumber
          ? `${soNumber} · ${formatNumber(remainingQty, 0)} labels unplanned`
          : isWoven
          ? "Plan every woven label type and allocate thread once for the whole plan."
          : "Plan every printed label type for this order — each row reserves its own material."
      }
      className="sm:max-w-3xl"
    >
      <PlanLabelTypeForm
        type={productType}
        remainingQty={remainingQty}
        editing={editing}
        defaultQuantity={defaultQuantity}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isDialogContent
      />
    </AppDialog>
  );
}
