import { FormField } from "@/types/type";

type FormValues = Record<string, string | string[] | number>;

export function createFormDefaultValues(config: FormField[]) {
  return config.reduce((acc, field) => {
    if (field.type === "checkbox-group") {
      acc[field.id] = [];
    } else if (field.type === "slider") {
      acc[field.id] = field.defaultValue || 1; 
    } else {
      acc[field.id] = "";
    }
    return acc;
  }, {} as FormValues);
}
