import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-zinc-900 w-full flex justify-center">
      <div className="flex flex-col w-full">
        <div className="flex gap-5 text-xs px-5 py-1 items-center border-b  border-b-zinc-700 shadow-zinc-500 sticky top-0">
          <div>
            ETH Price: <span className="text-blue-500">$....... </span>
            <span className="text-green-600"> (+....%)</span>{" "}
          </div>
          <div>
            Gas:
            <span className="text-blue-500"> .. Gwei</span>
          </div>
          <div className="ml-auto">
            <button className="flex justify-center items-center w-9 h-9 rounded-md bg-zinc-700 shadow-sm transition-all hover:bg-zinc-500">
              {" "}
              <img
                className="w-[10px] h-auto"
                src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
                alt="ETH"
              />
            </button>
          </div>
        </div>
        <Link
          to="/"
          className="flex w-full border-b  border-b-zinc-700 shadow-zinc-500 items-center justify-start px-5 py-4"
        >
          <img
            src="https://etherscan.io/assets/svg/logos/logo-etherscan-light.svg?v=0.0.5"
            className="w-36 h-auto"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
