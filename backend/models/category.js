const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
    image: { type: String, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Category", CategorySchema);
