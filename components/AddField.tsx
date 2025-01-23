import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import React from "react";
import { Button } from "./ui/button";

const AddField = () => {
  const addField = useFormBuilder((state) => state.addField);
  const handleAddField = (type: FieldType) => {
    addField({
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: "",
    });
  };
  const fieldsToAdd: FieldType[] = ["email", "number", "text", "select"];
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg light-shadow">
      <h3 className="text-[1.3rem] font-[500]">Add form fields</h3>
      <div className="flex gap-2">
        {fieldsToAdd.map((f, i) => {
          return (
            <Button className="capitalize" onClick={() => handleAddField(f)} key={i}>
              {f}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AddField;
