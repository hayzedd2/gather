export type FieldType = "text" | "number" | "email" | "select";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface FormBuilderState {
  fields: FormField[];
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
}
