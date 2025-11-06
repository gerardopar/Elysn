import NotificationsIcon from "../../svgs/NotificationsIcon";
import PersonCircleIcon from "../../svgs/PersonCircleIcon";
import SettingsIcon from "../../svgs/SettingsIcon";
import RocketIcon from "../../svgs/RocketIcon";
import LogoutIcon from "../../svgs/LogoutIcon";

import { type IonIconProps } from "../../svgs/ionic-icons.helpers";

export enum SideMenuPopoverOptionsEnum {
  account = "account",
  settings = "settings",
  notifications = "notifications",
  personalization = "personalization",
  logout = "logout",
}

export type SideMenuPopoverOption = {
  title: string;
  icon: React.FC<
    {
      className?: string;
      variant?: "solid" | "outline" | "sharp";
    } & IonIconProps
  >;

  type: SideMenuPopoverOptionsEnum;
};

export type SideMenuPopoverOptions = SideMenuPopoverOption[];

export const sidemenuPopoverOptions: SideMenuPopoverOptions = [
  {
    title: "Account",
    icon: PersonCircleIcon,
    type: SideMenuPopoverOptionsEnum.account,
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    type: SideMenuPopoverOptionsEnum.settings,
  },
  {
    title: "Notifications",
    icon: NotificationsIcon,
    type: SideMenuPopoverOptionsEnum.notifications,
  },
  {
    title: "Personalization",
    icon: RocketIcon,
    type: SideMenuPopoverOptionsEnum.personalization,
  },
  {
    title: "Logout",
    icon: LogoutIcon,
    type: SideMenuPopoverOptionsEnum.logout,
  },
];
