"use client";
import React from "react";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useKeys } from "use-keys-bindings";
import { useSelectedFieldStore } from "@/store/useSelectedFieldStore";
import { motion } from "motion/react";
import GetIconType from "@/helpers/GetIconType";
import EmptyFormPreview from "./EmptyFormPreview";
import { Textarea } from "./ui/textarea";

import { toast } from "sonner";
const ConfigPanel = () => {
  const { selectedField, setSelectedField } = useSelectedFieldStore();
  const fields = useFormBuilder((state) => state.fields);
  const { updateField, deleteField } = useFormBuilder();
  const [option, setOption] = React.useState("");
  const options: string[] = [];

  if (fields.length == 0) {
    return <EmptyFormPreview />;
  }
  const handleFieldSelection = (newSelectedFieldId: string) => {
    if (selectedField) {
      const currentField = fields.find((field) => field.id === selectedField);

      if (currentField && currentField.label.trim().length === 0) {
        updateField(selectedField, { label: "Untitled Field" });
        toast.warning(`Label was empty, set to "Untitled Field"`);
      }
    }

    setSelectedField(newSelectedFieldId);
  };

  return (
    <div className="rounded-lg  flex-col flex gap-2 pb-14">
      <div className="font-[500] flex items-center gap-2 text-[1.3rem] text-regular">
        <div className="flex flex-col">
          <h4>Form configuration</h4>
          <p className="text-subtle font-[500] text-[14px]">
            Configure your form to your taste
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {fields.map((field, i) => {
          return (
            <div
              key={i}
              className={`${
                !selectedField || selectedField != field.id
                  ? "p-3"
                  : "py-8 px-4"
              } flex flex-col w-full bg-white   rounded-lg`}
            >
              <div
                className="flex w-full justify-between cursor-pointer items-center"
                onClick={() => handleFieldSelection(field.id)}
              >
                <div className="flex gap-2 items-center">
                  <div className="icon-holder bg-[#FcFcFc] text-[#464646] rounded-sm p-[6px]">
                    <GetIconType type={field.type} size={16} />
                  </div>
                  <p className="text-[13px] font-[500] mt-[4px]">
                    {field.label}
                  </p>
                </div>
                {selectedField && selectedField == field.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.35,
                    }}
                    className="flex gap-3"
                  >
                    <p className="text-[13px] font-[500]">Mark as required</p>
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        updateField(field.id, { required: checked })
                      }
                    />
                  </motion.div>
                )}
              </div>
              {/* settings */}
              {selectedField && selectedField == field.id && (
                <div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.35,
                    }}
                    className="rounded-lg bg-[#FcFcFc] space-y-3 px-4 py-5 mt-4"
                  >
                    <div>
                      <Label htmlFor="fieldLabel">Label*</Label>
                      <Input
                        id="fieldLabel"
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, { label: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldPlaceholder">Placeholder</Label>
                      <Input
                        id="fieldPlaceholder"
                        required
                        value={field.placeholder || ""}
                        onChange={(e) =>
                          updateField(field.id, {
                            placeholder: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldDescription">Description</Label>
                      <Textarea
                        id="fieldDescription"
                        className="rezise-none"
                        value={field.description}
                        onChange={(e) =>
                          updateField(field.id, {
                            description: e.target.value,
                          })
                        }
                      />
                      {/* <FormDescription>Add a field description</FormDescription> */}
                    </div>
                  </motion.div>
                  <div className="flex w-full  justify-between items-start mt-4">
                    <button
                      onClick={() => deleteField(field.id)}
                      className="icon-holder  bg-[#F0F0F0] text-[#464646] rounded-sm p-[6px]"
                    >
                      <Trash2 color="#ef4444" size={16} />
                    </button>
                    <Button
                      size={"sm"}
                      onClick={() => {
                        if (field.label.trim().length === 0) {
                          updateField(field.id, { label: "Untitled Field" });
                          toast.warning(
                            "Label was empty, setting to 'Untitled Field'"
                          );
                        }
                        setSelectedField("empty");
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConfigPanel;
