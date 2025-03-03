"use client";

import { FormField } from "@/types/type";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import FormEditor from "./FormEditor";
import { useIsMobile } from "@/hooks/useIsMobile";
import ErrorMessage from "../reusable-comps/ErrorMessage";

interface FormEditProps {
  form: {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    formConfig: JsonValue;
    successMessage: string | null;
  };
}
const FormBuilderEdit = ({ form }: FormEditProps) => {
  const saveFields = useSettingsFormStore((s) => s.saveFields);
  const setFields = useFormBuilder((s) => s.setFields);
  React.useEffect(() => {
    saveFields({
      title: form.title,
      description: form.description,
      buttonCtaText: form.buttonText,
      saveAsTemplate: false,
      successMessage:  form.successMessage || "",
    });
    setFields(form.formConfig as unknown as FormField[]);
  }, [form]);
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-2">
        <ErrorMessage message="The form builder is not optimized for mobile devices. Please open this page on a larger screen " />
      </div>
    );
  }
  return (
    <div>
      <FormEditor id={form.id} />
    </div>
  );
};

export default FormBuilderEdit;
