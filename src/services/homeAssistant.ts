import axios from "axios";

type HomeAssistantStateResponse<T> = {
  state: T;
  attributes: Record<string, string>;
};

export async function getMessage(): Promise<
  HomeAssistantStateResponse<string>
> {
  const { data } = await axios.get(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_text.fridge_text`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
      },
    }
  );

  return data;
}

export async function setMessage(state: string): Promise<void> {
  const currentState = await getMessage();

  await axios.post(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_text.fridge_text`,
    {
      ...currentState,
      state,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
      },
    }
  );
}

export async function getPuppiesFed(): Promise<
  HomeAssistantStateResponse<"on" | "off">
> {
  const { data } = await axios.get(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
      },
    }
  );

  return data;
}

export async function setPuppiesFed(state: "on" | "off"): Promise<void> {
  const currentState = await getPuppiesFed();

  await axios.post(
    `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`,
    {
      ...currentState,
      state,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
      },
    }
  );
}
