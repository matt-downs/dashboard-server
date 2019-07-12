const fastify = require("fastify")({ logger: true });
const config = require("./config.json");
// const timeModule = require("./modules/time");

const modules = [];

config.modules.forEach(m => {
  modules.push({ render: require(m.name).render });
});

function buildBody() {
  let body = "";
  modules.forEach(m => {
    body += m.render();
  });
  return body;
}

fastify.get("/", (req, reply) => {
  reply.type("text/html").send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <title>Kindle Dashboard</title>
      <style>
        body {
          font-size: 4rem;
          padding-left: 20px;
        }
        h1 {
          font-size: 3em;
        }
        .m-0 {
          margin: 0;
        }
      </style>
    </head>
    <body class="m-0">
      ${buildBody()}
      <script>
        setInterval(function() {
          document.location.reload();
        }, 500);
      </script>
    </body>
  </html>
  `);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
