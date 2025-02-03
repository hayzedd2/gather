import { FormField } from "@/types/type";
import { z } from "zod";

export function generateZodSchema(config: FormField[]) {
  const schemaObject: Record<string, z.ZodType<any>> = {};

  config.forEach((field) => {
    let fieldSchema: z.ZodType<any>;

    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.minLength,
            `${field.label || "Text"} must be at least ${
              field.validation.minLength
            } characters`
          );
        }
        if (field.validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.maxLength,
            `${field.label || "Text"} must be at most ${
              field.validation.maxLength
            } characters`
        );
        }
        break;

      case "email":
        fieldSchema = z
          .string()
          .email(`${field.label || "Email"} must be a valid email`);
        break;

      case "number":
        fieldSchema = z.number({
          invalid_type_error: `${field.label || "This field"} must be a number`,
        });
        if (field.validation?.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            field.validation.min,
            `${field.label || "This field"} must be at least ${
              field.validation.min
            }`
          );
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            field.validation.max,
            `${field.label || "This field"} must be at most ${field.validation.max}`
          );
        }
        break;

      case "textarea":
        fieldSchema = z.string();
        if (field.validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.minLength,
            `${field.label || "Textarea"} must be at least ${
              field.validation.minLength
            } characters`
          );
        }
        if (field.validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.maxLength,
            `${field.label || "Textarea"} must be at most ${
              field.validation.maxLength
            } characters`
          );
        }
        break;

      case "select":
        fieldSchema = z
          .string()
          .refine(
            (value) =>
              field.options.some(
                (opt: Record<string, string>) => opt.value === value
              ),
            `Please select a valid ${field.label || "option"}`
          );
        break;

      case "checkbox-group":
        fieldSchema = z
          .array(z.string())
          .refine(
            (values) =>
              values.every((value) =>
                field.options.some(
                  (opt: Record<string, string>) => opt.value === value
                )
              ),
            `Invalid selections for ${field.label || "checkbox group"}`
          );
        break;

      case "radio-group":
        fieldSchema = z
          .string()
          .refine(
            (value) =>
              field.options.some(
                (opt: Record<string, string>) => opt.value === value
              ),
            `Please select a valid ${field.label || "option"}`
          );
        break;

      default:
        fieldSchema = z.string();
    }

    schemaObject[field.id] = field.required
      ? fieldSchema
      : fieldSchema.optional();
  });

  return z.object(schemaObject);
}
