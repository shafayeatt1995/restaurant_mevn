const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    restaurantID: { type: String, required: true },
    tableID: { type: String, required: true },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    netPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    note: { type: String, default: "" },
    orderType: { type: String, enum: ["Parcel", "Dine in"], required: true },
    status: {
      type: String,
      enum: ["pending", "running", "complete", "cancel"],
      default: "pending",
    },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Order", OrderSchema);
