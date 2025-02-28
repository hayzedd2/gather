"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import React from "react";

const SkewedImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentDeg, setCurrentDeg] = useState(22);
//   useEffect(() => {
//     const interval = setInterval(() => {
//         setCurrentDeg((prev) => (prev > 0 ? prev - 1 : 0)); 
//     }, 20);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div ref={ref} className="mb-5 mt-[-5px]">
      <Image
      onMouseEnter={()=>setCurrentDeg(20)}
      onMouseLeave={()=>setCurrentDeg(30)}
        style={{
          transform: `perspective(1000px) rotateX(${currentDeg}deg) rotateY(0deg)`,
        }}
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
