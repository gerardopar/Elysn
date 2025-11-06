import React from "react";

import { IonIcon } from "@ionic/react";
import { settings, settingsOutline, settingsSharp } from "ionicons/icons";

import { type IonIconProps } from "./ionic-icons.helpers";

const SettingsIcon: React.FC<
  {
    className?: string;
    variant?: "solid" | "outline" | "sharp";
  } & IonIconProps
> = ({ className, variant = "outline", ...props }) => {
  switch (variant) {
    case "solid":
      return <IonIcon icon={settings} className={className} {...props} />;
    case "sharp":
      return <IonIcon icon={settingsSharp} className={className} {...props} />;
    default:
      return (
        <IonIcon icon={settingsOutline} className={className} {...props} />
      );
  }
};

export default SettingsIcon;
