import React, { createContext, useState } from "react";

// Create two context:
// SettingContext: to query the context state
// SettingDispatchContext: to mutate the context state
const SettingContext = createContext(undefined);
const SettingDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
function SettingProvider({ children }) {
  const [states, setStates] = useState({
    alchemy: {},
    blockNumber: "",
    transactions: [],
    blocks: [],
  });

  return (
    <SettingContext.Provider value={states}>
      <SettingDispatchContext.Provider value={setStates}>
        {children}
      </SettingDispatchContext.Provider>
    </SettingContext.Provider>
  );
}

export { SettingProvider, SettingContext, SettingDispatchContext };
