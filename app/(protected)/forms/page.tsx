import MyForms from "@/components/MyForms";
import Navbar from "@/components/Navbar";
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
              <Button>Create new form</Button>
            </Link>
          </div>
        </div>
        <MyForms />
      </div>
    </div>
  );
};

export default page;
