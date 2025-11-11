import React from "react";
import { useHistory } from "react-router-dom";

import { IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";

import { useGetChatsQuery } from "@graphql/queries/chat";

export const ChatsList: React.FC = () => {
  const history = useHistory();

  const { data } = useGetChatsQuery();
  const chats = data?.chats || [];

  if (chats.length === 0) return <></>;

  return (
    <IonList color="secondary-gray" className="bg-secondary-gray!" lines="none">
      <IonListHeader className="flex items-center justify-between px-6 w-full pt-2!">
        <IonLabel className="text-french-gray-2 text-sm font-roboto">
          Chats
        </IonLabel>
      </IonListHeader>
      {chats.map((chat) => {
        let onClick = () => {
          history.push(`/chat/${chat.id}`);
        };

        return (
          <IonItem
            color="secondary-gray"
            key={chat.id}
            className="pl-2 gap-3 cursor-pointer"
            onClick={onClick}
          >
            <span className="text-primary-light text-sm font-roboto">
              {chat?.title}
            </span>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default ChatsList;
