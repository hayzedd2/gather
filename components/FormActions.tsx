import React from "react";
import { Button } from "./ui/button";

const FormActions = () => {
  return (
    <div className="w-full bg-[#fafafa] dotted-up mt-auto p-4 fixed bottom-0">
      <div className="flex items-end justify-end w-full">
        <Button>Publish form</Button>
      </div>
    </div>
  );
};

export default FormActions;
