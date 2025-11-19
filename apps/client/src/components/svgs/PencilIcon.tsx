import React from "react";

import { IonIcon } from "@ionic/react";
import { pencil, pencilOutline, pencilSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

export const PencilIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "solid", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={pencil} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={pencilSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={pencilOutline} className={className} {...props} />;
  }
};

export default PencilIcon;
