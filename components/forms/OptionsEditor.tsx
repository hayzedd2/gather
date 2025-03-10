import { useReducer } from "react";
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

type Action =
  | { type: "ADD" }
  | { type: "UPDATE"; index: number; label: string }
  | { type: "REMOVE"; index: number };


const optionsReducer = (options: FieldOption[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...options,
        { label: "New option", value: `option-${crypto.randomUUID()}` },
      ];
    case "UPDATE":
      return options.map((opt, i) =>
        i === action.index
          ? { ...opt, label: action.label.trim() || "Untitled field" }
          : opt
      );
    case "REMOVE":
      return options.length > 1
        ? options.filter((_, i) => i !== action.index)
        : options;
    default:
      return options;
  }
};

const OptionsEditor = ({ field }: OptionsEditorProps) => {
  const updateField = useFormBuilder((s) => s.updateField);
  const [options, dispatch] = useReducer(optionsReducer, field.options);

  // Sync state with form builder
  const updateOptions = (newOptions: FieldOption[]) => {
    updateField(field.id, { options: newOptions });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Options</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            dispatch({ type: "ADD" });
            updateOptions([
              ...options,
              { label: "New option", value: `option-${crypto.randomUUID()}` },
            ]);
          }}
          className="flex items-center gap-1"
        >
          <Plus size={14} /> Add Option
        </Button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <motion.div key={option.value} className="flex items-center gap-2">
            <Input
              value={option.label}
              onChange={(e) =>
                dispatch({ type: "UPDATE", index, label: e.target.value })
              }
              onBlur={() => {
                if (!option.label.trim()) {
                  toast.warning(
                    "Field cannot be empty, setting it to 'Untitled field'"
                  );
                }
                updateOptions(options);
              }}
              onKeyDown={(e) => e.key === "Enter" && updateOptions(options)}
            />

            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                dispatch({ type: "REMOVE", index });
                updateOptions(options.filter((_, i) => i !== index));
              }}
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
