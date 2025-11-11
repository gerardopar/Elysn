import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Messages from "./messages/Messages";
import { IonContent } from "@ionic/react";
import ChatInput from "./ChatInput";

import { useGetMessagesQuery } from "@graphql/queries/message";

export const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const [input, setInput] = useState<string>("");

  const { data } = useGetMessagesQuery({
    chatId: chatId!,
  });
  const messages = data?.messages || [];

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
        handleSubmit={() => {}}
        mode="fixed"
      />
    </>
  );
};

export default ChatView;
