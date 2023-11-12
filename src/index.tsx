import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "./components/App";
import Fastify from "fastify";
import dashboardHtml from "./dashboard.html";
import indexHtml from "./index.html";
import {
  buildExternalDataContext,
  getExternalData,
  getHomeAssistantData,
} from "./context/externalDataContext";
import { JSDOM } from "jsdom";
import { fastifyFormbody } from "@fastify/formbody";
import QRCode from "qrcode";
import {
  getMessage,
  setMessage,
  setPuppiesFed,
} from "./services/homeAssistant";

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

fastify.get("/dashboard", async function (req, reply) {
  const dom = new JSDOM(dashboardHtml);
  dom.window.document
    .getElementById("innerBody")
    ?.setAttribute("innerHTML", await getBody());

  reply.type("text/html").send(dom.serialize());
});

fastify.get("/getBody", async function (req, reply) {
  const body = await getBody();

  reply.send({ body });
});

fastify.get("/qr.png", async function (req, reply) {
  const buffer = await QRCode.toBuffer(process.env.SERVER_ADDRESS ?? "");
  reply.type("image/png").send(buffer);
});

fastify.get("/", async function (req, reply) {
  const dom = new JSDOM(indexHtml);
  const input = dom.window.document.getElementById("messageInput");
  if (input) input.innerHTML = (await getMessage()).state;

  reply.type("text/html").send(dom.serialize());
});

fastify.post("/event", async function (req, reply) {
  if ((req.body as any)["type"] === "puppies_fed") {
    await setPuppiesFed((req.body as any).state);
    getHomeAssistantData.clear();
    return reply.redirect("/dashboard");
  }

  if ((req.body as any)["type"] === "message") {
    await setMessage((req.body as any).state);
    getHomeAssistantData.clear();
    return reply.redirect("/");
  }
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
