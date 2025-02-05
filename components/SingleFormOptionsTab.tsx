"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SingleFormOptionsTabProps {
  id: string;
}
const tabOptions = [
  {
    href: "/submissions",
    label: "Submissions",
  },
  {
    href: "/analytics",
    label: "Analytics",
  },
  {
    href: "/integrations",
    label: "Integrations",
  },

  {
    href: "/settings",
    label: "Settings",
  },
];
const SingleFormOptionsTab = ({ id }: SingleFormOptionsTabProps) => {
  const [hoveredTab, setHoveredTab] = React.useState<number | null>(null);
  const pathName = usePathname();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [activeStyles, setActiveStyles] = React.useState({ left: 0, width: 0 });
  const tabRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  React.useEffect(() => {
    if (hoveredTab !== null) {
      const activeItem = tabRefs.current[hoveredTab];
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;
        setActiveStyles({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [hoveredTab]);
  return (
    <div ref={divRef} className="flex relative">
      {/* for tab hovering */}

      <div
        className="absolute top-[6px] transition-all duration-300 ease-in-out z-[-10] bottom-[6px] rounded-md bg-[#ebebeb]"
        style={activeStyles}
      />

      {tabOptions.map((t, i) => {
        return (
          <Link
            ref={(el: HTMLAnchorElement | null) => {
              tabRefs.current[i] = el;
            }}
            onMouseEnter={() => setHoveredTab(i)}
            onMouseLeave={() => {
              setActiveStyles((prev) => {
                return {
                  ...prev,
                  width: 0,
                };
              });
              setHoveredTab(null);
            }}
            className={`${
              pathName == "/forms/" + id + t.href
                ? "border-b-black border-b-2"
                : ""
            } px-3 py-2   text-[14px]  text-regular`}
            key={i}
            href={`/forms/${id}${t.href}`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SingleFormOptionsTab;
