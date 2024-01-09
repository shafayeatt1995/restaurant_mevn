const mongoose = require("mongoose");
const { randomKey } = require("@/backend/utils");
const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    restaurantID: { type: String, required: true, index: true },
    name: { type: String, required: true },
    serial: { type: Number, unique: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// TableSchema.pre("save", async function (next) {
//   const doc = this;
//   if (!doc.isNew) {
//     return next();
//   }

//   try {
//     const lastTable = await doc.constructor
//       .findOne({}, {}, { sort: { _id: -1 } })
//       .limit(1);
//     if (lastTable) {
//       doc.serial = +lastTable.serial.slice(0, -2) + 1 + randomKey(2, true);
//     } else {
//       doc.serial = 1 + randomKey(2, true);
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
TableSchema.plugin(plugin, {
  model: "Table",
  field: "serial",
  startAt: 1,
});

module.exports = mongoose.model("Table", TableSchema);
