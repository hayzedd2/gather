"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FormField } from "@/types/type";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import FormPreview from "./FormPreview";

interface TemplateProps {
  title: string;
  description: string;
  tags: string[];
  formConfig: FormField[];
}
const TemplateCard = ({
  title,
  description,
  tags,
  formConfig,
}: TemplateProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const setfields = useFormBuilder((s) => s.setFields);
  const maxLength = 90;
  const truncatedDesc =
    description.length > maxLength
      ? description.slice(0, maxLength).concat("...")
      : description;
  const handleClick =  () => {
    setIsPreviewOpen(true);
    console.log(formConfig)
     setfields(formConfig);
  };
  return (
    <>
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <button onClick={() => setIsPreviewOpen(false)}>Close me</button>
        <FormPreview />
      </Modal>
      <div onClick={handleClick} className="p-3 cursor-pointer ">
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
