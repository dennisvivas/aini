import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AiniHome } from "./design-system/ui_kits/aini-home/AiniHome.jsx";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/500.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "./design-system/styles.css";

const Root = window.location.hash === "#styleguide" ? App : AiniHome;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
