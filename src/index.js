import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SettingProvider } from "./context/AppStateContext";
import BlockDetails from "./pages/BlockDetails";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
dispatch({
  alchemy,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <SettingProvider>
          <div className="App text-white bg-zinc-800 min-h-screen flex flex-col justify-start items-center">
            <Nav />
            <Route path="/" exact>
              <App />
            </Route>
            <Route path="/block/:blockNumber" exact>
              <BlockDetails />
            </Route>
          </div>
        </SettingProvider>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
