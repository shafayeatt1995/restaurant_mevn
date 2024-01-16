const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");

router.use("/auth", require("./auth"));
router.use("/menu", require("./menu"));

router.use(isAuthenticated);
router.use("/push-notification", require("./push-notification"));
router.use("/order", require("./order"));
router.use("/admin", require("./admin"));
router.use("/manager", require("./manager"));
router.use("/user", require("./user"));
router.use("/item", require("./item"));
router.use("/mow", require("./mow"));

module.exports = router;
