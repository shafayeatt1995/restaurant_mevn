const { randomKey, addDate, stringSlug } = require("@/backend/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { plugin } = require("mongoose-auto-increment");

const RestaurantSchema = new Schema(
  {
    userID: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    serial: { type: Number, unique: true },
    logo: { type: String, default: "/images/logo/1.png" },
    waiter: { type: [String], default: [] },
    chef: { type: [String], default: [] },
    suspended: { type: Boolean, default: false, select: false },
    deleted: { type: Boolean, default: false, select: false },
    scanExp: { type: Date, default: addDate(20 * 365) },
    printName: { type: String, default: "" },
    printAddress: { type: String, default: "" },
    printPhone: { type: String, default: "" },
    printImage: { type: String, default: "" },
    printEmail: { type: String, default: "" },
    authOrder: { type: Boolean, default: false },
    orderToken: { type: Number, default: 10 },
    tokenPerOrder: { type: Number, default: 2, select: false },
    otp: { type: String, select: false },
    currency: { type: String, default: "$" },
    topPrintData: { type: [Object], default: [] },
    bottomPrintData: { type: [Object], default: [] },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

RestaurantSchema.plugin(plugin, {
  model: "Restaurant",
  field: "serial",
  startAt: 1,
});

RestaurantSchema.pre("save", function (next) {
  const restaurant = this;
  if (!restaurant.isModified("name")) return next();
  restaurant.slug = `${stringSlug(restaurant.name)}_${restaurant.serial}`;
  next();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
