import React from "react";
import { DataWithTitle } from "./shared/DataWithTitle";
import { useExternalDataContext } from "../context/externalDataContext";

export const PuppiesFed = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  return (
    <DataWithTitle title="Puppies fed">
      {data.homeAssistant.state}
      <form method="post" action="/event">
        <input hidden name="type" defaultValue="puppies_fed" />
        <input
          hidden
          name="state"
          defaultValue={data.homeAssistant.state === "on" ? "off" : "on"}
        />
        <button type="submit">submit</button>
      </form>
    </DataWithTitle>
  );
};
