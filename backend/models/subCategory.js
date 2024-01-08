const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const SubCategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    categoryID: { type: String, required: true },
    name: { type: String, required: true },
    serial: { type: Number, unique: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

SubCategorySchema.plugin(plugin, {
  model: "SubCategory",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
