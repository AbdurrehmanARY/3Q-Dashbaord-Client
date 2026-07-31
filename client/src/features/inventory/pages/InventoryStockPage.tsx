import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryStockTable } from "../components/inventory-stock-table";
import { ThreadStockPanel } from "@/features/thread";

/**
 * One inventory screen covering both product lines: rolls feed the printed workflow,
 * thread feeds the woven one. They are separate ledgers with different units (rolls vs kg)
 * and different rules, so they get their own tabs rather than one blended table.
 */
export function InventoryStockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Roll stock for printed labels and thread stock for woven labels."
      />

      <Tabs defaultValue="rolls">
        <TabsList>
          <TabsTrigger value="rolls">Roll Stock</TabsTrigger>
          <TabsTrigger value="thread">Thread Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="rolls" className="mt-4">
          <InventoryStockTable />
        </TabsContent>

        <TabsContent value="thread" className="mt-4">
          <ThreadStockPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
