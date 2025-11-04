import React from "react";

import {
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
} from "@ionic/react";

import { sidemenuOptions } from "./sidemenu.helpers";

export const Sidemenu: React.FC = () => {
  return (
    <IonMenu contentId="main" side="start" className="sidemenu">
      <IonContent fullscreen>
        <IonList
          color="secondary-gray"
          className="h-full bg-secondary-gray!"
          lines="none"
        >
          <IonListHeader>Menu</IonListHeader>
          {sidemenuOptions.map((option) => (
            <IonItem color="secondary-gray" key={option.type} className="gap-3">
              <div className="w-8 flex items-center justify-center">
                <option.icon
                  variant="outline"
                  className="text-xl"
                  color="primary-light"
                />
              </div>
              <span className="text-primary-light text-base">
                {option.title}
              </span>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidemenu;
