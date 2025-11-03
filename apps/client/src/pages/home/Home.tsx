import React from "react";

import { IonContent } from "@ionic/react";
import { MainLayout } from "@layout/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <IonContent fullscreen>
        <div className="w-full h-full pt-[75px] bg-eerie-black"></div>
      </IonContent>
    </MainLayout>
  );
};

export default Home;
