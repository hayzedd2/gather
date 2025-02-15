import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),

  password: z.string().min(7, {
    message: "Minimum of 8 is characters required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(7, {
    message: "Minimum of 8 is characters required",
  }),
});

export const FormSettingsSchema = z.object({
  title: z.string().min(1, {
    message: "Form title is required",
  }),
  description: z.string().min(1, {
    message: "Form description is required",
  }),
  buttonCtaText: z.string().optional(),
  saveAsTemplate: z.boolean(),
});

export const SingleFormSettingsSchema = z.object({
  title: z.string().min(1, {
    message: "Form title is required",
  }),
  description: z.string().min(1, {
    message: "Form description is required",
  }),
  buttonCtaText: z.string().optional(),
});