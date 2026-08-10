import { PageHeader } from "@/components/layout/PageHeader";
import { ThreadPurchasePanel } from "@/features/thread";

/**
 * Dedicated page for incoming raw thread receiving records.
 * Thread receiving credits undyed primary thread stock for woven label manufacturing.
 */
export function ThreadPurchasesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Thread Receiving"
        description="Incoming thread receiving records. Primary undyed thread stock is credited immediately upon receiving."
      />

      <ThreadPurchasePanel />
    </div>
  );
}
