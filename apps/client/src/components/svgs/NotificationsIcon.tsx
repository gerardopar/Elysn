import React from "react";

import { IonIcon } from "@ionic/react";
import {
  notifications,
  notificationsOutline,
  notificationsSharp,
} from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const NotificationsIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={notifications} className={className} {...props} />;
    case "sharp":
      return (
        <IonIcon icon={notificationsSharp} className={className} {...props} />
      );
    default:
      return (
        <IonIcon icon={notificationsOutline} className={className} {...props} />
      );
  }
};

export default NotificationsIcon;
