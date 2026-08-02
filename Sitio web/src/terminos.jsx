import React from "react";
import ReactDOM from "react-dom/client";
import { Terminos } from "./design-system/ui_kits/legal/Terminos.jsx";
import "@fontsource/source-serif-4/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/600.css";
import "./design-system/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Terminos />
  </React.StrictMode>
);
