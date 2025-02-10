import { FormSettingProps } from "@/types/type";
import { create } from "zustand";

interface useSettingsFormStoreProps {
  settingFields: FormSettingProps;
  saveFields: (settingFields: FormSettingProps) => void;
  resetSettingsFields: () => void;
}
export const useSettingsFormStore = create<useSettingsFormStoreProps>(
  (set) => ({
    settingFields: {
      title: "",
      description: "",
      buttonCtaText: "",
      saveAsTemplate: false,
    },
    resetSettingsFields: () =>
      set({
        settingFields: {
          title: "",
          description: "",
          buttonCtaText: "",
          saveAsTemplate: false,
        },
      }),
    saveFields: (fields) => set({ settingFields: fields }),
  })
);
