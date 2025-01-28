"use client";
import React from "react";
import { Button } from "./ui/button";
import { FormActionProps } from "@/types/type";

const FormActions = ({ onPublish }: FormActionProps) => {
  return (
    <div className="w-full sticky bottom-0 z-10 dotted-up mt-auto p-4 ">
      <div className="flex items-end justify-end w-full">
        <Button onClick={onPublish}>Publish form</Button>
      </div>
    </div>
  );
};

export default FormActions;
