import React from "react";

export interface BaseField {
  id: string;
  label: string;
  description?: string;
  required: boolean;
}

export interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface EmailField extends BaseField {
  type: "email";
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  placeholder?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  multiple?: boolean;
}

export interface CheckboxGroupField extends BaseField {
  type: "checkbox-group";
  options: Array<{
    label: string;
    value: string;
  }>;
  validation?: {
    minSelected?: number;
    maxSelected?: number;
  };
}

export interface RadioGroupField extends BaseField {
  type: "radio-group";
  options: Array<{
    label: string;
    value: string;
  }>;
}

export interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

export type FormField =
  | TextField
  | NumberField
  | EmailField
  | SelectField
  | CheckboxGroupField
  | RadioGroupField
  | TextareaField;

export type FieldType = FormField["type"];

export interface FormBuilderState {
  fields: FormField[];
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  resetFields: () => void;
  setFields: (newFields: FormField[]) => void;
}

export interface SidebarLinksT {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export interface UserObject {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
}

export type viewT = "preview" | "configure" | "settings";
export interface ViewProps {
  view: viewT;
  setView: React.Dispatch<React.SetStateAction<viewT>>;
}

export interface FormSettingProps {
  title: string;
  description: string;
  buttonCtaText?: string | undefined;
  saveAsTemplate: boolean;
}

export interface FormSettingsControllerProps {
  setFormSettingValues: React.Dispatch<React.SetStateAction<FormSettingProps>>;
}

export interface FormActionProps {
  onPublish: () => void;
  isPending: boolean;
}
export interface FormPayloadProps {
  title: string;
  description: string;
  buttonCtaText?: string | undefined;
  saveAsTemplate: boolean;
  fields: FormField[];
}

export interface FormResponseProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  description: string;
  buttonText: string | null;
  formConfig: [];
  _count: Record<"submissions", number>;
}

export interface GetFormSubmissionProps {
  formConfig: FormField[];
  _count: Record<"submissions", number>;
}
