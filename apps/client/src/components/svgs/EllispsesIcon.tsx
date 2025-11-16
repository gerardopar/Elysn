import React from "react";

import { IonIcon } from "@ionic/react";
import {
  // horizontal
  ellipsisHorizontalOutline,
  ellipsisHorizontalSharp,
  ellipsisHorizontal,

  // vertical
  ellipsisVerticalOutline,
  ellipsisVerticalSharp,
  ellipsisVertical,
} from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const EllispsesIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
    vertical?: boolean;
  } & IonIconProps
> = ({ className, variant = "outline", vertical = false, ...props }) => {
  switch (variant) {
    case "solid":
      if (vertical) {
        return (
          <IonIcon icon={ellipsisVertical} className={className} {...props} />
        );
      }
      return (
        <IonIcon icon={ellipsisHorizontal} className={className} {...props} />
      );
    case "sharp":
      if (vertical) {
        return (
          <IonIcon
            icon={ellipsisVerticalSharp}
            className={className}
            {...props}
          />
        );
      }
      return (
        <IonIcon
          icon={ellipsisHorizontalSharp}
          className={className}
          {...props}
        />
      );
    default:
      if (vertical) {
        return (
          <IonIcon
            icon={ellipsisVerticalOutline}
            className={className}
            {...props}
          />
        );
      }
      return (
        <IonIcon
          icon={ellipsisHorizontalOutline}
          className={className}
          {...props}
        />
      );
  }
};

export default EllispsesIcon;
