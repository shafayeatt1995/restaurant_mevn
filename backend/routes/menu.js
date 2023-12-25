const express = require("express");
const router = express.Router();

const { fetchMenu } = require("@/backend/controllers/MenuController");

router.get("/", fetchMenu);

module.exports = router;
