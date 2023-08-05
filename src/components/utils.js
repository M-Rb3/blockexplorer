import { Utils } from "alchemy-sdk";
import { ethers } from "ethers";

export function timeDifference(previous) {
  const current = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
export const getBlockReward = async (block, alchemy) => {
  const getGasUsage = async (hash) => {
    const txRes = await alchemy.core.getTransactionReceipt(`${hash}`);
    return txRes.gasUsed;
  };

  try {
    console.log("fetching block rewards...");
    const transactions = block.transactions;
    const baseFeePerGas = block.baseFeePerGas;
    const gasUsed = block.gasUsed;

    let minerTips = [];
    let sumMinerTips = 0;
    for (const tx of transactions) {
      const txGasUseage = await getGasUsage(tx.hash);
      const totalFee = Utils.formatEther(
        ethers.BigNumber.from(txGasUseage).mul(tx.gasPrice).toString()
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

    return blockReward;
  } catch (error) {
    console.log(error);
    return "";
  }
};
