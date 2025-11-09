import React from "react";

import { IonIcon } from "@ionic/react";
import {
  personCircle,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const PersonCircleIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={personCircle} className={className} {...props} />;
    case "sharp":
      return (
        <IonIcon icon={personCircleSharp} className={className} {...props} />
      );
    default:
      return (
        <IonIcon icon={personCircleOutline} className={className} {...props} />
      );
  }
};

export default PersonCircleIcon;
