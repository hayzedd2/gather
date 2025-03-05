"use client";
import React from "react";
import { motion } from "motion/react";

interface FloaterProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Floater = ({ isOpen, onClose, children }: FloaterProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="w-full  left-0 right-0 fixed  z-50 bottom-5 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className={`bg-white  rounded-[100px] p-1.5 border w-full max-w-md `}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default Floater;
