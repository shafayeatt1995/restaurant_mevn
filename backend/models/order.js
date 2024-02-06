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
const additionalChargesSchema = new Schema({
  name: { type: String, required: false },
  charge: { type: Number, required: false },
});
const orderItemSchema = new Schema({
  AdditionalOrderNumber: { type: Number, default: 1 },
  name: { type: String, required: true },
  choice: [ChoiceSchema],
  addon: [AddonSchema],
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    waiterID: { type: String },
    waiterName: { type: String },
    restaurantID: { type: String, required: true },
    tableID: { type: String, required: true },
    tableName: { type: String, required: true },
    orderItems: [orderItemSchema],
    subTotalPrice: { type: Number, required: true },
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
    vatName: { type: String },
    vat: { type: Number },
    vatAmount: { type: Number },
    additionalCharges: [additionalChargesSchema],
    additionalChargesAmount: { type: Number },
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
