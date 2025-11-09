import React, { useState } from "react";

import ChatEmptyState from "./ChatEmptyState";
import ChatInput from "./ChatInput";

import { chatSchema } from "./chat.helpers";
import { IonContent } from "@ionic/react";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

export const Chat: React.FC = () => {
  const { isMobile } = useDeviceWidth();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  const handleSubmit = () => {
    const result = chatSchema.safeParse({ input });
    if (!result.success) return;
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
  };

  const isEmptyChat = messages.length === 0;

  return (
    <>
      <IonContent fullscreen color="primary-dark">
        <div className="w-full h-full bg-primary-dark ion-padding overflow-y-auto flex items-center justify-center pt-[60px]">
          {isEmptyChat && (
            <ChatEmptyState
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
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
