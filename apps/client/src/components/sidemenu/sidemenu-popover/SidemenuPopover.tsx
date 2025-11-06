import React from "react";
import { type RouteComponentProps } from "react-router-dom";

import { IonRow } from "@ionic/react";

import {
  sidemenuPopoverOptions,
  SideMenuPopoverOptionsEnum,
} from "./sidemenu-popover.helpers";

import { useFirebase } from "@hooks/useFirebase";

const SidemenuPopover: React.FC<{
  dismiss: () => void;
  history: RouteComponentProps["history"];
}> = ({ dismiss, history }) => {
  const { handleSignOut } = useFirebase();

  const onClick = async (type: SideMenuPopoverOptionsEnum) => {
    if (type === SideMenuPopoverOptionsEnum.logout) {
      await handleSignOut();
      history.push("/");
      dismiss();
    }
  };

  return (
    <IonRow className="w-full flex flex-col gap-1 bg-tertiary-gray p-2">
      {sidemenuPopoverOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onClick(option.type as SideMenuPopoverOptionsEnum)}
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

export default SidemenuPopover;
