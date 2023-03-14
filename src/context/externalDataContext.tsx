import axios from "axios";
import React from "react";
import memoize from "memoizee";
import {
  effectRegenerator,
  FIFTEEN_MINUTES,
  ONE_DAY,
  FIVE_SECONDS,
} from "../helpers";

type HomeAssistantData = {
  state: "on" | "off";
  attributes: Record<string, string>;
};

export const getHomeAssistantData = memoize(
  async (_cacheKey: number): Promise<HomeAssistantData> => {
    console.log("Fetching Home Assistant data...");

    const { data } = await axios.get(
      `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
        },
      }
    );

    return {
      state: data.state,
      attributes: data.attributes,
    };
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
  homeAssistant: HomeAssistantData;
  dog: string;
  weather: WeatherData;
};

const context = React.createContext<ExternalDataContext | null>(null);

export const useExternalDataContext = () => React.useContext(context);

export const getExternalData = async () => {
  const [homeAssistant, dog, weather] = await Promise.all([
    getHomeAssistantData(effectRegenerator(FIVE_SECONDS)),
    getDog(effectRegenerator(ONE_DAY)),
    getWeather(effectRegenerator(FIFTEEN_MINUTES)),
  ]);
  return { homeAssistant, dog, weather };
};
export async function buildExternalDataContext() {
  const externalData = await getExternalData();

  return ({ children }: { children: React.ReactChild }) => (
    <context.Provider value={externalData}>{children}</context.Provider>
  );
}
