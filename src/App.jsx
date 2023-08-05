import React, { useContext, useEffect, useState } from "react";
import { SettingDispatchContext } from "./context/setting.context";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Blocks from "./components/Blocks";
import Transactions from "./components/Transactions";
import HeroDetails from "./components/HeroDetails";
import { Alchemy, Network } from "alchemy-sdk";

function App() {
  const dispatch = useContext(SettingDispatchContext);

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  useEffect(() => {
    (async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      const blocks = await Promise.all(
        Array(10)
          .fill(0)
          .map(async (n, idx) => {
            return await alchemy.core.getBlockWithTransactions(
              blockNumber - idx
            );
          })
      );
      let transactions = [];
      blocks.forEach((block) => {
        if (transactions.length === 10) {
          return;
        } else if (block.transactions.length >= 10) {
          transactions = block.transactions.slice(0, 10);
        } else {
          transactions = [...transactions.slice(0, 10 - transactions.length)];
        }
      });
      dispatch({
        blocks,
        blockNumber,
        alchemy,
        transactions,
      });
    })();
  });

  return (
    <div className="App text-white bg-zinc-800 min-h-screen flex flex-col justify-start items-center">
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
      </div>
    </div>
  );
}

export default App;
