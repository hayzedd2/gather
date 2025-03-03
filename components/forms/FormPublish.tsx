"use client";
import { useState, useRef, useEffect } from "react";

import { motion, useAnimation } from "motion/react";
import { CheckIcon, Loader, SendIcon } from "lucide-react";
import { TextShimmer } from "../reusable-comps/TextShimmer";

interface FormPublishProps {
  handlePublish: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  notAllowed: boolean;
}
const FormPublish = ({
  handlePublish,
  isSuccess,
  isLoading,
  notAllowed,
}: FormPublishProps) => {
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();
  const buttonWidth = 40;
  const containerWidth = 192;

  const icon = isSuccess ? (
    <CheckIcon className="text-white size-4" />
  ) : isLoading ? (
    <Loader className="text-white animate-spin size-4" />
  ) : (
    <SendIcon className="text-white size-4" />
  );

  const handleDragEnd = (_event: any, info: any) => {
    const dragThreshold = containerWidth * 0.75;
    if (isLoading) return;
    if (info.offset.x > dragThreshold) {
      controls.start({ x: containerWidth - buttonWidth - 8 });
      setDragging(false);
      handlePublish();
    } else {
      controls.start({ x: 0 });
      setDragging(false);
    }
  };
  useEffect(() => {
    if (notAllowed) {
      controls.start({ x: 0 });
    }
  }, [notAllowed]);

  let buttonText = "Slide to publish";
  if (isLoading) buttonText = "Publishing...";
  if (isSuccess) buttonText = "Published!";
  
  return (
    <motion.div
      ref={containerRef}
      
      className={`flex items-center bg-[#1a1a1a] p-1 bx-shadow rounded-[2rem] w-[12rem]`}
    >
      <motion.button
        disabled={isLoading}
        ref={buttonRef}
        drag="x"
        dragConstraints={{ left: 0, right: containerWidth - buttonWidth - 8 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        transition={{
          type: "spring",
          stiffness: 400,
          mass: 3,
          damping: 50,
        }}
        className={`w-[2.5rem] bx-shadow h-[2.5rem] relative z-50 rounded-full flex items-center justify-center bg-[#111110] ${
          isLoading ? "cursor-not-allowed" : "cursor-grab"
        }`}
      >
        {icon}
      </motion.button>

      <motion.p
        style={{
          opacity: dragging ? 0 : 1,
        }}
        className="text-[0.95rem] mr-4 ml-2 mt-1"
      >
        {isSuccess ? (
          <span className="text-white ">Published!</span>
        ) : (
          <TextShimmer duration={1.2}>{buttonText}</TextShimmer>
        )}
      </motion.p>
    </motion.div>
  );
};

export default FormPublish;
