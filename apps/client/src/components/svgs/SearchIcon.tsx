import React from "react";

import { IonIcon } from "@ionic/react";

const SearchIcon: React.FC<{
  className?: string;
  variant?: "search" | "search-outline" | "search-sharp";
}> = ({ className, variant = "search-outline" }) => {
  return <IonIcon name={variant} className={className} />;
};

export default SearchIcon;
