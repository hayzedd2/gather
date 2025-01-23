import { create } from "zustand";

interface selectedFieldState {
    selectedField: string | null;
    setSelectedField: (fieldId: string) => void;
}
export const useSelectedFieldStore = create<selectedFieldState>((set)=>({
    selectedField: null,
    setSelectedField: (fieldId) => set({selectedField: fieldId})
}))