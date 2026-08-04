import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { SegmentedTabs, type SegmentedOption } from "@/shared/components/segmented-tabs";
import { useMaterials } from "@/features/materials";
import { ThreadPurchasePanel } from "@/features/thread";
import { PurchaseForm } from "../components/PurchaseForm";
import { PurchaseTable } from "../components/purchase-table";

type PurchaseTab = "materials" | "thread";

const TABS: SegmentedOption<PurchaseTab>[] = [
  { value: "materials", label: "Material Purchases" },
  { value: "thread", label: "Thread Receiving" },
];

/**
 * Receiving for both product lines. Material purchases credit roll stock (printed labels);
 * thread receipts credit undyed thread stock (woven labels). The two have different fields
 * and different formulas, so each gets its own view rather than a blended form.
 */
export function PurchaseRecordPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [tab, setTab] = useState<PurchaseTab>("materials");
  const { data: materials } = useMaterials();

  const isMaterials = tab === "materials";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchases & Receiving"
        description="Incoming material and thread. Stock is credited immediately — there is no approval step."
        actions={
          isMaterials ? (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Purchase
            </AppButton>
          ) : undefined
        }
      />

      {/* The product-line switcher sits directly above the table it controls. */}
      <div className="space-y-4">
        <SegmentedTabs
          options={TABS}
          value={tab}
          onChange={setTab}
          aria-label="Choose which product line to receive for"
        />

        {isMaterials ? (
          <PurchaseTable onCreateNew={() => setCreateOpen(true)} />
        ) : (
          <ThreadPurchasePanel />
        )}
      </div>

      {createOpen && materials && (
        <PurchaseForm open materials={materials} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  );
}
