import React, { useState } from "react";

import ChatInput from "./ChatInput";

import { chatSchema } from "./chat.helpers";

const Chat: React.FC = () => {
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

  return (
    <div className="w-full h-full bg-primary-dark ion-padding overflow-y-auto flex items-center justify-center pt-[60px]">
      <div className="flex items-center justify-center flex-col w-full gap-4 mb-[300px]">
        <h1 className="text-white text-2xl font-bold font-roboto">
          What's on your mind?
        </h1>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
