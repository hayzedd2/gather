"use client"

import Link from "next/link";
import React from "react";

interface SidebarComponentProps {
  children: React.ReactNode;
  className?: string;
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const Sidebar: React.FC<SidebarComponentProps> = ({ children, className }) => {
  return (
    <aside
      className={`
        w-64 
        bg-[#FAFAFA] 
        h-screen 
        top-0 
        relative 
        hidden 
        md:flex 
        flex-col
        dotted
        dotted-right
        ${className}
      `}
    >
      {children}
    </aside>
  );
};

const SidebarHeader: React.FC<SidebarComponentProps> = ({
  children,
  className,
}) => <div className={`w-full  p-4 ${className}`}>{children}</div>;

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  href,
  active,
}) => (
  <li className="w-full">
    <Link
      href={href}
      className={`flex w-full gap-2  items-center cursor-pointer py-1 px-3 rounded-md ${
        active ? "bg-[#F0F0F0] text-[#18181B]" : "text-[#52525B]"
      }`}
    >
      {icon}
      <p className="text-[14px] font-[500] mt-1">{label}</p>
    </Link>
  </li>
);

const SidebarContent: React.FC<SidebarComponentProps> = ({
  children,
  className,
}) => (
  <div className={`flex-grow overflow-y-auto p-4 ${className}`}>{children}</div>
);
const SidebarLinks: React.FC<SidebarComponentProps> = ({
  children,
  className,
}) => (
  <ul className={`flex flex-col gap-3 ${className}`}>{children}</ul>
);

const SidebarFooter: React.FC<SidebarComponentProps> = ({
  children,
  className,
}) => (
  <div className={`w-full p-4 border-top dotted-up mt-auto ${className}`}>
    {children}
  </div>
);

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarLink,SidebarLinks };
