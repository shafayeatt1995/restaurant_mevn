const mongoose = require("mongoose");
const { plugin } = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Boolean, default: true },
});

const ChoicesSchema = new Schema({
  title: { type: String, required: true },
  options: [OptionSchema],
});

const AddonsSchema = new Schema({
  title: { type: String, required: true },
  options: [OptionSchema],
});

const ItemSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    categoryID: { type: String, required: true },
    subCategoryID: { type: String, required: false },
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    choices: [ChoicesSchema],
    addons: [AddonsSchema],
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    discountAmount: { type: Number, default: 0 },
    stock: { type: Boolean, default: true },
    description: { type: String, required: false },
    estimateTime: { type: Number, required: false },
    serial: { type: Number, unique: true },
    status: { type: Boolean, default: true },
    // featured: { type: Boolean, default: false },
    // trending: { type: Boolean, default: false },
    // bestSale: { type: Boolean, default: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ItemSchema.plugin(plugin, {
  model: "Item",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("Item", ItemSchema);
