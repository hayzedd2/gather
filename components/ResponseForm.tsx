"use client";
import { createFormDefaultValues } from "@/helpers/createFormdefaultValues";
import { generateZodSchema } from "@/helpers/generateZodSchema";
import { ResponseFormProps } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useSendFormResponse } from "@/hooks/useSendFormResponse";
import { SvgLoading } from "./SvgLoading";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SuccessMessage from "./SuccessMessage";

const ResponseForm = ({
  id,
  buttonText,
  title,
  description,
  formConfig,
}: ResponseFormProps) => {
  const generatedSchema = generateZodSchema(formConfig);
  const defaultValues = createFormDefaultValues(formConfig);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<z.infer<typeof generatedSchema>>({
    resolver: zodResolver(generatedSchema),
    defaultValues,
  });

  const { mutate, isPending: loading } = useSendFormResponse(id);

  const handleSubmit = (data: z.infer<typeof generatedSchema>) => {
    const isValid = generatedSchema.safeParse(data);
    if (!isValid.success) {
      console.log(isValid.error.message);
    }
    try {
      mutate(data, {
        onSuccess: () => {
          toast.success("Your response is submitted succesfully")
          setHasSubmitted(true);
          const params = new URLSearchParams(searchParams);
          params.set("success", "true");
          replace(`${pathname}?${params.toString()}`);
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  const showSuccess = searchParams.get("success") === "true" && hasSubmitted;
  return (
    <>
      {showSuccess ? (
        <SuccessMessage title={title} id={id} />
      ) : (
        <div className="max-w-xl mx-auto w-full py-10">
          <div className="flex flex-col  mb-10">
            <h4 className="text-[1.6rem] font-[600] ">{title}</h4>
            <h6 className="font-[500] text-regular text-[1.1rem]">
              {description}
            </h6>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {formConfig.map((c) => {
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
                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
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
                    {c.type == "radio-group" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {c.options.map((o, i) => {
                                  return (
                                    <FormItem
                                      key={i}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={o.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal pt-[3px]">
                                        {o.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                );
              })}
              <div className="w-full justify-end flex">
                <Button type="submit" disabled={loading}>
                  {loading && <SvgLoading />}
                  <p className="mt-[0.2rem]">{buttonText}</p>
                </Button>
              </div>
            </form>
          </Form>
          <About />
        </div>
      )}
    </>
  );
};

export default ResponseForm;

const About = () => {
  return (
    <div className="w-full mt-4 items-center justify-center ">
      <div className="max-w-[300px] mx-auto flex gap-1 flex-col text-center my-5">
        <p className="text-muted-foreground text-[14px] font-[500]">
          *Never submit passwords or credit card related information throuh this
          form
        </p>
        <p className="text-regular text-[14px] font-[500]">
          This form is powered by{" "}
          <a href="" className="underline underline-offset-2">
            Gather
          </a>
        </p>
      </div>
    </div>
  );
};
