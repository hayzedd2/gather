"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Socials } from "./Socials";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  semiButtonLabel: string;
  type: "up"|"in"
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  headerDescription,
  semiButtonLabel,
  backButtonHref,
  type,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-lg shadow-zinc-500/10 ">
      <CardHeader>
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <div className="mb-1">
            <h1 className="text-[1.4rem] font-[600]">{headerLabel}</h1>
          </div>
          {/* <p className="text-subtle text-[14px] font-[500]">
            {headerDescription}
          </p> */}
        </div>
        <Socials type={type} />
        <div className="flex gap-3 items-center py-3">
          <div className="w-full border"></div>
          <h6 className="font-[600] text-[14px] text-subtle">OR</h6>
          <div className="w-full border"></div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <button className="w-full flex items-center justify-center">
          <Link className=" text-subtle flex gap-1 text-[14px]" href={backButtonHref}>
            {backButtonLabel}
            <span className="text-regular "> {semiButtonLabel}</span>
          </Link>
        </button>
      </CardFooter>
    </Card>
  );
};
