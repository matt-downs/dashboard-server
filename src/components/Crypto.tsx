import React from "react";
import { DataWithTitle } from "./shared/DataWithTitle";
import { useExternalDataContext } from "../context/externalDataContext";

export const Crypto = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="LTC AUD">${data.crypto.toFixed(2)}</DataWithTitle>
  );
};
