import React from "react";
import { Button } from "./ui/button";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { SingleFormOptions } from "./SingleFormOptions";

const SingleForm = () => {
  return (
    <div className="dotted-down cursor-pointer hover:bg-[#fafafa]  p-3">
      <div className="flex items-center justify-between">
        <div>
          <h4>Customer complaint form</h4>
          <div className="flex gap-4">
            <p className="text-muted-foreground text-[13px] font-[500]">
              0 submissions
            </p>
            <p className="text-muted-foreground text-[13px] font-[500]">
              0 views
            </p>
            <p className="text-muted-foreground text-[13px] font-[500]">
              Last edited 5 mins ago
            </p>
          </div>
        </div>
        <SingleFormOptions />
      </div>
    </div>
  );
};

export default SingleForm;
