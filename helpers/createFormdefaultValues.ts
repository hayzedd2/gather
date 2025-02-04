import { FormField } from "@/types/type";

type FormValues = Record<string, string | string[]>;
export function createFormDefaultValues(config: FormField[]) {
  return config.reduce((acc, field) => {
    acc[field.id] = field.type == "checkbox-group" ? [] : "";
    return acc;
  }, {} as FormValues);
}
