import { FieldType } from "@/types/type";

export const createDefaultValues = (type: FieldType) => {
  const baseField = {
    required: false,
    description: "",
  };
  switch (type) {
    case "select":
    case "checkbox-group":
    case "radio-group":
      return {
        ...baseField,
        options: [{ label: "new option", value: crypto.randomUUID() }],
      };

    case "text":
    case "email":
    case "number":
    case "textarea":
      return {
        ...baseField,
        placeholder: "",
      };

    default:
      return baseField;
  }
};
