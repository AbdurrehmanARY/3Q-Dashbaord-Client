import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppButton } from "@/components/forms/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMaterials } from "@/features/materials";
import { ThreadPurchasePanel } from "@/features/thread";
import { PurchaseForm } from "../components/PurchaseForm";
import { PurchaseTable } from "../components/purchase-table";

/**
 * Receiving for both product lines. Material purchases credit roll stock (printed labels);
 * thread receipts credit undyed thread stock (woven labels). The two have different fields
 * and different formulas, so each gets its own tab rather than a blended form.
 */
export function PurchaseRecordPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [tab, setTab] = useState("materials");
  const { data: materials } = useMaterials();

  const isMaterials = tab === "materials";

  return (
    // The product-line switcher sits at the very top: which line you're receiving for is the
    // first decision, and it changes the header, the action button and the whole body below.
    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
      <TabsList className="w-full sm:w-auto">
        <TabsTrigger value="materials" className="flex-1 sm:flex-none">
          Material Purchases
        </TabsTrigger>
        <TabsTrigger value="thread" className="flex-1 sm:flex-none">
          Thread Receiving
        </TabsTrigger>
      </TabsList>

      <PageHeader
        title={isMaterials ? "Material Purchases" : "Thread Receiving"}
        description={
          isMaterials
            ? "Incoming material for printed labels. Approved quantities credit roll stock immediately."
            : "Incoming thread for woven labels. Received weight credits undyed (primary) stock immediately."
        }
        actions={
          isMaterials ? (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Purchase
            </AppButton>
          ) : undefined
        }
      />

      <TabsContent value="materials">
        <PurchaseTable onCreateNew={() => setCreateOpen(true)} />
      </TabsContent>

      <TabsContent value="thread">
        <ThreadPurchasePanel />
      </TabsContent>

      {createOpen && materials && (
        <PurchaseForm open materials={materials} onClose={() => setCreateOpen(false)} />
      )}
    </Tabs>
  );
}
