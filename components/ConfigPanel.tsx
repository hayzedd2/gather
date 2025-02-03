import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import GetIconType from "@/helpers/GetIconType";
import EmptyFormPreview from "./EmptyFormPreview";
import OptionsEditor from "./OptionsEditor";

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
                <p className="text-[13px] font-[500] mt-[4px]">
                  {field.label || "Untitled Field"}
                </p>
              </div>

              {selectedField === field.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
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
              <div className="mt-4">
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
