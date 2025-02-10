"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FormField } from "@/types/type";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import FormPreview from "./FormPreview";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TemplatePreview from "./TemplatePreview";
import { Button } from "./ui/button";

interface TemplateProps {
  title: string;
  description: string;
  tags: string[];
  formConfig: FormField[];
  buttonText:string
}
const TemplateCard = ({
  title,
  description,
  tags,
  formConfig,
  buttonText
}: TemplateProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const setfields = useFormBuilder((s) => s.setFields);
  const maxLength = 90;
  const truncatedDesc =
    description.length > maxLength
      ? description.slice(0, maxLength).concat("...")
      : description;
  const handleClick = () => {
    setIsPreviewOpen(true);
    console.log(formConfig);
    setfields(formConfig);
  };
  const onFormPublish = ()=>{

  }
  return (
    <>
      <Sheet
        open={isPreviewOpen}
        onOpenChange={() => setIsPreviewOpen(!isPreviewOpen)}
      >
        <SheetContent className="min-w-[500px]   overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-[1.6rem]">{title}</SheetTitle>
            <SheetDescription className="">{description}</SheetDescription>
          </SheetHeader>
          <p className="py-3 dotted-down text-center text-[14px] text-muted-foreground font-[500]">
            Template preview
          </p>
          <TemplatePreview btnText={buttonText} />
          <SheetFooter className="dotted-up mt-auto sticky z-50 bottom-0 py-3 bg-white flex justify-between items-center">
            <Button>Publish template</Button>
            <Button variant={"outline"}>Edit template</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div onClick={handleClick} className="p-3  cursor-pointer ">
        <h4 className="font-[500] text-[1.2rem]">{title}</h4>
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
