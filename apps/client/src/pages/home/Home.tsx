import React from "react";

import Chat from "@components/chat/Chat";
import MainLayout from "@layout/MainLayout";
import Header from "@components/header/Header";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <Chat />
    </MainLayout>
  );
};

export default Home;
