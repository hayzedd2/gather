"use client";

import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";

const FormBuilder = () => {
  const { addField, fields } = useFormBuilder();
  const [selectedField, setSelectedField] = React.useState<string | null>(null);
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
    <div className="flex ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {fieldsToAdd.map((f, i) => {
            return (
              <div key={i}>
                <button onClick={() => handleAddField(f)}>Add {f} field</button>
              </div>
            );
          })}
        </div>
        {fields.map((f) => {
          return (
            <div key={f.id} className="flex w-full gap-2">
              <p>{f.label}</p>
              <button onClick={() => setSelectedField(f.id)}>
                Show config
              </button>
              <button>Delete</button>
            </div>
          );
        })}
      </div>
      {selectedField && (
        <ConfigPanel field={fields.find((f) => f.id === selectedField)} />
      )}
      <FormPreview />
    </div>
  );
};

export default FormBuilder;
