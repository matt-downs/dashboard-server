import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";

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
  const [data] = useSSE<number>(getData);

  return (
    <div>
      <h1>LTC AUD ${data?.toFixed(2)}</h1>
      ==================================
    </div>
  );
};
