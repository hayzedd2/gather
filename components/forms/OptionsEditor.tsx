"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, GripVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { CheckboxGroupField, RadioGroupField, SelectField } from "@/types/type";
import { toast } from "sonner";

const OptionsEditor = ({
  field,
}: {
  field: SelectField | RadioGroupField | CheckboxGroupField;
}) => {
  const [inputValues, setInputValues] = React.useState<string[]>(
    field.options.map((option) => option.label)
  );

  const updateField = useFormBuilder((s) => s.updateField);
  const addOption = () => {
    const newOption = {
      label: `new option`,
      value: `option-${crypto.randomUUID()}`,
    };
    updateField(field.id, { options: [...field.options, newOption] });
    setInputValues([...inputValues, newOption.label]);
  };

  const updateOption = (index: number) => {
    let label = inputValues[index];
    if (label.trim().length == 0) {
      toast.warning("Field cannot be empty, setting it to untittled field");
      const newInputValues = [...inputValues];
      newInputValues[index] = "Untitled field";
      setInputValues(newInputValues);
      label = "Untitled field";
    }
    const newOptions = field.options.map((opt, i) =>
      i === index ? { ...opt, label } : opt
    );
    updateField(field.id, { options: newOptions });
  };

  const removeOption = (index: number) => {
    if (field.options.length > 1) {
      const newOptions = field.options.filter((_, i) => i !== index);
      updateField(field.id, { options: newOptions });
      const newInputValues = [...inputValues];
      newInputValues.splice(index, 1);
      setInputValues(newInputValues);
    }
  };
  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
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
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <div className="flex ">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updateOption(index)}
              >
                <Check size={14} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeOption(index)}
              >
                <X size={14} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default OptionsEditor;
