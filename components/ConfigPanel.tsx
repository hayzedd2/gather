import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useSelectedFieldStore } from "@/store/useSelectedFieldStore";
import React from "react";

const ConfigPanel = () => {
  const selectedField = useSelectedFieldStore((state) => state.selectedField);
  const fields = useFormBuilder((state) => state.fields);
  if (!selectedField) {
    return null;
  }
  const field = fields.find((f) => f.id === selectedField);
  return (
    <div>
      <h1>Config panel</h1>
      {field?.label}
    </div>
  );
};

export default ConfigPanel;
