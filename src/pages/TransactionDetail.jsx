import React, { useContext, useEffect, useState } from "react";
import { timeDifference } from "../components/utils";
import { Link, useParams } from "react-router-dom";
import { SettingContext } from "../context/AppStateContext";
import { Utils } from "alchemy-sdk";
import { getTxReceipt } from "../components/utils";
const TransactionDetail = () => {
  const { txHash } = useParams();
  const [transaction, setTransaction] = useState();

  const { alchemy } = useContext(SettingContext);

  useEffect(() => {
    if (alchemy && txHash)
      (async function () {
        let transaction = await alchemy.transact.getTransaction(txHash);
        const block = await alchemy.core.getBlock(transaction.blockNumber);
        const { txFees, status, gasUsage } = await getTxReceipt(
          alchemy,
          transaction
        );
        transaction = {
          ...transaction,
          timestamp: block.timestamp,
          baseFeePerGas: block.baseFeePerGas,
          txFees,
          status,
          gasUsage,
        };
        setTransaction(transaction);
      })();
  }, [alchemy, txHash]);

  const bgStatus = transaction?.status ? "green" : "red";
  return (
    <div className="max-w-screen-xl px-5 w-full flex flex-col">
      <div className="flex items-baseline gap-1 py-3">
        <div className="font-bold text-xl">Transaction Details</div>
      </div>
      <div className="h-[1px] w-full bg-gray-700 opacity-50 mb-3" />
      <div className="font-bold">overview</div>
      {transaction && (
        <>
          <div className="bg-zinc-900 flex flex-col gap-2 p-2 rounded-md my-4">
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Transaction Hash:</div>
              <div>{transaction.hash}</div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Status:</div>
              <div
                className={`text-xs px-2 py-0.5 text-${bgStatus}-600 bg-${bgStatus}-500 border border-${bgStatus}-400 bg-opacity-10 flex w-fit rounded-md font-medium`}
              >
                {transaction.status ? "Success" : "Failure"}
              </div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Block:</div>
              <div className="flex gap-2">
                <Link
                  to={`/block/${transaction.blockNumber}`}
                  className="text-blue-500"
                >
                  {" "}
                  {transaction.blockNumber}
                </Link>
                <div className="text-xs px-2 py-0.5 bg-zinc-500 border border-zinc-400 rounded-md font-medium">
                  Block Confirmation {transaction.confirmations}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Timestamp</div>
              <div> {timeDifference(transaction.timestamp)}</div>
            </div>
            <div className="h-[1px] w-full bg-zinc-500 bg-opacity-20" />
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">From:</div>
              <div>{transaction.from} </div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400"> To: </div>
              <div>{transaction.to}</div>
            </div>
            <div className="h-[1px] w-full bg-zinc-500 bg-opacity-20" />

            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400"> Value:</div>
              <div> {Utils.formatEther(transaction.value)} ETH</div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Transaction Fee:</div>
              <div>{transaction.txFees} ETH</div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400">Gas Price:</div>
              <div>{Utils.formatEther(transaction.gasPrice)} ETH</div>
            </div>
          </div>
          <div className="bg-zinc-900 flex flex-col gap-2 p-2 rounded-md">
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400"> Gas Limit & Usage by Txn: </div>
              <div>
                {transaction.gasLimit.toNumber().toLocaleString("en-US")} |{" "}
                {transaction.gasUsage.toNumber().toLocaleString("en-US")}
              </div>
            </div>
            <div className="grid grid-cols-[30%70%] p-1">
              <div className="text-zinc-400"> Gas Fees: </div>
              <div>
                <span className="font-bold"> Base:</span>{" "}
                {Utils.formatUnits(transaction.baseFeePerGas, "gwei")} Gwei |{" "}
                <span className="font-bold"> Max:</span>{" "}
                {Utils.formatUnits(transaction.maxFeePerGas, "gwei")}Gwei |{" "}
                <span className="font-bold"> Max Priority:</span>{" "}
                {Utils.formatUnits(transaction.maxPriorityFeePerGas, "gwei")}
                Gwei
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionDetail;
