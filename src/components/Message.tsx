import React from "react";
import { DataWithTitle } from "./shared/DataWithTitle";
import { useExternalDataContext } from "../context/externalDataContext";

export const Message = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="Message">
      {data.homeAssistant.fridgeText.state}
    </DataWithTitle>
  );
};
