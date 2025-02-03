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
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const config: FormFieldT[] = [
  {
    id: "4edc0dca-2ef5-4ef5-8839-0e5401eb5d16",
    type: "text",
    label: "Name",
    required: false,
    description: "Tell us your name",
    placeholder: "john doe",
  },
  {
    id: "1bcaf118-7033-440f-ab1d-7e9633b83c8f",
    type: "email",
    label: "Email",
    required: false,
    description: "",
    placeholder: "johndoe@mail.com",
  },
  {
    id: "random-ends",
    type: "textarea",
    label: "Description",
    required: true,
    description: "Tell us about yourself",
    placeholder: "",
  },
  {
    id: "random-ends1",
    type: "number",
    label: "Age",
    required: true,
    description: "Tell us your age",
    placeholder: "",
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
    description: "Select the fruits you will like us to add.",
    options: [
      {
        label: "Pawpaw",
        value: "pawpaw",
      },
      {
        label: "Pineapple",
        value: "pineapple",
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
  const handleSubmit = (data: z.infer<typeof generatedSchema>) => {
    console.log(generatedSchema.shape);
    const isValid = generatedSchema.safeParse(data);
    if (!isValid.success) {
      console.log(isValid.error.message);
    }
    console.log("Data sent", data);
    console.log(data);
  };
  return (
    <div className="max-w-xl mx-auto w-full py-10">
      <div className="flex flex-col  mb-10">
        <h4 className="text-[1.6rem] font-[600] ">Complaint form</h4>
        <h6 className="font-[500] text-regular text-[1.1rem]">
          Tell us about your complaint
        </h6>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
                    name={c.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
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
                {c.type == "textarea" && (
                  <FormField
                    control={form.control}
                    name={c.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {" "}
                          {c.label}
                          {c.required && "*"}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={c.placeholder && c.placeholder}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {c.description && c.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {c.type == "checkbox-group" && (
                  <FormField
                    control={form.control}
                    name={c.id}
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>
                            {c.label}
                            {c.required && "*"}
                          </FormLabel>
                          <FormDescription>
                            {c.description && c.description}
                          </FormDescription>
                        </div>
                        {c.options.map((item) => (
                          <FormField
                            key={item.value}
                            control={form.control}
                            name={c.id}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: string) =>
                                                  value !== item.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    className="font-normal 
                                  pt-[3px]"
                                  >
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            );
          })}
          <div className="w-full justify-end flex">
            <Button type="submit" >Submit</Button>
          </div>
        </form>
      </Form>
      <About />
    </div>
  );
};

export default ResponseForm;

const About = () => {
  return (
    <div className="w-full items-center justify-center ">
      <div className="max-w-[300px] mx-auto flex gap-1 flex-col text-center my-5">
        <p className="text-muted-foreground text-[14px] font-[500]">
          *Never submit passwords or credit card related information throuh this
          form
        </p>
        <p className="text-regular text-[14px] font-[500]">
          This form is powered by <a href="" className="underline underline-offset-2">Gather</a>
        </p>
      </div>
    </div>
  );
};
