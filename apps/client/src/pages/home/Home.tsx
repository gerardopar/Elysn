import React from "react";

import CreateChat from "@components/create-chat/CreateChat";
import MainLayout from "@layout/MainLayout";
import Header from "@components/header/Header";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <CreateChat />
    </MainLayout>
  );
};

export default Home;
