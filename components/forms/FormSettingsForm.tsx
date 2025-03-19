"use client";
import { Settings } from "lucide-react";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSettingsSchema, RegisterSchema } from "@/schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useFormHelpers } from "@/hooks/useFormHelpers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { FormSettingsControllerProps } from "@/types/type";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { toast } from "sonner";

const FormSettingsForm = () => {
  const { saveFields, settingFields } = useSettingsFormStore();
  const form = useForm<z.infer<typeof FormSettingsSchema>>({
    resolver: zodResolver(FormSettingsSchema),
    defaultValues: settingFields,
  });

  const onSubmit = (values: z.infer<typeof FormSettingsSchema>) => {
    saveFields(values);
    toast.success("Settings saved!");
  };
  return (
    <div className="">
      <div className="font-[500] flex items-center gap-2 text-[1.3rem] text-regular">
        {/* <Settings /> */}
        <div className="flex flex-col">
          <h4>Form settings</h4>
          <p className="text-subtle font-[500] text-[14px]">
            Edit or talk about your form
          </p>
        </div>
      </div>
      <div className="max-w-2xl my-3 mx-auto bg-white p-5 rounded-lg ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form title*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter  form title.."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tell your users the name of the form they are filling.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form description*</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter form description.."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your users description about the form they are filling
                    (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonCtaText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button label</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Submit complaint" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a well-descriptive button text, telling your users
                    what they are doing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="successMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Success message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g Complaint submitted successfully"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a success message to be shown to your users after they
                    submit the form.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="saveAsTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <p className="flex gap-2 items-center">
                      Save this form as template{" "}
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </p>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex  justify-end">
              {" "}
              <Button type="submit">Done</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormSettingsForm;
