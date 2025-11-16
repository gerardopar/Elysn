import React from "react";

import { IonRow } from "@ionic/react";

import {
  chatsListOptions,
  ChatsListOptionsEnum,
} from "./chats-list-options.helpers";

export type ChatsListItemOptionsProps = {
  dismiss: () => void;
};

const ChatsListItemOptions: React.FC<ChatsListItemOptionsProps> = ({
  dismiss,
}) => {
  const onClick = async (type: ChatsListOptionsEnum) => {
    if (type === ChatsListOptionsEnum.delete) {
      // TODO: delete chat
      dismiss();
    } else if (type === ChatsListOptionsEnum.edit) {
      // TODO: edit chat name
      dismiss();
    }
  };

  return (
    <IonRow className="w-full flex flex-col gap-1 bg-secondary-dark p-2">
      {chatsListOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onClick(option.type as ChatsListOptionsEnum)}
          className="w-full flex items-center justify-start gap-2 rounded-lg last:border-t! last:border-primary-light! last:rounded-none! last:pt-4! last:mt-2 p-2!"
        >
          <option.icon
            className="text-xl"
            variant="outline"
            color="primary-light"
          />
          <span className="text-primary-light font-roboto text-sm">
            {option.title}
          </span>
        </button>
      ))}
    </IonRow>
  );
};

export default ChatsListItemOptions;
