"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="py-6 px-4 flex justify-between items-center flex-wrap">
      <div onClick={scrollToTop} className="logo cursor-pointer flex items-center gap-1">
        <Image src={"/gather-logo.png"} alt="logo" width={32} height={32} />

        <h1 className="font-[600] mt-[4px] text-[1.3rem]">Gather</h1>
      </div>
      <p className="text-muted-foreground font-[500] text-[13px] ">
        &copy; {new Date().getFullYear()} Gather. All rights reserved.{" "}
      </p>
    </footer>
  );
};

export default Footer;
