import { create } from "zustand";
import { FormBuilderState } from "@/types/type";

export const useFormBuilder = create<FormBuilderState>((set) => ({
  fields: [],
  addField: (field) =>
    set((state) => ({
      fields: [...state.fields, { ...field, id: crypto.randomUUID() }],
    })),
  updateField: (id, field) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...field } : f)),
    })),
  deleteField: (id) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    })),
}));
