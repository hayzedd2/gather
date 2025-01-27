"use client";

import { UserObject } from "@/types/type";
import React from "react";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateGradient } from "@/helpers/generateGradient";
import { signOut } from "@/lib/auth-client";
import { useFormHelpers } from "@/hooks/useFormHelpers";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: UserObject;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const { loading, error, setLoading } = useFormHelpers();
  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          router.push("/login");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={loading}
        className="focus:outline-none"
        asChild
      >
        <button
          disabled={loading}
          className="w-full rounded-md p-[6px]  bg-[#F0F0F0] text-[#18181B] flex justify-between items-center "
        >
          <div className="flex gap-2 items-center">
            <div
              className="w-8 h-8 rounded-md"
              style={{
                background: generateGradient(10),
              }}
            ></div>
            <div className="flex flex-col text-wrap items-start">
              <h5 className="capitalize font-[500] text-[14px]">
                {user.name.length > 15
                  ? user.name.slice(0, 15).concat("...")
                  : user.name}
              </h5>
              <h6 className="text-subtle text-wrap text-[13px] mt-[-5px]">
                {user.email.length > 15
                  ? user.email.slice(0, 15).concat("...")
                  : user.email}
              </h6>
            </div>
          </div>
          <ChevronsUpDown size={14} className="mr-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem disabled={loading} onClick={handleLogOut}>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
