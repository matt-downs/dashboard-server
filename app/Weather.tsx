import React from "react";
import { useSSE } from "use-sse";
import axios from "axios";

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
  const [data] = useSSE<WeatherData>(getData);

  return (
    <div>
      <h1>
        {data?.temp.toFixed(1)}ºC {data?.humidity}%
      </h1>
      ==================================
    </div>
  );
};
