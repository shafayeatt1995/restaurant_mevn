const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const TableSchema = new Schema(
  {
    restaurantID: { type: String, required: true, index: true },
    name: { type: String, required: true },
    serial: { type: Number, index: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

TableSchema.plugin(plugin, {
  model: "Table",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("Table", TableSchema);
