import React, { useContext } from "react";
import {
  SettingContext,
  SettingDispatchContext,
} from "../context/setting.context";
const Nav = () => {
  const { alchemy } = useContext(SettingContext);
  const dispatch = useContext(SettingDispatchContext);
  return (
    <div className="flex flex-col bg-slate-900">
      <div className="flex gap-5 text-xs px-5 py-1 items-center border-b  border-b-slate-700 shadow-slate-500 sticky top-0">
        <div>
          ETH Price: <span className="text-blue-500">$1,753.15 </span>
          <span className="text-green-600"> (+0.67%)</span>{" "}
        </div>
        <div>
          Gas:
          <span className="text-blue-500"> 25 Gwei</span>
        </div>
        <div className="ml-auto">
          <button className="flex justify-center items-center w-9 h-9 rounded-md bg-slate-700 shadow-sm transition-all hover:bg-slate-500">
            {" "}
            <img
              className="w-[10px] h-auto"
              src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
              alt="ETH"
            />
          </button>
        </div>
      </div>
      <div className="flex w-full border-b  border-b-slate-700 shadow-slate-500 items-center justify-start px-5 py-4">
        <img
          src="https://etherscan.io/assets/svg/logos/logo-etherscan-light.svg?v=0.0.5"
          className="w-36 h-auto"
          alt=""
        />
      </div>
    </div>
  );
};

export default Nav;
