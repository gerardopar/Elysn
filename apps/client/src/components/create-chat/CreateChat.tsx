import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ChatEmptyState from "../chat/ChatEmptyState";
import { IonContent } from "@ionic/react";
import ChatInput from "../chat/ChatInput";

import { chatInputSchema } from "../chat/chat.helpers";
import { MessageSenderEnum } from "@elysn/shared";

import { useCreateChatWithMessageMutation } from "@graphql/mutations/chat";

import { useDeviceWidth } from "@hooks/useDeviceWidth";

export const CreateChat: React.FC = () => {
  const history = useHistory();

  const { isMobile } = useDeviceWidth();

  const [input, setInput] = useState<string>("");

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
      update: (cache, { data }) => {
        if (!data?.createChatWithMessage) return;

        const newChat = data.createChatWithMessage;

        cache.modify({
          fields: {
            chats(existingChats = []) {
              return [newChat, ...existingChats];
            },
          },
        });
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

  return (
    <>
      <IonContent fullscreen color="primary-dark">
        <div
          className={`w-full h-full bg-primary-dark ion-padding overflow-y-auto flex justify-center items-center pt-[60px]`}
        >
          <ChatEmptyState
            input={input}
            setInput={setInput}
            handleSubmit={handleCreateChatWithMessage}
          />
        </div>
      </IonContent>

      {isMobile && (
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

export default CreateChat;
