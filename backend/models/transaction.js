const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    restaurantID: { type: Schema.Types.ObjectId, required: true },
    transactionNumber: { type: String, required: true },
    details: { type: Schema.Types.Mixed, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
