"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SingleFormSettingsSchema } from "@/schema";
import { Textarea } from "./ui/textarea";

interface SettingsProps {
  id: string;
  title: string;
  description: string;
  buttonText: string;
}
const SingleFormSettings = ({
  id,
  title,
  description,
  buttonText,
}: SettingsProps) => {
  const form = useForm<z.infer<typeof SingleFormSettingsSchema>>({
    resolver: zodResolver(SingleFormSettingsSchema),
    defaultValues: {
      title,
      description,
      buttonCtaText: buttonText,
    },
  });
  const {isDirty}= form.formState
  const onSubmit = (data: z.infer<typeof SingleFormSettingsSchema>) => {
    console.log(data);
  };
  return (
    <div className="px-3 mt-4 flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-2 rounded-md bg-white border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-4 py-4 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="font-[500] text-[1.05rem]">
                      Form Name*
                    </FormLabel>
                    <FormDescription className="pb-2">
                      Used to tell your users the name of the form they are
                      filling
                    </FormDescription>
                    <FormControl>
                      <Input className="w-[600px]" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="font-[500] text-[1.05rem]">
                      Form Description*
                    </FormLabel>
                    <FormDescription className="pb-2">
                      Used to describe your form to your users
                    </FormDescription>
                    <FormControl>
                      <Textarea className="w-[600px]" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buttonCtaText"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="font-[500] text-[1.05rem]">
                      Button Text*
                    </FormLabel>
                    <FormDescription className="pb-2">
                      Use an informative button to tell your users about what
                      they are doing
                    </FormDescription>
                    <FormControl>
                      <Input className="w-[600px]" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full px-4 py-2 bg-[#fafafa] flex justify-end">
              <Button
                className=" disabled:bg-[#f2f2f2] "
                variant={"outline"}
                size={"md"}
                disabled={!isDirty}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* delete segment */}

      <div className="w-full rounded-md bg-white border border-red-300">
        <div className="p-4">
          <h2 className="font-[500] text-[1.05rem]">Delete Form</h2>
          <h6 className="text-[14px] text-regular ">
            The form will be permanently deleted, including its responses and
            analytics. This action is irreversible and can not be undone
          </h6>
        </div>
        <div className="w-full rounded-bl-md rounded-br-md px-4 py-2 bg-red-100 flex justify-end">
          <Button variant={"destructive"} size={"md"}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SingleFormSettings;
