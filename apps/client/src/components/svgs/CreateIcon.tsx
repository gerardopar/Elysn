import React from "react";

import { IonIcon } from "@ionic/react";
import { create, createOutline, createSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const CreateIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={create} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={createSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={createOutline} className={className} {...props} />;
  }
};

export default CreateIcon;
