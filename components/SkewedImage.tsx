"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import React from "react";

const SkewedImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="mt-3 mb-5">
      <Image
        className="rounded-[12px] border skewed"
        src={"/hero.png"}
        width={1000}
        height={1000}
        alt="Hero image"
      />
    </div>
  );
};

export default SkewedImage;
