const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    userID: { type: String, required: true },
    url: { type: String, unique: true, index: true, required: true },
    size: { type: Number, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Image", ImageSchema);
