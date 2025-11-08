import React from "react";
import { useHistory } from "react-router-dom";

import {
  IonRow,
  useIonPopover,
  useIonModal,
  IonMenuToggle,
} from "@ionic/react";
import SidemenuPopover from "./SidemenuPopover";
import UserAvatar from "../../user/UserAvatar";
import UserInfo from "../../user/UserInfo";

import useDeviceWidth from "@hooks/useDeviceWidth";

export const SidemenuPopoverController: React.FC = () => {
  const history = useHistory();
  const { isMobile } = useDeviceWidth();

  const [present, dismiss] = useIonPopover(SidemenuPopover, {
    dismiss: () => dismiss(),
    history: history,
  });

  const [presentModal, dismissModal] = useIonModal(SidemenuPopover, {
    dismiss: () => dismissModal(),
    history: history,
  });

  const handlePopover = (e: React.MouseEvent) => {
    if (isMobile) {
      presentModal({
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        cssClass: "sidemenu-modal",
      });
    } else {
      present({
        event: e.nativeEvent,
        side: "top",
        alignment: "center",
        showBackdrop: false,
        cssClass: "sidemenu-popover",
      });
    }
  };

  const popoverController = (
    <button
      id="open-popover"
      onClick={(e) => handlePopover(e)}
      className="w-full"
    >
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
