import React from "react";
import { motion } from "framer-motion";
import { GripVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { CheckboxGroupField, RadioGroupField, SelectField } from "@/types/type";

const OptionsEditor = ({
  field,
}: {
  field: SelectField | RadioGroupField | CheckboxGroupField;
}) => {
  const updateField = useFormBuilder((s) => s.updateField);
  const addOption = () => {
    const newOption = {
      label: `Option ${field.options.length + 1}`,
      value: `option-${crypto.randomUUID()}`,
    };
    updateField(field.id, { options: [...field.options, newOption] });
  };

  const updateOption = (index: number, label: string) => {
    const newOptions = field.options.map((opt, i) =>
      i === index ? { ...opt, label } : opt
    );
    updateField(field.id, { options: newOptions });
  };

  const removeOption = (index: number) => {
    if (field.options.length > 1) {
      const newOptions = field.options.filter((_, i) => i !== index);
      updateField(field.id, { options: newOptions });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Options</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={addOption}
          className="flex items-center gap-1"
        >
          <Plus size={14} /> Add Option
        </Button>
      </div>
      <div className="space-y-2">
        {field.options.map((option, index) => (
          <motion.div key={option.value} className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-400" />
            <Input
              value={option.label}
              onChange={(e) => updateOption(index, e.target.value)}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeOption(index)}
            >
              <X size={14} />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default OptionsEditor;
