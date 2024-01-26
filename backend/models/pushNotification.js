const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PushNotificationSchema = new Schema(
  {
    userID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    subscription: { type: Object, required: true },
    status: { type: Boolean, default: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
