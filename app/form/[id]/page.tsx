import ResponseForm from "@/components/ResponseForm";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <section className="min-h-screen px-4 items-center justify-center flex">
      <ResponseForm />
    </section>
  );
};

export default page;
