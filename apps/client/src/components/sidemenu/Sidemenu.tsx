import React from "react";

import {
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
} from "@ionic/react";

import AppIcon from "../../assets/images/app-icon.png";
import ChevronExpandIcon from "../svgs/ChevronExpandIcon";
import ChevronCollapseIcon from "../svgs/ChevronCollapseIcon";

import { sidemenuOptions } from "./sidemenu.helpers";
import { sideMenuStore } from "../../stores/sidemenu";

export const Sidemenu: React.FC = () => {
  const isExpanded = sideMenuStore.useTracked("isExpanded");

  const toggleMenu = () => sideMenuStore.actions.setExpanded(!isExpanded);

  return (
    <IonMenu contentId="main" side="start" className="sidemenu">
      <IonContent fullscreen>
        <IonList
          color="secondary-gray"
          className="h-full bg-secondary-gray!"
          lines="none"
        >
          <IonListHeader className="flex items-center justify-between px-6 w-full gap-4">
            <img
              src={AppIcon}
              alt="App Icon"
              className="w-[20px] h-auto shrink-0"
            />
            <div className="flex-1"></div>
            <button
              onClick={toggleMenu}
              className="w-8 h-8 flex items-center justify-center rotate-90 shrink-0"
            >
              {isExpanded ? (
                <ChevronCollapseIcon
                  variant="outline"
                  className="text-xl"
                  color="primary-light"
                />
              ) : (
                <ChevronExpandIcon
                  variant="outline"
                  className="text-xl"
                  color="primary-light"
                />
              )}
            </button>
          </IonListHeader>
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
