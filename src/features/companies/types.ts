export interface Company {
  id: string;
  name: string;
  email: string | null;
  location: string | null;
  contactPerson: string | null;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  companyId: string;
  name: string;
  companyName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyInput {
  name: string;
  email?: string;
  location?: string;
}

export interface BrandInput {
  companyId: number;
  name: string;
}
