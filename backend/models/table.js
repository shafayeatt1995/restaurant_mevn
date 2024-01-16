const mongoose = require("mongoose");
const { randomKey } = require("@/backend/utils");
const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    restaurantID: { type: String, required: true, index: true },
    name: { type: String, required: true },
    serial: { type: String, index: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

TableSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew) {
    return next();
  }

  try {
    const lastTable = await doc.constructor
      .findOne({}, {}, { sort: { _id: -1 } })
      .limit(1);

    if (lastTable) {
      doc.serial =
        "table-" +
        (+lastTable.serial.split("-")[1] + 1) +
        "-" +
        randomKey(2, true);
    } else {
      doc.serial = "table-" + 1 + "-" + randomKey(2, true);
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = mongoose.model("Table", TableSchema);
