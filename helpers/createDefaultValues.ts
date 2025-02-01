import { FieldType } from "@/types/type";

export const createDefaultValues = (type: FieldType)=> {
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
        options: [
          { label: "Option 1", value: "option-1" },
        ],
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
