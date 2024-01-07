const express = require("express");
const router = express.Router();
const { cancelOrder } = require("@/backend/controllers/OrderController");

router.delete("/cancel", cancelOrder);

module.exports = router;
