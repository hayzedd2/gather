"use client";

import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useSelectedFieldStore } from "@/store/useSelectedFieldStore";
import React from "react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useKeys } from "use-keys-bindings";
const ConfigPanel = () => {
  const selectedField = useSelectedFieldStore((state) => state.selectedField);
  const fields = useFormBuilder((state) => state.fields);
  const updateField = useFormBuilder((s) => s.updateField);
  const [option, setOption] = React.useState("");
  const options: string[] = [];
  useKeys({
    keys: ["s"],
    callback: () => {
      options.push(option);
      setOption("");
    },
  });
  if (!selectedField) {
    return null;
  }

  const field = fields.find((f) => f.id === selectedField);
  if (!field) {
    return null;
  }
  

  return (
    <div className="p-4 rounded-lg light-shadow flex-col flex gap-2">
      <h3 className="text-[1.3rem] font-[500]">Form configuration</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fieldLabel">Label</Label>
          <Input
            id="fieldLabel"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
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
        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={field.required}
            onCheckedChange={(checked) =>
              updateField(field.id, { required: checked })
            }
          />
          <Label htmlFor="required">Required</Label>
        </div>
        <div>
          <Label htmlFor="fieldPlaceholder">Type - ({field.type})</Label>
        </div>
        {/* {field.type === "text" && (
          <>
            <div>
              <Label htmlFor="minLength">Min Length</Label>
              <Input
                id="minLength"
                type="number"
                value={field.validation?.minLength || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      minLength: Number.parseInt(e.target.value) || undefined,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="maxLength">Max Length</Label>
              <Input
                id="maxLength"
                type="number"
                value={field.validation?.maxLength || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      maxLength: Number.parseInt(e.target.value) || undefined,
                    },
                  })
                }
              />
            </div>
          </>
        )} */}
        {field.type === "number" && (
          <>
            <div>
              <Label htmlFor="min">Min Value</Label>
              <Input
                id="min"
                type="number"
                value={field.validation?.min || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      min: Number.parseInt(e.target.value) || undefined,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max">Max Value</Label>
              <Input
                id="max"
                type="number"
                value={field.validation?.max || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      max: Number.parseInt(e.target.value) || undefined,
                    },
                  })
                }
              />
            </div>
          </>
        )}
        {/* {field.type === "email" && (
          <div>
            <Label htmlFor="pattern">Email Pattern</Label>
            <Input
              id="pattern"
              value={field.validation?.pattern || ""}
              onChange={(e) =>
                updateField(field.id, {
                  validation: {
                    ...field.validation,
                    pattern: e.target.value || undefined,
                  },
                })
              }
            />
          </div>
        )} */}
        {options.map((o)=> <>{o}</>)}
        {field.type === "select" && (
          <div>
            <Label htmlFor="options">Options (comma-separated)</Label>
            <Input
              id="options"
              value={field.options?.join(", ") || option}
              onChange={(e) => {
                setOption(e.target.value);
                updateField(field.id, { options });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigPanel;
