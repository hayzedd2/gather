"use client";
import React from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormControlTab from "./FormControlTab";
import FormActions from "./FormActions";
import { viewT } from "@/types/type";
import FormSettingsForm from "./FormSettingsForm";
import { FormSettingsSchema } from "@/schema";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";

const FormBuilder = () => {
  const [view, setView] = React.useState<viewT>("configure");
  const settingFields = useSettingsFormStore((s) => s.settingFields);
  const onPublishForm = () => {
    console.log("Form published!");
    const validData = FormSettingsSchema.safeParse(settingFields);
    if (!validData.success) {
      console.log("Missing setting fields");
    }
    console.log(settingFields);
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-full  flex  flex-col  flex-1 bg-[#fafafa] relative">
        <FormControlTab view={view} setView={setView} />
        <div className="max-w-2xl p-6 mx-auto w-full ">
          {view == "configure" && <ConfigPanel />}
          {view == "preview" && <FormPreview />}
          {view == "settings" && <FormSettingsForm />}
        </div>
        <FormActions onPublish={onPublishForm} />
      </div>
      <div className="flex  bg-[#FAFAFA] top-0 h-screen  p-4 flex-col sticky gap-4 w-[20rem] dotted dotted-left ">
        <AddField />
      </div>
    </div>
  );
};

export default FormBuilder;
