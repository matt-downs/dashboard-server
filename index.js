const fastify = require("fastify")({ logger: true });
const { getWeather } = require("./modules/weather");
const { getLtc } = require("./modules/crypto");
const { getTime } = require("./modules/time");

fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs")
  }
});

fastify.get("/", (req, reply) => {
  reply.view("/templates/index.ejs", {
    time: getTime(),
    weather: getWeather(),
    ltc: getLtc()
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
