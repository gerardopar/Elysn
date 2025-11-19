import TrashIcon from "../svgs/TrashIcon";
import PencilIcon from "../svgs/PencilIcon";

import { type IonIconProps } from "../svgs/ionic-icons.helpers";

export enum ChatsListOptionsEnum {
  edit = "edit",
  delete = "delete",
}

export type ChatsListOptionsOption = {
  title: string;
  icon: React.FC<
    {
      className?: string;
      variant?: "solid" | "outline" | "sharp";
    } & IonIconProps
  >;

  type: ChatsListOptionsEnum;
};

export type ChatsListOptions = ChatsListOptionsOption[];

export const chatsListOptions: ChatsListOptions = [
  {
    title: "Edit",
    icon: PencilIcon,
    type: ChatsListOptionsEnum.edit,
  },
  {
    title: "Delete",
    icon: TrashIcon,
    type: ChatsListOptionsEnum.delete,
  },
];
