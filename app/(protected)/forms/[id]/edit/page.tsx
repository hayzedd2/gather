import ErrorMessage from "@/components/ErrorMessage";
import FormBuilderEdit from "@/components/FormBuilderEdit";
import MiniLoader from "@/components/MiniLoader";
import { prismaDb } from "@/lib/db";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const form = await prismaDb.form.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      buttonText: true,
      formConfig: true,
      successMessage:true
    },

  });

  if (!form) {
    return <ErrorMessage message="Could not find form" />;
  }

  return (
    <Suspense key={form.id} fallback={<MiniLoader />}>
      <FormBuilderEdit form={form} />
    </Suspense>
  );
};

export default page;
