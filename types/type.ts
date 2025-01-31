import React from "react";

export type FieldType = "text" | "number" | "email" | "select" | "textarea";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface FormBuilderState {
  fields: FormField[];
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  resetFields:()=>void
  setFields: (newFields: FormField[])=>void
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
