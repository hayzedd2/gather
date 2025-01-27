"use client"
import React from "react";
import { Button } from "./ui/button";

const FormActions = () => {
  return (
    <div className="w-full  z-10 dotted-up mt-auto p-4 ">
      <div className="flex items-end justify-end w-full">
        <Button>Publish form</Button>
      </div>
    </div>
  );
};

export default FormActions;
