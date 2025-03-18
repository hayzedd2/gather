"use client"

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { SelectField, RadioGroupField, CheckboxGroupField } from "@/types/type";

type FieldOption = { label: string; value: string };

type OptionsEditorProps = {
  field: SelectField | RadioGroupField | CheckboxGroupField;
};

const OptionsEditor = ({ field }: OptionsEditorProps) => {
  const updateField = useFormBuilder((s) => s.updateField);
  const [options, setOptions] = useState<FieldOption[]>(field.options);

  const updateOptions = (newOptions: FieldOption[]) => {
    setOptions(newOptions);
    updateField(field.id, { options: newOptions });
  };

  const addOption = () => {
    const newOption = { label: "New option", value: `option-${crypto.randomUUID()}` };
    updateOptions([...options, newOption]);
  };

  const updateOptionLabel = (index: number, label: string) => {
    const newOptions = options.map((opt, i) =>
      i === index ? { ...opt, label } : opt
    );
    updateOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      updateOptions(options.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Options</Label>
        <Button size="sm" variant="outline" onClick={addOption} className="flex items-center gap-1">
          <Plus size={14} /> Add Option
        </Button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <motion.div key={option.value} className="flex items-center gap-2">
            <Input
              value={option.label}
              onChange={(e) => updateOptionLabel(index, e.target.value)}
              onBlur={() => {
                if (!option.label.trim()) {
                  toast.warning("Field cannot be empty, setting it to 'Untitled field'");
                  updateOptionLabel(index, "Untitled field");
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && updateOptions([...options])}
            />
            <Button size="sm" variant="ghost" onClick={() => removeOption(index)}>
              <X size={14} />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OptionsEditor;
