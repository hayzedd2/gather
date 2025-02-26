import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = async () => {
  const sessions = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => {
      throw redirect("/login");
    });

  return (
    <nav className="max-w-7xl mb-3 flex justify-between items-center  mx-auto p-4">
      <div className="logo">
        <Link href={"/"}>
          <h1 className="font-[500] text-[1.4rem]">Gather</h1>
        </Link>
      </div>

      <ul className="flex gap-5 items-center text-[15px] font-[500]">
        <li>
          <Link href={"/forms"}>My forms</Link>
        </li>
        <li>
          <Link href={"/templates"}>Templates</Link>
        </li>
        {sessions && sessions.user ? (
          <UserMenu user={sessions.user} />
        ) : (
          <div className="flex items-center gap-3  dotted-left">
    
            <Button>Get started for free</Button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
