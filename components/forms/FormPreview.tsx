"use client";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import EmptyFormPreview from "./EmptyFormPreview";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { Button } from "../ui/button";
import { FormField } from "@/types/type";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CalendarIcon, Star } from "lucide-react";
import { Slider } from "../ui/slider";
import React, { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getDateDisableLogic } from "@/helpers/getDateDisableLogic";

const FormPreview = () => {
  const fields = useFormBuilder((state) => state.fields);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [dateValues, setDateValues] = useState<Record<string, Date>>({});
  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };
  const handleDateChange = (id: string, date: Date) => {
    setDateValues((prev) => ({ ...prev, [id]: date }));
  };
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
              <div
                key={option.value}
                className="flex items-center text-pop space-x-3"
              >
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
        const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
        const [value, setValue] = useState<number | null>(null);
        return (
          <div className="flex space-x-1">
            {Array.from({ length: field.length }).map((_, i) => {
              const isFilled = i < (hoveredIndex ?? value ?? 0);

              return (
                <Star
                  key={i}
                  size={18}
                  className={`cursor-pointer transition-all icon-yellow ${
                    isFilled ? " fill-yellow-500" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(i + 1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setValue(i + 1)}
                />
              );
            })}
          </div>
        );

      case "slider":
        return (
          <Slider
            value={[sliderValues[field.id] || field.defaultValue]}
            onValueChange={(value) => {
              handleSliderChange(field.id, value[0]);
            }}
            step={field.steps}
            defaultValue={[field.defaultValue]}
            max={field.maxNumber}
            min={field.baseNumber}
          />
        );
      case "switch":
        return <Switch defaultChecked={field.defaultCheckedValue} />;
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateValues[field.id] && "text-muted-foreground"
                )}
              >
                {dateValues[field.id] ? (
                  format(dateValues[field.id], "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValues[field.id]}
                onSelect={(d) => handleDateChange(field.id, d!)}
                initialFocus
                disabled={getDateDisableLogic(field.dateRestriction)}
              />
            </PopoverContent>
          </Popover>
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
                className={`flex justify-between items-center`}
                htmlFor={field.id}
              >
                <div>
                  {field.label || "Untitled Field"}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </div>
                {field.type == "slider" && (
                  <span>{sliderValues[field.id] || field.defaultValue}</span>
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
