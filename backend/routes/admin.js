const express = require("express");
const router = express.Router();
const { fetchCategory } = require("@/backend/controllers/AdminController");
const { isAdmin } = require("@/backend/middleware");

router.use(isAdmin);
router.get("/category", fetchCategory);

module.exports = router;
