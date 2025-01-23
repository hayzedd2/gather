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
import { Button } from "./ui/button";
import { generateShareableLink } from "@/helpers/generateShareableLink";
import { useState } from "react";
import SharedLink from "./SharedLink";

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
    <div className="basis-[50%]">
      <h3 className="text-[1.3rem] font-[500] mb-4">Form preview</h3>

      <div className="space-y-4">
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
          </div>
        ))}
      </div>
      {fields.length > 0 && (
        <Button className="my-4" onClick={handleGenerate}>Generate shareable link</Button>
      )}
      {shareablelink && <SharedLink link={shareablelink} />}
    </div>
  );
};

export default FormPreview;
