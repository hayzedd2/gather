import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface SuccessMessageProps {
  title: string;
  id: string;
  successMessage: string | null;
}
const SuccessMessage = ({ title, id, successMessage }: SuccessMessageProps) => {
  return (
    <div>
      <div className=" w-full flex flex-col items-start ">
        <h4 className="text-[1.6rem] font-[600] ">{title}</h4>
        <h6 className="font-[500] text-regular text-[1.1rem]">
          {successMessage || " Thanks for submitting your info!"}
        </h6>

        <div className="w-full flex justify-end">
          <Button variant={"link"} className="px-0">
            <span>Submit another response</span>
          </Button>
        </div>
      </div>
      <About />
    </div>
  );
};

export default SuccessMessage;

const About = () => {
  return (
    <div className=" mt-auto absolute bottom-0 items-center justify-center ">
      <div className="max-w-[300px] mx-auto flex gap-1 flex-col text-center my-5">
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
