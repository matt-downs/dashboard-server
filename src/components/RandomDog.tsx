import React from "react";
import { useExternalDataContext } from "../context/externalDataContext";
import { DataWithTitle } from "./shared/DataWithTitle";

export const RandomDog = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="Dog of the day">
      <img src={data.dog} style={{ maxWidth: "100%" }} />
    </DataWithTitle>
  );
};
