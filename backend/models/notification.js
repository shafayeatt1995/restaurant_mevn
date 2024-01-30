const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    type: { type: String, required: true },
    additional: { type: Object },
    title: { type: String, required: true },
    body: { type: String, required: true },
    mark: { type: Boolean, default: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
