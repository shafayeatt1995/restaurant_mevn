const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VatSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    percent: { type: Number, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Vat", VatSchema);
