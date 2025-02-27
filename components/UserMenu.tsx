"use client";

import { UserObject } from "@/types/type";
import React from "react";
import { ChevronsUpDown, Home, LogOut, Settings, User } from "lucide-react";
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
import { toast } from "sonner";
import Link from "next/link";

interface UserMenuProps {
  user: UserObject;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const { loading, setLoading } = useFormHelpers();
  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          router.refresh();
        },
        onError: () => {
          setLoading(false);
          toast.error("An error occured");
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
          className="w-8 h-8 rounded-full text-white font-[600] text-[14px] flex justify-center items-center"
          style={{
            background: generateGradient(4),
          }}
        >
          <span className="mt-1">{user.name.charAt(0)}</span>
          {/* <div className="flex gap-2 items-center">
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
          </div> */}
          {/* <ChevronsUpDown size={14} className="mr-1" /> */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-none border">
        <div className="py-1 px-2">
          <h2 className="text-[14px] font-[500]">{user.name}</h2>
          <h4 className="text-[13px] font-[500] text-muted-foreground">
            {user.email}
          </h4>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled className="flex justify-between items-center">
            <span>Profile</span>
            <User />
          </DropdownMenuItem>

          <Link href="/">
            <DropdownMenuItem className="flex justify-between items-center">
              <span>Home Page</span>
              <Home />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuItem
          disabled={loading}
          className="flex justify-between items-center"
          onClick={handleLogOut}
        >
          <span>Log out</span>
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
