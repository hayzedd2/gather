import { IncrementView } from "@/actions/view";
import ErrorMessage from "@/components/ErrorMessage";
import ResponseForm from "@/components/ResponseForm";
import { prismaDb } from "@/lib/db";
import { FormField } from "@/types/type";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [form] = await Promise.all([
    prismaDb.form.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        buttonText: true,
        formConfig: true,
      },
    }),
    IncrementView(id),
  ]);
  if (!form) {
    return <ErrorMessage message="Could not find form"/>;
  }

  return (
    <section className="min-h-screen px-4 items-center justify-center flex">
      <ResponseForm
        id={form.id}
        title={form.title}
        buttonText={form.buttonText as string}
      description={form.description}
        formConfig={form.formConfig as unknown as FormField[]}
      />
    </section>
  );
};

export default page;
