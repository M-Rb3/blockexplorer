import React, { useContext, useEffect, useState } from "react";
import {
  SettingContext,
  SettingDispatchContext,
} from "./context/setting.context";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Blocks from "./components/Blocks";
import Transactions from "./components/Transactions";
import HeroDetails from "./components/HeroDetails";

function App() {
  const { alchemy } = useContext(SettingContext);
  const dispatch = useContext(SettingDispatchContext);

  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    // async function getBlockNumber() {
    //   setBlockNumber(await alchemy.core.getBlockNumber());
    // }
    // getBlockNumber();
  });

  return (
    <div className="App text-white bg-slate-800 min-h-screen flex flex-col justify-start items-center">
      <Nav />
      <Hero />
      <div className="max-w-screen-xl px-5 w-full">
        <div className="mb-4 -mt-8">
          <HeroDetails />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Blocks />
          </div>
          <div>
            <Transactions />
          </div>
        </div>
        Block Number: {blockNumber}
      </div>
    </div>
  );
}

export default App;
