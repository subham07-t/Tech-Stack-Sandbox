// useCallback is a hook that will return a memorized version of the callback function that only changes if one of the dependencies has changed.in short useCallback is a React Hook that lets you cache a function definition between re-renders.

// on the other hand useMemo is used to memoize the result of an expensive computation or function call. When a component is re-rendered, useMemo will only recompute the result if the inputs to the function have changed. Otherwise, it will return the cached result from the previous render.

import React, { useState, useCallback } from "react";
import Tittle from "./Tittle";
import Count from "./Count";
import Button from "./Button";

const ParentComponent = () => {
  const [age, setAge] = useState(10);
  const [salary, setSalary] = useState(10000);

  const incrementAge = useCallback(() => {
    setAge(age + 1);
  }, [age]);
  const incrementSalary = useCallback(() => {
    setSalary(salary + 1500);
  }, [salary]);
  return (
    <div>
      <Tittle />
      <Count text="Age" count={age} />
      <Button handleClick={incrementAge}>Increment Age</Button>
      <Count text="Salary" count={salary} />
      <Button handleClick={incrementSalary}>Increment Salary</Button>
      ParentComponent
    </div>
  );
};

export default ParentComponent;
