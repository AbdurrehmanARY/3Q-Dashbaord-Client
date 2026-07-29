import { PageHeader } from "@/components/layout/PageHeader";
import { MachineTable } from "../components/machine-table";
import { OperatorTable } from "../components/operator-table";

export function MachinesOperatorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Machines & Operators"
        description="Manage production machines and operators. Availability updates live from the production jobs holding them."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <MachineTable />
        <OperatorTable />
      </div>
    </div>
  );
}
