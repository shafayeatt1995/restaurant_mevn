const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const time = Date.now();
const mongoUrl = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

mongoose
  .connect(mongoUrl, { autoIndex: false })
  .then(() => console.log("Connecting to mongo"))
  .catch((err) => console.error("Error connecting to mongo", err))
  .finally(() =>
    console.log(
      "Mongo connected. Time to connect",
      (Date.now() - time) / 1000 + "sec"
    )
  );
const connection = mongoose.connection;
connection.on("error", (error) => console.error(error));
mongoose.Promise = global.Promise;

if (process.env.MONGO_LOGS === "1") {
  mongoose.set("debug", true);
}
