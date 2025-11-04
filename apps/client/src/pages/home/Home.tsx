import React from "react";

import { IonContent } from "@ionic/react";
import Header from "@components/header/Header";
import { MainLayout } from "@layout/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <IonContent fullscreen color="primary-dark">
        <div className="w-full h-full pt-[60px]">
          <div className="w-full h-full bg-primary-dark rounded-t-[20px] ion-padding overflow-y-auto"></div>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Home;
