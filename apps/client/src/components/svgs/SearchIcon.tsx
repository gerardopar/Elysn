import React from "react";

import { IonIcon } from "@ionic/react";
import { search, searchOutline, searchSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const SearchIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={search} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={searchSharp} className={className} {...props} />;
    default:
      return <IonIcon icon={searchOutline} className={className} {...props} />;
  }
};

export default SearchIcon;
