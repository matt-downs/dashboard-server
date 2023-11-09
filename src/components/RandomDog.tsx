import React from "react";
import { useExternalDataContext } from "../context/externalDataContext";

export const RandomDog = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return <img src={data.dog} style={{ maxWidth: "100%" }} />;
};
