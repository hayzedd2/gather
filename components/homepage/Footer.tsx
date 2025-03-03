"use client"
import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="py-6 px-4 flex justify-between items-center flex-wrap">
      <div className="logo">
        <h1 onClick={scrollToTop} className="font-[500] cursor-pointer text-[1.4rem]">
          Gather
        </h1>
      </div>
      <p className="text-muted-foreground font-[500] text-[14px] ">
        &copy; {new Date().getFullYear()} Gather. All rights reserved.{" "}
      </p>
    </footer>
  );
};

export default Footer;
