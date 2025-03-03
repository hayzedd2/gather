import Link from "next/link";
import React from "react";
import { UserMenu } from "../reusable-comps/UserMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

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

      {sessions && sessions.user ? (
        <ul className="flex gap-5 items-center text-[15px] font-[500]">
          <li>
            <Link href={"/forms"}>My forms</Link>
          </li>
          <li>
            <Link href={"/templates"}>Templates</Link>
          </li>
          <UserMenu user={sessions.user} />
        </ul>
      ) : (
        <div className="flex items-center gap-3  dotted-left">
          <a href="/login" className="font-[500]">
            Login
          </a>
          <a
            href="/register"
            className="rounded-[100px] bg-black text-[14px] font-[500] hover:opacity-80 text-white py-[6px] px-[14px] cursor-pointer"
          >
            Sign up
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
