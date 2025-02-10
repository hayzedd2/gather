import TemplateCard from "@/components/TemplateCard";
import { formTemplates } from "@/content/template";
import { FormField } from "@/types/type";
import React from "react";

const page = () => {
  return (
    <section className="p-4 py-10 max-w-5xl mx-auto">
      <div className="w-full items-center text-center flex-col flex justify-center ">
        <h3 className="font-[600] text-[2rem]">Form templates</h3>
        <h6 className="mt-[-3px] max-w-[500px]">
          Start with a template to create your form faster!
        </h6>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-3 py-3 mt-4 dotted-up">
        {formTemplates.map((t, i) => (
          <TemplateCard
            formConfig={t.formConfig as unknown as FormField[]}
            key={i}
            title={t.title}
            description={t.description}
            tags={t.tags}
            buttonText={t.buttonText}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
