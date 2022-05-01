import React from "react";
import { DataWithTitle } from "./shared/DataWithTitle";
import { useExternalDataContext } from "../context/externalDataContext";

export const RandomDog = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="Dog of the day">
      <img src={data.dog} style={{ maxWidth: "100%" }} />
    </DataWithTitle>
  );
};
