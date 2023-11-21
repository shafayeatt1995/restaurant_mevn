const express = require("express");
const router = express.Router();
const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} = require("@/backend/controllers/AdminController");
const { isAdmin } = require("@/backend/middleware");
const {
  createCategoryVal,
  updateCategoryVal,
} = require("@/backend/validation/category");
const { validation } = require("@/backend/validation/validation");

router.use(isAdmin);

router.get("/user", fetchUser);
router.post("/user", createUser);
router.patch("/user", updateUser);
router.delete("/user", deleteUser);

router.get("/category", fetchCategory);
router.post("/category", createCategoryVal, validation, createCategory);
router.patch("/category", updateCategoryVal, validation, updateCategory);
router.delete("/category", deleteCategory);

module.exports = router;
