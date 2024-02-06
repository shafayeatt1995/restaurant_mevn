const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");
const { validation } = require("@/backend/validation");
const { updateProfileVal } = require("@/backend/validation/user");
const {
  getOrder,
  billRequest,
} = require("@/backend/controllers/OrderController");
const { updateProfile } = require("@/backend/controllers/UserController");

router.get("/profile", profile);
router.get("/order", getOrder);
router.get("/bill-request", billRequest);
router.get("/update-profile", updateProfileVal, validation, updateProfile);

router.use("/image", require("./image"));

module.exports = router;
