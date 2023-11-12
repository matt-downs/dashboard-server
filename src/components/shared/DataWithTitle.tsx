import React from "react";

export const DataWithTitle = ({
  children,
  title,
}: {
  children: React.ReactChild[] | React.ReactChild;
  title: string;
}) => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 16 }}>{title}</h2>
      <h1 style={{ margin: 0, fontSize: 64 }}>{children}</h1>
    </div>
  );
};
