import SingleFormHeader from "@/components/SingleFormHeader";
import React from "react";
interface SingleFormLayoutProps {
  children: React.ReactNode;
}
const SingleFormLayout = ({ children }: SingleFormLayoutProps) => {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <SingleFormHeader />
      {children}
    </div>
  );
};

export default SingleFormLayout;
