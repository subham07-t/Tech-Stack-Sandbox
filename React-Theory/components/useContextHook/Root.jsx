import React, { createContext } from "react";
import ComponentA from "./ComponentA";

export const PracContext = createContext();
const Root = () => {
  return (
    <PracContext.Provider value={"Subham"}>
      <ComponentA />;
    </PracContext.Provider>
  );
};

export default Root;
