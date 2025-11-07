import React from "react";

import { IonHeader, IonToolbar, IonMenuToggle, IonRow } from "@ionic/react";
import BrandingTextLogo from "@components/shared/BrandingTextLogo";
import MenuIcon from "@components/svgs/MenuIcon";

export const Header: React.FC = () => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar color="primary-dark" className="px-4">
        <IonRow className="flex items-center justify-start gap-2">
          <IonMenuToggle className="flex items-center justify-center mobile-768:hidden">
            <button>
              <MenuIcon className="text-primary-light w-6 h-6" />
            </button>
          </IonMenuToggle>
          <BrandingTextLogo />
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
