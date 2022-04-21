import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";
import { DataWithTitle } from "./shared/DataWithTitle";

let cache: null | { expiry: number; url: string } = null;

const getDog = async (): Promise<string> => {
  if (!cache || cache.expiry < Date.now()) {
    // Cache miss
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    cache = {
      url: data.message,
      expiry: Date.now() + 60 * 1000,
    };
  }

  return cache.url;
};

export const RandomDog = () => {
  const [data] = useSSE<string>(getDog);

  return (
    <DataWithTitle title="Dog of the day">
      <img src={data} style={{ maxWidth: "100%" }} />
    </DataWithTitle>
  );
};
