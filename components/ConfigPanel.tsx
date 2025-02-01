import React from "react";
import { motion } from "framer-motion";
import { Trash2, GripVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import {
  CheckboxGroupField,
  FieldType,
  FormField,
  RadioGroupField,
  SelectField,
} from "@/types/type";
import GetIconType from "@/helpers/GetIconType";
import EmptyFormPreview from "./EmptyFormPreview";

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
          <motion.div
            key={option.value}
            className="flex items-center gap-2"
          >
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

// const ValidationSettings = ({ field }: { field: FormField }) => {
//   switch (field.type) {
//     case "text":
//     case "textarea":
//       return (
//         <div className="space-y-3">
//           <Label>Validation</Label>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label className="text-xs">Min Length</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.minLength || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       minLength: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <Label className="text-xs">Max Length</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.maxLength || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       maxLength: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       );
//     case "number":
//       return (
//         <div className="space-y-3">
//           <Label>Validation</Label>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label className="text-xs">Min Value</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.min || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       min: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <Label className="text-xs">Max Value</Label>
//               <Input
//                 type="number"
//                 value={field.validation?.max || ""}
//                 onChange={(e) =>
//                   updateField(field.id, {
//                     validation: {
//                       ...field.validation,
//                       max: e.target.value
//                         ? parseInt(e.target.value)
//                         : undefined,
//                     },
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// };
const ConfigPanel = () => {
  const { fields, updateField, deleteField } = useFormBuilder();
  const [selectedField, setSelectedField] = React.useState<string | null>(null);

  if (fields.length == 0) {
    return <EmptyFormPreview />;
  }

  return (
    <div className="rounded-lg flex-col flex gap-2 pb-14">
      <div className="font-[500] flex items-center gap-2 text-[1.3rem] text-regular">
        <div className="flex flex-col">
          <h4>Form configuration</h4>
          <p className="text-subtle font-[500] text-[14px]">
            Configure your form to your taste
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`${
              !selectedField || selectedField !== field.id ? "p-3" : "py-8 px-4"
            } flex flex-col w-full bg-white rounded-lg`}
          >
            <div
              className="flex w-full justify-between cursor-pointer items-center"
              onClick={() => setSelectedField(field.id)}
            >
              <div className="flex gap-2 items-center">
                <div className="icon-holder bg-[#FcFcFc] text-[#464646] rounded-sm p-[6px]">
                  <GetIconType type={field.type as FieldType} />
                </div>
                <p
                  className="text-[13px] font-[500] mt-[4px]"
                >
                  {field.label || "Untitled Field"}
                </p>
              </div>

              {selectedField === field.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration:0.35,
                    ease:"easeInOut"
                  }}
                  className="flex gap-3 items-center"
                >
                  <p className="text-[13px] font-[500]">Required</p>
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      updateField(field.id, { required: checked })
                    }
                  />
                </motion.div>
              )}
            </div>

            {selectedField === field.id && (
              <div
                className="mt-4"
              >
                <div className="rounded-lg bg-[#FcFcFc] space-y-4 px-4 py-5">
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Label>Label*</Label>
                      <Input
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, { label: e.target.value })
                        }
                      />
                    </div>
                    {"placeholder" in field && (
                      <div className="w-full">
                        <Label>Placeholder</Label>
                        <Input
                          value={field.placeholder || ""}
                          onChange={(e) =>
                            updateField(field.id, {
                              placeholder: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={field.description || ""}
                      onChange={(e) =>
                        updateField(field.id, { description: e.target.value })
                      }
                      className="resize-none"
                    />
                  </div>

                  {"options" in field && <OptionsEditor field={field} />}

                  {/* Validation Settings */}
                  {/* <ValidationSettings field={field} /> */}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => {
                      deleteField(field.id);
                      setSelectedField(null);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button size="sm" onClick={() => setSelectedField(null)}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigPanel;
