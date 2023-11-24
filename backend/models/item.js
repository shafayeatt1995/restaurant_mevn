const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Boolean, default: true },
});

const ItemSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    categoryID: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
    image: { type: String, required: true },
    ingredient: { type: [String], default: [] },
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    discountAmount: { type: Number, default: 0 },
    description: { type: Text, required: true },
    estimateTime: { type: String, required: true },
    variant: [VariantSchema],
    rating: { type: Number, min: 0, max: 5, default: 0, select: false },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    bestSale: { type: Boolean, default: false },
    sorted: { type: Number, required: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Item", ItemSchema);
