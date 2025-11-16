import React from "react";
import { useHistory } from "react-router-dom";

import { IonItem } from "@ionic/react";
import EllispsesIcon from "../svgs/EllispsesIcon";
import ChatsListItemOptions from "./ChatsListItemOptions";

import { useModal } from "@hooks/useModal";

import type { GetChatQuery } from "@graphql/__generated__/graphql";
import type { ChatsListItemOptionsProps } from "./ChatsListItemOptions";

export const ChatsListItem: React.FC<{
  chat: GetChatQuery["chat"];
}> = ({ chat }) => {
  const history = useHistory();

  const { open } = useModal<ChatsListItemOptionsProps>(
    ChatsListItemOptions,
    {
      dismiss: () => {},
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

  return (
    <IonItem
      color="secondary-gray"
      style={{ "--inner-padding-end": "0px" }}
      className="w-full! pl-2 cursor-pointer flex! items-center! justify-between! relative"
      onClick={(e) => handleChatClick(e)}
    >
      <span className="text-primary-light text-sm font-roboto">
        {chat?.title}
      </span>

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
