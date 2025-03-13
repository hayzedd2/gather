"use client";

import { UserObject } from "@/types/type";
import React from "react";
import { Home, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateGradient } from "@/helpers/generateGradient";
import { signOut } from "@/lib/auth-client";
import { useFormHelpers } from "@/hooks/useFormHelpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

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
        {!user.image ? (
          <button
            disabled={loading}
            className="w-8 h-8 rounded-full text-white font-[600] text-[14px] flex justify-center items-center"
            style={{
              background: generateGradient(4),
            }}
          >
            <span className="mt-1 uppercase">{user.name.charAt(0)}</span>
          </button>
        ) : (
          <Image src={user.image} width={32} className="rounded-full cursor-pointer" height={32} alt="user-profile-image" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow- ">
        <div className="py-1 px-2">
          <h2 className="text-[14px] font-[500]">{user.name}</h2>
          <h4 className="text-[13px] font-[500] text-muted-foreground">
            {user.email}
          </h4>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled
            className="flex justify-between items-center"
          >
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
