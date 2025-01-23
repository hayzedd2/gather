import { FormField } from "@/types/type";
import React from "react";

const ConfigPanel = ({ field }: { field: FormField | undefined }) => {
  return (
    <div>
      <h1>Config panel</h1>
      {field?.label}
    </div>
  );
};

export default ConfigPanel;
