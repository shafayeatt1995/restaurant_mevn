const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockUserSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("BlockUser", BlockUserSchema);
