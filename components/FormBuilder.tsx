"use client";

import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormFields from "./FormFields";

const FormBuilder = () => {
  const { fields } = useFormBuilder();
  const [selectedField, setSelectedField] = React.useState<string | null>(null);
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 basis-[50%]">
        <div className="flex flex-col gap-2">
          <AddField />
          <FormFields />
        </div>

        <ConfigPanel />
      </div>
      <FormPreview />
    </div>
  );
};

export default FormBuilder;
