import React from "react";

import Message from "./Message";
import MessageTypingBubble from "./MessageTypingBubble";

import type { GetMessagesQuery } from "@graphql/__generated__/graphql";

export const Messages: React.FC<{
  messages: GetMessagesQuery["messages"];
  personaTypingStatus: boolean;
}> = ({ messages, personaTypingStatus }) => {
  if (messages?.length === 0) return <></>;
  return (
    <ul className="w-full max-w-[768px] flex flex-col gap-2">
      {messages?.map((message, index) => (
        <Message key={index} {...message} />
      ))}
      {personaTypingStatus && <MessageTypingBubble />}
    </ul>
  );
};

export default Messages;
