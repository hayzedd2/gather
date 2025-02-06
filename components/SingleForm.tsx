import React from "react";
import { SingleFormOptions } from "./SingleFormOptions";
import Link from "next/link";
import { getRelativeTime } from "@/helpers/getRelativeTime";

interface SingleFormProps {
  title: string;
  submissionsCount: number;
  id: string;
  updatedAt: string;
  viewCount: number;
}
const SingleForm = ({
  title,
  submissionsCount,
  id,
  updatedAt,
  viewCount,
}: SingleFormProps) => {
  return (
    <div className="dotted-down  hover:bg-[#fafafa]  p-3">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`forms/${id}/submissions`} className="w-max">
            {title}
          </Link>
          <div className="flex gap-4">
            <p className="text-muted-foreground text-[13px] font-[500]">
              {submissionsCount} submissions
            </p>
            <p className="text-muted-foreground  text-[13px] font-[500]">
              {viewCount} <span>{viewCount != 1 ? "views" : "view"}</span>
            </p>
            <p className="text-muted-foreground text-[13px] font-[500]">
              {getRelativeTime(updatedAt)}
            </p>
          </div>
        </div>
        <SingleFormOptions id={id} />
      </div>
    </div>
  );
};

export default SingleForm;
