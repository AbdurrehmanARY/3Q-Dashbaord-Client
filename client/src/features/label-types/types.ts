export interface LabelType {
  id: number;
  name: string;
  category: "woven" | "printed";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLabelTypeInput {
  name: string;
  category: "woven" | "printed";
}

export interface UpdateLabelTypeInput {
  name?: string;
  category?: "woven" | "printed";
  isActive?: boolean;
}