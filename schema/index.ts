import * as z from "zod"

export const RegisterSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
   
    password: z.string().min(7, {
      message: "Minimum of 8 is characters required",
    }),
  });
  