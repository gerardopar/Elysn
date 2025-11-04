import React from "react";
import { IonIcon } from "@ionic/react";

const ImagesIcon: React.FC<{
  className?: string;
  variant?: "images" | "images-outline" | "images-sharp";
}> = ({ className, variant = "images" }) => {
  return <IonIcon name={variant} className={className} />;
};

export default ImagesIcon;
