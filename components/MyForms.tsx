"use client";
import SingleForm from "@/components/SingleForm";
import { Input } from "@/components/ui/input";
import { useGetForms } from "@/hooks/useGetForms";
import React from "react";

const MyForms = () => {
  const { data: forms, isPending } = useGetForms();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (!forms || forms.length === 0) {
    return <div>You have no forms</div>;
  }
  return (
    <>
      <div className="search flex mt-8 gap-1 flex-col">
        <p className="text-muted-foreground text-[14px] font-[500]">
          Search for a form
        </p>
        <Input placeholder="Customer complaint form" />
      </div>
      <div className=" forms mt-4">
        {forms.map((f, i) => {
          return <SingleForm key={f.id} _count={f._count} title={f.title} />;
        })}
      </div>
    </>
  );
};

export default MyForms;
