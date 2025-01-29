import MyForms from "@/components/MyForms";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-4 py-10 max-w-3xl mx-auto">
      <div className="w-full items-start flex justify-between ">
        <div className="flex flex-col">
          <h3 className="font-[600] text-[1.6rem]">Your forms</h3>
          <h6 className="mt-[-4px]">Manage your forms and submissions.</h6>
        </div>
        <div>
          <Link href={"/forms/new"}>
            <Button>Create new form</Button>
          </Link>
        </div>
      </div>
      <MyForms />
    </div>
  );
};

export default page;
