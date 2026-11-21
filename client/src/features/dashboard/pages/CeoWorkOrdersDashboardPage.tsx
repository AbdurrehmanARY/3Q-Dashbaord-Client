import { useLocation, useNavigate } from "react-router-dom";
import { PrintedWorkOrderListPage } from "@/features/work-orders/printed/pages/PrintedWorkOrderListPage";
import { WovenWorkOrderListPage } from "@/features/work-orders/woven/pages/WovenWorkOrderListPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Factory } from "lucide-react";

/**
 * CEO Dashboard for Work Orders - with tabs to switch between Printed and Woven.
 * Reads the current URL to determine active tab and renders the appropriate list.
 * Each tab has its own URL so refresh/deep-links preserve the selection.
 */
export function CeoWorkOrdersDashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isWoven = location.pathname.includes("/woven");

  const handleTabChange = (value: string) => {
    const newPath =
      value === "woven"
        ? "/dashboard/ceo/work-orders/woven"
        : "/dashboard/ceo/work-orders/printed";
    navigate(newPath);
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={isWoven ? "woven" : "printed"}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="printed">
            <FileText className="mr-2 h-4 w-4" />
            Printed Work Orders
          </TabsTrigger>
          <TabsTrigger value="woven">
            <Factory className="mr-2 h-4 w-4" />
            Woven Work Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="printed" className="mt-4">
          <PrintedWorkOrderListPage readOnly />
        </TabsContent>
        <TabsContent value="woven" className="mt-4">
          <WovenWorkOrderListPage readOnly />
        </TabsContent>
      </Tabs>
    </div>
  );
}