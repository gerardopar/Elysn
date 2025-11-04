import CreateIcon from "@components/svgs/CreateIcon";
import SearchIcon from "@components/svgs/SearchIcon";
import ImagesIcon from "@components/svgs/ImagesIcon";

import { type IonIconProps } from "../svgs/ionic-icons.helpers";

export enum SideMenuOptionsEnum {
  create = "create",
  search = "search",
  images = "images",
}

export type SideMenuOption = {
  title: string;
  icon: React.FC<
    {
      className?: string;
      variant?: "solid" | "outline" | "sharp";
    } & IonIconProps
  >;

  type: SideMenuOptionsEnum;
};

export type SideMenuOptions = SideMenuOption[];

export const sidemenuOptions: SideMenuOptions = [
  {
    title: "New chat",
    icon: CreateIcon,
    type: SideMenuOptionsEnum.create,
  },
  {
    title: "Search chats",
    icon: SearchIcon,
    type: SideMenuOptionsEnum.search,
  },
  {
    title: "Media",
    icon: ImagesIcon,
    type: SideMenuOptionsEnum.images,
  },
];
