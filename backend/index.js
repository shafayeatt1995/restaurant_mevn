const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
require("module-alias/register");
require("./config/database");

function verifyRequest(req, res, buf, encoding) {
  req.rawBody = buf.toString(encoding);
}

app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true, verify: verifyRequest }));
app.use(compression());
app.use(express.json({ limit: "32mb", verify: verifyRequest }));

// app.use("/webhooks", require("./webhooks"));
app.use("/", require("@/backend/routes"));

module.exports = app;
