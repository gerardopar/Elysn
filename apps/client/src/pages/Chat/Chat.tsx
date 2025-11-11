import React from "react";

import ChatView from "@components/chat/ChatView";
import MainLayout from "@layout/MainLayout";
import Header from "@components/header/Header";

const Chat: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <ChatView />
    </MainLayout>
  );
};

export default Chat;
