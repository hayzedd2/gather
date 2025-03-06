import MyForms from "@/components/forms/MyForms";
import Navbar from "@/components/homepage/Navbar";
import { CustomButton } from "@/components/reusable-comps/CustomButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 mb-5 max-w-5xl mx-auto">
        <div className="w-full items-start flex justify-between ">
          <div className="flex flex-col">
            <h3 className="font-[600] text-[1.6rem]">My forms</h3>
            <h6 className="mt-[-4px]">Manage your forms and submissions.</h6>
          </div>
          <div>
            <Link href={"/forms/new"}>
              <CustomButton>Create new form</CustomButton>
            </Link>
          </div>
        </div>
        <MyForms />
      </div>
    </div>
  );
};

export default page;
