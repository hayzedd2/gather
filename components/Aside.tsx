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
import {
  ChartNoAxesColumn,
  NotebookText,
  Settings,
  Workflow,
  CircleHelp,
  ChartCandlestick,
  LayoutDashboard,
  NotepadTextDashed,
} from "lucide-react";
import { SidebarLinksT, UserObject } from "@/types/type";
import { UserMenu } from "./UserMenu";

const links: SidebarLinksT[] = [
  {
    icon: <NotebookText size={16} />,
    label: "Forms",
    href: "/forms",
  },
  {
    icon: <NotepadTextDashed size={16} />,
    label: "Templates",
    href: "/templates",
  },
  {
    icon: <CircleHelp size={16} />,
    label: "Help",
    href: "/help",
  },
];
interface AsideProps {
  user: UserObject;
}
const Aside = ({ user }: AsideProps) => {
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
                active={pathname.startsWith(l.href)}
              />
            );
          })}
        </SidebarLinks>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Aside;
