const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");

router.get("/profile", profile);

router.use("/image", require("./image"));

module.exports = router;
