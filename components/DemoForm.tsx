import React from "react";
import ResponseForm from "./ResponseForm";
import { prismaDb } from "@/lib/db";
import ErrorMessage from "./ErrorMessage";
import { FormField } from "@/types/type";

const DemoForm = async () => {
  const id = "cm7ninj6b0001l0z4av8wm0wu";
  const form = await prismaDb.form.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      successMessage: true,
      description: true,
      buttonText: true,
      formConfig: true,
    },
  });

  if (!form) {
    return <ErrorMessage message="Could not find form" />;
  }
  return (
    <div>
      <ResponseForm
        id={form.id}
        title={form.title}
        buttonText={form.buttonText as string}
        description={form.description}
        formConfig={form.formConfig as unknown as FormField[]}
        successMessage={form.successMessage}
      />
    </div>
  );
};

export default DemoForm;
