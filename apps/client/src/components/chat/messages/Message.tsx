import React from "react";
import { motion } from "motion/react";

import { type Message as MessageT, MessageSenderEnum } from "@elysn/shared";

export const Message: React.FC<MessageT> = ({ sender, text }) => {
  const isUser = sender === MessageSenderEnum.USER;

  const containerStyles = isUser ? "justify-end" : "justify-start";
  const messageStyles = isUser ? "bg-tertiary-gray" : "bg-primary-dark";

  return (
    <motion.li
      className={`w-full flex items-center ${containerStyles}`}
      initial={{
        opacity: 0,
        x: isUser ? 30 : -30,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
    >
      <motion.div
        className={`max-w-[540px] py-2 px-4 rounded-[16px] inline ${messageStyles}`}
        layout
      >
        <p className="text-white">{text}</p>
      </motion.div>
    </motion.li>
  );
};

export default Message;
