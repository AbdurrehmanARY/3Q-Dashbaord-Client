import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  contactPerson: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

export type CompanySchemaInput = z.infer<typeof companySchema>;

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  companyId: z.coerce.number().int().positive("Company is required"),
});

export type BrandSchemaInput = z.infer<typeof brandSchema>;
