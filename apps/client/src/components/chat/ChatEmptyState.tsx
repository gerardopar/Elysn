import React from "react";

import ChatInput from "./ChatInput";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

export const ChatEmptyState: React.FC<{
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
  mode?: "default" | "fixed";
  isLoading?: boolean;
}> = ({ input, setInput, handleSubmit, isLoading }) => {
  const { isMobile } = useDeviceWidth();

  const containerStyles = isMobile ? "mb-[100px]" : "mb-[300px]";

  return (
    <div
      className={`flex items-center justify-center flex-col w-full gap-4 ${containerStyles}`}
    >
      <h1 className="text-white text-2xl font-bold font-roboto">
        What's on your mind?
      </h1>

      {!isMobile && (
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ChatEmptyState;
