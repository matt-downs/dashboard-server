import React from "react";
import { Crypto } from "./Crypto";
import { Time } from "./Time";
import { Weather } from "./Weather";

export const App = () => {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="5" />
      </head>
      <body>
        <Time />
        <Weather />
        <Crypto />
      </body>
    </html>
  );
};
