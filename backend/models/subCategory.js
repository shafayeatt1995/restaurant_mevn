const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    categoryID: { type: String, required: true },
    name: { type: String, required: true },
    serial: { type: Number },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

SubCategorySchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew) {
    return next();
  }

  try {
    const lastCategory = await doc.constructor
      .findOne({}, {}, { sort: { _id: -1 } })
      .limit(1);

    if (lastCategory) {
      doc.serial = lastCategory.serial + 1;
    } else {
      doc.serial = 1;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("SubCategorySchema", SubCategorySchema);
