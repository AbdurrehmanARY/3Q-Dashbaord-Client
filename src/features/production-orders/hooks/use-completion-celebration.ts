import { useEffect, useRef } from "react";
import { celebrateCompletion } from "@/lib/celebrate";
import type { ProductionOrderStatus } from "../types";

/**
 * Fires the completion celebration (party poppers + congratulation chime) exactly once,
 * on the transition INTO `complete` — i.e. the moment the last label type is fully
 * packaged. Opening an order that is already complete does NOT re-celebrate, because the
 * previous status is seeded on mount so there's no false transition.
 */
export function useCompletionCelebration(status: ProductionOrderStatus | undefined): void {
  const previous = useRef<ProductionOrderStatus | undefined>(status);

  useEffect(() => {
    const prev = previous.current;
    if (prev && prev !== "complete" && status === "complete") {
      celebrateCompletion();
    }
    previous.current = status;
  }, [status]);
}
