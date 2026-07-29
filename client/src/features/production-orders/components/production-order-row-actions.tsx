import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import type { ProductionOrder } from "../types";

/**
 * The row itself is also clickable (see production-order-table.tsx) and does the same
 * navigation — this button is just a discoverable affordance for it, so it must stop
 * propagation to avoid double-firing.
 */
export function ProductionOrderRowActions({ order }: { order: ProductionOrder }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      <AppButton
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label={`Open ${order.productionNumber}`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/production-orders/${order.id}`);
        }}
      >
        <EyeIcon className="h-4 w-4" />
      </AppButton>
    </div>
  );
}
