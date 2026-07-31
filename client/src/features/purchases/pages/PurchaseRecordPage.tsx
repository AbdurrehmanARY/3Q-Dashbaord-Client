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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchases & Receiving"
        description="Record incoming material and thread purchases. Stock is credited immediately."
        actions={
          tab === "materials" ? (
            <AppButton leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
              New Purchase
            </AppButton>
          ) : undefined
        }
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="materials">Material Purchases</TabsTrigger>
          <TabsTrigger value="thread">Thread Receiving</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-4">
          <PurchaseTable onCreateNew={() => setCreateOpen(true)} />
        </TabsContent>

        <TabsContent value="thread" className="mt-4">
          <ThreadPurchasePanel />
        </TabsContent>
      </Tabs>

      {createOpen && materials && (
        <PurchaseForm open materials={materials} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  );
}
