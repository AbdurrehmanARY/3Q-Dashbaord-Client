import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import type { ProductionItem } from "../services/ceo-dashboard-service";

/**
 * Read-only row actions for the dashboard production-orders table.
 * Always shows a single "View" button that navigates to the production-order detail page.
 */
export function DashboardProductionOrderRowActions({ order }: { order: ProductionItem }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
      <AppButton
        variant="ghost"
        size="icon-sm"
        title={`View ${order.productionNumber}`}
        onClick={() => navigate(`/production-orders/${order.id}`)}
      >
        <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
      </AppButton>
    </div>
  );
}
