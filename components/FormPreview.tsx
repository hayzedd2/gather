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
import { FormField } from "@/types/type";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Star } from "lucide-react";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";

const FormPreview = () => {
  const fields = useFormBuilder((state) => state.fields);
  const [sliderVal, setSliderVal] = useState([0]);
  const settingsFields = useSettingsFormStore((s) => s.settingFields);
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
      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.length }).map((_, i) => (
              <Star
                key={i}
                size={16}
                onClick={() => console.log(i)}
                className="icon-yellow cursor-pointer"
              />
            ))}
          </div>
        );

      case "slider":
       useEffect(()=>{
        setSliderVal([field.defaultValue])
       },[field.defaultValue])
        return (
          <Slider
            onValueChange={(v) => {
              setSliderVal(v);
            }}
            step={field.steps}
            defaultValue={[field.defaultValue]}
            max={field.maxNumber}
            min={field.baseNumber}
          />
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

      <div className="max-w-2xl mx-auto space-y-3 bg-white p-5 rounded-lg my-5">
        <div className="form-header flex flex-col mb-6">
          <h3 className="text-[1.7rem] font-[600]">{settingsFields.title}</h3>
          <h5 className="text-muted-foreground  text-[14px] mt-[-3px]">
            {settingsFields.description}
          </h5>
        </div>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2 ">
              <Label
                className="flex justify-between items-center"
                htmlFor={field.id}
              >
                {field.label || "Untitled Field"}
                {field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
                {field.type == "slider" &&
                  sliderVal.map((s, i) => <span key={i}>{s}</span>)}
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
          <Button>
            {!settingsFields.buttonCtaText
              ? "Submit"
              : settingsFields.buttonCtaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
