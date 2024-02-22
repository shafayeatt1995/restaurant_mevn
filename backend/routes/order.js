const express = require("express");
const router = express.Router();
const { isAuthOrGuest } = require("@/backend/middleware");
const { createOrder } = require("@/backend/controllers/OrderController");

router.use(isAuthOrGuest);
router.post("/", createOrder);

module.exports = router;
