const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const ChoiceSchema = new Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false },
});
const AddonSchema = new Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false },
});
const orderItemSchema = new Schema({
  name: { type: String, required: true },
  choice: { type: ChoiceSchema, required: false },
  addon: [AddonSchema],
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    userID: { type: String },
    waiterID: { type: String },
    restaurantID: { type: String, required: true },
    tableID: { type: String, required: true },
    tableName: { type: String, required: true },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    netPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    note: { type: String, default: "" },
    orderType: { type: String, enum: ["Parcel", "Dine in"], required: true },
    status: {
      type: String,
      enum: ["pending", "active", "complete", "cancel"],
      default: "pending",
    },
    orderNumber: { type: Number, unique: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

OrderSchema.plugin(plugin, {
  model: "Order",
  field: "orderNumber",
  startAt: 1,
});

module.exports = mongoose.model("Order", OrderSchema);
