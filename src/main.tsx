import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/** Bootstrap only. Everything the app needs is composed inside `App`. */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
