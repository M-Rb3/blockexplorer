import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SettingProvider } from "./context/setting.context";

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <App />
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
