import React, { useEffect, useState } from "react";

const UseEffectHook_2 = () => {
  const [count, setCount] = useState(0);

  const tick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  //👆 Here The cleanup function is important because it prevents the interval from continuing to run even after the component is no longer being displayed. If the cleanup function is not called, the interval would continue to run in the background, wasting system resources and potentially causing memory leaks.

  return <div>{count}</div>;
};

export default UseEffectHook_2;
