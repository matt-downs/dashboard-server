import React from "react";
import { Crypto } from "./Crypto";
import { Time } from "./Time";
import { Weather } from "./Weather";

export const App = () => {
  return (
    <>
      <Time />
      <Weather />
      <Crypto />
    </>
  );
};
