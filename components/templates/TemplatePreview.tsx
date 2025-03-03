"use client";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import EmptyFormPreview from "../forms/EmptyFormPreview";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { FormField } from "@/types/type";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const TemplatePreview = ({ btnText }: { btnText: string }) => {
  const fields = useFormBuilder((state) => state.fields);
  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      required: field.required,
      "aria-label": field.label,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
          />
        );

      case "textarea":
        return <Textarea {...commonProps} placeholder={field.placeholder} />;

      case "select":
        return (
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={field.placeholder || "Select an option"}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox-group":
        return (
          <div className="space-y-2 ">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <Checkbox id={`${field.id}-${option.value}`} />
                <Label
                  className="font-normal pt-[3px]"
                  htmlFor={`${field.id}-${option.value}`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "radio-group":
        return (
          <RadioGroup className="gap-3">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.id}-${option.value}`}
                />
                <Label
                  className="mt-[3px]"
                  htmlFor={`${field.id}-${option.value}`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="w-full mx-auto space-y-3  my-5">
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label || "Untitled Field"}
                {field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
              {renderField(field)}
              {field.description && (
                <p className="text-[0.8rem] text-muted-foreground">
                  {field.description}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full justify-end flex">
          <Button>{btnText}</Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
