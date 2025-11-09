import React from "react";

import { IonFooter } from "@ionic/react";

import SidemenuPopoverController from "./sidemenu-popover/SidemenuPopoverController";

export const SidemenuFooter: React.FC = () => {
  return (
    <IonFooter className="px-1 pb-1 cursor-pointer">
      <SidemenuPopoverController />
    </IonFooter>
  );
};

export default SidemenuFooter;
