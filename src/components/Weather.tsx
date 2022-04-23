import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";
import { DataWithTitle } from "./shared/DataWithTitle";
import { effectRegenerator, FIFTEEN_MINUTES } from "../helpers";

type WeatherData = {
  temp: number;
  humidity: number;
};
const getData = async () => {
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
};

export const Weather = () => {
  const [data] = useSSE<WeatherData>(getData, [
    effectRegenerator(FIFTEEN_MINUTES),
  ]);

  return (
    <DataWithTitle title="Brisbane">
      {data?.temp.toFixed(1)}&deg;C {data?.humidity}%
    </DataWithTitle>
  );
};
