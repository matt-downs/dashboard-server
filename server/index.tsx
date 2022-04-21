import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "../app/App";
import Fastify from "fastify";
import { createServerContext } from "use-sse";

const fastify = Fastify({
  logger: true,
});

const { ServerDataContext, resolveData } = createServerContext();

fastify.get("/", async function (req, reply) {
  // We need to render app twice.
  // First - render App to register all effects
  ReactDOMServer.renderToStaticMarkup(
    <ServerDataContext>
      <App />
    </ServerDataContext>
  );

  // Wait for all effects to finish
  const data = await resolveData();

  // Render App for the second time
  // This time data form effects will be avaliable in components
  const htmlStream = ReactDOMServer.renderToStaticNodeStream(
    <ServerDataContext>
      <App />
    </ServerDataContext>
  );

  reply.type("text/html").send(htmlStream);
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
