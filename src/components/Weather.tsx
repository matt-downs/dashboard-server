import React from "react";
import { DataWithTitle } from "./shared/DataWithTitle";
import { useExternalDataContext } from "../context/externalDataContext";

export const Weather = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="Brisbane">
      {data.weather.temp.toFixed(1)}&deg;C {data.weather.humidity}%
    </DataWithTitle>
  );
};
