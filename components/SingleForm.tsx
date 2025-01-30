import React from "react";
import { SingleFormOptions } from "./SingleFormOptions";
import Link from "next/link";

interface SingleFormProps {
  title: string;
  _count: Record<"submissions", number>;
  id: string;
}
const SingleForm = ({ title, _count, id }: SingleFormProps) => {
  return (
    <div className="dotted-down  hover:bg-[#fafafa]  p-3">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`forms/${id}`} className="w-max">
            {title}
          </Link>
          <div className="flex gap-4">
            <p className="text-muted-foreground text-[13px] font-[500]">
              {_count.submissions} submissions
            </p>
            <p className="text-muted-foreground text-[13px] font-[500]">
              0 views
            </p>
            <p className="text-muted-foreground text-[13px] font-[500]">
              Last edited 5 mins ago
            </p>
          </div>
        </div>
        <SingleFormOptions id={id} />
      </div>
    </div>
  );
};

export default SingleForm;
