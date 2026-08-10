import { AppDialog } from "@/components/dialogs/AppDialog";
import { formatNumber } from "@/lib/format";
import { PlanLabelTypeForm } from "./PlanLabelTypeForm";
import { usePlanLine, useUpdateLinePlan } from "../hooks/use-production-orders";
import type { PlanLineInput, ProductionLineOverview } from "../types";

interface PlanLabelTypeDialogProps {
  open: boolean;
  orderId: string;
  soNumber?: string;
  remainingQty: number;
  editing?: ProductionLineOverview | null;
  onClose: () => void;
}

export function PlanLabelTypeDialog({
  open,
  orderId,
  soNumber,
  remainingQty,
  editing = null,
  onClose,
}: PlanLabelTypeDialogProps) {
  const planLine = usePlanLine(orderId);
  const updateLinePlan = useUpdateLinePlan();

  const handleSubmit = async (body: PlanLineInput) => {
    if (editing) {
      await updateLinePlan.mutateAsync({ lineId: String(editing.id), body });
    } else {
      await planLine.mutateAsync(body);
    }
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      title={editing ? `Edit ${editing.labelType}` : "Plan a Label Type"}
      description={
        soNumber
          ? `${soNumber} · ${formatNumber(remainingQty, 0)} labels unplanned`
          : "Reserve material, printing machine and operator for a label type."
      }
      className="sm:max-w-2xl"
    >
      <PlanLabelTypeForm
        remainingQty={remainingQty}
        editing={editing}
        saving={planLine.isPending || updateLinePlan.isPending}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isDialogContent
      />
    </AppDialog>
  );
}
