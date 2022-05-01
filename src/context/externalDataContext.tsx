import axios from "axios";
import React from "react";
import memoize from "memoizee";
import { effectRegenerator, FIFTEEN_MINUTES, ONE_DAY } from "../helpers";

const getCrypto = memoize(
  async (_cacheKey: number): Promise<number> => {
    console.log("Fetching crypto data...");

    const { data } = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LTC&convert=AUD",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRYPTO_KEY ?? "",
        },
      }
    );

    return data.data["LTC"].quote.AUD.price;
  },
  { primitive: true, promise: true }
);

const getDog = memoize(
  async (_cacheKey: number): Promise<string> => {
    console.log("Fetching dog data...");

    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return data.message;
  },
  { primitive: true, promise: true }
);

type WeatherData = {
  temp: number;
  humidity: number;
};

const getWeather = memoize(
  async (_cacheKey: number): Promise<WeatherData> => {
    console.log("Fetching weather data...");

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Brisbane,au&appid=${process.env.WEATHER_KEY}&units=metric`
      );

      return {
        temp: data.main.temp,
        humidity: data.main.humidity,
      };
    } catch (error) {
      return {
        temp: 0,
        humidity: 0,
      };
    }
  },
  { primitive: true, promise: true }
);

type ExternalDataContext = {
  crypto: number;
  dog: string;
  weather: WeatherData;
};

const context = React.createContext<ExternalDataContext | null>(null);

export const useExternalDataContext = () => React.useContext(context);

export async function buildExternalDataContext() {
  const [crypto, dog, weather] = await Promise.all([
    getCrypto(effectRegenerator(FIFTEEN_MINUTES)),
    getDog(effectRegenerator(ONE_DAY)),
    getWeather(effectRegenerator(FIFTEEN_MINUTES)),
  ]);

  return ({ children }: { children: React.ReactChild }) => (
    <context.Provider value={{ crypto, dog, weather }}>
      {children}
    </context.Provider>
  );
}
