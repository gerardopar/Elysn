import React from "react";

import { IonIcon } from "@ionic/react";
import {
  chevronExpand,
  chevronExpandOutline,
  chevronExpandSharp,
} from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const ChevronExpandIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={chevronExpand} className={className} {...props} />;
    case "sharp":
      return (
        <IonIcon icon={chevronExpandSharp} className={className} {...props} />
      );
    default:
      return (
        <IonIcon icon={chevronExpandOutline} className={className} {...props} />
      );
  }
};

export default ChevronExpandIcon;
