import React from "react";

import ChatInput from "./ChatInput";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

type ChatEmptyStateProps = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
  mode?: "default" | "fixed";
  isLoading?: boolean;
};

export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
}) => {
  const { isMobile } = useDeviceWidth();

  const containerStyles = isMobile ? "mb-[100px]" : "mb-[300px]";

  return (
    <div
      className={`flex flex-col items-center justify-center w-full gap-4 ${containerStyles}`}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="pointer-events-none absolute h-[260px] w-[260px] md:h-[320px] md:w-[320px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 28, 85, 0.45), rgba(11, 9, 10, 0))", // penn blue -> night
          }}
        />
      </div>

      <h1 className="text-[--color-primary-light] text-2xl font-bold font-roboto">
        What&apos;s on your mind?
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
