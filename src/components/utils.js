import { Utils } from "alchemy-sdk";
import { ethers } from "ethers";

export function timeDifference(timestamp) {
  const currentTime = Date.now();

  const timeDifference = currentTime - timestamp * 1000;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remainderHours = hours % 24;
    if (remainderHours === 0) return `${days} day${days !== 1 ? "s" : ""}`;
    return `${days} day${days !== 1 ? "s" : ""} and ${remainderHours} hour${
      remainderHours !== 1 ? "s" : ""
    } ago`;
  } else if (hours > 0) {
    const remainderMinutes = minutes % 60;
    if (remainderMinutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } and ${remainderMinutes} minute${remainderMinutes !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

const getGasUsage = async (alchemy, hash, isBlock = false) => {
  if (isBlock) {
    const txRes = await alchemy.core.getTransactionReceipts({
      blockHash: hash,
    });
    return txRes;
  }
  const txRes = await alchemy.core.getTransactionReceipt(`${hash}`);
  return txRes;
};

export const getBlockReward = async (block, alchemy) => {
  try {
    console.log("fetching block rewards...");
    const transactions = block?.transactions;
    const baseFeePerGas = block.baseFeePerGas;
    const gasUsed = block.gasUsed;

    let minerTips = [];
    let sumMinerTips = 0;

    const { receipts } = await getGasUsage(alchemy, block.hash, true);
    for (const tx of receipts) {
      const totalFee = Utils.formatEther(
        ethers.BigNumber.from(tx.gasUsed).mul(tx.effectiveGasPrice).toString()
      );

      minerTips.push(Number(totalFee));
    }
    if (transactions.length > 0) {
      sumMinerTips = minerTips.reduce(
        (prevTip, currentTip) => prevTip + currentTip
      );
    }

    const burnedFee = Utils.formatEther(
      ethers.BigNumber.from(gasUsed).mul(baseFeePerGas).toString()
    );

    const baseBlockReward = 0;

    const blockReward = baseBlockReward + (sumMinerTips - Number(burnedFee));

    return blockReward.toFixed(3);
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getTxReceipt = async (alchemy, tx) => {
  const receipt = await getGasUsage(alchemy, tx.hash);
  const txFees = Utils.formatEther(
    ethers.BigNumber.from(receipt.gasUsed).mul(tx.gasPrice).toString()
  );
  return { txFees, status: receipt.status, gasUsage: receipt.gasUsed };
};
