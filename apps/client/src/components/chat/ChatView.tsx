import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Messages from "./messages/Messages";
import { IonContent } from "@ionic/react";
import ChatInput from "./ChatInput";

import { useGetMessagesQuery } from "@graphql/queries/message";
import { useCreateMessageMutation } from "@graphql/mutations/message";

import { MessageSenderEnum } from "@elysn/shared";
import { chatInputSchema } from "../chat/chat.helpers";

export const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const [input, setInput] = useState<string>("");

  const [createMessage] = useCreateMessageMutation();

  const { data } = useGetMessagesQuery({
    chatId: chatId!,
  });

  const messages = data?.messages || [];

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
    } catch (error) {
      // TODO: show error toast
      console.log(error);
    }
  };

  return (
    <>
      <IonContent fullscreen color="primary-dark">
        <div
          className={`w-full h-full bg-primary-dark ion-padding overflow-y-auto flex justify-center pt-[60px] items-start`}
        >
          <Messages messages={messages} />
        </div>
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
