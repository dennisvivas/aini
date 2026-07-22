import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AiniHome } from "./design-system/ui_kits/aini-home/AiniHome.jsx";
import "./design-system/styles.css";

const Root = window.location.hash === "#styleguide" ? App : AiniHome;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
