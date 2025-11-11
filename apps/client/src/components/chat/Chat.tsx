import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ChatEmptyState from "./ChatEmptyState";
import Messages from "./messages/Messages";
import { IonContent } from "@ionic/react";
import ChatInput from "./ChatInput";

import { chatInputSchema } from "./chat.helpers";
import { MessageSenderEnum } from "@elysn/shared";

import { useCreateChatWithMessageMutation } from "@graphql/mutations/chat";
import { useGetMessagesQuery } from "@graphql/queries/message";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

export const Chat: React.FC = () => {
  const history = useHistory();
  const { chatId } = useParams<{ chatId: string }>();

  const { isMobile } = useDeviceWidth();

  const [input, setInput] = useState<string>("");

  const { data } = useGetMessagesQuery({
    chatId: chatId!,
  });
  const messages = data?.messages || [];

  const [createChatWithMessage] = useCreateChatWithMessageMutation();

  const handleCreateChatWithMessage = async () => {
    const result = chatInputSchema.safeParse({ input });
    if (!result.success) return;

    await createChatWithMessage({
      variables: {
        input: {
          message: {
            sender: MessageSenderEnum.USER,
            text: result.data.input,
            timestamp: Date.now(),
          },
        },
      },
      onCompleted: ({ createChatWithMessage }) => {
        if (createChatWithMessage?.id) {
          history.push(`/chat/${createChatWithMessage.id}`);
        }
        setInput("");
      },
      onError: () => {
        // TODO: show error toast
        console.log("Error creating chat");
      },
    });
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
              handleSubmit={handleCreateChatWithMessage}
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
          handleSubmit={handleCreateChatWithMessage}
          mode="fixed"
        />
      )}
    </>
  );
};

export default Chat;
