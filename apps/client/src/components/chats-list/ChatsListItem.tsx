import React from "react";
import { useHistory } from "react-router-dom";

import { IonItem } from "@ionic/react";
import EllispsesIcon from "../svgs/EllispsesIcon";
import ChatsListItemOptions from "./ChatsListItemOptions";

import { useModal } from "@hooks/useModal";

import type { GetChatsQuery } from "@graphql/__generated__/graphql";
import type { ChatsListItemOptionsProps } from "./ChatsListItemOptions";

export const ChatsListItem: React.FC<{
  chat: GetChatsQuery["chats"][number];
}> = ({ chat }) => {
  const history = useHistory();

  const { open, close } = useModal<ChatsListItemOptionsProps>(
    ChatsListItemOptions,
    {
      dismiss: () => close(),
      chat,
    },
    {
      popoverOptions: {
        side: "bottom",
        alignment: "start",
      },
    }
  );

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/chat/${chat?.id}`);
  };

  const title = chat?.title;
  const lastMessageText = chat?.lastMessage?.text;

  return (
    <IonItem
      color="secondary-gray"
      style={{ "--inner-padding-end": "0px" }}
      className="w-full! pl-2 cursor-pointer flex! items-center! justify-between! relative"
      onClick={(e) => handleChatClick(e)}
    >
      <div className="text-primary-light flex flex-col text-sm font-roboto">
        <p className="line-clamp-1 font-semibold">{title}</p>
        <p className="text-xs text-french-gray-2 line-clamp-1">
          {lastMessageText}
        </p>
      </div>

      <button
        id="open-popover"
        slot="end"
        className="w-6 h-6 relative"
        onClick={(e) => {
          e.stopPropagation();
          open(e);
        }}
      >
        <EllispsesIcon />
      </button>
    </IonItem>
  );
};

export default ChatsListItem;
