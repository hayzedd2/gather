import React from "react";
import CopyToClipBoard from "./CopyToClipboardButton";

const SharedLink = ({ link }: { link: string }) => {
  return (
    <div className="rounded-sm bg-secondary p-3 flex gap-3 justify-between items-center">
      <p className="font-[500] text-[14px]">{link}</p>
      <CopyToClipBoard text={link} />
    </div>
  );
};

export default SharedLink;
