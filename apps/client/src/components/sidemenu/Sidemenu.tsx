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
        <IonList color="night" className="h-full bg-night!" lines="none">
          <IonListHeader>Menu</IonListHeader>
          <IonItem color="night">Item 1</IonItem>
          <IonItem color="night">Item 2</IonItem>
          <IonItem color="night">Item 3</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidemenu;
