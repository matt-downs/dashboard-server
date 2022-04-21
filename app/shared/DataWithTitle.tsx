import React from "react";

export const DataWithTitle = ({
  children,
  title,
}: {
  children: React.ReactChild[] | React.ReactChild;
  title: string;
}) => {
  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>{title}</h2>
      <h1 style={{ marginTop: 0, fontSize: 64 }}>{children}</h1>
    </div>
  );
};
