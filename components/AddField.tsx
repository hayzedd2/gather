import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import React from "react";
import { Button } from "./ui/button";
import { FileDigit, List, MailPlus, Type, WrapText } from "lucide-react";
import GetIconType from "@/helpers/GetIconType";
import { createDefaultValues } from "@/helpers/createDefaultValues";

const AddField = () => {
  const addField = useFormBuilder((state) => state.addField);
  const handleAddField = (type: FieldType) => {
    const defaultValues = createDefaultValues(type);
    addField({
      ...defaultValues,
      type,
      label: `New ${type} Field`,
    });
  };
  const fieldsToAdd = [
    {
      key: "text",
      label: "Text",
      about: "Single-line input",
    },
    {
      key: "email",
      label: "Email",
      about: "Email input field",
    },
    {
      key: "number",
      label: "Number",
      about: "Only numbers allowed",
    },
    {
      key: "select",
      label: "Dropdown",
      about: "Choose from a list",
    },
    {
      key: "textarea",
      label: "Textarea",
      about: "Multi-line input",
    },
    {
      key: "checkbox-group",
      label: "Checkbox",
      about: "Multiple selections",
    },
    {
      key: "radio-group",
      label: "Radio",
      about: "Single selection",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[1.2rem] font-[600]">Add form fields</h3>
      <div className="flex gap-5 mt-3 flex-col">
        {fieldsToAdd.map((f) => {
          return (
            <button
              key={f.key}
              onClick={() => handleAddField(f.key as FieldType)}
              className="flex items-center gap-3"
            >
              <div className="icon-holder  rounded-sm p-1">
                <GetIconType type={f.key as FieldType} />
              </div>
              <div className="flex flex-col items-start">
                <h6 className="font-[600] text-[15px] text-[#464646]">
                  {f.label}
                </h6>
                <p className="text-[13px] mt-[-2px] font-[600] text-subtle">
                  {f.about}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AddField;
