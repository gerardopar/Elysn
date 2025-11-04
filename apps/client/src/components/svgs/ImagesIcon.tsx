import React from "react";

import { IonIcon } from "@ionic/react";
import { images, imagesOutline, imagesSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const ImagesIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "solid", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={images} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={imagesSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={imagesOutline} className={className} {...props} />;
  }
};

export default ImagesIcon;
