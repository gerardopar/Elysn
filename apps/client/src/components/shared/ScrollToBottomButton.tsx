import React from "react";
import { motion } from "motion/react";

import ArrowDownIcon from "../svgs/ArrowDownIcon";

import { useScrollToBottom } from "@hooks/useScrollToBottom";

export const ScrollToBottomButton: React.FC<{
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ className, containerRef }) => {
  const scrollToBottom = useScrollToBottom(containerRef);

  return (
    <motion.button
      onClick={scrollToBottom}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
            fixed left-[50%] bottom-[110px] translate-x-[-50%] bg-secondary-dark
            text-white p-2! rounded-full! shadow-lg! flex items-center justify-center 
            h-[30px] w-[30px] min-h-[30px] min-w-[30px] ${className}`}
    >
      <ArrowDownIcon />
    </motion.button>
  );
};

export default ScrollToBottomButton;
