import React, { useContext, useState } from "react";
import { SettingContext } from "../context/AppStateContext";
import Block from "./Block";

const Blocks = () => {
  const { blocks } = useContext(SettingContext);

  return (
    <div className="bg-zinc-900 rounded-md">
      <div className="font-bold p-4 border-b border-b-zinc-800">
        Latest Blocks
      </div>
      <div className="flex flex-col">
        {blocks?.map((block) => (
          <Block block={block} key={block.number} />
        ))}
      </div>
    </div>
  );
};

export default Blocks;
