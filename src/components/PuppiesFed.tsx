import React from "react";
import { useExternalDataContext } from "../context/externalDataContext";

export const PuppiesFed = () => {
  const data = useExternalDataContext();
  if (!data) return <span>error</span>;

  const { text, nextState, backgroundColor, color } =
    data.homeAssistant.puppiesFed.state === "on"
      ? {
          text: "Pups fed",
          backgroundColor: "white",
          color: "black",
          nextState: "off",
        }
      : {
          text: "Pups hungry!",
          backgroundColor: "black",
          color: "white",
          nextState: "on",
        };

  return (
    <form method="post" action="/event">
      <input hidden name="type" defaultValue="puppies_fed" />
      <input hidden name="state" defaultValue={nextState} />
      <button
        type="submit"
        style={{
          fontSize: 64,
          fontWeight: "bold",
          marginTop: 30,
          padding: 0,
          backgroundColor,
          color,
        }}
      >
        {text}
      </button>
    </form>
  );
};
