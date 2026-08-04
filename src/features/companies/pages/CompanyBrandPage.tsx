import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompanyTable } from "../components/CompanyTable";
import { BrandTable } from "../components/BrandTable";
import type { Company } from "../types";

export function CompanyBrandPage() {
  const [selected, setSelected] = useState<Company | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company & Brands"
        description="Manage client companies and their associated brands."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <CompanyTable selected={selected} onSelect={setSelected} />
        <BrandTable company={selected} />
      </div>
    </div>
  );
}
