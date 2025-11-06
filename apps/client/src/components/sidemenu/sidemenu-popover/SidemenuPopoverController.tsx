import React from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import UserAvatar from "../../user/UserAvatar";
import UserInfo from "../../user/UserInfo";

export const SidemenuPopoverController: React.FC = () => {
  const [showPopover, dismissPopover] = useIonPopover(null);

  return (
    <IonRow
      onClick={() => showPopover()}
      className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-2"
    >
      <UserAvatar className="w-[30px] h-[30px] max-w-[30px] max-h-[30px]" />
      <UserInfo />
    </IonRow>
  );
};

export default SidemenuPopoverController;
