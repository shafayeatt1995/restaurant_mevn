const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");

router.get("/profile", profile);

router.use("/image", require("./image"));
router.use("/order", require("./order"));

module.exports = router;
