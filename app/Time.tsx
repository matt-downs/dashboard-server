import React from "react";

const getTime = () => {
  const today = new Date();
  let h = today.getHours();
  h = h % 12 || 12;
  let m: string | number = today.getMinutes();
  m = m < 10 ? `0${m}` : m;

  return `${h}:${m}`;
};

export const Time = () => {
  return (
    <div>
      <h1 style={{ fontSize: 64 }}>{getTime()}</h1>
    </div>
  );
};
