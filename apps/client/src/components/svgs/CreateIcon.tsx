import React from "react";
import { IonIcon } from "@ionic/react";

const CreateIcon: React.FC<{
  className?: string;
  variant?: "create" | "create-outline" | "create-sharp";
}> = ({ className, variant = "create-outline" }) => {
  return <IonIcon name={variant} className={className} />;
};

export default CreateIcon;
