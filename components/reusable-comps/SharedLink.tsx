import React from "react";
import CopyToClipBoard from "./CopyToClipboardButton";
import Link from "next/link";

const SharedLink = ({ link }: { link: string }) => {
  return (
    <div className="rounded-[8rem] my-2 border-[#ebebeb] border text-regular px-3 py-1 flex gap-4 justify-between items-center">
      <Link target="_blank" href={link} className="font-[500] underline underline-offset-2 text-[13px]">{link}</Link>
      <CopyToClipBoard text={link} />
    </div>
  );
};

export default SharedLink;
