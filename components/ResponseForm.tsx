"use client";
import { createFormDefaultValues } from "@/helpers/createFormdefaultValues";
import { generateZodSchema } from "@/helpers/generateZodSchema";
import { FormFieldT } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const config: FormFieldT[] = [
  {
    id: "4edc0dca-2ef5-4ef5-8839-0e5401eb5d16",
    type: "text",
    label: "Name",
    required: true,
    description: "Tell us your name",
    placeholder: "john doe",
  },
  {
    id: "1bcaf118-7033-440f-ab1d-7e9633b83c8f",
    type: "email",
    label: "Email",
    required: true,
    description: "",
    placeholder: "johndoe@mail.com",
  },
  {
    id: "6725c6d9-befc-4b95-8853-4c576bc2ba41",
    type: "select",
    label: "Service type",
    options: [
      {
        label: "Haircut",
        value: "option-1",
      },
      {
        label: "Massage",
        value: "option-c77c6096-6b13-42ed-86bb-4e9b4f80f60e",
      },
    ],
    required: true,
    description: "",
  },
  {
    id: "hello",
    type: "checkbox-group",
    label: "Pick fruits",
    options: [
      {
        label: "Pawpaw",
        value: "pawpaw",
      },
    ],
    required: true,
  },
];
const ResponseForm = () => {
  const generatedSchema = generateZodSchema(config);
  const defaultValues = createFormDefaultValues(config);
  const form = useForm<z.infer<typeof generatedSchema>>({
    resolver: zodResolver(generatedSchema),
    defaultValues,
  });
  const loading = false;

  return (
    <div className="max-w-xl mx-auto w-full">
      <Form {...form}>
        <form className="space-y-3">
          {config.map((c) => {
            return (
              <div key={c.id}>
                {["text", "number", "email"].includes(c.type) && (
                  <FormField
                    control={form.control}
                    name={c.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {c.label}
                          {c.required && "*"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              "placeholder" in c ? c.placeholder : ""
                            }
                            {...field}
                            type={c.type}
                            disabled={loading}
                          />
                        </FormControl>
                        {c.description && (
                          <FormDescription>{c.description}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {c.type == "select" && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {" "}
                          {c.label}
                          {c.required && "*"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  c.placeholder
                                    ? c.placeholder
                                    : "Select an option"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {c.options.map((s, i) => {
                              return (
                                <SelectItem value={s.value} key={i}>
                                  {s.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            );
          })}
        </form>
      </Form>
    </div>
  );
};

export default ResponseForm;

// const GetFormControlType = ({ id, type }: FormFieldT) => {
//   switch (type) {
//     case "text":
//       return (
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email*</FormLabel>
//               <FormControl>
//                 <Input {...field} disabled={loading} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         ></FormField>
//       );
//   }
// };
