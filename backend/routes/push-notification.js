const express = require("express");
const router = express.Router();
const {
  updateData,
  sendNotification,
} = require("@/backend/controllers/PushNotificationController");

router.get("/sent", sendNotification);
router.post("/update", updateData);

module.exports = router;
