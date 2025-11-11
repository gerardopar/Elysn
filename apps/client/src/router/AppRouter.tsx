import { Route, Switch, Redirect } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "@pages/home/Home";
import Chat from "@pages/Chat/Chat";
import Login from "@pages/login/Login";

import { userStore } from "../stores/user";

const AppRouter: React.FC = () => {
  // Using the useCurrentUser hook to access the user state
  const user = userStore.useTracked("user");

  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (user ? <Redirect to="/home" /> : <Login />)}
        />

        <Route
          path="/home"
          render={() => (user ? <Home /> : <Redirect to="/" />)}
        />

        <Route
          exact
          path="/chat/:chatId"
          render={() => (user ? <Chat /> : <Redirect to="/" />)}
        />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </IonRouterOutlet>
  );
};

export default AppRouter;
