import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { ProductionOrder, ProductionOrderLine } from "../types";

interface ProductionOrderDashboardProps {
  orderId: number;
  title: string;
  order: ProductionOrder;
  lines?: ProductionOrderLine[];
}

export function ProductionOrderDashboard({
  orderId,
  title,
  order,
  lines = [],
}: ProductionOrderDashboardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Production Number
            </span>
            <span className="font-mono text-sm">{order.productionNumber}</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Status
            </span>
            <Badge variant="outline">{order.status}</Badge>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Total Qty
            </span>
            <span className="text-sm">{order.totalQty}</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              SO Number
            </span>
            <span className="text-sm">{order.soNumber}</span>
          </div>
        </CardContent>
      </Card>

      {lines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Production Lines ({lines.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-muted-foreground">Label Type</th>
                    <th className="text-left text-muted-foreground">Quantity</th>
                    <th className="text-left text-muted-foreground">Status</th>
                    <th className="text-left text-muted-foreground">Rolls</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.id} className="border-b">
                      <td className="py-2">{line.labelType}</td>
                      <td className="py-2">{line.quantity}</td>
                      <td className="py-2">
                        <Badge variant="outline">{line.status}</Badge>
                      </td>
                      <td className="py-2">{line.totalRolls}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ProductionOrderDashboard;