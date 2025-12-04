import React from "react";

import Message, { StreamingMessage } from "./Message";
import MessageTypingBubble from "./MessageTypingBubble";

import type { GetMessagesQuery } from "@graphql/__generated__/graphql";
import { MessageSenderEnum } from "@elysn/shared";

export const Messages: React.FC<{
  messages: GetMessagesQuery["messages"];
  personaTypingStatus: boolean;
  isStreaming?: boolean;
  streamText?: string;
}> = ({ messages, personaTypingStatus, isStreaming, streamText }) => {
  if (!messages?.length) return null;

  return (
    <ul className="w-full max-w-[768px] flex flex-col gap-2">
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}

      {isStreaming && streamText && (
        <StreamingMessage
          sender={MessageSenderEnum.AI}
          streamText={streamText}
        />
      )}

      {personaTypingStatus && !isStreaming && <MessageTypingBubble />}
    </ul>
  );
};

export default Messages;
