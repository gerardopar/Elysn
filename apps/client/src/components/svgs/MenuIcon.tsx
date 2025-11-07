import React from "react";

import { IonIcon } from "@ionic/react";
import { menu, menuOutline, menuSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const MenuIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={menu} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={menuSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={menuOutline} className={className} {...props} />;
  }
};

export default MenuIcon;
