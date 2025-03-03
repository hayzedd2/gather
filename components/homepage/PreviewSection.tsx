import React from "react";
import StaggerText from "../reusable-comps/StaggerText";
import DemoForm from "../forms/DemoForm";

const PreviewSection = () => {
  return (
    <section className="pt-20 pb-4 mb-20 bg-[#fafafa] rounded-xl">
      {" "}
      <div className="flex gap-2 flex-col items-center justify-center">
        <StaggerText className="text-[2.5rem] max-w-[450px] items-center justify-center leading-[2.5rem] mx-auto  text-center font-[600]">
          Make form-building seamless and powerful
        </StaggerText>
        <h6 className="text-muted-foreground mx-auto text-center  text-[15px] font-[500] max-w-[500px]">
          Revolutionize the way you collect data
        </h6>
        <button className="rounded-[100px] mb-3 w-max bg-black text-[14px] font-[500] hover:opacity-80 text-white py-[6px] px-[14px] cursor-pointer">
          Create a form now
        </button>
      </div>
      <div className="bg-white rounded-xl px-4 mx-4 relative  min-h-[300px]">
        <DemoForm />
      </div>
    </section>
  );
};

export default PreviewSection;
