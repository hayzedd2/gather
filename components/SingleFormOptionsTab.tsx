"use client";

import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

interface SingleFormOptionsTabProps {
  id: string;
}
const tabOptions = [
  {
    href: "/submissions",
    label: "Submissions",
  },
  {
    href: "/integrations",
    label: "Integrations",
  },
  {
    href: "/analytics",
    label: "Analytics",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];
const SingleFormOptionsTab = ({ id }: SingleFormOptionsTabProps) => {
  const [hoveredTab, setHoveredTab] = React.useState<number | null>(null);
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
      <div style={{
        width:activeStyles.width,
        left:activeStyles.left
      }} className="absolute w-[50px]  bottom-0 bg-black h-[2px]"></div>
      {/* for tab hovering */}
      <motion.div
        className="absolute z-[-10] top-[6px] bottom-[6px] rounded-sm bg-[#ebebeb]"
        initial={false}
        animate={activeStyles}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {tabOptions.map((t, i) => {
        return (
          <Link
            ref={(el: HTMLAnchorElement | null) => {
              tabRefs.current[i] = el;
            }}
            onMouseEnter={() => setHoveredTab(i)}
            onMouseLeave={() => setHoveredTab(null)}
            className="px-3 py-2  text-[14px]  text-regular"
            key={i}
            href={`${id}${t.href}`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SingleFormOptionsTab;
