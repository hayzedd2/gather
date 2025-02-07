import { getMyForms } from "@/actions/getMyForms";
import MyForms from "@/components/MyForms";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

interface FormResponseProps {
  id: string;
  updatedAt: Date;
  title: string;
  description: string;
  buttonText: string;
  formConfig: [];
  viewCount: number;
  _count: Record<"submissions", number>;
}
const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) => {
  const sParams = await searchParams;
  const search = sParams?.search || "";
  const result = await getMyForms({ search });
  const typedResult = result.forms as FormResponseProps[];
  
  if (result.error) {
    return <>An error occurred</>;
  }

  return (
    <div className="p-4 py-10 max-w-5xl mx-auto">
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
      <MyForms forms={typedResult} />
    </div>
  );
};

export default page;
