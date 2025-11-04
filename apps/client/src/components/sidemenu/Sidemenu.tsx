import React from "react";

import {
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonRow,
  IonToolbar,
  IonFooter,
} from "@ionic/react";

import UserAvatar from "../user-avatar/UserAvatar";
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
      <IonContent fullscreen color="secondary-gray">
        <IonList
          color="secondary-gray"
          className="bg-secondary-gray!"
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
              <span className="text-primary-light text-base font-roboto">
                {option.title}
              </span>
            </IonItem>
          ))}
        </IonList>

        <div className="flex-1" />
      </IonContent>
      <IonToolbar color="secondary-gray">
        <IonFooter className="px-1 pb-1">
          <IonRow className="w-full flex items-center justify-start gap-2 rounded-lg bg-primary-dark px-2 py-2">
            <UserAvatar className="w-[30px] h-[30px] max-w-[30px] max-h-[30px]" />
            <IonRow className="flex flex-col">
              <span className="text-primary-light font-roboto text-base">
                Gerardo Paredes
              </span>
              <span className="text-gray-400 font-roboto text-xs">Beta</span>
            </IonRow>
          </IonRow>
        </IonFooter>
      </IonToolbar>
    </IonMenu>
  );
};

export default Sidemenu;
