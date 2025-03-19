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
  label: string;
  type: "select";
  placeholder?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  description?: string;

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

export interface RatingField extends BaseField {
  type: "rating";
  length: number;
}

export interface SliderField extends BaseField {
  type: "slider";
  defaultValue: number;
  baseNumber: number;
  maxNumber: number;
  steps: number;
}
export interface SwitchField extends BaseField {
  type: "switch";
  defaultCheckedValue: boolean;
}

export type dateRestrictionFormats = "none" | "disableFuture" | "disablePast";

export interface DateField extends BaseField {
  type: "date";
  datePickerPlaceholder:string
  dateRestriction: dateRestrictionFormats;
}

export type FormField =
  | TextField
  | NumberField
  | EmailField
  | SelectField
  | CheckboxGroupField
  | RadioGroupField
  | TextareaField
  | RatingField
  | SliderField
  | SwitchField
  | DateField;

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
  successMessage?: string;
}

export interface FormSettingsControllerProps {
  setFormSettingValues: React.Dispatch<React.SetStateAction<FormSettingProps>>;
}

export interface FormActionProps {
  onPublish: () => void;
  isPending: boolean;
  type?: "edit" | "new";
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
  lastEdited: string;
  title: string;
  description: string;
  buttonText: string;
  formConfig: [];

  viewCount: number;
  _count: Record<"submissions", number>;
}

export interface GetFormSubmissionProps {
  labels: string[];
  submissionsCount: number;
  submissions: {
    [x: string]: string | string[];
  }[];
  title: string;
}

export interface ResponseFormProps {
  id: string;
  description: string;
  title: string;
  buttonText: string;
  formConfig: FormField[];
  successMessage: string | null;
}

export interface CountryAnalyticsDataProps {
  country: string;
  count: number;
}

export interface DailySubmissionsAnalyticsDataProps {
  date: string;
  count: number;
}

export interface CountryDataProps {
  count: number;
  country: string;
}

export interface DailySubmissionsProps {
  count: number;
  date: string;
}
export interface SingleFormAnalyticsProps {
  totalSubmissions: number;
  countryData: CountryDataProps[];
  dailySubmissions: DailySubmissionsProps[];
  viewCount: number;
}
