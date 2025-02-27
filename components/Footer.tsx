import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 px-4 flex justify-between items-center flex-wrap">
      <div className="logo">
        <Link href={"#hero"}>
          <h1 className="font-[500] text-[1.4rem]">Gather</h1>
        </Link>
      </div>
      <p className="text-muted-foreground font-[500] ">&copy; {new Date().getFullYear()} Gather. All rights reserved. </p>
    </footer>
  );
};

export default Footer;
