import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import AppRouter from "./router/AppRouter";
import { ApolloClientProvider } from "./apollo/ApolloClient";

export const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <IonApp>
        <IonReactRouter>
          <AppRouter />
        </IonReactRouter>
      </IonApp>
    </ApolloClientProvider>
  );
};

export default App;
