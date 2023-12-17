const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");

router.use("/auth", require("./auth"));

router.use(isAuthenticated);
router.use("/admin", require("./admin"));
router.use("/owner", require("./owner"));
router.use("/user", require("./user"));

module.exports = router;
