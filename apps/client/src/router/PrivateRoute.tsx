import type { ReactNode } from "react";
import { Redirect } from "react-router-dom";

import { userStore } from "../stores/user";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = userStore.useTracked("user");

  if (!user) {
    return <Redirect to="/" />;
  }

  return children;
};
