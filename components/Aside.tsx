"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from "@/components/Sidebar";
import { ChartNoAxesColumn, NotebookText } from "lucide-react";
import { SidebarLinksT } from "@/types/type";

const links: SidebarLinksT[] = [
  {
    icon: <NotebookText size={16} />,
    label: "Forms",
    href: "/",
  },
  {
    icon: <ChartNoAxesColumn size={16} />,
    label: "Analytics",
    href: "/analytics",
  },
];

const Aside = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <h4 className="text-[1.4rem] text-black font-[600]">Gather</h4>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarLinks>
          {links.map((l, i) => {
            return (
              <SidebarLink
                key={i}
                icon={l.icon}
                href={l.href}
                label={l.label}
                active={pathname == l.href}
              />
            );
          })}
        </SidebarLinks>
      </SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
};

export default Aside;
