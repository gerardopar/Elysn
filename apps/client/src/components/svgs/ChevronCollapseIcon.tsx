import React from "react";

import { IonIcon } from "@ionic/react";
import {
  chevronCollapse,
  chevronCollapseOutline,
  chevronCollapseSharp,
} from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const ChevronCollapseIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return (
        <IonIcon icon={chevronCollapse} className={className} {...props} />
      );
    case "sharp":
      return (
        <IonIcon icon={chevronCollapseSharp} className={className} {...props} />
      );
    default:
      return (
        <IonIcon
          icon={chevronCollapseOutline}
          className={className}
          {...props}
        />
      );
  }
};

export default ChevronCollapseIcon;
