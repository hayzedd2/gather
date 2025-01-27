"use client";
import React from "react";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { FieldType } from "@/types/type";
import { Button } from "./ui/button";
import {
  FileDigit,
  FileText,
  List,
  MailPlus,
  Trash2,
  Type,
  WrapText,
} from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useKeys } from "use-keys-bindings";
import { useSelectedFieldStore } from "@/store/useSelectedFieldStore";
import { motion } from "motion/react";
import GetIconType from "@/helpers/GetIconType";
const ConfigPanel = () => {
  const { selectedField, setSelectedField } = useSelectedFieldStore();
  const fields = useFormBuilder((state) => state.fields);
  const { updateField, deleteField } = useFormBuilder();
  const [option, setOption] = React.useState("");
  const options: string[] = [];
  useKeys({
    keys: ["s"],
    callback: () => {
      options.push(option);
      setOption("");
    },
  });
  const fieldsToAdd = [
    {
      key: "text",
      label: "Text",
      about: "Single text field",
      icon: <Type size={20} />,
    },
    {
      key: "email",
      label: "Email",
      about: "Single email field",
      icon: <MailPlus size={20} />,
    },
    {
      key: "number",
      label: "Numeric",
      about: "Accepts only numbers",
      icon: <FileDigit size={20} />,
    },
    {
      key: "select",
      label: "Select from List",
      about: "Select options from a list",
      icon: <List size={20} />,
    },
    {
      key: "textarea",
      label: "Text area",
      about: "Multiple lines of text",
      icon: <WrapText size={20} />,
    },
  ];

  return (
    <div className="p-4 rounded-lg  flex-col flex gap-2">
      <h3 className="text-[1.3rem] font-[500]">Form configuration</h3>
      <div className="flex flex-col gap-3">
        {fields.map((field, i) => {
          return (
            <div
              key={i}
              className={`${
                !selectedField || selectedField != field.id ? "p-3" : "py-8 px-4"
              } flex flex-col w-full bg-white   rounded-lg `}
            >
              <div
                className="flex w-full justify-between cursor-pointer items-center"
                onClick={() => setSelectedField(field.id)}
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
                    <Switch />
                  </motion.div>
                )}
              </div>
              {/* settings */}
              {selectedField && selectedField == field.id && (
                <motion.div
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: "auto",
                  }}
                  exit={{
                    height: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                >
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
                      <Label htmlFor="fieldLabel">Label</Label>
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
                        value={field.placeholder || ""}
                        onChange={(e) =>
                          updateField(field.id, { placeholder: e.target.value })
                        }
                      />
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
                      onClick={() => setSelectedField("empty")}
                    >
                      Done
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConfigPanel;
