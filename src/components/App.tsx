import React from "react";
import { PuppiesFed } from "./PuppiesFed";
import { RandomDog } from "./RandomDog";
import { Block } from "./shared/Block";
import { Time } from "./Time";
import { Weather } from "./Weather";

export const App = () => {
  return (
    <div
      style={{
        // This is the viewport of the Kindle Paperwhite
        width: 1072,
        height: 1230,
        overflow: "hidden",
        border: "5px solid black",
        boxSizing: "border-box",
        padding: 10,
      }}
    >
      <Block right={<PuppiesFed />}>
        <Time />
        <Weather />
      </Block>
      <RandomDog />
    </div>
  );
};
