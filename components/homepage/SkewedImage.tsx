"use client";
import Image from "next/image";
import { useState } from "react";

const SkewedImage = () => {

  const [currentDeg, setCurrentDeg] = useState(22);

  return (
    <div  className="mb-5 ">
      <Image
        onMouseEnter={() => setCurrentDeg(20)}
        onMouseLeave={() => setCurrentDeg(30)}
        style={{
          transform: `perspective(1000px) rotateX(${currentDeg}deg) rotateY(0deg)`,
        }}
        className="rounded-[12px]  border skewed"
        src={"/hero.png"}
        width={1000}
        height={200}
        alt="Hero image"
      />
    </div>
  );
};

export default SkewedImage;
