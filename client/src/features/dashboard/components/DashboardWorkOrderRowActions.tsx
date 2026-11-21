import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import type { WorkOrderItem } from "../services/ceo-dashboard-service";

/**
 * Read-only row actions for the dashboard work-orders table.
 * Always shows a single "View" button that navigates to the work-order detail page.
 */
export function DashboardWorkOrderRowActions({ workOrder }: { workOrder: WorkOrderItem }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
      <AppButton
        variant="ghost"
        size="icon-sm"
        title={`View ${workOrder.soNumber}`}
        onClick={() => navigate(`/work-orders/${workOrder.productType}/${workOrder.id}`)}
      >
        <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
      </AppButton>
    </div>
  );
}
