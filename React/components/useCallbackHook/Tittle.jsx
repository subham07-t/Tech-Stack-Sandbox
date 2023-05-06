import React, { memo } from "react";

const Tittle = () => {
  console.log("Rendering title");
  return <div>useCallback Hook</div>;
};

export default memo(Tittle);
