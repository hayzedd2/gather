"use client";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import EmptyFormPreview from "./EmptyFormPreview";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateShareableLink } from "@/helpers/generateShareableLink";
import { useState } from "react";


const FormPreview = () => {
  const fields = useFormBuilder((state) => state.fields);
  const [shareablelink, setShareableLink] = useState<string | null>(null);
  if (fields.length === 0) {
    return <EmptyFormPreview />;
  }
  const handleGenerate = () => {
    const link = generateShareableLink();
    setShareableLink(link);
  };
  return (
    <div>
      <div className="font-[500] flex items-center gap-2 text-[1.3rem] text-regular">
        <div className="flex flex-col">
          <h4>Form preview</h4>
          <p className="text-subtle font-[500] text-[14px]">
            See how your form would look in real time
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 bg-white p-4 rounded-lg my-5">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && "*"}
            </Label>
            {field.type === "select" ? (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options
                    ?.filter((option) => option.trim() !== "")
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                {...field.validation}
              />
            )}
            {field.description && <p className="text-[0.8rem] text-muted-foreground">{field.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
