import React from "react";

const Pill = ({ s }: { s: string }) => {
  return (
    <span
      className={`whitespace-nowrap   w-max h-max  text-xs font-[500] py-[0.15rem] bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 rounded-full px-2`}
    >
      {s}
    </span>
  );
};

export default Pill;
