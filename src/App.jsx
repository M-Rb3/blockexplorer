import React, { useContext, useEffect } from "react";
import { SettingDispatchContext } from "./context/AppStateContext";
import { SettingContext } from "./context/AppStateContext";
import Hero from "./components/Hero";
import Blocks from "./components/Blocks";
import Transactions from "./components/Transactions";
import HeroDetails from "./components/HeroDetails";

function App() {
  const { alchemy } = useContext(SettingContext);
  const dispatch = useContext(SettingDispatchContext);

  useEffect(() => {
    if (alchemy)
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
    <>
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
    </>
  );
}

export default App;
