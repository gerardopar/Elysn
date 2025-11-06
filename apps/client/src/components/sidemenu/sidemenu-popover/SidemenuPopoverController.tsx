import React from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import SidemenuPopover from "./SidemenuPopover";
import UserAvatar from "../../user/UserAvatar";
import UserInfo from "../../user/UserInfo";

export const SidemenuPopoverController: React.FC = () => {
  const [present, dismiss] = useIonPopover(SidemenuPopover, {
    dismiss: () => dismiss(),
  });

  return (
    <button
      id="open-popover"
      onClick={(e) =>
        present({
          event: e.nativeEvent,
          side: "top",
          alignment: "center",
          showBackdrop: false,
          cssClass: "sidemenu-popover",
        })
      }
      className="w-full"
    >
      <IonRow className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-2">
        <UserAvatar className="w-[30px] h-[30px]" />
        <UserInfo />
      </IonRow>
    </button>
  );
};

export default SidemenuPopoverController;
