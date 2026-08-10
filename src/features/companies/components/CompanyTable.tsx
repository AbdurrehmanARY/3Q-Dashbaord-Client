import * as React from "react";
import { Building2Icon, PlusIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { AppCard } from "@/components/cards/AppCard";
import { EmptyContent } from "@/components/ui/empty";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { useCompanies } from "../hooks/use-companies";
import { companyColumns } from "./company-columns";
import { CompanyDialog } from "./CompanyDialog";
import type { Company } from "../types";

interface CompanyTableProps {
  selected: Company | null;
  onSelect: (company: Company) => void;
}

/** Companies are selectable rows — clicking one filters the Brands table alongside it. */
export function CompanyTable({ selected, onSelect }: CompanyTableProps) {
  const { data, isLoading } = useCompanies();
  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <AppCard
      title="Companies"
      headerActions={
        <AppButton size="sm" leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
          Create Company
        </AppButton>
      }
      contentClassName="p-0"
    >
      <DataTable
        columns={companyColumns}
        data={data ?? []}
        loading={isLoading}
        getRowId={(row) => row.id}
        pagination={true}
        onRowClick={onSelect}
        isRowActive={(row) => row.id === selected?.id}
        empty={
          <DataTableEmpty icon={<Building2Icon />} title="No companies yet" description="Create the first client company.">
            <EmptyContent>
              <AppButton size="sm" onClick={() => setCreateOpen(true)}>
                <PlusIcon className="h-4 w-4" />
                Create Company
              </AppButton>
            </EmptyContent>
          </DataTableEmpty>
        }
        toolbar={(table) => <DataTableToolbar table={table} searchPlaceholder="Search companies…" />}
      />

      {createOpen && <CompanyDialog open company={null} onClose={() => setCreateOpen(false)} />}
    </AppCard>
  );
}
