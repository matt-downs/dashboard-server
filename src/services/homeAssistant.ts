import axios from "axios";

type HomeAssistantStateResponse<T> = {
  state: T;
  attributes: Record<string, string>;
};

const homeAssistantClient = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
  },
});

export async function getMessage(): Promise<
  HomeAssistantStateResponse<string>
> {
  const { data } = await homeAssistantClient.get(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_text.fridge_text`
  );

  return data;
}

export async function setMessage(state: string): Promise<void> {
  const currentState = await getMessage();

  await homeAssistantClient.post(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_text.fridge_text`,
    {
      ...currentState,
      state,
    }
  );
}

export async function getPuppiesFed(): Promise<
  HomeAssistantStateResponse<"on" | "off">
> {
  const { data } = await homeAssistantClient.get(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`
  );

  return data;
}

export async function setPuppiesFed(state: "on" | "off"): Promise<void> {
  const currentState = await getPuppiesFed();

  await homeAssistantClient.post(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`,
    {
      ...currentState,
      state,
    }
  );
}
