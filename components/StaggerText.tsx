"use client";
import { HTMLMotionProps, motion } from "motion/react";
import { useInView } from "motion/react";
import React from "react";

interface StaggerTextProps {
  children: React.ReactNode;
  tag?: string;
  staggerDelay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

const StaggerText = ({
  children,
  tag = "p",
  staggerDelay = 0.1,
  duration = 0.6,
  y = 20,
  className = "",
}: StaggerTextProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const text = React.Children.toArray(children).join(" ");
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1 * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 80,
        mass: 4,
        duration,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            marginRight: "0.25em",
            marginBottom: "0.15em",
            // display: "inline-block",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default StaggerText;
