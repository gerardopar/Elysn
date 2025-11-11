import React from "react";

import Message from "./Message";

import { type Message as MessageT } from "@elysn/shared";

export const Messages: React.FC<{
  messages: MessageT[] | null | undefined;
}> = ({ messages }) => {
  if (messages?.length === 0) return <></>;
  return (
    <ul className="w-full max-w-[768px] flex flex-col gap-2">
      {messages?.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </ul>
  );
};

export default Messages;
