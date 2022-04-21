import React from "react";
import { Crypto } from "./Crypto";
import { Time } from "./Time";
import { Weather } from "./Weather";

export const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content="5" />
      </head>
      <body style={{ margin: 0 }}>
        <div
          style={{
            width: 1100,
            height: 1315,
            boxSizing: "border-box",
            border: "10px solid black",
          }}
        >
          <Time />
          <hr />
          <Weather />
          <hr />
          <Crypto />
        </div>
      </body>
    </html>
  );
};
