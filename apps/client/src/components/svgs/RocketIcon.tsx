import React from "react";

import { IonIcon } from "@ionic/react";
import { rocket, rocketOutline, rocketSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const RocketIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={rocket} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={rocketSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={rocketOutline} className={className} {...props} />;
  }
};

export default RocketIcon;
