import React, { useState, useContext, useEffect } from "react";
import { timeDifference, getBlockReward } from "./utils";
import { SettingContext } from "../context/AppStateContext";

const Block = ({ block }) => {
  const [blockReward, setBlockReward] = useState("...");
  const { alchemy } = useContext(SettingContext);
  console.log(block);
  useEffect(() => {
    (async function () {
      const blockReward = await getBlockReward(block, alchemy);
      setBlockReward(blockReward);
    })();
  }, [alchemy, block]);

  return (
    <div
      className="flex items-center gap-5 p-4 text-sm cursor-pointer border-b border-b-zinc-800"
      key={block.number}
    >
      <div className="h-12 w-12 flex items-center justify-center bg-zinc-800 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.2em"
          width={"1.2em"}
          fill="white"
          viewBox="0 0 512 512"
        >
          <path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <div className="text-blue-500">{block.number}</div>
        <div className="text-zinc-500">{timeDifference(block.timestamp)}</div>
      </div>
      <div className="flex flex-col text-left">
        <div>Fee Recipient Lido: Execution Laye</div>
        <div>
          <span className="text-blue-500">
            {" "}
            {block.transactions.length} txns{" "}
          </span>{" "}
          in 12 secs
        </div>
      </div>
      <div className="p-2 font-bold bg-zinc-950 border border-zinc-800 text-xs rounded-md ml-auto">
        {blockReward} Eth
      </div>
    </div>
  );
};

export default Block;
