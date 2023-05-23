import React, { useReducer } from "react";

const initialValue = 0;
const reducer = (state, action) => {
  switch (action) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    case "reset":
      return initialValue;
    default:
      return state;
  }
};

export const CounterOne = () => {
  const [count, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <div>Count - {count}</div>
      <button onClick={() => dispatch("inc")}>Inc</button>
      <button onClick={() => dispatch("dec")}>Dec</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
};
