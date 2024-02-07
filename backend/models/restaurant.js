const { randomKey } = require("@/backend/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    userID: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    logo: { type: String, default: "/images/logo/1.png" },
    waiter: { type: [String], default: [] },
    chef: { type: [String], default: [] },
    suspended: { type: Boolean, default: false, select: false },
    deleted: { type: Boolean, default: false, select: false },
    scanExp: { type: Date, default: new Date() },
    printName: { type: String, default: "" },
    printAddress: { type: String, default: "" },
    printPhone: { type: String, default: "" },
    customMessage: { type: String, default: "" },
    printImage: { type: String, default: "" },
    printEmail: { type: String, default: "" },
    bin: { type: String, default: "" },
    mushak: { type: String, default: "" },
    printWebsite: { type: String, default: "" },
    authOrder: { type: Boolean, default: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

RestaurantSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew) {
    return next();
  }

  try {
    const lastRestaurant = await doc.constructor
      .findOne({}, {}, { sort: { _id: -1 } })
      .limit(1);

    if (lastRestaurant) {
      doc.slug = +lastRestaurant.slug.slice(0, -2) + 1 + randomKey(2, true);
    } else {
      doc.slug = 1 + randomKey(2, true);
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
