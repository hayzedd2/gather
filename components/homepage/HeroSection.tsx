import React from "react";
import StaggerText from "../reusable-comps/StaggerText";
import SkewedImage from "./SkewedImage";
import { TextShimmer } from "../reusable-comps/TextShimmer";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="#">
      <div className="flex mt-8 md:mt-0 flex-col w-full items-center justify-center ">
        <div className="hero mt-10 flex flex-col items-center">
          <StaggerText className="md:text-[3rem] text-[2rem] mx-auto max-w-[300px] md:max-w-[400px] items-center justify-center leading-[2rem] md:leading-[3rem] text-center font-[500]">
            Build beautiful forms in minutes
          </StaggerText>

          <h6 className="text-muted-foreground mb-2 text-[15px] font-[500] max-w-[350px] md:max-w-[400px] mx-auto text-center">
            Create beautiful forms and share them anywhere. It's super fast, you
            don't need to know how to code.
          </h6>
          <Link
            href="/register"
            className="rounded-[100px] bg-black text-[14px] font-[500] hover:opacity-80 text-white py-[6px] px-[14px] cursor-pointer bx-shadow"
          >
            Start for free
          </Link>
        </div>
        <SkewedImage />
      </div>
    </section>
  );
};

export default HeroSection;
