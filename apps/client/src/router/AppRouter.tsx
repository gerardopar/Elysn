import { Route, Switch, Redirect } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "@pages/Home";
import Login from "@pages/login/Login";
import { useCurrentUser } from "../stores/user";

const AppRouter: React.FC = () => {
  // Using the useCurrentUser hook to access the user state
  const { user } = useCurrentUser();

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

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </IonRouterOutlet>
  );
};

export default AppRouter;
