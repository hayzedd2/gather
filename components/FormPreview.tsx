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
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { Button } from "./ui/button";

const FormPreview = () => {
  const fields = useFormBuilder((state) => state.fields);
  const settingsFields = useSettingsFormStore((s) => s.settingFields);
  if (fields.length === 0) {
    return <EmptyFormPreview />;
  }

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
       <div className="form-header flex flex-col mb-6">
       <h3 className="text-[1.7rem] font-[600]">{settingsFields.title}</h3>
       <h5 className="text-muted-foreground  text-[14px] mt-[-3px]">{settingsFields.description}</h5>
       </div>
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
            {field.description && (
              <p className="text-[0.8rem] text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        ))}
        <Button className="w-full">{!settingsFields.buttonCtaText ? "Submit" : settingsFields.buttonCtaText}</Button>
      </div>
    </div>
  );
};

export default FormPreview;
