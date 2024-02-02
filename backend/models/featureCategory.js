const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const FeatureCategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    items: { type: Array, required: true, default: [] },
    serial: { type: Number, unique: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

FeatureCategorySchema.plugin(plugin, {
  model: "FeatureCategory",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("FeatureCategory", FeatureCategorySchema);
