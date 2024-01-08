const express = require("express");
const router = express.Router();
const {
  fetchOrder,
  updateOrderStatus,
} = require("@/backend/controllers/OrderController");

router.get("/order", fetchOrder);
router.post("/order/update-status", updateOrderStatus);

module.exports = router;
