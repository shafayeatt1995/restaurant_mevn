const express = require("express");
const router = express.Router();
const { updateOrderStatus } = require("@/backend/controllers/OrderController");

router.get("/accept", updateOrderStatus);
router.get("/complete", updateOrderStatus);
router.delete("/cancel", updateOrderStatus);

module.exports = router;
