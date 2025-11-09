import React from "react";

import { IonIcon } from "@ionic/react";
import { logOut, logOutOutline, logOutSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const LogoutIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={logOut} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={logOutSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={logOutOutline} className={className} {...props} />;
  }
};

export default LogoutIcon;
