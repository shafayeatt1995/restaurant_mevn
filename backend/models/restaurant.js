const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    userID: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, default: "/images/logo/1.png" },
    waiter: { type: [String], default: [] },
    chef: { type: [String], default: [] },
    suspended: { type: Boolean, default: false, select: false },
    deleted: { type: Boolean, default: false, select: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
