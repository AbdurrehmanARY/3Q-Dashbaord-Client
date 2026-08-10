import { PageHeader } from "@/components/layout/PageHeader";
import { UndyedThreadStockPanel } from "@/features/thread";

/**
 * Dedicated page for Undyed (Primary raw thread) stock.
 */
export function UndyedThreadStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Undyed Thread Stock"
        description="Raw undyed thread stock ledgers as purchased. Dyeing operations draw raw weight from this inventory."
      />

      <UndyedThreadStockPanel />
    </div>
  );
}
