import React, { memo } from "react";

const Count = ({ text, count }) => {
  console.log(`Rendering ${text}`);
  return (
    <div>
      {text} - {count}
    </div>
  );
};

export default memo(Count);
