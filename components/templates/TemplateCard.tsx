"use client";
import React, { useState } from "react";
import { FormField } from "@/types/type";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TemplatePreview from "./TemplatePreview";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSettingsFormStore } from "@/store/useSettingsFormStore";
import { useCreateform } from "@/hooks/useCreateForm";
import { toast } from "sonner";
import { SvgLoading } from "../reusable-comps/SvgLoading";

interface TemplateProps {
  title: string;
  description: string;
  tags: string[];
  formConfig: FormField[];
  buttonText: string;
}
const TemplateCard = ({
  title,
  description,
  tags,
  formConfig,
  buttonText,
}: TemplateProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const setfields = useFormBuilder((s) => s.setFields);
  const router = useRouter();
  const saveFields = useSettingsFormStore((s) => s.saveFields);
  const setFields = useFormBuilder((s) => s.setFields);
  const { mutate, isPending } = useCreateform();
  const maxLength = 500;
  const truncatedDesc =
    description.length > maxLength
      ? description.slice(0, maxLength).concat("...")
      : description;

  const handleClick = () => {
    setIsPreviewOpen(true);
    setfields(formConfig);
  };
  const onFormPublish = () => {
    const payLoad = {
      fields: formConfig,
      title,
      description,
      buttonText,
      saveAsTemplate: false,
    };
    try {
      mutate(payLoad, {
        onSuccess: () => {
          setIsPreviewOpen(false);
        },
      });
    } catch (err) {
      toast.error("An error occured");
      console.log(err);
    }
  };
  const onEditForm = () => {
    saveFields({
      title,
      description,
      buttonCtaText: buttonText,
      saveAsTemplate: false,
    });
    setFields(formConfig);
    router.push("/templates/edit");
  };
  return (
    <>
      <Sheet
        open={isPreviewOpen}
        onOpenChange={() => setIsPreviewOpen(!isPreviewOpen)}
      >
        <SheetContent className="flex flex-col p-0  w-[350px] md:min-w-[500px] overflow-y-auto">
          <div className="flex-grow overflow-y-auto p-6">
            <SheetHeader>
              <SheetTitle className="text-[1.6rem]">{title}</SheetTitle>
              <SheetDescription className="">{description}</SheetDescription>
            </SheetHeader>
            <p className="py-3 dotted-down text-center text-[14px] text-muted-foreground font-[500]">
              Template preview
            </p>
            <TemplatePreview btnText={buttonText} />
          </div>
          <SheetFooter className="sticky bottom-0 px-6 py-4 bg-white border-t">
            <div className="flex justify-between items-center w-full">
              <Button onClick={onFormPublish} disabled={isPending}>
                {isPending && <SvgLoading />}{" "}
                <span className="mt-[0.2rem]">Publish template</span>
              </Button>
              <Button
                disabled={isPending}
                onClick={onEditForm}
                variant={"outline"}
              >
                Edit template
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div
        onClick={handleClick}
        className="p-4   cursor-pointer border rounded-lg"
      >
        <h4 className="font-[500] text-[1.1rem]">{title}</h4>
        <h6 className="mt-[-1px] text-muted-foreground font-[500] text-[13px]">
          {truncatedDesc}
        </h6>
        <div className="flex gap-1 mt-3">
          {tags.map((t, i) => (
            <Pill s={t} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateCard;

const Pill = ({ s }: { s: string }) => {
  return (
    <span
      className={`whitespace-nowrap   w-max  text-xs font-[500] py-1 bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 rounded-full px-2`}
    >
      {s}
    </span>
  );
};
