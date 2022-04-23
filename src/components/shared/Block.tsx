import React from "react";

export const Block = ({
  children,
  right,
}: {
  children: React.ReactChild[] | React.ReactChild;
  right?: React.ReactChild[] | React.ReactChild;
}) => {
  return (
    <div>
      <div style={{ float: "left" }}>{children}</div>
      {right && <div style={{ float: "right" }}>{right}</div>}
      <div style={{ clear: "both" }}></div>
    </div>
  );
};
