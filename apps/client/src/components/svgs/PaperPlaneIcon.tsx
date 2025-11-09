import React from "react";

import { IonIcon } from "@ionic/react";
import { paperPlane, paperPlaneOutline, paperPlaneSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const PaperPlaneIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={paperPlane} className={className} {...props} />;
    case "sharp":
      return (
        <IonIcon icon={paperPlaneSharp} className={className} {...props} />
      );
    default:
      return (
        <IonIcon icon={paperPlaneOutline} className={className} {...props} />
      );
  }
};

export default PaperPlaneIcon;
