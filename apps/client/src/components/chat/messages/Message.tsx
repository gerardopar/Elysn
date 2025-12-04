import React from "react";
import { motion } from "motion/react";

import { type Message as MessageT, MessageSenderEnum } from "@elysn/shared";
import { Response } from "@/components/ui/response";

export const StreamingMessage: React.FC<{
  sender: MessageSenderEnum;
  streamText: string;
}> = ({ sender, streamText }) => {
  const isUser = sender === MessageSenderEnum.USER;

  const containerStyles = isUser ? "justify-end" : "justify-start";
  const messageStyles = isUser ? "bg-tertiary-gray" : "bg-primary-dark";

  return (
    <div className={`w-full flex items-center ${containerStyles}`}>
      <div
        className={`max-w-[540px] py-2 px-4 rounded-[16px] inline ${messageStyles}`}
      >
        <Response mode="streaming" className="text-white w-full">
          {streamText}
        </Response>
      </div>
    </div>
  );
};

export const Message: React.FC<MessageT> = ({ sender, text }) => {
  const isUser = sender === MessageSenderEnum.USER;

  const containerStyles = isUser ? "justify-end" : "justify-start";
  const messageStyles = isUser ? "bg-tertiary-gray" : "bg-primary-dark";

  return (
    <motion.li
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`w-full flex items-center ${containerStyles}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`max-w-[540px] py-2 px-4 rounded-[16px] inline ${messageStyles}`}
      >
        <Response mode="static" className="text-white">
          {text}
        </Response>
      </motion.div>
    </motion.li>
  );
};

export default Message;
