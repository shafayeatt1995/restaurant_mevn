const { loadNuxt, build } = require("nuxt");
require("dotenv").config();
const express = require("express");
const app = express();
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const cors = require("cors");
require("module-alias/register");
const { createSocketServer } = require("./createSocketServer");

app.use(cors());

async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);

  // Build only in dev mode with hot-reloading
  if (isDev) {
    await build(nuxt);
  }

  const server = createSocketServer(app);
  server.listen(port, () => {
    console.log("server is live");
  });
}

start();
