import React from "react";
import CopyToClipBoard from "./CopyToClipboardButton";

const SharedLink = ({ link }: { link: string }) => {
  return (
    <div className="rounded-[8rem] my-2 border-[#ebebeb] border text-regular px-3 py-1 flex gap-4 justify-between items-center">
      <p className="font-[500] text-[13px]">{link}</p>
      <CopyToClipBoard text={link} />
    </div>
  );
};

export default SharedLink;
