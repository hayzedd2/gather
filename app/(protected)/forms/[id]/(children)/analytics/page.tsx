
import FormAnalytics from "@/components/FormAnalytics";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="py-6 px-3">
      <FormAnalytics id={id} />
    </div>
  );
};

export default page;
