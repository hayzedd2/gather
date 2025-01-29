"use client";
import React from "react";
import { Button } from "./ui/button";
import { FormActionProps } from "@/types/type";
import { SvgLoading } from "./SvgLoading";

const FormActions = ({ onPublish, isPending }: FormActionProps) => {
  return (
    <div className="w-full sticky bottom-0 z-10 dotted-up mt-auto bg-white p-4">
      <div className="flex w-full justify-end">
        <Button onClick={onPublish} type="submit" disabled={isPending}>
          {isPending && <SvgLoading />}
          <p className="mt-[0.2rem]">Publish form</p>
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
