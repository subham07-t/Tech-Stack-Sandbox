// useEffects runs after every render of a component.

import React, { useEffect, useState } from "react";

const UseEffectHook_1 = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);

  // useEffect(() => {
  //   // effect code goes here
  //   return () => {
  //     // cleanup code goes here (optional)
  //   };
  // }, [dependency]);

  // 👆
  // The first parameter is the function that contains the code to be executed as the effect.
  // The second parameter is an optional cleanup function that can be used to clean up any side-effects created by the effect.
  // The third parameter is an array of dependencies that the effect depends on. If any of these dependencies change, the effect will be re-executed. If the array is empty, the effect will only run once, when the component mounts.

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, []); //use [] to called only once useEffect

  // useEffect(() => {
  //     setValue((prev) => prev * 5);
  // }, [count]);

  // 👆 why does the second useEffect set the value to 5 even though the setCount function has not been triggered yet?

  // --> When the component first mounts, the count state is set to 0, so the setValue function will be called with the initial value of 1, and the value state will be set to 5

  useEffect(() => {
    if (count !== 0) {
      setValue((prev) => prev * 5);
    }
  }, [count]);

  return (
    <div>
      <p>Value will updated by multiple of 5 based on a count</p>
      <h2>{value}</h2>
      <button onClick={() => setCount(count + 1)}>Click {count} times</button>
    </div>
  );
};

export default UseEffectHook_1;
