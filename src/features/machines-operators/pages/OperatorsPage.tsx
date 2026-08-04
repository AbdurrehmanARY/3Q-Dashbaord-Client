import { PageHeader } from "@/components/layout/PageHeader";
import { OperatorTable } from "../components/operator-table";

export function OperatorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operators"
        description="Manage floor operators. Availability updates live from production jobs holding them."
      />
      <OperatorTable />
    </div>
  );
}
