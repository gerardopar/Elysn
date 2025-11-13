import React from "react";

import { IonIcon } from "@ionic/react";
import { arrowDown, arrowDownOutline, arrowDownSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

export const ArrowDownIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={arrowDown} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={arrowDownSharp} className={className} {...props} />;
    default:
      return (
        <IonIcon icon={arrowDownOutline} className={className} {...props} />
      );
  }
};

export default ArrowDownIcon;
