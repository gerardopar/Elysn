import { Routes, Route, Navigate } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/login/Login";

import { PrivateRoute } from "./PrivateRoute";

import { userStore } from "../stores/user";

export const AppRouter = () => {
  const user = userStore.useTracked("user");

  return (
    <Routes>
      {/* If user is logged in, redirect "/" → "/home" */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <Login />}
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
