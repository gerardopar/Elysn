import React from "react";

import { IonIcon } from "@ionic/react";
import { trash, trashOutline, trashSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

export const TrashIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "solid", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={trash} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={trashSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={trashOutline} className={className} {...props} />;
  }
};

export default TrashIcon;
