"use client";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormFields from "./FormFields";

const FormBuilder = () => {
  return (
    <div className="flex min-h-screen">
     <div className="w-full flex-1 bg-[#FAFAFA]  ">
     <div className="max-w-2xl p-6 mx-auto w-full ">
        {/* <FormFields/> */}
        <ConfigPanel />
      </div>
     </div>

      <div className="flex  bg-[#FAFAFA] top-0 h-screen  p-4 flex-col sticky gap-4 w-[20rem] dotted dotted-left ">
        <AddField />
      </div>
    </div>
  );
};

export default FormBuilder;
