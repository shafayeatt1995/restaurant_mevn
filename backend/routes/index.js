const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");

router.use("/auth", require("./auth"));
router.use("/menu", require("./menu"));
router.use("/order", require("./order"));

router.use(isAuthenticated);
router.use("/admin", require("./admin"));
router.use("/manager", require("./manager"));
router.use("/user", require("./user"));
router.use("/item", require("./item"));

module.exports = router;
