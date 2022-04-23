import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";
import { DataWithTitle } from "./shared/DataWithTitle";
import { effectRegenerator, FIFTEEN_MINUTES } from "../helpers";

const getData = async (): Promise<number> => {
  const { data } = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LTC&convert=AUD",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_KEY ?? "",
      },
    }
  );

  return data.data["LTC"].quote.AUD.price;
};

export const Crypto = () => {
  const [data] = useSSE<number>(getData, [effectRegenerator(FIFTEEN_MINUTES)]);

  return <DataWithTitle title="LTC AUD">${data?.toFixed(2)}</DataWithTitle>;
};
