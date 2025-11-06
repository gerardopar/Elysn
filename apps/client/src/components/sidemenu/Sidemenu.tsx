import React from "react";

import { IonMenu, IonContent } from "@ionic/react";

import SidemenuFooter from "./SidemenuFooter";
import SidemenuOptionsList from "./SidemenuOptionsList";

export const Sidemenu: React.FC = () => {
  return (
    <IonMenu contentId="main" side="start" className="sidemenu">
      <IonContent fullscreen color="secondary-gray">
        <SidemenuOptionsList />
        <div className="flex-1" />
      </IonContent>
      <SidemenuFooter />
    </IonMenu>
  );
};

export default Sidemenu;
