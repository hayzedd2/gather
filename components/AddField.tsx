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
      label: `New ${type} Field`
    });
  };

  const fieldsToAdd = [
    {
      key: "text",
      label: "Text",
      about: "Single text field",
      icon: <Type size={20} />,
    },
    {
      key: "email",
      label: "Email",
      about: "Single email field",
      icon: <MailPlus size={20} />,
    },
    {
      key: "number",
      label: "Numeric",
      about: "Accepts only numbers",
      icon: <FileDigit size={20} />,
    },
    {
      key: "select",
      label: "Select from List",
      about: "Select options from a list",
      icon: <List size={20} />,
    },
    {
      key: "textarea",
      label: "Text area",
      about: "Multiple lines of text",
      icon: <WrapText size={20} />,
    },
    {
      key: "checkbox-group",
      label: "Checkbox",
      about: "Add echc",
      icon: <WrapText size={20} />,
    },
    {
      key: "radio-group",
      label: "Radio",
      about: "Add echc",
      icon: <WrapText size={20} />,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[1.3rem] font-[500] mb-3">Add form fields</h3>
      <div className="flex gap-5 flex-col">
        {fieldsToAdd.map((f) => {
          return (
            <button
              key={f.key}
              onClick={() => handleAddField(f.key as FieldType)}
              className="flex items-center gap-3"
            >
              <div className="icon-holder bg-[#FcFcFc]  rounded-sm p-2">
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
