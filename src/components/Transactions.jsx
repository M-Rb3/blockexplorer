import React, { useContext } from "react";
const Transactions = () => {
  return (
    <div className="bg-slate-900 rounded-md">
      <div className="font-bold p-4 border-b border-b-slate-800">
        Latest Transactions
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-5 p-4 text-sm cursor-pointer border-b border-b-slate-800">
          <div className="h-12 w-12 flex items-center justify-center bg-slate-800 rounded-md">
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
            <div className="text-blue-500">17457845</div>
            <div>16 secs ago</div>
          </div>
          <div className="flex flex-col text-center">
            <div>
              From <span className="text-blue-500"> 0xF28d6B...926ef5FC</span>
            </div>
            <div>
              To <span className="text-blue-500">0xd0764F...56D5636c</span>
            </div>
          </div>
          <div className="p-2 font-bold bg-slate-950 border border-slate-800 text-xs rounded-md ml-auto">
            0.04007 Eth
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
