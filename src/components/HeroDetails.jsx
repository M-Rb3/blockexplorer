import React, { useContext, useEffect, useState } from "react";
import {
  SettingContext,
  SettingDispatchContext,
} from "../context/setting.context";
import axios from "axios";

const HeroDetails = () => {
  const [blockNumber, setBlockNumber] = useState("");
  const [blocks, setBlocks] = useState([]);

  const { alchemy } = useContext(SettingContext);
  const dispatch = useContext(SettingDispatchContext);

  // useEffect(() => {
  //   async function getBlockNumber() {
  //     const blockNumber = await alchemy.core.getBlockNumber();
  //     setBlockNumber();
  //     const blocks = await Promise.all(
  //       Array(10)
  //         .fill(0)
  //         .map(async (n, idx) => {
  //           return await alchemy.core.getBlock(blockNumber - idx);
  //         })
  //     );
  //     console.log(blocks);
  //     setBlocks(blocks);
  //     console.log(process.env.REACT_APP_COINMARKETCAP);

  //     const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH&CMC_PRO_API_KEY=${process.env.REACT_APP_COINMARKETCAP}`;
  //     const price = await axios.get(url);
  //   }
  //   getBlockNumber();
  // }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-rows-2 items-center bg-zinc-900 rounded-md p-5">
      <div className="flex flex-col px-5">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <img
              className="w-[18px] h-auto"
              src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
              alt="ETH"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="text-zinc-400 text-xs">ETHER PRICE</div>
            <div className="text-sm">
              $1,743.43 <span className="text-zinc-400"> @ 0.06763 BTC </span>{" "}
              <span className="text-green-600"> (+0.48%)</span>
            </div>
          </div>
        </div>
        <hr className="my-5 border-zinc-600 " />
        <div>
          <div className="flex gap-3">
            <div className="flex items-center justify-center">
              <img
                className="w-[18px] h-auto"
                src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
                alt="ETH"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="text-zinc-400 text-xs">MARKET CAP</div>
              <div className="text-sm">
                $1,743.43 <span className="text-zinc-400"> @ 0.06763 BTC </span>{" "}
                <span className="text-green-600"> (+0.48%)</span>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flex flex-col px-5 border-l border-zinc-600">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <img
              className="w-[18px] h-auto"
              src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
              alt="ETH"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="text-zinc-400 text-xs">TRANSACTIONS</div>
            <div className="text-sm">
              1,996.83 M <span className="text-zinc-400"> (14.7 TPS)</span>{" "}
            </div>
          </div>
        </div>
        <hr className="my-5 border-zinc-600 " />
        <div>
          <div className="flex gap-3">
            <div className="flex items-center justify-center">
              <img
                className="w-[18px] h-auto"
                src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
                alt="ETH"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="text-zinc-400 text-xs">LAST FINALIZED BLOCK</div>
              <div className="text-sm">{blockNumber}</div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flex h-full flex-col px-5 border-l border-zinc-600">
        Graph
      </div>
    </div>
  );
};

export default HeroDetails;
