import React from "react";

import Chat from "@components/chat/Chat";
import { IonContent } from "@ionic/react";
import MainLayout from "@layout/MainLayout";
import Header from "@components/header/Header";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <IonContent fullscreen color="primary-dark">
        <Chat />
      </IonContent>
    </MainLayout>
  );
};

export default Home;
