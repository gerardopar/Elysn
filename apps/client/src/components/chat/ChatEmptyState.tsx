import React, { useEffect, useMemo, useState } from "react";

import { useCurrentUser } from "@/stores/user";

import ChatInput from "./ChatInput";
import { useDeviceWidth } from "@hooks/useDeviceWidth";
import { OrbMemo as Orb, type AgentState, getOrbColors } from "../ui/orb";

import { hashStringToSeed } from "@helpers/seed.helpers";

type ChatEmptyStateProps = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
  mode?: "default" | "fixed";
  isLoading?: boolean;
  isSpeaking?: boolean; // hook this to ElevenLabs playback if you want
};

export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  isSpeaking,
}) => {
  const { user } = useCurrentUser();
  const { isMobile } = useDeviceWidth();
  const containerStyles = isMobile ? "mb-[100px]" : "mb-[300px]";

  const [isFocused, setIsFocused] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    if (!input) {
      setIsUserTyping(false);
      return;
    }

    setIsUserTyping(true);
    const timeout = setTimeout(() => {
      setIsUserTyping(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [input]);

  const rawState: AgentState = useMemo(() => {
    if (isLoading) return "thinking";
    if (isSpeaking) return "talking";
    if (isFocused || isUserTyping) return "listening";
    return null;
  }, [isLoading, isSpeaking, isFocused, isUserTyping]);

  const colors = useMemo(() => getOrbColors(rawState ?? "idle"), [rawState]);

  const userId = user?.uid ?? "";
  const seed = useMemo(() => hashStringToSeed(userId), [userId]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full gap-4 ${containerStyles}`}
    >
      <div className="relative flex items-center justify-center">
        {/* monochrome glow using your palette */}
        <div
          className="pointer-events-none absolute h-[260px] w-[260px] md:h-[320px] md:w-[320px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 28, 85, 0.45), rgba(11, 9, 10, 0))", // penn blue -> night
          }}
        />
        <Orb
          agentState={rawState}
          colors={colors}
          seed={seed}
          className="relative h-[220px] w-[220px] md:h-[280px] md:w-[280px]"
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};

export default ChatEmptyState;
