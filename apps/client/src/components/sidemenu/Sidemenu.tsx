import React from "react";

import {
  IonMenu,
  IonHeader,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
} from "@ionic/react";

export const Sidemenu: React.FC = () => {
  return (
    <IonMenu contentId="main" side="start" className="sidemenu">
      <IonHeader />
      <IonContent fullscreen>
        <IonList
          color="secondary-gray"
          className="h-full bg-secondary-gray!"
          lines="none"
        >
          <IonListHeader>Menu</IonListHeader>
          <IonItem color="secondary-gray">Item 1</IonItem>
          <IonItem color="secondary-gray">Item 2</IonItem>
          <IonItem color="secondary-gray">Item 3</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidemenu;
