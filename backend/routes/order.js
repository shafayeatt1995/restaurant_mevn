const express = require("express");
const router = express.Router();

const { createOrder } = require("@/backend/controllers/OrderController");

router.post("/", createOrder);

module.exports = router;
