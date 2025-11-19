import React from "react";

import { IonRow } from "@ionic/react";

import {
  chatsListOptions,
  ChatsListOptionsEnum,
} from "./chats-list-options.helpers";

import { useDeleteChatMutation } from "@graphql/mutations/chat";

import type { GetChatQuery } from "@graphql/__generated__/graphql";

export type ChatsListItemOptionsProps = {
  dismiss: () => void;
  chat: GetChatQuery["chat"];
};

const ChatsListItemOptions: React.FC<ChatsListItemOptionsProps> = ({
  dismiss,
  chat,
}) => {
  const [deleteChatMutation] = useDeleteChatMutation();

  const handleDeleteChat = async () => {
    // TODO: show confirmation modal before deleting

    try {
      const { data } = await deleteChatMutation({
        variables: {
          id: chat?.id!,
        },
        update(cache) {
          const deletedId = chat?.id;
          if (!deletedId) return;

          cache.modify({
            fields: {
              chats(existingChats = [], { readField }) {
                return existingChats.filter((chatRef: any) => {
                  const refId = readField<string>("id", chatRef);
                  return refId !== deletedId;
                });
              },
            },
          });
        },
      });
      if (data?.deleteChat) dismiss();
    } catch (error) {
      // TODO: show error toast
      console.error(error);
    }
  };

  const onClick = async (type: ChatsListOptionsEnum) => {
    if (type === ChatsListOptionsEnum.delete) {
      await handleDeleteChat();
    } else if (type === ChatsListOptionsEnum.edit) {
      // TODO: edit chat name
      dismiss();
    }
  };

  return (
    <IonRow className="w-full flex flex-col gap-1 bg-secondary-dark p-2">
      {chatsListOptions.map((option) => {
        const iconColor =
          option?.type === ChatsListOptionsEnum.delete
            ? "imperial-red"
            : "primary-light";

        const textColor =
          option?.type === ChatsListOptionsEnum.delete
            ? "text-imperial-red"
            : "text-primary-light";

        return (
          <button
            key={option.type}
            onClick={() => onClick(option.type as ChatsListOptionsEnum)}
            className="w-full flex items-center justify-start gap-2 rounded-lg last:border-t! last:border-primary-light! last:rounded-none! last:pt-4! last:mt-2 p-2!"
          >
            <option.icon
              className="text-xl"
              variant="outline"
              color={iconColor}
            />
            <span className={`font-roboto text-sm ${textColor}`}>
              {option.title}
            </span>
          </button>
        );
      })}
    </IonRow>
  );
};

export default ChatsListItemOptions;
