import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "./components/App";
import Fastify from "fastify";
import indexHtml from "./index.html";
import { buildExternalDataContext } from "./context/externalDataContext";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", function (req, reply) {
  reply.type("text/html").send(indexHtml);
});

fastify.get("/render", async function (req, reply) {
  const ExternalDataContextProvider = await buildExternalDataContext();

  const body = ReactDOMServer.renderToStaticMarkup(
    <ExternalDataContextProvider>
      <App />
    </ExternalDataContextProvider>
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
