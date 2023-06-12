import React, { useContext, useEffect, useState } from "react";
import {
  SettingContext,
  SettingDispatchContext,
} from "./context/setting.context";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Blocks from "./components/Blocks";

function App() {
  const { alchemy } = useContext(SettingContext);
  const dispatch = useContext(SettingDispatchContext);

  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <div className="App text-white bg-slate-800">
      <Nav />
      <Hero />
      <div className="grid grid-cols-2 gap-5 px-5">
        <div>
          <Blocks />
        </div>
        <div>
          <Blocks />
        </div>
      </div>
      Block Number: {blockNumber}
    </div>
  );
}

export default App;
