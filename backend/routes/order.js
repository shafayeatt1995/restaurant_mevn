const express = require("express");
const router = express.Router();
const { isAuthOrGuest } = require("@/backend/middleware");
const { createOrder } = require("@/backend/controllers/OrderController");
const { orderVal } = require("@/backend/validation/order");
const { validation } = require("@/backend/validation");

router.use(isAuthOrGuest);
router.post("/", orderVal, validation, createOrder);

module.exports = router;
