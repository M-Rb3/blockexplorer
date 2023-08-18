import React, { useContext,useEffect } from "react";
import { timeDifference, getBlockReward } from "../components/utils";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { SettingContext } from "../context/AppStateContext";

const BlockDetails = () => {
  const { blockNumber } = useParams();

  const { alchemy } = useContext(SettingContext);

  async function getReward(block) {
    const blockReward = await getBlockReward(block, alchemy);
    return blockReward;
  }

  useEffect(()=>{
    getBlockReward(block)
  }.[])
  return (
    <div className="max-w-screen-xl px-5 w-full flex flex-col">
      <div className="flex gap-1 py-3">
        <div className="font-bold text-xl">Block</div>
        <div className="text-gray-400">
          {/* #{block.number} */}
          1242142
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-700 opacity-50 mb-3" />
      <div className="font-bold">overview</div>
      <div className="bg-zinc-900 flex flex-col gap-2 p-2 rounded-md my-4">
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400">BlockHeight</div>
          <div>
            {" "}
            {/* #{block.number} */}
            1242142
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400">Timestamp</div>
          <div>
            {" "}
            {/* {timeDifference(block.timestamp)} */}
            34 mins ago (Aug-06-2023 04:39:47 PM +UTC)
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400">Transactions</div>
          <div>
            {" "}
            13215 transactions
            {/* {block.transactions?.length} transactions */}
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Block Reward: </div>
          <div>
            0.062444331574352069 ETH
            {block.difficulty}
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Total Difficulty: </div>
          <div> 0{/* {block.difficulty} */}</div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400">Gas Used</div>
          <div>
            {" "}
            58,750,003,716,598,352,816,469
            {/* {ethers.BigNumber.from(block.gasUsed)} */}
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400">Gas Limit</div>
          <div>
            {" "}
            30,000,000
            {/* {ethers.BigNumber.from(block.gasUsed)} */}
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Base Fee Per Gas:</div>
          <div>
            {" "}
            0.0005435
            {/* {ethers.BigNumber.from(block.baseFeePerGas.hex)} */}
          </div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Extra Data: </div>
          <div> Hex: fsdfsdfs hex: {/* {block.extraData} */}</div>
        </div>
      </div>
      <div className="bg-zinc-900 flex flex-col gap-2 p-2 rounded-md">
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Hash: </div>
          <div> Hash: {/* {block.hash} */}</div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Parent Hash: </div>
          <div> Hash: {/* {block.parentHash} */}</div>
        </div>
        <div className="grid grid-cols-[30%70%] p-1">
          <div className="text-zinc-400"> Nonce: </div>
          <div> Hash: {/* {block.nonce} */}</div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
