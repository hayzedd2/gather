"use client";
import React from "react";
import { Button } from "./ui/button";
import { FormActionProps } from "@/types/type";
import { SvgLoading } from "./SvgLoading";

const FormActions = ({
  onPublish,
  isPending,
  type = "new",
}: FormActionProps) => {
  return (
    <div className="w-full sticky bottom-0 z-10  mt-auto bg-[#fafafa] p-4">
      <div className="fl ex w-full justify-end">
        <Button onClick={onPublish} type="submit" disabled={isPending}>
          {isPending && <SvgLoading />}
          <p className="mt-[0.2rem]">
            {type == "new" ? "Publish form" : "Make changes"}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
