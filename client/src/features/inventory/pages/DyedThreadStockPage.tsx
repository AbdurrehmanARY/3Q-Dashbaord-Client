import { PageHeader } from "@/components/layout/PageHeader";
import { DyedThreadStockPanel } from "@/features/thread";

/**
 * Dedicated page for Dyed (Secondary processed color thread) stock.
 */
export function DyedThreadStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dyed Thread Stock"
        description="Processed color thread stock produced by dyeing operations. Woven label planning draws from this pool."
      />

      <DyedThreadStockPanel />
    </div>
  );
}
