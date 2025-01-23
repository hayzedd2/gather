"use client";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormFields from "./FormFields";

const FormBuilder = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-4 basis-[50%]">
        <AddField />
        <FormFields />
        <ConfigPanel />
      </div>
      <FormPreview />
    </div>
  );
};

export default FormBuilder;
