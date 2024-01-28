const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");
const {
  getOrder,
  billRequest,
} = require("@/backend/controllers/OrderController");

router.get("/profile", profile);
router.get("/order", getOrder);
router.get("/bill-request", billRequest);

router.use("/image", require("./image"));

module.exports = router;
