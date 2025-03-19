import React from "react";
import { motion } from "framer-motion";
import { CircleHelp, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { dateRestrictionFormats, FieldType } from "@/types/type";
import GetIconType from "@/helpers/GetIconType";
import EmptyFormPreview from "./EmptyFormPreview";
import OptionsEditor from "./OptionsEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const ConfigPanel = () => {
  const { fields, updateField, deleteField, resetFields } = useFormBuilder();
  const [selectedField, setSelectedField] = React.useState<string | null>(null);

  if (fields.length == 0) {
    return <EmptyFormPreview />;
  }

  return (
    <div className="rounded-lg flex-col flex gap-2 ">
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
              !selectedField || selectedField !== field.id ? "p-3" : "py-6 px-4"
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
                        onChange={(e) => {
                          updateField(field.id, { label: e.target.value });
                        }}
                        onBlur={(e) => {
                          if (e.target.value.trim().length === 0) {
                            updateField(field.id, { label: "Untitled field" });
                          }
                        }}
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
                    {"datePickerPlaceholder" in field && (
                      <div className="w-full">
                        <Label>
                          <div className="flex gap-1 items-center">
                            Date picker placeholder
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CircleHelp className="text-muted-foreground size-3" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px] text-center">
                                <p className="text-[13px]">
                                  This is the label shown in the date picker. It
                                  defaults to `Pick a date` if not edited.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </Label>
                        <Input
                          className="mt-2"
                          value={field.datePickerPlaceholder || ""}
                          onChange={(e) =>
                            updateField(field.id, {
                              datePickerPlaceholder: e.target.value,
                            })
                          }
                          onBlur={(e) => {
                            if (e.target.value.trim().length === 0) {
                              updateField(field.id, {
                                datePickerPlaceholder: "Pick a date",
                              });
                            }
                          }}
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

                  {field.type == "rating" && (
                    <div className="w-full">
                      <Label>Length</Label>
                      <Input
                        value={field.length || ""}
                        type="number"
                        onChange={(e) =>
                          updateField(field.id, {
                            length: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  )}
                  {field.type == "switch" && (
                    <div className="space-y-2">
                      <Label>Default checked value</Label>
                      <RadioGroup
                        onValueChange={(v) =>
                          updateField(field.id, {
                            defaultCheckedValue: v == "true" ? true : false,
                          })
                        }
                        defaultValue={
                          field.defaultCheckedValue ? "true" : "false"
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="r1" />
                          <Label htmlFor="r1" className="pt-[3px]">
                            True
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="r2" />
                          <Label htmlFor="r2" className="pt-[3px]">
                            False
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  {field.type == "date" && (
                    <div className="space-y-2">
                      <Label>Date restriction</Label>
                      <RadioGroup
                        onValueChange={(v) =>
                          updateField(field.id, {
                            dateRestriction: v as dateRestrictionFormats,
                          })
                        }
                        defaultValue={field.dateRestriction}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="r1" />
                          <Label htmlFor="r1" className="pt-[3px]">
                            None
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disableFuture" id="r2" />
                          <Label htmlFor="r2" className="pt-[3px]">
                            Disable future dates
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disablePast" id="r2" />
                          <Label htmlFor="r2" className="pt-[3px]">
                            Disable past dates
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  {field.type == "slider" && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-full">
                          <Label>Base number</Label>
                          <Input
                            value={field.baseNumber || ""}
                            type="number"
                            onChange={(e) =>
                              updateField(field.id, {
                                baseNumber: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="w-full">
                          <Label>Max number</Label>
                          <Input
                            value={field.maxNumber || ""}
                            type="number"
                            onChange={(e) =>
                              updateField(field.id, {
                                maxNumber: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-full">
                          <Label>DefaultValue</Label>
                          <Input
                            value={field.defaultValue || ""}
                            type="number"
                            onChange={(e) =>
                              updateField(field.id, {
                                defaultValue: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="w-full">
                          <Label>Steps</Label>
                          <Input
                            value={field.steps || ""}
                            type="number"
                            onChange={(e) =>
                              updateField(field.id, {
                                steps: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
      <div className="w-full flex justify-end">
        <Button variant={"link"} onClick={resetFields}>
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default ConfigPanel;
