import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CircleOff, CircleSlash } from "lucide-react";
import { CustomButton } from "../reusable-comps/CustomButton";

const EmptyFormsList = () => {
  return (
    <section className="h-full flex min-h-[70vh] items-center  justify-center w-full">
      <div className="flex flex-col  w-full items-center justify-center">
        <CircleOff className="size-13 text-muted-foreground " />
        <div className="flex flex-col gap-2 items-center">
          <h4 className="mt-4 font-[500] text-[15px] text-subtle max-w-[300px] text-center">
            You haven't created any form at this time
          </h4>
          <Link href={"/forms/new"}>
            <CustomButton>Create new form</CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyFormsList;
