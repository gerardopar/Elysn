import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ScrollToBottomButton from "@components/shared/ScrollToBottomButton";
import Messages from "./messages/Messages";
import { IonContent } from "@ionic/react";
import ChatInput from "./ChatInput";

import { useScrollToBottom } from "@hooks/useScrollToBottom";
import { useGetMessagesQuery } from "@graphql/queries/message";
import { useCreateMessageMutation } from "@graphql/mutations/message";
import { useNewMessageSubscription } from "@graphql/subscriptions/message";

import { MessageSenderEnum } from "@elysn/shared";
import { chatInputSchema } from "../chat/chat.helpers";

export const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useScrollToBottom(containerRef);

  const [input, setInput] = useState<string>("");
  const [isAtBottom, setIsAtBottom] = useState(true);

  const [createMessage] = useCreateMessageMutation();
  const { data } = useGetMessagesQuery({ chatId: chatId! });
  useNewMessageSubscription(chatId!);

  const messages = data?.messages || [];

  const handleScroll = () => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    setIsAtBottom(bottom < 40); // threshold
  };

  useEffect(() => {
    if (isAtBottom) scrollToBottom();
  }, [messages]);

  const handleCreateMessage = async () => {
    const result = chatInputSchema.safeParse({ input });
    if (!result.success) return;

    try {
      await createMessage({
        variables: {
          input: {
            chatId: chatId!,
            sender: MessageSenderEnum.USER,
            text: input,
            timestamp: Date.now(),
          },
        },
      });

      setInput("");
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IonContent fullscreen color="primary-dark">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full bg-primary-dark ion-padding overflow-y-auto flex justify-center pt-[60px]"
        >
          <Messages messages={messages} />
        </div>

        {!isAtBottom && <ScrollToBottomButton containerRef={containerRef} />}
      </IonContent>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleCreateMessage}
        mode="fixed"
      />
    </>
  );
};

export default ChatView;
