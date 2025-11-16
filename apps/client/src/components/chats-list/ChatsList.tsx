import React from "react";

import { IonList, IonListHeader, IonLabel } from "@ionic/react";
import ChatsListItem from "./ChatsListItem";

import { useGetChatsQuery } from "@graphql/queries/chat";

export const ChatsList: React.FC = () => {
  const { data } = useGetChatsQuery();
  const chats = data?.chats || [];

  if (chats.length === 0) return <></>;

  return (
    <IonList
      color="secondary-gray"
      className="bg-secondary-gray! w-full!"
      lines="none"
    >
      <IonListHeader className="flex items-center justify-between px-6 w-full pt-2!">
        <IonLabel className="text-french-gray-2 text-sm font-roboto">
          Chats
        </IonLabel>
      </IonListHeader>
      {chats.map((chat) => {
        return <ChatsListItem chat={chat} key={chat.id} />;
      })}
    </IonList>
  );
};

export default ChatsList;
