const fastify = require("fastify")({ logger: true });
const config = require("./config.json");
const crypto = require("crypto");
const fs = require("fs");

function buildBody() {
  let body = "";
  config.modules.forEach(m => {
    body += require(m.name).render();
  });
  return body;
}

fastify.get("/", function(req, reply) {
  const stream = fs.createReadStream("./index.html", "utf8");
  reply.type("text/html").send(stream);
});

fastify.get("/body", (req, reply) => {
  const body = buildBody();
  const hash = crypto
    .createHash("sha1")
    .update(body)
    .digest("base64");

  reply.send({
    body,
    hash,
    refreshInterval: config.refreshInterval
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(config.port, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
