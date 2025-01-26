"use client";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormFields from "./FormFields";

const FormBuilder = () => {
  return (
    <div className="flex  min-h-screen gap-10">
      <div className="flex-1 p-6">
        <FormPreview />
      </div>
      <div className="flex">
        <div className="flex bg-[#FAFAFA]  p-4 flex-col gap-4 w-[20rem] dotted dotted-left ">
          <FormFields />
          <ConfigPanel />
        </div>
        <div className="flex  bg-[#FAFAFA]  p-4 flex-col gap-4 w-[20rem] dotted dotted-left ">
          <AddField />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
