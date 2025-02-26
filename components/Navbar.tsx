import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const sessions = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => {
      throw redirect("/login");
    });

  if (!sessions) {
    return null;
  }
  return (
    <nav className="max-w-7xl mb-3 flex justify-between items-center  mx-auto p-4">
      <div className="logo">
        <h1 className="font-[500] text-[1.4rem]">Gather</h1>
      </div>

      <ul className="flex gap-5 items-center text-[15px] font-[500]">
        <li>
          <Link href={"/forms"}>My forms</Link>
        </li>
        <li>
          <Link href={"/templates"}>Templates</Link>
        </li>
        <UserMenu user={sessions.user} />
       
      </ul>
    </nav>
  );
};

export default Navbar;
