import * as React from "react";
import { TagIcon, PlusIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { AppCard } from "@/components/cards/AppCard";
import { EmptyContent } from "@/components/ui/empty";
import { DataTable, DataTableEmpty, DataTableToolbar } from "@/shared/components/data-table";
import { useCompanyBrands } from "../hooks/use-companies";
import { createBrandColumns } from "./brand-columns";
import { BrandDialog } from "./BrandDialog";
import type { Company } from "../types";

interface BrandTableProps {
  company: Company | null;
}

export function BrandTable({ company }: BrandTableProps) {
  const { data, isLoading } = useCompanyBrands(company?.id ?? null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const columns = React.useMemo(() => (company ? createBrandColumns(company) : []), [company]);

  return (
    <AppCard
      title={company ? `Brands — ${company.name}` : "Brands"}
      headerActions={
        <AppButton
          size="sm"
          leftIcon={<PlusIcon className="h-4 w-4" />}
          disabled={!company}
          onClick={() => setCreateOpen(true)}
        >
          Create Brand
        </AppButton>
      }
      contentClassName="p-0"
    >
      {!company ? (
        <DataTableEmpty icon={<TagIcon />} title="No company selected" description="Select a company to view its brands." />
      ) : (
        <DataTable
          columns={columns}
          data={data ?? []}
          loading={isLoading}
          getRowId={(row) => row.id}
          pagination={true}
          empty={
            <DataTableEmpty icon={<TagIcon />} title="No brands yet" description={`Create the first brand for ${company.name}.`}>
              <EmptyContent>
                <AppButton size="sm" onClick={() => setCreateOpen(true)}>
                  <PlusIcon className="h-4 w-4" />
                  Create Brand
                </AppButton>
              </EmptyContent>
            </DataTableEmpty>
          }
          toolbar={(table) => <DataTableToolbar table={table} searchPlaceholder="Search brands…" />}
        />
      )}

      {createOpen && company && (
        <BrandDialog open company={company} brand={null} onClose={() => setCreateOpen(false)} />
      )}
    </AppCard>
  );
}
