"use client";

import { FormField } from "@/types/type";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import FormEditor from "./FormEditor";

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
  return (
    <div>
      <FormEditor id={form.id} />
    </div>
  );
};

export default FormBuilderEdit;
