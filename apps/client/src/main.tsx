import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// @ts-ignore
import firebase from "./firebase/config";

import App from "./App.tsx";

import "./styles/index.css";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
