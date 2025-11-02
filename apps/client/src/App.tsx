import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import AppRouter from "./router/AppRouter";
import { ApolloClientProvider } from "./apollo/ApolloClient";

export const App: React.FC = () => {
  return (
    <IonApp>
      <ApolloClientProvider>
        <IonReactRouter>
          <AppRouter />
        </IonReactRouter>
      </ApolloClientProvider>
    </IonApp>
  );
};

export default App;
