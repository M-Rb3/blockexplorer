import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SettingProvider } from "./context/setting.context";
import BlockDetails from "./pages/BlockDetails";
import Nav from "./components/Nav";

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <div className="App text-white bg-zinc-800 min-h-screen flex flex-col justify-start items-center">
        <Nav />
        {/* <App /> */}
        <BlockDetails />
      </div>
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
