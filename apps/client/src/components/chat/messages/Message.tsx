import React from "react";

import { type Message as MessageT, MessageSenderEnum } from "@elysn/shared";

export const Message: React.FC<MessageT> = ({ sender, text }) => {
  const isUser = sender === MessageSenderEnum.USER;

  const containerStyles = isUser ? "justify-end" : "justify-start";
  const messageStyles = isUser ? "bg-tertiary-gray" : "bg-primary-dark";

  return (
    <li className={`w-full flex items-center ${containerStyles}`}>
      <div
        className={`max-w-[540px] py-2 px-4 rounded-[16px] inline  ${messageStyles}`}
      >
        <p className="text-white">{text}</p>
      </div>
    </li>
  );
};

export default Message;
