const express = require("express");
const router = express.Router();

const {
  createOrder,
  testPrint,
} = require("@/backend/controllers/OrderController");

router.post("/", createOrder);
router.post("/print", testPrint);

module.exports = router;
