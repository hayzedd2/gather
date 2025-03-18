"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, PencilIcon } from "lucide-react";
import SingleFormOptionsTab from "./SingleFormOptionsTab";
import { getRelativeTime } from "@/helpers/getRelativeTime";
import SharedLink from "../reusable-comps/SharedLink";
import { generateShareableLink } from "@/helpers/generateShareableLink";
import { useGetSingleForm } from "@/hooks/useGetSingleForm";
import SingleFormViewSkeleton from "./SingleFormViewSkeleton";

const SingleFormHeader = ({ id }: { id: string }) => {
  const { data: form, isPending } = useGetSingleForm(id);
  if (isPending) {
    return <SingleFormViewSkeleton />;
  }
  if (!form) {
    return null;
  }
  return (
    <div>
      <Link href={"/forms"} className="my-6 w-max gap-1 px-3 flex items-center">
        <ChevronLeft size={18} />{" "}
        <span className="mt-[2px] font-[500]">Back</span>
      </Link>
      <div className="flex px-3 justify-between flex-wrap  w-full items-center">
        <div>
          <h4 className="font-[500] text-[1.3rem]">{form.title}</h4>
          <div className="flex gap-4 flex-wrap">
            <p className="text-muted-foreground text-[15px] font-[500]">
              {form._count.submissions}{" "}
              <span>
                {form._count.submissions != 1 ? "submissions" : "submission"}
              </span>
            </p>
            <p className="text-muted-foreground text-[15px] font-[500]">
              {form.viewCount}{" "}
              <span>{form.viewCount != 1 ? "views" : "view"}</span>
            </p>

            <p className="text-muted-foreground text-[15px] font-[500]">
              {getRelativeTime(form.lastEdited)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <SharedLink link={generateShareableLink(form.id)} />
          <div className="flex gap-3 items-center justify-end ">
            {" "}
            <Link href={`/forms/${id}/edit`}>
              <Button className="w-7 h-7 mt-1" variant={"outline"} size={"icon"}>
                <PencilIcon  size={14}/>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <SingleFormOptionsTab id={form.id} />
    </div>
  );
};

export default SingleFormHeader;
