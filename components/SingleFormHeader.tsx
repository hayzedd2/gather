import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import SingleFormOptionsTab from "./SingleFormOptionsTab";
import { getRelativeTime } from "@/helpers/getRelativeTime";

type FormResponseProps = {
  form: {
    id: string;
    title: string;
    updatedAt: Date;
    _count: {
      submissions: number;
    };
  } | null;
};
const SingleFormHeader = ({ form }: FormResponseProps) => {
  if (!form) {
    return <div>Empty form</div>;
  }
  return (
    <div>
      <Link href={"/forms"} className="my-6 gap-1 px-3 flex items-center">
        <ChevronLeft size={18} />{" "}
        <span className="mt-[2px] font-[500]">Back</span>
      </Link>
      <div className="flex px-3 justify-between w-full items-center">
        <div>
          <h4 className="font-[500] text-[1.3rem]">{form.title}</h4>
          <div className="flex gap-4">
            <p className="text-muted-foreground text-[15px] font-[500]">
              {form._count.submissions} submissions
            </p>
            <p className="text-muted-foreground text-[15px] font-[500]">
              0 views
            </p>
            <p className="text-muted-foreground text-[15px] font-[500]">
              {getRelativeTime(form.updatedAt.toDateString())}
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant={"outline"}>View</Button>
          <Button>Edit form</Button>
        </div>
      </div>
      <SingleFormOptionsTab id={form.id} />
    </div>
  );
};

export default SingleFormHeader;
