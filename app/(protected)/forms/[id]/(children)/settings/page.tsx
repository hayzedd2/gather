import ErrorMessage from "@/components/ErrorMessage";
import SingleFormSettings from "@/components/SingleFormSettings";
import { prismaDb } from "@/lib/db";
import React from "react";

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
      successMessage:true
    },
  });

  if (!form) {
    return <ErrorMessage message="Could not find form" />;
  }
  return (
    <SingleFormSettings
      id={form.id}
      title={form.title}
      description={form.description}
      buttonText={form.buttonText}
      successMessage={form.successMessage}
    />
  );
};

export default page;
