import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./router/AppRouter";
import { ApolloClientProvider } from "./apollo/ApolloClient";

export const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ApolloClientProvider>
  );
};

export default App;
