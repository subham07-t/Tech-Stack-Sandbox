import React, { useReducer } from "react";

const initialValue = {
  firstCounter: 0,
  secondCounter: 10,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "inc":
      return { ...state, firstCounter: state.firstCounter + action.value };
    case "dec":
      return { ...state, firstCounter: state.firstCounter - action.value };
    case "inc2":
      return { ...state, secondCounter: state.secondCounter + action.value };
    case "dec2":
      return { ...state, secondCounter: state.secondCounter - action.value };
    case "reset":
      return initialValue;
    default:
      return state;
  }
};

export const CounterTwo = () => {
  const [count, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <div>First Count - {count.firstCounter}</div>
      <div>Second Count - {count.secondCounter}</div>
      <button onClick={() => dispatch({ type: "inc", value: 1 })}>Inc</button>
      <button onClick={() => dispatch({ type: "dec", value: 1 })}>Dec</button>
      <button onClick={() => dispatch({ type: "inc", value: 5 })}>
        Inc by 5
      </button>
      <button onClick={() => dispatch({ type: "inc2", value: 1 })}>Inc2</button>
      <button onClick={() => dispatch({ type: "dec2", value: 1 })}>Dec2</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};
