import React from "react";
import { Crypto } from "./Crypto";
import { RandomDog } from "./RandomDog";
import { Block } from "./shared/Block";
import { Time } from "./Time";
import { Weather } from "./Weather";

const baseStyles = {
  margin: 0,
};

export const App = () => {
  return (
    <html style={baseStyles}>
      <head>
        <meta charSet="utf-8" />
        {/* <meta httpEquiv="refresh" content="5" /> */}
      </head>
      <body style={baseStyles}>
        <div
          style={{
            width: 1072,
            height: 1230,
            overflow: "hidden",
            border: "5px solid black",
            boxSizing: "border-box",
            padding: 10,
          }}
        >
          <Time />
          <Block right={<Crypto />}>
            <Weather />
          </Block>
          <RandomDog />
        </div>
      </body>
    </html>
  );
};
