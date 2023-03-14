import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "./components/App";
import Fastify from "fastify";
import indexHtml from "./index.html";
import {
  buildExternalDataContext,
  getExternalData,
  getHomeAssistantData,
} from "./context/externalDataContext";
import { JSDOM } from "jsdom";
import { fastifyFormbody } from "@fastify/formbody";
import axios from "axios";

async function getBody() {
  const ExternalDataContextProvider = await buildExternalDataContext();
  return ReactDOMServer.renderToStaticMarkup(
    <ExternalDataContextProvider>
      <App />
    </ExternalDataContextProvider>
  );
}

const fastify = Fastify({
  logger: true,
});
fastify.register(fastifyFormbody);

fastify.get("/", async function (req, reply) {
  const dom = new JSDOM(indexHtml);
  dom.window.document.getElementById("innerBody")!.innerHTML = await getBody();

  reply.type("text/html").send(dom.serialize());
});

fastify.get("/getBody", async function (req, reply) {
  const body = await getBody();

  reply.send({ body });
});

fastify.post("/event", async function (req, reply) {
  if ((req.body as any)["type"] === "puppies_fed") {
    const { homeAssistant } = await getExternalData();
    await axios.post(
      `http://${process.env.HOME_ASSISTANT_HOST}/api/states/input_boolean.puppies_fed`,
      {
        ...homeAssistant,
        state: (req.body as any).state,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HOME_ASSISTANT_KEY}`,
        },
      }
    );
    getHomeAssistantData.clear();
  }

  reply.redirect("/");
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
