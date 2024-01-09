const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const session = require("cookie-session");
const cors = require("cors");
require("module-alias/register");

app.use(cors());

app.use(
  session({
    // secret: process.env.SESSION_SECRET,
    // resave: false,
    // saveUninitialized: true,
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

require("@/backend/config/database");

function verifyRequest(req, res, buf, encoding) {
  req.rawBody = buf.toString(encoding);
}
app.use(cookieParser());
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true, verify: verifyRequest }));
app.use(compression());
app.use(express.json({ limit: "32mb", verify: verifyRequest }));

app.use("/", require("@/backend/routes"));
// app.use("/webhooks", require("./webhooks"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

module.exports = app;
