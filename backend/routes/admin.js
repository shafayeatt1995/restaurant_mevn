const express = require("express");
const router = express.Router();
const { isAdmin } = require("@/backend/middleware");
const {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  suspendUser,
} = require("@/backend/controllers/UserController");
const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("@/backend/controllers/CategoryController");

const { validation } = require("@/backend/validation");
const {
  createCategoryVal,
  updateCategoryVal,
} = require("@/backend/validation/category");
const { createUserVal } = require("@/backend/validation/user");

router.use(isAdmin);

router.get("/user", fetchUser);
router.post("/user", createUserVal, validation, createUser);
router.patch("/user", updateUser);
router.put("/user", suspendUser);
router.delete("/user", deleteUser);

router.get("/category", fetchCategory);
router.post("/category", createCategoryVal, validation, createCategory);
router.patch("/category", updateCategoryVal, validation, updateCategory);
router.delete("/category", deleteCategory);

module.exports = router;
