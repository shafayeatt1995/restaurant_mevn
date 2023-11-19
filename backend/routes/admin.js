const express = require("express");
const router = express.Router();
const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("@/backend/controllers/AdminController");
const { isAdmin } = require("@/backend/middleware");

router.use(isAdmin);
router.get("/category", fetchCategory);
router.post("/category", createCategory);
router.patch("/category", updateCategory);
router.delete("/category", deleteCategory);

module.exports = router;
