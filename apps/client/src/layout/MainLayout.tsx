import React, { type ReactNode } from "react";

import { IonSplitPane, IonPage } from "@ionic/react";
import Sidemenu from "@components/sidemenu/Sidemenu";
import Header from "@components/header/Header";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout
 * - Desktop: SplitPane (menu + content)
 * - Mobile: Slide-out menu
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <IonSplitPane contentId="main" when="md">
        {/* md = show split on ≥768px */}
        {/* Side Menu */}
        <Sidemenu />
        {/* Main Page */}
        <IonPage id="main">{children}</IonPage>
      </IonSplitPane>
    </>
  );
};

export default MainLayout;
