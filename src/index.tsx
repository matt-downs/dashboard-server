import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "./components/App";
import Fastify from "fastify";
import { createServerContext } from "use-sse";
import indexHtml from "./index.html";

const fastify = Fastify({
  logger: true,
});

const { ServerDataContext, resolveData } = createServerContext();

fastify.get("/", function (req, reply) {
  reply.type("text/html").send(indexHtml);
});

fastify.get("/render", async function (req, reply) {
  // We need to render app twice.
  // First - render App to register all effects
  ReactDOMServer.renderToStaticMarkup(
    <ServerDataContext>
      <App />
    </ServerDataContext>
  );

  // Wait for all effects to finish
  await resolveData();

  // Render App for the second time
  // This time data form effects will be available in components
  const body = ReactDOMServer.renderToStaticMarkup(
    <ServerDataContext>
      <App />
    </ServerDataContext>
  );

  reply.send({ body });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
