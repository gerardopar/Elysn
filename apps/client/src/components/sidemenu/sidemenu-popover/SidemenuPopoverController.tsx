import React from "react";
import { useHistory } from "react-router-dom";

import { IonRow, IonMenuToggle } from "@ionic/react";
import SidemenuPopover from "./SidemenuPopover";
import UserAvatar from "../../user/UserAvatar";
import UserInfo from "../../user/UserInfo";

import useDeviceWidth from "@hooks/useDeviceWidth";
import { useModal } from "@hooks/useModal";

import { type SidemenuPopoverProps } from "./SidemenuPopover";

export const SidemenuPopoverController: React.FC = () => {
  const history = useHistory();
  const { isMobile } = useDeviceWidth();

  const { open, close } = useModal<SidemenuPopoverProps>(SidemenuPopover, {
    history,
    dismiss: () => close(),
  });

  const popoverController = (
    <button id="open-popover" onClick={(e) => open(e)} className="w-full">
      <IonRow className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-2">
        <UserAvatar className="w-[30px] h-[30px]" />
        <UserInfo />
      </IonRow>
    </button>
  );

  if (isMobile) {
    return <IonMenuToggle menu="main">{popoverController}</IonMenuToggle>;
  }

  return popoverController;
};

export default SidemenuPopoverController;
