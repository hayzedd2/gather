"use client";

import { ViewProps, viewT } from "@/types/type";
import { Bolt, ChevronLeft, Eye, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const FormControlTab = ({ view, setView }: ViewProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [activeStyles, setActiveStyles] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (divRef.current && view) {
      const activeItem = divRef.current.querySelector(`[data-id="${view}"]`);
      if (activeItem instanceof HTMLElement) {
        const { offsetLeft, offsetWidth } = activeItem;
        setActiveStyles({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [view]);

  const tabs = [
    { id: "configure", label: "Configuration", icon: <Bolt size={16} /> },
    { id: "preview", label: "Preview", icon: <Eye size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <div className="p-4 z-10  w-full sticky top-0 bg-[#fafafa]  flex items-center justify-between">
      <div className="back ">
        <button
          onClick={() => router.back()}
          className="w-max gap-1 px-3 flex items-center"
        >
          <ChevronLeft size={18} />{" "}
          <span className="mt-[2px] font-[500]">Back</span>
        </button>
      </div>
      <div
        ref={divRef}
        className="p-[6px] rounded-lg gap-3  flex bg-white relative"
      >
        <div
          className="absolute top-[6px] bottom-[6px] transition-all duration-300 ease-in-out r rounded-md bg-white light-shadow"
          style={activeStyles}
        />
        {tabs.map((t, i) => {
          return (
            <button
              data-id={t.id}
              key={i}
              onClick={() => setView(t.id as viewT)}
              className={`z-10 rounded-md flex gap-1 items-center p-[6px] px-2 cursor-pointer ${
                view === t.id ? "text-regular" : "text-subtle "
              }`}
              aria-pressed={view === t.id}
            >
              {t.icon}
              <h6 className="text-[13px] font-[500]">{t.label}</h6>
            </button>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default FormControlTab;
