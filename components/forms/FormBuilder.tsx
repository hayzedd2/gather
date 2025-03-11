"use client";
import React, { useState } from "react";
import FormPreview from "./FormPreview";
import ConfigPanel from "./ConfigPanel";
import AddField from "./AddField";
import FormControlTab from "./FormControlTab";
import { viewT } from "@/types/type";
import FormSettingsForm from "./FormSettingsForm";
import { FormSettingsSchema } from "@/schema";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { toast } from "sonner";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useCreateform } from "@/hooks/useCreateForm";
import { SvgLoading } from "../reusable-comps/SvgLoading";
import { useIsMobile } from "@/hooks/useIsMobile";
import ErrorMessage from "../reusable-comps/ErrorMessage";
import { TextShimmer } from "../reusable-comps/TextShimmer";
import { CustomButton } from "../reusable-comps/CustomButton";

const FormBuilder = () => {
  const [view, setView] = React.useState<viewT>("configure");
  const { settingFields } = useSettingsFormStore();
  const { fields } = useFormBuilder();
  const isMobile = useIsMobile();
  const { mutate, isPending } = useCreateform();
  const onPublishForm = () => {
    if (fields.length == 0) {
      toast.warning("Add at least one form field");
      return;
    }
    const validData = FormSettingsSchema.safeParse(settingFields);
    if (!validData.success) {
      toast.warning(
        "Missing field in settings, please edit before you can proceed."
      );
      return;
    }
    const payLoad = {
      fields,
      ...validData.data,
    };
    mutate(payLoad, {
      onError: () => {
        toast.error("An error occurred");
      },
    });
  };

  if (isMobile) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-2">
        <ErrorMessage message="The form builder is not optimized for mobile devices. Please open this page on a larger screen " />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen ">
      <div className="w-full  flex  flex-col  flex-1 bg-[#fafafa] relative">
        <FormControlTab view={view} setView={setView} />
        <div className="max-w-[40rem]  mx-auto w-full p-2 ">
          {view == "configure" && <ConfigPanel />}
          {view == "preview" && <FormPreview />}
          {view == "settings" && <FormSettingsForm />}
        </div>
        <div className="w-full  sticky bottom-0 z-10  mt-auto bg-[#fafafa] p-4">
          <div className="flex w-full justify-end">
            <CustomButton
              onClick={onPublishForm}
              type="submit"
              className="flex gap-1 items-center"
              disabled={isPending}
            >
              {isPending && <SvgLoading />}
              <p className="mt-[0.2rem]">
                <TextShimmer duration={1}>Publish form</TextShimmer>
              </p>
            </CustomButton>
          </div>
        </div>
      </div>
      <div className="flex  bg-[#FAFAFA] top-0 h-screen  p-4 flex-col sticky gap-4 w-[20rem] dotted dotted-left ">
        <AddField />
      </div>
    </div>
  );
};

export default FormBuilder;
