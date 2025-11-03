import React from "react";

import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import BrandingTextLogo from "@components/shared/BrandingTextLogo";

export const Header: React.FC = () => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar color="eerie-black" className="px-4">
        <IonTitle>
          <BrandingTextLogo />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
