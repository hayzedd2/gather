"use client";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormControlTab from "./FormControlTab";
import FormActions from "./FormActions";
import { viewT } from "@/types/type";

const FormBuilder = () => {
  const [view, setView] = React.useState<viewT>("configure");
  return (
    <div className="flex min-h-screen relative">
      <div className="w-full flex-1 bg-[#fafafa]">
        <FormControlTab view={view} setView={setView} />
        <div className="max-w-2xl p-6 mx-auto w-full ">
          {view == "configure" ? <ConfigPanel /> : <FormPreview />}
        </div>
        <FormActions />
      </div>
      <div className="flex  bg-[#FAFAFA] top-0 h-screen  p-4 flex-col sticky gap-4 w-[20rem] dotted dotted-left ">
        <AddField />
      </div>
    </div>
  );
};

export default FormBuilder;
