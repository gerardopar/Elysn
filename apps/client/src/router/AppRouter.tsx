import { Routes, Route } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/login/Login";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
