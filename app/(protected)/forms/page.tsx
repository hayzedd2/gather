import FormBuilder from "@/components/FormBuilder";
import SingleForm from "@/components/SingleForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
         <Link href={'/forms/new'}> <Button>Create new form</Button></Link>
        </div>
      </div>
      <div className="search flex mt-8 gap-1 flex-col">
        <p className="text-muted-foreground text-[14px] font-[500]">
          Search for a form
        </p>
        <Input placeholder="Customer complaint form" />
      </div>
      <div className=" forms mt-4">
        <SingleForm />
        <SingleForm />
      </div>
    </div>
  );
};

export default page;
