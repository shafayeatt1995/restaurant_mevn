const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PushNotificationSchema = new Schema(
  {
    userID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    subscription: { type: Object, required: true },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
