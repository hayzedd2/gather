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
import { toast } from "sonner";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useCreateform } from "@/hooks/useCreateForm";

const FormBuilder = () => {
  const [view, setView] = React.useState<viewT>("configure");
  const settingFields = useSettingsFormStore((s) => s.settingFields);
  const { fields, updateField, resetFields } = useFormBuilder();
  const validateAllFields = () => {
    fields.forEach((field) => {
      if (field.label.trim().length === 0) {
        updateField(field.id, { label: "Untitled Field" });
      }
    });
  };
  const { mutate, isPending } = useCreateform();
  const onPublishForm = () => {
    validateAllFields();
    if (fields.length == 0) {
      toast.warning("Add at least one form field");
      return;
    }
    const validData = FormSettingsSchema.safeParse(settingFields);
    if (!validData.success) {
      toast.warning(
        "Missing field in settings, please edit before you can proceed."
      );
      return;
    }
    const payLoad = {
      fields,
      ...validData.data,
    };
    // send fields and form settings to db
    console.log(payLoad);
    try {
      mutate(payLoad);
      resetFields();
    } catch (err) {
      console.log(err);
    }
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
        <FormActions onPublish={onPublishForm} isPending={isPending} />
      </div>
      <div className="flex  bg-[#FAFAFA] top-0 h-screen  p-4 flex-col sticky gap-4 w-[20rem] dotted dotted-left ">
        <AddField />
      </div>
    </div>
  );
};

export default FormBuilder;
