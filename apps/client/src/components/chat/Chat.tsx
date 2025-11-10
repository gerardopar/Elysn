import React, { useState } from "react";

import ChatEmptyState from "./ChatEmptyState";
import Messages from "./messages/Messages";
import { IonContent } from "@ionic/react";
import ChatInput from "./ChatInput";

import { chatInputSchema } from "./chat.helpers";
import { type Message as MessageT, MessageSenderEnum } from "@elysn/shared";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

export const Chat: React.FC = () => {
  const { isMobile } = useDeviceWidth();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageT[]>([]);

  const handleSubmit = () => {
    const result = chatInputSchema.safeParse({ input });
    if (!result.success) return;

    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages.push({
        id: Math.random().toString(),
        userId: "abc123",
        sender: MessageSenderEnum.USER,
        text: input,
        timestamp: Date.now(),
        metadata: {},
      });
      return newMessages;
    });
    setInput("");
  };

  const isEmptyChat = messages.length === 0;
  const containerStyles = isEmptyChat ? "items-center" : "items-start";

  return (
    <>
      <IonContent fullscreen color="primary-dark">
        <div
          className={`w-full h-full bg-primary-dark ion-padding overflow-y-auto flex justify-center pt-[60px] ${containerStyles}`}
        >
          {isEmptyChat ? (
            <ChatEmptyState
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Messages messages={messages} />
          )}
        </div>
      </IonContent>

      {((!isMobile && !isEmptyChat) || isMobile) && (
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          mode="fixed"
        />
      )}
    </>
  );
};

export default Chat;
