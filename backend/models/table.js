const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    restaurantID: { type: String, required: true, index: true },
    name: { type: String, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Table", TableSchema);
