const express = require("express");
const router = express.Router();
const { profile } = require("@/backend/controllers/UserController");

router.get("/profile", profile);

module.exports = router;
