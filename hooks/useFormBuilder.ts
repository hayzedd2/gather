import { create } from "zustand";
import { FormBuilderState, FormField } from "@/types/type";
import { createDefaultValues } from "@/helpers/createDefaultValues";

export const useFormBuilder = create<FormBuilderState>((set) => ({
  fields: [], 
  resetFields: () => set({ fields: [] }),
  setFields: (newFields) => set({ fields: newFields }),
  addField: (field) => set((state) => {
    const defaultValues = createDefaultValues(field.type);
    const newField: FormField = {
      ...defaultValues,
      ...field,
      id: crypto.randomUUID(),
      label: field.label.trim().length === 0 ? "Untitled Field" : field.label,
    } as FormField;

    return {
      fields: [...state.fields, newField],
    };
  }),

  updateField: (id, updates) => set((state) => ({
    fields: state.fields.map((field) => 
      field.id === id 
        ? { ...field, ...updates } as FormField
        : field
    ),
  })),

  deleteField: (id) => set((state) => ({
    fields: state.fields.filter((field) => field.id !== id),
  })),
}));
