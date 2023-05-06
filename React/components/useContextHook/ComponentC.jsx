import React, { useContext } from "react";
import { PracContext } from "./Root";
const ComponentC = () => {
  const user = useContext(PracContext);
  return <div>The value Came from my Parent : {user}</div>;
};

export default ComponentC;
