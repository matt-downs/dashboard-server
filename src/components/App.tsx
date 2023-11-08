import React from "react";
import { PuppiesFed } from "./PuppiesFed";
import { RandomDog } from "./RandomDog";
import { Block } from "./shared/Block";
import { Time } from "./Time";
import { Weather } from "./Weather";
import { Message } from "./Message";

export const App = () => {
  return (
    <div
      style={{
        // // This is the viewport of the Kindle Paperwhite
        // width: 1072,
        // height: 1230,
        // This is the viewport of the iPad mini 2
        width: 768,
        height: 1004,
        // Prevent scrolling
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <Block
        right={
          <>
            <PuppiesFed />
            <Message />
          </>
        }
      >
        <Time />
        <Weather />
      </Block>
      <RandomDog />
    </div>
  );
};
