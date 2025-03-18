import { FormField } from "@/types/type";
import { z, ZodString } from "zod";

export function generateZodSchema(config: FormField[]) {
  const schemaObject: Record<string, z.ZodType<any>> = {};
  config.forEach((field) => {
    let fieldSchema: z.ZodType<any>;
    switch (field.type) {
      case "text":

      case "textarea":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label || "This field"} is required`
          );
        }
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
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).email(
            `${field.label || "Email"} must be a valid email`
          );
        }

        break;

      case "number":
        fieldSchema = z.coerce.number({
          invalid_type_error: `${field.label || "This field"} must be a number`,
        });
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            1,
            `${field.label || "This field"} is required`
          );
        }
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
            `${field.label || "This field"} must be at most ${
              field.validation.max
            }`
          );
        }
        break;
      case "slider":
      case "rating":
        fieldSchema = z.coerce.number({
          invalid_type_error: `${field.label || "This field"} must be a number`,
        });
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            1,
            `${field.label || "This field"} is required`
          );
        }
        break;
      case "select":
      case "radio-group":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as ZodString).min(
            1,
            `${field.label || "This field"} is required`
          );
        }
        break;
      case "switch":
        fieldSchema = z.coerce.boolean();

        break;

      case "checkbox-group":
        fieldSchema = z.array(z.string());
        if (field.required) {
          fieldSchema = z
            .array(z.string())
            .refine((value) => value.some((item) => item), {
              message: "You have to select at least one item.",
            });
        }

        break;
      case "date":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = z.string().refine(
            (val) => {
              if (val === "") return false;
              const parsed = new Date(val);
              return !isNaN(parsed.getTime());
            },
            {
              message: "Please select a valid date",
            }
          );
        }
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
