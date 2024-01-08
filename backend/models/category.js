const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const CategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    serial: { type: Number, unique: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

CategorySchema.plugin(plugin, {
  model: "Category",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("Category", CategorySchema);
