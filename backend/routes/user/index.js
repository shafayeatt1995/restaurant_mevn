const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");
const { validation } = require("@/backend/validation");
const {
  updateProfileVal,
  updatePasswordVal,
  createRestaurantVal,
} = require("@/backend/validation/user");
const {
  getOrder,
  billRequest,
} = require("@/backend/controllers/OrderController");
const {
  updateProfile,
  updatePassword,
  createRestaurant,
  purchasePackage,
  refresh,
} = require("@/backend/controllers/UserController");

router.get("/profile", profile);
router.get("/order", getOrder);
router.post("/refresh", refresh);
router.get("/bill-request", billRequest);
router.post("/purchase-package", purchasePackage);
router.get("/update-profile", updateProfileVal, validation, updateProfile);
router.get("/update-Password", updatePasswordVal, validation, updatePassword);
router.post(
  "/create-restaurant",
  createRestaurantVal,
  validation,
  createRestaurant
);

router.use("/image", require("./image"));

module.exports = router;
