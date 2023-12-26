const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    serial: { type: Number },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

CategorySchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew) {
    return next(); // Only increment on new documents
  }

  try {
    const lastCategory = await doc.constructor
      .findOne({}, {}, { sort: { _id: -1 } })
      .limit(1);

    if (lastCategory) {
      doc.serial = lastCategory.serial + 1;
    } else {
      doc.serial = 1; // If no documents exist yet, start from 1
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Category", CategorySchema);
