import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";
import { DataWithTitle } from "./shared/DataWithTitle";
import { effectRegenerator, ONE_DAY } from "../helpers";

const getDog = async (): Promise<string> => {
  const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
  return data.message;
};

export const RandomDog = () => {
  const [data] = useSSE<string>(getDog, [effectRegenerator(ONE_DAY)]);

  return (
    <DataWithTitle title="Dog of the day">
      <img src={data} style={{ maxWidth: "100%" }} />
    </DataWithTitle>
  );
};
