import { PageHeader } from "@/components/layout/PageHeader";
import { MachineTable } from "../components/machine-table";

export function MachinesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Machines"
        description="Manage production machines. Availability updates live from production jobs holding them."
      />
      <MachineTable />
    </div>
  );
}
